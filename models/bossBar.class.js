class BossBar extends DrawableObject {

    IMAGES_Boss = [
      //  'img/7_statusbars/2_statusbar_endboss/blue.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_Boss);
        this.x = 500;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.percentAge(0);
    }

    percentAge(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_Boss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}