import Phaser from 'phaser'
import TextureKeys from "~/consts/TextureKeys";
import SceneKeys from "~/consts/SceneKeys";
import AnimationKeys from "~/consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
    private sonido: Phaser.Sound.BaseSound;
    constructor() {
        super(SceneKeys.Preloader)
    }

    preload() {
        this.load.image(TextureKeys.MainBackground, 'city/bg_city_main.png')
        this.load.image(TextureKeys.RoadBackground, 'city/bg_repeat_road.png')
        this.load.image(TextureKeys.NewBorBackground, 'city/nb_bg.png')
        this.load.image(TextureKeys.UrucheiBackground, 'city/uruchei_bg.png')

        this.load.atlas(
            TextureKeys.EnemyBarrerier,
            'characters/enemy_barreir/barreir.png',
            'characters/enemy_barreir/barreir.json'
            )

        this.load.atlas(
            TextureKeys.EnemyPredator,
            'characters/enemy_barreir/predator.png',
            'characters/enemy_barreir/predator.json'
        )

        this.load.atlas(
            TextureKeys.EnemyDron,
            'characters/enemy_barreir/dron1.png',
            'characters/enemy_barreir/dron1.json'
        )


        this.load.atlas(
            TextureKeys.RunningMan,
            'characters/hero/run.png',
            'characters//hero/run.json'
        )

        this.load.atlas(
            TextureKeys.DeadMan,
            'characters/hero/fall.png',
            'characters//hero/fall.json'
        )

        this.load.atlas(
            TextureKeys.JumpingMan,
            'characters/hero/jump.png',
            'characters//hero/jump.json'
        )

        this.load.audio('sonido', '/audio/run.mp3');

    }

    create() {
        this.anims.create({
            key: AnimationKeys.RunningManRun, // name of this animation

            frames: this.anims.generateFrameNames('hero_run', {
                start: 1,
                end: 8,
                prefix: 'run_',
                zeroPad: 0,
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1 // -1 to loop forever
        })

        this.anims.create({
            key: AnimationKeys.EnemyBarreirAnimation, // name of this animation

            frames: this.anims.generateFrameNames('enemy_barreir', {
                start: 1,
                end: 4,
                prefix: 'barreir_',
                zeroPad: 1,
                suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1 // -1 to loop forever
        })

        this.anims.create({
            key: AnimationKeys.EnemyPredatorAnimation, // name of this animation

            frames: this.anims.generateFrameNames('enemy_predator', {
                start: 1,
                end: 3,
                prefix: 'predator_',
                zeroPad: 1,
                suffix: '.png'
            }),
            frameRate: 3,
            repeat: -1 // -1 to loop forever
        })


        this.anims.create({
            key: AnimationKeys.EnemyDronAnimation, // name of this animation

            frames: this.anims.generateFrameNames('enemy_dron', {
                start: 1,
                end: 2,
                prefix: 'dron1_',
                zeroPad: 1,
                suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1 // -1 to loop forever
        })



        this.anims.create({
            key: AnimationKeys.RunningManJump, // name of this animation

            frames: this.anims.generateFrameNames('hero_jump', {
                start: 1,
                end: 5,
                prefix: 'jump_',
                zeroPad: 1,
                suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1 // -1 to loop forever
        })

        this.anims.create({
            key: AnimationKeys.RunningManFall, // name of this animation

            frames: this.anims.generateFrameNames('hero_fall', {
                start: 1,
                end: 12,
                prefix: 'fall_',
                zeroPad: 1,
                suffix: '.png'
            }),
            frameRate: 5,
            repeat: 0 // -1 to loop forever
        })


        this.sonido = this.sound.add('sonido');
        this.sonido.loop = true;
        // this.sonido.play()

        this.scene.start(SceneKeys.Game)
    }
}