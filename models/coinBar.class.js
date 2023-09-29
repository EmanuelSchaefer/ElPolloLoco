/**
 * Represents a coin bar visible on the screen.
 */
class CoinBar extends DrawableObject {

    IMAGEScoin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

     /**
    * The current starting percentage of the coin bar.
    * @type {number}
    */
    percentage = 0;

    /**
    * Constructs a new CoinBar object.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGEScoin);
        this.percentAge(0);
        this.x = 10;
        this.y = 50;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Sets the percentage value of the coin bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage value 0 to 100.
     */
    percentAge(percentage) {
        this.percentage = percentage;
        let path = this.IMAGEScoin[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

     /**
    * @returns {number} The index of the current image in the IMAGES array.
    */
    resolveImageIndex() {
        if (this.percentage >= 0 && this.percentage < 20) {
            this.coin = this.percentage;
            return 0;
        } else if (this.percentage >= 20 && this.percentage < 40) {
            this.coin = this.percentage;
            return 1;
        } else if (this.percentage >= 40 && this.percentage < 60) {
            this.coin = this.percentage;
            return 2;
        } else if (this.percentage >= 60 && this.percentage < 80) {
            this.coin = this.percentage;
            return 3;
        } else if (this.percentage >= 80 && this.percentage < 100) {
            this.coin = this.percentage;
            return 4;
        } else if (this.percentage == 100) {
            this.coin = this.percentage;
            return 5;
        }
    }
}