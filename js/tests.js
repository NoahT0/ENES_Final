class TestSelector extends Scene
{
    constructor(sulfurAmount, saltpeterAmount, charcoalAmount, isSmall)
    {
        super('../Images/blank.png');
        this.background.tint = 0x00bf00;
        this.sulfurAmount = sulfurAmount;
        this.saltpeterAmount = saltpeterAmount;
        this.charcoalAmount = charcoalAmount;
        this.isSmall = isSmall;

        const tempStyle = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 36,
            fontFamily: 'Montserrat Medium'
          });

        this.addText('Select test:', tempStyle, 0.2, 0.3);
        this.addText('Hint: 70% saltpeter may be a cut off', textStyle, 0.7, 0.9);
        this.addGunpowderStats();
        this.addButton(0.01,0.02,0.1,0.06, 'Back', 0xff0000, textStyle, Tags.BACK_BUTTON);
        this.addButton(0.2,0.5,0.1, 0.06, 'Flintlock', 0xff0000, textStyle, Tags.NEXT_BUTTON);
    }
    addGunpowderStats()
    {
        const total = this.saltpeterAmount + this.sulfurAmount + this.charcoalAmount;

        const saltpeterPercent = Math.round(this.saltpeterAmount / total * 100);
        const sulfurPercent = Math.round(this.sulfurAmount / total * 100);
        const charcoalPercent = Math.round(this.charcoalAmount / total * 100);
        
        let str = 'Gunpowder stats:\nSulfur: ' + sulfurPercent + '% Saltpeter: ' + saltpeterPercent + '% Charcoal: ' + charcoalPercent + '%';
        if(this.isSmall)
        {
            str += '\nGrain Size: Small';
        }
        else
        {
            str += '\nGrain Size: Large';
        }
        this.addText(str, textStyle, 0.2, 0.7);

    }
    onClick(event) {
        // Check buttons first
        const pos = event.data.global;
        const button = this.pointOnButton(pos.x, pos.y);
        if(button != null)
        {
            if(button.tag === Tags.NEXT_BUTTON)
            {
                sceneManager.switchScene(new GuineaGun(this.sulfurAmount, this.saltpeterAmount, this.charcoalAmount, this.isSmall));  
            }
            if(button.tag === Tags.BACK_BUTTON)
            {
                sceneManager.switchScene(new DryingRoom(this.sulfurAmount, this.saltpeterAmount, this.charcoalAmount, this.isSmall));  
            }
            
        }
       
    }
}

class Test extends Scene
{
    constructor(backFile, sulfurAmount, saltpeterAmount, charcoalAmount, isSmall)
    {
        super(backFile);
        this.sulfurAmount = sulfurAmount;
        this.saltpeterAmount = saltpeterAmount;
        this.charcoalAmount = charcoalAmount;
        this.isSmall = isSmall;
        
        this.sulferPercent = 0;
        this.saltpeterPercent = 0;
        this.charcoalPercent = 0;
        this.calculateIngredientPercentages();

        this.addButton(0.68,0.02,0.1,0.06, 'Reset', 0xff0000, textStyle, Tags.RESET_BUTTON);
        this.addButton(0.01,0.02,0.1,0.06, 'Back', 0xff0000, textStyle, Tags.BACK_BUTTON);
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
                return true;
            }
            else if(button.tag === Tags.BACK_BUTTON)
            {
                sceneManager.switchScene(new TestSelector(this.sulfurAmount, this.saltpeterAmount, this.charcoalAmount, this.isSmall));  
            }
            
        }
       
    }
    calculateIngredientPercentages()
    {
        const total = this.saltpeterAmount + this.sulfurAmount + this.charcoalAmount;

        this.saltpeterPercent = this.saltpeterAmount / total;
        this.sulferPercent = this.sulfurAmount / total;
        this.charcoalPercent = this.charcoalAmount / total;
        console.log(this.sulferPercent, this.saltpeterPercent, this.charcoalPercent);
    }
    reset()
    {

    }

}

class GuineaGun extends Test
{
    constructor(sulfurAmount, saltpeterAmount, charcoalAmount, isSmall)
    {
        super('../Images/hill.jpg', sulfurAmount, saltpeterAmount, charcoalAmount, isSmall);
        this.artisan = this.addNewSprite('../Images/artisan.png', 0.7, 0.15, 0.25);
        this.artisanArm = this.addNewSprite('../Images/artisanArm.png', 0.69, 0.37, 0.04);
        this.target = this.addNewSprite('../Images/target.png', 0,0.4,0.395);
        this.flintlock = this.addNewSprite('../Images/flintlock.png', 0,0,0.2);
        this.flintlock.anchor.set(0.8,0.6);
        this.muzzleFlash = this.addNewSprite('../Images/muzzleFlash.png', 0, 0, 0.1);
        this.muzzleFlash.visible = false;
        this.muzzleFlash.anchor.set(-1.35,0.1);
        this.explosion = this.addNewSprite('../Images/explosion.png', 0,0,0.2);
        this.explosion.visible = false;
        this.explosion.anchor.set(0.5);

        this.upperAngleInRange = 0.43 * Math.PI;
        this.lowerAngleInRange = 0.28 * Math.PI

        this.bulletHoles = [];

        this.hasExploded = false;

    }
    reset()
    {
        this.hasExploded = false;
        this.explosion.visible = false;
        this.flintlock.visible = true;
        for(let i = 0; i < this.bulletHoles.length; i++)
        {
            this.graphics.removeChild(this.bulletHoles[i]);
            this.bulletHoles[i].destroy();
        }
        this.bulletHoles = [];
    }
    setArmLengthAndRotation(dx, dy)
    {
        const angle = Math.atan2(dy, dx);
        this.artisanArm.pivot.set(this.artisanArm.width/2, 10);
        this.artisanArm.rotation = angle - Math.PI/2;
        // const dist = Math.sqrt(dx * dx + dy * dy);
        // this.artisanArm.height = dist *1.12;
    }
    onPointerMove(event) {
        const pos = event.data.global;

        const dx = pos.x - this.artisanArm.x;
        const dy = pos.y - this.artisanArm.y;

        // Find angle to desired point and necessary length of arm
        this.setArmLengthAndRotation(dx,dy);

        // Put pestle in hand
        const xLength = Math.sin(this.artisanArm.rotation) * this.artisanArm.height;
        const yLength = Math.cos(this.artisanArm.rotation) * this.artisanArm.height;
        const endX = this.artisanArm.x - xLength;
        const endY = this.artisanArm.y + yLength * 0.8 - 20;

        this.flintlock.x = endX;
        this.flintlock.y = endY;

        this.flintlock.rotation = this.artisanArm.rotation + 3 * Math.PI/2;

        super.onPointerMove(event);

    }
    inRange()
    {
        if(this.artisanArm.rotation > this.upperAngleInRange)
        {
            return false;
        }

        if(this.artisanArm.rotation < this.lowerAngleInRange)
        {
            return false;
        }

        return true;
    }
    turnOffFlash()
    {
        setTimeout(() => {
            if(this.deleteWarningText)
            {
                this.muzzleFlash.visible = false;
            }
        },  500);
    }
    getRandomPointAlongAngle(originX, originY, angleRadians, minDist, maxDist) 
    {
        const dist = Math.random() * (maxDist - minDist) + minDist;
        const x = originX + Math.cos(angleRadians) * dist;
        const y = originY + Math.sin(angleRadians) * dist;
        return { x, y };
    }
    canShoot()
    {
        return (this.saltpeterPercent < 0.7);
    }
    turnOffExplosion()
    {
        setTimeout(() => {
            if(this.deleteWarningText)
            {
                this.explosion.visible = false;
            }
        },  500);
    }
    explodeGun()
    {
        this.hasExploded = true;
        this.explosion.visible = true;
        this.explosion.x = this.flintlock.x;
        this.explosion.y = this.flintlock.y;
        this.flintlock.visible = false;
        this.turnOffExplosion();
    }
    onClick(event)
    {
        if(super.onClick(event))
        {
            return;
        }
        if(!this.deleteWarningText)
        {
            return;
        }

        if(!this.canShoot())
        {

            this.displayWarning('Saltpeter content is too high!', 3, 0.3, 0.5);
            if(!this.hasExploded)
            {
                this.explodeGun();
            }
            
            return;
        }
        this.muzzleFlash.visible = true;
        this.muzzleFlash.x = this.flintlock.x;
        this.muzzleFlash.y = this.flintlock.y;
        this.muzzleFlash.rotation = this.flintlock.rotation + Math.PI;
        this.turnOffFlash();

        if(this.inRange())
        {
            const point = this.getRandomPointAlongAngle(this.flintlock.x, this.flintlock.y, this.artisanArm.rotation + Math.PI/2, 200, 370);
            this.bulletHoles.push(this.addNewSprite('../Images/bulletHole.png', point.x / getScreenWidth(), point.y / getScreenHeight(), 0.04));
        }

    }
}