import { engine, scene, camera } from './core/babylon-setup.js';
import * as utils from './core/utils.js';

import * as cell from './systems/cell.js';
import * as skeletal from './systems/skeletal.js';
import * as human from './systems/human.js';
import * as nervous from './systems/nervous.js';
import * as cardiovascular from './systems/cardiovascular.js';
import * as digestive from './systems/digestive.js';
import * as respiratory from './systems/respiratory.js';
import * as lymphatic from './systems/lymphatic.js';
import * as endocrine from './systems/endocrine.js';
import * as integumentary from './systems/integumentary.js';
import * as muscular from './systems/muscular.js';
import * as excretory from './systems/excretory.js';

// Assign all imported functions to the global window object
Object.assign(window, {
    ...cell,
    ...skeletal,
    ...human,
    ...nervous,
    ...cardiovascular,
    ...digestive,
    ...respiratory,
    ...lymphatic,
    ...endocrine,
    ...integumentary,
    ...muscular,
    ...excretory,
    ...utils,
});

document.addEventListener('DOMContentLoaded', () => {
    human.loadhuman();
    engine.runRenderLoop(function () {
        scene.render();
    });

    // // Debugging: print 3D position of mouse click on mesh
    // scene.onPointerObservable.add(function(pointerInfo) {
    //     if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
    //         const pickInfo = pointerInfo.pickInfo;
    //         if (pickInfo && pickInfo.hit && pickInfo.pickedMesh && pickInfo.pickedPoint) {
    //             const p = pickInfo.pickedPoint;
    //             console.log(`Clicked Position:\n${p.x}, ${p.y}, ${p.z}`);
    //         }
    //     }
    // }, BABYLON.PointerEventTypes.POINTERPICK);
});

window.addEventListener("resize", function () {
    engine.resize();
});

// // Debugging: print camera position when 'P' is pressed
// window.addEventListener('keydown', function(e) {
//     if (e.key === 'p' || e.key === 'P') {
//         if (camera && camera.position) {
//             const p = camera.position;
//             console.log(`Camera Position:\n${p.x}, ${p.y}, ${p.z}`);
//         } else {
//             console.log('Babylon camera not found or not initialized.');
//         }
//     }
// }); 