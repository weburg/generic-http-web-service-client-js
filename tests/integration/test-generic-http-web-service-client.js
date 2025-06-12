import assert from 'node:assert';
import test from 'node:test';
import {GenericHttpWebServiceClient} from '../../js/weburg/ghowst/generic-http-web-service-client.js';

test('TestGenericHttpWebServiceClient', async (t) => {
    let testService = new GenericHttpWebServiceClient("http://localhost:8081/generichttpws");

    let testEngine = {
        name: "JSTestEngine",
        cylinders: 12,
        throttleSetting: 50
    };

    let engineId = await testService.createEngines({engine: testEngine});

    assert(engineId > 0);
});