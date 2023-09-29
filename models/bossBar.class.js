/**
 * Represents a boss health bar visible on the screen.
 */
class BossBar extends DrawableObject {

    IMAGES_Boss = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
    * The current starting percentage of the boss health bar.
    * @type {number}
    */
    percentage = 100;

    /**
     * Loads the images and creates a new instance for the BossBar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_Boss);
        this.x = 500;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.percentAge(100);
    }

    /**
     * Sets the percentage value of the boss health bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage value 0 to 100.
     */
    percentAge(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_Boss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * @returns {number} The index of the current image in the IMAGES array.
     */
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