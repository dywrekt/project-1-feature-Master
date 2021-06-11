class Girl extends Entity {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey, 'Girl')
        //setVariable
        const animFrameRate = 10
        const anims = scene.anims

        this.currentRoom = 1    // Set start room so room change flag doens't fire.
        this.previousRoom = null
        this.roomChange = false
        this.canMove = true
        this.onStairs = false

        this.speed = 80
        this.body.setCollideWorldBounds(true)
        this.body.setCircle(3)


        //createAnimation
        //player
        anims.create({
            key: 'player-down',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 6,
                end: 8
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-left',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 18,
                end: 20
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-right',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 30,
                end: 32
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'player-up',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 42,
                end: 44
            }),
            frameRate: animFrameRate,
            repeat: -1
        })

        this.idleGirl = {
            down: 7,
            left: 19,
            right: 31,
            up: 43
        }

        this.setFrame(this.idleGirl.down)

        //setKeys
        const {LEFT, RIGHT, UP, DOWN, W, A, S, D} = Phaser.Input.Keyboard.KeyCodes
        this.keys2 = scene.input.keyboard.addKeys({
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
    update(time, delta) {
        super.update(time, delta)
        //setVariable
        const {keys2} = this
        const previousVelocity = this.body.velocity.clone()
        this.body.velocity.normalize().scale(this.speed)


        this.body.setVelocity(0)
        //movementPlayer
        if (this.canMove) {

            if (keys2.left.isDown || keys2.a.isDown) {
                this.body.setVelocityX(-this.speed)
            } else if (keys2.right.isDown || keys2.d.isDown) {
                this.body.setVelocityX(this.speed)
            }
            if (keys2.up.isDown || keys2.w.isDown) {
                this.body.setVelocityY(-this.speed)
            } else if (keys2.down.isDown || keys2.s.isDown) {
                this.body.setVelocityY(this.speed)
            }

            //animationBoy

            if (keys2.left.isDown || keys2.a.isDown) {
                this.anims.play('player-left', true)
            } else if (keys2.right.isDown || keys2.d.isDown) {
                this.anims.play('player-right', true)
            } else if (keys2.up.isDown || keys2.w.isDown) {
                this.anims.play('player-up', true)
            } else if (keys2.down.isDown || keys2.s.isDown) {
                this.anims.play('player-down', true)
            } else {
                this.anims.stop()
            }

            //setIdleAnimation
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                //showIdleBoy
                if (previousVelocity.x < 0) {
                    this.setFrame(this.idleGirl.left)
                } else if (previousVelocity.x > 0) {
                    this.setFrame(this.idleGirl.right)
                } else if (previousVelocity.y < 0) {
                    this.setFrame(this.idleGirl.up)
                } else if (previousVelocity.y > 0) {
                    this.setFrame(this.idleGirl.down)
                }
            }
        }

        // Stairs
        if (this.onStairs) {
            this.speed = 50;
            this.onStairs = false;
        } else {
            this.speed = 200;
        }
        this.getRoom()
    }

    getRoom() {

        // place holder for current room.
        let roomNumber;

        // loop through rooms in this level.
        for (let room in this.scene.rooms) {
            let roomLeft   = this.scene.rooms[room].x;
            let roomRight  = this.scene.rooms[room].x + this.scene.rooms[room].width;
            let roomTop    = this.scene.rooms[room].y;
            let roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;

            // Player is within the boundaries of this room.
            if (this.x > roomLeft && this.x < roomRight &&
                this.y > roomTop  && this.y < roomBottom) {

                roomNumber = room;

                // Set this room as visited by player.
                let visited = this.scene.rooms[room].properties.find(function(property) {
                    return property.name === 'visited';
                } );

                visited.value = true
            }
        }

        // Update player room variables.
        if (roomNumber != this.currentRoom) {
            this.previousRoom = this.currentRoom;
            this.currentRoom = roomNumber;
            this.roomChange = true;
        } else {
            this.roomChange = false;
        }

    }

}



