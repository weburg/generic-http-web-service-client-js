import {HttpWebServiceError} from './http-web-service-error.js'

export class HttpWebServiceInvoker {
    static getEntityName(name, verb) {
        return name.substring(verb.length, name.length).toLowerCase();
    }

    static generateQs(myArguments) {
        return (myArguments.length > 0 ? '?' + new URLSearchParams(myArguments[0]).toString() : "");
    }

    async invoke(methodName, myArguments, baseUrl) {
        let verb;
        let entity;

        if (methodName.indexOf("get") === 0) {
            verb = "get";
            entity = HttpWebServiceInvoker.getEntityName(methodName, verb);
        } else if (methodName.indexOf("createOrReplace") === 0) {
            verb = "createOrReplace";
            entity = HttpWebServiceInvoker.getEntityName(methodName, verb);
        } else if (methodName.indexOf("create") === 0) {
            verb = "create";
            entity = HttpWebServiceInvoker.getEntityName(methodName, verb);
        } else if (methodName.indexOf("update") === 0) {
            verb = "update";
            entity = HttpWebServiceInvoker.getEntityName(methodName, verb);
        } else if (methodName.indexOf("delete") === 0) {
            verb = "delete";
            entity = HttpWebServiceInvoker.getEntityName(methodName, verb);
        } else {
            let parts = (methodName[0].toUpperCase() + methodName.substring(1)).split(/(?=[A-Z])/);

            verb = parts[0].toLowerCase();
            entity =  HttpWebServiceInvoker.getEntityName(methodName, verb);
        }

        console.log("Verb: " + verb);
        console.log("Entity: " + entity);

        let request;
        let response;
        let formData;

        try {
            switch (verb) {
                case "get":
                    request = {
                        method: "GET",
                        headers: {
                            accept: "application/json"
                        }
                    }

                    response = await fetch(baseUrl + '/' + entity + HttpWebServiceInvoker.generateQs(myArguments), request);

                    if (response.status >= 400 || response.status < 200) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    } else if (response.status >= 300 && response.status < 400) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    }

                    return await response.json();
                case "create":
                    formData = new FormData();

                    for (let arg in myArguments) {
                        for (let namedArgument in myArguments[arg]) {
                            for (let property in myArguments[arg][namedArgument]) {
                                formData.append(namedArgument + '.' + property, myArguments[arg][namedArgument][property]);
                            }
                        }
                    }

                    request = {
                        method: "POST",
                        headers: {
                            accept: "application/json"
                        },
                        body: formData
                    }


                    response = await fetch(baseUrl + '/' + entity, request);

                    if (response.status >= 400 || response.status < 200) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    } else if (response.status >= 300 && response.status < 400) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    }

                    return await response.json();
                case "createOrReplace":
                    formData = new FormData();

                    for (let arg in myArguments) {
                        for (let namedArgument in myArguments[arg]) {
                            for (let property in myArguments[arg][namedArgument]) {
                                formData.append(namedArgument + '.' + property, myArguments[arg][namedArgument][property]);
                            }
                        }
                    }

                    request = {
                        method: "PUT",
                        headers: {
                            accept: "application/json"
                        },
                        body: formData
                    }

                    response = await fetch(baseUrl + '/' + entity, request);

                    if (response.status >= 400 || response.status < 200) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    } else if (response.status >= 300 && response.status < 400) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    }

                    return await response.json();
                case "update":
                    formData = new FormData();

                    for (let arg in myArguments) {
                        for (let namedArgument in myArguments[arg]) {
                            for (let property in myArguments[arg][namedArgument]) {
                                formData.append(namedArgument + '.' + property, myArguments[arg][namedArgument][property]);
                            }
                        }
                    }

                    request = {
                        method: "PATCH",
                        headers: {
                            accept: "application/json"
                        },
                        body: formData
                    }

                    response = await fetch(baseUrl + '/' + entity + HttpWebServiceInvoker.generateQs(myArguments), request);

                    if (response.status >= 400 || response.status < 200) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    } else if (response.status >= 300 && response.status < 400) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    }

                    return;
                case "delete":
                    request = {
                        method: "DELETE",
                        headers: {
                            accept: "application/json"
                        }
                    }

                    response = await fetch(baseUrl + '/' + entity + HttpWebServiceInvoker.generateQs(myArguments), request);

                    if (response.status >= 400 || response.status < 200) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    } else if (response.status >= 300 && response.status < 400) {
                        throw new HttpWebServiceError(response.status, response.headers.get("x-error-message"));
                    }

                    return;
                default:
                    formData = new FormData();

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

                    request = {
                        method: "POST",
                        headers: {
                            accept: "application/json"
                        },
                        body: formData
                    }

                    response = await fetch(baseUrl + '/' + entity + '/' + verb, request);

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
        } catch (e) {
            if (e.name === "HttpWebServiceError") {
                throw e;
            } else {
                throw new HttpWebServiceError(0, "There was a problem processing the web service request: " + e.message);
            }
        }
    }
}