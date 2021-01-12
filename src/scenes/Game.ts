import Phaser from 'phaser'
import SceneKeys from "~/consts/SceneKeys";
import AnimationKeys from "~/consts/AnimationKeys";

export default class Game extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Game)
    }

    create() {

        // store the width and height of the game screen
        const width = this.scale.width
        const height = this.scale.height

        this.add.image(0, height,  'background').setOrigin(0, 1)
            .setScrollFactor(0.5)
        this.add.sprite(width * 0.5, height * 0.5, 'hero', 'run_1.png').play(AnimationKeys.RunningManRun)
            .setScrollFactor(0.5)
        this.cameras.main.setBounds(0, 0, width * 3, height)

    }

}