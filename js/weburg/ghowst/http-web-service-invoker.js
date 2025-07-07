import {HttpWebServiceError} from './http-web-service-error.js'

export class HttpWebServiceInvoker {
    static #getResourceName(name, verb) {
        return name.substring(verb.length, name.length).toLowerCase();
    }

    static #generateQs(myArguments) {
        return (myArguments.length > 0 ? '?' + new URLSearchParams(myArguments[0]).toString() : "");
    }

    static async #handleResponse(response) {
        if (response.status >= 400 || response.status < 200) {
            throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
        } else if (response.status >= 300 && response.status < 400) {
            throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
        }

        try {
            return await response.json();
        } catch (e) {
            return;
        }
    }

    static #formDataFromArguments(myArguments) {
        let formData = new FormData();

        for (let arg in myArguments) {
            for (let namedArgument in myArguments[arg]) {
                if (typeof myArguments[arg][namedArgument] !== 'object') {
                    formData.append(namedArgument, myArguments[arg][namedArgument]);
                } else {
                    for (let property in myArguments[arg][namedArgument]) {
                        formData.append(namedArgument + '.' + property, myArguments[arg][namedArgument][property]);
                    }
                }
            }
        }

        return formData;
    }

    async invoke(methodName, myArguments, baseUrl) {
        let verb;
        let resource;

        if (methodName.indexOf("get") === 0) {
            verb = "get";
            resource = HttpWebServiceInvoker.#getResourceName(methodName, verb);
        } else if (methodName.indexOf("createOrReplace") === 0) {
            verb = "createOrReplace";
            resource = HttpWebServiceInvoker.#getResourceName(methodName, verb);
        } else if (methodName.indexOf("create") === 0) {
            verb = "create";
            resource = HttpWebServiceInvoker.#getResourceName(methodName, verb);
        } else if (methodName.indexOf("update") === 0) {
            verb = "update";
            resource = HttpWebServiceInvoker.#getResourceName(methodName, verb);
        } else if (methodName.indexOf("delete") === 0) {
            verb = "delete";
            resource = HttpWebServiceInvoker.#getResourceName(methodName, verb);
        } else {
            let parts = (methodName[0].toUpperCase() + methodName.substring(1)).split(/(?=[A-Z])/);

            verb = parts[0].toLowerCase();
            resource =  HttpWebServiceInvoker.#getResourceName(methodName, verb);
        }

        console.log("Verb: " + verb);
        console.log("Resource: " + resource);

        let request = {
            headers: {
                accept: "application/json"
            }
        };
        let response;

        try {
            switch (verb) {
                case "get":
                    request.method = "GET";

                    response = await fetch(baseUrl + '/' + resource + HttpWebServiceInvoker.#generateQs(myArguments), request);

                    return await HttpWebServiceInvoker.#handleResponse(response);
                case "create":
                    request.method = "POST";
                    request.body = HttpWebServiceInvoker.#formDataFromArguments(myArguments);

                    response = await fetch(baseUrl + '/' + resource, request);

                    return await HttpWebServiceInvoker.#handleResponse(response);
                case "createOrReplace":
                    request.method = "PUT";
                    request.body = HttpWebServiceInvoker.#formDataFromArguments(myArguments);

                    response = await fetch(baseUrl + '/' + resource, request);

                    return await HttpWebServiceInvoker.#handleResponse(response);
                case "update":
                    request.method = "PATCH";
                    request.body = HttpWebServiceInvoker.#formDataFromArguments(myArguments);

                    response = await fetch(baseUrl + '/' + resource, request);

                    return await HttpWebServiceInvoker.#handleResponse(response);
                case "delete":
                    request.method = "DELETE";

                    response = await fetch(baseUrl + '/' + resource + HttpWebServiceInvoker.#generateQs(myArguments), request);

                    return await HttpWebServiceInvoker.#handleResponse(response);
                default:
                    // POST to a custom verb resource
                    request.method = "POST";
                    request.body = HttpWebServiceInvoker.#formDataFromArguments(myArguments);

                    response = await fetch(baseUrl + '/' + resource + '/' + verb, request);

                    return await HttpWebServiceInvoker.#handleResponse(response);
            }
        } catch (e) {
            if (e.name === "HttpWebServiceError") {
                throw e;
            } else {
                throw new HttpWebServiceError(0, "There was a problem processing the web service request: " + e.message);
            }
        }
    }
}