import { v4 as uuid } from 'uuid';

/**
 * @param {String} descripcion recibida de la tarea.
 */
export class Todo {

    constructor(descripcion){

        this.id = uuid();
        this.descripcion = descripcion;
        this.done = false;
        this.completeAt = new Date();

    }  

}