require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasBD = leerDB();

    if (tareasBD) { // cargar tareas
        tareas.cargarTareasFromArray(tareasBD);
    }

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletas(true);
                break;

            case '4':
                tareas.listarPendientesCompletas(false);
                break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                const resp = await confirmar('¿Está Seguro?');
                if (resp) {
                    tareas.borrarTarea(id);
                    console.log('Tarea Borrada');
                }
                break;
        }


        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0')

}

main();