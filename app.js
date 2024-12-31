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



function loginpage(){

    mainbox.classList.add('hidden');
    getloginform.classList.remove('hidden');
    getsignupform.classList.add('hidden');
    
}

function signuppage(){
    mainbox.classList.add('hidden');
    getsignupform.classList.remove('hidden');
    getloginform.classList.add('hidden');
}



getshowpw.addEventListener('click',function(){
    const password = document.getElementById('loginpassword');
    const value = password.getAttribute('type');
    // console.log(value);
    if (value == "password") {
        password.setAttribute('type',"text");
        getshowpw.innerHTML = `<i class="far fa-eye"></i>`;
        
    }else{
        password.setAttribute('type',"password");
        getshowpw.innerHTML = `<i class="far fa-eye-slash"></i>`;
    }
    
});



getofloginbtn.addEventListener('click', function () {
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (!email || !password) {
        alert("Please enter both email and password!");
        return;
    }

    if (storedUser && storedUser.password === password) {
        // Login success: hide login form, show to-do list
        getloginform.classList.add('hidden');
        gettodolist.classList.remove('hidden');
    } else {
        alert("Invalid email or password!");
    }
});

getshowsignpw.addEventListener('click',function(){
    const password = document.getElementById('signuppassword');
    const value = password.getAttribute('type');
    // console.log(value);
    if (value == "password") {
        password.setAttribute('type',"text");
        getshowsignpw.innerHTML = `<i class="far fa-eye"></i>`;
        
    }else{
        password.setAttribute('type',"password");
        getshowsignpw.innerHTML = `<i class="far fa-eye-slash"></i>`;
    }
    
});

getshowsigncpw.addEventListener('click',function(){
    const cpassword = document.getElementById('confirmpassword');
    const value = cpassword.getAttribute('type');
    // console.log(value);
    if (value == "password") {
        cpassword.setAttribute('type',"text");
        getshowsigncpw.innerHTML = `<i class="far fa-eye"></i>`;
        
    }else{
        cpassword.setAttribute('type',"password");
        getshowsigncpw.innerHTML = `<i class="far fa-eye-slash"></i>`;
    }
    
});

getofsignupbtn.addEventListener('click', function () {
    const email = document.getElementById('signupemail').value;
    const password = document.getElementById('signuppassword').value;
    const cpassword = document.getElementById('confirmpassword').value;

    if (!email || !password || !cpassword) {
        alert("Please fill in all fields!");
        return;
    }

    if (password !== cpassword) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem(email, JSON.stringify({ email: email, password: password }));

    getsignupform.classList.add('hidden');
    gettodolist.classList.remove('hidden');

    alert(`Account created for ${email}`);
})

gettodoform.addEventListener('submit', (e) => {
    // console.log('hey');
    addnew();
    e.preventDefault();
});

const getlocaldbs = JSON.parse(localStorage.getItem('todos'));

if(getlocaldbs){
    getlocaldbs.forEach(getlocaldb=>addnew(getlocaldb));
}

function addnew(todo) {
    let todotext = gettextbox.value;
    console.log('todotext');
    if(todo){
        todotext = todo.text;
    }
    if (todotext) {
        const newli = document.createElement('li');

        if(todo && todo.done){
            newli.classList.add('completed');
        } 

        newli.appendChild(document.createTextNode(todotext));
        getul.appendChild(newli);
        gettextbox.value = '';
        gettextbox.focus();

        updatelocalstorage();

        // console.log(newli);

        newli.addEventListener('click', function () {
            newli.classList.toggle('completed');
            updatelocalstorage();
        });

        newli.addEventListener('contextmenu', function () {
            // console.log('hello');
            newli.remove();
            updatelocalstorage();
            e.preventDefault();
        })
    }

}

function updatelocalstorage() {
    let getallis = document.querySelectorAll('li');

    const todos = [];
    getallis.forEach(getalli => {
        todos.push({
            text: getalli.textContent,
            done: getalli.classList.contains('completed')
        });

    });
    
    localStorage.setItem('todos',JSON.stringify(todos));
}