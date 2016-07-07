//160701_0200_Bill_SwiftSwallow2_actionjs
// Sprite variables
var
    birdSprite,
    boomSprites,
    backgroundSprite,
    foregroundSprite,
    topCoralSprite,
    bottomCoralSprite,
    textSprites,
    scoreSprite,
    splashScreenSprite,
    okButtonSprite,
    smallNumberSprite,
    largeNumberSprite;

/**
 * Sprite class
 * @param {Image} img - sprite sheet image
 * @param {number} x - x-position in sprite sheet
 * @param {number} y - y-position in sprite sheet
 * @param {number} width - width of sprite
 * @param {number} height - height of sprite
 */
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x * 2;
    this.y = y * 2;
    this.width = width * 2;
    this.height = height * 2;
}

/**
 * Draw sprite to canvas context
 *
 * @param {CanvasRenderingContext2D} renderingContext context used for drawing
 * @param {number} x   x-position on canvas to draw from
 * @param {number} y   y-position on canvas to draw from
 */
Sprite.prototype.draw = function (renderingContext, x, y) {
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height,
        x, y, this.width, this.height);
};

/**
 * Initate all sprite
 * @param {Image} img spritesheet image
 */
function initSprites(img) {
    birdSprite = [
        new Sprite(img, 320, 5, 55, 40),
        new Sprite(img, 320, 65, 55, 40),
        new Sprite(img, 320, 115, 55, 40),
        new Sprite(img, 320, 170, 55, 40),
        new Sprite(img, 320, 215, 55, 40),
        new Sprite(img, 320, 260, 55, 40),
        new Sprite(img, 320, 310, 55, 40)
    ];
    boomSprites = [
//                     lr  ud     w    h
        new Sprite(img, 5, 128, 13.5, 26),
        new Sprite(img, 5, 128, 13.5, 26),
        new Sprite(img, 5, 128, 13.5, 26),
        new Sprite(img, 5, 128, 13.5, 26),
        new Sprite(img, 5, 128, 13.5, 26),
        new Sprite(img, 5, 128, 13.5, 26),
        new Sprite(img, 5, 128, 13.5, 26),
        new Sprite(img, 5, 128, 13.5, 26),
        new Sprite(img, 18, 128, 13.5, 26),
        new Sprite(img, 18, 128, 13.5, 26),
        new Sprite(img, 18, 128, 13.5, 26),
        new Sprite(img, 18, 128, 13.5, 26),
        new Sprite(img, 18, 128, 13.5, 26),
        new Sprite(img, 18, 128, 13.5, 26),
        new Sprite(img, 18, 128, 13.5, 26),
        new Sprite(img, 18, 128, 13.5, 26),
        new Sprite(img, 33, 128, 13.5, 26),
        new Sprite(img, 33, 128, 13.5, 26),
        new Sprite(img, 33, 128, 13.5, 26),
        new Sprite(img, 33, 128, 13.5, 26),
        new Sprite(img, 33, 128, 13.5, 26),
        new Sprite(img, 33, 128, 13.5, 26),
        new Sprite(img, 33, 128, 13.5, 26),
        new Sprite(img, 33, 128, 13.5, 26),
        new Sprite(img, 47, 126, 13.5, 27),
        new Sprite(img, 47, 126, 13.5, 27),
        new Sprite(img, 47, 126, 13.5, 27),
        new Sprite(img, 47, 126, 13.5, 27),
        new Sprite(img, 47, 126, 13.5, 27),
        new Sprite(img, 47, 126, 13.5, 27),
        new Sprite(img, 47, 126, 13.5, 27),
        new Sprite(img, 47, 126, 13.5, 27),
        new Sprite(img, 61, 125, 14, 29),
        new Sprite(img, 61, 125, 14, 29),
        new Sprite(img, 61, 125, 14, 29),
        new Sprite(img, 61, 125, 14, 29),
        new Sprite(img, 76, 125, 13.5, 29),
        new Sprite(img, 76, 125, 13.5, 29),
        new Sprite(img, 76, 125, 13.5, 29),
        new Sprite(img, 76, 125, 13.5, 29),
        new Sprite(img, 91, 125, 13.5, 29),
        new Sprite(img, 91, 125, 13.5, 29),
        new Sprite(img, 91, 125, 13.5, 29),
        new Sprite(img, 91, 125, 13.5, 29),
        new Sprite(img, 105, 125, 14, 29),
        new Sprite(img, 105, 125, 14, 29),
        new Sprite(img, 105, 125, 14, 29),
        new Sprite(img, 105, 125, 14, 29),
        new Sprite(img, 120, 124, 13.5, 29.5),
        new Sprite(img, 120, 124, 13.5, 29.5),
        new Sprite(img, 120, 124, 13.5, 29.5),
        new Sprite(img, 120, 124, 13.5, 29.5),
        new Sprite(img, 135, 125, 13.5, 29),
        new Sprite(img, 135, 125, 13.5, 29),
        new Sprite(img, 135, 125, 13.5, 29),
        new Sprite(img, 135, 125, 13.5, 29),
        new Sprite(img, 149, 125, 13.5, 29),
        new Sprite(img, 149, 125, 13.5, 29),
        new Sprite(img, 149, 125, 13.5, 29),
        new Sprite(img, 149, 125, 13.5, 29),
        new Sprite(img, 163.5, 125, 14, 25),
        new Sprite(img, 163.5, 125, 14, 25),
        new Sprite(img, 163.5, 125, 14, 25),
        new Sprite(img, 163.5, 125, 14, 25),
        new Sprite(img, 178, 125, 14, 25),
        new Sprite(img, 178, 125, 14, 25),
        new Sprite(img, 178, 125, 14, 25),
        new Sprite(img, 178, 125, 14, 25),
        new Sprite(img, 193, 124, 14, 25),
        new Sprite(img, 193, 124, 14, 25),
        new Sprite(img, 193, 124, 14, 25),
        new Sprite(img, 193, 124, 14, 25),
        new Sprite(img, 208, 127, 13, 24),
        new Sprite(img, 208, 127, 13, 24),
        new Sprite(img, 208, 127, 13, 24),
        new Sprite(img, 208, 127, 13, 24),
        new Sprite(img, 223, 126, 13, 24),
        new Sprite(img, 223, 126, 13, 24),
        new Sprite(img, 223, 126, 13, 24),
        new Sprite(img, 223, 126, 13, 24),
        new Sprite(img, 239, 125, 13, 23),
        new Sprite(img, 239, 125, 13, 24),
        new Sprite(img, 239, 125, 13, 23),
        new Sprite(img, 239, 125, 13, 24),
        new Sprite(img, 254, 128, 13, 24),
        new Sprite(img, 254, 128, 13, 24),
        new Sprite(img, 254, 128, 13, 24),
        new Sprite(img, 254, 128, 13, 24)
    ];
//
//                                      v  h   w     h
    backgroundSprite = new Sprite(img, 0, 8, 160, 106);
    backgroundSprite.color = "#B8EFF5"; // save background color
    foregroundSprite = new Sprite(img, 25, 500, 210, 5);  // foreground gone
//    foregroundSprite = new Sprite(img, 25, 120, 210, 5);  // before sinking foreground
//    foregroundSprite = new Sprite(img, 25, 120, 310, 15); // with coral original

    topCoralSprite = new Sprite(img, 251, 0, 26, 200);
    bottomCoralSprite = new Sprite(img, 277, 0, 26, 200);

    textSprites = {
        floppybird: new Sprite(img, 59, 114, 96, 22),
        gameOver: new Sprite(img, 59, 136, 94, 19),
        getReady: new Sprite(img, 59, 155, 87, 22)
    };

//    topCoralSprite = new Sprite(img, 251, 0, 26, 200);
//    bottomCoralSprite = new Sprite(img, 277, 0, 26, 200);
    topCoralSprite = new Sprite(img, 375, 100, 35, 210);
    bottomCoralSprite = new Sprite(img, 375, 100, 35, 210);


    okButtonSprite = new Sprite(img, 250, 308, 40, 14);

    scoreSprite = new Sprite(img, 138, 56, 113, 58);
    splashScreenSprite = new Sprite(img, 0, 114, 59, 49);
}

//function initBoomSprites(img){
    /////// new 160627-Trent 6/6
//    boomSprite = [
//        new Sprite(img, 320, 170, 55, 40),
//        new Sprite(img, 320, 170, 55, 40),
//        new Sprite(img, 320, 170, 55, 40)
//    ];
//////////////////////////

//make everything animated again
$(".animated").css('animation-play-state', 'running');
$(".animated").css('-webkit-animation-play-state', 'running');