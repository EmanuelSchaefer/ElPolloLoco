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

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
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
            this.characterDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    characterDead() {
        music.pause();
        this.world.keyboard = false;
        this.playAnimation(this.IMAGES_DEAD);
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