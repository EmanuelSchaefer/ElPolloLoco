class Cloud extends MovableObjects {
    y = 20;
    width = 1000;
    height = 300;


    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/full.png');

        this.x = Math.random() * 500;   
        this.animate(); 
    }

    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}