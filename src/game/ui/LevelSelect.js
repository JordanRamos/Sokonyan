/**
 * Class levelSelect
 */
define([
	"jquery",
	"jquery-ui",
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/utils/Config",
	"src/game/server/Account",
	"src/game/game/MapManager"
],
function (
	$,
	ui,
	SpriteManager,
	SoundManager,
	txt,
	Config,
	Account,
	MapManager
) {
	var LevelSelect = function () {

	}


	/**
	 * Affiche le contenu dans popUp
	 */
	LevelSelect.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='LevelSelect' class='popUp'></div>");
		$("#blackScreen").show();

		$("#screenContainer #LevelSelect").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "69.2%")
									  .css("height", "69.45%")
									  .css( "left", "14.96%")
									  .css( "top", "25%");

		$("#LevelSelect").append("<div class='buttonCloseLevelSelect'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#LevelSelect .buttonCloseLevelSelect").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");

		/**
		 * Bouton de fermeture du popUp
		 */
		// Hover
		$( "#LevelSelect .buttonCloseLevelSelect").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#LevelSelect .buttonCloseLevelSelect").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#LevelSelect .buttonCloseLevelSelect").mousedown(function() {
			$("#LevelSelect .buttonCloseLevelSelect").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
										  .css("padding-top", 12);
		});

		$("#LevelSelect .buttonCloseLevelSelect").mouseup(function() {
			$("#LevelSelect .buttonCloseLevelSelect").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
										  .css("padding-top", 8);
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("LevelSelect", true);
		});

		$("#LevelSelect").append("<div id='descTitleLevelSelect'>" + txt.get("LABEL_POPUP_LEVELSELECT_DESCTITLE") + "</div>");

		/**
		 * Bouton de selection de niveau
		 */
		var isUnlocked = false;
		var className = false;
		var starName = null;
		var btnStatic = null;
		var btnsurvol = null;
		var btnPress = null;
		var mouseUpSound = null;
		var score = null;
		var starEffectMin = 1000;
		var starEffectMax = 10000;

		for (var i = 1; i < 16; i++) {
			isUnlocked = Account.progress.level[i - 1].unlocked;
			if (isUnlocked) {
				className = "btnLevel";
				btnStatic = "btnLevelStatic";
				btnSurvol = "btnLevelSurvol";
				btnPress = "btnLevelPress";
				mouseUpSound = "meow14";
			} else {
				className = "btnLock";
				btnStatic = "btnLock";
				btnSurvol = "btnLock";
				btnPress = "btnLock";
				mouseUpSound = "buttonForbidden";
			}

			// Button append
			if (isUnlocked){
				$("#LevelSelect").append("<div id='btnLevel" + i + "' class='btn " + className + "'><span>" + i + "</span></div>");
			} else {
				$("#LevelSelect").append("<div id='btnLevel" + i + "' class='btn " + className + "'></div>");
			}

			$("#btnLevel" + i).hide();
			$("#btnLevel" + i).show("puff");

			$("#btnLevel" + i).css("margin-left", ((i - 1) % 5 * 100) / 1136 * 100 + "%");
			$("#btnLevel" + i).css("margin-top", (Math.floor((i - 1) / 5) * 70) / 640 * 100 + "%");
			$("#btnLevel" + i).css("background-image", "url(" + SpriteManager.get(btnStatic).src + ")");

			// Star append
			if (isUnlocked) {
				score = Account.progress.level[i - 1].score;
				for (var j = 1; j < 3; j++) {
					if (score >= j) {
						starName = "star";
					} else {
						starName = "emptyStar";
					}
					$("#btnLevel" + i).append("<div id='star" + i + j + "' class='star'></div>");
					$("#star" + i + j).css("background-image", "url(" + SpriteManager.get(starName).src + ")")
									  .css("top", "0.78%")
									  .css("left", (j * 17 - 5) / 1136 * 100 + "%");
					var func = (function (i, j, name, func) {
						return function () {
							if (name == "star") {
								$("#star" + i + j).effect("bounce", {distance: 7, times: 3}, "slow");
							}
							setTimeout(func, starEffectMin + Math.random() * (starEffectMax - starEffectMin));
						}
					})(i, j, starName, func);
					func();
				};
			}

			// Hover
			$( "#btnLevel" + i).hover(
			(function(btnSurvol, isUnlocked) {
				return function () {
					$( this ).css("background-image", "url(" + SpriteManager.get(btnSurvol).src + ")");
					$("#btnLevel" + i).css("background-repeat", "no-repeat");
					if (isUnlocked) {
						$(this).effect("bounce", { distance: 5, times: 2 }, "fast");
						SoundManager.play("buttonHover");
					}
				}
			})(btnSurvol, isUnlocked),
			(function(btnStatic) {
				return function () {
					$( this ).css("background-image", "url(" + SpriteManager.get(btnStatic).src + ")");
				}
			})(btnStatic));

			// Active
			$( "#btnLevel" + i).mousedown((function(id, btnPress, isUnlocked) {
				return function () {
					$(this).css("background-image", "url(" + SpriteManager.get(btnPress).src + ")")
					if (isUnlocked) {
						$(this).css("padding-top", 5);
					}
				 	$("#star" + id + 1).css("top", "1.56%")
				 	$("#star" + id + 2).css("top", "1.56%")
				}
			})(i, btnPress, isUnlocked));

			$("#btnLevel" + i).mouseup((function(id, btnStatic, mouseUpSound) {
				return function () {
					$(this).css("background-image", "url(" + SpriteManager.get(btnStatic).src + ")")
							.css("padding-top", 0);
					$("#star" + id + 1).css("top", "0.78%")
					$("#star" + id + 2).css("top", "0.78%")

					if (btnStatic != "btnLock") {
						$("#blackScreen").hide();
						UIManager.closeScreen("Menu", true);
						UIManager.closeScreen("LevelSelect", false);
						UIManager.addScreen("GameStage", true);
						MapManager.loadMap("level" + id);
					}
					SoundManager.play(mouseUpSound);
				}
			})(i, btnStatic, mouseUpSound));
		};

	}

	
	return new LevelSelect();
});