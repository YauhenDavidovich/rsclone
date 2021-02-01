import Phaser from 'phaser'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from "~/consts/TextureKeys";

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

        this.load.audio('sonido', '/audio/run.mp3');


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

        this.load.image('assets', 'start/banner.jpg');
        for (let i = 0; i < 500; i++) {
            this.load.image('assets' + i, 'start/banner.jpg');
        }
    }

    create() {
        const logo = this.add.image(400, 300, 'assets');
        logo.scale = 0.3


    }
}