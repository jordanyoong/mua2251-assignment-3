namespace SpriteKind {
    export const PrimedTrap = SpriteKind.create()
    export const Trap = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Trap, function (sprite, otherSprite) {
    VIOLATION()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tempSprite = sprites.create(img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `, SpriteKind.PrimedTrap)
    tiles.placeOnTile(tempSprite, location)
    tempSprite.lifespan = 500
    tiles.setTileAt(location, assets.tile`transparency16`)
})
sprites.onDestroyed(SpriteKind.Trap, function (sprite) {
    tiles.setTileAt(tiles.getTileLocation(Math.idiv(sprite.x, 16), Math.idiv(sprite.y, 16)), assets.tile`myTile1`)
})
function VIOLATION () {
    if (invulnerabilityTimeEnd < game.runtime()) {
        invulnerabilityTimeEnd = game.runtime() + 2000
        giantX = sprites.create(img`
            ................................................................
            .........................................................2......
            ......2.................................................222.....
            .....222...............................................22222....
            ....22222.............................................2222222...
            ...2222222...........................................222222222..
            ..222222222.........................................22222222222.
            .22222222222.......................................22222222222..
            .222222222222.....................................22222222222...
            ..222222222222...................................22222222222....
            ...222222222222.................................22222222222.....
            ....222222222222...............................22222222222......
            .....222222222222.............................22222222222.......
            ......222222222222...........................22222222222........
            .......222222222222.........................22222222222.........
            ........222222222222.......................22222222222..........
            .........222222222222.....................22222222222...........
            ..........222222222222...................22222222222............
            ...........222222222222.................22222222222.............
            ............222222222222...............22222222222..............
            .............222222222222.............22222222222...............
            ..............222222222222...........22222222222................
            ...............222222222222.........22222222222.................
            ................222222222222.......22222222222..................
            .................222222222222.....22222222222...................
            ..................222222222222...22222222222....................
            ...................222222222222.22222222222.....................
            ....................2222222222222222222222......................
            .....................22222222222222222222.......................
            ......................222222222222222222........................
            .......................2222222222222222.........................
            ........................22222222222222..........................
            .........................222222222222...........................
            .........................2222222222222..........................
            ........................222222222222222.........................
            .......................22222222222222222........................
            ......................2222222222222222222.......................
            .....................222222222222222222222......................
            ....................22222222222222222222222.....................
            ...................22222222222..222222222222....................
            ..................22222222222....222222222222...................
            .................22222222222......222222222222..................
            ................22222222222........222222222222.................
            ...............22222222222..........222222222222................
            ..............22222222222............222222222222...............
            .............22222222222..............222222222222..............
            ............22222222222................222222222222.............
            ...........22222222222..................222222222222............
            ..........22222222222....................222222222222...........
            .........22222222222......................222222222222..........
            ........22222222222........................222222222222.........
            .......22222222222..........................222222222222........
            ......22222222222............................222222222222.......
            .....22222222222..............................222222222222......
            ....22222222222................................222222222222.....
            ...22222222222..................................222222222222....
            ..22222222222....................................222222222222...
            .22222222222......................................2222222222....
            ..222222222........................................22222222.....
            ...2222222..........................................222222......
            ....22222............................................2222.......
            .....222..............................................22........
            ......2.........................................................
            ................................................................
            `, SpriteKind.Enemy)
        giantX.z = 999
        giantX.setFlag(SpriteFlag.RelativeToCamera, true)
        giantX.lifespan = 1000
        scene.cameraShake(4, 1000)
        STRIKES_REMAINING += -1
        timer.background(function () {
            music.playTone(262, 1000)
            ghost.sayText("Lives Left:" + STRIKES_REMAINING, 1000, true)
        })
        if (STRIKES_REMAINING == 0) {
            timer.after(1000, function () {
                game.over(false)
            })
        }
    }
}
sprites.onDestroyed(SpriteKind.PrimedTrap, function (sprite) {
    tempSprite = sprites.create(img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `, SpriteKind.Trap)
    tempSprite.setPosition(sprite.x, sprite.y)
    animation.runImageAnimation(
    tempSprite,
    [img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f 1 f f 4 4 4 f f 1 f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f 1 f f 4 4 4 f f 1 f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 f 1 1 1 f 4 4 4 f 1 1 1 f 4 
        4 f f 1 1 1 f f 4 f f 1 1 1 f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 f 1 1 1 f 4 4 4 f 1 1 1 f 4 
        4 f f 1 1 1 f f 4 f f 1 1 1 f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 1 1 1 4 4 4 4 4 1 1 1 4 4 
        4 4 f 1 1 1 f 4 4 4 f 1 1 1 f 4 
        4 f 1 1 1 1 1 f 4 f 1 1 1 1 1 f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 1 1 1 4 4 4 4 4 1 1 1 4 4 
        4 4 f 1 1 1 f 4 4 4 f 1 1 1 f 4 
        4 f 1 1 1 1 1 f 4 f 1 1 1 1 1 f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 1 1 1 4 4 4 4 4 1 1 1 4 4 
        4 4 4 1 1 1 4 4 4 4 4 1 1 1 4 4 
        4 4 1 1 1 1 1 4 4 4 1 1 1 1 1 4 
        4 f 1 1 1 1 1 f 4 f 1 1 1 1 1 f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 1 1 1 4 4 4 4 4 1 1 1 4 4 
        4 4 4 1 1 1 4 4 4 4 4 1 1 1 4 4 
        4 4 1 1 1 1 1 4 4 4 1 1 1 1 1 4 
        4 f 1 1 1 1 1 f 4 f 1 1 1 1 1 f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 1 1 1 4 4 4 4 4 1 1 1 4 4 
        4 4 f 1 1 1 f 4 4 4 f 1 1 1 f 4 
        4 f 1 1 1 1 1 f 4 f 1 1 1 1 1 f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 1 1 1 4 4 4 4 4 1 1 1 4 4 
        4 4 f 1 1 1 f 4 4 4 f 1 1 1 f 4 
        4 f 1 1 1 1 1 f 4 f 1 1 1 1 1 f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 f 1 1 1 f 4 4 4 f 1 1 1 f 4 
        4 f f 1 1 1 f f 4 f f 1 1 1 f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 4 
        4 4 f 1 1 1 f 4 4 4 f 1 1 1 f 4 
        4 f f 1 1 1 f f 4 f f 1 1 1 f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f 1 f f 4 4 4 f f 1 f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f 1 f f 4 4 4 f f 1 f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f 1 f f f 4 f f f 1 f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `,img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f f f f f 4 f f f f f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 4 f f f f f 4 4 4 f f f f f 4 
        4 f f f f f f f 4 f f f f f f f 
        4 4 f f f f f 4 4 4 f f f f f 4 
        `],
    75,
    false
    )
    tempSprite.lifespan = 750
})
function updateLight () {
    trafficLight.setImage(img`
        .ccccccccccccccccccccccccccccccccccccccccc.
        ccccccccccccccccccccccccccccccccccccccccccc
        ccccc7777777cccccc5555555cccccc2222222ccccc
        cccc777777777cccc555555555cccc222222222cccc
        ccc77777777777cc55555555555cc22222222222ccc
        ccc77777777777cc55555555555cc22222222222ccc
        ccc77777777777cc55555555555cc22222222222ccc
        ccc77777777777cc55555555555cc22222222222ccc
        ccc77777777777cc55555555555cc22222222222ccc
        ccc77777777777cc55555555555cc22222222222ccc
        ccc77777777777cc55555555555cc22222222222ccc
        cccc777777777cccc555555555cccc222222222cccc
        ccccc7777777cccccc5555555cccccc2222222ccccc
        ccccccccccccccccccccccccccccccccccccccccccc
        .ccccccccccccccccccccccccccccccccccccccccc.
        `)
    if (currentLightOn == 0) {
        trafficLight.image.replace(5, 11)
        trafficLight.image.replace(2, 11)
    } else if (currentLightOn == 1) {
        trafficLight.image.replace(7, 11)
        trafficLight.image.replace(2, 11)
    } else {
        trafficLight.image.replace(7, 11)
        trafficLight.image.replace(5, 11)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    info.setScore(1000 - info.getTimeElapsed())
    game.over(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    VIOLATION()
})
let item = 0
let giantX: Sprite = null
let invulnerabilityTimeEnd = 0
let tempSprite: Sprite = null
let mySprite: Sprite = null
let STRIKES_REMAINING = 0
let currentLightOn = 0
let trafficLight: Sprite = null
let ghost: Sprite = null
tiles.setTilemap(tilemap`level1`)
ghost = sprites.create(img`
    . . . . . . . c c . . . . . . . 
    . . . . . . . c 5 c . . . . . . 
    . . . . c c c 5 5 5 c c . . . . 
    . . c c b c 5 5 5 5 c c c c . . 
    . c b b 5 b 5 5 5 5 b 5 b b c . 
    . c b 5 5 b b 5 5 b b 5 5 b c . 
    . . f 5 5 5 b b b b 5 5 5 c . . 
    . . f f 5 5 5 5 5 5 5 5 f . . . 
    . . f f e e b f e e e f . . . . 
    . . f f f b 1 f b b e f . . . . 
    . . . f f b b b b b b f . . . . 
    . . . e e f e e e e f . . . . . 
    . . . e b b e b b 5 f . . . . . 
    . . . e b b e 5 5 5 5 f . . . . 
    . . . . e e 5 5 5 5 b c . . . . 
    . . . . . f f f f f f . . . . . 
    `, SpriteKind.Player)
ghost.z = 5
controller.moveSprite(ghost)
scene.cameraFollowSprite(ghost)
trafficLight = sprites.create(img`
    .ccccccccccccccccccccccccccccccccccccccccc.
    ccccccccccccccccccccccccccccccccccccccccccc
    ccccc6666666cccccc4444444cccccceeeeeeeccccc
    cccc666666666cccc444444444cccceeeeeeeeecccc
    ccc66666666666cc44444444444cceeeeeeeeeeeccc
    ccc66666666666cc44444444444cceeeeeeeeeeeccc
    ccc66666666666cc44444444444cceeeeeeeeeeeccc
    ccc66666666666cc44444444444cceeeeeeeeeeeccc
    ccc66666666666cc44444444444cceeeeeeeeeeeccc
    ccc66666666666cc44444444444cceeeeeeeeeeeccc
    ccc66666666666cc44444444444cceeeeeeeeeeeccc
    cccc666666666cccc444444444cccceeeeeeeeecccc
    ccccc6666666cccccc4444444cccccceeeeeeeccccc
    ccccccccccccccccccccccccccccccccccccccccccc
    .ccccccccccccccccccccccccccccccccccccccccc.
    `, SpriteKind.Player)
trafficLight.setFlag(SpriteFlag.RelativeToCamera, true)
trafficLight.top = 2
trafficLight.left = 2
trafficLight.z = 10
currentLightOn = 0
STRIKES_REMAINING = 7
let enemySpeed = 50
for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
    tiles.setTileAt(value, assets.tile`myTile0`)
    mySprite = sprites.create(img`
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . 5 5 1 1 1 1 1 1 1 5 5 . . . 
        . 5 1 1 5 1 5 1 5 1 5 1 1 5 . . 
        . 5 5 5 1 5 1 5 1 5 1 5 1 5 . . 
        5 5 5 5 5 5 5 1 5 1 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 1 5 1 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 1 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 5 5 1 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 1 5 1 5 . 
        . 5 1 5 5 5 5 5 5 5 5 5 1 5 . . 
        . 5 1 1 5 5 5 5 5 5 5 5 1 5 . . 
        . . 5 5 1 1 1 1 5 1 5 5 5 . . . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    mySprite.setVelocity(enemySpeed, 0)
    mySprite.setBounceOnWall(true)
    tiles.placeOnTile(mySprite, value)
}
for (let value2 of tiles.getTilesByType(assets.tile`myTile3`)) {
    tiles.setTileAt(value2, assets.tile`myTile0`)
    mySprite = sprites.create(img`
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . 5 5 1 1 1 1 1 1 1 5 5 . . . 
        . 5 1 1 5 1 5 1 5 1 5 1 1 5 . . 
        . 5 5 5 1 5 1 5 1 5 1 5 1 5 . . 
        5 5 5 5 5 5 5 1 5 1 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 1 5 1 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 1 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 5 5 1 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 1 5 1 5 . 
        . 5 1 5 5 5 5 5 5 5 5 5 1 5 . . 
        . 5 1 1 5 5 5 5 5 5 5 5 1 5 . . 
        . . 5 5 1 1 1 1 5 1 5 5 5 . . . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    mySprite.setVelocity(0, enemySpeed)
    mySprite.setBounceOnWall(true)
    tiles.placeOnTile(mySprite, value2)
}
for (let value3 of tiles.getTilesByType(assets.tile`myTile4`)) {
    tiles.setTileAt(value3, assets.tile`myTile0`)
    mySprite = sprites.create(img`
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . 5 5 1 1 1 1 1 1 1 5 5 . . . 
        . 5 1 1 5 1 5 1 5 1 5 1 1 5 . . 
        . 5 5 5 1 5 1 5 1 5 1 5 1 5 . . 
        5 5 5 5 5 5 5 1 5 1 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 1 5 1 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 1 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 5 5 1 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 1 5 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 1 1 5 . 
        5 5 5 5 5 5 5 5 5 5 5 1 5 1 5 . 
        . 5 1 5 5 5 5 5 5 5 5 5 1 5 . . 
        . 5 1 1 5 5 5 5 5 5 5 5 1 5 . . 
        . . 5 5 1 1 1 1 5 1 5 5 5 . . . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    mySprite.setVelocity(0, enemySpeed)
    mySprite.setBounceOnWall(true)
    tiles.placeOnTile(mySprite, value3)
    animation.runMovementAnimation(
    mySprite,
    "l 64 64 v -64 l -64 64 v -64",
    5000,
    true
    )
    animation.runImageAnimation(
    mySprite,
    [img`
        . . a 3 3 3 3 . . . . . . . . . 
        . a a a 3 3 3 3 . . . . . . . . 
        3 3 a a a 3 3 3 3 . . . . . . . 
        3 3 3 a . 3 3 3 3 . . . . . . . 
        3 3 3 . . . a a a . . . . . . . 
        a a a . . . a a a . . . . . 3 . 
        a a a . . . 3 3 3 . . . . 3 3 3 
        3 3 3 . . . 3 3 3 . . . . 3 3 3 
        3 3 3 . . . 3 3 3 . . . . a a a 
        . 3 . . . . a a a . . . . a a a 
        . . . . . . a a a . . . . 3 3 3 
        . . . . . . 3 3 3 . . . . 3 3 3 
        . . . . . . 3 3 3 3 . . a a 3 3 
        . . . . . . 3 3 3 a a 3 3 a a 3 
        . . . . . . . 3 a a 3 3 3 3 a . 
        . . . . . . . . a 3 3 3 3 3 . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . a 3 3 3 3 . . . . . . . . . 
        . a a a 3 3 3 3 . . . . . . . . 
        3 3 a a a 3 3 3 3 . . . . . . . 
        3 3 3 a . 3 3 3 3 . . . . . 3 . 
        3 3 3 . . . a a a . . . . 3 3 3 
        a a a . . . 3 3 3 . . . . a a a 
        3 3 3 . . . a a a . . . . a a a 
        . 3 . . . . a a a . . . . 3 3 3 
        . . . . . . 3 3 3 3 . . a a 3 3 
        . . . . . . 3 3 3 a a 3 3 a a 3 
        . . . . . . . 3 a a 3 3 3 3 a . 
        . . . . . . . . a 3 3 3 3 3 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . a 3 3 3 3 3 . . 
        . . . . . . . 3 a a 3 3 3 3 a . 
        . . . . . . 3 3 3 a a 3 3 a a 3 
        . . . . . . 3 3 3 3 . . a a 3 3 
        . . . . . . 3 3 3 . . . . 3 3 3 
        . . . . . . a a a . . . . 3 3 3 
        . 3 . . . . a a a . . . . a a a 
        3 3 3 . . . 3 3 3 . . . . a a a 
        3 3 3 . . . 3 3 3 . . . . 3 3 3 
        a a a . . . 3 3 3 . . . . 3 3 3 
        a a a . . . a a a . . . . . 3 . 
        3 3 3 . . . a a a . . . . . . . 
        3 3 3 a . 3 3 3 3 . . . . . . . 
        3 3 a a a 3 3 3 3 . . . . . . . 
        . a a a 3 3 3 3 . . . . . . . . 
        . . a 3 3 3 3 . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . a 3 3 3 3 3 . . 
        . . . . . . . 3 a a 3 3 3 3 a . 
        . . . . . . 3 3 3 a a 3 3 a a 3 
        . . . . . . 3 3 3 3 . . a a 3 3 
        . 3 . . . . a a a . . . . 3 3 3 
        3 3 3 . . . a a a . . . . a a a 
        a a a . . . 3 3 3 . . . . a a a 
        3 3 3 . . . a a a . . . . 3 3 3 
        3 3 3 a . 3 3 3 3 . . . . . 3 . 
        3 3 a a a 3 3 3 3 . . . . . . . 
        . a a a 3 3 3 3 . . . . . . . . 
        . . a 3 3 3 3 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    true
    )
}
info.startCountup()
game.onUpdate(function () {
    if (currentLightOn == 2 && (ghost.vx != 0 || ghost.vy != 0)) {
        VIOLATION()
    }
})
forever(function () {
    updateLight()
    pause(3000 + randint(0, 4000))
    currentLightOn = (currentLightOn + 1) % 3
    updateLight()
    for (let index = 0; index < 8; index++) {
        music.playTone(523, 100)
        pause(100)
    }
    currentLightOn = (currentLightOn + 1) % 3
    updateLight()
    if (STRIKES_REMAINING == 7) {
        music.playTone(988, 100)
    } else if (STRIKES_REMAINING == 6) {
        music.playTone(880, 100)
    } else if (STRIKES_REMAINING == 5) {
        music.playTone(784, 100)
    } else if (STRIKES_REMAINING == 4) {
        music.playTone(698, 100)
    } else if (STRIKES_REMAINING == 3) {
        music.playTone(659, 100)
    } else if (STRIKES_REMAINING == 2) {
        music.playTone(587, 100)
    } else {
        music.playTone(523, 100)
    }
    pause(2000)
    currentLightOn = (currentLightOn + 1) % 3
    music.playTone(440, 100)
})
game.onUpdateInterval(30000, function () {
    item += 20
})
