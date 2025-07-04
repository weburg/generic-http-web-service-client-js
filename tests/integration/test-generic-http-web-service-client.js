import assert from 'node:assert';
import child_process from 'node:child_process';
import test from 'node:test';
import {GenericHttpWebServiceClient} from '../../js/weburg/ghowst/generic-http-web-service-client.js';

test('ExampleGenericHttpWebServiceClient', async (t) => {
    child_process.execFileSync("node", ["run-example-generic-http-web-service-client.js"], {stdio: "inherit"});
});

test('CreateEngine', async (t) => {
    let testService = new GenericHttpWebServiceClient("http://localhost:8081/generichttpws");

    let engine = {
        name: "JSTestEngine",
        cylinders: 12,
        throttleSetting: 50
    };

    let engineId = await testService.createEngines({engine: engine});

    assert(engineId > 0);
});