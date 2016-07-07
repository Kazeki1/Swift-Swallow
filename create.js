/*160702_0500_Bill_SwiftSwallow2_createjs */
var
    canvas,
    renderingContext,
    width,
    height,
    okButton,
    foregroundPosition = 0,
    frames = 0, // Counts the number of frames rendered.
    bird,    // The playable bird character
    corals,
    inputEvent,
    currentState, // State vars
    ptsHigh = 0,
    groundcrash,
    localframe,
    boom,
    thud,
    thudPlay,
    ptsAll = 0,
    states = {    // game has three states:
        Splash: 0,  // the splash screen
        Game: 1,    // gameplay, and
        Score: 2    //the score display.
    };

/*1 Initiates the game. */
function main() {
    windowSetup();
    canvasSetup();
    currentState = states.Splash; // Game begins at the splash screen.
    document.body.appendChild(canvas); // Append the canvas we've created to the body element in our HTML document.
    bird = new Bird();
    corals = new CoralCollection();
    boom = new Boom();
    thud = new sound("sound/thud.wav");
    thudPlay = 0;
    loadGraphics();
}

/*2. Sets the canvas dimensions based on the window dimensions and registers the event handler. */
function windowSetup() {
    // Retrieve the width and height of the window
    width = window.innerWidth;
    height = window.innerHeight;
    // Set the width and height if we are on a display with a width > 500px (e.g., a desktop or tablet environment).
    var inputEvent = "touchstart";
    if (width >= 500) {
        width = 630;
        height = 430;
        inputEvent = "mousedown";
    }
    document.addEventListener(inputEvent, onpress);
}

/**
 * Called on mouse or touch press. Update and change state depending on current game state.
 * @param  {MouseEvent/TouchEvent} evt - the onpress event
 */
function onpress(evt) {
    var lastDownTarget, canvas;
    document.addEventListener('mousedown', function(event) {
        lastDownTarget = event.target;
        thudPlay = 0;
    }, false);

    document.addEventListener('keydown', function(event) {
        if(lastDownTarget == canvas) {
            if (event.keyCode == "38") {
                switch (currentState) {
                    case states.Splash: // Start the game and update the bird velocity.
                        currentState = states.Game;
                        bird.jump();
                        break;
                    case states.Game: // The game is in progress. Update bird velocity.
                        bird.jump();
                        break;
                    case states.Score: // Change from score to splash state if event within okButton bounding box
                        // Get event position
                        var mouseX = evt.offsetX, mouseY = evt.offsetY;
                        if (mouseX == null || mouseY == null) {
                            mouseX = evt.touches[0].clientX;
                            mouseY = evt.touches[0].clientY;
                        }
                        // Check if within the okButton
                        if (okButton.x < mouseX && mouseX < okButton.x + okButton.width &&
                            okButton.y < mouseY && mouseY < okButton.y + okButton.height
                        ) {
                            corals.reset();
                            currentState = states.Splash;
                            boom.y = 375;
                            score = 0;
                        }
                        break;
                }
                // Create a listener on the input event.
                document.addEventListener(inputEvent, onpress);
            }
        }
    }, false);


    if (evt.charCode == undefined) {
        corals.reset();
        currentState = states.Splash;
        score = 0;
        localframe = 0;
    }
    var key = evt.keyCode;
    if (key === 32) {
    }
//    }
}

/*3. Creates the canvas. */
function canvasSetup() {
    canvas = document.createElement("canvas");
    canvas.style.border = "0 solid #382b1d";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");
}

/*4. Load Graphics */
function loadGraphics() {
    // Initiate graphics and ok button
    var img = new Image();
    img.src = "images/sheet.png";
    img.onload = function () {
        /*5 birdsprite initSprites */
        initSprites(this);
        renderingContext.fillStyle = backgroundSprite.color;
        okButton = {
            x: (width - okButtonSprite.width) / 2,
            y: height - 200,
            width: okButtonSprite.width,
            height: okButtonSprite.height
        };
        gameLoop();
    };
//    moveCloud1();
//    moveCloud2();
    moveCloud3();
    moveCloud4();
}
/*6. game loop - update and render all sprites before the window repaints. */
function gameLoop() {
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

/*7. Update - all moving sprites: foreground, bird, and corals */
function update() {
    frames++;
    if (currentState !== states.Score) {
        foregroundPosition = (foregroundPosition + 1) % 14; // shaker speed: Move left two px each frame. Wrap every 14px.
    }
    if (currentState === states.Game) {
        corals.update();
    }
    bird.update();
}

/*8. render - re-draw the game view. */
function render() {
    // Draw background color
    renderingContext.fillRect(0, 0, width, height);
    // Draw background sprites
    backgroundSprite.draw(renderingContext, 0, height - backgroundSprite.height);
    backgroundSprite.draw(renderingContext, backgroundSprite.width, height - backgroundSprite.height);
    corals.draw(renderingContext);
    bird.draw(renderingContext);
    if (currentState === states.Score) {
///// Inside render() ///////////////////////////////////
        if(groundcrash) {
            boom.draw(renderingContext);
        }
//////////////////////////////////////////////////////////
        groundcrash = false;
        okButtonSprite.draw(renderingContext, okButton.x, okButton.y);
    }
    // Draw foreground sprites
    foregroundSprite.draw(renderingContext, foregroundPosition, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width, height - foregroundSprite.height);
}

var pts = 0;
function CoralCollection() {
    this._corals = [];
    /* Empty corals array */
    this.reset = function () {
        this._corals = [];
//        this._boom = [];
    };
    /* Creates and adds a new Coral to the game. */
    this.add = function () {
        this._corals.push(new Coral()); // Create and push coral to array
    };
    /** Update the position of existing corals and add new corals when necessary. */
    this.update = function () {
        if (frames % 100 === 0) { // Add a new coral to the game every 100 frames.
            this.add();
        }
        for (var i = 0, len = this._corals.length; i < len; i++) { // Iterate through the array of corals and update each.
            var coral = this._corals[i]; // The current coral.
            if (i === 0) { // If this is the leftmost coral, it is the only coral that the bird can collide with . . .
                coral.detectCollision(); // . . . so, determine if the bird has collided with this leftmost coral.
            }
            coral.x -= 2; // Each frame, move each coral two pixels to the left. Higher/lower values change the movement speed.
            if (coral.x < -coral.width) { // If the coral has moved off screen . . .
                this._corals.splice(i, 1); // . . . remove it.
                pts = pts + 1;
                document.getElementById("boxP").innerHTML = pts;
                i--;
                len--;
            }
        }
    };

    /* Draw all corals to canvas context. */
    this.draw = function () {
        for (var i = 0, len = this._corals.length; i < len; i++) {
            var coral = this._corals[i];
            coral.draw();
        }
    };
}

/*The Coral class - creates instances of Coral. */
function Coral() {
    this.x = 500;
    this.y = height - (topCoralSprite.height + foregroundSprite.height + 120 + 200 * Math.random());
    this.width = bottomCoralSprite.width;
    this.height = bottomCoralSprite.height;

    /* Determines if the bird has collided with the Coral.
     * Calculates x/y difference and use normal vector length calculation to determine */
    this.detectCollision = function () {
        // intersection
        var cx = Math.min(Math.max(bird.x, this.x), this.x + this.width);
        var cy1 = Math.min(Math.max(bird.y, this.y), this.y + this.height);
        var cy2 = Math.min(Math.max(bird.y, this.y + this.height + 110), this.y + 2 * this.height + 80);
        // Closest difference
        var dx = bird.x - cx;
        var dy1 = bird.y - cy1;
        var dy2 = bird.y - cy2;
        // Vector length
        var d1 = dx * dx + dy1 * dy1;
        var d2 = dx * dx + dy2 * dy2;
        var r = bird.radius * bird.radius;
        // Determine intersection
        if (r > d1 || r > d2) {
            currentState = states.Score;
            document.getElementById("boxS").innerHTML = ptsAll + pts;
            if (ptsHigh <= pts) {
                ptsHigh = pts;
                localStorage.setItem("highscore", ptsHigh);
                document.getElementById("boxHS").innerHTML = ptsHigh;
            }
            pts = 0;
            document.getElementById("boxP").innerHTML = pts;
        }
    };

    this.draw = function () {
//        bottomCoralSprite.draw(renderingContext, this.x, this.y);
//        topCoralSprite.draw(renderingContext, this.x, this.y + 110 + this.height);
        topCoralSprite.draw(renderingContext, this.x, this.y);
        bottomCoralSprite.draw(renderingContext, this.x, this.y + 110 + this.height);
    }
}

function initHighScore(){
    var high = localStorage.getItem("highscore");
    ptsHigh = high;
    document.getElementById("boxHS").innerHTML = ptsHigh;
}

/**
 * Bird class. Creates instances of Bird.
 * @constructor
 * */
function Bird() {
    this.x = 140;
    this.y = 0;
    this.frame = 0;
    this.velocity = 0;
    this.animation = [0, 1, 2, 3, 4, 5, 6]; // The animation sequence
    this.rotation = 0;
    this.radius = 12;
    this.gravity = 0.25;
    this._jump = 4.6;
    /*Makes the Bird jump*/
    this.jump = function () {
        this.velocity = -this._jump;
    };

    /*Update sprite animation and position of Bird*/
    this.update = function () {
        // Play animation twice as fast during game state
        var n = currentState === states.Splash ? 8 : 5;
        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;
        if (currentState === states.Splash) {
            this.updateIdleBird();
        } else { // Game state
            this.updatePlayingBird();
        }
    };

    /*Runs the bird through its idle animation.*/
    this.updateIdleBird = function () {
        this.y = height - 280 + 5 * Math.cos(frames / 10);
        this.rotation = 0;
    };

    /*Determines bird animation for the player-controlled bird.*/
    this.updatePlayingBird = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;
        // Change to the score state when bird touches the ground
        if (this.y >= height - foregroundSprite.height - 10) {
            this.y = height - foregroundSprite.height + 30;
            boom.y = 375;
            groundcrash = true;  //new 160627-Trent
            if (currentState === states.Game) {
                currentState = states.Score;
                document.addEventListener(inputEvent, onpress);
            }
            this.velocity = this._jump; // Set velocity to jump speed for correct rotation
        }
        // If our player hits the top of the canvas, we crash him
        if (this.y <= 2) {
            currentState = states.Score;
            pts = 0;
            document.getElementById("boxP").innerHTML = pts;
        }
        // When bird lacks upward momentum increment the rotation angle
        if (this.velocity >= this._jump) {
            this.frame = 1;
            this.rotation = Math.min(Math.PI / 2, this.rotation + 0.3);
        } else {
            this.rotation = -0.3;
        }
    };

    /**
     * Draws Bird to canvas renderingContext
     * @param  {CanvasRenderingContext2D} renderingContext the context used for drawing
     * when we call bird.draw, we are calling this.draw function*/
    this.draw = function (renderingContext) {
        renderingContext.save();
        // translate and rotate renderingContext coordinate system
        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);
        var n = this.animation[this.frame];
        // draws the bird with center in origo
        birdSprite[n].draw(renderingContext, -birdSprite[n].width / 2, -birdSprite[n].height / 2);
        renderingContext.restore();
    };
}

function Boom() {
    this.x = 125;
    this.y = 375;
    this.velocity = -50;
    localframe =0;  // necessary
    this.draw = function(renderingContext){
        if(localframe < boomSprites.length) {
            this.y -= .5;   // '-=' controls the rising speed of boom cloud
            boomSprites[localframe].draw(renderingContext, this.x, this.y);
            localframe++;
        }
        if(thudPlay === 0){
            thud.play();
            thudPlay = thudPlay + 1
        }
    };
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    }
}



function moveCloud1() {
    var elem = document.getElementById("i1");
    var pos1 = 1400;
    var tpos1 = 100;
    var id = setInterval(frame1, 4);  //cloud speed

    function frame1() {
        if (pos1 == 200) {
            //           clearInterval(id);
            pos1 = 1400;
            if(tpos1 >= 150) {
                tpos1 = 100;
            }else{
                tpos1 = tpos1 + 20;
            }
        } else {
            pos1--;
            elem.style.top = tpos1 + 'px';
            elem.style.left = pos1 + 'px';
        }
    }
}

function moveCloud2() {
    var elem = document.getElementById("i2");
    var pos2 = 1400;
    var tpos2 = 80;
    var id = setInterval(frame2, 6);  //cloud speed

    function frame2() {
        if (pos2 == 200) {
            //           clearInterval(id);
            pos2 = 1400;
            if(tpos2 >= 150) {
                tpos2 = 80;
            }else{
                tpos2 = tpos2 + 20;
            }
        } else {
            pos2--;
            elem.style.top = tpos2 + 'px';
            elem.style.left = pos2 + 'px';
        }
    }
}

function moveCloud3() {
    var elem = document.getElementById("i3");
    var pos3 = 1400;
    var tpos3 = 60;
    var id = setInterval(frame3, 8);  //cloud speed

    function frame3() {
        if (pos3 == 200) {
            //           clearInterval(id);
            pos3 = 1400;
            if(tpos3 >= 150) {
                tpos3 = 60;
            }else{
                tpos3 = tpos3 + 20;
            }
        } else {
            pos3--;
            elem.style.top = tpos3 + 'px';
            elem.style.left = pos3 + 'px';
        }
    }
}

function moveCloud4() {
    var elem = document.getElementById("i4");
    var pos4 = 1400;
    var tpos4 = 40;
    var id = setInterval(frame4, 10);  //cloud speed

    function frame4() {
        if (pos4 == 200) {
            //           clearInterval(id);
            pos4 = 1400;
            if(tpos4 >= 150) {
                tpos4 = 40;
            }else{
                tpos4 = tpos4 + 20;
            }
        } else {
            pos4--;
            elem.style.top = tpos4 + 'px';
            elem.style.left = pos4 + 'px';
        }
    }
}

