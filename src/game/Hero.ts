import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import AnimationKeys from '../consts/AnimationKeys'

export default class Hero extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        const hero = scene.add.sprite(0, 0, TextureKeys.RunningMan)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RunningManRun)
        this.add(hero)
    }
}
