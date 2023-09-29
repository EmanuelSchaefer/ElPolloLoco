/**
 * Represents a status bar for the character. 
 * It is visible on the screen.
 */
class StatusBar extends DrawableObject {

    IMAGESlife = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
    * The current starting percentage of the character.
    * @type {number}
    */
    percentage = 100;

    /**
     * Loads the images and creates a new instance for the status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGESlife);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage value 100 to 0.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGESlife[this.resolveImageIndex()];
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
            }else if (this.percentage > 40) {
                return 2;
            }else if (this.percentage > 20) {
                return 1;
            }else {
                return 0;
            }
        }
    }

