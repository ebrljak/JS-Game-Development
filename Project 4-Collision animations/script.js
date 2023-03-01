/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;

const explosions = [];
//getBoundingClientRect returns an object provided information
//about the size of an element and its position relative to the viewport
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        //spriteWidth = width of a single frame in sprite sheet
        //sprite sheet is 1000px and has 5 frames => 1000/5
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timer = 0;
    }

    update() {
        this.timer++;
        //run this code every 10 frames
        if(this.timer % 10 === 0) {
            this.frame++;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

window.addEventListener('click', function(e) {
    createAnimation(e);
});

function createAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    //add new axplosion object into array explosions
    explosions.push(new Explosion(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
};

animate();