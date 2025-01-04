const inputTarea = document.getElementById('input-tarea');
const formularioTarea = document.getElementById('formulario-tarea');
const listaTarea = document.getElementById('lista-tarea');
const tareasArray = JSON.parse(localStorage.getItem('tareas')) || [];


const agregarTarea = (e) => {
    e.preventDefault();

    const tareaValor = inputTarea.value.trim();
    if (tareaValor === '') return;



    if (tareasArray.find(tarea => tarea.text === tareaValor)) {
        alert('La tarea ya existe');
        return;
    }

    const tareaObject = {
        id: Date.now(), // Genera un ID único para cada tarea
        text: tareaValor,
        realizada: false
    }

    tareasArray.push(tareaObject);
    inputTarea.value = '';
    localStorageTareas();
    mostrarTareas()
    console.log(tareaObject);
}

const localStorageTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareasArray));
}

const mostrarTareas = () => {
    listaTarea.innerHTML = '';
    tareasArray.forEach(tarea => {
        const tareaLi = document.createElement('li');
        tareaLi.classList.add('flex', 'items-end', 'justify-between', 'p-2', 'flex-col', 'gap-4');
        if (tarea.realizada) tareaLi.classList.add('line-through');
        tareaLi.dataset.id = tarea.id; // Almacena el ID de la tarea en el atributo data-id

        const hora = new Date(tarea.id);

        tareaLi.innerHTML = `
        ${hora.getDate()}/${hora.getMonth() + 1}/${hora.getFullYear()}  -  ${hora.getHours()}:${hora.getMinutes()}
        <div class="flex w-full justify-between items-center p-2  bg-gray-300">
        ${tarea.text}
        <div class="flex gap-2">
            <button class="button-editar bg-blue-950 text-white p-2 rounded-md" aria-label="Editar tarea">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>                          
            </button>
        <button class="button-realizado ${tarea.realizada ? 'bg-green-500' : 'bg-orange-500 text-white'} p-2 rounded-md" aria-label="Marcar como realizada" data-id="${tarea.id}">
        ${tarea.realizada ? ` 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            ` : `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `}
            </button>
            <button class="button-eliminar bg-red-600 p-2 rounded-md text-white" aria-label="Eliminar tarea">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
            </button>
        </div>
        </div>
        `;

        listaTarea.appendChild(tareaLi);

        const buttonRealizado = tareaLi.querySelector('.button-realizado');
        buttonRealizado.addEventListener('click', () => realizarTarea(tarea));

        const buttonEliminar = tareaLi.querySelector('.button-eliminar');
        buttonEliminar.addEventListener('click', () => eliminarTarea(tarea));

        const buttonEditar = tareaLi.querySelector('.button-editar');
        buttonEditar.addEventListener('click', () => editarTarea(tarea));
    });

    if (tareasArray.length === 0) {
        const parrafo = document.createElement('p');
        parrafo.classList.add('text-center')
        parrafo.textContent = 'No tienes ninguna tarea pendiente';
        listaTarea.appendChild(parrafo);
    }
}

const editarTarea = (tarea) => {

    const tareaLi = document.querySelector(`[data-id='${tarea.id}']`);
    const formEditar = document.createElement('form');

    //  si ya hay un formulario de edición, no se crea otro
    if (tareaLi.querySelector('.form-editar')) {
        return;
    }

    formEditar.classList.add('form-editar', 'flex', 'gap-2', 'w-full');
    formEditar.innerHTML = `
        <input placeholder="Edita tu tarea" value="${tarea.text}" class="p-2 border border-black rounded-md w-full focus:outline-none focus:border-blue-500" />
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">Guardar</button>
    `;

    tareaLi.appendChild(formEditar);

    if (tareaLi.classList.contains('line-through')) tareaLi.classList.remove('line-through');
    
    const inputEditar = tareaLi.querySelector('input');
    const editar = tareaLi.querySelector('.form-editar');

    editar.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoValor = inputEditar.value.trim();
        if (nuevoValor === '') return;

        tarea.text = nuevoValor;
        localStorageTareas();
        mostrarTareas();
    });
}

const buttonRealizado = document.getElementsByClassName('button-realizado');

// console.log(buttonRealizado)
const realizarTarea = (tarea) => {
    // 'tarea.realizada' puede ser true o false
    // Si 'realizada' es false (tarea no está hecha), la expresión '!' lo convertirá a true (tarea está hecha)
    // Si 'realizada' es true (tarea está hecha), la expresión '!' lo convertirá a false (tarea no está hecha)
    // La línea completa asigna a 'tarea.realizada' el valor opuesto al que tenía anteriormente.
    tarea.realizada = !tarea.realizada; // Alterna el estado
    localStorageTareas();
    mostrarTareas();
}

const eliminarTarea = (tarea) => {
    tareasArray.splice(tarea, 1);
    localStorage.setItem('tareas', JSON.stringify(tareasArray))
    mostrarTareas();
}

formularioTarea.addEventListener('submit', agregarTarea);

localStorageTareas();
mostrarTareas();
