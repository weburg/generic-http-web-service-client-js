export function HttpWebServiceInvoker() {
    function getEntityName(name, verb) {
        return name.substring(verb.length, name.length).toLowerCase();
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

                response = await fetch(baseUrl + '/' + entity + (myArguments !== undefined && myArguments.length > 0 ?
                    "?id=" + encodeURIComponent(myArguments[0]) : ""), request);

                return await response.json();
            case "create":
                formData = new FormData();

                for (let property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                request = {
                    method: "POST",
                    body: formData
                }

                response = await fetch(baseUrl + '/' + entity, request);

                return await response.json();
            case "createOrReplace":
                formData = new FormData();

                for (let property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                request = {
                    method: "PUT",
                    body: formData
                }

                response = await fetch(baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]["id"]), request);

                return await response.json();
            case "update":
                formData = new FormData();

                for (let property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                request = {
                    method: "PATCH",
                    body: formData
                }

                response = await fetch(baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]["id"]), request);

                return await response.json();
            case "delete":
                request = {
                    method: "DELETE"
                }

                response = await fetch(baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]), request);

                return response.json();
            default:
                formData = new FormData();

                for (let property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                response = await fetch(baseUrl + '/' + entity + '/' + verb + (myArguments !== undefined
                    && myArguments.length > 0 ? "?id=" + encodeURIComponent(myArguments[0]) : ""), request);  // TODO we assume id is passed but need to detect that more proper, custom verbs might pass different things

                return;
        }
    }
}