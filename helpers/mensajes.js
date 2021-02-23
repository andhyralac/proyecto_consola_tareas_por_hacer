const { read } = require('fs');
const { resolve } = require('path');

require('colors');

const monstrarMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('============================'.green);
        console.log('  SELECCIONE UNA OPCION '.green);
        console.log('============================\n'.green);

        console.log(`${'1'.green}. Crear tarea`);
        console.log(`${'2'.green}. Listar tareas`);
        console.log(`${'3'.green}. Listar tarea completadas`);
        console.log(`${'4'.green}. Listar tarea pendientes`);
        console.log(`${'5'.green}. Completar tarea(s)`);
        console.log(`${'6'.green}. Borrar tarea`);
        console.log(`${'0'.green}. Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });

    });

}

const pausa = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        });

    });
}

module.exports = {
    monstrarMenu,
    pausa
}