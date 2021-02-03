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
    private prizes!: Phaser.Physics.Arcade.StaticGroup;
    private scoreLabel!: Phaser.GameObjects.Text
    private score = 0
    private mainAudio!: Phaser.Sound.BaseSound;
    private jumpAudio!: Phaser.Sound.BaseSound;
    private collectAudio!: Phaser.Sound.BaseSound;
    private fallAudio!: Phaser.Sound.BaseSound;


    init() {
        this.score = 0
    }


    constructor() {
        super(SceneKeys.Game)
    }


    private wrapEnemies() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        // body variable with specific physics body type
        const bodyP = this.enemyPredator.body as
            Phaser.Physics.Arcade.StaticBody

        const bodyE = this.enemyBarreir.body as
            Phaser.Physics.Arcade.StaticBody

        // use the body's width
        const widthP = bodyP.width

        if (this.enemyPredator.x + widthP < scrollX) {
            this.enemyPredator.x = Phaser.Math.Between(
                rightEdge + widthP + 2000,
                rightEdge + widthP + 3500
            )
            this.enemyBarreir.x = Phaser.Math.Between(
                rightEdge + widthP + 500,
                rightEdge + widthP + 1500
            )

            // set the physics body's position
            // add body.offset.x to account for x offset
            bodyP.position.x = this.enemyPredator.x + bodyP.offset.x
            bodyP.position.y = 470

            bodyE.position.x = this.enemyBarreir.x + bodyE.offset.x
            bodyE.position.y = 470
        }
    }


    private wrapDron() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        const body = this.dron.body as Phaser.Physics.Arcade.StaticBody

        const width = body.width
        if (this.dron.x + width < scrollX) {
            this.dron.x = Phaser.Math.Between(rightEdge + width, rightEdge + width + 1500)
            this.dron.y = Phaser.Math.Between(100, 300)

            body.position.x = this.dron.x + body.offset.x
            body.position.y = this.dron.y + 100
        }
    }


    private spawnPrizes() {
        // code to spawn prizes
        this.prizes.children.each(child => {
            const prize = child as Phaser.Physics.Arcade.Sprite
            this.prizes.killAndHide(prize)
            prize.body.enable = false
        })

        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        let x = rightEdge + 100

        const numPrizes = Phaser.Math.Between(1, 40)

        for (let i = 0; i < numPrizes; ++i) {
            const prize = this.prizes.get(x, Phaser.Math.Between(100, this.scale.height - 300), TextureKeys.Prize) as Phaser.Physics.Arcade.Sprite
            prize.play(AnimationKeys.PrizeAnimation)

            prize.setVisible(true)

            prize.setActive(true)

            const body = prize.body as Phaser.Physics.Arcade.StaticBody
            body.setCircle(body.width * 0.5)
            body.enable = true

            body.updateFromGameObject()

            x += prize.width * 1.5 + 1500
        }

    }


    create() {

        // store the width and height of the game screen
        const width = this.scale.width
        const height = this.scale.height


        this.add.image(0, 0, TextureKeys.MainBackground).setOrigin(0)
            .setScrollFactor(0)
        this.add.image(0, 110, TextureKeys.NewBorBackground).setOrigin(0)
            .setScrollFactor(0.25)
        this.add.image(674, 110, TextureKeys.UrucheiBackground).setOrigin(0)
            .setScrollFactor(0.25)
        this.add.image(1685, 110, TextureKeys.BorisovskiBackground).setOrigin(0)
            .setScrollFactor(0.25)
        this.add.image(2285, 110, TextureKeys.DanaBackground).setOrigin(0)
            .setScrollFactor(0.25)


        this.backgroundRoad = this.add.tileSprite(
            0, 403,
            width, 237,
            TextureKeys.RoadBackground
        )
            .setOrigin(0, 0)
            .setScrollFactor(0, 0)

        this.enemyBarreir = new EnemyBarreir(this, 900, 30)
        this.add.existing(this.enemyBarreir)


        this.dron = new EnemyDron(this, 1400, 30)
        this.add.existing(this.dron)


        this.enemyPredator = new EnemyPredator(this, 2000, 30)
        this.add.existing(this.enemyPredator)


        this.prizes = this.physics.add.staticGroup()
        this.spawnPrizes()


        const hero = new Hero(this, width * 0.5 - 200, height - 30)
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
            this.dron,
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

        this.physics.add.overlap(
            this.prizes,
            hero,
            this.handleCollectPrize,
            undefined,
            this
        )

        //scores display
        this.scoreLabel = this.add.text(10, 10, `Падабайкi: ${this.score}`, {
            fontSize: '24px',
            color: 'red',
            backgroundColor: 'white',
            shadow: {fill: true, blur: 0, offsetY: 0},
            padding: {left: 15, right: 15, top: 10, bottom: 10}
        })
            .setScrollFactor(0)

        //sounds
        this.mainAudio = this.sound.add('main', { loop: true });
        this.mainAudio.play()
        this.collectAudio = this.sound.add('collect');
        this.fallAudio = this.sound.add('lose');
    }


    private handleOverlapBarrreir(
        obj1: Phaser.GameObjects.GameObject,
        obj2: Phaser.GameObjects.GameObject,
    ) {
        const hero = obj2 as Hero

        this.fallAudio.play()
        hero.kill()
        this.mainAudio.stop()
    }

    private handleCollectPrize(
        obj1: Phaser.GameObjects.GameObject,
        obj2: Phaser.GameObjects.GameObject,
    ) {
        // obj2 will be the prize
        const prize = obj2 as Phaser.Physics.Arcade.Sprite

        // use the group to hide it
        this.prizes.killAndHide(prize)
        this.collectAudio.play()

        //turn off the physics
        prize.body.enable = false
        this.score += 1
        this.scoreLabel.text = `Падабайкi: ${this.score}`

    }


    update(t: number, dt: number) {
        this.backgroundRoad.setTilePosition(this.cameras.main.scrollX)

        this.wrapEnemies()
        this.wrapDron()
    }
}