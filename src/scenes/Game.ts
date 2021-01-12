import Phaser from 'phaser'
import SceneKeys from "~/consts/SceneKeys";
import AnimationKeys from "~/consts/AnimationKeys";
import TextureKeys from "~/consts/TextureKeys";

export default class Game extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Game)
    }

    private background!: Phaser.GameObjects.TileSprite


    create() {

        // store the width and height of the game screen
        const width = this.scale.width
        const height = this.scale.height

        this.background = this.add.tileSprite(
            0, 0,
            width, height,
            TextureKeys.Background
        )
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)





        const hero = this.physics.add.sprite(width * 0.5, height * 0.5, 'hero', 'run_1.png').play(AnimationKeys.RunningManRun)

        const body = hero.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)
        // set the x velocity to 200
        body.setVelocityX(200)

        this.physics.world.setBounds(
            0, 0, // x, y
            Number.MAX_SAFE_INTEGER, height - 30 // width, height
        )

        this.cameras.main.startFollow(hero)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

    }
    update(t: number dt: number)
     {
         this.background.setTilePosition(this.cameras.main.scrollX)
     }
}