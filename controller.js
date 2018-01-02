var ChatApp = angular.module('ChatApp', []);

ChatApp.controller('ChatController', function($scope){
	//console.log("working");
	var socket = io();

	$scope.messages = [{'text':'Welcome to Live Chat', 'name':'Bot'},
						{'text':'Live Chat is Ready!', 'name':'Bot'}];
	$scope.name = '';
	$scope.text = '';
	$scope.numofusers = 0;
	
	socket.on('connect', function(){
		//console.log('connected');
	});
	
	$scope.setName = function setName(){
		socket.emit('identify', $scope.name);
	};
	
	$scope.send = function send(){
		//console.log($scope.text);
		socket.emit('sendmessage', $scope.text);
		$scope.text = '';
	};
	
	socket.on('message', function(msg){
		$scope.messages.push(msg);
		$scope.$apply();
		var elem = document.getElementById('msgpane');
		elem.scrollTop = elem.scrollHeight;
	});
	
	socket.on('broadcastmessage', function(message){
		$scope.messages.push({text: message, name: "Bot"});
	});
	
	socket.on('get users', function(users){
		$scope.numofusers = users;
	});

});
