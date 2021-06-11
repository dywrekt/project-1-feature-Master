class Scene1 extends Phaser.Scene {
  constructor() {
    super("Scene1");
  }

  preload() {
    this.load.image("play", "../../Assets/play.png");
  }
  create() {
    this.backGroundColor = {
      backgroundColor: 0x27ae60,
    };
    let button = this.add.image(300, 180, "play").setScale(1);
    button.setInteractive().on("pointerdown", () => {
      this.scene.switch("Scene2");
    });
  }
}
////////////////////////////////////////////
class Scene2 extends Phaser.Scene {
  constructor() {
    super("Scene2");
  }

  preload() {
    this.load.image("BAP", "../../Assets/BAP.png");
    this.load.image("bitGame", "../../Assets/BitGame.png");
  }

  create() {
    this.add.image(300, 70, "BAP");
    let button = this.add.image(300, 280, "bitGame");
    button.setInteractive().on("pointerdown", () => {
      this.scene.switch("Scene3");
    });
  }
}
////////////////////////////////////////////
class Scene3 extends Phaser.Scene {
  constructor() {
    super("Scene3");
  }

  preload() {
    this.load.image("characterSelection", "../../Assets/CharacterSelect.png");
    this.load.image("boy", "../../Assets/character_select_boy.png");
    this.load.image("girl", "../../Assets/character_select_girl.png");
  }

  create() {
    this.add.image(300, 50, "characterSelection");
    let boy = this.add.image(160, 200, "boy").setScale(0.6);
    let girl = this.add.image(460, 200, "girl").setScale(0.6);

    boy.setInteractive().on("pointerdown", () => {
      this.scene.switch("GameScene");
    });

    girl.setInteractive().on("pointerdown", () => {
      this.scene.switch("GameSceneGirl");
    });
  }
}
////////////////////////////////////////////
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("tiles", "../../Assets/TileSets/game.png");
    this.load.tilemapTiledJSON("map", "../../Scripts/JSON/untitled2.json");

    this.load.spritesheet("character", "../../Assets/Sprite/characters.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("book", "../../Assets/book.png");
  }

  create() {
    //setUpMap
    this.map = this.make.tilemap({ key: "map" });
    const tileSet = this.map.addTilesetImage("game", "tiles");

    //setUpLayer
    const lastLayer = this.map.createStaticLayer("lastLayer", tileSet, 0, 0);
    const tileCollision = this.map.createStaticLayer(
      "tileCollision",
      tileSet,
      0,
      0
    );
    const firstLayer = this.map.createStaticLayer("firstLayer", tileSet, 0, 0);
    const building = this.map.createStaticLayer("building", tileSet, 0, 0);
    const textures = this.map.createStaticLayer("textures", tileSet, 0, 0);
    const midLayer = this.map.createStaticLayer("midLayer", tileSet, 0, 0);
    const midLayer1 = this.map.createStaticLayer("midLayer1", tileSet, 0, 0);
    const midLayer2 = this.map.createStaticLayer("midLayer2", tileSet, 0, 0);
    const midLayer3 = this.map.createStaticLayer("midLayer3", tileSet, 0, 0);
    const inDepthLayer1 = this.map.createStaticLayer(
      "inDepthLayer1",
      tileSet,
      0,
      0
    );
    const inDepthLayer2 = this.map.createStaticLayer(
      "inDepthLayer2",
      tileSet,
      0,
      0
    );
    const inDepthLayer3 = this.map.createStaticLayer(
      "inDepthLayer3",
      tileSet,
      0,
      0
    );

    this.map.findObject(
      "objectLayer",
      function (object) {
        if (object.name === "portal") {
          this.newPortal = new Phaser.Geom.Rectangle(
            object.x,
            object.y,
            object.width,
            object.height
          );
          console.log(object);
        }
        if (object.name === "spawn") {
          console.log(object);
        }
      },
      this
    );

    // this.boy = new Boy(this, 320, 610, 'character').setScale(1.2)

    //configLayer
    lastLayer.setCollisionByProperty({ collide: true });
    tileCollision.setCollisionByProperty({ collide: true });
    building.setCollisionByProperty({ collide: true });
    textures.setCollisionByProperty({ collide: true });
    midLayer1.setCollisionByProperty({ collide: true });
    midLayer2.setCollisionByProperty({ collide: true });
    midLayer3.setCollisionByProperty({ collide: true });
    inDepthLayer1.setDepth(10);
    inDepthLayer2.setDepth(10);
    inDepthLayer3.setDepth(10);

    this.object = this.add.image(320, 500, "book").setScale(1.5);

    this.boy = new Boy(this, 320, 610, "character").setScale(1.2);

    //setUpCollision
    this.physics.add.collider(this.boy, lastLayer);
    this.physics.add.collider(this.boy, tileCollision);
    this.physics.add.collider(this.boy, building);
    this.physics.add.collider(this.boy, textures);
    this.physics.add.collider(this.boy, midLayer1);
    this.physics.add.collider(this.boy, midLayer2);
    this.physics.add.collider(this.boy, midLayer3);

    this.physics.world.bounds.width = 640;
    this.physics.world.bounds.height = 640;

    //setUpCamera
    this.cameras.main.startFollow(this.boy);
    this.cameras.main.setBounds(0, 0, 640, 640);

    // const debug = this.add.graphics().setAlpha(0.5)
    // tileCollision.renderDebug(debug, {
    //     tileColor: null,
    //     collidingTileColor: new Phaser.Display.Color(255,255,50,255),
    //     faceColor: new Phaser.Display.Color(0,255,0,255)
    // })
  }

  update() {
    this.boy.update();
    if (
      this.newPortal.contains(
        this.boy.x + this.boy.width / 2,
        this.boy.y + this.boy.height / 2
      )
    )
      this.scene.start("GameScene2");
  }
}
////////////////////////////////////////////
class GameScene2 extends Phaser.Scene {
  constructor() {
    super("GameScene2");
  }
  //Loads the assets
  preload() {
    // Level tiles and data
    this.load.image("tiles2", "../../Assets/TileSets/schooltile.png");
    this.load.tilemapTiledJSON("map2", "../../Scripts/JSON/BitGame.json");

    // Player sprite
    this.load.spritesheet("character", "../../Assets/Sprite/characters.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    // Make map of level 1.
    this.map2 = this.make.tilemap({ key: "map2" });

    // Define tiles used in map.
    const tileSet2 = this.map2.addTilesetImage("schooltile", "tiles2", 16, 16);

    // The map layers.
    const floorLayer = this.map2.createStaticLayer("floor", tileSet2);
    const wallsLayer = this.map2.createStaticLayer("walls", tileSet2);
    const itemsLayer = this.map2.createStaticLayer("items", tileSet2);
    const aboveLayer = this.map2.createStaticLayer("above_player", tileSet2);

    // Set physics boundaries from map width and height.
    this.physics.world.setBounds(
      0,
      0,
      this.map2.widthInPixels,
      this.map2.heightInPixels
    );

    // Collisions based on layer.
    wallsLayer.setCollisionByProperty({ collides: true });

    // Set the above player layer higher than everything else.
    aboveLayer.setDepth(10);

    // Setup things in this level.
    this.rooms = [];
    this.stairs = this.physics.add.group();

    // Loop through all the objects.
    this.map2.findObject(
      "Objects",
      function (object) {
        // rooms
        if (object.type === "Room") {
          this.rooms.push(object);
        }

        // stairs
        if (object.name === "Stairs") {
          this.stairs.add(new Entity(this, object.x, object.y));
        }

        //spawnPoints
        if (object.type === "Spawn") {
          this.boy2 = new Boy(this, object.x, object.y, "character").setScale(
            1.2
          );
        }

        if (object.name === "portalBack") {
          this.portalBacc = new Phaser.Geom.Rectangle(
            object.x,
            object.y,
            object.width,
            object.height
          );
          console.log(object);
        }
      },
      this
    );

    // adds collisions
    this.physics.add.collider(this.boy2, wallsLayer);
    this.physics.add.overlap(
      this.boy2,
      this.stairs,
      function () {
        this.boy2.onStairs = true;
      },
      null,
      this
    );

    // start camera
    // this.cameras.main.setZoom(2.0)
    this.cameras.main.setBounds(
      this.rooms[this.boy2.currentRoom].x,
      this.rooms[this.boy2.currentRoom].y,
      this.rooms[this.boy2.currentRoom].width,
      this.rooms[this.boy2.currentRoom].height,
      true
    );

    this.cameras.main.startFollow(this.boy2);

    this.cameras.main.fadeIn(2000, 0, 0, 0);

    // listener for gamepad detection
    // this.input.gamepad.once('down', function (pad, button, index) {
    //     this.gamepad = pad;
    // }, this)
  }

  //Update called every tick
  update(time, delta) {
    this.boy2.update();

    this.cameras.main._ch = this.map2.heightInPixels;
    this.cameras.main._cw = this.map2.widthInPixels;

    if (this.boy2.roomChange) {
      this.cameras.main.fadeOut(
        250,
        0,
        0,
        0,
        function (camera, progress) {
          this.boy2.canMove = false;
          if (progress === 1) {
            // Changes the camera boundaries when fade out is done
            this.cameras.main.setBounds(
              this.rooms[this.boy2.currentRoom].x,
              this.rooms[this.boy2.currentRoom].y,
              this.rooms[this.boy2.currentRoom].width,
              this.rooms[this.boy2.currentRoom].height,
              true
            );

            // Fades back in with new boundaries
            this.cameras.main.fadeIn(
              500,
              0,
              0,
              0,
              function (camera, progress) {
                if (progress === 1) {
                  this.boy2.canMove = true;
                  this.roomStart(this.boy2.currentRoom);
                }
              },
              this
            );
          }
        },
        this
      );
    }
  }

  roomStart(roomNumber) {}
}
////////////////////////////////////////////
class GameSceneGirl extends Phaser.Scene {
  constructor() {
    super("GameSceneGirl");
  }

  preload() {
    this.load.image("tiles", "../../Assets/TileSets/game.png");
    this.load.tilemapTiledJSON("mapGirl", "../../Scripts/JSON/untitled2.json");
    // this.load.image('npc', 'Assets/character_select_boy.png')

    this.load.spritesheet("character", "../../Assets/Sprite/characters.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("book", "../../Assets/book.png");
  }

  create() {
    //setUpMap
    this.mapGirl = this.make.tilemap({ key: "mapGirl" });
    const tileSet = this.mapGirl.addTilesetImage("game", "tiles");

    //setUpLayer
    const lastLayer = this.mapGirl.createStaticLayer(
      "lastLayer",
      tileSet,
      0,
      0
    );
    const tileCollision = this.mapGirl.createStaticLayer(
      "tileCollision",
      tileSet,
      0,
      0
    );
    const firstLayer = this.mapGirl.createStaticLayer(
      "firstLayer",
      tileSet,
      0,
      0
    );
    const building = this.mapGirl.createStaticLayer("building", tileSet, 0, 0);
    const textures = this.mapGirl.createStaticLayer("textures", tileSet, 0, 0);
    const midLayer = this.mapGirl.createStaticLayer("midLayer", tileSet, 0, 0);
    const midLayer1 = this.mapGirl.createStaticLayer(
      "midLayer1",
      tileSet,
      0,
      0
    );
    const midLayer2 = this.mapGirl.createStaticLayer(
      "midLayer2",
      tileSet,
      0,
      0
    );
    const midLayer3 = this.mapGirl.createStaticLayer(
      "midLayer3",
      tileSet,
      0,
      0
    );
    const inDepthLayer1 = this.mapGirl.createStaticLayer(
      "inDepthLayer1",
      tileSet,
      0,
      0
    );
    const inDepthLayer2 = this.mapGirl.createStaticLayer(
      "inDepthLayer2",
      tileSet,
      0,
      0
    );
    const inDepthLayer3 = this.mapGirl.createStaticLayer(
      "inDepthLayer3",
      tileSet,
      0,
      0
    );

    this.mapGirl.findObject(
      "objectLayer",
      function (object) {
        if (object.name === "portal") {
          this.newPortal = new Phaser.Geom.Rectangle(
            object.x,
            object.y,
            object.width,
            object.height
          );
          console.log(object);
        }
        if (object.name === "spawn") {
          console.log(object);
        }
      },
      this
    );

    // const portal = this.map.findObject("objectLayer", obj => obj.name === "portal")
    // this.newPortal = new Phaser.Geom.Rectangle(portal.x, portal.y,
    //     portal.width, portal.height)

    this.boy = new Girl(this, 320, 610, "character").setScale(1.2);

    // this.npc = new NPC(this, 200, 300, 'npc')

    //configLayer
    lastLayer.setCollisionByProperty({ collide: true });
    tileCollision.setCollisionByProperty({ collide: true });
    building.setCollisionByProperty({ collide: true });
    textures.setCollisionByProperty({ collide: true });
    midLayer1.setCollisionByProperty({ collide: true });
    midLayer2.setCollisionByProperty({ collide: true });
    midLayer3.setCollisionByProperty({ collide: true });
    inDepthLayer1.setDepth(10);
    inDepthLayer2.setDepth(10);
    inDepthLayer3.setDepth(10);

    //setUpCollision
    this.physics.add.collider(this.boy, lastLayer);
    this.physics.add.collider(this.boy, tileCollision);
    this.physics.add.collider(this.boy, building);
    this.physics.add.collider(this.boy, textures);
    this.physics.add.collider(this.boy, midLayer1);
    this.physics.add.collider(this.boy, midLayer2);
    this.physics.add.collider(this.boy, midLayer3);

    this.physics.world.bounds.width = 640;
    this.physics.world.bounds.height = 640;

    //setUpCamera
    this.cameras.main.startFollow(this.boy);
    this.cameras.main.setBounds(0, 0, 640, 640);

    // const debug = this.add.graphics().setAlpha(0.5)
    // tileCollision.renderDebug(debug, {
    //     tileColor: null,
    //     collidingTileColor: new Phaser.Display.Color(255,255,50,255),
    //     faceColor: new Phaser.Display.Color(0,255,0,255)
    // })

    //books
    this.object = this.add.image(320, 500, "book");
  }
  handlePlayerObjectCollision() {}

  update() {
    this.boy.update();
    if (
      this.newPortal.contains(
        this.boy.x + this.boy.width / 2,
        this.boy.y + this.boy.height / 2
      )
    )
      this.scene.start("GameSceneGirl2");
  }
}
////////////////////////////////////////////
class GameSceneGirl2 extends Phaser.Scene {
  constructor() {
    super("GameSceneGirl2");
  }
  //Loads the assets
  preload() {
    // Level tiles and data
    this.load.image("tiles2", "../../Assets/TileSets/schooltile.png");
    this.load.tilemapTiledJSON("mapGirl2", "../../Scripts/JSON/BitGame.json");

    // Player sprite
    this.load.spritesheet("character", "../../Assets/Sprite/characters.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    // Make map of level 1.
    this.mapGirl2 = this.make.tilemap({ key: "mapGirl2" });

    // Define tiles used in map.
    const tileSet2 = this.mapGirl2.addTilesetImage(
      "schooltile",
      "tiles2",
      16,
      16
    );

    // The map layers.
    const floorLayer = this.mapGirl2.createStaticLayer("floor", tileSet2);
    const wallsLayer = this.mapGirl2.createStaticLayer("walls", tileSet2);
    const itemsLayer = this.mapGirl2.createStaticLayer("items", tileSet2);
    const aboveLayer = this.mapGirl2.createStaticLayer(
      "above_player",
      tileSet2
    );

    // Set physics boundaries from map width and height.
    this.physics.world.setBounds(
      0,
      0,
      this.mapGirl2.widthInPixels,
      this.mapGirl2.heightInPixels
    );

    // Collisions based on layer.
    wallsLayer.setCollisionByProperty({ collides: true });

    // Set the above player layer higher than everything else.
    aboveLayer.setDepth(10);

    // Setup things in this level.
    this.rooms = [];
    this.stairs = this.physics.add.group();

    // Loop through all the objects.
    this.mapGirl2.findObject(
      "Objects",
      function (object) {
        // rooms
        if (object.type === "Room") {
          this.rooms.push(object);
        }

        // stairs
        if (object.name === "Stairs") {
          this.stairs.add(new Entity(this, object.x, object.y));
        }

        //spawnPoints
        if (object.type === "Spawn") {
          this.girl2 = new Girl(this, object.x, object.y, "character").setScale(
            1.2
          );
        }

        if (object.name === "portalBack") {
          this.portalBacc = new Phaser.Geom.Rectangle(
            object.x,
            object.y,
            object.width,
            object.height
          );
          console.log(object);
        }
      },
      this
    );

    // adds collisions
    this.physics.add.collider(this.girl2, wallsLayer);
    this.physics.add.overlap(
      this.girl2,
      this.stairs,
      function () {
        this.girl2.onStairs = true;
      },
      null,
      this
    );

    // start camera
    // this.cameras.main.setZoom(2.0)
    this.cameras.main.setBounds(
      this.rooms[this.girl2.currentRoom].x,
      this.rooms[this.girl2.currentRoom].y,
      this.rooms[this.girl2.currentRoom].width,
      this.rooms[this.girl2.currentRoom].height,
      true
    );

    this.cameras.main.startFollow(this.girl2);

    this.cameras.main.fadeIn(2000, 0, 0, 0);

    // listener for gamepad detection
    // this.input.gamepad.once('down', function (pad, button, index) {
    //     this.gamepad = pad;
    // }, this)
  }

  //Update called every tick
  update(time, delta) {
    this.girl2.update();

    this.cameras.main._ch = this.mapGirl2.heightInPixels;
    this.cameras.main._cw = this.mapGirl2.widthInPixels;

    if (this.girl2.roomChange) {
      this.cameras.main.fadeOut(
        250,
        0,
        0,
        0,
        function (camera, progress) {
          this.girl2.canMove = false;
          if (progress === 1) {
            // Changes the camera boundaries when fade out is done
            this.cameras.main.setBounds(
              this.rooms[this.girl2.currentRoom].x,
              this.rooms[this.girl2.currentRoom].y,
              this.rooms[this.girl2.currentRoom].width,
              this.rooms[this.girl2.currentRoom].height,
              true
            );

            // Fades back in with new boundaries
            this.cameras.main.fadeIn(
              500,
              0,
              0,
              0,
              function (camera, progress) {
                if (progress === 1) {
                  this.girl2.canMove = true;
                  this.roomStart(this.girl2.currentRoom);
                }
              },
              this
            );
          }
        },
        this
      );
    }
  }

  roomStart(roomNumber) {}
}
