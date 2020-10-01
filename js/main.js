// greetings 
const body = document.querySelector('body');
const greetingsArea = body.querySelector('.greetings-area');
const greetingsForm = greetingsArea.querySelector('.greetings-form');
const greetingsInput = greetingsArea.querySelector('.greetings-form > input');

const username = body.querySelector('.todolist-area > .sub-title > .username');
const titleMsg = body.querySelector('.todolist-area > .sub-title > .title-msg');

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
    username.innerHTML = text
    titleMsg.innerHTML = `'s today list`
    // `${text}'s today list`
}

function usernameKeyEvent(event){
    console.log(event.target);

}


function keyEvent(ev) {
    const keyCode = ev.keyCode;
    // enter 입력시
    if ( keyCode === 13 ) {
        this.blur();
        
    }
}

function blurEvent(ev) {
    const oldUsername = localStorage.getItem(localUser);
    const newUsername = ev.target.innerText;

    // username 입력시 기존에 있던 이름과 같지않으면
    if( oldUsername !== newUsername ) {
        // 빈값이 들어오면
        if( newUsername === '' ) {
            ev.target.innerText = oldUsername
        }else {
            ev.target.innerText = newUsername;
            saveUser(newUsername)
        }
    }

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
    username.addEventListener('blur',blurEvent);
    username.addEventListener('keyup',keyEvent);
    loadName()
}

init();


// todolist
const todoForm = document.querySelector('.todolist-area > .todo-form')
const todoInput = todoForm.querySelector('.todo-input');
const todoList = document.querySelector('.todolist-content > ul');
const localTodo = 'toDos';
const emptyBox = document.querySelector('.todolist-content > .empty-box');


let toDos = [];


// delete 이벤트
function deleteTodo(event){
    const btn = event.target
    const li = btn.parentNode.parentNode.parentNode;

    todoList.removeChild(li);

    const cleanTodos = toDos.filter(item => {
        return item.id !== parseInt(li.id)
    });

    toDos = cleanTodos;

    console.log(toDos);
    console.log(toDos.length);
    console.log('여기는 딜리트');
    const lis = todoList.querySelectorAll('li');

    toDos.forEach((item,index) => {
        console.log(item.id);
        item.id = index + 1;
        lis[index].id = item.id
    })
    if( toDos.length == 0 ) {
        emptyBox.style.display = 'block'
    }

    saveToDos();
}

// check 이벤트
function checkTodo(event){
    // console.log(event.target.parentNode.parentNode);
    const btn = event.target;
    const li = btn.parentNode.parentNode.parentNode;
    const id  = li.id - 1;

    console.log(toDos[id].check);
    console.log(toDos[id]);
    
    // 체크
    if( toDos[id].check !== 'check' ){
        console.log(toDos[id]);
        li.classList.add('checked');
        toDos[id].check = 'check';
    
    // 체크해제
    }else {
        li.classList.remove('checked');
        toDos[id].check = 'none';
    }

    saveToDos();
    
}

let status = true;
let editIndex = null;
let target = null

// edit 이벤트
function editTodo(event) {
    target = event.target.parentNode.parentNode.parentNode;
    editIndex = target.id - 1;
    
    if ( toDos[editIndex].check === 'check' ) return;

    status = false;
    todoInput.value = toDos[editIndex].text;

    
}

function editSubmit(){
    if( !status ) {

        const txtSpan = target.querySelector('.todo-txt');

        toDos[editIndex].text = todoInput.value;
        txtSpan.innerText = todoInput.value;

        todoInput.value = '';

        status = true;
        saveToDos();
    }

    
}



// 투두리스트 배열을 로컬에 저장하는 함수
function saveToDos(){
    localStorage.setItem(localTodo,JSON.stringify(toDos));
}



function paintTodo(text,check){
    const li = document.createElement('li');
    const btnBox = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const deleteBtnIcon = document.createElement('i');
    const editBtn = document.createElement('button');
    const editBtnIcon = document.createElement('i');
    const todoTxtspan = document.createElement('span');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const labelSpan = document.createElement('span');
    const labelIcon = document.createElement('i');
    const newId = toDos.length + 1;

    todoTxtspan.classList.add('todo-txt')

    li.id = newId;

    input.type = 'checkbox';
    input.id = 'complete';
    input.classList.add('checkbox');

    labelIcon.classList.add('fas');
    labelIcon.classList.add('fa-check');
    label.setAttribute('for','complete');

    label.appendChild(labelSpan);
    labelSpan.appendChild(labelIcon);

    // 삭제버튼
    btnBox.classList.add('btn-box');
    deleteBtn.classList.add('delete-btn');
    deleteBtnIcon.classList.add('fas');
    deleteBtnIcon.classList.add('fa-times');

    // 수정버튼
    editBtn.classList.add('edit-btn');
    editBtnIcon.classList.add('fas');
    editBtnIcon.classList.add('fa-pen');
    
    // 클릭이벤트
    deleteBtn.addEventListener('click',deleteTodo);
    labelSpan.addEventListener('click',checkTodo);
    editBtn.addEventListener('click',editTodo)

    btnBox.appendChild(editBtn);
    editBtn.appendChild(editBtnIcon);

    btnBox.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteBtnIcon);

    todoTxtspan.innerHTML = text;
    
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(todoTxtspan);
    li.appendChild(btnBox);

    li.classList.add('list-ani')
    

    todoList.appendChild(li);


    const toDoObj = {
        text : text,
        id : newId,
        check:check
    }

    toDos.push(toDoObj);

    saveToDos()
}

// todolist submit
function listSubmit(ev){
    ev.preventDefault();
    const currentValue = todoInput.value;
    const check = 'none';

    if( status ) {
        console.log('투두리스트 서브밋');
        paintTodo(currentValue,check);
        emptyBox.style.display = 'none'
        todoInput.value = '';
        

    }else return false

}

// 첫 로드시 로컬에서 투두리스트 가져오기
function loadTodos(){
    const loadedTodos = localStorage.getItem(localTodo);

    // 로컬에 없으면 
    if( loadedTodos !== null ){
        const parsedTodos = JSON.parse(loadedTodos); // JSON 변환

        // paint에 넘겨줌
        parsedTodos.forEach(item =>{
            paintTodo(item.text,item.check);
        })
    }
}


const dayNames = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thurs',
    'Fri',
    'Sat'
]

const todoDay = document.querySelector('.todolist-area > .date');

function dateSetting() {
    let today = new Date();
    let date = today.getDate();
    date = date >= 10 ? date : `0${date}`;
    let month = today.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;
    let day = dayNames[today.getDay()];
    const format = `${month}/${date} ${day}`;

    todoDay.innerHTML = format
}

// init
function todoInit(){   
    loadTodos();
    dateSetting();
    console.log(toDos.length);

    // todolist 입력 이벤트
    todoForm.addEventListener('submit',listSubmit);
    todoForm.addEventListener('submit',editSubmit);

    const lis = document.querySelectorAll('li');
    
    //로드시 체크된 항목에 클래스리스트 추가
    toDos.forEach(item=>{
        if(item.check === 'check') {
            lis[item.id - 1].classList.add('checked')
        }
    });

    lis.forEach(elm => {
        elm.classList.remove('list-ani')
    });

    if( toDos.length > 0 ) {
        emptyBox.style.display = 'none'
    }


}



todoInit();