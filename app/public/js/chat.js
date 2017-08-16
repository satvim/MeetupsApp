/**
 * Created by Sathish on 16/08/17.
 */
var socket = io();
var chatUserName = document.querySelector('#chat-username');
var chatMessage = document.querySelector('#chat-message');

socket.on('connect',function() {
    var chatForm = document.forms.chatForm;

    if (chatForm) {
        chatForm.addEventListener('submit',function (e) {
            e.preventDefault();

            socket.emit ('postMessage', {
                userName: chatUserName.value,
                message: chatMessage.value
            });
            chatMessage.value = '';
            chatMessage.focus();
        });

        socket.on('updateMessages', function (data) {
            submitMessage(data);
        })
    }
});


function submitMessage(data) {
    var chatDisplay = document.querySelector('.chat-display');
    var newMessage = document.createElement('p');
    if (chatUserName.value == data.userName) {
        newMessage.className = 'bg-success chat-text';
    } else {
        newMessage.className = 'bg-info text-warning chat-text';
    }

    newMessage.innerHTML = '<strong>' + data.userName + '</strong>: ' + data.message;
    chatDisplay.insertBefore(newMessage,chatDisplay.firstChild);
}