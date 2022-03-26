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

const checked = "fa-solid fa-circle-check";
const unChecked = "fa-solid fa-circle";
const liClasses = "todo d-flex justify-content-start align-items-center";
const contentClasses = "content";
const deleteBoxClasses = "ms-auto me-2";
const deleteIconClasses = "fa-solid fa-trash-can";
const toDoCompletedUl = document.getElementById('completed');
const toDoUnCompletedUl = document.getElementById('unCompleted');
let toDosJson = localStorage.getItem('toDos');
let toDoList = JSON.parse(toDosJson);

toDoList.sort(compare);

let newTodoContent = document.getElementById('newTodoContent');
console.log(toDoList);
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
    newTodoContent.value ='';
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

document.addEventListener('onLoad', reBuildList());



function reBuildList() {
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
        deleteIcon.className =  deleteIconClasses;
        deleteBox.className =  deleteBoxClasses;
        //events
        deleteBox.addEventListener("click", function(event){
            console.log(toDoList);
            toDoList.splice(index,1);
            console.log(toDoList);
            reBuildList();
        });
        iconBox.addEventListener("click", function (event) {
            toDoList[index].completed = !toDoList[index].completed;
           

            if (toDoList[index].completed) {
                //completed 
                iconBox.firstChild.classList.toggle('fa-circle-check');
                reBuildList();
            } else {
                //unCompleted 
                iconBox.firstChild.classList.toggle('fa-circle');
                reBuildList();
            }

        });

        // content 
        content.textContent = toDoList[index].content;
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
    localStorage.setItem('toDos', JSON.stringify(toDoList));
}