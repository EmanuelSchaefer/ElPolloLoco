class Level {
    enemies;
    backgroundObjects;
    clouds;
    coins;
    bottels;
    
    level_end_x = 2200;
    

    constructor(enemies, backgroundObjects, clouds, coins, bottels) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
        this.bottels = bottels;
    }
}