/* eslint-disable no-console */
/* eslint-disable no-undef */
window.client = (function () {
    function getProjects(success) {
        return fetch('http://127.0.0.1:5000/projects', {
            headers: {
                Accept: 'application/json',
            },
        }).then(checkStatus)
        .then(parseJSON)
        .then(success);
    }

    function getProject(success) {
        return fetch('http://127.0.0.1:5000/project/11', {
            headers: {
                Accept: 'application/json',
            },
        }).then(checkStatus)
        .then(parseJSON)
        .then(success);
    }

    function createTimer(data) {
        return fetch('/api/timers', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(checkStatus);
    }

    function updateTimer(data) {
        return fetch('/api/timers', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(checkStatus);
    }

    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(`HTTP Error ${response.statusText}`);
            error.status = response.statusText;
            error.response = response;
            console.log(error);
            throw error;
        }
    }

    function parseJSON(response) {
        return response.json();
    }

    return {
        getProjects,
        getProject,
    };
}());
