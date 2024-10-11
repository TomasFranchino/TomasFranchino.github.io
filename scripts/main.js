// Gestion animales
// Revisar en los async await utilizar try catch

function mostrarRegistroAnimal() {
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
        <div class="card-body ">
        <h2>Registrar Animal</h2>
        <form id="animalForm">
            <label for="especie">Especie:</label>
            <input "type="text" id="especie" name="especie" required>
            
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            
            <label for="raza">Raza:</label>
            <input type="text" id="raza" name="raza" required>
            
            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad" required>
            
            <label for="sexo">Sexo:</label>
            <input type="text" id="sexo" name="sexo" required>
            <br>
            <button class="btn btn-primary" type="submit">Registrar</button>
        </form>
        </div>
    </div>
    `;

    document.getElementById('animalForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const animal = {
            especie: document.getElementById('especie').value,
            nombre: document.getElementById('nombre').value,
            raza: document.getElementById('raza').value,
            edad: document.getElementById('edad').value,
            sexo: document.getElementById('sexo').value
        };

        try {
            const result = await postAnimal(animal);
            alert('Animal registrado correctamente');
            mostrarListaAnimal();
        } catch (error) {
            alert(`Error al registrar el animal: ${error.message}`);
        }
    });
}

async function mostrarListaAnimal() {
    const animals = await getAnimales();
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
        <div class="card-body ">
        <h2>Lista de Animales</h2>
        <table class="table">
        <thead id="animalList"> 
        <tr>

        <th>Id</td>
        <th>Animal</td>
        <th>Dueño</td>
        <th>Opciones </td>
        
        </tr>
        </thead>
       
        </table>
        </div>
        </div>
    `;

    const animalList = document.getElementById('animalList');
    animals.forEach(async animal => {


        //const listItem = document.createElement('td');
        //listItem.className = "list-group-item list-group-item-action";
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const tda = document.createElement('td');

        if (animal.dueñoId == null) {
            td1.textContent = `${animal.id}`;
            td2.textContent = `${animal.nombre}`;
            td3.textContent = `No tiene dueño asignado`;
            //listItem.textContent = `${animal.id}) ${animal.nombre} - No tiene dueño Asignado`;
        } else {
            const dueño = await getDueño(animal.dueñoId);
            td1.textContent = `${animal.id}`;
            td2.textContent = `${animal.nombre}`;
            td3.textContent = `${dueño.nombre}`;
            //listItem.textContent = `${animal.id}) ${animal.nombre} - ${dueño.nombre}`;
        }
        // Boton detalle animal
        const actionsItem = document.createElement('a');
        actionsItem.className = "";
        actionsItem.textContent = 'Detalle';
        actionsItem.onclick = () => mostrarDetalleAnimal(animal.id);

        // Boton editar animal
        const actionItem = document.createElement('a');
        actionItem.className = '';
        actionItem.textContent = 'Editar';
        actionItem.onclick = () => mostrarEditarAnimal(animal.id);

        // Boton eliminar animal
        const action2Item = document.createElement('a');
        action2Item.className = "";
        action2Item.textContent = 'Eliminar';
        action2Item.onclick = () => mostrarEliminarAnimal(animal.id);

        const action3Item = document.createElement('a');
        action3Item.className = "";
        action3Item.textContent = 'Asignar Dueño';
        action3Item.onclick = () => mostrarAsignarDueño(animal.id);


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tda.appendChild(actionsItem);
        tda.appendChild(actionItem);
        tda.appendChild(action2Item);
        tda.appendChild(action3Item);
        tr.appendChild(tda);
        animalList.appendChild(tr);


    });
}

async function mostrarDetalleAnimal(id) {
    const animal = await getAnimal(id);
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
    <div class="card-body ">
        <h2>Detalle del Animal</h2>
        <p>ID: ${animal.id}</p>
        <p>Nombre: ${animal.nombre}</p>
        <p>Especie: ${animal.especie}</p>
        <p>Raza: ${animal.raza}</p>
        <p>Edad: ${animal.edad}</p>
        <p>Sexo: ${animal.sexo}</p>
        <p>ID Dueño: ${animal.dueñoId}</p>
        <button class="btn btn-primary "onclick="mostrarListaAnimal()">Volver a la lista</button>
        </div>
        </div>
        `;
}

async function mostrarEliminarAnimal(id) {
    const animal = await getAnimal(id);
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
    <div class="card-body ">
        <h2>Eliminar Animal</h2>
        <p>ID: ${animal.id}</p>
        <p>Nombre: ${animal.nombre}</p>
        <p>Especie: ${animal.especie}</p>
        <p>ID Dueño: ${animal.dueñoId}</p>
         <button class="btn btn-primary "onclick="verificarDeleteAnimal(${animal.id})">Eliminar Animal</button>
         <a class="btn btn-secondary "onclick="mostrarListaAnimal()">Volver a la lista</a>
    </div>
    </div>

    `
}

async function mostrarAsignarDueño(idAnimal) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="container bg-light">
            <div class="card-body">
                <h2>Asignar Dueño a un Animal</h2>
                <form id="animalForm">
                    <div class="form-group">
                        <label for="idanimal">ID del Animal:</label>
                        <input type="text" id="idanimal" value="${idAnimal}" name="idanimal" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="iddueño">ID del Dueño:</label>
                        <input type="text" id="iddueño" name="iddueño" class="form-control" required>
                    </div>
                    <button class="btn btn-primary" type="submit">Asignar Dueño</button>
                    <a class="btn btn-secondary" onclick="mostrarListaAnimal()">Volver a la lista</a>
                </form>
            </div>
        </div>
    `;

    document.getElementById('animalForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const idAnimal = document.getElementById('idanimal').value;
        const idDueño = document.getElementById('iddueño').value;


        const response = await asignarDueño(idAnimal, idDueño);

        if (response != null) {
            alert('Dueño asignado correctamente.');
        } else {
            alert('Error al asignar dueño: ' + response.message);
        }


        mostrarListaAnimal();
    });
}


async function verificarDeleteAnimal(id) {
    const animalDel = await deleteAnimal(id);
    if (animalDel.isSuccess == true) {
        alert('Animal Eliminado Correctamente.');
    } else {
        alert('Error al Eliminar el Animal')
        throw new Error(animalDel.message);
    }
    mostrarListaAnimal();
}

async function mostrarEditarAnimal(id) {
    const animal = await getAnimal(id);
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
        <div class="card-body ">
        <h2>Registrar Animal</h2>
        <form id= AnimalForm">
            <label for="especie">Especie:</label>
            <input "type="text" value="${animal.especie}" id="especie" name="especie" required>
            
            <label for="nombre">Nombre:</label>
            <input type="text" value="${animal.nombre}" id="nombre" name="nombre" required>
            
            <label for="raza">Raza:</label>
            <input type="text" value="${animal.raza}" id="raza" name="raza" required>
            
            <label for="edad">Edad:</label>
            <input type="number" value="${animal.edad}" id="edad" name="edad" required>
            
            <label for="sexo">Sexo:</label>
            <input type="text" value="${animal.sexo}" id="sexo" name="sexo" required>
            <br>
            <button class="btn btn-primary" type="submit">Guardar Cambios</button>
            <a class="btn btn-secondary "onclick="mostrarListaAnimal()">Volver a la lista</a>
        </form>
        </div>
    </div>
    `;
    document.getElementById('AnimalForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const animal = {
            especie: document.getElementById('especie').value,
            nombre: document.getElementById('nombre').value,
            raza: document.getElementById('raza').value,
            edad: document.getElementById('edad').value,
            sexo: document.getElementById('sexo').value
        };

        const result = await putAnimal(animal, id);
        if (result.isSuccess == true) {
            alert('Animal guardado correctamente.');
        } else {
            throw new Error(result.message);
        }

        mostrarListaAnimal();
    });
}
function vaciarContent() {
    const content = document.getElementById('content');
    content.textContent = ` `;
}

//Gestion dueños

function mostrarRegistroDueño() {
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
        <div class="card-body ">
        <h2>Registrar Dueño</h2>
        <form id="dueñoForm">
              <label for="dni">DNI:</label>
            <input "type="text" id="dni" name="dni" required>
            
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required>
            
            <label for="telefono">Telefono:</label>
            <input type="telefono" id="telefono" name="telefono" required>
            
            <br>
            <button class="btn btn-primary" type="submit">Registrar</button>
        </form>
        </div>
    </div>
    `;

    document.getElementById('dueñoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const dueño = {
            dni: document.getElementById('dni').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            telefono: document.getElementById('telefono').value
        };

        try {
            const result = await postDueño(dueño);
            alert('Dueño registrado correctamente');
            mostrarListaDueño();
        } catch (error) {
            alert(`Error al registrar el dueño: ${error.message}`);
        }
    });
}

async function mostrarListaDueño() {
    const dueños = await getDueños();
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
        <div class="card-body ">
        <h2>Lista de Dueños</h2>
        <table class="table">
        <thead id="dueñoList"> 
        <tr>

        <th>Id</td>
        <th>Dueño</td>
        <th>Opciones </td>
        
        </tr>
        </thead>
       
        </table>
        </div>
        </div>
    `;

    const dueñoList = document.getElementById('dueñoList');
    dueños.forEach(async dueños => {


        //const listItem = document.createElement('td');
        //listItem.className = "list-group-item list-group-item-action";
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const tda = document.createElement('td');


        td1.textContent = `${dueños.id}`;
        td2.textContent = `${dueños.dni}`;

        // Boton detalle animal
        const actionsItem = document.createElement('a');
        actionsItem.className = "";
        actionsItem.textContent = 'Detalle';
        actionsItem.onclick = () => mostrarDetalleDueño(dueños.id);

        // Boton editar animal
        const actionItem = document.createElement('a');
        actionItem.className = '';
        actionItem.textContent = 'Editar';
        actionItem.onclick = () => mostrarEditarDueño(dueños.id);

        // Boton eliminar animal
        const action2Item = document.createElement('a');
        action2Item.className = "";
        action2Item.textContent = 'Eliminar';
        action2Item.onclick = () => mostrarEliminarDueño(dueños.id);


        tr.appendChild(td1);
        tr.appendChild(td2);

        tda.appendChild(actionsItem);
        tda.appendChild(actionItem);
        tda.appendChild(action2Item);
        tr.appendChild(tda);
        dueñoList.appendChild(tr);


    });
}

async function mostrarDetalleDueño(id) {
    const dueño = await getDueño(id);
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
    <div class="card-body ">
        <h2>Detalle del Dueño</h2>
        <p>ID: ${dueño.id}</p>
        <p>DNI: ${dueño.dni}</p>
        <p>Nombre: ${dueño.nombre}</p>
        <p>Apellido: ${dueño.apellido}</p>
        <p>Telefono: ${dueño.telefono}</p>
        
        <button class="btn btn-primary "onclick="mostrarListaDueño()">Volver a la lista</button>
        </div>
        </div>
        `;
}

async function mostrarEliminarDueño(id) {
    const dueño = await getDueño(id);
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
    <div class="card-body ">
        <h2>Eliminar Dueño</h2>
          <p>ID: ${dueño.id}</p>
        <p>DNI: ${dueño.dni}</p>
        <p>Nombre: ${dueño.nombre}</p>
        <p>Apellido: ${dueño.apellido}</p>
        <p>Telefono: ${dueño.telefono}</p>
         <button class="btn btn-primary "onclick="verificarDeleteDueño(${dueño.id})">Eliminar Dueño</button>
         <a class="btn btn-secondary "onclick="mostrarListaDueño()">Volver a la lista</a>
    </div>
    </div>

    `;
}

async function mostrarEditarDueño(id) {
    const dueño = await getDueño(id);
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="container bg-light">
        <div class="card-body ">
        <h2>Registrar Dueño</h2>
        <form id="dueñoForm">
            <label for="dni">DNI:</label>
            <input "type="text" value="${dueño.dni}" id="dni" name="dni" required>
            
            <label for="nombre">Nombre:</label>
            <input type="text" value="${dueño.nombre}" id="nombre" name="nombre" required>
            
            <label for="apellido">Apellido:</label>
            <input type="text" value="${dueño.apellido}" id="apellido" name="apellido" required>
            
            <label for="telefono">Telefono:</label>
            <input type="telefono" value="${dueño.telefono}" id="telefono" name="telefono" required>
            
            <br>
            <button class="btn btn-primary" type="submit">Guardar Cambios</button>
            <a class="btn btn-secondary "onclick="mostrarListaDueño()">Volver a la lista</a>
        </form>
        </div>
    </div>
    `;
    document.getElementById('dueñoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const dueño = {
            dni: document.getElementById('dni').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            telefono: document.getElementById('telefono').value
        };

        const result = await putDueño(dueño, id);
        if (result.isSuccess == true) {
            alert('Dueño guardado correctamente.');
        } else {
            throw new Error(result.message);
        }

        mostrarListaDueño();
    });
}

async function verificarDeleteDueño(id) {
    const dueñoDel = await deleteDueño(id);
    if (dueñoDel.isSuccess == true) {
        alert('Dueño Eliminado Correctamente.');
    } else {
        alert('Error al Eliminar el Dueño')
        throw new Error(dueñoDel.message);
    }
    mostrarListaDueño();
}


