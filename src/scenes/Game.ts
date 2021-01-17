import Phaser from 'phaser'
import SceneKeys from "~/consts/SceneKeys";
import AnimationKeys from "~/consts/AnimationKeys";
import TextureKeys from "~/consts/TextureKeys";
import Hero from "~/game/Hero";

export default class Game extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Game)
    }

    private backgroundRoad!: Phaser.GameObjects.TileSprite



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


        const hero = new Hero(this, width * 0.5, height - 30)
         this.add.existing(hero)



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


update(t: number, dt: number) {
        this.backgroundRoad.setTilePosition(this.cameras.main.scrollX)



}
}