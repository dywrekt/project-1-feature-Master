window.addEventListener('load', () => {
    const config = {
        type: Phaser.AUTO,
        width: 250,
        height: 300,
        backgroundColor: 0x27ae60,
        physics: {
            default: 'arcade',
            arcade: {
                // debug: true,
                gravity: { y: 0},
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "phaser"
        },
        pixelArt: true,
        // scene: [testScene]
        scene: [testScene, testScene2]
    }
    new Phaser.Game(config);
})

