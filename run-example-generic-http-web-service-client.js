import {GenericHttpWebServiceClient} from './js/weburg/ghowst/generic-http-web-service-client.js';
import {openAsBlob} from 'node:fs';
import {basename} from 'node:path';

async function getFile(filepath) {
    return new File([await openAsBlob(filepath)], basename(filepath));
}

let httpWebService = new GenericHttpWebServiceClient("http://localhost:8081/generichttpws");

/*** Photo ***/

// Create
let photo = {
    caption: "Some JS-N K",
    photoFile: await getFile("nodejs.jpg")
}
httpWebService.createPhotos({photo: photo});

/*** Engine ***/

let engine;

// Create
engine = {
    name: "JS-NEngine",
    cylinders: 44,
    throttleSetting: 49
}
let engineId1 = await httpWebService.createEngines({engine: engine});

// CreateOrReplace (which will create)
engine = {
    id: -1,
    name: "JS-NEngineCreatedNotReplaced",
    cylinders: 45,
    throttleSetting: 50
}
httpWebService.createOrReplaceEngines({engine: engine});

// Prepare for CreateOrReplace
engine = {
    name: "JS-NEngine2",
    cylinders: 44,
    throttleSetting: 49
}
let engineId2 = await httpWebService.createEngines({engine: engine});

// CreateOrReplace (which will replace)
engine = {
    id: engineId2,
    name: "JS-NEngine2Replacement",
    cylinders: 56,
    throttleSetting: 59
}
httpWebService.createOrReplaceEngines({engine: engine});

// Prepare for Update
engine = {
    name: "JS-NEngine3",
    cylinders: 44,
    throttleSetting: 49
}
let engineId3 = await httpWebService.createEngines({engine: engine});

// Update
engine = {
    id: engineId3,
    name: "JS-NEngine3Updated",
}
httpWebService.updateEngines({engine: engine});

// Get
engine = await httpWebService.getEngines({id: engineId1});
console.log("Engine returned: " + engine.name);

// Get all
let engines = await httpWebService.getEngines();
console.log("Engines returned: " + engines.length);

// Prepare for delete
engine = {
    name: "JS-NEngine4ToDelete",
    cylinders: 89,
    throttleSetting: 70
}
let engineId4 = await httpWebService.createEngines({engine: engine});

// Delete
httpWebService.deleteEngines({id: engineId4});

// Custom verb
httpWebService.restartEngines({id: engineId2});

// Repeat, complex objects with different names
let truck1 = {
    name: "Ram",
    engineId: engineId1
}
let truck2 = {
    name: "Ford",
    engineId: engineId2
}
let truckNameCompareResult = await httpWebService.raceTrucks({truck1: truck1, truck2: truck2});

if (truckNameCompareResult === 0) {
    throw new Error("Did not expect both trucks to have the same name.");
}

// Induce a not found error and catch it
try {
    engine = await httpWebService.getEngines({id: -2});
    console.log("Engine returned: " + engine.name);
} catch (e) {
    if (e.name === "HttpWebServiceError") {
        console.log("Status: " + e.httpStatus + " Message: " + e.message);
    }
}

// Induce a service error and catch it
try {
    let httpWebServiceWrong = GenericHttpWebServiceClient("http://nohost:8081/generichttpws");
    await httpWebServiceWrong.getEngines({id: -2});
} catch (e) {
    if (e.name === "HttpWebServiceError") {
        console.log("Status: " + e.httpStatus + " Message: " + e.message);
    }
}