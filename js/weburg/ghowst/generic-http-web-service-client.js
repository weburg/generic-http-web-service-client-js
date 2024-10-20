import {HttpWebServiceInvoker} from './http-web-service-invoker.js';

// Thin wrapper for stubless client
export function createGenericHttpWebServiceClient(baseUrl) {
    let handler = {
        get: function(target, name) {
            return function() {
                return target(name, Array.prototype.slice.call(arguments), baseUrl);
            }
        }
    }

    return new Proxy(new HttpWebServiceInvoker().invoke, handler);
}