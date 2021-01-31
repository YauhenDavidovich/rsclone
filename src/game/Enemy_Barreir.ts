import Phaser from "phaser";
import TextureKeys from "~/consts/TextureKeys";
import AnimationKeys from "~/consts/AnimationKeys";

export default class EnemyBarreir extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        const enemyBarreir = scene.add.sprite(0, 600, TextureKeys.EnemyBarrerier)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.EnemyBarreirAnimation)

        this.add(enemyBarreir)

        //making it dangerous
        scene.physics.add.existing(this, true)
        const body = this.body as Phaser.Physics.Arcade.StaticBody
        const width = enemyBarreir.displayWidth
        const height = enemyBarreir.displayHeight

         body.setSize(width - 30, height-70)
        body.setOffset(-width * 0.5, -height )


         // reposition body
          body.position.x = this.x + body.offset.x
          body.position.y = 450
    }
}