import { camera } from '../core/babylon-setup.js';
import { updateNavigationHistory } from '../core/utils.js';
import { createSphereBtn, importmesh, clear, clearbtns, createBasicPopup, checkvis, showui, hidebtn, showbtn } from '../core/utils.js';

export function loadcirculatory() {
    updateNavigationHistory("loadcirculatory()");
    clear();
    clearbtns()
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Circulatory System";
    importmesh("circulatory_system.glb", new BABYLON.Vector3(-0.5417921374724932, 14.655978586494381, -26.567630504877478), new BABYLON.Vector3(0, 9, 0), 23, new BABYLON.Vector3(10, 10, 10));
    
    // Create sphere buttons for each circulatory component with exact coordinates from script.js
    createSphereBtn(0, 12.8, -0.6, () => {
        createBasicPopup("Heart", "The heart is the central organ of the circulatory, or cardiovascular, system. Its main function is to pump blood to deliver oxygen and nutrients to all the cells and tissues in the body. The heart maintains homeostasis and plays a critical role in oxygenating blood. In addition, it regulates blood pressure and supports the entire circulatory system. The heart is divided into four chambers: two atria and two ventricles, with one atrium and one ventricle on the left side and one atrium and one ventricle on the right side. The right atrium receives deoxygenated blood from the body and pumps it into the right ventricle, which then sends the blood to the lungs through the pulmonary artery for oxygenation. The left atrium receives freshly oxygenated blood from the lungs and pushes it into the left ventricle, which pumps the oxygen-rich blood out to the rest of the body. To ensure a one-way circulation of blood, valves are located between the atria and ventricles, preventing backflow.", () => loadheart(1));
    }, 0.5, true);
    
    createSphereBtn(-0.55, 5.8, -0.3, () => {
        createBasicPopup("Artery", "Arteries (colored red) are thick blood vessels that bring blood away from the heart. Blood in arteries is always oxygenated, with the exception of the pulmonary artery, which brings deoxygenated blood away from the heart to the lungs to become oxygenated.");
    }, 0.4);
    
    createSphereBtn(-0.8, 6.8, 0, () => {
        createBasicPopup("Arteriole", "Smaller arteries");
    }, 0.4);
    
    createSphereBtn(2, 12.8, 0, () => {
        createBasicPopup("Veins", "Veins (colored blue) are thick blood vessels that bring blood toward from the heart. Blood in veins is always deoxygenated, with the exception of the pulmonary veins, which bring oxygenated blood away toward the heart from the lungs.");
    }, 0.4);
    
    createSphereBtn(0.5, 6.8, 0.2, () => {
        createBasicPopup("Venules", "Smaller veins");
    }, 0.4);
    
    createSphereBtn(0, 13.7, -0.3, () => {
        createBasicPopup("Aorta", "The main artery that brings oxygenated blood directly from the heart. All other arteries branch off of this one.");
    }, 0.4);
    
    createSphereBtn(0.2, 11.8, -0.2, () => {
        createBasicPopup("Vena Cava", "The main vein that brings all deoxygenated blood from the body into the heart. All other veins converge into this one");
    }, 0.4);
    
    document.getElementById('backHuman').style.display = 'block';
}

export function loadheart() {
    updateNavigationHistory("loadheart()");
    clear();
    clearbtns()
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Heart";
    importmesh("heart.glb", new BABYLON.Vector3(80, 1.5, 50), null, null, new BABYLON.Vector3(10, 10, 10));
    createSphereBtn(2.5576482066001773,1.6891541136989279,3.9493668163700306,heartmeshes,function(){createBasicPopup("Right Atrium","The right atrium is responsible for receiving oxygen-poor blood from the body through the superior and inferior vena cava. It serves as a holding chamber that allows blood to accumulate before it is transferred to the right ventricle for further circulation.");},1.5);
    createSphereBtn(1.4725795491646574,-3.9373089418681637,2.998604554954426,heartmeshes,function(){createBasicPopup("Right Ventricle","The right ventricle pumps oxygen-poor blood to the lungs via the pulmonary artery, where it undergoes oxygenation. The wall of the right ventricle is relatively thinner compared to the left ventricle, as it only needs to pump blood a short distance to the lungs.");},1.5);
    createSphereBtn(-1.6441591690348405,-2.8816322575918836,3.310198635298761,heartmeshes,function(){createBasicPopup("Left Ventricle","The left ventricle is responsible for pumping oxygen-rich blood to the entire body through the aorta. It has the thickest wall among the heart chambers, as it needs to generate substantial force to push blood through the extensive systemic circulation.");},1.5);
    createSphereBtn(-2.096941361673263,2.4779635891449114,3.931771727770112,heartmeshes,function(){createBasicPopup("Left Atrium","The left atrium receives oxygen-rich blood from the lungs through the pulmonary veins. This chamber acts as a conduit, passing the oxygenated blood into the left ventricle, which will then pump it to the rest of the body.");},1.5);            
    document.getElementById('backHuman').style.display = 'block';
} 