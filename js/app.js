import { collection, db, getDocs, addDoc, deleteDoc, doc, updateDoc } from "./config.js";

let todos = [];
let todoLists = document.querySelector(".todo-lists");

window.doneTodo = async (todo_id) => {

    try {
        if (todo_id !== null) {
            await updateDoc(doc(db, "users", todo_id), {
                iscompleted: true
            });

            todos.forEach((userObj) => {
                if (userObj.id === todo_id) {
                    userObj.iscompleted = true;
                }
            });

            todo_id = null;

            document.querySelector("#addBtn").innerText = "Add";
        }

        todos.forEach((todo) => {
        if (todo.id == todo_id) {
            todo.iscompleted = true;
        }
    });
    } catch (error) {
        console.error(error);   
    }


    let todoElement = document.getElementById(`${todo_id}`);

    todoElement.querySelector(".edit-btn").style.display = "none";

    todoElement.querySelector(".todo-list-text").style.textDecoration = "line-through";

    todoElement.querySelector(".done-btn").style.display = "none";

};

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

// Render All Users function

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

// Delete All users function

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

let editId = null;

// Add and Update user function

let addTodo = async () => {
    try {
        let todoInp = document.getElementById("todo-inp");

        if (todoInp.value.trim().length < 3) {
            alert("Character at least 3!");
            return;
        }

        // Agar edit mode hai to update karein
        if (editId !== null) {
            await updateDoc(doc(db, "users", editId), {
                username: todoInp.value
            });

            todos.forEach((userObj) => {
                if (userObj.id === editId) {
                    userObj.username = todoInp.value;
                }
            });

            editId = null;

            document.querySelector("#addBtn").innerText = "Add";

        } 
        // Warna new user add karein
        else {
            const docRef = await addDoc(collection(db, "users"), {
                username: todoInp.value,
                iscompleted: false
            });

            todos.push({
                username: todoInp.value,
                iscompleted: false,
                id: docRef.id
            });
        }

        todoInp.value = "";
        renderUsers();

        document.querySelector("#delAllBtn").disabled = false;

    } catch (error) {
        console.error(error);
    }
};

document.querySelector("#addBtn").addEventListener("click", addTodo);

// Delete user function

window.deleteTodo = async (todo_id) => {
    try {
        await deleteDoc(doc(db, "users", todo_id));

        todos = todos.filter((todo) => todo.id != todo_id);

        renderUsers();

    } catch (error) {
        console.error(error);
    }
};


// edit user function

window.editTodo = (userObj_id) => {
    console.log(userObj_id);

    let deleteBtns = document.querySelectorAll('.del-btn');
    let editBtns = document.querySelectorAll('.edit-btn');
    let doneBtn = document.querySelectorAll(".done-btn");
    document.querySelector('#delAllBtn').disabled = true;
    deleteBtns.forEach((btn) => btn.disabled = true);
    editBtns.forEach((btn) => btn.disabled = true);
    doneBtn.forEach(btn => btn.disabled = true);

    let findTodo = todos.find((todo) => todo.id === userObj_id);
    console.log("find todo: ", findTodo);

    document.querySelector('#todo-inp').value = findTodo.username;

    let addBtn = document.querySelector('#addBtn');
    addBtn.innerText = 'Update';

    addBtn.removeAttribute('onClick');
    addBtn.setAttribute('onClick', `updateUser('${userObj_id}')`);
    addBtn.style.width = "13%";

    editId = userObj_id;

}
