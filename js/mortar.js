class Mortar extends CContainer
{
    constructor(xPos, yPos, width, height)
    {
        super(xPos,yPos,width,height);
        this.mortarBack = new CSprite('../Images/mortarBack.png', 0.23,0.46,0.55,0.4, Tags.NA, false);
        this.mortarBack2 = new CSprite('../Images/mortarBack2.png', 0,0,1,0.3, Tags.NA, false);
        this.sulfurFront = new CSprite('../Images/sulfurSide.png', 0.25, 0.85, 0.18,0, Tags.SULFUR_FRONT, false);
        this.saltpeterFront = new CSprite('../Images/saltpeterFront.png', 0.4, 0.84, 0.2,0, Tags.SALTPETER_FRONT, false);
        this.charcoalFront = new CSprite('../Images/charcoalFront.png', 0.57, 0.84, 0.19,0, Tags.CHARCOAL_FRONT, false);
        this.pestle = new CSprite('../Images/pestle.png', 0.1,0.3,0.3,1.5, false);
        this.mortarFront = new CSprite('../Images/MortarFinal2.png', 0,0,1,1, Tags.NA, false);
        this.addSprite(this.mortarBack);
        this.addSprite(this.mortarBack2);
        this.addSprite(this.sulfurFront);
        this.addSprite(this.saltpeterFront);
        this.addSprite(this.charcoalFront);
        this.addSprite(this.pestle);
        this.addSprite(this.mortarFront);

        this.heightChange = 10;
        this.sulfurAmount = 0;
        this.saltpeterAmount = 0;
        this.charcoalAmount = 0;
    }

    addPowder(amount, tag)
    {
        if(tag === Tags.SULFUR_FRONT)
        {
            this.sulfurFront.height += amount * this.heightChange;
            this.sulfurFront.y -= amount * this.heightChange;
            this.sulfurAmount += amount;
        }
        else if(tag === Tags.SALTPETER_FRONT)
        {
            this.saltpeterFront.height += amount * this.heightChange;
            this.saltpeterFront.y -= amount * this.heightChange * 0.85;
            this.saltpeterAmount += amount;
        }
        else if(tag === Tags.CHARCOAL_FRONT)
        {
            this.charcoalFront.height += amount * this.heightChange;
            this.charcoalFront.y -= amount * this.heightChange * 0.78;
            this.charcoalAmount += amount;
        }
    }
    ingredientMissing()
    {
        return (this.sulfurAmount === 0 || this.saltpeterAmount === 0 || this.charcoalAmount === 0);
    }
    reset()
    {
        this.addPowder(-this.sulfurAmount, Tags.SULFUR_FRONT);
        this.addPowder(-this.saltpeterAmount, Tags.SALTPETER_FRONT);
        this.addPowder(-this.charcoalAmount, Tags.CHARCOAL_FRONT);
        console.log('Charcoal: ' + this.charcoalAmount, 'Sulfur: ' + this.sulfurAmount, 'Saltpeter: ' + this.saltpeterAmount)
    }
}