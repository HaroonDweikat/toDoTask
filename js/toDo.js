// const toDos = [
//     {
//         content: "Task1",
//         completed: false

//     },
//     {
//         content: "Task2",
//         completed: false

//     },
//     {
//         content: "Task3",
//         completed: true

//     },
//     {
//         content: "Task4",
//         completed: false

//     },
// ];

// localStorage.setItem('toDos', JSON.stringify(toDos));

const checked = "fa-solid fa-check-square";
const unChecked = "fa-solid fa-square";
const liClasses ="todo d-flex justify-content-start align-items-center";
const contentClasses ="content";
const toDoUl = document.getElementById('ToDos');
let toDosJson = localStorage.getItem('toDos');
let toDoList = JSON.parse(toDosJson);



toDoList.forEach(todo => {
    let todoElem = document.createElement('li');
    let icon = document.createElement('i');
    let content = document.createElement('div');

    //classes
    todoElem.className = liClasses;
    if (todo.completed) {
        icon.className = checked;
    }
    else {
        icon.className = unChecked;
    }
    content.className = contentClasses;

    // content 
    content.textContent = todo.content;
    // add icon and content to li
    todoElem.appendChild(icon);
    todoElem.appendChild(content);
    
    //add todo to html
    toDoUl.appendChild(todoElem);
});