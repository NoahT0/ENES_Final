class Button extends CContainer
{
    constructor(xPos, yPos, width, height, message, color = 0x0000FF, style = textStyle, tag = Tags.NA)
    {
        super(xPos, yPos, width, height);
        
        this.buttonImage = new CSprite('../Images/blank.png', 0,0,1,1, Tags.NA, false);
        this.addSprite(this.buttonImage);
        this.buttonImage.tint = color;

        this.message = message;
        this.text = new PIXI.Text(message, style);
        this.text.x = this.desiredBounds.x + this.desiredBounds.width/2;
        this.text.y = this.desiredBounds.y + this.desiredBounds.height/2;
        this.text.anchor.set(0.5);
        this.addChild(this.text);

        this.tag = tag;
    }
    
    contains(x, y)
    {
        return this.getBounds().contains(x,y);
    }
}