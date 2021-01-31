import Phaser from "phaser";
import TextureKeys from "~/consts/TextureKeys";
import AnimationKeys from "~/consts/AnimationKeys";

export default class EnemyPredator extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        const enemyPredator = scene.add.sprite(0, 600, TextureKeys.EnemyPredator)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.EnemyPredatorAnimation)

        this.add(enemyPredator)

        //making it dangerous
        scene.physics.add.existing(this, true)
        const body = this.body as Phaser.Physics.Arcade.StaticBody
        const width = enemyPredator.displayWidth
        const height = enemyPredator.displayHeight

        body.setSize(width, height)
        body.setOffset(-width * 0.5, -height )


        // reposition body
        body.position.x = this.x + body.offset.x
        body.position.y = 330
    }
}