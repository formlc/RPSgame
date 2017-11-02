$(document).ready(function () {

	var config = {
    apiKey: "AIzaSyBDseIE1YiR1AIB9hkhde2aTUB-BaMbqSE",
    authDomain: "rpsgame-da86f.firebaseapp.com",
    databaseURL: "https://rpsgame-da86f.firebaseio.com",
    projectId: "rpsgame-da86f",
    storageBucket: "rpsgame-da86f.appspot.com",
    messagingSenderId: "824141929614"
  	};

  	firebase.initializeApp(config);

  	var database = firebase.database();


	var leftPlayer = 0;
	var rightPlayer = 0;
	var winner = "";

	reset();

	$(".game-btn").on("click", function() {
		leftPlayer = $(this).val();
		database.ref().set({
			leftPlayer: leftPlayer,
			rightPlayer: rightPlayer
		 });
	});

	function reset() {
		leftPlayer = 0;
		rightPlayer = 0;
		database.ref().set( {
			leftPlayer: leftPlayer,
			rightPlayer: rightPlayer
		})
	}

	$(".game-btn1").on("click", function() {
		rightPlayer = $(this).val();
		database.ref().set({
			rightPlayer: rightPlayer,
			leftPlayer: leftPlayer
		});
	});



	database.ref().on("value", function(snapshot) {

		rightPlayer = parseInt(snapshot.val().rightPlayer);
		leftPlayer = parseInt(snapshot.val().leftPlayer);

		console.log("rightPlayer " + rightPlayer);
		console.log("leftPlayer " + leftPlayer);

		if (leftPlayer > 0 && rightPlayer > 0) {

			if (leftPlayer === rightPlayer) {
				winner = "TIE!"
			}

			if (leftPlayer === 1) {
				if (rightPlayer === 3) {
					winner = "Player 1";
				}
				if (rightPlayer === 2) {
					winner = "Player 2";
				}
			}

			if (leftPlayer === 2) {
				if (rightPlayer === 3) {
					winner = "Player 2";
				}
				if (rightPlayer === 1) {
					winner = "Player 1";
				}
			}

			if (leftPlayer === 3) {
				if (rightPlayer === 2) {
					winner = "Player 1";
				}
				if (rightPlayer === 1) {
					winner = "Player 2";
				}
			}

			console.log(winner);
			$("#results").text(winner)
		}
	});
});