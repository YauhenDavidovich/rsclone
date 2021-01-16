import Phaser from 'phaser'
import SceneKeys from "~/consts/SceneKeys";
import AnimationKeys from "~/consts/AnimationKeys";
import TextureKeys from "~/consts/TextureKeys";

export default class Game extends Phaser.Scene {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    constructor() {
        super(SceneKeys.Game)
        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    private backgroundRoad!: Phaser.GameObjects.TileSprite
    private backgroundGrass!: Phaser.GameObjects.TileSprite



    create() {

        // store the width and height of the game screen
        const width = this.scale.width
        const height = this.scale.height

        this.add.image(0, 0,  TextureKeys.MainBackground).setOrigin(0)
            .setScrollFactor(0)
        this.add.image(0, 70,  TextureKeys.GrassBackground).setOrigin(0)
            .setScrollFactor(0.12)





        this.backgroundRoad = this.add.tileSprite(
            0, 403,
            width, 237,
            TextureKeys.RoadBackground
        )
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)






        const hero = this.physics.add.sprite(width * 0.5, height -50, 'hero', 'run_1.png').play(AnimationKeys.RunningManRun)

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

 //    preUpdate()
 //     {
 //     const body = this.hero as Phaser.Physics.Arcade.Body
 //
 //    // check is Space bar is down
 //     if (this.cursors.space?.isDown)
 //     {
 //     // set y acceleration to -600 if so
 //     body.setAccelerationY(-600)
 //
 //     }
 // else
 // {
 //     // turn off acceleration otherwise
 //     body.setAccelerationY(0)
 //
 //     }
 // }


update() {
        this.backgroundRoad.setTilePosition(this.cameras.main.scrollX)


    }
}