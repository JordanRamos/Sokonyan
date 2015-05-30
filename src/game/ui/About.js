/**
 * Class About
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
	var About = function () {

	}


	/**
	 * Affiche le contenu dans popUp
	 */
	About.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='About' class='popUp'></div>");
		$("#blackScreen").show();

		$("#screenContainer #About").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "78%")
									  .css("height", "69.45%")
									  .css("left", "11.96%")
									  .css("top", "25%");

		$("#About").append("<div class='buttonCloseAbout'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#About .buttonCloseAbout").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");

		// Hover
		$( "#About .buttonCloseAbout").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#About .buttonCloseAbout").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#About .buttonCloseAbout").mousedown(function() {
			$("#About .buttonCloseAbout").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")");
			$("#About .buttonCloseAbout").css("padding-top", 12);
		});

		$("#About .buttonCloseAbout").mouseup(function() {
			$("#About .buttonCloseAbout").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
			$("#About .buttonCloseAbout").css("padding-top", 8);
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("About", true);
		});

		$("#screenContainer #About").append("<div class='aboutText title'>" + txt.get("LABEL_POPUP_ABOUT_TITLE") + "</div>");
		$("#screenContainer #About").append("<div class='aboutText desc'>" + txt.get("LABEL_POPUP_ABOUT_DESC") + "</div>");
	}
	return new About();
});