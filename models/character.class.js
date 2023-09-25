class Character extends MovableObjects {
    height = 300;
    width = 120;
    y = 80;
    speed = 3;
    world;
    offset = {
        x: 25,
        y: 94,
        width: 30,
        height: 5
    };

    walking_sound = new Audio('audio/laufen.mp3');
    jump_sound = new Audio('audio/jumpen.mp3');
    over_sound = new Audio('audio/gameOver.mp3');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveCharacter();
        }, 1000 / 90);

        setInterval(() => {
            this.characterFeeling();
        }, 73);
    }

    moveCharacter() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
        }

        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jump_sound.play();
        }
        this.world.camera_x = -this.x + 100;
    }

    moveRight() {
        super.moveRight();
        this.otherDiretion = false;
        this.walking_sound.play();
    }

    moveLeft() {
        super.moveLeft();
        this.otherDiretion = true;
        this.walking_sound.play();
    }

    characterFeeling() {
        if (this.isDead() && !this.soundPlayed) {
            this.playAnimation(this.IMAGES_DEAD);
            this.characterDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            setTimeout(() => {
                this.isSleep();
            }, 2000);
        }
    }

    isSleep() {  // Ist keine Taste von den Vier gedrückt wir die Animation sleep ausgeführt.
        let right = this.world.keyboard.RIGHT;
        let left = this.world.keyboard.LEFT;
        let space = this.world.keyboard.SPACE;
        let d = this.world.keyboard.D;

        if (!this.isAboveGround() && right == false && left == false && space == false && d == false) {
            this.playAnimation(this.IMAGES_SLEEP);
        }
    }

    characterDead() {
        music.pause();
        this.world.keyboard = false;
        setTimeout(() => {
            this.gameOverScreen();
            this.over_sound.play();
        }, 1000);
        this.soundPlayed = true;
    }

    gameOverScreen() {
        document.getElementById('scrennsOver').classList.remove('d-none');
    }

}