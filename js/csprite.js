const Tags = Object.freeze({
    NA: -1,
    SULFUR_FRONT: 0,
    SALTPETER_FRONT: 1,
    CHARCOAL_FRONT: 2,
    GUNPOWDER: 3,
    RESET_BUTTON: 4,
    NEXT_BUTTON: 5,
    NEXT_BUTTON2: 6,
    NEXT_BUTTON3: 7,
    NEXT_BUTTON4: 8,
    BACK_BUTTON: 9

});
class CSprite extends PIXI.Sprite 
{
    constructor(texturePath, xPos = 0, yPos = 0, spriteWidth = -1, spriteHeight = -1, tag = Tags.NA, scaleByScreen = true) 
    {
        const texture = PIXI.Texture.from(texturePath);
        super(texture);
        this.texturePath = texturePath;
        this.tag = tag;
        //console.log(this.parent.width);
        this.normBounds = {
            x: xPos, y: yPos, width: spriteWidth, height: spriteHeight
        };
        
        if (texture.baseTexture.valid) 
        {
            // Texture already loaded — call immediately
            if(scaleByScreen)
            {
                this.scaleByDimensions(getScreenWidth(), getScreenHeight());
            }
            
        } 
        else 
        {
            texture.baseTexture.on('loaded', () => {
                if(scaleByScreen)
                {
                    this.scaleByDimensions(getScreenWidth(), getScreenHeight());
                }
            });
        }
    }
    scaleByDimensions(scaleX, scaleY, xOffset = 0, yOffset = 0)
    {
        this.x = xOffset + scaleX * this.normBounds.x;
        this.y = yOffset + scaleY * this.normBounds.y;
        if(this.normBounds.width > 0 && this.normBounds.height < 0)
        {
            let newWidth = scaleX * this.normBounds.width;
            let scaleFactor = newWidth/this.width;
            this.width = newWidth;
            this.height *= scaleFactor;
        }
        else if(this.normBounds.width > 0)
        {
            this.width = scaleX * this.normBounds.width;
            this.height = scaleY * this.normBounds.height;
        }
        // this.normBounds.width = this.width / scaleX;
        // this.normBounds.height = this.height / getScreenHeight();
    }
    clone()
    {
        const s = new CSprite(this.texturePath, this.normBounds.x, this.normBounds.y, this.normBounds.width, this.normBounds.height, this.tag);
        s.anchor.set(this.anchor.x, this.anchor.y);
        s.scale.set(this.scale.x, this.scale.y);
        s.rotation = this.rotation;
        s.alpha = this.alpha;
        return s;
    }
}
// Constrained container ish
class CContainer extends PIXI.Container
{
   
    constructor(xPos, yPos, width, height, tag = Tags.NA)
    {
        super();
        this.tag = tag;
        this.desiredBounds = {
            x: getScreenWidth()*xPos, y: getScreenHeight()*yPos, width: getScreenWidth()*width, height: getScreenHeight()*height
        };
        this.normBounds = {
            x: xPos, y: yPos, width: width, height: height
        }
        
    }

    addSprite(child)
    {
        child.scaleByDimensions(this.desiredBounds.width, this.desiredBounds.height, this.desiredBounds.x, this.desiredBounds.y);
        this.addChild(child);
        
    }
}

