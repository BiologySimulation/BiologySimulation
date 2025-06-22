import { camera } from '../core/babylon-setup.js';
import { change } from '../core/state-utils.js';
import { createSphereBtn, importmesh, clear, clearbtns, createBasicPopup } from '../core/utils.js';
import { state } from '../core/state.js';

export function loadrespiratory(val) {
    change(state.m.getChild(), "loadrespiratory(0)");
    if (checkvis(document.querySelectorAll(".respbtns")[0]) || val == 0 || val == 2) {
        Swal.close();
        clear();
        clearbtns();
        showbtn(backHuman);
        if (val == 2) {
            clearbtns();
            // hidebtn(showsystems);
            hidebtn(backcell);
            hidebtn(backPageBtn);
            hidebtn(backHuman);
        }
    }

    importmesh("lung.glb", new BABYLON.Vector3(0, 0, 3), new BABYLON.Vector3(0, -0.75, 0), null, new BABYLON.Vector3(0.18, 0.18, 0.18));
    loaddiaphragm();
    // camera.radius.upperRadiusLimit = 100;
    // camera.radius = 15;
    showbtn(backHuman);
    title.innerHTML = "Respiratory System"
    createSphereBtn(0,0.2,0.025,function(){createBasicPopup("Trachea","The trachea is the long tube that connects your larynx (voice box) to your bronchi. Your bronchi send air to your lungs.");},0.05);
    createSphereBtn(0,0,0.025,function(){createBasicPopup("Bronchi","The bronchi are the two large tubes that carry air from the windpipe (trachea) into the lungs and back out again.", document.querySelectorAll(".bronchibtns"));},0.05);
    createSphereBtn(0.36621450755113255,-0.9993902851519447,0.22129484768301144,function(){createBasicPopup("Diaphragm","The diaphragm is a muscular dome that separates the abdominal and thoracic (chest) chambers. Its ability to contract and relax to aid in breathing is essential to respiration. The diaphragm flattens and contracts during inhalation, expanding the thoracic cavity's volume and producing a vacuum that pulls air into the lungs. It relaxes and takes on the shape of a dome during exhalation, reducing the volume of the thoracic cavity and releasing air from the lungs. In addition to offering structural support, the diaphragm divides the heart and lungs from the abdominal organs. By raising stomach pressure, it also helps with other body processes like sneezing, coughing etc. The diaphragm is coordinated with other breathing muscles by means of the phrenic nerves that regulate its movements.",document.querySelectorAll(".diaphragmbtns"));},0.05);
}

export function loadrespinsitu(val = 1) {
    change(state.m.getChild(), `loadrespinsitu(${val})`);
    clear();
    clearbtns();
    document.getElementById("title").innerHTML = "Respiratory System";
    importmesh("respiratorysysteminsitu1.glb", new BABYLON.Vector3(10, 0, 10), new BABYLON.Vector3(0, 5, 0), 23, new BABYLON.Vector3(15, 15, 15));
    camera.upperRadiusLimit = 100;

    createSphereBtn(0.8556685562009205, 5.889500466127727, 0.49144617724636674, () => {
        createBasicPopup("Lungs & Diaphragm", "", document.querySelectorAll(".respbtns"));
    }, 0.4);

    document.getElementById('backHuman').style.display = 'block';
}

export function loadtrachea() {
    change(state.m.getChild(), "loadtrachea()");
    clear();
    clearbtns();
    document.getElementById('title').innerHTML = "Trachea";
    importmesh("trachea.glb", new BABYLON.Vector3(10, 0, 10), new BABYLON.Vector3(0, 5, 0), 23, new BABYLON.Vector3(15, 15, 15));
    document.getElementById('backHuman').style.display = 'block';
}

export function loadlungs() {
    change(state.m.getChild(), "loadlungs()");
    clear();
    clearbtns();
    document.getElementById('title').innerHTML = "Lungs";
    importmesh("lung.glb", new BABYLON.Vector3(0, -10, 0));
    document.getElementById('backHuman').style.display = 'block';
}

export function loadbronchi() {
    change(state.m.getChild(), "loadbronchi()");
    clear();
    clearbtns();
    document.getElementById('title').innerHTML = "Bronchi";
    importmesh("bronchi.glb", new BABYLON.Vector3(0, 0, 30), new BABYLON.Vector3(0, 0, 0), 23, new BABYLON.Vector3(1, 1, 1));
    document.getElementById('backHuman').style.display = 'block';
}

export function loadlungcs() {
    change(state.m.getChild(), "loadlungcs()");
    clear();
    clearbtns();
    document.getElementById('title').innerHTML = "Lung Cross Section";
    importmesh("lungcs.glb", new BABYLON.Vector3(0, -4.5, -13), new BABYLON.Vector3(0, 0, 0), null, new BABYLON.Vector3(1, 1, 1));
    document.getElementById('backHuman').style.display = 'block';
}

export function loaddiaphragm() {
    change(state.m.getChild(), "loaddiaphragm()");
    clear();
    clearbtns();
    document.getElementById('title').innerHTML = "Diaphragm";
    importmesh("diaphragm.glb", null, false, null, new BABYLON.Vector3(7, 7, -7), new BABYLON.Vector3(0, -3.5, 0));
    document.getElementById('backHuman').style.display = 'block';
}

export function loaddiaphragmonly(val = 1) {
    change(state.m.getChild(), `loaddiaphragmonly(${val})`);
    clear();
    clearbtns();
    document.getElementById("title").innerHTML = "Diaphragm";
    importmesh("diaphragm.glb", null, false, null, new BABYLON.Vector3(7, 7, -7), new BABYLON.Vector3(0, -3, 0));
    document.getElementById('diaphragmbtn').style.display = 'none';
    document.getElementById('backHuman').style.display = 'block';
} 