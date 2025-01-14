const todoForm = document.getElementById('todo-form');  
const todoInput = document.getElementById('todo-input');  
const todosList = document.getElementById('todos');  
let currentEditId = null;  

// Lấy danh sách todos từ server  
const fetchTodos = async () => {  
    const response = await fetch('http://localhost:3000/todos');  
    const todos = await response.json();  
    todosList.innerHTML = '';  
    todos.forEach(todo => {  
        const li = document.createElement('li');  
        li.className = 'todo-item';  
        li.innerHTML = `  
            <span>${todo.content}</span>  
            <div>  
                <button class="btn btn-warning btn-sm" onclick="editTodo('${todo.id}', '${todo.content}')">Sửa</button>  
                <button class="btn btn-danger btn-sm" onclick="deleteTodo('${todo.id}')">Xóa</button>  
            </div>  
        `;  
        todosList.appendChild(li);  
    });  
};  

// Thêm hoặc cập nhật todo  
todoForm.addEventListener('submit', async (e) => {  
    e.preventDefault();  
    const todoContent = todoInput.value.trim();  
    if (currentEditId) {  
        await fetch(`http://localhost:3000/todos/${currentEditId}`, {  
            method: 'PUT',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify({ content: todoContent })  
        });  
        currentEditId = null;  
    } else {  
        await fetch('http://localhost:3000/todos', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify({ content: todoContent })  
        });  
    }  
    todoInput.value = '';  
    fetchTodos();  
});  

// Xóa todo  
const deleteTodo = async (id) => {  
    await fetch(`http://localhost:3000/todos/${id}`, {  
        method: 'DELETE'  
    });  
    fetchTodos();  
};  

// Chỉnh sửa todo  
const editTodo = (id, content) => {  
    todoInput.value = content;  
    currentEditId = id; // Lưu lại id của todo đang chỉnh sửa  
};  

// Khởi động và lấy todos ban đầu  
fetchTodos();   