/**
 * Class HighScore
 */
define([
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/game/server/Account"
],
function (
	SpriteManager,
	SoundManager,
	txt,
	Account
) {
	var HighScore = function () {

	}


	/**
	 * Affiche le contenu dans popUp
	 */
	HighScore.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='HighScore' class='popUp'></div>");
		$("#blackScreen").show();

		$("#screenContainer #HighScore").css("background-image", "url(" + SpriteManager.get("popUpVertical").src + ")")
									  .css("width", "69.2%")
									  .css("height", "93.8%")
									  .css( "left", "15%")
									  .css( "top", "3.1%" );

		$("#HighScore").append("<div class='buttonCloseHighScore'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$(".buttonCloseHighScore").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
								  .css("top","83.78%");

		// Hover
		$(".buttonCloseHighScore").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$(".buttonCloseHighScore").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$(".buttonCloseHighScore").mousedown(function() {
		$(".buttonCloseHighScore").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
			                      .css("padding-top", 12);
		});

		$(".buttonCloseHighScore").mouseup(function() {
			$(".buttonCloseHighScore").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
									  .css("padding-top", 8);
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("HighScore", true);
		});

		//Title
		$("#screenContainer #HighScore").append("<div class='highScoreTitle'>" + txt.get("LABEL_POPUP_HIGHSCORE_TITLE") + "</div>");

		var highScoreList = Account.highScore;
		var playerScoreList = Account.playerScore;

		var playerScore;
		var playerRank;
		
		var name;
		var score;

		for (var i = 0; i < 10; i++) {
			if (typeof highScoreList[i] != "undefined") {
				name = highScoreList[i]["playerName"];
				score = highScoreList[i]["score"];
			} else {
				name = "Aucun";
				score = "/";
			}
			$("#screenContainer #HighScore").append("<div class='nameAndScore' id='number" + i + "'" + ">" + (i + 1) + ". " + name + " : " + score + "</div>");
			var topOffset = (100 + 30 * i) / 640 * 100;
			$("#number" + i).css("top", topOffset + "%");
		};

		for (var i = 0; i < playerScoreList.length; i++) {
			if (playerScoreList[i]["playerName"] == Account.name) {
				playerScore = playerScoreList[i]["score"];
				playerRank = i;
			}
		};

		var myScoreText = (playerRank + 1) + txt.get("LABEL_YOUR_SCORE") + playerScore;
		if (typeof playerScore == "undefined") myScoreText =  txt.get("LABEL_POPUP_HIGHSCORE_NORANK");

		$("#screenContainer #HighScore").append("<div id='yourHighScore'>" + myScoreText + "</div>");
	}
	return new HighScore();
});