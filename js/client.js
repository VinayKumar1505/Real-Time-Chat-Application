
const socket= io('http://localhost:8000');
const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer= document.querySelector(".container")

//audio
var audio= new Audio('ting.mp3');

//appending newly message to container
const append= (message, position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position== 'left'){
        audio.play();
    }
}

//sending message to the server if form gets submitted
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value= ''
})

//asking user their name
const userName= prompt("enter your name to join");
 socket.emit('New-user-joined', userName);

//acknowleding averyone if someone joins
 socket.on('user-joined', name=> {
    append(`${name} joined the chat`, 'right');
 })

 //receiving others messages
 socket.on('receive', data=> {
    append(`${data.name}: ${data.message} `, 'left');
 })
 
 //if someone leaves the chat
 socket.on('left', name=> {
    append(`${data.name} left the chat `, 'right');
 })