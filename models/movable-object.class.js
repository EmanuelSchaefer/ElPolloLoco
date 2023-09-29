/**
 * Display animated objects on the canvas.
 * Extends the DrawableObject class.
 */
class MovableObjects extends DrawableObject {
     /**
    * The speed of the movable-object moves.
    * @type {number}
    */
    speed = 0.15;
    otherDiretion = false;
     /**
    * The vertical speed of the movable object (jump).
    * @type {number}
    */
    speedY = 0;
     /**
    * The acceleration value for gravity.
    * @type {number}
    */
    acceleration = 2.5;
     /**
     * The energy for (character & endboss).
     * @type {number}
     */
    energy = 100;
     /**
    * The last hit received by the moving object.
    * @type {number}
    */
    lastHit = 0;
     /**
    * The amount of coins collected.
    * @type {number}
    */
    coin = 0;
     /**
    * The amount of bottle collected.
    * @type {number}
    */
    bottle = 0;
     /**
    * The energy for the chicken.
    * @type {number}
    */
    chickenEnergy = 10;

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    }

     /**
    * The audio sounds for the coin and bottle.
    * @type {HTMLAudioElement}
    */
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');

    /**
    *Applies gravity to the moving object so that it falls if it is not on the ground or lying.
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the movable object is above the ground.
     * @returns {boolean} True if the movable object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 132;
        }
    }

    /**
    * Checks if the movable object is colliding with another object.
    * @param {DrawableObject} mo - The other object to check collision with.
    * @returns {boolean} True if the movable object is colliding with the other object, false otherwise.
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.width > mo.x + mo.offset.x &&
               this.y + this.height - this.offset.height > mo.y + mo.offset.y &&
               this.x + this.offset.x < mo.x + mo.width - mo.offset.x &&
               this.y + this.offset.y < mo.y + mo.height - mo.offset.y; 
    }

    /**
    * The moving object takes a hit.
    * Reduces energy level and updates last hit timestamp.
    */
    hit() {
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * The chicken object takes a hit.
    * Reduces energy level and updates last hit timestamp.
    */
    hitChicken() {
        this.chickenEnergy -= 10;
        if (this.chickenEnergy <= 0) {
            this.chickenEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * The object only needs one hit.
    * Reduces energy level and updates the last hit.
    */
    oneShot() {
        this.energy -= 100;
        if (this.energy <= 0) {
            this.energy = 0;
        }
    }

    /**
    * Checks whether the moving object is damaged or injured.
    * @returns {boolean} True if the moving object is violated, otherwise false.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    /**
     * Checks if the movable object is dead (energy level is zero).
     * @returns {boolean} True if the movable object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the chicken is dead (energy level is zero).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    chickenDead() {
        return this.chickenEnergy == 0;
    }

    /**
    * Plays the animation of the movable object using the provided images.
    * @param {string[]} images - An array of image paths representing the animation frames.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * One coin collected plus 10.
     * The “coin_sound” sounds once for each coin collected.
     */
    colectCoins() {
        this.coin += 10;
        this.coin_sound.play();
    }

    /**
     * One bottle collected plus 10.
     * The “bottle_sound” sounds once for each coin collected.
     */
    colectBottles() {
        this.bottle += 10;
        this.bottle_sound.play();
    }

    /**
    * Moves the movable object to the right.
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * Moves the movable object to the left.
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Makes the movable object jump.
    */
    jump() {
        this.speedY = 30;
    }
    
}