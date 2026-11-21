import { collection, db, getDocs, addDoc, deleteDoc, doc, updateDoc } from "./config.js";

let todos = [];
let todoLists = document.querySelector(".todo-lists");

// let setTodoInLocalStorage = () => {
//     window.localStorage.setItem('todos', JSON.stringify(todos));
// }
// let getTodoInLocalStorage = () => {
//     let todoData = JSON.parse(window.localStorage.getItem("todos"));
//     todos = todoData || [];
// }
// getTodoInLocalStorage();


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


// document.querySelector(".edit-btn").addEventListener("click", editTodo);

// user fecth

let fetchUsers = async () => {
    try {
        todos = [];
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach(doc => {
            todos.push({
                ...doc.data(), id: doc.id
            });
        });
        console.log(todos);
    } catch (error) {
        console.error(error);
    }
}

fetchUsers().then(() => {
    renderUsers();
})


let renderUsers = () => {
    console.log(todos);

    todoLists.innerHTML = ``;
    todos.map((userObj) => {
        let todoList = document.createElement('div');
        todoList.className = 'todo';

        if (userObj.iscompleted) {
            todoList.className += ' done';
            todoList.innerHTML = `
                <div class='todo-list-sub'>
                    <span class='todo-list-text'>${userObj.username}</span>
                    <button class='del-btn' onclick='deleteTodo(${userObj.id})'><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        }
        else {
            todoList.innerHTML = `
                <div class='todo-list-sub' id='${userObj.id}'>
                    <span class='todo-list-text'>${userObj.username}</span>
                    <div class='buttons-box'>
                        <button class='del-btn' onClick="deleteTodo('${userObj.id}')"><i class="fa-solid fa-trash"></i></button>
                        <button class='edit-btn' id='edit-btn-icon' onClick="editTodo('${userObj.id}')"><i class="fa-solid fa-pen"></i></button>
                        <button class='done-btn' onClick="doneTodo('${userObj.id}')"><i class="fa-solid fa-circle-check"></i></button>
                    </div>        
                </div>
            `;
        }

        todoLists.appendChild(todoList);

    });
}

window.deleteAll = async () => {
    try {
        for (let todo of todos) {
            await deleteDoc(doc(db, "users", todo.id));
        }

        todos = [];
        renderUsers();

    } catch (error) {
        console.error(error);
    }
};

let addTodo = async () => {
    try {
        let todoInp = document.getElementById("todo-inp");

        // validation
        if (todoInp.value < 3) {
            alert("Character at least 3!");
            return;
        }
        const docRef = await addDoc(collection(db, "users"), {
            username: todoInp.value,
            iscompleted: false
        });

        todoInp.value = "";
        console.log("Document written with ID: ", docRef.id)

        renderUsers();

    } catch (error) {
        console.error(error);
    }
}
document.querySelector("#addBtn").addEventListener("click", addTodo);

window.deleteTodo = async (todo_id) => {
    try {
        await deleteDoc(doc(db, "users", todo_id));

        todos = todos.filter((todo) => todo.id != todo_id);

        renderUsers();

    } catch (error) {
        console.error(error);
    }
};

window.editTodo = (userObj_id) => {
    console.log(userObj_id);

    let deleteBtns = document.querySelectorAll('.del-btn');
    let editBtns = document.querySelectorAll('.edit-btn');
    document.querySelector('#delAllBtn').disabled = true;
    deleteBtns.forEach((btn) => btn.disabled = true);
    editBtns.forEach((btn) => btn.disabled = true);

    let findTodo = todos.find((todo) => todo.id === userObj_id);
    console.log("find todo: ", findTodo);

    document.querySelector('#todo-inp').value = findTodo.username;

    let addBtn = document.querySelector('#addBtn');
    addBtn.innerText = 'Update';

    addBtn.removeAttribute('onClick');
    addBtn.setAttribute('onClick', `updateUser('${userObj_id}')`);
    addBtn.style.width = "13%";

}



window.updateUser = async (uid) => {
    try {

        console.log(uid);

        let todoInp = document.querySelector("todo-inp")
        const docRef = doc(db, "users", uid);

        await updateDoc(docRef, {
            username: todoInp.value
        });

        todos.forEach((userObj) => {
            if (userObj.id == uid) {
                userObj.username = `${todoInp.value}`;
            }
        })

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

        renderUsers();

        console.log("user updated successfully!");


    } catch (error) {
        console.error(error);
    }
}