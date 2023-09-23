class SauceBar extends DrawableObject {

    IMAGESsauce = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGESsauce);
        this.x = 10;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPERCENTage(0);
    }

    setPERCENTage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGESsauce[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 0 && this.percentage < 20) {
            this.bottle = this.percentage;
            return 0;
        } else if (this.percentage >= 20 && this.percentage < 40) {
            this.bottle = this.percentage;
            return 1;
        } else if (this.percentage >= 40 && this.percentage < 60) {
            this.bottle = this.percentage;
            return 2;
        } else if (this.percentage >= 60 && this.percentage < 80) {
            this.bottle = this.percentage;
            return 3;
        } else if (this.percentage >= 80 && this.percentage < 100) {
            this.bottle = this.percentage;
            return 4;
        } else if (this.percentage == 100) {
            this.bottle = this.percentage;
            return 5;
        }
    }
}