const inputTarea = document.getElementById('input-tarea');
const formularioTarea = document.getElementById('formulario-tarea');
const listaTarea = document.getElementById('lista-tarea');
const tareasArray = JSON.parse(localStorage.getItem('tareas')) || [];


const agregarTarea = (e) => {
    e.preventDefault();

    const tareaValor = inputTarea.value.trim();
    if (tareaValor === '') return;

    

    if (tareasArray.find(tarea => tarea.tarea === tareaValor)) {
        alert('La tarea ya existe');
        return;
    }

    const tareaObject = {
        id: Date.now(), // Genera un ID único para cada tarea
        tarea: tareaValor,
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
        tareaLi.classList.add('flex', 'items-center', 'justify-between', 'p-2');
        if (tarea.realizada) tareaLi.classList.add('line-through');
        tareaLi.dataset.id = tarea.id; // Almacena el ID de la tarea en el atributo data-id

        tareaLi.innerHTML = `
        ${tarea.tarea}
        <div class="flex gap-2">
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
        `;

        listaTarea.appendChild(tareaLi);

        const buttonRealizado = tareaLi.querySelector('.button-realizado');
        buttonRealizado.addEventListener('click', () => realizarTarea(tarea));

        const buttonEliminar = tareaLi.querySelector('.button-eliminar');
        buttonEliminar.addEventListener('click', () => eliminarTarea(tarea));
    });

    if (tareasArray.length === 0) {
        const parrafo = document.createElement('p');
        parrafo.classList.add('text-center')
        parrafo.textContent = 'No tienes ninguna tarea pendiente';
        listaTarea.appendChild(parrafo);
    }
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
