import { camera } from '../core/babylon-setup.js';
import { updateNavigationHistory } from '../core/utils.js';
import { createSphereBtn, importmesh, clear, clearbtns, createBasicPopup, checkvis, showui, hidebtn, showbtn } from '../core/utils.js';

export function loadendocrine() {
    updateNavigationHistory("loadendocrine()");
    clear();
    clearbtns()
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Endocrine System";
    importmesh("endocrine_system.glb", new BABYLON.Vector3(4.7, -35.25, -127), new BABYLON.Vector3(0, 9, 0), 23, new BABYLON.Vector3(10, 10, 10));
    
    createSphereBtn(0.38177421210721185, 10.476974486561003, -0.7496007303027916, () => {
        createBasicPopup("View Endocrine System", "", () => loadendocrine1());
    }, 0.4, true);
    
    document.getElementById('backHuman').style.display = 'block';
}

export function loadendocrine1() {
    updateNavigationHistory("loadendocrine1()");
    clear();
    clearbtns()
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Endocrine System";
    importmesh("endocrinesystem1.glb", new BABYLON.Vector3(4.7, 20.25, -127), new BABYLON.Vector3(0, 15, 0), 23, new BABYLON.Vector3(10, 10, 10));
    camera.upperRadiusLimit = 100;
    
    createSphereBtn(0.19422271158972215,15.053095487973781,0.3765937280360596,function(){createBasicPopup("Thyroid Gland","The thyroid gland is a butterfly-shaped gland located in the front of the neck, just below the Adam's apple. It produces hormones, primarily thyroxine (T4) and triiodothyronine (T3), which regulate metabolism, growth, and development throughout the body. The thyroid gland also plays a role in regulating body temperature, heart rate, and the production of other hormones.");},0.2);
    createSphereBtn(-0.052308999432993275,13.980299730520228,0.11839942778949109,function(){createBasicPopup("Thymus","The thymus is a specialized organ located in the upper chest, behind the sternum and between the lungs. It is crucial for the development and maturation of T-lymphocytes (T cells), which are essential for the immune system's function. The thymus is most active during childhood and adolescence, gradually decreasing in size and activity with age.");},0.2);
    createSphereBtn(0.4548344838084215,12.218283970225333,0.6109802685730505,function(){createBasicPopup("Adrenal Gland","The adrenal glands, located atop each kidney, produce hormones essential for regulating metabolism, stress response, and body balance.");},0.2);
    createSphereBtn(-0.13667778030159905,11.812149353633087,0.07705994682174655,function(){createBasicPopup("Pancreas","The pancreas is a vital organ located behind the stomach that produces digestive enzymes and hormones, including insulin and glucagon, crucial for regulating blood sugar levels.");},0.2);
    createSphereBtn(-0.3790778878018308,9.211812257647377,0.5720214617706709,function(){createBasicPopup("Testes/Ovaries","The testes are male reproductive organs responsible for producing sperm and testosterone, while ovaries are female reproductive organs that produce eggs and hormones like estrogen and progesterone.");},0.2);
    createSphereBtn(-0.14833353391744186,17.198081967825033,-0.1482179000675199,function(){createBasicPopup("Brain Organs: Hypothalamus, Pituitary Gland, Pineal Gland","The hypothalamus is a region in the brain responsible for regulating various bodily functions, including temperature, hunger, thirst, and sleep. It also plays a crucial role in hormone production and secretion by controlling the pituitary gland. The pituitary gland, often referred to as the 'master gland,' is located at the base of the brain. It produces and releases hormones that regulate other endocrine glands and various body functions, such as growth, reproduction, and metabolism. The pineal gland, situated in the brain's center, produces the hormone melatonin, which regulates sleep-wake cycles (circadian rhythms) and has effects on seasonal biological rhythms.");},0.2);        
    
    document.getElementById('backHuman').style.display = 'block';
} 