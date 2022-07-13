/*
* URL: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
* a fetch response has a response.status
*/
import DummyDetails from "./secrets";

const DOMAIN = 'http://localhost:4000/' //window.location.href;

const AuthActions = {
    getCSRFToken: (formChildren) => {
        let csrftoken = ''
        for (let _x = 0; _x < formChildren.length; _x++) {
            if (formChildren[_x].name == 'csrftoken') {
                csrftoken = formChildren[_x].value;
                break;
            }
        }
        return csrftoken;
    },
    login: (rawFormData) => {
        const formData = new FormData(rawFormData);
        const postObj = {
            username: formData.get('username'),
            password: formData.get('password'),
        }

        // TODO: Eventually REMOVE
        /* -------------------------------------- */
        postObj.username = DummyDetails.un;
        postObj.password = DummyDetails.pw;
        /* -------------------------------------- */

        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');
        httpHeader.append('X-CSRFtoken', formData.get('csrftoken'));

        console.log(httpHeader.entries())
        const reqOptions = {
            method: 'POST',
            headers: httpHeader,
            body: JSON.stringify(postObj)
        }

        const jsonRes = fetch(`${DOMAIN}api/auth/`, reqOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)// Now it prtins teh JSON response :)
                return data
            }).catch(error => {
                console.error(`Failed to fetch: ${error}`);
                return null;
            })
        return jsonRes;
    },
    logout: () => {
        const jsonRes = fetch(`${DOMAIN}api/auth/`)
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

    signupHandler: (rawFormData) => {
        const formData = new FormData(rawFormData);
        const postObj = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password1'),
        }
        
        // Create Header
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');
        httpHeader.append('X-CSRFtoken', formData.get('csrftoken'));

        // Create options
        const reqOptions = {
            method: 'POST',
            headers: httpHeader,
            body: JSON.stringify(postObj),
        };

        // Send to the Server
        const jsonRes = fetch(`${DOMAIN}api/new-user/`, reqOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                return data;
            }).catch(error => {
                console.error(`Failed to fetch: ${error}`);
                return null;
            })
        return jsonRes;
    },

    newProject: (rawFormData) => {
        //Extract Data from from
        const formData = new FormData(rawFormData);
        const dataObj = {
            task_name: formData.get('taskName')
        }

        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');
        httpHeader.append('X-CSRFtoken', formData.get('csrftoken'));

        const reqOptions = {
            method: 'POST',
            headers: httpHeader,
            body: JSON.stringify(dataObj),
        }

        const jsonRes = fetch(`${DOMAIN}api/new-project-handler/`, reqOptions)
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
        // X --> <NewProjectCont>
    },

    fetchWhatIOwn: () => {
        /**
         * Fetching Projets the user is owner of. 
         * Converts and returns JSON and JavaScript object. 
         */
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');

        // create options
        const reqOptions = {
            method: 'GET',
            headers: httpHeader,
        } //GET/HEAD methods cannot have body...

        // Fetching Data!
        const jsonRes = fetch(`${DOMAIN}api/what-i-own/`, reqOptions)
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
        return null;
    },

    fetchAllProjects: () => {
        /* 
        ** Gets project data, not tasks
        ** These are all Projects Developer has permission to Work on
        ** They may not be Owner of Project though. 
        */
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');

        // create options
        const reqOptions = {
            method: 'GET',
            headers: httpHeader,
        } //GET/HEAD methods cannot have body...

        // Fetching Data!
        const jsonRes = fetch(`${DOMAIN}api/task-handler/`, reqOptions)
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
        // X --> dev-context.js
    },
    fetchAllData: () => {
        /**
         * Fetching Tasks Developer is assigned to.
         * Tasks are different than projects, they are like children. 
         */
        console.log("%cfetching [GET, .../api/task-handler/]", "color:grey")
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
        const jsonRes = fetch(`${DOMAIN}api/task-handler/`, reqOptions)
            .then(response => {
                console.log("%cPromise Received!", "color:blue");
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
    },

    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    createNewTask: (rawFormData, parentID) => {
        //Form Data MUST HAVE CSRF TOKEN
        // parentID is object -> { project or task : int }
        const data = new FormData(rawFormData); //rawFormData = event.target;

        const dataObj = {
            parent_task: parentID,
            task_name: data.get('taskName'),
            description: data.get('description'),
        }
        //Construct Request
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');
        httpHeader.append('X-CSRFtoken', data.get('csrftoken'));

        const jsonPackage = JSON.stringify(dataObj);

        const reqOptions = {
            method: 'POST',
            headers: httpHeader,
            body: jsonPackage,
        }

        const jsonRes = fetch(`${DOMAIN}api/task-handler/`, reqOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                return data
            }).catch(error => {
                console.error(`Failed to fetch: ${error}`);
                return { error: 'Could not create...' };
            })
        return jsonRes;
        // X --> <CreateNewTask>
    },

    deleteTask: (parentID, htmlForm) => {
        //Form Data MUST HAVE CSRF TOKEN
        // parentID is object -> { project or task : int }
        let formData = new FormData(htmlForm);
        let dataObj = { id: parentID };
        //Construct Request
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');
        httpHeader.append('X-CSRFtoken', formData.get('csrftoken'));

        const jsonPackage = JSON.stringify(dataObj);

        const reqOptions = {
            method: 'DELETE',
            headers: httpHeader,
            body: jsonPackage,
        }

        const jsonRes = fetch(`${DOMAIN}api/task-handler/`, reqOptions)
            .then(response => {
                console.log(response)
                return response.status;
            }).then(data => {
                return data
            }).catch(error => {
                console.error(`Failed to fetch: ${error}`);
                return { error: 'Could not create...' };
            })
        return jsonRes;
    },

    updateTask: (taskID, htmlForm) => {
        //Form Data MUST HAVE CSRF TOKEN
        // taskID is object -> { project or task : int }
        let formData = new FormData(htmlForm);

        let endDate = formData.get('endDate')
        //Either null of local DateTime.
        endDate = endDate == "" ? null : endDate;

        //Matching to keys in Django Model
        let dataObj = {
            id: taskID,
            "task_name": formData.get('name'),
            "description": formData.get('description'),
            "end_date": endDate,
            "percent_complete": formData.get("percentComplete"),
        };
        //Construct Request
        const httpHeader = new Headers();
        httpHeader.append('Content-type', 'application/json');
        httpHeader.append('Accept', 'application/json');
        httpHeader.append('X-CSRFtoken', formData.get('csrftoken'));

        const jsonPackage = JSON.stringify(dataObj);

        const reqOptions = {
            method: 'PUT',
            headers: httpHeader,
            body: jsonPackage,
        }

        const jsonRes = fetch(`${DOMAIN}api/task-handler/`, reqOptions)
            .then(response => {
                console.log(response)
                return response.json();
            }).then(data => {
                return data
            }).catch(error => {
                console.error(`Failed to update: ${error}`);
                return { error: 'Could not create...' };
            })
        return jsonRes;
    }
}

export default AuthActions;