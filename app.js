// Kumpulan semua UI element

const TodoForm = document.querySelector("#todo-form");
const TodoInput = document.querySelector("#todo-input");
const FilterInput = document.querySelector("#filter-input");
const TodoList = document.querySelector("#todo-list");
const TodoClear = document.querySelector("#clear-todos");

// Kumpulan Eventlistener 
immediateEventListener();

function immediateEventListener() {

    // Mendapatkan Todos dari localStorage dan render di browser
    document.addEventListener("DOMContentLoaded", getTodos)

    // Ini adalah event untuk menambahkan todo
    TodoForm.addEventListener("submit",addTodo)

    // Ini adalah event untuk menghapus satu todo
    TodoList.addEventListener("click",deleteTodo)

    // Ini adalah event untuk menghapus semua todo
    TodoClear.addEventListener("click",cleartodos)

    // Ini adalah event untuk memfiltert todo
    FilterInput.addEventListener("keyup",filtertodos)

}

// Reusable Todos

function createTodoElement(value) {
    // Membuat li element
    const Li = document.createElement("Li");

    // Membuat class pada elemen Li
    Li.className = "list-group-item d-flex justify-content-between align-items-center mb-1"

    // Membuat Children pada elemen Li
    Li.appendChild(document.createTextNode(value));

    // Membuat Delete Button
    const a = document.createElement("a");

    // Membuat property nya
    a.href = "#";
    a.className = "badge badge-danger delete-todo";

    a.innerHTML = "Delete";

    // Menggabungkan element a ke dalam element Li

    Li.appendChild(a);

    // Memasukan element Li yang telah dibuat javascript
    // Ke dalam element TodoList
    TodoList.appendChild(Li)

}

function getItemFromStorage() {
    let todos ;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

// Ini merupakan DOM function

function getTodos () {
    const todos = getItemFromStorage();

    todos.forEach((todo) => {
        createTodoElement(todo);
    })

}

function addTodo (e) {
    e.preventDefault();
    if (TodoInput.value) {
        createTodoElement (TodoInput.value);

        AddTodoLocalStorage(TodoInput.value);

        TodoInput.value = ""
    } else {
        alert("List tidak boleh kosong")
    }

}

function AddTodoLocalStorage (todoInputValue) {
    const todos = getItemFromStorage();

    todos.push(todoInputValue);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function deleteTodo (e) {
    e.preventDefault();

    if (e.target.classList.contains("delete-todo")) {
        if (confirm("Apakah Kamu Yakin Menghapusnya?")){
               const parent = e.target.parentElement;

        parent.remove();

        deleteTodoLocalStorage(parent);
        }
    }
}

function deleteTodoLocalStorage (deletedElement) {
    const todos = getItemFromStorage();

    todos.forEach((todo, index) => {
        if (deletedElement.firstChild.textContent === todo) {
            todos.splice (index, 1 );
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

function cleartodos () {
    TodoList.innerHTML = ""
    cleartodosfromLocalStorage()
}

function cleartodosfromLocalStorage () {
    localStorage.clear()
}

function filtertodos (e) {
    const filtertext = e.target.value.toLowerCase();
    const todoItems = document.querySelectorAll(".todo-item");

    todoItems.forEach((item) => {
        const itemText = item.firstChild.textContent.toLowerCase();

        if (itemText.indexOf(filtertext) !== -1) {
            item.setAttribute("style", "display : block;");
        } else {
            item.setAttribute("style", "display : none !important;")
        }

    })

}
