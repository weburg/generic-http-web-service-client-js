"use strict";

// Thin wrapper for stubless client
function createGenericHttpWebServiceClient(baseUrl) {
    let handler = {
        get: function(target, name) {
            return function() {
                return target(name, Array.prototype.slice.call(arguments), baseUrl);
            }
        }
    }

    return new Proxy(new HttpWebServiceInvoker().invoke, handler);
}