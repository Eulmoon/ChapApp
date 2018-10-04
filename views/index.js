var socket = io();
socket.on("chat", addChat);

$(() => {
	$('#send').click(() => {
		var chatMessage = {
			name: $('#txtName').val(),
			chat: $('#txtMessage').val()
		}
		postChat(chatMessage);
	});
});

function postChat(chat){
	$.post("http://localhost:8080/chats", chat);
};

function getChats(){
	$.get('/chats', (chats) =>{
		chats.forEach(addchat)
	})
}

function addChat(chatObj){
	$("#messages").append(`<h5 style="display: inline">${chatObj.name}</h5>: <p style="display: inline">${chatObj.chat}</p>`);
}