//styles
const checked = "fa-solid fa-circle-check";
const unChecked = "fa-solid fa-circle";
const liClasses = "todo d-flex justify-content-start align-items-center";
const contentClasses = "content";
const deleteBoxClasses = "ms-auto me-2 delete";
const deleteIconClasses = "fa-solid fa-trash-can";
//elements
const toDoCompletedUl = document.getElementById('completed');
const toDoUnCompletedUl = document.getElementById('unCompleted');
const spanAll = document.getElementById('span-all');
const spanComp = document.getElementById('span-comp');
const spanUnComp = document.getElementById('span-unComp');
const newTodoContent = document.getElementById('newTodoContent');
//todo List
let toDoList = [];

function addNewTodo() {
    if (newTodoContent.value == '') {
        console.log('Empty');
        return;
    }
    let newTodo = {
        content: newTodoContent.value,
        completed: false
    };
    toDoList.push(newTodo);
    buildToDoItem(newTodo);
    localStorage.setItem('toDos', JSON.stringify(toDoList));
    newTodoContent.value = '';
}


window.addEventListener('load',
    () => {
        let toDosJson = localStorage.getItem('toDos');
        toDoList = JSON.parse(toDosJson);
        buildList();
    });

function buildList() {
    toDoList.sort(compare);
    updateFooter();
    toDoCompletedUl.innerHTML = '';
    toDoUnCompletedUl.innerHTML = '';
    for (let index = 0; index < toDoList.length; index++) {
        buildToDoItem(toDoList[index]);
    }
}

function buildToDoItem(todo) {
    //create Elements 
    let todoElem = document.createElement('li');
    let iconBox = document.createElement('div');
    let icon = document.createElement('i');
    let deleteIcon = document.createElement('i');
    let content = document.createElement('div');
    let deleteBox = document.createElement('div');
    //classes
    todoElem.className = liClasses;
    icon.className = todo.completed ? checked : unChecked;
    content.className = contentClasses;
    deleteIcon.className = deleteIconClasses;
    deleteBox.className = deleteBoxClasses;
    //events
    deleteBox.addEventListener("click", function () {
        let confirmDelete = confirm("Are you sure you want to delete this Todo? \n" + todo.content);
        if (confirmDelete) {
            let index = toDoList.indexOf(todo);
            toDoList.splice(index, 1);
            localStorage.setItem('toDos', JSON.stringify(toDoList));
            todoElem.remove();
            updateFooter();
        }
    });
    // TODO: toggle completed
    iconBox.addEventListener("click", function () {
        todo.completed = !todo.completed;
        localStorage.setItem('toDos', JSON.stringify(toDoList));
        if (todo.completed) {
            //completed
            toDoCompletedUl.prepend(todoElem);
            iconBox.firstChild.classList.toggle('fa-circle-check');
            content.classList.toggle('text-decoration-line-through');
            updateFooter();
        } else {
            //unCompleted                 
            iconBox.firstChild.classList.toggle('fa-circle');
            content.classList.remove('text-decoration-line-through');
            toDoUnCompletedUl.append(todoElem);
            updateFooter();
        }

    });
    // content 
    content.textContent = todo.content;
    content.setAttribute('contenteditable', 'true');
    content.onblur = event => {
        let newContent = event.target.innerText;
        //#TODO:change content
        if (newContent != todo.content) {
            todo.content = newContent;
            localStorage.setItem('toDos', JSON.stringify(toDoList));
        }
        event.stopPropagation();
    };
    // add icon and content to li
    iconBox.appendChild(icon)
    deleteBox.appendChild(deleteIcon)
    todoElem.appendChild(iconBox);
    todoElem.appendChild(content);
    todoElem.appendChild(deleteBox);
    //add todo to html
    if (todo.completed) {
        toDoCompletedUl.appendChild(todoElem);
    } else {
        toDoUnCompletedUl.prepend(todoElem);
    }
}

function updateFooter() {
    spanAll.innerHTML = +toDoList.length;
    spanComp.innerHTML = toDoList.filter(toD => toD.completed).length;
    spanUnComp.innerHTML = toDoList.filter(toD => !toD.completed).length;
}

function compare(a, b) {
    if (a.completed) {
        return 1;
    }
    if (a.completed === b.completed) {
        return 0;
    }
    return -1;
}
