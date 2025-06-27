import { camera } from '../core/babylon-setup.js';
import { updateNavigationHistory } from '../core/utils.js';
import { createSphereBtn, importmesh, clear, clearbtns, createBasicPopup, checkvis, showui, hidebtn, showbtn } from '../core/utils.js';

export function loadrespiratory() {
    updateNavigationHistory("loadrespiratory()");
    Swal.close();
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    showbtn(backHuman);

    importmesh("lung.glb", new BABYLON.Vector3(0, 0, 3), new BABYLON.Vector3(0, -0.75, 0), null, new BABYLON.Vector3(0.18, 0.18, 0.18));
    loaddiaphragm();
    // camera.radius.upperRadiusLimit = 100;
    // camera.radius = 15;
    showbtn(backHuman);
    title.innerHTML = "Respiratory System"
    createSphereBtn(0,0.2,0.025,function(){createBasicPopup("Trachea","The trachea is the long tube that connects your larynx (voice box) to your bronchi. Your bronchi send air to your lungs.");},0.05);
    createSphereBtn(0,0,0.025,function(){createBasicPopup("Bronchi","The bronchi are the two large tubes that carry air from the windpipe (trachea) into the lungs and back out again.", () => loadbronchi());},0.05, true);
    createSphereBtn(0.36621450755113255,-0.9993902851519447,0.22129484768301144,function(){createBasicPopup("Diaphragm","The diaphragm is a muscular dome that separates the abdominal and thoracic (chest) chambers. Its ability to contract and relax to aid in breathing is essential to respiration. The diaphragm flattens and contracts during inhalation, expanding the thoracic cavity's volume and producing a vacuum that pulls air into the lungs. It relaxes and takes on the shape of a dome during exhalation, reducing the volume of the thoracic cavity and releasing air from the lungs. In addition to offering structural support, the diaphragm divides the heart and lungs from the abdominal organs. By raising stomach pressure, it also helps with other body processes like sneezing, coughing etc. The diaphragm is coordinated with other breathing muscles by means of the phrenic nerves that regulate its movements.", () => loaddiaphragmonly());},0.05, true);
    createSphereBtn(0.21614443373303704,-0.25441559952179893,0.26041848467991624,function(){createBasicPopup("Lungs","The lungs, crucial for breathing, sit symmetrically in the chest. The right lung has three lobes, while the left has two. Their main job is gas exchange, taking in oxygen and releasing carbon dioxide. Air enters through the nose/mouth, travels down the airway, and reaches tiny sacs called alveoli. Here, oxygen enters the blood, and carbon dioxide is removed. Protective features like nasal hairs and mucus ensure smooth airflow. Lungs are buoyant, and one can function with just one. Regular exercise boosts lung capacity, and adults have millions of alveoli. In essence, lungs play a vital role in maintaining our health and sustaining life through efficient gas exchange.", () => loadlungcs(), "3D Model of Cross Section");},0.05, true);    
}

export function loadrespinsitu() {
    updateNavigationHistory("loadrespinsitu()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById("title").innerHTML = "Respiratory System";
    importmesh("respiratorysysteminsitu1.glb", new BABYLON.Vector3(10, 0, 10), new BABYLON.Vector3(0, 5, 0), 23, new BABYLON.Vector3(15, 15, 15));
    camera.upperRadiusLimit = 100;

    createSphereBtn(0.8556685562009205, 5.889500466127727, 0.49144617724636674, () => {
        createBasicPopup("Lungs & Diaphragm", "", () => loadrespiratory());
    }, 0.4, true);

    document.getElementById('backHuman').style.display = 'block';
}

export function loadtrachea() {
    updateNavigationHistory("loadtrachea()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Trachea";
    importmesh("trachea.glb", new BABYLON.Vector3(10, 0, 10), new BABYLON.Vector3(0, 5, 0), 23, new BABYLON.Vector3(15, 15, 15));
    document.getElementById('backHuman').style.display = 'block';
}

export function loadlungs() {
    updateNavigationHistory("loadlungs()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Lungs";
    importmesh("lung.glb", new BABYLON.Vector3(0, -10, 0));
    document.getElementById('backHuman').style.display = 'block';
}

export function loadbronchi() {
    updateNavigationHistory("loadbronchi()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Bronchi";
    importmesh("bronchi.glb", new BABYLON.Vector3(0, 0, 30), new BABYLON.Vector3(0, 0, 0), 23, new BABYLON.Vector3(1, 1, 1));
    document.getElementById('backHuman').style.display = 'block';
}

export function loadlungcs() {
    updateNavigationHistory("loadlungcs()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Lung Cross Section";
    importmesh("lungcs.glb", new BABYLON.Vector3(0, -4.5, -13), new BABYLON.Vector3(0, 0, 0), null, new BABYLON.Vector3(1, 1, 1));
    document.getElementById('backHuman').style.display = 'block';
}

export function loaddiaphragm() {
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Diaphragm";
    importmesh("diaphragm.glb", null, false, null, new BABYLON.Vector3(7, 7, -7), new BABYLON.Vector3(0, -3.5, 0));
    document.getElementById('backHuman').style.display = 'block';
}

export function loaddiaphragmonly() {
    updateNavigationHistory("loaddiaphragmonly()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById("title").innerHTML = "Diaphragm";
    importmesh("diaphragm.glb", null, false, null, new BABYLON.Vector3(7, 7, -7), new BABYLON.Vector3(0, -3, 0));
    document.getElementById('diaphragmbtn').style.display = 'none';
    document.getElementById('backHuman').style.display = 'block';
} 