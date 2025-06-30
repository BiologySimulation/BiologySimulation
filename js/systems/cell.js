import { camera } from '../core/babylon-setup.js';
import { updateNavigationHistory } from '../core/utils.js';
import { createSphereBtn, importmesh, clear, clearbtns, createBasicPopup, checkvis, showui, hidebtn, showbtn, createButton, loadPanel, createPanel } from '../core/utils.js';

function cellSpheres() {
    createSphereBtn(0, 0, 3.8, function () {        
        // Create a responsive HTML structure for the cell membrane popup
        const cellMembraneHTML = `
            <div style="text-align: center; max-width: 100%;">
                <div style="margin-bottom: 20px; text-align: left; line-height: 1.5;">
                    <p>The cell membrane is composed primarily of a phospholipid bilayer, with other molecules such as proteins and cholesterol embedded. Phospholipids have 2 unsaturated fatty acid tails and one head. The phospholipid head is hydrophilic (it's attracted to water) and the 2 unsaturated fatty acid tails are hydrophobic (they repel water). The phospholipid bilayer has many kinks and bends in it. This allows the inside of the membrane to be fluid, meaning it can get more or less solid depending on outside conditions, such as temperature. This characteristic is mainly due to the cholesterol embedded. The many proteins in the membrane have a vast array of uses, some including being used for transport, attachment, and signaling.</p>
                </div>
                
                <div style="position: relative; display: inline-block; margin-bottom: 20px;">
                    <img id="cell-membrane-img" src="images/cellmembrane.png" alt="Cell Membrane" style="max-width: 100%; height: auto; max-height: 60vh; position: relative;">
                    
                    <!-- Only one phospholipid button -->
                    <button onclick="phosphoclicked()" 
                            id="btn-1"
                            style="position: absolute; top: 43%; left: 51%; transform: translate(-50%, -50%); 
                                   background: rgba(255, 255, 255, 0.3); border: 1px solid #ff1744; 
                                   border-radius: 50%; width: 20px; height: 20px; font-size: 10px; 
                                   font-weight: bold; color: #ff1744; cursor: pointer; z-index: 1000;
                                   transition: all 0.3s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.1);"
                            title="Singular Phospholipid">1</button>
                    
                    <button onclick="cholestrolclicked()" 
                            id="btn-5"
                            style="position: absolute; top: 54.5%; left: 57.7%; transform: translate(-50%, -50%); 
                                   background: rgba(255, 255, 255, 0.3); border: 1px solid #ff1744; 
                                   border-radius: 50%; width: 20px; height: 20px; font-size: 10px; 
                                   font-weight: bold; color: #ff1744; cursor: pointer; z-index: 1000;
                                   transition: all 0.3s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.1);"
                            title="Cholesterol">2</button>
                    
                                        
                    <button onclick="openchannel()" 
                            id="btn-4"
                            style="position: absolute; top: 69%; left: 47%; transform: translate(-50%, -50%); 
                                   background: rgba(255, 255, 255, 0.3); border: 1px solid #ff1744; 
                                   border-radius: 50%; width: 20px; height: 20px; font-size: 10px; 
                                   font-weight: bold; color: #ff1744; cursor: pointer; z-index: 1000;
                                   transition: all 0.3s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.1);"
                            title="Channel Transport">3</button>
                    
                    <button onclick="receptorproteinclicked()" 
                            id="btn-6"
                            style="position: absolute; top: 65%; left: 29%; transform: translate(-50%, -50%); 
                                   background: rgba(255, 255, 255, 0.3); border: 1px solid #ff1744; 
                                   border-radius: 50%; width: 20px; height: 20px; font-size: 10px; 
                                   font-weight: bold; color: #ff1744; cursor: pointer; z-index: 1000;
                                   transition: all 0.3s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.1);"
                            title="Receptor Protein">4</button>
                </div>
                
                <div style="margin-top: 15px; font-size: 14px; color: #666;">
                    <p><strong>Click on a numbered button to learn more about that feature of the cell membrane</strong></p>
                    <p style="font-size: 12px; margin-top: 10px;">
                        1: Singular Phospholipid<br> | 2: Cholesterol | 3: Channel Transport | 4: Receptor Protein
                    </p>
                </div>
            </div>
        `;
        
        Swal.fire({
            title: "Cell Membrane",
            html: cellMembraneHTML,
            background: "black",
            color: "white",
            width: window.innerWidth * 0.8,
            backdrop: false,
            showConfirmButton: true,
            confirmButtonText: "Close",
            customClass: {
                popup: 'cell-membrane-popup'
            },
            didOpen: () => {
                // Buttons are now positioned with CSS percentages
            }
        })
    }, 0.25, true);
    
    createSphereBtn(0.4, 0.2, 3.3, function () {
        createBasicPopup("Cell Mitochondria", "The mitochondria, aka the 'powerhouse of the cell', is a very important organelle that primarily functions in generating energy in the form of ATP for cellular processes through cellular respiration. The anatomy of a mitochondrion is designed to maximize energy production. The inner and outer membranes increase surface area and provide a place for energy production to happen.", () => loadmitochondria());
    }, 0.25, true);
    createSphereBtn(0.3, 0.2, 0, function () {
        createBasicPopup("Cell Nucleus", "The nucleus serves as the control center of the cell, and is where genetic information is stored. The DNA is enclosed in a protective structure called the nuclear envelope. This is a double membrane made up of a phospholipid bilayer, much like that of the cell membrane. Holes in the envelope, called nuclear pores, regulate what goes in and out of the nucleus. The interior of the nucleus, also called the nucleoplasm, contains the genetic material of the cell. In humans, there are 23 pairs of chromosomes, and the nucleus is where processes such as DNA replication and transcription happen. The nucleolus is a condensed region inside the nucleus, and it is the location of assembly of ribosomes (rRNA), which exit the nucleus for use in protein synthesis.");
    }, 0.25);
    createSphereBtn(-1.3, 0.2, 1.7, function () {
        createBasicPopup("Cell Golgi", 'The Golgi apparatus, aka the Golgi body, is an organelle composed of a series of small, flat sacs stacked in the cell\'s cytoplasm. The function of the Golgi apparatus is to sort out and package protein and lipid molecules synthesized by the ER or free-floating ribosomes for intercellular use or transport out of the cell. Additionally, the Golgi can add "tags" to molecules, making them more structurally stable. It can sometimes also locate where the tagged structure goes.', () => loadgolgi());
    }, 0.25, true);

    let ribotext = ` 
    Structure - Ribosomes are made up of two main components, the large subunit and the small subunit. Ribosomes are made in the nucleolus where four strands of rRNA combine with ribosomal proteins to make the large and small subunit. 
    <br><br>
    Function - The main function of ribosomes is to help build proteins. In the process of building proteins, they are present in the translation. After the transcription happens, where the mRNA is produced as a copy of DNA, The mRNA goes to the ribosome to start the process of translation. In translation, The mRNA is translated by the tRNA to bring the corresponding amino acids and produce a polypeptide chain. The process of producing a polypeptide can be split into three parts. The initiation of translation starts when the tRNA binds to the start codon of the mRNA this happens on the small subunit of the ribosome, then the large subunit of the ribosome covers the small subunit of the ribosome, the elongation of the proteins starts. To accommodate the tRNA, ribosomes have an A site, P site, and an E site. The tRNA first enters through the P site of the ribosome with an amino acid attached to it. There will be another tRNA in the P site of the ribosome with the current chain of amino acids. The chain of polypeptides on the P site will be attached to the amino acid of the tRNA on the A site so the current chain of polypeptides in the tRNA on the A site. Then the tRNA in the P site will exit the ribosome though the E site and the tRNA with the polypeptides will move to the P site. This cycle will continue till the end of the polypeptide when the tRNA reads the end codon. 
    <br><br>
    Position - There are two types of ribosomes, bound and unbound ribosomes. Bound ribosomes are typically present on the nuclear envelope or the endoplasmic reticulum(ER) while unbound ribosomes float around in the cytosol. While the position of the ribosomes have no difference in structure, they both produce different types of proteins. Proteins made from bound ribosomes usually carry materials that are exported from the cell or are inserted into membranes, like lysosomes. The amount of ribosomes present in the cell depends on the cell function and its need for proteins. For example, cells in the pancreas frequently export digestive enzymes, therefore it has a lot of bound ribosomes.
    <br><br>
    mRNA decides if protein is made on ER or cytosol. mRNA has a signal to tell if protein is made on ER or cytosol. Those made on ER need further modification
    <br><br>
    Evolution - Early life forms relied more heavily on RNA for both genetic information storage and catalytic functions. In the context of ribosomes, this suggests that primitive ribosomes might have been composed primarily of RNA, with catalytic roles carried out by ribozymes (RNA molecules with enzymatic activity).
    <br><br>
    Over time, as organisms evolved, there was a transition from an RNA-centric world to one where proteins took on more structural and catalytic roles. This led to the development of the modern ribosome, which is a complex made up of both RNA and proteins. The small and large subunits of the ribosome are composed of ribosomal RNA (rRNA) and proteins, and they work together to facilitate the synthesis of proteins in a highly orchestrated process.
    <br><br><br><br>
    `;
    let ribopanel = createPanel("ribopanel", "Ribosome Functionality", "riboclose", ribotext, false);

    createSphereBtn(
        0.28544865999113617, -0.015085010293525603, 2.0371446696496496,
        function () {
            createBasicPopup(
                "Ribosome",
                "Ribosomes, complexes made of ribosomal RNA (rRNA) and protein, carry out protein synthesis in cells. They are made up of a larger top subunit and a smaller bottom subunit. These both interact with mRNA and tRNA molecules to perform translation. High rates of protein synthesis are associated with an abundance of ribosomes. Ribosomes function in two cytoplasmic locations: free ribosomes in the cytosol and bound ribosomes attached to the rough endoplasmic reticulum or nuclear envelope. Both bound and free ribosomes are structurally identical and can switch roles. Free ribosomes produce proteins for the cytosol, such as enzymes catalyzing sugar breakdown, while bound ribosomes create proteins for membrane insertion, packaging within organelles, or cell export, common in cells specialized in protein secretion, like the pancreas cells that secrete digestive enzymes.",
                () => loadribosome(),
                "3D Model",
                () => loadPanel(ribopanel.id),
                "Info"
            );
        },
        0.15,
        true
    );
    createSphereBtn(1.8, 0.2, -0.5, function () {
        createBasicPopup("Rough Endoplasmic Reticulum", "The Rough ER, studded with ribosomes, plays a role in synthesizing and secreting proteins. It also acts as a membrane factory, growing by incorporating proteins and phospholipids and transporting them via vesicles to other parts of the cell.", () => loadrougher());
    }, 0.25, true);
    createSphereBtn(1.2248904211980474, 0.16952203700465684, 1.8693672639905412, function () {
        createBasicPopup("Smooth Endoplasmic Reticulum", "(add description here)", () => loadsmoother());
    }, 0.25, true);
    createSphereBtn(0.353150398090031, 0.4304624896982965, -0.32896007806854577, function () {
        createBasicPopup("Nucleolus", "The nucleolus is a condensed region inside the nucleus, and it is the location of assembly of ribosomes (rRNA), which exit the nucleus for use in protein synthesis. ", () => loaddna());
    }, 0.25, true);
    createSphereBtn(1.1942075977140756, 0.15042321941889902, 2.4992473761184826, function () {
        createBasicPopup("Centrioles", "Centrioles are essential for cell division, aiding in the organization of microtubules during mitosis and meiosis. They also contribute to the formation of cilia and flagella, crucial for cell movement and sensory functions. ");
    }, 0.25);

}

export function loadcell() {
    updateNavigationHistory("loadcell()");
    showui();
    clear();
    clearbtns()
    showbtn(document.getElementById("backHuman"));
        showbtn(document.getElementById("backHuman"));
    document.getElementById('title').innerHTML = "Cell";
    camera.lowerRadiusLimit = 2;
    Swal.close();
    importmesh("ribosoma.glb", null, false, null, new BABYLON.Vector3(0.75, 0.75, 0.75), new BABYLON.Vector3(0.285891139806715, -0.19598621967280927, 1.9844400980925068));
    importmesh("animal_cell.glb", new BABYLON.Vector3(-10, 100, 5), new BABYLON.Vector3(0.30131802632214566, 0.09506459871646733, 0.4884553111889417), 5);
    cellSpheres();
}

export function loadribosome() {
    updateNavigationHistory("loadribosome()");
    clear();
    clearbtns()
    showbtn(document.getElementById("backcell"));
    importmesh("ribosoma.glb", new BABYLON.Vector3(0, 0, 0));
    document.getElementById("title").innerHTML = "Ribosome";
}

export function membraneclicked() {
    updateNavigationHistory("membraneclicked()");
    clear();
    createPhospholipidDropdown("membrane");
    importmesh("cell_membrane.glb", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(5.138798059509928, -2.55476766845, -4.7430779286881455), 20);
    document.getElementById("title").innerHTML = "Phospholipid Bilayer";
    document.getElementById('backHuman').style.display = 'none';
    document.getElementById('backcell').style.display = 'block';
}

export function phosphoclicked() {
    updateNavigationHistory("phosphoclicked()");
    clear();
    clearbtns();
    showbtn(document.getElementById("backcell"));
    createPhospholipidDropdown("single");
    importmesh("phospho_sama.glb", new BABYLON.Vector3(18.165862883491645, 5.896657820488788, -1.885683407535689), new BABYLON.Vector3(0.15086973704248052, 0.27308798455651484, -0.6523204123200439));
    document.getElementById("title").innerHTML = "Phospholipid";
    document.getElementById('backHuman').style.display = 'none';
    document.getElementById('backcell').style.display = 'block';
}

export function phosphoclicked2() {
    updateNavigationHistory("phosphoclicked2()");
    clear();
    createPhospholipidDropdown("double");
    importmesh("phospholipid.glb", new BABYLON.Vector3(-2.1062699042840367e-14, 5.26434436600806e-16, 8.597326787892316), new BABYLON.Vector3(2.0678336313738668, 0.0545294321544116, -0.22056811927664288), null, new BABYLON.Vector3(0.01, 0.01, 0.01));
    document.getElementById("title").innerHTML = "2 Phospholipids";
    document.getElementById('backHuman').style.display = 'none';
    document.getElementById('backcell').style.display = 'block';
}

// Helper function to create the phospholipid dropdown
function createPhospholipidDropdown(selectedOption) {
    clearbtns();
    showbtn(document.getElementById("backcell"));
    
    // Create dropdown container
    const dropdownContainer = document.createElement("div");
    dropdownContainer.id = "phospholipid-dropdown";
    dropdownContainer.style.cssText = `
        position: absolute;
        left: 44vw;
        top: 80vh;
        z-index: 100;
        font-family: "amazon-ember";
        font-size: calc(0.65vw + 0.65vh);
        animation: animbtn 1.3s ease forwards;
    `;
    
    // Create select element
    const select = document.createElement("select");
    select.style.cssText = `
        padding: 8px 12px;
        border: 2px solid #ff7e5f;
        border-radius: 6px;
        background: linear-gradient(135deg, #ff7e5f, #feb47b);
        color: white;
        font-family: "amazon-ember";
        font-size: calc(0.65vw + 0.65vh);
        cursor: pointer;
        min-width: 200px;
        outline: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    `;
    
    // Create options
    const options = [
        { value: "single", text: "Single Phospholipid" },
        { value: "double", text: "Double Phospholipid" },
        { value: "membrane", text: "Phospholipid Bilayer" }
    ];
    
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        optionElement.style.cssText = `
            background: #333;
            color: white;
            padding: 8px;
        `;
        if (option.value === selectedOption) {
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    });
    
    // Add hover effect
    select.addEventListener("mouseenter", function() {
        this.style.background = "linear-gradient(135deg, #ff6a3d, #fd9644)";
        this.style.borderColor = "#ff6a3d";
        this.style.transform = "scale(1.05)";
    });
    
    select.addEventListener("mouseleave", function() {
        this.style.background = "linear-gradient(135deg, #ff7e5f, #feb47b)";
        this.style.borderColor = "#ff7e5f";
        this.style.transform = "scale(1)";
    });
    
    // Add change event listener
    select.addEventListener("change", function() {
        const selectedValue = this.value;
        switch(selectedValue) {
            case "single":
                phosphoclicked();
                break;
            case "double":
                phosphoclicked2();
                break;
            case "membrane":
                membraneclicked();
                break;
        }
    });
    
    // Assemble dropdown
    dropdownContainer.appendChild(select);
    document.body.appendChild(dropdownContainer);
}

export function openchannel() {
    updateNavigationHistory("openchannel()");
    clear();
    importmesh("openchannel.glb", new BABYLON.Vector3(0, 0, 0));
    document.getElementById("title").innerHTML = "Open Channel";
    document.getElementById('backHuman').style.display = 'none';
    document.getElementById('backcell').style.display = 'block';
}

export function cholestrolclicked() {
    updateNavigationHistory("cholestrolclicked()");
    clear();
    importmesh("Cholestoral.glb", new BABYLON.Vector3(0, 0, 0));
    document.getElementById("title").innerHTML = "Cholesterol";
    document.getElementById('backHuman').style.display = 'none';
    document.getElementById('backcell').style.display = 'block';
}

export function receptorproteinclicked() {
    Swal.fire({
        html: '<img class="receptorgifs" src="images/ReceptorProteins/antiporter.gif"></img><img class="receptorgifs" src="images/ReceptorProteins/gated_channel.gif"></img><img class="receptorgifs" src="images/ReceptorProteins/open_channel.gif"></img><br><img class="receptorgifs" src="images/ReceptorProteins/symporter.gif"></img><img class="receptorgifs" src="images/ReceptorProteins/transport_rhodopsin.gif"></img><img class="receptorgifs" src="images/ReceptorProteins/uniporter.gif"></img><p style="text-align:left;">Antiporter: An antiporter is a protein that helps move two different substances across a cell membrane in opposite directions. It is crucial for maintaining things like ion balance and pH levels inside cells. <br><br> Gated Channel: A gated channel is a protein in the cell membrane that can open or close in response to certain signals, like voltage changes or molecule binding. This controls the flow of ions in and out of cells. <br><br> Symporter: A symporter is a protein that transports two molecules or ions across the membrane in the same direction. One substance often moves with its concentration gradient, helping to push the other across. <br><br> Transport Rhodopsin: Transport rhodopsin is a special light-sensitive protein found in some bacteria. When it absorbs light, it helps move ions like protons across the membrane, playing a role similar to ion pumps but activated by light. <br><br> Uniporter: A uniporter is a protein that allows one molecule or ion to passively move across the cell membrane. It only works with one type of substance at a time, usually flowing down its concentration gradient without using energy.</p>',
        backdrop: false,
        background: "black",
        color: "white",
        title: "Receptor Proteins",
        width: window.innerWidth * 0.8,
    });
}

export function loadmitochondria() {
    updateNavigationHistory("loadmitochondria()");
    clear();
    clearbtns()
    importmesh("mitocondrias.glb", new BABYLON.Vector3(0, 0, 0), null, null, new BABYLON.Vector3(5, 5, 5));
    document.getElementById("title").innerHTML = "Mitochondria";
    document.getElementById('backcell').style.display = 'block';
    const showETCBtn = document.getElementById('ETC');
    showbtn(showETCBtn);
    showbtn(document.getElementById("backHuman"));
    showETCBtn.textContent = "Show Electron Transport Chain";
}

export function loadETC() {
    updateNavigationHistory("loadETC()");
    const showETCBtn = document.getElementById('ETC');
    if (showETCBtn.textContent === "Show Electron Transport Chain") {
        showETCBtn.textContent = "Hide Electron Transport Chain";
        clear();
        clearbtns()
        showbtn(document.getElementById("backHuman"));
        importmesh("etc.glb", null, new BABYLON.Vector3(2.2716116774026744,2.9540898105264355,-15.497743901108434));
        document.getElementById('backcell').style.display = 'block';
        document.getElementById("title").innerHTML = "Electron Transport Chain";
    } else {
        loadmitochondria(); 
    }
}

export function loadgolgi() {
    updateNavigationHistory("loadgolgi()");
    clear();
    importmesh("golgi.glb", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, 0, 0), null, new BABYLON.Vector3(5, 5, 5));
    document.getElementById("title").innerHTML = "Golgi";
    document.getElementById('backcell').style.display = 'block';
}

export function loadrougher() {
    updateNavigationHistory("loadrougher()");
    clear();
    importmesh("rough_er.glb", new BABYLON.Vector3(0, 0, 0), null, null, new BABYLON.Vector3(20, 20, 20));
    document.getElementById("title").innerHTML = "Rough Endoplasmic Reticulum";
    document.getElementById('backcell').style.display = 'block';
}

export function loadsmoother() {
    updateNavigationHistory("loadsmoother()");
    clear();
    importmesh("smooth_er.glb", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0), null, new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(0, 0, 0.5));
    document.getElementById("title").innerHTML = "Smooth Endoplasmic Reticulum";
    document.getElementById('backcell').style.display = 'block';
}

export function loaddna() {
    updateNavigationHistory("loaddna()");
    clear();
    importmesh("dna.glb", new BABYLON.Vector3(2.4089047395701412,-3,250), new BABYLON.Vector3(36,236.14133640561624,-22.866524279775604), null, new BABYLON.Vector3(0.1, 0.1, 0.1));
    camera.upperRadiusLimit = 500;
    document.getElementById("title").innerHTML = "DNA";
    document.getElementById('backcell').style.display = 'block';
} 