/**
 * Represents the game world.
 */
class World {
    /**
    * The current level of the game.
    * @type {Level}
    */
    level = level1;
    /**
    * The character object representing the Player.
    * @type {Character}
    */
    character = new Character();
    /**
    * The Endboss object representing the enemy ENDBOSS.
    * @type {Endboss}
    */
    endboss = new Endboss();
    /**
    * The status bar for displaying character health.
    * @type {StatusBar}
    */
    statusBar = new StatusBar();
    /**
    * The coin bar for displaying the number of coins.
    * @type {CoinBar}
    */
    coinBar = new CoinBar();
    /**
    * The sauce bar for displaying the number of bottle.
    * @type {SauceBar}
    */
    sauceBar = new SauceBar();
    /**
   * The Endboss health bar.
   * @type {BossBar}
   */
    bossBar = new BossBar();
    /**
    * An array of throwable objects in the world.
    * @type {throwableObjects[]}
    */
    throwableObjects = new ThrowableObject();
    throwableObjects = [];
    /**
    * An array of keyboard in the world.
    * @type {throwableObjects[]}
    */
    keyboard;
    ctx;
    /**
    * An array of cnavas in the world.
    * @type {throwableObjects[]}
    */
    canvas;
    energy;
    camera_x = 0;


    /**
   * Creates a new World instance.
   * displays the canvas in 2d.
   * @param {HTMLCanvasElement} canvas - The game canvas element.
   * @param {Keyboard} keyboard - The keyboard input manager.
   */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.collectedBottles = 0;
    }

    /**
    * Sets the world for character and endboss.
    */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
    * Runs the game loop to check collisions.
    */
    run() {
        setInterval(() => {
            this.pushBottle();
            this.checkCollisions();
            this.coinsCollisions();
            this.bottlesCollisions();
            this.endbossCollisionsBottle();
            this.endbossHitCharacter();
        }, 200);
    }


    /**
    * Checks whether the character throws a bottle and how many you have picked up.
    * The sauceBar is always updated when a bottle is thrown.
    */
    pushBottle() {
        if (this.sauceBar.bottle > 0 && this.keyboard.D && this.collectedBottles > 0) {
            const newBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(newBottle);
            this.sauceBar.bottle -= 10;
            this.character.bottle -= 10;
            this.sauceBar.setPERCENTage(this.character.bottle);
            this.collectedBottles--;
        } else if (this.sauceBar.bottle === 0 && this.collectedBottles === 0) {
            this.keyboard.D = false;
        }
    }


    /**
     * Checks whether there is a collision with the enemies or with the character.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {            // über dem Boden
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.character.jump();
                enemy.hitChicken();
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 70);                                            // nicht über dem Boden
            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround() && this.character.energy > 0 && enemy.energy > 0) {
                this.characterHIT();
            }
        });
    }

    /**
     * character takes damage and it is shown with the statusBar.
     */
    characterHIT() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    /**
     * Checks whether there is a collision with the coin.
     */
    coinsCollisions() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.character.colectCoins();
                this.coinBar.percentAge(this.character.coin);
                this.level.coins.splice(i, 1);
            }
        });
    }

    /**
     * Checks whether there is a collision with the bottle.
     */
    bottlesCollisions() {
        this.level.bottels.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.character.colectBottles();
                this.collectedBottles++;
                this.sauceBar.setPERCENTage(this.character.bottle);
                this.level.bottels.splice(i, 1);
            }
        });
    }

    /**
     * Checks whether a collision has occurred between the bottle and the final boss.
     */
    endbossCollisionsBottle() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                this.throwableObjects.splice(0, 1);
                this.bossBar.percentAge(this.endboss.energy);
            }
        });
    }

    /**
     * Checks whether a collision has occurred between the character and the boss.
     */
    endbossHitCharacter() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            // this.endboss.attackEndboss();
            this.character.oneShot();
        }
    }

    /**
    * Draws the game world and its objects.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Zurück
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.sauceBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0); // Vor

        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottels);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);


        /**
        * Draw() is called again and again
        */
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    * Adds an array of objects to the game map for drawing.
    * @param {Object[]} objects - An array of drawable objects.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Rotates the objects
     * @param {DrawableObject} mo - flip the Image. 
     */
    addToMap(mo) {
        if (mo.otherDiretion) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDiretion) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}