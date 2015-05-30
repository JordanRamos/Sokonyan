/**
 * popUp du bon mot de passe.
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
	var GoodPassword = function () {

	}


	/**
	 * Affiche le contenu dans gameContainer
	 */
	GoodPassword.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='GoodPassword' class='popUp'></div>");
		$("#blackScreen").show();

		$("#GoodPassword").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "44%")
									  .css("height", "49.87%")
									  .css( "left", "26.4%")
									  .css( "top", "28.68%");

		$("#GoodPassword").append("<div class='buttonCloseGoodPassword'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#GoodPassword .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");

		// Hover
		$( "#GoodPassword .buttonCloseGoodPassword").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#GoodPassword .buttonCloseGoodPassword").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#GoodPassword .buttonCloseGoodPassword").mousedown(function() {
			$("#GoodPassword .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
											.css("padding-top", "12");
		});

		$("#GoodPassword .buttonCloseGoodPassword").mouseup(function() {
			$("#GoodPassword .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
											.css("padding-top", "3");
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("GoodPassword", true);
			UIManager.closeScreen("Login", true);
			UIManager.addScreen("Menu", true);
		});

		$("#GoodPassword").append("<div class='GoodPasswordText GoodPasswordTitle'>" + txt.get("LABEL_POPUP_GOODPASSWORD_TITLE").replace("%name%", Account.name) + "</div>");
		$("#GoodPassword").append("<div class='GoodPasswordText GoodPasswordDesc'>" + txt.get("LABEL_POPUP_GOODPASSWORD_DESC") + "</div>");

		$("#GoodPasswordText .Title").css("font-size", "0.4em")
	}
	return new GoodPassword();
});