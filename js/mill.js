class Mill extends Scene
{
    constructor(sulfurAmount, saltpeterAmount, charcoalAmount)
    {
        super('../Images/millBackground.png');
        this.defaultSulfur = sulfurAmount;
        this.defaultSaltpeter = saltpeterAmount;
        this.defaultCharcoal = charcoalAmount;


        this.gear0 = this.addNewSprite('../Images/Gear0.png', 0.02,0.39,0.6);
        this.gear30 = this.addNewSprite('../Images/Gear30.png', 0.02,0.39,0.6);
        this.gear60 = this.addNewSprite('../Images/Gear60.png', 0.02,0.39,0.6);
        this.gear90 = this.addNewSprite('../Images/Gear90.png', 0.02,0.39,0.6);
        this.gears = [this.gear0, this.gear30, this.gear60, this.gear90];

        this.mortar = new Mortar(-0.02, 0.55, 0.4, 0.35);
        this.mortar.hideMortar();
        this.setDefaultPowder();
        this.graphics.addChild(this.mortar);

        this.counter = 0;
        this.frameTime = 0.5;
        this.cloudThreshold = 2;
        this.powderThreshold = 4;
        this.continueToIncrement = true; // Only false after scene has been deleted
        this.incrementAnimation();

        this.backButton = this.addButton(0.01,0.02,0.1,0.06, 'Back', 0xff0000, textStyle, Tags.BACK_BUTTON);
        this.resetButton = this.addButton(0.68,0.02,0.1,0.06, 'Reset', 0xff0000, textStyle, Tags.RESET_BUTTON);
        this.addButton(0.83,0.02,0.1,0.06, 'Next(Large)', 0xff0000, textStyle, Tags.NEXT_BUTTON);
        this.addButton(0.83,0.12,0.1,0.06, 'Next(Small)', 0xff0000, textStyle, Tags.NEXT_BUTTON2);

        const tempStyle = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 18,
            fontFamily: 'Montserrat Medium'
          });
        this.instructions = this.addText('Wait until ingredients are fulling mixed together.', tempStyle);
        
    }
    setDefaultPowder()
    {
        this.mortar.reset();
        this.mortar.addPowder(this.defaultSulfur, Tags.SULFUR_FRONT);
        this.mortar.addPowder(this.defaultSaltpeter, Tags.SALTPETER_FRONT);
        this.mortar.addPowder(this.defaultCharcoal, Tags.CHARCOAL_FRONT);

    }
    update(dt)
    {
        //this.incrementAnimation();
    }
    onClick(event) {
        // Check buttons first
        const pos = event.data.global;
        const button = this.pointOnButton(pos.x, pos.y);
        if(button != null)
        {
            if(button.tag === Tags.RESET_BUTTON)
            {
                this.setDefaultPowder();
            }
            else if(button.tag === Tags.BACK_BUTTON)
            {
                sceneManager.switchScene(new Measuring());
                
            }
            else if(button.tag === Tags.NEXT_BUTTON)
            {
                if(!this.mortar.fullyConverted())
                {
                   this.displayWarning('Ingredients not fully converted to gunpowder yet.', 3, 0.3, 0.5);
                }
                else
                {
                    sceneManager.switchScene(new Sieve(this.defaultSulfur, this.defaultSaltpeter, this.defaultCharcoal, false, false));
                }
            }
            else if(button.tag === Tags.NEXT_BUTTON2)
            {
                if(!this.mortar.fullyConverted())
                {
                   this.displayWarning('Ingredients not fully converted to gunpowder yet.', 3, 0.3, 0.5);
                }
                else
                {
                    sceneManager.switchScene(new Sieve(this.defaultSulfur, this.defaultSaltpeter, this.defaultCharcoal, true, false));
                }
            }
            
        }
       
    }
    onExit()
    {
        super.onExit();
        this.mortar.cleanUpClouds = false;
        this.continueToIncrement = false;

    }
    incrementAnimation()
    {
        if(this.counter % this.cloudThreshold === 0)
        {
            this.mortar.makeDustCloud();
        }

        if(this.counter % this.powderThreshold === 0)
        {
            this.mortar.convertToGunpowder();
        }
        
        this.counter ++;
        for(let i = 0; i < this.gears.length; i++)
        {
            if(this.counter % 4 === i)
            {
                this.gears[i].visible = true;
            }
            else
            {
                this.gears[i].visible = false;
            }
        }
        setTimeout(() => {
            if(this.continueToIncrement)
            {
                this.incrementAnimation();
            }
        }, this.frameTime * 1000);
    }
    
}