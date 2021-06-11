this.map2.findObject('Objects', function(object) {

    // rooms
    if (object.type === 'Room') {
        this.rooms.push(object)
    }

    // stairs
    if (object.name === 'Stairs') {
        this.stairs.add(new Entity (this, object.x, object.y))
    }

    //spawnPoints
    if (object.type === 'Spawn') {
        this.boy2 = new Boy(this, object.x, object.y, 'character').setScale(1.2)

    }

    if (object.name === 'portalBack') {
        this.portalBacc = new Phaser.Geom.Rectangle(object.x, object.y, object.width, object.height)
        console.log(object)
    }

}, this)