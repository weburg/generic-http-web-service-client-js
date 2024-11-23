export function HttpWebServiceInvoker() {
    function getEntityName(name, verb) {
        return name.substring(verb.length, name.length).toLowerCase();
    }

    function generateQs(myArguments) {
        return (myArguments.length > 0 ? '?' + new URLSearchParams(myArguments[0]).toString() : "");
    }

    this.invoke = async function(methodName, myArguments, baseUrl) {
        let verb;
        let entity;

        if (methodName.indexOf("get") === 0) {
            verb = "get";
            entity = getEntityName(methodName, verb);
        } else if (methodName.indexOf("createOrReplace") === 0) {
            verb = "createOrReplace";
            entity = getEntityName(methodName, verb);
        } else if (methodName.indexOf("create") === 0) {
            verb = "create";
            entity = getEntityName(methodName, verb);
        } else if (methodName.indexOf("update") === 0) {
            verb = "update";
            entity = getEntityName(methodName, verb);
        } else if (methodName.indexOf("delete") === 0) {
            verb = "delete";
            entity = getEntityName(methodName, verb);
        } else {
            let parts = (methodName[0].toUpperCase() + methodName.substring(1)).split(/(?=[A-Z])/);

            verb = parts[0].toLowerCase();
            entity =  getEntityName(methodName, verb);
        }

        console.log("Verb: " + verb);
        console.log("Entity: " + entity);

        let request;
        let response;
        let formData;

        switch (verb) {
            case "get":
                request = {
                    method: "GET"
                }

                response = await fetch(baseUrl + '/' + entity + generateQs(myArguments), request);

                return await response.json();
            case "create":
                formData = new FormData();

                for (let arg in myArguments) {
                    for (let namedArgument in myArguments[arg]) {
                        for (let property in myArguments[arg][namedArgument]) {
                            formData.append(property, myArguments[arg][namedArgument][property]);
                        }
                    }
                }

                request = {
                    method: "POST",
                    body: formData
                }

                response = await fetch(baseUrl + '/' + entity, request);

                return await response.json();
            case "createOrReplace":
                formData = new FormData();

                for (let arg in myArguments) {
                    for (let namedArgument in myArguments[arg]) {
                        for (let property in myArguments[arg][namedArgument]) {
                            formData.append(property, myArguments[arg][namedArgument][property]);
                        }
                    }
                }

                request = {
                    method: "PUT",
                    body: formData
                }

                response = await fetch(baseUrl + '/' + entity, request);

                return await response.json();
            case "update":
                formData = new FormData();

                for (let arg in myArguments) {
                    for (let namedArgument in myArguments[arg]) {
                        for (let property in myArguments[arg][namedArgument]) {
                            formData.append(property, myArguments[arg][namedArgument][property]);
                        }
                    }
                }

                request = {
                    method: "PATCH",
                    body: formData
                }

                response = await fetch(baseUrl + '/' + entity + generateQs(myArguments), request);

                return await response.json();
            case "delete":
                request = {
                    method: "DELETE"
                }

                response = await fetch(baseUrl + '/' + entity + generateQs(myArguments), request);

                return response.json();
            default:
                formData = new FormData();

                for (let arg in myArguments) {
                    for (let namedArgument in myArguments[arg]) {
                        formData.append(namedArgument, myArguments[arg][namedArgument]);
                    }
                }

                request = {
                    method: "POST",
                    body: formData
                }

                response = await fetch(baseUrl + '/' + entity + '/' + verb, request);

                return;
        }
    }
}