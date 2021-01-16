import Phaser from 'phaser'
import TextureKeys from "~/consts/TextureKeys";
import SceneKeys from "~/consts/SceneKeys";
import AnimationKeys from "~/consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preloader)
    }

    preload() {
        this.load.image(TextureKeys.MainBackground, 'city/bg_city_main.png')
        this.load.image(TextureKeys.RoadBackground, 'city/bg_repeat_road.png')
        this.load.image(TextureKeys.GrassBackground, 'city/bg_repeat_grass.png')

        this.load.atlas(
            TextureKeys.RunningMan,
            'characters/hero/run.png',
            'characters//hero/run.json'
        )


    }

    create() {
        this.anims.create({
            key: AnimationKeys.RunningManRun, // name of this animation

            frames: this.anims.generateFrameNames('hero', {
                start: 1,
                end: 8,
                prefix: 'run_',
                zeroPad: 0,
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1 // -1 to loop forever
        })

        this.scene.start(SceneKeys.Game)
    }
}