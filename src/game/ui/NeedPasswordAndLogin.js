/**
 * popUp "les champs login & mot de passe sont obligatoires"
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
	var NeedPasswordAndLogin = function () {

	}


	/**
	 * Affiche le contenu dans gameContainer
	 */
	NeedPasswordAndLogin.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='NeedPasswordAndLogin' class='popUp'></div>");
		$("#blackScreen").show();

		$("#NeedPasswordAndLogin").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "44%")
									  .css("height", "49.87%")
									  .css( "left", "26.4%")
									  .css( "top", "28.68%");

		$("#NeedPasswordAndLogin").append("<div class='buttonCloseGoodPassword'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#NeedPasswordAndLogin .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
										.css("background-repeat", "no-repeat")
										.css("width", "24.13%")
									  	.css("height", "14.5%")
									  	.css("background-size", "100% 100%")
										.css("left", "37.64%")
										.css("top", "75.56%")
										.css("font-size", "0.7em")
										.css("padding-top", "3");

		// Hover
		$( "#NeedPasswordAndLogin .buttonCloseGoodPassword").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#NeedPasswordAndLogin .buttonCloseGoodPassword").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#NeedPasswordAndLogin .buttonCloseGoodPassword").mousedown(function() {
			$("#NeedPasswordAndLogin .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
											.css("padding-top", "12");
		});

		$("#NeedPasswordAndLogin .buttonCloseGoodPassword").mouseup(function() {
			$("#NeedPasswordAndLogin .buttonCloseGoodPassword").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
											.css("padding-top", "3");
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("NeedPasswordAndLogin", true);
		});

		$("#NeedPasswordAndLogin").append("<div class='NeedPasswordAndLoginText NeedPasswordAndLoginTitle'>" + txt.get("LABEL_POPUP_NEEDPASSWORDANDLOGIN_TITLE") + "</div>");
		$("#NeedPasswordAndLogin").append("<div class='NeedPasswordAndLoginText NeedPasswordAndLoginDesc'>" + txt.get("LABEL_POPUP_NEEDPASSWORDANDLOGIN_DESC") + "</div>");

		$("#NeedPasswordAndLoginText .Title").css("font-size", "0.4em")
	}
	return new NeedPasswordAndLogin();
});