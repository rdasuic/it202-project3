const canvas = document.querySelector("#game"), ctx = canvas.getContext("2d");
canvas.focus();
let player = {
    health: 100,
    x: 0,
    y: 0,
    score: 0,
    harmsHit: 0,
    benefitsHit: 0,
    speed: 1,
    lives: 3,
    width: playerSprite.width
}
let game = {
    level: 1,
    state: 0 // 0 == alive, 1 == dead
}

const benefitObjs = [
    {
        spriteId: sbSprite,
        pointValue: 10,
        x: 0,
        y: 10
    },
    {
        spriteId: boneSprite,
        pointValue: 10,
        x: 0,
        y: 10
        
    }
]
const harmObjs = [
    {
        spriteId: rockSprite,
        x: 0,
        y: 0
    },
]
// obj of possible keys the user can press
const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false
}

// sets init game obj locations
const init = () => {
    player.x = canvas.width / 2;
    player.y = canvas.height - 150;
}
init();

// detect keypress globally and modify the keypress obj
document.addEventListener('keydown', (ev) => {
    let kc = ev.keyCode;
    if (kc === 32) keys.space = true;
    else if (kc === 37) keys.left = true; 
    else if (kc === 38) keys.up = true;    
    else if (kc === 39) keys.right = true;
    else if (kc === 40) keys.down = true;
})
document.addEventListener('keyup', (ev) => {
    let kc = ev.keyCode;
    if (kc === 32) keys.space = false;
    else if (kc === 37) keys.left = false; 
    else if (kc === 38) keys.up = false;    
    else if (kc === 39) keys.right = false;
    else if (kc === 40) keys.down = false;
})


const dropBenefitObj = (x) => {
    let randBenefitObj = benefitObjs[Math.floor(Math.random()*benefitObjs.length)];
    ctx.drawImage(benefitObj1Sprite, x, randBenefitObj.y, benefitObj1Sprite.naturalWidth*.3, benefitObj1Sprite.naturalHeight*.3);
    return randBenefitObj;
}
const pickRandBenefitObj = () => {
    let randBenefitObj = benefitObjs[Math.floor(Math.random()*benefitObjs.length)];
    return randBenefitObj;
}
const pickRandHarmObj = () => {
    let randHarmObj = harmObjs[Math.floor(Math.random()*harmObjs.length)];
    return randHarmObj;
}
const isPlayerCollidedWithObj = (obj) => {
    return (!((obj.x > player.width + player.x) || (player.x > obj.spriteId.width + obj.x)) && //checks x bounds
       (obj.y - obj.spriteId.height + playerSprite.height >= 0))  //checks y bounds 
}
const isPlayerLeftEdgeCollision = () => {
    return (player.x <= 0) 
}
const isPlayerRightEdgeCollison = () => {
    return (playerSprite.width - player.x <= 0)
}
const showStartScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "15px Helvetica";
    ctx.fillStyle = "Purple";
    ctx.fillText("Use the left and right arrow keys to hit harm/benefit objects", 100, 400);
    ctx.fillText("Take a guess as to which objects might help or hurt you!", 100, 500);
    ctx.fillText("Press the spacebar to start", 250, 600);
}
const showGameOverScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "25px Helvetica";
    ctx.fillStyle = "Purple";
    ctx.fillText("You lost", 100, 400);
}

let currentBenefitObj = pickRandBenefitObj();
let currentHarmObj = pickRandHarmObj();
let randXForBenefit = Math.floor(Math.random()*canvas.width);
let randXForHarm = Math.floor(Math.random()*canvas.width);
currentBenefitObj.x = randXForBenefit;
currentHarmObj.x = randXForHarm;
// main game loop
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the player
    ctx.drawImage(playerSprite, player.x, player.y, playerSprite.naturalWidth * .25, playerSprite.naturalHeight * .25);    
    // draw the benefit obj
    ctx.drawImage(currentBenefitObj.spriteId, currentBenefitObj.x, currentBenefitObj.y, currentBenefitObj.spriteId.naturalWidth * .15, currentBenefitObj.spriteId.naturalHeight * .15);
    // draw the harm obj
    ctx.drawImage(rockSprite, currentHarmObj.x, currentHarmObj.y, currentHarmObj.spriteId.naturalWidth * .15, currentHarmObj.spriteId.naturalHeight * .15);
    // move the player
    if(keys.left) {
        if(isPlayerLeftEdgeCollision()) {
            player.x = player.x;
        }
        else {
            player.x -= player.speed;
        }             
    }
    else if (keys.right) {
        if(isPlayerRightEdgeCollison()) {
            player.x = player.x
        }
        else {
            player.x += player.speed;
        }
    }
    // move the objs
    currentBenefitObj.y++;
    currentHarmObj.y++;
    if(isPlayerCollidedWithObj(currentBenefitObj)) {
        player.score++;
        currentBenefitObj.y = 0;
        currentBenefitObj = pickRandBenefitObj();
        randXForBenefit = Math.floor(Math.random()*canvas.width);
        currentBenefitObj.x = randXForBenefit;
    }
    if(isPlayerCollidedWithObj(currentHarmObj)) {
        player.score--;
        player.lives--;
        currentHarmObj.y = 0;
        currentHarmObj = pickRandHarmObj();
        randXForHarm = Math.floor(Math.random()*canvas.width);
        currentHarmObj.x = randXForHarm;
    }
    
    // when the obj scrolls past the screen
    if(currentBenefitObj.y == canvas.height) {
        currentBenefitObj.y = 0;
        currentBenefitObj = pickRandBenefitObj();
        randXForBenefit = Math.floor(Math.random()*canvas.width);
        currentBenefitObj.x = randXForBenefit;
    }
    if(currentHarmObj.y == canvas.height) {
        currentHarmObj.y = 0;
        currentHarmObj = pickRandHarmObj();
        randXForHarm = Math.floor(Math.random()*canvas.width);
        currentHarmObj.x = randXForHarm;
        console.log(currentBenefitObj);
        console.log(currentHarmObj);
    }
    if(player.lives <= 0) {
        window.cancelAnimationFrame(draw);
        showGameOverScreen();
    }
    window.requestAnimationFrame(draw);
}
// show the tutorial initially
// showStartScreen();
// // start the game loop 
// if(keys.space) {
//     console.log("press");
//     draw();
// }
draw();
