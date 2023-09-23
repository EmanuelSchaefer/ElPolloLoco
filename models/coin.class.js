class Coin extends MovableObjects {
    y = 500;
    x;
    height = 113;
    width = 113;
    offset = {
        x: 50,
        y: 50,
        width: 50,
        height: 50
    };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * 1900;
        this.y = 300 - Math.random() * 250;
        this.animate();
    }

    animate() {
      setInterval(() => {
        if (this.playAnimation(this.IMAGES_COIN)) {
        } 
    }, 200);
  }
}