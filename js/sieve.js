class Sieve extends Scene
{
    constructor(sulfurAmount, saltpeterAmount, charcoalAmount, isSmall = true, previousIsManual = true)
    {
        super('../Images/splitBackground.png');

        this.previousIsManual = previousIsManual;

        this.addNewSprite('../Images/bucketTop.png', 0.51, 0.25, 0.48, 0.6);
        this.addNewSprite('../Images/woodStick.png', 0.45, 0.41, 0.58);

        this.isSmall = isSmall;
        if(isSmall)
        {
            this.sieve = this.addNewSprite('../Images/sieveSmall.png', 0.525, 0.27, 0.45, 0.56);
        }
        else
        {
            this.sieve = this.addNewSprite('../Images/sieveLarge.png', 0.525, 0.27, 0.45, 0.56);
        }
        
        this.gunpowderPasteRight = this.addNewSprite('../Images/gunpowderPaste.png', 0.74,0.55,0.45,0.55);
        this.gunpowderPasteRight.anchor.set(0.5);

        this.addNewSprite('../Images/bucketBack.png', 0.1,0.75,0.3);
        if(isSmall)
        {
            this.gunpowder = this.addNewSprite('../Images/gunpowderFine.png', 0.1,0.87,0.3,0.05);
        }
        else
        {
            this.gunpowder = this.addNewSprite('../Images/gunpowderBigGrain.png', 0.1,0.87,0.3,0.05);
        }

        this.gunpowderY = 0.92 * getScreenHeight();
        this.addNewSprite('../Images/bucketHollow.png', 0,0.5,0.5);
        this.addNewSprite('../Images/woodStick.png', -0.03, 0.41, 0.54);
        this.addNewSprite('../Images/sieveSide.png', 0, 0.39, 0.5, 0.22);
        this.gunpowderPasteLeft = this.addNewSprite('../Images/gunpowderPaste.png', 0.24,0.46,0.49,0.11);
        this.gunpowderPasteLeft.anchor.set(0.5);
        
        this.resetButton = this.addButton(0.68,0.02,0.1,0.06, 'Reset', 0xff0000, textStyle, Tags.RESET_BUTTON);
        this.backButton = this.addButton(0.01,0.02,0.1,0.06, 'Back', 0xff0000, textStyle, Tags.BACK_BUTTON);
        this.nextButton = this.addButton(0.83,0.02,0.1,0.06, 'Next', 0xff0000, textStyle, Tags.NEXT_BUTTON);
        this.instructions = this.addText('Force gunpowder paste through sieve.', textStyle);
        const tempStyle = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 32,
            fontFamily: 'Montserrat Medium'
          });
        this.addText('Front', tempStyle, 0.2, 0.15);
        this.addText('Top', tempStyle, 0.72, 0.15);

        this.hand = this.addNewSprite('../Images/hand.png', 0,0,0.1);
        this.hand.anchor.set(0.5);

        this.defaultSulfur = sulfurAmount;
        this.defaultSaltpeter = saltpeterAmount;
        this.defaultCharcoal = charcoalAmount;

        this.defaultPaste = Math.max(Math.max(sulfurAmount,saltpeterAmount), charcoalAmount);

        this.maxPaste = 15;
        if(this.defaultPaste > this.maxPaste)
        {
            this.defaultPaste = this.maxPaste;
        }
        this.amountOfPaste = this.defaultPaste;

        this.distSum = 0;
        this.conversionThreshold = 1000;
        
        this.gunpowderHeightChange = 30;

        this.previousIsManual = previousIsManual;
        setTimeout(() => {
            this.defaultScaleLeft = {x: this.gunpowderPasteLeft.scale.x, y: this.gunpowderPasteLeft.scale.y};
            this.defaultScaleRight = {x: this.gunpowderPasteRight.scale.x, y: this.gunpowderPasteRight.scale.y};
            this.scalePasteAndPowder();
        }, 100);
        
        //const texture = PIXI.Texture.from('../Images/pestle.png');
        
    }
    reset()
    {
        this.amountOfPaste = this.defaultPaste;
        this.scalePasteAndPowder();
    }
    onClick(event) {
        // Check buttons first
        const pos = event.data.global;
        const button = this.pointOnButton(pos.x, pos.y);
        if(button != null)
        {
            if(button.tag === Tags.RESET_BUTTON)
            {
                this.reset();
            }
            else if(button.tag === Tags.BACK_BUTTON)
            {
                if(this.previousIsManual)
                {
                    sceneManager.switchScene(new HandMixing(this.defaultSulfur, this.defaultSaltpeter, this.defaultCharcoal));
                }
                else
                {
                    sceneManager.switchScene(new Mill(this.defaultSulfur, this.defaultSaltpeter, this.defaultCharcoal));
                }
                
            }
            else if(button.tag === Tags.NEXT_BUTTON)
            {
                if(!this.isFullyConverted())
                {
                   this.displayWarning('Not all paste has been converted to powder yet.', 3, 0.3, 0.5);
                }
                else
                {
                    sceneManager.switchScene(new DryingRoom(this.defaultSulfur, this.defaultSaltpeter, this.defaultCharcoal, this.isSmall));
                }
            }
            
        }
       
    }
    convertToPowder()
    {
        if(!this.isFullyConverted())
        {
            this.amountOfPaste -= 1;
            this.scalePasteAndPowder();
        }
        
    }
    isFullyConverted()
    {
        return (this.amountOfPaste === 0);
    }
    scalePasteAndPowder()
    {
        const scale = this.amountOfPaste / this.maxPaste;
        this.gunpowderPasteLeft.scale.set(scale * this.defaultScaleLeft.x, scale * this.defaultScaleLeft.y);
        this.gunpowderPasteRight.scale.set(scale * this.defaultScaleRight.x, scale * this.defaultScaleRight.y);

        const amountOfPowder = this.defaultPaste - this.amountOfPaste;
        this.gunpowder.height = amountOfPowder * this.gunpowderHeightChange;
        this.gunpowder.y = this.gunpowderY - this.gunpowder.height * 1;
    }
    onPointerMove(event) {
        const pos = event.data.global;

        const dx = pos.x - this.hand.x;
        const dy = pos.y - this.hand.y;

        this.hand.x = pos.x;
        this.hand.y = pos.y;

        if(this.sieve.getBounds().contains(pos.x, pos.y))
        {
            this.distSum += Math.sqrt(dx * dx + dy * dy);
            if(this.distSum > this.conversionThreshold)
            {
                this.convertToPowder();
                this.distSum = 0;
            }
        }
        
        
        super.onPointerMove(event);

    }
}