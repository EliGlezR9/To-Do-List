import { Todo } from "../todos/models/Todo.models";

export const Filters = {

    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'

}

const state = {

    todos:  [ ], 
    filter: Filters.All,

}

const initStore = () =>{
    loadStore();
    console.log('InitStore done.');
}

const loadStore = () =>{
    if( !localStorage.getItem('state') ) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter; 
}

const saveLocalStore = () =>{
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) =>{
    switch( filter ){
        case Filters.All:
            return[...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        default:
            throw new Error(`Option ${filter} not allowed, add a valid one`)

    }
}

const addTodo = (descripcion) =>{

    if(!descripcion) throw new Error('description is necessary to add new To-Do.');
    const newTodo = state.todos.push(new Todo(descripcion));
    saveLocalStore();
}

const toggleTodo = (todoId) =>{
     
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId){
            todo.done = ! todo.done;
        }
        return todo;
    });
    saveLocalStore();
}

const deleteTodo = (todoId) =>{
    state.todos =  state.todos.filter( todo => todo.id !== todoId );
    saveLocalStore();
}

const deleteCompleted = () =>{
    state.todos =  state.todos.filter( todo => !todo.done );
    saveLocalStore();
}

const   setFilter = (newFilter = Filters.All) =>{
    state.filter = newFilter;
    saveLocalStore();
}

const getCurrentFilter = () =>{
    return state.filter ;
}


export default {

    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo

}