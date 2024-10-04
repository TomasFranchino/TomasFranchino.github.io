const apiBaseUrls = 'https://webappveterinaria-cfe7eqapdcetfvat.brazilsouth-01.azurewebsites.net/';


async function getDueños(id) {
    const response = await fetch(`${apiBaseUrls}/GetDueño/${id}`);
    if (response.ok) {
        const dueño = await response.json();
        return dueño.data;
    } else {
        throw new Error("Error al obtener el dueño")
    }
}

