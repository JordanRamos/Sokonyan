/*
 * Configuration du serveur
 */
define([
	"src/utils/Config"
],
function (
	Config
) {
	var ServerConfig = function () {
		this.localhost = 'http://localhost/sokoban/';
		this.webhost = 'http://sokonyan.delfisakura.com/src/game/server/php/';
		this.host = Config.local ? this.localhost : this.webhost;
	}


	return new ServerConfig();
});