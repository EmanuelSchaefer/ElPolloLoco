/**
* A drawing object that can move on the canvas.
* @extends MovableObject
*/
class Endboss extends MovableObjects {
    /**
    * The height of the endboss.
    * @type {number}
    */
    height = 400;
    /**
    * The width of the endboss.
    * @type {number}
    */
    width = 250;
     /**
    * The x coordinate of the endboss position.
    * @type {number}
    */
    x = 2500;
     /**
    * The y coordinate of the endboss position.
    * @type {number}
    */
    y = 60;
     /**
    * Represents the game world.
    * @type {World}
    */
    world;

    offset = {
        x: 50,
        y: 80,
        width: 30,
        height: 15
    };

     /**
    * The audio sounds for the character.
    * @type {HTMLAudioElement}
    */
    win_sound = new Audio('audio/winnerSound.mp3');
    hit_sound = new Audio('audio/huhn.mp3');

     /**
    * A series of image paths representing the various images of the running endboss.
    * @type {string[]}
    */
    IMAGES_WALK_BOSS = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
      /**
    * A series of image paths representing the various images of the final endboss.
    * @type {string[]}
    */ 
    IMAGES_HURT_BOSS = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
     /**
    * A series of image paths representing the endboss's various dying images.
    * @type {string[]}
    */
    IMAGES_DEAD_BOSS = [
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

     /**
    * Constructs a new Endboss object.
    */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALK_BOSS);
        this.loadImages(this.IMAGES_HURT_BOSS);
        this.loadImages(this.IMAGES_DEAD_BOSS);
        this.x = 2500;
        this.animate();
    }

     /**
    * Animate the endboss through movement and emotion.
    */
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

     /**
    * game won music and won picture is played.
    */
    gameWin() {
        music.pause();
        setTimeout(() => {
            document.getElementById('winScrenns').classList.remove('d-none');
            this.win_sound.play();
            setTimeout(() => {
          //      location.reload();
            }, 2800);
        }, 500);
    }

    /**
     * sound hurt endboss will be played after a second.
     */
    soundS() {
        this.hit_sound.play();
        setTimeout(() => {
            this.speed = 0;
        }, 1000);
    }

}