import createGenericHttpWebServiceClient from './js/weburg/ghowst/generic-http-web-service-client.js';
//import pkg from './js/weburg/ghowst/generic-http-web-service-client.js';
//const {createGenericHttpWebServiceClient} = pkg;

let httpWebService = createGenericHttpWebServiceClient("http://localhost:8081/generichttpws");

/*** Photo ***/

// Create
function handlePhotoUpload(files) {
    let photo = {
        caption: "Some JS K",
        photoFile: files[0]
    }
    httpWebService.createPhotos(photo);
}

/*** Engine ***/

let engine;

// Create
engine = {
    name: "JSEngine",
    cylinders: 44,
    throttleSetting: 49
}
let engineId1 = httpWebService.createEngines(engine);

// CreateOrReplace (which will create)
engine = {
    id: -1,
    name: "JSEngineCreatedNotReplaced",
    cylinders: 45,
    throttleSetting: 50
}
httpWebService.createOrReplaceEngines(engine);

// Prepare for CreateOrReplace
engine = {
    name: "JSEngine2",
    cylinders: 44,
    throttleSetting: 49
}
let engineId2 = httpWebService.createEngines(engine);

// CreateOrReplace (which will replace)
engine = {
    id: engineId2,
    name: "JSEngine2Replacement",
    cylinders: 56,
    throttleSetting: 59
}
httpWebService.createOrReplaceEngines(engine);

// Prepare for Update
engine = {
    name: "JSEngine3",
    cylinders: 44,
    throttleSetting: 49
}
let engineId3 = httpWebService.createEngines(engine);

// Update
engine = {
    id: engineId3,
    name: "JSEngine3Updated",
}
httpWebService.updateEngines(engine);

// Get
engine = httpWebService.getEngines(engineId1);
console.log("Engine returned: " + engine.name);

// Get all
let engines = httpWebService.getEngines();
console.log("Engines returned: " + engines.length);

// Prepare for delete
engine = {
    name: "JSEngine4ToDelete",
    cylinders: 89,
    throttleSetting: 70
}
let engineId4 = httpWebService.createEngines(engine);

// Delete
httpWebService.deleteEngines(engineId4);

// Custom verb
httpWebService.restartEngines(engineId2);