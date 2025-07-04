import assert from 'node:assert';
import test from 'node:test';
import {GenericHttpWebServiceClient} from '../../js/weburg/ghowst/generic-http-web-service-client.js';
import {HttpWebServiceError} from "../../js/weburg/ghowst/http-web-service-error.js";

test('ServiceException', (t) => {
    let testService = new GenericHttpWebServiceClient("http://nohost/noservice");

    let engine = {
        name: "JSTestEngine",
        cylinders: 12,
        throttleSetting: 50
    };

    assert.rejects(async () => {
        await testService.createEngines({resource: engine})
    }, HttpWebServiceError);
});