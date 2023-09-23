class Chicken extends MovableObjects {
    height = 70;
    width = 75;
    y = 360;
    x = 500;
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = this.x + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5;

        this.aniamate();
    }

    aniamate() {
        setInterval(() => {
            if (this.chickenDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
            }
        });

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}