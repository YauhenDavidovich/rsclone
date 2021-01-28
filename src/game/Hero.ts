import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import AnimationKeys from '../consts/AnimationKeys'

export default class Hero extends Phaser.GameObjects.Container {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private hero: Phaser.GameObjects.Sprite
    private jumptimer = 0;


    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.hero = scene.add.sprite(0, 0, TextureKeys.RunningMan)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RunningManRun)

        this.add(this.hero)
        scene.physics.add.existing(this)

        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(this.hero.width, this.hero.height)
        body.setOffset(this.hero.width * -0.5, this.hero.height * -0.5)

        // get a CursorKeys instance
        this.cursors = scene.input.keyboard.createCursorKeys()

    }


    preUpdate() {

        const body = this.body as Phaser.Physics.Arcade.Body

        if (body.blocked.down && this.jumptimer === 0) {


            this.hero.play(AnimationKeys.RunningManRun, true)
        }
        if (this.cursors.space.isDown) {
            if (body.blocked.down && this.jumptimer === 0) {
                // jump is allowed to start
                this.jumptimer = 1;
                body.setVelocityY(-220)
                this.hero.play(AnimationKeys.RunningManJump, true)
            } else if (this.jumptimer > 0 && this.jumptimer < 31) {
                // keep jumping higher
                ++this.jumptimer;
                body.setVelocityY(-220 - (this.jumptimer * 1));
            }
        } else {
            // jump button not being pressed, reset jump timer
            this.jumptimer = 0;
            // this.hero.play(AnimationKeys.RunningManRun, true)
        }

    }
}