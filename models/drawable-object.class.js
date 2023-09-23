class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    top = 10;
    bottom = 10;
    left = 20;
    right = 20;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          } catch (e) {
            // errors
          }
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
           ctx.beginPath();
           ctx.lineWidth = '2';
           ctx.strokeStyle = 'blue';
           ctx.rect(this.x + this.offset.x , this.y + this.offset.y,(this.x + this.width - this.offset.width) - (this.x + this.offset.x),(this.y + this.height - this.offset.height) - (this.y + this.offset.y));
           //ctx.rect(this.x, this.y, this.width, this.height);
           // this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom
           ctx.stroke(); 
        }
    }

     // load images 'character usw'.
     loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}