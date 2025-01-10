const getloginform = document.getElementById('loginform');
const getsignupform = document.getElementById('signupform');
const getmainbox = document.getElementById('mainbox');
const gettodolist = document.getElementById('todobox');
const getloginbtn = document.getElementById('loginbtn');
const getsignupbtn = document.getElementById('signupbtn');
const getofloginbtn = document.getElementById('login-btn');
const getofsignupbtn = document.getElementById('signup-btn');
const gettodoform = document.getElementById('todoform');
const gettextbox = document.getElementById('textbox');
const getul = document.querySelector('.list-group');
const getshowpw = document.getElementById('showpw');
const getshowsignpw = document.getElementById('showsignpw');
const getshowsigncpw = document.getElementById('showsigncpw');

let currentUser = null;

function toggleVisibility(inputId, toggleBtn) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    toggleBtn.innerHTML = type === 'text' ? `<i class="far fa-eye"></i>` : `<i class="far fa-eye-slash"></i>`;
}

function loginpage() {
    getmainbox.classList.add('hidden');
    getloginform.classList.remove('hidden');
    getsignupform.classList.add('hidden');
}

function signuppage() {
    getmainbox.classList.add('hidden');
    getsignupform.classList.remove('hidden');
    getloginform.classList.add('hidden');
}

getshowpw.addEventListener('click', () => toggleVisibility('loginpassword', getshowpw));
getshowsignpw.addEventListener('click', () => toggleVisibility('signuppassword', getshowsignpw));
getshowsigncpw.addEventListener('click', () => toggleVisibility('confirmpassword', getshowsigncpw));

getofloginbtn.addEventListener('click', function () {
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;
    const storedUser = JSON.parse(localStorage.getItem(email));

    if (!email || !password) {
        alert('Please enter both email and password!');
        return;
    }

    if (storedUser && storedUser.password === password) {
        currentUser = email;
        getloginform.classList.add('hidden');
        gettodolist.classList.remove('hidden');
        loadUserTodos();
    } else {
        alert('Invalid email or password!');
    }
});

getofsignupbtn.addEventListener('click', function () {
    const email = document.getElementById('signupemail').value;
    const password = document.getElementById('signuppassword').value;
    const cpassword = document.getElementById('confirmpassword').value;

    if (!email || !password || !cpassword) {
        alert('Please fill in all fields!');
        return;
    }

    if (password !== cpassword) {
        alert('Passwords do not match!');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Email is already registered!');
        return;
    }

    localStorage.setItem(email, JSON.stringify({ email, password, todos: [] }));
    getsignupform.classList.add('hidden');
    gettodolist.classList.remove('hidden');
    alert(`Account created for ${email}`);
    currentUser = email;
    loadUserTodos();
});

gettodoform.addEventListener('submit', (e) => {
    e.preventDefault();
    addNew();
});

function loadUserTodos() {
    getul.innerHTML = '';
    const userData = JSON.parse(localStorage.getItem(currentUser));
    if (userData && userData.todos) {
        userData.todos.forEach((todo) => addNew(todo));
    }
}

function addNew(todo = {}) {
    const todotext = todo.text || gettextbox.value.trim();
    const createdTime = todo.time || new Date().toLocaleString();

    if (!todotext) return;

    const newli = document.createElement('li');
    newli.className = 'list-group-item flex justify-between items-center';

    const todotextEl = document.createElement('span');
    todotextEl.textContent = todotext;
    if (todo.done) todotextEl.classList.add('completed');

    const timeEl = document.createElement('span');
    timeEl.className = 'text-gray-500 text-sm';
    timeEl.textContent = `Created: ${createdTime}`;

    const btnGroup = document.createElement('div');
    btnGroup.className = 'flex space-x-2';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-edit';
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-delete';
    deleteBtn.textContent = 'Delete';

    editBtn.addEventListener('click', () => {
        const newText = prompt('Edit task:', todotextEl.textContent);
        if (newText !== null && newText.trim() !== '') {
            todotextEl.textContent = newText.trim();
            updateLocalStorage();
        }
    });

    deleteBtn.addEventListener('click', () => {
        newli.remove();
        updateLocalStorage();
    });

    todotextEl.addEventListener('click', () => {
        todotextEl.classList.toggle('completed');
        updateLocalStorage();
    });

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    newli.appendChild(todotextEl);
    newli.appendChild(timeEl);
    newli.appendChild(btnGroup);

    getul.appendChild(newli);
    gettextbox.value = '';
    updateLocalStorage();
}

function updateLocalStorage() {
    const todos = Array.from(getul.children).map((li) => ({
        text: li.querySelector('span:first-child').textContent,
        time: li.querySelector('.text-gray-500').textContent.replace('Created: ', ''),
        done: li.querySelector('span:first-child').classList.contains('completed'),
    }));

    const userData = JSON.parse(localStorage.getItem(currentUser));
    userData.todos = todos;
    localStorage.setItem(currentUser, JSON.stringify(userData));
}
