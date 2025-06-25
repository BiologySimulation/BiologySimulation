import { scene, camera, engine } from "./babylon-setup.js";

const PERMANENT_BUTTONS = ["send-button", "toggle-chatbox", "backbtn"];

export let state = {
    meshes: [],
    buttons: [],
    visibleUI: [],
}; 

export function clear() {
    state.meshes.forEach((mesh) => {
        mesh.dispose();
    });
    state.meshes = [];
}

export function showui() {
    engine.displayLoadingUI();
    
    // Manually make the loading UI visible
    const loadingDiv = document.getElementById('babylonjsLoadingDiv');
    if (loadingDiv) {
        loadingDiv.style.opacity = '1';
        loadingDiv.style.pointerEvents = 'auto';
    }
}

export function hideui() {
    engine.hideLoadingUI();
    
    // Manually hide the loading UI
    const loadingDiv = document.getElementById('babylonjsLoadingDiv');
    if (loadingDiv) {
        loadingDiv.style.opacity = '0';
        loadingDiv.style.pointerEvents = 'none';
    }
}

export function clearbtns() {
    // Set visibility to 0 for every <button> element in the document
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
        if (!PERMANENT_BUTTONS.includes(btn.id)) {
            btn.style.visibility = 'hidden';
        }
    });
}

export function importmesh(filename, camera_position = null, camera_target = null, camera_radius = null, scaling = null, position = null) {
    Swal.close();
    showui();
    
    BABYLON.SceneLoader.ImportMesh("", "", `models/${filename}`, scene, function (meshes) {
        // imports 3D model
        if (camera_target === false) {
            // do not change camera.target
        } else if (camera_target == null) {
            camera.target = meshes[0]; // sets camera target
        } else {
            camera.target = camera_target;
        }
        if (scaling != null) {
            meshes[0].scaling = scaling;
        }
        if (position != null) {
            meshes[0].position = position;
        }
        if (camera_position != null) {
            camera.position = camera_position;
        }
        if (camera_radius != null) {
            camera.radius = camera_radius;
        }
        state.meshes.push(meshes[0]);
        scene.executeWhenReady(() => {
            hideui();
        });
    }, null, function (scene, error) {
        // Error callback - hide loading UI if model fails to load
        hideui();
        console.error("Failed to load model:", filename, error);
    });
}

export function createSphereBtn(depth, verticalpos, horizontalpos, onclick, diameter = 0.25) {
    if (!scene) {
        console.error("Scene is not initialized");
        return;
    }

    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: diameter, segments: 32 }, scene);
    sphere.position.set(depth, verticalpos, horizontalpos);

    const sphereMaterial = new BABYLON.StandardMaterial("sphereMaterialInstance", scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // grey
    sphere.material = sphereMaterial;

    state.meshes.push(sphere);

    sphere.actionManager = new BABYLON.ActionManager(scene);

    sphere.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            if (camera) {
                camera.lowerRadiusLimit = 2;
            }
            onclick();
        })
    );

    sphere.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            sphere,
            "scaling",
            new BABYLON.Vector3(1.2, 1.2, 1.2),
            150
        )
    );
    sphere.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function () {
            sphere.material.diffuseColor = new BABYLON.Color3(0.2, 0.8, 0.2); // green
        })
    );

    sphere.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            sphere,
            "scaling",
            new BABYLON.Vector3(1, 1, 1),
            150
        )
    );
    sphere.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function () {
            sphere.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // grey
        })
    );

    return sphere;
}

export function clickcond(meshesarray, btnclass, ind = null) {
    // Makes all the sphere buttons disappear
    for (let i = 0; i < meshesarray.length; i++) {
        meshesarray[i].visibility = 0;
    }

    if (ind != null) {
        for (let i = 0; i < btnclass.length; i++) {
            if (i != ind) {
                hidebtn(btnclass[i]);
            } else {
                btnclass[i].setAttribute("style", "opacity: 0.6 !important; cursor: not-allowed !important;");
            }
        }
    } else {
        btnclass.setAttribute("style", "opacity: 0.6 !important; cursor: not-allowed !important;");
    }
}

// function to hide button
export function hidebtn(psbtn) {
    try{
        psbtn.setAttribute("style", ""); // resets inline styling
        if (psbtn.classList.contains("animbtn")) {
            psbtn.classList.remove("animbtn"); // removes class based on if the button has that class
        }
        psbtn.classList.add("animobtn"); // adds class
    } catch(e){console.log(e)}
}

// function to show button
export function showbtn(psbtn) {
    psbtn.setAttribute("style", ""); // resets inline stying
    if (psbtn.classList.contains("animobtn")) {
        psbtn.classList.remove("animobtn"); // removes class based on if the button has that class
    }
    psbtn.classList.add("animbtn"); // adds a class
}

// removes class from an element
export function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else if (hasClass(el, className)) {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        el.className = el.className.replace(reg, " ");
    }
}

// checks if element has class
export function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
}

// adds class to element
export function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
}

export function createButtonPopup(buttonId, popupId) {
    const button = document.getElementById(buttonId);
    const popup = document.getElementById(popupId);

    if (button && popup) {
        button.onclick = function () {
            popup.style.display = "block";
        }
    }
}

export function loadPanel(panelID) {
    // console.log(btn);
    // b = document.getElementById(btn);
    // hidebtn(b);
    Swal.close();
    var p = document.getElementById(panelID);
    addClass(p, "cd-panel--is-visible");
}

export function createEvolutionBtn(bone, panel) {
    // Create the button element
    const button = document.createElement("button");

    // Set the button attributes
    button.id = `${bone}panelbtn`;
    button.setAttribute("onclick", `loadPanel("${panel}")`);
    button.style.display = "none";
    button.classList.add("mui-btn", "mui-btn--primary", "largeBtn", "evolutionpanel", "pulse");

    // Set the button text
    button.textContent = `${bone} Evolution Information`;

    // Append the button to the body or any other container
    document.body.appendChild(button);

    return button;
}

export function createTabHTML(arr) {
    var tabHTML = '<div class="tabset">';
    for (var i=0;i<arr.length;i++) {
        tabHTML+='<input type="radio" name="tabset" id="tab'+i+'" checked><label for="tab'+i+'">'+arr[i][0]+'</label>';
    }
    tabHTML+='<div class="tab-panels">';
    for (var i=0;i<arr.length;i++) {
        tabHTML+='<section class="tab-panel"><h2>'+arr[i][0]+'</h2><p>'+arr[i][1]+'</p></section>';
    }
    tabHTML+='</div></div>';
    return tabHTML;
}

export function createBasicPopup(title, description, loadingFunction = null, modelBtnText = "3D Model", evolutionFunction = null, evolutionBtnText = "Evolution Info") {
    if (loadingFunction != null && evolutionFunction != null) {
        // Create popup with both 3D model and evolution buttons
        Swal.fire({
            title: title,
            text: description,
            icon: "question",
            background: "black",
            color: "white",
            backdrop: false,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Close",
            cancelButtonText: modelBtnText,
            denyButtonText: evolutionBtnText,
            cancelButtonColor: "#3085d6",
            denyButtonColor: "#28a745",
            reverseButtons: true
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked "3D Model" button
                loadingFunction();
            } else if (result.isDenied) {
                // User clicked "Evolution Info" button
                evolutionFunction();
            }
        });
    } else if (loadingFunction != null) {
        // Create popup with embedded 3D model button
        Swal.fire({
            title: title,
            text: description,
            icon: "question",
            background: "black",
            color: "white",
            backdrop: false,
            showCancelButton: true,
            confirmButtonText: "Close",
            cancelButtonText: modelBtnText,
            cancelButtonColor: "#3085d6",
            reverseButtons: true
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked "3D Model" button
                loadingFunction();
            }
        });
    } else if (evolutionFunction != null) {
        // Create popup with embedded evolution button
        Swal.fire({
            title: title,
            text: description,
            icon: "question",
            background: "black",
            color: "white",
            backdrop: false,
            showCancelButton: true,
            confirmButtonText: "Close",
            cancelButtonText: evolutionBtnText,
            cancelButtonColor: "#28a745",
            reverseButtons: true
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked "Evolution Info" button
                evolutionFunction();
            }
        });
    } else {
        Swal.fire({
            title: title,
            text: description,
            icon: "question",
            background: "black",
            color: "white",
            backdrop: false,
        });
    }
}

/**
 * Creates a panel with a title, content, and close button
 *
 * @param className class the panel belongs too (ex. brainpanel, ribopanel)
 * @param titleText title displayed at top of panel
 * @param classNameClose class of the button that closes panel (ex. brainclose, riboclose)
 * @param textInnerHTML text displayed in body of panel
 * @param btn btn that opens the panel -- needed only if btn needs to be hidden upon clicking
 * @param show whether to show or hide the button when panel is closed
 */
export function createPanel(className, titleText, classNameClose, textInnerHTML, btn = null, show) {
    // new Promise((resolve) => {
    // Create the main div
    const panel = document.createElement("div");
    panel.id = className;
    panel.className = `cd-panel ${className} cd-panel--from-right js-cd-panel-main`;

    // Create the header
    const header = document.createElement("header");
    header.className = "cd-panel__header";
    panel.appendChild(header);

    // Create the title
    const title = document.createElement("h1");
    title.className = "sTitle";
    title.textContent = titleText;
    header.appendChild(title);

    // Create the close link
    const closeLink = document.createElement("a");
    closeLink.className = `cd-panel__close js-cd-close ${classNameClose}`;
    closeLink.textContent = "Close";
    header.appendChild(closeLink);

    // Create the container div
    const container = document.createElement("div");
    container.className = "cd-panel__container";
    panel.appendChild(container);

    // Create the content div
    const content = document.createElement("div");
    content.className = "cd-panel__content";
    container.appendChild(content);

    // Create the paragraph
    const paragraph = document.createElement("p");
    paragraph.className = "sContent";
    paragraph.innerHTML = textInnerHTML;
    content.appendChild(paragraph);

    // Append the entire panel to the body or any other container
    document.body.appendChild(panel);

    document.querySelector(`.${classNameClose}`).onclick = () => {
        removeClass(panel, "cd-panel--is-visible");
        if (show) {
            showbtn(btn); // dont want to see the info button when panel is closed, so hide this btn on click of the close btn
        } else {
            hidebtn(btn);
        }
    };
    // resolve(panel);

    return panel;
}

export function createImagePopUp(title, description, imageURL, imageWidth, imageHeight, loadingFunction = null, modelBtnText = "3D Model", evolutionFunction = null, evolutionBtnText = "Evolution Info") {
    if (loadingFunction != null && evolutionFunction != null) {
        // Create popup with both 3D model and evolution buttons
        Swal.fire({
            title: title,
            text: description,
            background: "black",
            color: "white",
            imageUrl: imageURL,
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            backdrop: false,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Close",
            cancelButtonText: modelBtnText,
            denyButtonText: evolutionBtnText,
            cancelButtonColor: "#3085d6",
            denyButtonColor: "#28a745",
            reverseButtons: true
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked "3D Model" button
                loadingFunction();
            } else if (result.isDenied) {
                // User clicked "Evolution Info" button
                evolutionFunction();
            }
        });
    } else if (loadingFunction != null) {
        // Create popup with embedded 3D model button
        Swal.fire({
            title: title,
            text: description,
            background: "black",
            color: "white",
            imageUrl: imageURL,
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            backdrop: false,
            showCancelButton: true,
            confirmButtonText: "Close",
            cancelButtonText: modelBtnText,
            cancelButtonColor: "#3085d6",
            reverseButtons: true
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked "3D Model" button
                loadingFunction();
            }
        });
    } else if (evolutionFunction != null) {
        // Create popup with embedded evolution button
        Swal.fire({
            title: title,
            text: description,
            background: "black",
            color: "white",
            imageUrl: imageURL,
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            backdrop: false,
            showCancelButton: true,
            confirmButtonText: "Close",
            cancelButtonText: evolutionBtnText,
            cancelButtonColor: "#28a745",
            reverseButtons: true
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked "Evolution Info" button
                evolutionFunction();
            }
        });
    } else {
        Swal.fire({
            title: title,
            text: description,
            background: "black",
            color: "white",
            imageUrl: imageURL,
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            backdrop: false,
        });
    }
}

export function checkvis(btn) {
    if (!btn.classList.contains("animobtn") && btn.getAttribute("style") != "opacity: 0.6 !important; cursor: not-allowed !important;") {
        return true;
    }
    return false;
}

export function orgsettings(psorg) {
    psorg.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, psorg.material, "diffuseColor", new BABYLON.Color3(0, 1, 0), 500)); // when the pointer hovers over the object, its material's diffuseColor will transition to green for 500 milliseconds
    psorg.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, psorg.material, "diffuseColor", new BABYLON.Color3(1, 1, 1), 500)); // when the pointer moves away, the diffuseColor will transition back to white for 500 milliseconds
}

// Navigation history stack for back button functionality
class NavigationHistory {
    constructor(initial) {
        this.stack = [initial];
    }
    push(view) {
        this.stack.push(view);
    }
    pop() {
        if (this.stack.length > 1) {
            this.stack.pop();
        }
        return this.stack[this.stack.length - 1];
    }
    current() {
        return this.stack[this.stack.length - 1];
    }
}

// Initialize navigation history with the default view (e.g., 'loadhuman(0)')
const navHistory = new NavigationHistory('loadhuman(0)');

let isNavigatingBack = false;

export function updateNavigationHistory(func) {
    if (!isNavigatingBack) {
        navHistory.push(func);
    }
}

export function backPage() {
    if (navHistory.stack.length > 1) {
        isNavigatingBack = true;
        navHistory.pop();
        eval(navHistory.current());
        isNavigatingBack = false;
    }
}

export function btncheck(mem) {
    if ((mem.getChild() === "loadhuman(0)") && (backcell.classList.add("animobtn"))) {
        backcell.classList.add("animbtn");
    }
    else if ((mem.getChild() === "loadcell()") && (backHuman.classList.add("animobtn"))) {
        backHuman.classList.add("animbtn");
    }
    else {
        backHuman.classList.add("animbtn");
    }
}

// Button factory utility for dynamic UI
export function createButton({ 
    id, 
    text, 
    onClick, 
    className = "mui-btn mui-btn--primary largeBtn", 
    style = "", 
    parent = document.body, 
    title = "" 
}) {
    // Remove existing button with same id
    const oldBtn = document.getElementById(id);
    if (oldBtn) oldBtn.remove();
    const btn = document.createElement("button");
    btn.id = id;
    btn.textContent = text;
    btn.className = className;
    btn.style = style;
    if (title) btn.title = title;
    btn.onclick = onClick;
    parent.appendChild(btn);
    return btn;
}