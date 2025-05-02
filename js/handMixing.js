class HandMixing extends WoodenRoom
{
    constructor(sulfurAmount, saltpeterAmount, charcoalAmount)
    {
        super();
        
        this.defaultSulfur = sulfurAmount;
        this.defaultSaltpeter = saltpeterAmount;
        this.defaultCharcoal = charcoalAmount;
        this.setDefaultPowder();
        this.backButton = this.addButton(0.01,0.02,0.1,0.06, 'Back', 0xff0000, textStyle, Tags.BACK_BUTTON);
        this.nextButton = this.addButton(0.83,0.02,0.1,0.06, 'Next', 0xff0000, textStyle, Tags.NEXT_BUTTON);
        this.instructions = this.addText('Move Pestle up and down to mix ingredients.', textStyle);
        this.backgroundPestle.visible = false;
        this.distSum = 0;
        this.dustThreshold = 500; // Distance needed for making dust
        this.dustCount = 0;
        this.powderThreshold = 3; // Number of dust clouds for one conversion into gunpowder
        
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
        //this.artisanArm.rotation += 0.01;
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
            }
            
        }
       
    }
    onExit()
    {
        super.onExit();
        this.mortar.cleanUpClouds = false;
    }
    
    onPointerMove(event) {
        const pos = event.data.global;
        
        const dx = 150 - this.artisanArm.x;
        const dy = clamp(pos.y, 40, 250)- this.artisanArm.y;

        // Find angle to desired point and necessary length of arm
        const angle = Math.atan2(dy, dx);
        this.artisanArm.pivot.set(this.artisanArm.width/2, 10);
        this.artisanArm.rotation = angle - Math.PI/2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.artisanArm.height = dist *1.12;

        // Put pestle in hand
        const xLength = Math.sin(this.artisanArm.rotation) * this.artisanArm.height;
        const yLength = Math.cos(this.artisanArm.rotation) * this.artisanArm.height;
        const endX = this.artisanArm.x - xLength;
        const endY = this.artisanArm.y + yLength * 0.8 - 20;

        this.distSum += Math.abs(endY - this.mortar.pestle.y);
        if(this.distSum > this.dustThreshold)
        {
            this.distSum = 0;
            this.mortar.makeDustCloud();
            this.dustCount ++;
            if(this.dustCount % this.powderThreshold === 0)
            {
                this.mortar.convertToGunpowder();
            }
        }
        this.mortar.pestle.x = endX;
        this.mortar.pestle.y = endY;
        
        super.onPointerMove(event);

    }
    
}