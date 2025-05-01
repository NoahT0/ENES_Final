class SceneManager
{
    constructor(curScene)
    {
        this.curScene = curScene;
    }

    switchScene(newScene)
    {
        if(this.curScene)
        {
            this.curScene.destroy();
            //this.curScene.graphics.visible = false;
        }
        this.curScene = newScene;
    }
    update(dt)
    {
        this.curScene.update(dt);
    }

}
const warningStyle = new PIXI.TextStyle({
    fill: 0xff0000,
    fontSize: 24,
    fontFamily: 'Montserrat Medium'
  });
class Scene
{
    constructor(backFile = '../Images/stoneTexturejpg')
    {
        this.graphics = new PIXI.Container();
        app.stage.addChild(this.graphics);
        
        this.background = this.addNewSprite(backFile, 0,0,1,1);
        this.draggable = [];
        this.draggableSprite = null;
        this.draggableOffset = {x: 0, y:0};
        this.originalPos = {x: 0, y:0};
        this.dragging = false;
        
        this.buttons = [];

        app.stage.interactive = true;

        this.onClickBound = this.onClick.bind(this);
        this.onClickEndBound = this.onClickEnd.bind(this);
        this.onPointerMoveBound = this.onPointerMove.bind(this);
        app.stage
        .on('pointerdown', this.onClickBound)
        .on('pointerup', this.onClickEndBound)
        .on('pointerupoutside', this.onClickEndBound)
        .on('pointermove', this.onPointerMoveBound);
    }
    destroy()
    {
        this.graphics.destroy({ children: true});   
        app.stage
        .off('pointerdown', this.onClickBound)
        .off('pointerup', this.onClickEndBound)
        .off('pointerupoutside', this.onClickEndBound)
        .off('pointermove', this.onPointerMoveBound);
    }
    onClick(event) {
        if (this.dragging) return;
        for(let i = 0; i < this.draggable.length; i++)
        {
            const pos = event.data.global;
            if(this.draggable[i].getBounds().contains(pos.x, pos.y))
            {
                this.dragging = true;
                this.draggableSprite = this.draggable[i];
                this.draggableOffset.x = this.draggableSprite.x - pos.x;
                this.draggableOffset.y = this.draggableSprite.y - pos.y;
                this.originalPos.x = this.draggableSprite.x;
                this.originalPos.y = this.draggableSprite.y;
                return;
            }
        }
        
    }
    
    onClickEnd(event) {
        this.dragging = false;
        if(this.draggableSprite)
        {
            this.draggableSprite.x = this.originalPos.x;
            this.draggableSprite.y = this.originalPos.y;
        }
    }
    
    onPointerMove(event) {
        if (!this.dragging) return;
    
        const pos = event.data.global;
        this.draggableSprite.x = pos.x + this.draggableOffset.x;
        this.draggableSprite.y = pos.y + this.draggableOffset.y;
    }
    update(dt)
    {

    }
    addNewSprite(texturePath, x, y, width, height = -1, tag = Tags.NA)
    {
        let sprite = new CSprite(texturePath, x,y, width, height, tag);
        this.graphics.addChild(sprite);
        return sprite;
    }
    addNewDraggableSprite(texturePath, x, y, width, height = -1, tag = Tags.NA)
    {
        let sprite = this.addNewSprite(texturePath, x, y, width, height, tag);
        this.draggable.push(sprite);
        return sprite;
    }
    addDraggableSpriteDuplicate(texturePath, x, y, width, height = -1, tag = Tags.NA)
    {
        this.addNewSprite(texturePath, x, y, width, height, tag);
        let sprite = this.addNewSprite(texturePath, x, y, width, height, tag);
        this.draggable.push(sprite);
        return sprite;
    }
    addText(message, style, x = 0, y = 0)
    {
        let text = new PIXI.Text(message, style);
        text.x = x * getScreenWidth();
        text.y = y * getScreenHeight();
        this.graphics.addChild(text);
        return text;
    }
    displayWarning(message, duration, x = 0, y = 0)
    {
        const warningText = new PIXI.Text(message, warningStyle);
        warningText.x = x * getScreenWidth();
        warningText.y =  y * getScreenHeight();
        this.graphics.addChild(warningText);

        setTimeout(() => {
            this.graphics.removeChild(warningText);
            warningText.destroy();
        }, duration * 1000);
    }
    addButton(xPos, yPos, width, height, message, color = 0x0000FF, style = textStyle, tag = Tags.NA)
    {
        const button = new Button(xPos, yPos, width, height, message, color, style, tag);
        this.graphics.addChild(button);
        this.buttons.push(button);
        return button;
    }
    pointOnButton(x, y)
    {
        for(let i = 0; i < this.buttons.length; i++)
        {
            if(this.buttons[i].contains(x,y))
            {
                return this.buttons[i];
            }
        }

        return null;
    }
}

