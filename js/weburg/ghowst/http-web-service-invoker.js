export function HttpWebServiceInvoker() {
    function getEntityName(name, verb) {
        return name.substring(verb.length, name.length).toLowerCase();
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
                xhr.open("GET", baseUrl + '/' + entity + (myArguments !== undefined && myArguments.length > 0 ?
                    "?id=" + encodeURIComponent(myArguments[0]) : ""), false);
                xhr.send(null);

                response = JSON.parse(xhr.responseText);

                return response;
            case "create":
                formData = new FormData();

                for (let property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                xhr = new XMLHttpRequest();
                xhr.open("POST", baseUrl + '/' + entity, false);
                xhr.send(formData);

                response = JSON.parse(xhr.responseText);

                return response;
            case "createOrReplace":
                formData = new FormData();

                for (let property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                xhr = new XMLHttpRequest();
                xhr.open("PUT", baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]["id"]), false);
                xhr.send(formData);

                response = JSON.parse(xhr.responseText);

                return response;
            case "update":
                formData = new FormData();

                for (let property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                xhr = new XMLHttpRequest();
                xhr.open("PATCH", baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]["id"]), false);
                xhr.send(formData);

                return;
            case "delete":
                xhr = new XMLHttpRequest();
                xhr.open("DELETE", baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]), false);
                xhr.send(null);

                return;
            default:
                formData = new FormData();

                for (let property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                xhr = new XMLHttpRequest();
                xhr.open("POST", baseUrl + '/' + entity + '/' + verb + (myArguments !== undefined && myArguments.length > 0 ?
                    "?id=" + encodeURIComponent(myArguments[0]) : ""), false); // TODO we assume id is passed but need to detect that more proper, custom verbs might pass different things
                xhr.send(formData);

                return;
        }
    }
}