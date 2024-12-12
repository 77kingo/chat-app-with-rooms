const socket = io();

const roomInput = document.getElementById('room');
const joinRoomButton = document.getElementById('joinRoom');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messagesDiv = document.getElementById('messages');
const chatDiv = document.getElementById('chat');
const roomSelectionDiv = document.getElementById('room-selection');

let currentRoom = '';

joinRoomButton.addEventListener('click', () => {
    currentRoom = roomInput.value;
    if (currentRoom) {
        socket.emit('joinRoom', currentRoom);
        roomSelectionDiv.classList.add('animated', 'slideOutUp');
        setTimeout(() => {
            roomSelectionDiv.style.display = 'none';
            chatDiv.style.display = 'block';
            chatDiv.classList.add('animated', 'slideInUp');
        }, 500);
    }
});

sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message && currentRoom) {
        socket.emit('chatMessage', { room: currentRoom, message });
        messageInput.value = '';
    }
});

socket.on('message', (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add('animated', 'bounceIn');
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
