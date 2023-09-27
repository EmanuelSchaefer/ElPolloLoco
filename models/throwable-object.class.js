class ThrowableObject extends MovableObjects {

    IMAGE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset = {
        x: 20,
        y: 20,
        width: 28,
        height: 5
    };

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_ROTATION);
        this.loadImages(this.IMAGE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.trow();
        this.animate();
    }

    trow() {
        this.speedY = 23;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_ROTATION);
            this.aniamteBOTTLEsplash();
        }, 100);
    }

    aniamteBOTTLEsplash() {
        if (this.bottleHIT()) {
            this.playAnimation(this.IMAGE_SPLASH);
        }
    }

    bottleHIT() {
        return this.groundHIT();
    }

    groundHIT() {
        if (this.y > 400 && this.y < 490) {
            return true;
        }
    }

}