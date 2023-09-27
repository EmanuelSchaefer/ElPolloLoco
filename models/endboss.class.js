class Endboss extends MovableObjects {
    height = 400;
    width = 250;
    x = 2500;
    y = 60;
    world;

    offset = {
        x: 50,
        y: 80,
        width: 30,
        height: 15
    };

    win_sound = new Audio('audio/winnerSound.mp3');
    hit_sound = new Audio('audio/huhn.mp3');

    IMAGES_WALK_BOSS = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_HURT_BOSS = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD_BOSS = [
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALK_BOSS);
        this.loadImages(this.IMAGES_HURT_BOSS);
        this.loadImages(this.IMAGES_DEAD_BOSS);
        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (world.character.x > 1900) {
                setInterval(() => {
                    this.moveLeft();
                    this.speed = 0.13;
                }, 1000 / 60);
            }
        }, 150);

        setInterval(() => {
            this.imagesPlay();
        }, 150);
    }


    imagesPlay() {
        if (this.isDead()) {
            setInterval(() => {
                this.speed = -1;
            });
            this.playAnimation(this.IMAGES_DEAD_BOSS);
            this.gameWin();
            this.world.keyboard = false;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT_BOSS);
            this.soundS();
        } else {
            this.speed = 0;
            this.playAnimation(this.IMAGES_WALK_BOSS);
        }
    }

    gameWin() {
        music.pause();
        setTimeout(() => {
            document.getElementById('winScrenns').classList.remove('d-none');
            this.win_sound.play();
            setTimeout(() => {
                location.reload();
            }, 2800);
            // nach dem sound reload; das gleiche dan auch bei gamo over.
        }, 500);
    }

    soundS() {
        this.hit_sound.play();
        setTimeout(() => {
            this.speed = 0;
        }, 1000);
    }

}