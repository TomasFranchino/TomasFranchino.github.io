//const apiBaseUrl = 'https://webappveterinaria-cfe7eqapdcetfvat.brazilsouth-01.azurewebsites.net/api/animal';
const apiBaseUrl = 'https://localhost:7072/api/animal';

async function postAnimal(animal) {
    const response = await fetch(`${apiBaseUrl}/PostAnimales`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error al crear el animal")
    }
}

async function getAnimales() {
    const response = await fetch(`${apiBaseUrl}/GetAnimales`);
    if (response.ok) {
        const animals = await response.json();
        return animals.data;
    } else {
        throw new Error('Error al consultar animales');
    }
}

async function getAnimal(id) {
    const response = await fetch(`${apiBaseUrl}/GetAnimal/${id}`);
    if (response.ok) {
        const animals = await response.json();
        return animals.data;
    } else {
        throw new Error("Error al obtener animal");
    }
}

async function deleteAnimal(id) {
    const response = await fetch(`${apiBaseUrl}/DeleteAnimal/${id}`, { method: 'Delete' });
    if (response.ok) {
        const resp = await response.json();
        return resp;
    } else {
        throw new Error("Error al eliminar animal")
    }
}

async function putAnimal(animal, id) {
    const response = await fetch(`${apiBaseUrl}/PutAnimal/${id}`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error al actualizar animal")
    }

}

async function asignarDueño(idAnimal, idDueño) {
    const response = await fetch(`${apiBaseUrl}/AsignarDueño/${idAnimal}/${idDueño}`);
    if (response.ok) {
        const animal = await response.json();
        console.log(animal.data);
        return animal.data;
    } else {
        throw new Error("Error al asignar el dueño")
    }
}

//async function asignarDueño(idAnimal, dniDueño) {
//  const response = await fetch(`${apiBaseUrl}/AsignarDueño/${idAnimal}/${dniDueño}`, {
//    method: 'POST',
//  headers: {
//    'Content-Type': 'application/json'
//        }
//  });

//if (response.ok) {
//  const animal = await response.json();
//return { isSuccess: true, data: animal };
//} else {
//  const errorMessage = await response.text();
//return { isSuccess: false, message: errorMessage };
// }
//}