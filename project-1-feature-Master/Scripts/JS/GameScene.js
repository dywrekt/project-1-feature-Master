// class GameScene extends Phaser.Scene {
//     constructor() {
//         super('GameScene')
//     }
//
//     preload() {
//
//         this.load.image('tiles', 'Assets/game.png')
//         this.load.tilemapTiledJSON('map', 'GameTileDemo.json')
//
//         this.load.spritesheet('character', 'Assets/characterss.png', {
//             frameWidth: 16,
//             frameHeight: 16
//         });
//
//         this.keys
//         this.player
//     }
//
//     create() {
//         //setUpMap
//         const map = this.make.tilemap({key: 'map'})
//         const tileSet = map.addTilesetImage('game', 'tiles')
//         const belowLayer = map.createStaticLayer('belowLayer', tileSet, 0, 0)
//         const worldLayer = map.createStaticLayer('worldLayer', tileSet, 0, 0)
//         const aboveLayer = map.createStaticLayer('aboveLayer', tileSet, 0, 0)
//
//         this.player = new Player(this, 200, 200, 'character')
//
//         //setUpLayers
//         worldLayer.setCollisionByProperty({collides: true})
//         aboveLayer.setDepth(10)
//         //setUpCollision
//         this.player.body.setCollideWorldBounds(true)
//         this.physics.add.collider(this.player, worldLayer)
//         this.physics.world.bounds.width = 400
//         this.physics.world.bounds.height = 400
//
//         //setUpCamera
//         this.cameras.main.startFollow(this.player)
//         this.cameras.main.setBounds(0, 0, 400, 400)
//
//         const debug = this.add.graphics().setAlpha(0.5)
//         worldLayer.renderDebug(debug, {
//             tileColor: null,
//             collidingTileColor: new Phaser.Display.Color(255,255,50,255),
//             faceColor: new Phaser.Display.Color(0,255,0,255)
//         })
//
//     }
//
//     update() {
//         this.player.update()
//     }
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
