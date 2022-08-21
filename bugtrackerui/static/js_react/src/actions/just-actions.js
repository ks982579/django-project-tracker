import { RequestOptions } from "./auth-actions";

let DOMAIN = window.location.href;

console.log(`href: ${window.location.href}`)
console.log(`Port: ${window.location.port}`)
console.log(`Test: ${typeof window.location.port}`)

if(window.location.port == 3000) {
    DOMAIN = "http://localhost:8000/";
    console.log(`Domain set to: ${DOMAIN}`)
}

const JustActions = {};

JustActions.passwordResetEmail = (rawFormData) => {
    const formData = new FormData(rawFormData);
    const postObj = {
        email: formData.get('email'),
    };

    //Create RequestOptions object
    const options = RequestOptions.create('POST', formData.get('csrftoken'), postObj);

    // Call the server with request
    const jsonRes = options.call(`${DOMAIN}password-reset/`);

    return jsonRes;
};

export default JustActions;