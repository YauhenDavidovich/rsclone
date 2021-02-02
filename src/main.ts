import Phaser from 'phaser'
import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameOver from "~/scenes/GameOver";
import PreloadScreen from "~/scenes/PreloadScreen";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser-example',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 640
	},


	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 330 },
			// debug: true
		}
	},

	scene: [PreloadScreen, Preloader, Game, GameOver, ]
}

export default new Phaser.Game(config)
