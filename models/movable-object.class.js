class MovableObjects extends DrawableObject {
    speed = 0.15;
    otherDiretion = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coin = 0;
    bottle = 0;
    chickenEnergy = 10;

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    }

    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 132;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.width > mo.x + mo.offset.x &&
               this.y + this.height - this.offset.height > mo.y + mo.offset.y &&
               this.x + this.offset.x < mo.x + mo.width - mo.offset.x &&
               this.y + this.offset.y < mo.y + mo.height - mo.offset.y; 
    }

    hit() {
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitChicken() {
        this.chickenEnergy -= 10;
        if (this.chickenEnergy <= 0) {
            this.chickenEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    oneShot() {
        this.energy -= 100;
        if (this.energy <= 0) {
            this.energy = 0;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    chickenDead() {
        return this.chickenEnergy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    colectCoins() {
        this.coin += 10;
        this.coin_sound.play();
    }

    colectBottles() {
        this.bottle += 10;
        this.bottle_sound.play();
    }


    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
    
}