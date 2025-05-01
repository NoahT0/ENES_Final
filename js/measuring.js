class WoodenRoom extends Scene
{
    constructor()
    {
        super('../Images/emptyWoodenRoom.png');

        this.table = this.addNewSprite('../Images/medievalTable.png', 0.6, 0.6, 0.5,0.5);
        this.sulfurFront = this.addDraggableSpriteDuplicate('../Images/sulfurSide.png', 0.65, 0.68, 0.1,0.1, Tags.SULFUR_FRONT);
        this.saltpeterFront = this.addDraggableSpriteDuplicate('../Images/saltpeterFront.png', 0.73, 0.65, 0.15,0.15, Tags.SALTPETER_FRONT);
        this.charcoalFront = this.addNewDraggableSprite('../Images/charcoalFront.png', 0.85, 0.65, 0.12,0.17, Tags.CHARCOAL_FRONT);
        this.artisan = this.addNewSprite('../Images/artisan.png', 0.4, 0.15, 0.25);
        this.artisanArm = this.addNewSprite('../Images/artisanArm.png', 0.39, 0.37, 0.04);
        this.hangingScale = new HangingScale(0.37, 0, 0.3,0.3);
        this.graphics.addChild(this.hangingScale);
        this.backgroundPestle = this.addNewSprite('../Images/pestle.png', 0.3,0.5,0.08,0.4);
        this.stone = this.addNewSprite('../Images/stone.png', 0,0.7,0.35,0.3);
        this.mortar = new Mortar(0, 0.48, 0.35, 0.35);
        this.graphics.addChild(this.mortar);

        this.resetButton = this.addButton(0.68,0.02,0.1,0.06, 'Reset', 0xff0000, textStyle, Tags.RESET_BUTTON);
        this.nextButton = this.addButton(0.83,0.02,0.1,0.06, 'Next', 0xff0000, textStyle, Tags.NEXT_BUTTON);
        
    }
    setArmLengthAndRotation(dx, dy)
    {
        const angle = Math.atan2(dy, dx);
        this.artisanArm.pivot.set(this.artisanArm.width/2, 10);
        this.artisanArm.rotation = angle - Math.PI/2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.artisanArm.height = dist *1.12;
    }
}

class Measuring extends WoodenRoom
{
    constructor()
    {
        super();
        this.mortar.pestle.visible = false;

        this.instructions = this.addText('Drag ingredients on to scale to measure out proportions.\nOnce desired quantity is met click on scale to move ingredient to mortar.', textStyle);
        this.labelText = this.addText('Sulfur           Saltpeter          Charcoal', textStyle, 0.67, 0.78);
        
    }
    update(dt)
    {
        //this.artisanArm.rotation += 0.01;
    }
    onClick(event) {
        if (this.dragging) return;
        // Check buttons first
        const pos = event.data.global;
        const button = this.pointOnButton(pos.x, pos.y);
        if(button != null)
        {
            if(button.tag === Tags.RESET_BUTTON)
            {
                console.log(button.message);
                this.hangingScale.clearScale();
                this.mortar.reset();
            }
            else if(button.tag === Tags.NEXT_BUTTON)
            {
                if(this.mortar.ingredientMissing())
                {
                    this.displayWarning('One or more ingredient missing. Add them before continuing.', 3, 0.2,0.5);

                }
                else
                {
                    sceneManager.switchScene(new HandMixing(this.mortar.sulfurAmount, this.mortar.saltpeterAmount, this.mortar.charcoalAmount));
                    return;
                }
            }
            
        }
        
        // Check scale next
        if(this.hangingScale.getBounds().contains(pos.x, pos.y))
        {
            this.hangingScale.onClick(this.mortar);
            return;
        }
        
        // Check draggable objects next
        super.onClick(event);
    }
    onClickEnd(event) {
        if(this.dragging)
        {
            super.onClickEnd(event);
            if(this.draggableSprite)
            {
                const pos = event.data.global;
                if(this.hangingScale.getBounds().contains(pos.x, pos.y))
                {
                    this.hangingScale.addPowder(this.draggableSprite);
                }
            }
        }
        else
        {
            super.onClickEnd(event);
        }

        
    }
    onPointerMove(event) {
        const pos = event.data.global;

        const dx = pos.x - this.artisanArm.x;
        const dy = pos.y - this.artisanArm.y;

        // Find angle to desired point and necessary length of arm
        this.setArmLengthAndRotation(dx,dy);

        super.onPointerMove(event);

    }
    
}