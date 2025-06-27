import { camera } from '../core/babylon-setup.js';
import { updateNavigationHistory } from '../core/utils.js';
import { createSphereBtn, importmesh, clear, clearbtns, createBasicPopup, createImagePopUp, checkvis, showui, clickcond, showbtn, orgsettings, createPanel, createEvolutionBtn, createTabHTML } from '../core/utils.js';

export function loadhuman() {
    updateNavigationHistory("loadhuman()");
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
    
    showbtn(document.getElementById("backcell"));
    createSphereBtn(0.2, 10, -0.8, function () {
        createImagePopUp("Eye", "The eye, a complex sensory apparatus, transforms incoming light through refraction by the cornea and lens, creating precise images on the retina. Photoreceptor cells in the retina convert light into neural signals. ", "images/eyepicture.jpg", window.innerWidth * 0.5, window.innerHeight * 0.5, () => loadeye());
    }, 0.4, true);
    createSphereBtn(-0.534986287242269, 9.902969211872968, -0.04703141752093032, function () {
        createBasicPopup("Ear", "The ear is a complex organ responsible for hearing and balance, consisting of three main parts: the outer ear, middle ear, and inner ear. The outer ear captures sound waves and funnels them through the ear canal to the eardrum, which vibrates in response. These vibrations are transmitted through the middle ear, where three tiny bones (the malleus, incus, and stapes) amplify the sound and pass it to the inner ear. The inner ear, containing the cochlea and the vestibular system, converts sound waves into electrical signals that are sent to the brain for interpretation and helps maintain equilibrium and spatial orientation.", () => loadear());
    }, 0.4, true);
} 

export function loadeye() {
    updateNavigationHistory("loadeye()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    showbtn(document.getElementById("eyecsbtn"));
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
                for (let i = 0; i < corneabtns.length; i++) {
                    hidebtn(corneabtns[i]);
                }
            });
            for (let i = 0; i < corneabtns.length; i++) {
                showbtn(corneabtns[i]);
            }
        },
        0.1
    );
    createSphereBtn(8.55, 9.5, -3.43,function () { createBasicPopup("Iris", "The iris is a colored ring of muscle that controls the size of the pupil. By contracting or dilating the pupil, it controls the amount of light being let in. ");},0.1);
    createSphereBtn(8.25,9.5,-3.47,function () {createBasicPopup("Pupil", "The pupil is a black circular opening at the center of the iris, this regulates the amount of light entering the eye this is done through dilations and constrictions which is in response to light intensity.  "); }, 0.1);
    createSphereBtn(8.894,9.625,-3.15,function () { createBasicPopup("Sclera", "The sclera, commonly known as the white of the eye, provides protection and maintains the eye's shape; it connects with the cornea at the limbus. Made up of collagen and elastic fibers, allows for strength. The sclera connects with the cornea at the limbus and is continuous with the dura mater of the optic nerve.  ");},0.1);
    
    let eyeTabsInfoArr = [["Eye Evolution", "The evolution of the eye started with simple light-sensitive patches of cells on early organisms, which helped them sense light and darkness—a big advantage for avoiding predators or finding better environments. Over time, these patches evolved into small, cup-like shapes that could sense the direction of light, giving these organisms an even greater edge. Eventually, lenses formed, allowing these early eyes to focus light and see sharper images, leading to the camera-like eyes we see in many animals today. Something interesting to note  is that eyes evolved in different ways across species—like the compound eyes of insects and the single-lens eyes of humans."], ["Glaucoma", "Glaucoma is a group of eye conditions that damage the optic nerve, often due to abnormally high pressure inside the eye (intraocular pressure). This damage can lead to irreversible vision loss if left untreated. The most common types are open-angle glaucoma, which develops slowly over time, and angle-closure glaucoma, which can occur suddenly. Risk factors include age, family history, high intraocular pressure, and certain medical conditions like diabetes. Symptoms can be subtle in early stages, especially for open-angle glaucoma, but may include gradual loss of peripheral vision, eye pain, headaches, and blurred vision. The progression of glaucoma is typically described in stages: early, moderate, advanced, and severe. In the early stage, there may be minimal vision loss, while moderate stage shows noticeable peripheral vision loss. Advanced stage glaucoma presents significant vision loss, and in the severe stage, there is extreme tunnel vision or near-total blindness. Treatment options vary depending on the type and stage but may include eye drops, oral medications, laser therapy, or surgery, all aimed at reducing intraocular pressure and preventing further optic nerve damage."]];
    let eyepanel = createPanel("eyepanel", "Eye Information", "eyeclose", createTabHTML(eyeTabsInfoArr));
    let eyeevbtn = createEvolutionBtn("Eye", eyepanel.id);
    showbtn(eyeevbtn);
}

export function loadeyecs() {
    updateNavigationHistory("loadeyecs()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Eye Cross-Section";
    importmesh("eye_crosssection.glb", new BABYLON.Vector3(-1220.83713583762, 468.32129390641774, 387.70330910524217), new BABYLON.Vector3(-690, 340, -450));
    camera.upperRadiusLimit = 1000;
    
    createSphereBtn(-747.7206686288839, 255.380098839613288, -737.3180460121363, function () {createBasicPopup("Optic Nerve", "The optic nerve is a bundle of nerve fibers that transmits visual information from the retina to the brain, enabling the perception and interpretation of visual stimuli. This area is considered the 'blind spot' and does not contain any photoreceptors");}, 10);
    createSphereBtn(-729.6513677863035,107.19844131225364,-510.8989235245537, function () {createBasicPopup("Lateral rectus muscle", "The lateral rectus muscle is one of the six muscles that help control eye movement. It's responsible for moving the eye inward, toward the nose, which is essential for focusing and working with the other eye muscles for smooth, coordinated vision.");}, 10);
    createSphereBtn(-725.2372110362949,360.82759970172265,-334.6778510472045, function () {createBasicPopup("Lens","The lens, a transparent, flexible structure made mostly up of protein located behind the iris. Its job is to bend the light to focus it on the retina; this is a process known as accommodation.");}, 10);
    createSphereBtn( -694.1135974638247,349.5566710608301,-651.6255895494334, function () {createBasicPopup("Macula","The macula, the central region of the retina, is specialized for clear vision. Has a bunch of cones which are located in the center also known as the fovea.");}, 10);
    createSphereBtn(-698.8431101115226,350.75978079063424,-657.7620308707393, function () {createBasicPopup("Fovea","The fovea is an area in the retina responsible for sharp, detailed central vision. It contains a high concentration of cone cells and is completely rod-free.");}, 10);
    createSphereBtn(-720.9811592044188,490.6650857507254,-649.8206340299346, function () {createBasicPopup("Choroid","The choroid, a vascular layer between the retina and sclera, provides oxygen and nutrients to the retina. It contains melanin to absorb excess light, enhancing visual clarity.");}, 10);
    createSphereBtn(-637.7485274452949,453.9846266362982,-585.1741745049378, function () {createBasicPopup("Vitreous humor","The vitreous humor allows light to pass through the retina. Made up of a clear gel that is made with water mostly but contains collagen fibers and hyaluronic acid.");}, 10);
    createSphereBtn( -625.6433343080319,364.35601067959186,-283.16241966889675, function () {createBasicPopup("Aqueous humor","Aqueous humor is the clear liquid inside the front part of the eye. It nourishes the eye and keeps it inflated. If an imbalance were to occur, vision loss would be prominent.");}, 10);
    createSphereBtn(-740.0228294908184,488.24530020957155,-341.8409119240107, function () {createBasicPopup("Ciliary body & Ciliary Muscle","The ciliary body is a ring-shaped structure located behind the iris, responsible for producing the aqueous humor and controlling the lens's shape for focusing.");}, 10);
    createSphereBtn(-739.723580681802,426.98009065092253,-348.53649781844973, function () {createBasicPopup("Zonules (Suspensory ligaments)","Zonules, or suspensory ligaments, are fine fibers that connect the lens to the ciliary body, holding it in place and enabling the lens to change shape for accommodation.");}, 10);
    createSphereBtn(-709.9650297477576,213.07623791517148,-320.4780180239134, function () {createBasicPopup("Conjunctiva","The conjunctiva, a thin, transparent membrane covering the sclera and lining the inside of the eyelids, produces mucus and tears to lubricate the eye.");}, 10);
    createSphereBtn(-701.0626184862127,476.06770281147726,-306.89414292435765, function () {createBasicPopup("Canal of Schlemm","The canal of Schlemm drains aqueous humor from the eye into the bloodstream, helping to regulate pressure in the eye.");}, 10);
    createSphereBtn(-686.5002775417,430.7500872086882,-303.09907649089337, function () {createBasicPopup("Trabecular meshwork","The trabecular meshwork filters and removes the aqueous humor from the eye into a vein, helping maintain eye pressure.");}, 10);
    createSphereBtn(-615.1701264665088,352.6009040068175,-292.4789932862294, function () {createBasicPopup("Anterior chamber","The anterior chamber is a fluid-filled space between the cornea and the iris, containing aqueous humor, playing a role in eye health and vision.");}, 10);
    createSphereBtn(-654.658096905029,281.6036208092823,-326.15331366571115, function () {createBasicPopup("Posterior chamber","The posterior chamber, full of aqueous humor, is located behind the iris and in front of the lens, helping create pressure in the eye.");}, 10);
    createSphereBtn( -770.0293722001275,364.4625971261423,-347.73186461767375, function () {createBasicPopup("Ora serrata","The ora serrata is a serrated boundary where the retina ends and the ciliary body starts. It separates retinal tissue from the anterior segment.");}, 10);
    createSphereBtn(-683.9622573297723,293.2541163516381,-671.7567644956082, function () {createBasicPopup("Optic disc","The optic disc is where the optic nerve connects to the retina, creating the blind spot where there are no photoreceptors.");}, 10);
    createSphereBtn(-721.8854482751058,284.9770891204961,-753.2088269046258, function () {createBasicPopup("Dura mater","The dura mater is the toughest membrane covering the brain and spinal cord, providing protection for the eye and serving as a barrier against physical impacts and infections.");}, 10);    
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

export function loadear() {
    updateNavigationHistory("loadear()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById("title").innerHTML = "Ear";
    importmesh("ear.glb", new BABYLON.Vector3(1, 0, -1.2), new BABYLON.Vector3(0, 0.8, 0), null, new BABYLON.Vector3(0.4, 0.4, 0.4), new BABYLON.Vector3(0, 0, 0))
    
    document.getElementById('backHuman').style.display = 'block';
    document.getElementById('earcsbtn').style.display = 'block';
}

export function loadearcs() {
    updateNavigationHistory("loadearcs()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backHuman"));
    document.getElementById("title").innerHTML = "Ear Cross-Section";
    importmesh("ear_cs.glb", new BABYLON.Vector3(1, 0.8, -1), new BABYLON.Vector3(0, 0.75, 0), null, new BABYLON.Vector3(6, 6, 6), new BABYLON.Vector3(0, 0, 0))
    camera.upperRadiusLimit = 100;
    
    document.getElementById('backHuman').style.display = 'block';
} 