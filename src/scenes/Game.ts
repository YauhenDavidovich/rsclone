import Phaser from 'phaser'
import SceneKeys from "~/consts/SceneKeys";
import AnimationKeys from "~/consts/AnimationKeys";
import EnemyBarreir from '../game/Enemy_Barreir'
import EnemyPredator from '../game/Predator'
import TextureKeys from "~/consts/TextureKeys";
import Hero from "~/game/Hero";
import EnemyDron from "~/game/Dron";


export default class Game extends Phaser.Scene {


    private backgroundRoad!: Phaser.GameObjects.TileSprite
    private enemyBarreir!: EnemyBarreir
    private enemyPredator!: EnemyPredator
    private dron!: EnemyDron;


    constructor() {
        super(SceneKeys.Game)
    }

    private wrapEnemyBarreir() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        // body variable with specific physics body type
        const body = this.enemyBarreir.body as
            Phaser.Physics.Arcade.StaticBody

        // use the body's width
        const width = body.width
        if (this.enemyBarreir.x + width < scrollX) {
            this.enemyBarreir.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 1000
            )

            // set the physics body's position
            // add body.offset.x to account for x offset
            body.position.x = this.enemyBarreir.x + body.offset.x
            body.position.y = 450
        }
    }

    private wrapDron()
    {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        const body = this.dron.body as Phaser.Physics.Arcade.StaticBody

        const width = body.width
        if (this.dron.x + width < scrollX)
        {
            this.dron.x = Phaser.Math.Between(rightEdge + width, rightEdge + width + 1000)
            this.dron.y = Phaser.Math.Between(30, 100)

            body.position.x = this.dron.x + body.offset.x
            body.position.y = this.dron.y + 100
        }
    }

    create() {

        // store the width and height of the game screen
        const width = this.scale.width
        const height = this.scale.height


        this.add.image(0, 0, TextureKeys.MainBackground).setOrigin(0)
            .setScrollFactor(0)
        this.add.image(600, 110, TextureKeys.NewBorBackground).setOrigin(0)
            .setScrollFactor(0.32)
        this.add.image(1300, 110, TextureKeys.UrucheiBackground).setOrigin(0)
            .setScrollFactor(0.32)
        this.add.image(3000, 110, TextureKeys.UrucheiBackground).setOrigin(0)
            .setScrollFactor(0.32)


        this.backgroundRoad = this.add.tileSprite(
            0, 403,
            width, 237,
            TextureKeys.RoadBackground
        )
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)

        this.enemyBarreir = new EnemyBarreir(this, 900, 30)
        this.add.existing(this.enemyBarreir)


        this.dron = new EnemyDron(this, 1200, 30)
        this.add.existing(this.dron)


        this.enemyPredator = new EnemyPredator(this, 1900, 30)
        this.add.existing(this.enemyPredator)


        const hero = new Hero(this, width * 0.5, height-30)
        this.add.existing(hero)


        const body = hero.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)
        // set the x velocity to 200
        body.setVelocityX(200)

        this.physics.world.setBounds(
            0, 0, // x, y
            Number.MAX_SAFE_INTEGER, height - 90 // width, height
        )

        this.cameras.main.startFollow(hero)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)


        this.physics.add.overlap(
            this.enemyPredator,
            hero,
            this.handleOverlapBarrreir,
            undefined,
            this
        )

        this.physics.add.overlap(
            this.enemyBarreir,
            hero,
            this.handleOverlapBarrreir,
            undefined,
            this
        )


    }

    private handleOverlapBarrreir(
        obj1: Phaser.GameObjects.GameObject,
        obj2: Phaser.GameObjects.GameObject,
    ) {
        const hero = obj2 as Hero

        hero.kill()
    }


    update(t: number, dt: number) {
        this.backgroundRoad.setTilePosition(this.cameras.main.scrollX)
        // this.wrapEnemyBarreir()
        // this.wrapEnemyPredator()
        this.wrapEnemyBarreir()
        // this.wrapEnemy()
        this.wrapDron()


    }
}