# Generic HTTP Web Service Client in JavaScript (GHoWSt)

## A client written to talk to the Generic HTTP Web Service Server

### Design goals

- Use local language semantics to talk to the server dynamically. The only thing
  required are the ghowst classes and a browser.
- Every call, using a method name convention to map to HTTP methods, gets
  translated to HTTP requests. Responses are parsed from JSON and mapped back to
  local objects.

> [!NOTE]
> This JavaScript project is meant to run in a browser. It uses XHR instead of
> the Fetch API for now. However, once using the Fetch API, or with an XHR
> wrapper, it should run in Node.js without too much effort and still work in a
> browser. As of this writing, Node.js's stable Fetch support isn't ubiquitous.

### Example code

```js
import {createGenericHttpWebServiceClient} from './js/weburg/ghowst/generic-http-web-service-client.js';

let httpWebService = createGenericHttpWebServiceClient("http://localhost:8081/generichttpws");

// Create
let engine = {
    name: "JSEngine",
    cylinders: 44,
    throttleSetting: 49
}
let engineId = httpWebService.createEngines(engine);
```

### Running the example

First, ensure the server is running. Refer to other grouped GHoWSt projects to
get and run the server. For running the browser example, it should serve from a
local Web server. On the CLI, you can install Node.js and npm, and then install
the http-server npm package globally (with the -g flag). Or, your IDE may have
a local Web server built in.

If using the CLI, ensure you are in the project directory. Run:

`http-server`

Now, in a browser, navigate to http://localhost:8080/run-example-generic-http-web-service-client.html

If using an IDE, you should only need to run the below file which should open
in a local Web server in your browser:

`run-example-generic-http-web-service-client.html`

The example runs several calls to create, update, replace, read, delete, and do
a custom action on resource.