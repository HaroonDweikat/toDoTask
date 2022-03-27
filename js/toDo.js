// localStorage.setItem('toDos', JSON.stringify(toDos));

const checked = "fa-solid fa-circle-check";
const unChecked = "fa-solid fa-circle";
const liClasses = "todo d-flex justify-content-start align-items-center";
const contentClasses = "content";
const deleteBoxClasses = "ms-auto me-2 delete";
const deleteIconClasses = "fa-solid fa-trash-can";
const toDoCompletedUl = document.getElementById('completed');
const toDoUnCompletedUl = document.getElementById('unCompleted');
const spanAll = document.getElementById('span-all');
const spanComp = document.getElementById('span-comp');
const spanUnComp = document.getElementById('span-unComp');
let toDoList;

if (toDoList == null) {
    toDoList = [];
}
toDoList.sort(compare);

let newTodoContent = document.getElementById('newTodoContent');
function addNewTodo() {
    if (newTodoContent.value == '') {
        console.log('Empty');
        return;
    }

    toDoList.push({
        content: newTodoContent.value,
        completed: false
    });

    reBuildList();

    localStorage.setItem('toDos', JSON.stringify(toDoList));
    localStorage.getItem('toDos');
    newTodoContent.value = '';
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

window.addEventListener('load',
    () => {
        let toDosJson = localStorage.getItem('toDos');
        toDoList = JSON.parse(toDosJson);
        if (toDoList == null) {
            toDoList = [];
        }
        reBuildList();
    });

function reBuildList() {
    spanAll.innerHTML = +toDoList.length;
    spanComp.innerHTML = toDoList.filter(toD => toD.completed).length;
    spanUnComp.innerHTML = toDoList.filter(toD => !toD.completed).length;
    toDoList.sort(compare);
    toDoCompletedUl.innerHTML = '';
    toDoUnCompletedUl.innerHTML = '';
    for (let index = 0; index < toDoList.length; index++) {
        let todoElem = document.createElement('li');
        let iconBox = document.createElement('div');
        let icon = document.createElement('i');
        let deleteIcon = document.createElement('i');

        let content = document.createElement('div');
        let deleteBox = document.createElement('div');
        //classes
        todoElem.className = liClasses;
        icon.className = toDoList[index].completed ? checked : unChecked;
        content.className = contentClasses;
        deleteIcon.className = deleteIconClasses;
        deleteBox.className = deleteBoxClasses;
        //events
        deleteBox.addEventListener("click", function () {
            let confirmDelete = confirm("Are you sure you want to delete this Todo? \n" + toDoList[index].content);
            if (confirmDelete) {
                toDoList.splice(index, 1);
                localStorage.setItem('toDos', JSON.stringify(toDoList));
                reBuildList();
            }
        });
        iconBox.addEventListener("click", function (event) {
            toDoList[index].completed = !toDoList[index].completed;
            localStorage.setItem('toDos', JSON.stringify(toDoList));

            if (toDoList[index].completed) {
                //completed 
                iconBox.firstChild.classList.toggle('fa-circle-check');
                content.classList.toggle('text-decoration-line-through');
                reBuildList();
            } else {
                //unCompleted 
                iconBox.firstChild.classList.toggle('fa-circle');
                content.classList.toggle('text-decoration-line-through');
                reBuildList();
            }

        });
        // content 
        content.textContent = toDoList[index].content;
        content.setAttribute('contenteditable', 'true');
        content.onblur = event => {
            let newContent = event.target.innerText;
            if (newContent != toDoList[index].content) {
                toDoList[index].content = newContent;
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
        if (toDoList[index].completed) {
            toDoCompletedUl.appendChild(todoElem);
        } else {
            toDoUnCompletedUl.appendChild(todoElem);
        }
    };
}


