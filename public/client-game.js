var socket = io.connect("http://localhost:4000");

var deck = [];

function setName(){
	var playerName = document.getElementById("playerName").value;
	if(playerName!="Enter Name..." && playerName!=""){
		console.log(playerName);
		socket.emit('name',{
			name: playerName
		});
		document.getElementById("setName").style.display = "none";
		document.getElementById("gameRoom").style.display = "block";
	}
}

function startGame(){
	socket.emit('start',{
		status: true
	});
}

socket.on('listPlayers',function(data){
	var output = "";
	for(var i = 0; i<data.names.length;i++){
		output+= "<li>"+data.names[i]+"</li>";
	}
	document.getElementById("gamePlayers").innerHTML = output;
});

socket.on('startHand',function(data){
	document.getElementById("gameRoom").style.display = "none";
	console.log(data);
	deck = data;
	for(var i = 0; i<deck.length;i++){

 		var value = deck[i].value;
 		var suit = deck[i].suit;
 		var suitString = "";
		const suitsMap = ["heart", "spade", "club", "diamond"]; // arrays are kinda like hashmaps with numbers as keys
 		suitString = suitsMap[suit];
 		if(value == 11){
 			value = "J"
 		}
 		else if(value == 12){
 			value = "Q"
 		}
 		else if(value == 13){
 			value = "K" 
 		}
 		else if(value == 1){
 			value = "A"
 		}
 		output = `<div class='card' onclick='alertCard(this)'><div class='value'>${value}</div><div class='suit ${suitString}'></div><div class='rotatedValue'>${value}</div></div>`;

 		document.getElementById("gameTable").innerHTML += output;
	}
});

function alertCard(e){
	console.log(e);
	var value = e.getElementsByClassName('value')[0].textContent;
	var suitName = e.getElementsByClassName('suit')[0].classList[1];
	console.log(value);
	var suit;
	if(suitName == "heart"){
 		suit = 0;
	}
	else if(suitName == "spade"){
		suit = 1;
	}
	else if(suitName == "club"){
		suit = 2;
	}
	else{
		suit = 3;
	}
	console.log(suit);

	alert("Are you sure you wanted to play the: "+value+" of "+ suitName);
}