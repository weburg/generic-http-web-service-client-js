# Generic HTTP Web Service Client in JavaScript (GHoWSt)

## A client written to talk to the Generic HTTP Web Service Server

### Design goals

- Use local language semantics to talk to the server dynamically. The only thing
  required are the ghowst classes and a browser.
- Every call, using a method name convention to map to HTTP methods, gets
  translated to HTTP requests. Responses are parsed from JSON and mapped back to
  local objects.

> [!NOTE]
> This JavaScript project runs in both the browser as well as Node.js. It uses
> the Fetch API as well as ES6 modules and FormData, so the code is nearly
> identical between both environments on modern browsers and versions of Node.js
> greater than or equal to version 21. The only difference is how a File is
> obtained when sending files. As of this writing, Node.js's stable Fetch API
> and ES6 modules support aren't ubiquitous, as (for example) Ubuntu 22.04 LTS
> comes with Node.js 12. Be sure to use the latest version of Node.js.

### Example code

```js
import {GenericHttpWebServiceClient} from './js/weburg/ghowst/generic-http-web-service-client.js';

let httpWebService = new GenericHttpWebServiceClient("http://localhost:8081/generichttpws");

// Create
let engine = {
    name: "JSEngine",
    cylinders: 44,
    throttleSetting: 49
}
let engineId1 = await httpWebService.createEngines({engine: engine});
```

### Running the example

First, ensure the server is running. Refer to other grouped GHoWSt projects to
get and run the server.

#### Browser

For running the browser example, it should serve from a local Web server. On the
CLI, you can install Node.js and npm, and then install the http-server npm
package globally (with the -g flag). Or, your IDE may have a local Web server
built in.

If using the CLI, ensure you are in the project directory. Run:

`http-server`

Now, in a browser, navigate to http://localhost:8080/run-example-generic-http-web-service-client.html

If using an IDE, you should only need to run the below file which ideally opens
in a local Web server in your browser:

`run-example-generic-http-web-service-client.html`

#### Node.js

Ensure Node.js 21 or better is installed.

If using the CLI, ensure you are in the project directory. Run:

`node run-example-generic-http-web-service-client.js`

If using an IDE, you should only need to run the below file:

`run-example-generic-http-web-service-client.js`

The example runs several calls to create, update, replace, read, delete, and do
a custom action on resources.