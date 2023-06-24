import { Todo } from "../models/Todo.models";

/**
 * 
 * @param {Todo} todo 
 * @returns 
 */
export const createTodoHTML = ( todo ) =>{

    if(!todo) throw new Error('Todo is required.');

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.done ? 'checked': ''}>
            <label>${todo.descripcion}</label>
            <button class="destroy"></button>
        </div>
           <input class="edit" value="Create a TodoMVC template">`;


    const liElement = document.createElement('li')
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);

    if(todo.done)
        liElement.classList.add('completed');


    return liElement;
}