const inputTarea = document.getElementById('input-tarea');
const formularioTarea = document.getElementById('formulario-tarea');
const listaTarea = document.getElementById('lista-tarea');
const buttonEliminar = document.getElementsByClassName('button-eliminar');
const tareasArray = JSON.parse(localStorage.getItem('tareas')) || [];


const agregarTarea = (e) => {
    e.preventDefault();

    const tareaValor = inputTarea.value.trim();
    if (tareaValor === '') return;

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

const eliminarTarea = () => {
    console.log('eliminando...')
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
            <button class="button-realizado rounded-full bg-green-500 p-1" aria-label="Marcar como realizada" data-id="${tarea.id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </button>
            <button class="button-eliminar bg-red-600 p-1 text-white rounded-full" aria-label="Eliminar tarea">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
        `;

        listaTarea.appendChild(tareaLi);
        const buttonRealizado = tareaLi.querySelector('.button-realizado');
        buttonRealizado.addEventListener('click', () => realizarTarea(tarea));
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
/* console.log(buttonRealizado);
console.log(buttonEliminar); */

formularioTarea.addEventListener('submit', agregarTarea);

// buttonRealizado.forEach((button) => {
//     console.log(button)
// });

// realizarTarea()
/* buttonEliminar.forEach(button => {
    button.addEventListener('click', eliminarTarea);
}); */
localStorageTareas();
mostrarTareas();
