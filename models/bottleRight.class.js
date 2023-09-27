class BottleRight extends Bottle {
    y = 365;
    x = 200;
    height = 73;
    width = 73;

    IMAGES_BOTTLEfly = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLEfly);
        this.x = 300 + Math.random() * 2000;
    }
}