class testScene extends Phaser.Scene {
    constructor() {
        super('testScene');
    }

    preload() {

        this.load.image('tiles', './Assets/TileSets/game.png')
        this.load.tilemapTiledJSON('map', 'Scripts/JSON/test.json')
        this.load.spritesheet('character', './Assets/characters.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.keys
        this.player
    }

    create() {
        const map = this.make.tilemap({key: 'map'})
        const tileSet = map.addTilesetImage('game', 'tiles')
        const layer = map.createStaticLayer('firstLayer', tileSet, 0, 0)
        const portal = map.findObject("objectLayer", obj => obj.name === "door");

        this.newPortal = new Phaser.Geom.Rectangle(portal.x, portal.y,
            portal.width, portal.height)
        console.log(portal)



        // const objectLayer = map.getObjectLayer('objectLayer', function (object) {
        //     if (object.name === 'portal') {
        //         this.map.push(object)
        //     }
        // })

        this.player = new testPlayer(this, 200, 200, 'character')
        this.player.body.setCollideWorldBounds(true)
        // this.physics.add.collider(this.player, this.objectLayer)
        this.physics.world.bounds.width = 400
        this.physics.world.bounds.height = 400
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, 400, 400, true)

    }

    update() {
        this.player.update()
        if (this.newPortal.contains(this.player.x + this.player.width / 2,
            this.player.y + this.player.height / 2)) this.scene.switch('testScene2')

            }
}

class testScene2 extends Phaser.Scene {
    constructor() {
        super('testScene2');
    }

    preload() {

        this.load.image('boya', 'Assets/character_select_boy.png')

    }

    create() {

        this.add.image(200, 200, 'boya').setScale(0.15)

    }

    update() {

    }

}


