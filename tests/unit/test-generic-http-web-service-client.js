import assert from 'node:assert';
import test from 'node:test';
import {GenericHttpWebServiceClient} from '../../js/weburg/ghowst/generic-http-web-service-client.js';
import {HttpWebServiceError} from "../../js/weburg/ghowst/http-web-service-error.js";

test('TestGenericHttpWebServiceClient', (t) => {
    let testService = new GenericHttpWebServiceClient("http://nohost/noservice");

    assert.rejects(async () => {
        await testService.createResource({resource: {}})
    }, HttpWebServiceError);
});