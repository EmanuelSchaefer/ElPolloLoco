class Bottle extends MovableObjects {
    y = 365;
    x = 160;
    height = 73;
    width = 73;
    offset = {
        x: 30,
        y: 25,
        width: 34,
        height: 10
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 300 + Math.random() * 1900;
    }
}