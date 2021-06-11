class testPlayer extends Entity {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey, 'testPlayer');
        //setVariable
        const animFrameRate = 10
        const anims = scene.anims
        //createAnimation
        //player
        //boy
        anims.create({
            key: 'player-down',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 3,
                end: 5
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-left',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 15,
                end: 17
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-right',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 27,
                end: 29
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-up',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 39,
                end: 41
            }),
            frameRate: animFrameRate,
            repeat: -1
        })

        this.idleBoy = {
            down: 4,
            left: 16,
            right: 28,
            up: 40
        }

        this.setFrame(this.idleBoy.down, this.idleGirl)

        //setKeys
        const {LEFT, RIGHT, UP, DOWN, W, A, S, D} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        })
    }
    update() {
        //setVariable
        const {keys} = this
        const speed = 200
        const previousVelocity = this.body.velocity.clone()

        this.body.setVelocity(0)
        //movementPlayer
        if (keys.left.isDown || keys.a.isDown) {
            this.body.setVelocityX(-speed)
        } else if (keys.right.isDown || keys.d.isDown) {
            this.body.setVelocityX(speed)
        }
        if (keys.up.isDown || keys.w.isDown) {
            this.body.setVelocityY(-speed)
        } else if (keys.down.isDown || keys.s.isDown) {
            this.body.setVelocityY(speed)
        }

        this.body.velocity.normalize().scale(speed)

        //animationBoy

        if (keys.left.isDown || keys.a.isDown) {
            this.anims.play('player-left', true)
        } else if (keys.right.isDown || keys.d.isDown) {
            this.anims.play('player-right', true)
        } else if (keys.up.isDown || keys.w.isDown) {
            this.anims.play('player-up', true)
        } else if (keys.down.isDown || keys.s.isDown) {
            this.anims.play('player-down', true)
        } else {
            this.anims.stop()
        }

        //setIdleAnimation
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            //showIdleBoy
            if (previousVelocity.x < 0) {
                this.setFrame(this.idleBoy.left)
            } else if (previousVelocity.x > 0) {
                this.setFrame(this.idleBoy.right)
            } else if (previousVelocity.y < 0) {
                this.setFrame(this.idleBoy.up)
            } else if (previousVelocity.y > 0) {
                this.setFrame(this.idleBoy.down)
            }
        }

    }
}