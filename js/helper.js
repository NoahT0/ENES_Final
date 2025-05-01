
class InputManager
{
    constructor()
    {
        this.keys = {};
        this.previousKeys = {};
        window.addEventListener("keydown", (e) => this.keysDown(e));
        window.addEventListener("keyup", (e) => this.keysUp(e));
    }
    update()
    {
        this.previousKeys = { ...this.keys };
    }
    keysDown(e)
    {
        this.keys[e.keyCode] = e.key;
    }
    keysUp(e)
    {
        delete this.keys[e.keyCode];
    }
    isKeyDown(char)
    {
        for (let keyCode in this.keys)
        {
            // Check if the key is currently pressed down
           // console.log(input.keys[keyCode], keyCode);
            if (this.keys[keyCode] === char) 
            {
              return true;
            }
          }
          return false; 
    }
    isKeyPressed(char)
    {
        if(!isKeyDown(char))
        {
            return false;
        }
    
        for (let keyCode in this.previousKeys) {
            
            // Check if the key is currently pressed down
            // console.log(input.keys[keyCode], keyCode);
            if (this.previousKeys[keyCode] === char) {
                return false;
            }
        }
        return true;
    }
}

function isKeyDown(char){
  return input.isKeyDown(char);
}

function isKeyPressed(char)
{
    return input.isKeyPressed(char);
}

class Vec2{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }
  static scale(v, amount)
  {
    let vNew = v.clone();
    //console.log("venes", vNew);
    return vNew.scale(amount);
  }
  static add(v1, v2)
  {
    v1 = v1.clone();
    return v1.add(v2);
  }
  add(other)
  {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  subtract(other)
  {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  scale(amount)
  {
    this.x *= amount;
    this.y *= amount;
    return this;
  }
  distance(other)
  {
    let dx = this.x - other.x;
    let dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  copy(other)
  {
    this.x = other.x;
    this.y = other.y;
    return this;
  }
  clone()
  {
    return new Vec2(this.x,this.y);
  }
  normalize(){
    var length = Math.sqrt(this.x*this.x+this.y*this.y);
    this.x = this.x/length;
    this.y = this.y/length;
    
  }
}


function getScreenWidth()
{
    return app.renderer.width;
}
function getScreenHeight()
{
    return app.renderer.height;
}
function drawRectangle(x,y, width,height, color = 0xAaAAAa, graphics = null ,angle = 0){
    var rect = new PIXI.Graphics();
    rect.beginFill(color);
    rect.drawRect(0,0,1,1);
    rect.endFill();
    var texture = app.renderer.generateTexture(rect);
    var shape = new PIXI.Sprite(texture);
    if(graphics === null)
    {
        app.stage.addChild(shape);
    }
    else
    {
        graphics.addChild(shape);
    }
    
    shape.x = x;
    shape.y = y;
    shape.scale.set(width,height);
    shape.rotation = angle;
    //var rectangle = Instantiate(shape, position,0,size);
    return shape;
}
  
function drawCircle(x,y,radius,color = 0xAaAAAa, graphics = null){
    var circ = new PIXI.Graphics();
    circ.beginFill(color);
    circ.drawCircle(0,0,radius);
    circ.endFill();
    var texture = app.renderer.generateTexture(circ);
    var shape = new PIXI.Sprite(texture);
    if(graphics === null)
    {
        app.stage.addChild(shape);
    }
    else
    {
        graphics.addChild(shape);
    }
    shape.x = x;
    shape.y = y;
    shape.anchor.x = 0.5;
    shape.anchor.y = 0.5;
    return shape;
}
function drawLine(x1,y1,x2,y2,thickness = 1,color =0xffffff, graphics = null ){
    var myGraph = new PIXI.Graphics(); 
    myGraph.lineStyle(thickness, color)
    myGraph.moveTo(x1, y1)
    myGraph.lineTo(x2, y2);
    if(graphics === null)
    {
        app.stage.addChild(myGraph);
    }
    else
    {
        graphics.addChild(myGraph);
    }
    return myGraph;
}


// bounds(x,y,width,height) between 0 and 1. Relative to renderer size
function newSpriteWithBounds(texturePath, x, y, width, height = -1)
{
  let sprite = new CSprite(texturePath, x, y, width, height);
  return sprite;
}

function cloneSprite(sprite) {
  const s = new PIXI.Sprite(sprite.texture);
  s.x = sprite.x;
  s.y = sprite.y;
  s.anchor.set(sprite.anchor.x, sprite.anchor.y);
  s.scale.set(sprite.scale.x, sprite.scale.y);
  s.rotation = sprite.rotation;
  s.alpha = sprite.alpha;
  return s;
}

const textStyle = new PIXI.TextStyle({
  fill: 0xffffff,
  fontSize: 18,
  fontFamily: 'Montserrat Medium'
});

function clamp(num, lowerBound, upperBound)
{
  if(num < lowerBound)
  {
    return lowerBound;
  }
  if(num > upperBound)
  {
    return upperBound;
  }

  return num;
}
