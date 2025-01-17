const inputTarea = document.getElementById('input-tarea');
const formularioTarea = document.getElementById('formulario-tarea');
const listaTarea = document.getElementById('lista-tarea');
const tareasArray = JSON.parse(localStorage.getItem('tareas')) || [];
const buttonReset = document.getElementById('resetButton');

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


    Command: toastr["success"]("La tarea ha sido añadida a tu lista con éxito.", "¡Tarea Agregada!")
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

const localStorageTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareasArray));
}

const mostrarTareas = () => {
    listaTarea.innerHTML = '';
    tareasArray.forEach(tarea => {
        const tareaLi = document.createElement('li');
        tareaLi.classList.add('flex', 'items-end', 'justify-between', 'flex-col', 'gap-4', 'overflow-auto');
        tareaLi.dataset.id = tarea.id; // Almacena el ID de la tarea en el atributo data-id

        const hora = new Date(tarea.id); // Se crea un nuevo objeto de fecha usando el ID de la tarea, que es un número de milisegundos desde 1970.

        const fechaTexto = document.createTextNode(`${hora.getDate()}/${hora.getMonth() + 1}/${hora.getFullYear()}  -  ${hora.getHours()}:${hora.getMinutes().toString().padStart(2, '0')}`);
        tareaLi.appendChild(fechaTexto);

        const divTarea = document.createElement('div');
        divTarea.classList.add('flex', 'w-full', 'justify-between', 'items-center', 'p-2', 'rounded-lg', tarea.realizada ? 'bg-verde-pastel' : 'bg-naranja-pastel', 'gap-3', 'overflow-x-auto');
        tareaLi.appendChild(divTarea);

        const tareaTexto = document.createTextNode(tarea.text);
        divTarea.appendChild(tareaTexto);

        const divBotones = document.createElement('div');
        divBotones.classList.add('flex', 'gap-2');
        divTarea.appendChild(divBotones);

        const buttonEditar = document.createElement('button');
        buttonEditar.classList.add('button-editar', 'bg-blue-950', 'text-white', 'p-2', 'rounded-md');
        buttonEditar.setAttribute('aria-label', 'Editar tarea');
        buttonEditar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
        `;
        divBotones.appendChild(buttonEditar);

        const buttonRealizado = document.createElement('button');
        buttonRealizado.classList.add('button-realizado', tarea.realizada ? 'bg-green-500' : 'bg-orange-500', 'text-white', 'p-2', 'rounded-md');
        buttonRealizado.setAttribute('aria-label', 'Marcar como realizada');
        buttonRealizado.setAttribute('data-id', tarea.id);
        buttonRealizado.innerHTML = tarea.realizada ? `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        ` : `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        divBotones.appendChild(buttonRealizado);

        const buttonEliminar = document.createElement('button');
        buttonEliminar.classList.add('button-eliminar', 'bg-red-600', 'p-2', 'rounded-md', 'text-white');
        buttonEliminar.setAttribute('aria-label', 'Eliminar tarea');
        buttonEliminar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        `;
        divBotones.appendChild(buttonEliminar);

        listaTarea.appendChild(tareaLi);

        const realizado = tareaLi.querySelector('.button-realizado');
        realizado.addEventListener('click', () => realizarTarea(tarea));

        const eliminar = tareaLi.querySelector('.button-eliminar');
        eliminar.addEventListener('click', () => eliminarTarea(tarea));

        const editar = tareaLi.querySelector('.button-editar');
        editar.addEventListener('click', () => editarTarea(tarea));
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

const resetearTareas = () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esto reiniciará todos los datos y no se podrá deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, reiniciar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Reiniciado!",
                text: "Los datos se han restablecido con éxito.",
                icon: "success"
            });

            localStorage.removeItem('tareas');
            tareasArray.length = 0;
            mostrarTareas();
        }
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
    Swal.fire({
        title: "¿Estás seguro que deseas eliminar esta tarea?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, elimínala"
    }).then((result) => {
        if (result.isConfirmed) {
            tareasArray.splice(tarea, 1);
            localStorage.setItem('tareas', JSON.stringify(tareasArray))
            mostrarTareas();
            Swal.fire({
                title: "¡Tarea eliminada!",
                text: "La tarea ha sido eliminada exitosamente.",
                icon: "success"
            });
        }
    });

}

formularioTarea.addEventListener('submit', agregarTarea);
buttonReset.addEventListener('click', resetearTareas);

localStorageTareas();
mostrarTareas();