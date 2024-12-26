const inputTarea = document.getElementById('input-tarea');
const formularioTarea = document.getElementById('formulario-tarea');
const listaTarea = document.getElementById('lista-tarea');
const buttonRealizado = document.getElementsByClassName('button-realizado');
const buttonEliminar = document.getElementsByClassName('button-eliminar');

const agregarTarea = (e) => {
    e.preventDefault();

    const tareaValor = inputTarea.value;
    const tarea = document.createElement('li');
    if (tareaValor === '') return

    tarea.classList.add('flex', 'items-center', 'justify-between', 'p-2');
    tarea.innerHTML = `
        ${tareaValor}
        <div class="flex gap-2">
                <button class="button-realizado rounded-full bg-green-500 p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </button>
                <button class="button-eliminar  bg-red-600 p-1 text-white rounded-full"
                    aria-label="Eliminar tarea"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;

    inputTarea.value = ''
    listaTarea.appendChild(tarea);
}

console.log(buttonRealizado);
console.log(buttonEliminar);

formularioTarea.addEventListener('submit', agregarTarea);