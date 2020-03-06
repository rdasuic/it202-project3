// this script loads in all the images
// loads in the player sprite
let playerSprite = new Image();
playerSprite.src = "./assets/dog.png";
playerSprite.addEventListener('load', () => {
    // the game 'starts' after the player sprite loads in
    window.requestAnimationFrame(draw);
}, false)
//loads in the  benefit objs
let sbSprite = new Image();
sbSprite.src = "./assets/benefit/sb.png";

let boneSprite = new Image();
boneSprite.src = "./assets/benefit/bone.png";

let rockSprite = new Image();
rockSprite.src = "./assets/harm/rock.png";