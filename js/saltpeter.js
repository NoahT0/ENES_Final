class Saltpeter extends Scene
{
    constructor()
    {
        super('../Images/stoneTexture.jpg');
        
        this.mortarTop = this.addNewSprite('../Images/bucket.png', 0.2,0.2, 0.6, 0.6);
        this.saltpeterPile = this.addNewSprite('../Images/saltpeterpile.png', 0.8, 0.2, 0.2);
        this.sulfurPile = this.addNewSprite('../Images/sulfur.png', 0.8, 0.5, 0.2);
    }

    update(dt)
    {

    }
}