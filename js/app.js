let todos = [];
let todoLists = document.querySelector(".todo-lists");


let setTodoInLocalStorage = () => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
}
let getTodoInLocalStorage = () => {
    let todoData = JSON.parse(window.localStorage.getItem("todos"));
    todos = todoData || [];
}
getTodoInLocalStorage();


let doneTodo = (todo_id) => {

    todos.forEach((todo) => {
        if (todo.id == todo_id) {
            todo.iscompleted = true;
        }
    });

    setTodoInLocalStorage();

    let todoElement = document.getElementById(`${todo_id}`);

    todoElement.querySelector(".edit-btn").style.display = "none";

    todoElement.querySelector(".todo-list-text").style.textDecoration = "line-through";

    todoElement.querySelector(".done-btn").style.display = "none";

};

let deleteAll = () => {
    window.localStorage.removeItem("todos");
    todos = [];
    renderTodo();
}

let addTodo = () => {
    let todoInp = document.getElementById("todo-inp");

    if (todoInp.value.length != 0) {
        todos.push({
            text: todoInp.value,
            id: new Date().getTime(),
            iscompleted: false
        });
        console.log(todos);
        setTodoInLocalStorage();
        todoInp.value = '';
        renderTodo();
    }
    else {
        let alert = document.querySelector("#alert");
        alert.innerText = "Character Invalid!";
        todoInp.addEventListener("input", function () {
            alert.innerText = "";
        })    
    }
}

let deleteTodo = (todo_id) => {
    console.log(todo_id);

    let filteredTodos = todos.filter((todo) => todo.id != todo_id);
    todos = filteredTodos;

    setTodoInLocalStorage();

    renderTodo();
}


let updateTodo = (todo_id) => {
    console.log('Update', todo_id);

    todos.forEach((todoObj) => {
        if (todoObj.id == todo_id) {
            todoObj.text = document.querySelector('#todo-inp').value;
        }
    });

    setTodoInLocalStorage();

    let deleteBtns = document.querySelectorAll('.del-btn');
    let editBtns = document.querySelectorAll('.edit-btn');
    document.querySelector('#delAllBtn').disabled = false;
    deleteBtns.forEach((btn) => btn.disabled = false);
    editBtns.forEach((btn) => btn.disabled = false);

    let addBtn = document.querySelector('#addBtn');
    addBtn.innerText = 'Add';
    document.querySelector('#todo-inp').value = '';

    addBtn.removeAttribute('onClick');
    addBtn.setAttribute('onClick', `addTodo()`);
    addBtn.style.width = "10%";

    renderTodo();

}

let editTodo = (todo_id) => {
    console.log(todo_id);

    let deleteBtns = document.querySelectorAll('.del-btn');
    let editBtns = document.querySelectorAll('.edit-btn');
    document.querySelector('#delAllBtn').disabled = true;
    deleteBtns.forEach((btn) => btn.disabled = true);
    editBtns.forEach((btn) => btn.disabled = true);

    let findTodo = todos.find((todo) => todo.id === todo_id);
    document.querySelector('#todo-inp').value = findTodo.text;

    let addBtn = document.querySelector('#addBtn');
    addBtn.innerText = 'Update';

    addBtn.removeAttribute('onClick');
    addBtn.setAttribute('onClick', `updateTodo('${todo_id}')`);
    addBtn.style.width = "13%";

}

let renderTodo = () => {
    console.log(todos);

    todoLists.innerHTML = ``;
    todos.map((item) => {
        let todoList = document.createElement('div');
        todoList.className = 'todo';

        if (item.iscompleted) {
            todoList.className += ' done';
            todoList.innerHTML = `
                <div class='todo-list-sub'>
                    <span class='todo-list-text'>${item.text}</span>
                    <button class='del-btn' onclick='deleteTodo(${item.id})'><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        }
        else {
            todoList.innerHTML = `
                <div class='todo-list-sub' id='${item.id}'>
                    <span class='todo-list-text'>${item.text}</span>
                    <div class='buttons-box'>
                        <button class='del-btn' onClick='deleteTodo(${item.id})'><i class="fa-solid fa-trash"></i></button>
                        <button class='edit-btn' id='edit-btn-icon' onClick='editTodo(${item.id})'><i class="fa-solid fa-pen"></i></button>
                        <button class='done-btn' onClick='doneTodo(${item.id})'><i class="fa-solid fa-circle-check"></i></button>
                    </div>        
                </div>
            `;
        }

        todoLists.appendChild(todoList);

    });
}

renderTodo();