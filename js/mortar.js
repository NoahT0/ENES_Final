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
        this.gunpowder = new CSprite('../Images/gunpowder.png', 0.12, 0.84, 0.7,0, Tags.GUNPOWDER, false);
        this.pestle = new CSprite('../Images/pestle.png', 0.1,0.3,0.3,1.5, false);
        this.mortarFront = new CSprite('../Images/MortarFinal2.png', 0,0,1,1, Tags.NA, false);
        this.addSprite(this.mortarBack);
        this.addSprite(this.mortarBack2);
        this.addSprite(this.sulfurFront);
        this.addSprite(this.saltpeterFront);
        this.addSprite(this.charcoalFront);
        this.addSprite(this.gunpowder);
        this.addSprite(this.pestle);
        this.addSprite(this.mortarFront);

        this.cloudDuration = 2000;
        this.cleanUpClouds = true;

        this.heightChange = 10;
        this.gunpowderChange = 25;
        this.sulfurAmount = 0;
        this.saltpeterAmount = 0;
        this.charcoalAmount = 0;
        this.gunpowderAmount = 0;
        
    }
    convertToGunpowder()
    {
        //this.makeDustCloud();
        if(!this.fullyConverted())
        {
            this.addPowder(-1, Tags.SULFUR_FRONT);
            this.addPowder(-1, Tags.SALTPETER_FRONT);
            this.addPowder(-1, Tags.CHARCOAL_FRONT);
            this.addPowder(1, Tags.GUNPOWDER);
        }
        
    }
    makeDustCloud()
    {
        const x = Math.random() * 0.35 + 0.17;
        const y = Math.random() * 0.25 + 0.41;
        const cloud = new CSprite('../Images/dustCloud.png',x,y,0.3,0.2, Tags.NA, false);
        cloud.tint = 0x2f2f2f;
        this.addSprite(cloud);
        setTimeout(() => {
            this.removeChild(cloud);
            if(this.cleanUpClouds)
            {
                cloud.destroy();
            }
            
        }, this.cloudDuration);
    }
    addPowder(amount, tag)
    {
        if(tag === Tags.SULFUR_FRONT)
        {
            // Make sure amount doesn't go below 0
            if(amount < 0)
            {
                amount = -Math.min(-amount, this.sulfurAmount);
            }    
            this.sulfurFront.height += amount * this.heightChange;
            this.sulfurFront.y -= amount * this.heightChange;
            this.sulfurAmount += amount;
        }
        else if(tag === Tags.SALTPETER_FRONT)
        {
            // Make sure amount doesn't go below 0
            if(amount < 0)
            {
                amount = -Math.min(-amount, this.saltpeterAmount);
            }    
            this.saltpeterFront.height += amount * this.heightChange;
            this.saltpeterFront.y -= amount * this.heightChange * 0.85;
            this.saltpeterAmount += amount;
        }
        else if(tag === Tags.CHARCOAL_FRONT)
        {
            // Make sure amount doesn't go below 0
            if(amount < 0)
            {
                amount = -Math.min(-amount, this.charcoalAmount);
            }    
            this.charcoalFront.height += amount * this.heightChange;
            this.charcoalFront.y -= amount * this.heightChange * 0.78;
            this.charcoalAmount += amount;
        }
        else if(tag === Tags.GUNPOWDER)
        {
            // Make sure amount doesn't go below 0
            if(amount < 0)
            {
                amount = -Math.min(-amount, this.gunpowderAmount);
            }    
            this.gunpowder.height += amount * this.gunpowderChange;
            this.gunpowder.y -= amount * this.gunpowderChange * 0.78;
            this.gunpowderAmount += amount;
        }
    }
    ingredientMissing()
    {
        return (this.sulfurAmount === 0 || this.saltpeterAmount === 0 || this.charcoalAmount === 0);
    }
    fullyConverted()
    {
        return (this.sulfurAmount === 0 && this.saltpeterAmount === 0 && this.charcoalAmount === 0);
    }
    reset()
    {
        this.addPowder(-this.sulfurAmount, Tags.SULFUR_FRONT);
        this.addPowder(-this.saltpeterAmount, Tags.SALTPETER_FRONT);
        this.addPowder(-this.charcoalAmount, Tags.CHARCOAL_FRONT);
        this.addPowder(-this.gunpowderAmount, Tags.GUNPOWDER);
        console.log('Charcoal: ' + this.charcoalAmount, 'Sulfur: ' + this.sulfurAmount, 'Saltpeter: ' + this.saltpeterAmount)
    }
}