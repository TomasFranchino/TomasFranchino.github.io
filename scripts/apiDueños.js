//const apiBaseUrls = 'https://webappveterinaria-cfe7eqapdcetfvat.brazilsouth-01.azurewebsites.net/api/dueño';
const apiBaseUrls = 'https://localhost:7072/api/dueño';

async function getDueño(id) {
    const response = await fetch(`${apiBaseUrls}/GetDueño/${id}`);
    if (response.ok) {
        const dueño = await response.json();
        return dueño.data;
    } else {
        throw new Error("Error al obtener el dueño")
    }
}

async function postDueño(dueño) {
    const response = await fetch(`${apiBaseUrls}/PostDueños`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dueño)
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error al crear el dueño")
    }
}

async function getDueños() {
    const response = await fetch(`${apiBaseUrls}/GetDueños`);
    if (response.ok) {
        const dueños = await response.json();
        return dueños.data;
    } else {
        throw new Error('Error al consultar los dueños');
    }
}

async function deleteDueño(id) {
    const response = await fetch(`${apiBaseUrls}/DeleteDueño/${id}`, { method: 'Delete' });
    if (response.ok) {
        const resp = await response.json();
        return resp;
    } else {
        throw new Error("Error al eliminar el dueño")
    }
}

async function putDueño(dueño, id) {
    const response = await fetch(`${apiBaseUrls}/PutDueño/${id}`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dueño)
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error al actualizar el dueño")
    }
}





