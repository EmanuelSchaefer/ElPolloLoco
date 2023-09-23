class World {
    level = level1;
    character = new Character();
    endboss = new Endboss();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    sauceBar = new SauceBar();
    bossBar = new BossBar();
    throwableObjects = new ThrowableObject();
    throwableObjects = [];
    keyboard;
    ctx;
    canvas;
    energy;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.collectedBottles = 0;
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.coinsCollisions();
            this.bottlesCollisions();
            this.endbossCollisionsBottle();
            this.endbossHitCharacter();
            this.pushBottle();
        }, 200);
    }


    pushBottle() {
        if (this.sauceBar.bottle > 0 && this.keyboard.D && this.collectedBottles > 0) {
            const newBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(newBottle);
            this.sauceBar.bottle -= 10;
            this.character.bottle -= 10;
            this.sauceBar.setPERCENTage(this.character.bottle); // Den aktualisierten Wert übergeben von character.bottle
            this.collectedBottles--;
        } else if (this.sauceBar.bottle === 0 && this.collectedBottles === 0) {
            this.keyboard.D = false;
        }
    }


    // COLLISIONS //
    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {            // über dem Boden
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.character.jump();
                enemy.hitChicken();
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 500)                                            // nicht über dem Boden
            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround() && this.character.energy > 0 && enemy.energy > 0) {
                this.characterHIT();
            }
        });
    }

    characterHIT() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    coinsCollisions() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.character.colectCoins();
                this.coinBar.percentAge(this.character.coin);
                this.level.coins.splice(i, 1);
            }
        });
    }

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

    endbossCollisionsBottle() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                this.throwableObjects.splice(0, 1);
                //    this.bossBar.percentAge(this.endboss.energy); 
            }
        });
    }

    endbossHitCharacter() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            // this.endboss.attackEndboss();
            this.character.oneShot();
        }
    }

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


        // Draw() wird immer wieder aufgerufen 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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