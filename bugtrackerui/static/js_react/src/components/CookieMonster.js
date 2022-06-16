import React from "react";

const CookieMonster = () => {
    const getCookie = (name) => {
        let cookieValue = '';
        if (document.cookie && document.cookie !== ''){
            let cookieJar = document.cookie.split(';'); //create array of cookies
            for(let _i = 0; _i < cookieJar.length; _i++){
                let cookie = cookieJar[_i].trim();
                if(cookie.substring(0, name.length+1)===(name+'=')){
                    cookieValue = decodeURIComponent(cookie.substring(name.length+1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    /* end getCookie */
    const csrftoken = getCookie('csrftoken');

    return <input type='hidden' name="csrftoken" value={csrftoken}/>;
}

export default CookieMonster;