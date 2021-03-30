import Phaser from "phaser";
import TextureKeys from "~/consts/TextureKeys";
import AnimationKeys from "~/consts/AnimationKeys";

export default class EnemyDron extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        const enemyDron = scene.add.sprite(0, 200, TextureKeys.EnemyDron)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.EnemyDronAnimation)

        this.add(enemyDron)

        //making it dangerous
        scene.physics.add.existing(this, true)
        const body = this.body as Phaser.Physics.Arcade.StaticBody
        const width = enemyDron.displayWidth
        const height = enemyDron.displayHeight

        body.setSize(width - 20, height -40)
        body.setOffset(-width * 0.4, -height + 20  )


        // reposition body
        body.position.x = this.x + body.offset.x
        body.position.y = this.y+100
    }
}