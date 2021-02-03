import Phaser from 'phaser'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from "~/consts/TextureKeys";
class TweenHelper {
    static flashElement(scene, element, repeat = true, easing = 'Linear', overallDuration = 1500, visiblePauseDuration = 500) {
        if (scene && element) {
            const flashDuration = overallDuration - visiblePauseDuration / 2;

            scene.tweens.timeline({
                tweens: [
                    {
                        targets: element,
                        duration: 0,
                        alpha: 0,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 1,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: visiblePauseDuration,
                        alpha: 1,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 0,
                        ease: easing,
                        onComplete: () => {
                            if (repeat === true) {
                                this.flashElement(scene, element);
                            }
                        }
                    }
                ]
            });
        }
    }
}

export default class PreloadScreen extends Phaser.Scene {
    private graphics!: Phaser.GameObjects.Graphics;
    private newGraphics: Phaser.GameObjects.Graphics;
    private percentage!: number;
    private loadingText: any;

    constructor() {
        super(SceneKeys.PreloadScreen)
    }

    preload() {

        this.load.image(TextureKeys.MainBackground, 'city/bg_city_main.png')
        this.load.image(TextureKeys.RoadBackground, 'city/bg_repeat_road.png')
        this.load.image(TextureKeys.NewBorBackground, 'city/nb_bg.png')
        this.load.image(TextureKeys.UrucheiBackground, 'city/uruchei_bg.png')
        this.load.image(TextureKeys.BorisovskiBackground, 'city/borisov_bg.png')
        this.load.image(TextureKeys.DanaBackground, 'city/dana_bg.png')

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

        this.load.atlas(
            TextureKeys.Prize,
            'characters/coin/coin.png',
            'characters//coin/coin.json'
        )

        this.load.audio('main', '/audio/run.mp3');
        this.load.audio('jump', '/audio/jump.wav');
        this.load.audio('collect', '/audio/collect.mp3');
        this.load.audio('lose', '/audio/lose.mp3');



        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Пачакай...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(String(value * 100)) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Загружаюцца тэкстуры: ' + file.key);
        });


        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            // this.scene.start(SceneKeys.Preloader)
            this.input.keyboard.once('keydown-SPACE', () => {
                this.scene.start(SceneKeys.Preloader)
            })
        }, this);

        this.load.image('assets1', 'start/banner.jpg');
        this.load.image('assets2', 'start/logo-rs-school.svg');

    }

    create() {
        const logo1 = this.add.image(400, 550, 'assets2');
        logo1.scale = 0.3
        const logo2 = this.add.image(400, 300, 'assets1');
        logo2.scale = 0.3

        const { width, height } = this.scale


        const screenPlayText = this.add.text(width * 0.5, height * 0.65,  'Цiснi SPACE каб пачаць гульню', {
            fontSize: '36px',
            color: '#FFFFFF',
            backgroundColor: '#000000',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
            .setOrigin(0.5)
        TweenHelper.flashElement(this, screenPlayText);

        const screenAuthor = this.add.text(width * 0.5, height * 0.75,  'created by Yauhen Davidovich in 2021', {
            fontSize: '16px',
            color: '#FFFFFF',
            backgroundColor: '#000000',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
            .setOrigin(0.5)

    }
}