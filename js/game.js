let app;

let ticker = PIXI.Ticker.shared;
ticker.autoStart = false;
ticker.add(update);

// Set the frame rate
ticker.maxFPS = 60;
//ticker.speed = 0.5;

let input;
let sceneManager;

function start()
{
    app = new PIXI.Application({ width: 940, height: 760, backgroundColor: 0xffeca6});
    console.log(app);
    document.body.appendChild(app.view);
    input = new InputManager();
    sceneManager = new SceneManager(new Sieve());
    console.log(getScreenWidth());
    
    ticker.start();

}


function update(delta)
{
    //console.log(1/delta * 60);
    //console.log("pressed", isKeyPressed('a'));
    for(let i = 0; i<1; i++)
    {
        sceneManager.update(delta);
        input.update();
    }
    
    
}

start();