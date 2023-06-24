import { Filters } from '../store/todo.store';
import todoStore from '../store/todo.store';
import { renderTodos, renderPendingTodo} from './Use-cases';
import html from './app.html?raw';

const elementIds = {
    ClearCompleted : '.clear-completed',
    TodoList : '.todo-list',
    NewTodoImput : '#new-todo-input',
    FilterLi : '.filtro',
    PendingCount : '#pending-count'
};

export const App =  (elementId, ) =>{

    const displayTodos = () =>{
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(elementIds.TodoList, todos);
        pendingTodoCount();
    }

    const pendingTodoCount = () =>{
        renderPendingTodo(elementIds.PendingCount);
    }

    (() => {

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();


    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(elementIds.NewTodoImput);
    const todoListUL = document.querySelector(elementIds.TodoList);
    const clearDone = document.querySelector(elementIds.ClearCompleted);
    const FilterLi =  document.querySelectorAll(elementIds.FilterLi);

    //Listener
    newDescriptionInput.addEventListener( 'keyup', ( event ) => { 
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener( 'click', ( event) => { 
        const element = event.target.closest('[data-id');
        todoStore.toggleTodo( element.getAttribute( 'data-id' ));
        displayTodos();
    });

    todoListUL.addEventListener( 'click', (event) => {
        const btnDestroy = event.target.className === 'destroy';
        const element = event.target.closest('[data-id');
        if( !element || !btnDestroy ) return;
        
        todoStore.deleteTodo( element.getAttribute( 'data-id' ));
         displayTodos();

    });

    clearDone.addEventListener( 'click', () => {    
        todoStore.deleteCompleted();
        displayTodos();
    });

    FilterLi.forEach( element => {
        element.addEventListener('click', ( element ) =>{
            FilterLi.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch( element.target.text){
                case 'Todos' :
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes' :
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados' :
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();

        })

    });


     
}