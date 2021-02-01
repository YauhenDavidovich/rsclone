import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import AnimationKeys from '../consts/AnimationKeys'
import SceneKeys from "~/consts/SceneKeys";

enum HeroState
{
    Running,
    Killed,
    Dead
}

export default class Hero extends Phaser.GameObjects.Container {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private hero: Phaser.GameObjects.Sprite
    private jumptimer = 0;
    private heroState = HeroState.Running



    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.hero = scene.add.sprite(0, 0, TextureKeys.RunningMan)
            .setOrigin(0.5, 1)



        this.hero.play(AnimationKeys.RunningManRun)

        this.add(this.hero)
        scene.physics.add.existing(this)


        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(this.hero.width * 0.25, this.hero.height * 0.5)
        body.setOffset(this.hero.width * -0.15, -this.hero.height + 200)

        // get a CursorKeys instance
        this.cursors = scene.input.keyboard.createCursorKeys()


    }
    kill()
    {
        if (this.heroState !== HeroState.Running)
        {
            return
        }

        this.heroState = HeroState.Killed

        this.hero.play(AnimationKeys.RunningManFall)

        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAccelerationY(0)
        body.setVelocity(300, 0)
    }

    preUpdate() {

        const body = this.body as Phaser.Physics.Arcade.Body
        switch (this.heroState)
        {
            case HeroState.Running: {
                if (body.blocked.down && this.jumptimer === 0) {
                    this.hero.play(AnimationKeys.RunningManRun, true)
                }
                if (this.cursors.space.isDown) {
                    if (body.blocked.down && this.jumptimer === 0) {
                        // jump is allowed to start
                        this.jumptimer = 1;
                        body.setVelocityY(-330)

                        this.hero.play(AnimationKeys.RunningManJump, true)
                    } else if (this.jumptimer > 0 && this.jumptimer < 31) {
                        // keep jumping higher
                        ++this.jumptimer;
                        body.setVelocityY(-330 - (this.jumptimer * 1));
                    }
                } else {
                    // jump button not being pressed, reset jump timer
                    this.jumptimer = 0;
                }
                break
            }
            case HeroState.Killed:
            {
                body.velocity.x *= 0.99
                if (body.velocity.x <= 5)
                {
                    this.heroState = HeroState.Dead
                }
                break
            }

            case HeroState.Dead:
            {

                body.setVelocity(0, 0)
                this.scene.scene.run(SceneKeys.GameOver)

                break
            }

        }



    }
}