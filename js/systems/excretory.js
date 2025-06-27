import { camera } from '../core/babylon-setup.js';
import { updateNavigationHistory } from '../core/utils.js';
import { createSphereBtn, importmesh, clear, clearbtns, createBasicPopup, checkvis, showui, hidebtn, showbtn } from '../core/utils.js';

export function loadexcretory() {
    updateNavigationHistory("loadexcretory()");
    clear();
    clearbtns()
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Excretory System";
    importmesh("exretory_system.glb", new BABYLON.Vector3(0, 0, -15), null, null, new BABYLON.Vector3(0.01, 0.01, 0.01));
    
    createSphereBtn(1.3,5,-0.6,function(){createBasicPopup("Kidney","The kidneys, each about the size of a human fist, are bean-shaped organs located on either side of the spine in the lower back. They filter waste and excess substances from the blood, regulating electrolyte balance, blood pressure, and producing urine for waste elimination.", () => loadkidney(1));}, 0.25, true);
    createSphereBtn(0.98,0,-0.25,function(){createBasicPopup("Ureter","The channels through which the urine formed in the kidney enters the urinary bladder.");});
    createSphereBtn(-0.04,-4.42,-1.29,function(){createBasicPopup("Urinary Bladder","The urinary bladder is made up of several layers of tissues and lined with transitional epithelium, which can relax and contract to accommodate urine. There are sphincter muscles between the bladder and the urethra that control urination.");});
    createSphereBtn(0.07,-5.27,-0.43,function(){createBasicPopup("Urethra","The tube through which urine leaves the body.");});        
    
    document.getElementById('backHuman').style.display = 'block';
}

export function loadkidney() {
    updateNavigationHistory("loadkidney()");
    clear();
    clearbtns()
    showbtn(document.getElementById("backHuman"));
    showbtn(document.getElementById("kidney2dmodelbtn"));
    document.getElementById('title').innerHTML = "Kidney";
    importmesh("kidney.glb", new BABYLON.Vector3(0, 0, -0.1), null, null, new BABYLON.Vector3(0.005, 0.005, 0.005));
    
    // Create sphere buttons for kidney components with exact coordinates from script.js
    createSphereBtn(-0.35, -0.15, 0, () => {
        createBasicPopup("Ureter", "The channel through which the urine formed in the kidney enters the urinary bladder.");
    }, 0.1);
    
    createSphereBtn(0, 0, 0.225, () => {
        createBasicPopup("Renal Capsule", "The outermost layer of the kidney. It is a tough, fibrous membrane that protects the kidney. The renal capsule is surrounded by adipose tissue and connective tissue.");
    }, 0.1);
    
    createSphereBtn(0.26, 0, -0.025, () => {
        createBasicPopup("Renal Cortex", "The outer region of the kidney that houses the glomerulus and convoluted tubules of the nephrons. Nephorons are units of the kidney that filter blood and produce urine.");
    }, 0.1);
    
    createSphereBtn(0.19, -0.15, -0.025, () => {
        createBasicPopup("Renal Medulla", "Filters waste materials and eliminates fluid from the body. It also houses the loops of Henle, which are unique to the kidney and help concentrate urine.");
    }, 0.1);
    
    createSphereBtn(-0.15, -0.175, -0.025, () => {
        createBasicPopup("Renal Pelvis", "The inner region of the kidney that collects urine as it is produced, and sends it through the ureters to the bladder.");
    }, 0.1);
    
}

export function loadnephron() {
    updateNavigationHistory("loadnephron()");
    clear();
    clearbtns()
    showbtn(document.getElementById("backHuman"));
    document.getElementById("title").innerHTML = "Nephron";
    importmesh("nephron.glb", new BABYLON.Vector3(-80, 5, -100), null, 20, new BABYLON.Vector3(0.05, 0.05, 0.05));
    camera.upperRadiusLimit = 200;
    
    document.getElementById('backKidney').style.display = 'block';
}

export function kidney2dmodel() {
    const kidneyImg = new Image();
    kidneyImg.src = 'images/kidney.png';
    kidneyImg.style.width = '80%';
    kidneyImg.style.height = 'auto';

    Swal.fire({
        title: 'Kidney (2D Model)',
        html: kidneyImg.outerHTML,
        width: '90%',
        background: "black",
        color: "white",
        backdrop: false,
    });
    document.getElementById('backKidney').style.display = 'block';
} 