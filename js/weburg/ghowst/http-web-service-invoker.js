export function HttpWebServiceInvoker() {
    function getEntityName(name, verb) {
        return name.substring(verb.length, name.length).toLowerCase();
    }

    function generateQs(myArguments) {
        return (myArguments.length > 0 ? '?' + new URLSearchParams(myArguments[0]).toString() : "");
    }

    this.invoke = function(methodName, myArguments, baseUrl) {
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

        let xhr;
        let response;
        let formData;

        switch (verb) {
            case "get":
                xhr = new XMLHttpRequest();
                xhr.open("GET", baseUrl + '/' + entity + generateQs(myArguments), false);
                xhr.setRequestHeader("accept", "application/json");
                xhr.send(null);

                response = JSON.parse(xhr.responseText);

                return response;
            case "create":
                formData = new FormData();

                for (let arg in myArguments) {
                    for (let namedArgument in myArguments[arg]) {
                        for (let property in myArguments[arg][namedArgument]) {
                            formData.append(property, myArguments[arg][namedArgument][property]);
                        }
                    }
                }

                xhr = new XMLHttpRequest();
                xhr.open("POST", baseUrl + '/' + entity, false);
                xhr.setRequestHeader("accept", "application/json");
                xhr.send(formData);

                response = JSON.parse(xhr.responseText);

                return response;
            case "createOrReplace":
                formData = new FormData();

                for (let arg in myArguments) {
                    for (let namedArgument in myArguments[arg]) {
                        for (let property in myArguments[arg][namedArgument]) {
                            formData.append(property, myArguments[arg][namedArgument][property]);
                        }
                    }
                }

                xhr = new XMLHttpRequest();
                xhr.open("PUT", baseUrl + '/' + entity, false);
                xhr.setRequestHeader("accept", "application/json");
                xhr.send(formData);

                response = JSON.parse(xhr.responseText);

                return response;
            case "update":
                formData = new FormData();

                for (let arg in myArguments) {
                    for (let namedArgument in myArguments[arg]) {
                        for (let property in myArguments[arg][namedArgument]) {
                            formData.append(property, myArguments[arg][namedArgument][property]);
                        }
                    }
                }

                xhr = new XMLHttpRequest();
                xhr.open("PATCH", baseUrl + '/' + entity + generateQs(myArguments), false);
                xhr.setRequestHeader("accept", "application/json");
                xhr.send(formData);

                return;
            case "delete":
                xhr = new XMLHttpRequest();
                xhr.open("DELETE", baseUrl + '/' + entity + generateQs(myArguments), false);
                xhr.setRequestHeader("accept", "application/json");
                xhr.send(null);

                return;
            default:
                formData = new FormData();

                for (let arg in myArguments) {
                    for (let namedArgument in myArguments[arg]) {
                        formData.append(namedArgument, myArguments[arg][namedArgument]);
                    }
                }

                xhr = new XMLHttpRequest();
                xhr.open("POST", baseUrl + '/' + entity + '/' + verb, false);
                xhr.setRequestHeader("accept", "application/json");
                xhr.send(formData);

                return;
        }
    }
}