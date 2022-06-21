/*
* URL: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
* a fetch response has a response.status
*/
import DummyDetails from "./secrets";

const AuthActions = {
    getCSRFToken: (formChildren) => {
        let csrftoken = ''
        for(let _x = 0; _x < formChildren.length; _x++) {
            if(formChildren[_x].name == 'csrftoken') {
                csrftoken = formChildren[_x].value;
                break;
            }
        }
        return csrftoken;
    },
    login: (formChildren) => {
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');
        httpHeader.append('X-CSRFtoken', AuthActions.getCSRFToken(formChildren));

        console.log(httpHeader.entries())
        const reqOptions = {
            method: 'POST',
            headers: httpHeader,
            body: JSON.stringify({
                username: DummyDetails.un,
                password: DummyDetails.pw,
            })
        }

        const jsonRes = fetch(`${window.location.href}api/auth/`, reqOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)// Now it prtins teh JSON response :)
                return data
            }).catch(error => {
                console.error(`Failed to fetch: ${error}`);
                return null;
            })
        console.log(typeof jsonRes);
        return jsonRes;
    },
    logout: () => {
        const jsonRes = fetch(`${window.location.href}api/auth/`)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)
                return data;
            }).catch(error => {
                console.log(error);
                return error;
            })
        return jsonRes;
    },
    // Once Logged in, we can retrieve projects.
    
    newProject: (jsonPackage, csrfToken) => {
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');
        httpHeader.append('X-CSRFtoken', csrfToken);

        console.log(httpHeader.entries())
        const reqOptions = {
            method: 'POST',
            headers: httpHeader,
            body: jsonPackage,
        }

        const jsonRes = fetch(`${window.location.href}api/create/`, reqOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)// Now it prints the JSON response :)
                return data
            }).catch(error => {
                console.error(`Failed to fetch: ${error}`);
                return null;
            })
        console.log(typeof jsonRes);
        return jsonRes;
    },
    fetchAllProjects: () => {
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');

        // create options
        const reqOptions = {
            method: 'GET',
            headers: httpHeader,
        } //GET/HEAD methods cannot have body...

        // Fetching Data!
        const jsonRes = fetch(`${window.location.href}api/`, reqOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)// Now it prints the JSON response :)
                return data
            }).catch(error => {
                console.error(`Failed to fetch: ${error}`);
                return null;
            });
        return jsonRes;
    },
    fetchAllData: () => {
        console.log("%cfetching [GET, .../api/task-handler/]","color:grey")
        // Create Header...
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');

        // create options
        const reqOptions = {
            method: 'GET',
            headers: httpHeader,
        } //GET/HEAD methods cannot have body...

        // Fetching Data!
        const jsonRes = fetch(`${window.location.href}api/task-handler/`, reqOptions)
            .then(response => {
                console.log("%cPromise Received!","color:blue");
                return response.json();
            }).then(data => {
                console.log(data)// Now it prints the JSON response :)
                return data
            }).catch(error => {
                console.error(`Failed to fetch: ${error}`);
                return null;
            })
        //console.log(typeof jsonRes);
        return jsonRes;
    }
}

export default AuthActions;