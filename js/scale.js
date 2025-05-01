class HangingScale extends CContainer
{
    constructor(xPos, yPos, width, height)
    {
        super(xPos,yPos,width,height);
        this.powder = null;
        this.scaleImage = new CSprite('../Images/hangingScale.png', 0,0,1,1, Tags.NA, false);
        const texture = PIXI.Texture.from('../Images/scaleBalance.png');
        this.addSprite(this.scaleImage);
        this.powderCount = 0;
        this.powderSize = 0.1;
        this.powderSpacing = 0.05;
        this.numRows = 4;
        this.curPowderTag = Tags.NA;
    }
    onClick(mortar)
    {
        mortar.addPowder(this.powderCount, this.curPowderTag);
        this.clearScale();
    }
    clearScale()
    {
        for (let i = this.children.length - 1; i >= 1; i--) {
            const child = this.children[i];
            this.removeChild(child);
            child.destroy(); // Optional: frees texture/memory
        }
        this.powderCount = 0;

    }
    addPowder(powder)
    {
        // Change powder type
        if(this.curPowderTag != powder.tag)
        {
            this.clearScale()
            this.curPowderTag = powder.tag;
        }
        if(this.numElementsFromRows() <= this.powderCount)
        {
            return;
        }
        const path = powder.texturePath;
        const point = this.getPyramidRowAndCol(this.powderCount);
        const xOffset = this.powderSpacing/2 * point.y;
        this.addSprite(new CSprite(path, point.x * this.powderSpacing+xOffset + 0.1, 1-point.y * this.powderSpacing - 0.28, this.powderSize, this.powderSize));
        this.powderCount ++;
        this.addSprite(new CSprite('../Images/scaleBalance.png', point.x * this.powderSpacing+xOffset + 0.65, 1-point.y * this.powderSpacing - 0.28, this.powderSize, this.powderSize));
        
    }
    numElementsFromRows()
    {
        let sum = 0;
        for(let i = 0; i < this.numRows; i ++)
        {
            sum += i + 1;
        }
        return sum;
    }
    getPyramidRowAndCol(index) {
        let row = 0;
        let count = 0;
    
        while (row < this.numRows) {
            const rowSize = this.numRows - row;
            if (index < count + rowSize) break;
            count += rowSize;
            row++;
        }
    
        const col = index - count;
        return { x: col, y: row };
    }
}