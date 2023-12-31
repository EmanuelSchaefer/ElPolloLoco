// The same principle as with the large chickens, just different size and different pictures.
class ChickenSmall extends Chicken {
    y = 375;
    x = 700;
    height = 55;
    width = 55;
    speed = 100;
    offset = {
        x: 15,
        y: 15,
        width: 15,
        height: 15 
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.x + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.3;
        
        this.aniamate();   
    }
}