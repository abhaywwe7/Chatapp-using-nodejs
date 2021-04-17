const socket = io()

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('/tone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}



const namee = prompt("Enter your name to join");
console.log(namee);
socket.emit('new-user-joined');

socket.on('user-joined', namee => {
    append(`${namee} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.namee}: ${data.message}`, 'left')
})

socket.on('left', namee => {
    append(`${namee} left the chat`, 'right')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`${namee}: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
