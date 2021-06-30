const basicAuth = "Basic " + btoa("ahmed:Atwabi@20");

class Requests {

    createAttribute = (payload) => {

        return fetch(`https://covmw.com/namistest/api/29/attributes`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        }).then(response => response.json());

    }

    createSchema = (payload) => {
        return fetch(`https://covmw.com/namistest/api/29/schemas/option`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        }).then(response => response.json());

    }

    updateIntervention = (id, payload) => {
        return fetch(`https://covmw.com/namistest/api/options/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        }).then(response => response.json());

    }

    getIntervention = (id) => {
        return fetch(`https://covmw.com/namistest/api/options/${id}`, {
            method: 'GET',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        }).then(response => response.json());
    }

    createComponent = (payload) => {

        return fetch(`https://covmw.com/namistest/api/options`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        }).then(response => response.json());
    }

}

export default new Requests();