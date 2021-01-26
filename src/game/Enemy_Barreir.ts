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


         body.setSize(enemyBarreir.width, enemyBarreir.height, true)
         body.setOffset(enemyBarreir.width * -0.5, enemyBarreir.height * -0.5)

        // reposition body
         body.position.x = this.x + body.offset.x
         body.position.y = this.y





    }



}