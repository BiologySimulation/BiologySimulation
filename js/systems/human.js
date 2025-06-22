import { camera } from '../core/babylon-setup.js';
import { change } from '../core/utils.js';
import { createSphereBtn, importmesh, clear, clearbtns, createBasicPopup, createImagePopUp, checkvis, showui, clickcond, showbtn, orgsettings } from '../core/utils.js';
import { state } from '../core/state.js';

export function loadhuman(val) {
    change(state.m.getChild(), `loadhuman(${val})`);
    if (checkvis(backHuman) || val == 0) {
        showui();
        clear();
        clearbtns();
        document.getElementById('title').innerHTML = "Human";
        importmesh("human.glb", new BABYLON.Vector3(0, 5, -20), new BABYLON.Vector3(0, 5, 0), 20, new BABYLON.Vector3(6, 6, 6));
        
        try {
            eyemeshes.forEach((el) => {
                el.dispose();
            });
        } catch (err) {}
        
        showbtn(backcell);
        createSphereBtn(0.2, 10, -0.8, function () {
            createImagePopUp("Eye", "The eye, a complex sensory apparatus, transforms incoming light through refraction by the cornea and lens, creating precise images on the retina. Photoreceptor cells in the retina convert light into neural signals. ", "images/eyepicture.jpg", window.innerWidth * 0.5, window.innerHeight * 0.5, document.querySelectorAll(".eyebtns"));
        });
        createSphereBtn(-0.534986287242269, 9.902969211872968, -0.04703141752093032, function () {
            createBasicPopup("Ear", "The ear is a complex organ responsible for hearing and balance, consisting of three main parts: the outer ear, middle ear, and inner ear. The outer ear captures sound waves and funnels them through the ear canal to the eardrum, which vibrates in response. These vibrations are transmitted through the middle ear, where three tiny bones (the malleus, incus, and stapes) amplify the sound and pass it to the inner ear. The inner ear, containing the cochlea and the vestibular system, converts sound waves into electrical signals that are sent to the brain for interpretation and helps maintain equilibrium and spatial orientation.", document.querySelectorAll(".earbtns"));
        });
    }
} 

export function loadeye() {
    change(state.m.getChild(), "loadeye()");
    clear();
    clearbtns();
    document.getElementById('title').innerHTML = "Eye";
    importmesh("eye.glb", new BABYLON.Vector3(-3, 0, -35), new BABYLON.Vector3(8.3, 9.5, -2.7), 4, new BABYLON.Vector3(10, 10, 10));
    camera.upperRadiusLimit = 100;
    
    createSphereBtn(
        8.017824654107955, 9.483131931536812, -3.3881631831653913,
        function () {
            camera.lowerRadiusLimit = 2;
            Swal.fire({
                title: "Cornea",
                text: "The cornea, the eye's transparent outermost layer, plays a crucial role in focusing light onto the retina and also protecting the eye from pathogens and dust.",
                imageUrl: "images/cornea.png",
                icon: "question",
                background: "black",
                color: "white",
                backdrop: false,
            }).then(function () {
                for (i = 0; i < corneabtns.length; i++) {
                    hidebtn(corneabtns[i]);
                }
            });
            for (i = 0; i < corneabtns.length; i++) {
                showbtn(corneabtns[i]);
            }
        },
        0.1
    );
    createSphereBtn(8.55, 9.5, -3.43,function () { createBasicPopup("Iris", "The iris is a colored ring of muscle that controls the size of the pupil. By contracting or dilating the pupil, it controls the amount of light being let in. ");},0.1);
    createSphereBtn(8.25,9.5,-3.47,function () {createBasicPopup("Pupil", "The pupil is a black circular opening at the center of the iris, this regulates the amount of light entering the eye this is done through dilations and constrictions which is in response to light intensity.  "); }, 0.1);
    createSphereBtn(8.894,9.625,-3.15,function () { createBasicPopup("Sclera", "The sclera, commonly known as the white of the eye, provides protection and maintains the eye's shape; it connects with the cornea at the limbus. Made up of collagen and elastic fibers, allows for strength. The sclera connects with the cornea at the limbus and is continuous with the dura mater of the optic nerve.  ");},0.1);
    
    document.getElementById('backHuman').style.display = 'block';
}

export function loadeyecs() {
    change(state.m.getChild(), "loadeyecs()");
    clear();
    clearbtns();
    document.getElementById('title').innerHTML = "Eye Cross-Section";
    importmesh("eye_crosssection.glb", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0), 23, new BABYLON.Vector3(1, 1, 1));
    camera.upperRadiusLimit = 100;
    
    createSphereBtn(0, 0, 2, () => {createBasicPopup("Cornea","The transparent front part of the eye that covers the iris, pupil, and anterior chamber. It refracts light, accounting for approximately two-thirds of the eye's total optical power.");}, 0.4);
    
    document.getElementById('backHuman').style.display = 'block';
}

export function bowmanclicked() {
    Swal.fire({ title: "Bowman's Layer", text: "Bowman's layer is a smooth, acellular, nonregenerating layer, located between the superficial stroma and the epithelial basement membrane.", background: "black", color: "white" });
}
export function epitheliumclicked() {
    Swal.fire({ title: "Epithelium", text: "The epithelium is the cornea's outermost region, composed of layers of cells. It blocks the passage of foreign material and provides a smooth surface that absorbs oxygen and cell nutrients from tears.", background: "black", color: "white" });
}
export function stromaclicked() {
    Swal.fire({ title: "Stroma", text: "The stroma comprises about 90% of the cornea's thickness. It consists of water, collagen fibrils, and other proteoglycans. The collagen's structural arrangement is key to corneal transparency.", background: "black", color: "white" });
}
export function descementclicked() {
    Swal.fire({ title: "Descemet's membrane", text: "Descemet's membrane is a thin acellular layer that serves as the modified basement membrane of the corneal endothelium, from which the cells are derived.", background: "black", color: "white" });
}
export function endotheliumclicked() {
    Swal.fire({ title: "Endothelium", text: "The endothelium is a single layer of cells on the inner surface of the cornea. It is responsible for regulating fluid and solute transport between the aqueous and corneal stromal compartments.", background: "black", color: "white" });
} 

export function loadear(val = 1) {
    if (val !== 2) {
        change(state.m.getChild(), `loadear(${val})`);
    }
    clear();
    clearbtns();
    document.getElementById("title").innerHTML = "Ear";
    importmesh("ear.glb", new BABYLON.Vector3(1, 0, -1.2), new BABYLON.Vector3(0, 0.8, 0), null, new BABYLON.Vector3(0.4, 0.4, 0.4), new BABYLON.Vector3(0, 0, 0))
    
    document.getElementById('backHuman').style.display = 'block';
    document.getElementById('earcsbtn').style.display = 'block';
}

export function loadearcs(val = 1) {
    if(val != 2){
        change(state.m.getChild(), `loadearcs(${val})`);
    }
    clear();
    clearbtns();
    document.getElementById("title").innerHTML = "Ear Cross-Section";
    importmesh("ear_cs.glb", new BABYLON.Vector3(1, 0.8, -1), new BABYLON.Vector3(0, 0.75, 0), null, new BABYLON.Vector3(6, 6, 6), new BABYLON.Vector3(0, 0, 0))
    camera.upperRadiusLimit = 100;
    
    document.getElementById('backHuman').style.display = 'block';
} 