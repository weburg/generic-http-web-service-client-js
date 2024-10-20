"use strict";

function HttpWebServiceInvoker() {
    function getEntityName(name, verb) {
        return name.substring(verb.length, name.length).toLowerCase();
    }

    this.invoke = function(methodName, myArguments, baseUrl) {
        if (methodName.indexOf("get") === 0) {
            var verb = "get";
            var entity = getEntityName(methodName, verb);
        } else if (methodName.indexOf("createOrReplace") === 0) {
            var verb = "createOrReplace";
            var entity = getEntityName(methodName, verb);
        } else if (methodName.indexOf("create") === 0) {
            var verb = "create";
            var entity = getEntityName(methodName, verb);
        } else if (methodName.indexOf("update") === 0) {
            var verb = "update";
            var entity = getEntityName(methodName, verb);
        } else if (methodName.indexOf("delete") === 0) {
            var verb = "delete";
            var entity = getEntityName(methodName, verb);
        } else {
            var parts = (methodName[0].toUpperCase() + methodName.substring(1)).split(/(?=[A-Z])/);

            var verb = parts[0].toLowerCase();
            var entity =  getEntityName(methodName, verb);
        }

        console.log("Verb: " + verb);
        console.log("Entity: " + entity);

        switch (verb) {
            case "get":
                var xhr = new XMLHttpRequest();
                xhr.open("GET", baseUrl + '/' + entity + (myArguments !== undefined && myArguments.length > 0 ?
                    "?id=" + encodeURIComponent(myArguments[0]) : ""), false);
                xhr.send(null);

                var response = JSON.parse(xhr.responseText);

                return response;
            case "create":
                var formData = new FormData();

                for (var property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                var xhr = new XMLHttpRequest();
                xhr.open("POST", baseUrl + '/' + entity, false);
                xhr.send(formData);

                var response = JSON.parse(xhr.responseText);

                return response;
            case "createOrReplace":
                var formData = new FormData();

                for (var property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                var xhr = new XMLHttpRequest();
                xhr.open("PUT", baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]["id"]), false);
                xhr.send(formData);

                var response = JSON.parse(xhr.responseText);

                return response;
            case "update":
                var formData = new FormData();

                for (var property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                var xhr = new XMLHttpRequest();
                xhr.open("PATCH", baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]["id"]), false);
                xhr.send(formData);

                return;
            case "delete":
                var xhr = new XMLHttpRequest();
                xhr.open("DELETE", baseUrl + '/' + entity + "?id=" + encodeURIComponent(myArguments[0]), false);
                xhr.send(null);

                return;
            default:
                var formData = new FormData();

                for (var property in myArguments[0]) {
                    formData.append(property, myArguments[0][property]);
                }

                var xhr = new XMLHttpRequest();
                xhr.open("POST", baseUrl + '/' + entity + '/' + verb + (myArguments !== undefined && myArguments.length > 0 ?
                    "?id=" + encodeURIComponent(myArguments[0]) : ""), false); // TODO we assume id is passed but need to detect that more proper, custom verbs might pass different things
                xhr.send(formData);

                return;
        }
    }
}