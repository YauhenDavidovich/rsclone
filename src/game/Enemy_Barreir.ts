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


        // get a CursorKeys instance


    }



}