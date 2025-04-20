export class HttpWebServiceError extends Error {
    constructor(httpStatus, message) {
        super(message);
        this.name = "HttpWebServiceError";
        this.httpStatus = httpStatus;
    }
}