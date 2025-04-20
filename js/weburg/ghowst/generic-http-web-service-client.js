import {HttpWebServiceInvoker} from './http-web-service-invoker.js';

// Thin wrapper for stubless client
export class GenericHttpWebServiceClient {
    constructor(baseUrl) {
        let self = this;
        this.baseUrl = baseUrl;
        this.httpWebServiceInvoker = new HttpWebServiceInvoker();

        let handler = {
            get: function(target, name) {
                return function() {
                    return target(name, Array.prototype.slice.call(arguments), self.baseUrl);
                }
            }
        }

        return new Proxy(this.httpWebServiceInvoker.invoke, handler);
    }
}