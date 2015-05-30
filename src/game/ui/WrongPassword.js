/**
 * popUp de mauvais mot de passe ou d'identifiant déjà existant
 */
define([
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt"
],
function (
	SpriteManager,
	SoundManager,
	txt
) {
	var WrongPassword = function () {

	}


	/**
	 * Affiche le contenu dans gameContainer
	 */
	WrongPassword.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='WrongPassword' class='popUp'></div>");
		$("#blackScreen").show();

		$("#WrongPassword").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "44%")
									  .css("height", "49.87%")
									  .css( "left", "26.4%")
									  .css( "top", "28.68%");

		$("#WrongPassword").append("<div class='buttonCloseWrongPassword'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#WrongPassword .buttonCloseWrongPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");

		// Hover
		$( "#WrongPassword .buttonCloseWrongPassword").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#WrongPassword .buttonCloseWrongPassword").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#WrongPassword .buttonCloseWrongPassword").mousedown(function() {
			$("#WrongPassword .buttonCloseWrongPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
											.css("padding-top", "12");
		});

		$("#WrongPassword .buttonCloseWrongPassword").mouseup(function() {
			$("#WrongPassword .buttonCloseWrongPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
											.css("padding-top", "3");
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("WrongPassword", true);
		});

		$("#WrongPassword").append("<div class='wrongPasswordText wrongPasswordTitle'>" + txt.get("LABEL_POPUP_WRONGPASSWORD_TITLE") + "</div>");
		$("#WrongPassword").append("<div class='wrongPasswordText wrongPasswordDesc'>" + txt.get("LABEL_POPUP_WRONGPASSWORD_DESC") + "</div>");

		$("#wrongPasswordText .Title").css("font-size", "0.4em")
	}

	
	return new WrongPassword();
});