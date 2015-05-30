/**
 * popUp compte bien créée
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
	var AccountCreated = function () {

	}


	/**
	 * Affiche le contenu dans gameContainer
	 */
	AccountCreated.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='AccountCreated' class='popUp'></div>");
		$("#blackScreen").show();

		$("#AccountCreated").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "44%")
									  .css("height", "49.87%")
									  .css( "left", "26.4%")
									  .css( "top", "28.68%");

		$("#AccountCreated").append("<div class='buttonCloseGoodPassword'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#AccountCreated .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
										.css("background-repeat", "no-repeat")
										.css("width", "24.13%")
									  	.css("height", "14.5%")
									  	.css("background-size", "100% 100%")
										.css("left", "37.64%")
										.css("top", "75.56%")
										.css("font-size", "0.7em")
										.css("padding-top", "3");

		// Hover
		$( "#AccountCreated .buttonCloseGoodPassword").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#AccountCreated .buttonCloseGoodPassword").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#AccountCreated .buttonCloseGoodPassword").mousedown(function() {
			$("#AccountCreated .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
											.css("padding-top", "12");
		});

		$("#AccountCreated .buttonCloseGoodPassword").mouseup(function() {
			$("#AccountCreated .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
											.css("padding-top", "3");
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("AccountCreated", true);
			UIManager.closeScreen("Login", true);
			UIManager.addScreen("Menu", true);
		});

		$("#AccountCreated").append("<div class='AccountCreatedText AccountCreatedTitle'>" + txt.get("LABEL_POPUP_ACCOUNTCREATED_TITLE").replace("%name%", Account.name) + "</div>");
		$("#AccountCreated").append("<div class='AccountCreatedText AccountCreatedDesc'>" + txt.get("LABEL_POPUP_ACCOUNTCREATED_DESC") + "</div>");

		$("#AccountCreatedText .Title").css("font-size", "0.4em")
	}
	return new AccountCreated();
});