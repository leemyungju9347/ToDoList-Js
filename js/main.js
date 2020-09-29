// greetings 
const body = document.querySelector('body');
const greetingsArea = body.querySelector('.greetings-area');
const greetingsForm = greetingsArea.querySelector('.greetings-form');
const greetingsInput = greetingsArea.querySelector('.greetings-form > input');

const subTitle = body.querySelector('.todolist-area .username');


const localUser = 'currentUser';
const classNm = 'active'

function saveUser(text) {
    localStorage.setItem(localUser,text)
}

// submit 이벤트
function handleSubmit(ev){
    ev.preventDefault();

    const currentValue = greetingsInput.value;

    paintGreeting(currentValue);
    saveUser(currentValue)
}

function askForName(){
    greetingsArea.style.display = 'block';
    body.classList.add(classNm);
    // submit 이벤트
    greetingsForm.addEventListener('submit',handleSubmit)
}

function paintGreeting(text) {
    greetingsArea.style.display = 'none';
    body.classList.remove(classNm);
    subTitle.innerHTML = `${text}'s today list`
}

// 로컬스토리지에서 username을 가져오는 역할
function loadName(){
    const currentUser = localStorage.getItem(localUser);

    // 유저가 없다면
    if( currentUser === null ){

        askForName()

    // 로컬 스토리지 유저가 있다면
    }else {
        paintGreeting(currentUser)
    }

}


function init () {
    loadName()
}

init();


// todolist
const todoForm = document.querySelector('.todolist-area > .todo-form')
const todoInput = todoForm.querySelector('.todo-input');
const todoList = document.querySelector('.todolist-content > ul');

const localTodo = 'toDos';

let toDos = [];


// 삭제
function deleteTodo(event){
    const btn = event.target
    const li = btn.parentNode.parentNode.parentNode;

    todoList.removeChild(li);

    const cleanTodos = toDos.filter(item => {
        return item.id !== parseInt(li.id)
    });

    console.log(cleanTodos);
    toDos = cleanTodos;
    saveToDos();
}

function checkTodo(event){
    console.log(event.target.parentNode.parentNode);
    const btn = event.target;
    const li = btn.parentNode.parentNode;

    
}

// 투두리스트 배열을 로컬에 저장하는 함수
function saveToDos(){
    localStorage.setItem(localTodo,JSON.stringify(toDos))
    
}



function paintTodo(text){
    console.log(text);
    const li = document.createElement('li');
    // const editBtn = document.createElement('edit');
    const btnBox = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const btnIcon = document.createElement('i');
    const editBtn = document.querySelector('button');
    const span = document.createElement('span');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const labelSpan = document.createElement('span');
    const labelIcon = document.createElement('i');
    const newId = toDos.length + 1;

    li.id = newId;

    input.type = 'checkbox';
    input.id = 'complete';
    input.classList.add('checkbox');
    labelIcon.classList.add('fas');
    labelIcon.classList.add('fa-check');
    label.setAttribute('for','complete');

    btnBox.classList.add('btn-box');
    deleteBtn.classList.add('delete-btn');
    btnIcon.classList.add('fas');
    btnIcon.classList.add('fa-times');
    
    deleteBtn.addEventListener('click',deleteTodo);
    labelSpan.addEventListener('click',checkTodo)

    btnBox.appendChild(deleteBtn);
    deleteBtn.appendChild(btnIcon)

    label.appendChild(labelSpan);
    labelSpan.appendChild(labelIcon);

    span.innerHTML = text;
    
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(span);

    li.appendChild(btnBox);
    

    todoList.appendChild(li);


    const toDoObj = {
        text : text,
        id : newId
    }

    toDos.push(toDoObj);

    saveToDos()
    
}

function listSubmit(ev){
    ev.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue)

    todoInput.value = '';
}

function loadTodos(){
    const loadedTodos = localStorage.getItem(localTodo);

    // 로컬에 없으면 
    if( loadedTodos !== null ){
        console.log(loadedTodos);
        const parsedTodos = JSON.parse(loadedTodos);
        console.log(parsedTodos);
        parsedTodos.forEach(item =>{
            paintTodo(item.text)
        })
    }
}

function todoInit(){
    loadTodos();

    todoForm.addEventListener('submit',listSubmit)
}

todoInit();