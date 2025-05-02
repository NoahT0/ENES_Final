class DryingRoom extends Scene
{
    constructor(sulfurAmount, saltpeterAmount, charcoalAmount, isSmall)
    {
        super('../Images/emptyWoodenRoom.png');

        this.sulfurAmount = sulfurAmount;
        this.saltpeterAmount = saltpeterAmount;
        this.charcoalAmount = charcoalAmount;

        this.amountOfPowder = Math.max(Math.max(sulfurAmount,saltpeterAmount), charcoalAmount);

        this.isSmall = isSmall;

        this.addNewSprite('../Images/shelf.png', 0.22, 0.1, 0.56);
        
        this.powderPerShelf = 2;
        let powder = this.amountOfPowder;
        let count = 0;
        let y = 0.15;
        while(powder > 0)
        {
            let x = 0.23;
            
            if(count % 2 === 1)
            {
                x = 0.5;
            }
            if(isSmall)
            {
                this.addNewSprite('../Images/gunpowderFine.png', x,y,0.26,0.05);
            }
            else
            {
                this.addNewSprite('../Images/gunpowderBigGrain.png', x,y,0.26,0.05);
            }
            powder -= this.powderPerShelf;
            count ++;

            if(count % 2 === 0)
            {
                y += 0.16;
            }
        }

        this.clock0 = this.addNewSprite('../Images/clock12.png', 0.05,0.2,0.13);
        this.clock3 = this.addNewSprite('../Images/clock3.png', 0.05,0.2,0.13);
        this.clock6 = this.addNewSprite('../Images/clock6.png', 0.05,0.2,0.13);
        this.clock9 = this.addNewSprite('../Images/clock9.png', 0.05,0.2,0.13);
        this.clocks = [this.clock0, this.clock3, this.clock6, this.clock9];
        this.counter = 0;
        this.tickClock();

        this.continueToIncrement = true;
        this.clockTime = 1;
        this.timeToDry = 8; // In clock ticks


        this.addButton(0.68,0.02,0.1,0.06, 'Reset', 0xff0000, textStyle, Tags.RESET_BUTTON);
        this.addButton(0.01,0.02,0.1,0.06, 'Back', 0xff0000, textStyle, Tags.BACK_BUTTON);
        this.addButton(0.83,0.02,0.1,0.06, 'Next', 0xff0000, textStyle, Tags.NEXT_BUTTON);

        this.addText('Wait for powder to dry.', textStyle);

    }
    isFinishedDrying()
    {
        return (this.counter >= this.timeToDry);
    }
    onClick(event) {
        // Check buttons first
        const pos = event.data.global;
        const button = this.pointOnButton(pos.x, pos.y);
        if(button != null)
        {
            if(button.tag === Tags.RESET_BUTTON)
            {
                this.counter = 0;
            }
            else if(button.tag === Tags.BACK_BUTTON)
            {
                sceneManager.switchScene(new Sieve(this.sulfurAmount, this.saltpeterAmount, this.charcoalAmount, this.isSmall));  
            }
            else if(button.tag === Tags.NEXT_BUTTON)
            {
                if(!this.isFinishedDrying())
                {
                   this.displayWarning('Powder has not finished drying.', 3, 0.3, 0.5);
                }
                else
                {
                    sceneManager.switchScene(new TestSelector(this.sulfurAmount, this.saltpeterAmount, this.charcoalAmount, this.isSmall));
                }
            }
            
        }
       
    }
    tickClock()
    {
        
        this.counter ++;
        for(let i = 0; i < this.clocks.length; i++)
        {
            if(this.counter % 4 === i)
            {
                this.clocks[i].visible = true;
            }
            else
            {
                this.clocks[i].visible = false;
            }
        }
        setTimeout(() => {
            if(this.continueToIncrement)
            {
                this.tickClock();
            }
        }, this.clockTime * 1000);
    }
}