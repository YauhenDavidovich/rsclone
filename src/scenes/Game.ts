import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {
        this.load.image('background', 'city/bg_repeat_340x640.png')

        this.load.atlas(
            'hero',
            'characters/hero/run.png',
            'characters//hero/run.json'
        )


    }

    create() {
        this.anims.create({
            key: 'hero-run', // name of this animation

            frames: this.anims.generateFrameNames('hero', {
                start: 1,
                end: 8,
                prefix: 'run_',
                zeroPad: 0,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1 // -1 to loop forever
        })


        // store the width and height of the game screen
        const width = this.scale.width
        const height = this.scale.height
        this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0)

        this.add.sprite(width * 0.5, height * 0.5, 'hero', 'run_1.png').play('hero-run')

    }
}