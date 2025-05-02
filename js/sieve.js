class Sieve extends Scene
{
    constructor()
    {
        super('../Images/splitBackground.png');
        this.addNewSprite('../Images/bucketTop.png', 0.51, 0.25, 0.48, 0.6);
        this.addNewSprite('../Images/woodStick.png', 0.45, 0.41, 0.58);
        this.addNewSprite('../Images/sieveSmall.png', 0.525, 0.27, 0.45, 0.56);
        this.gunpowderPasteRight = this.addNewSprite('../Images/gunpowderPaste.png', 0.52,0.28,0.45,0.55);

        this.addNewSprite('../Images/bucketBack.png', 0.1,0.75,0.3);
        this.gunpowder = this.addNewSprite('../Images/gunpowder.png', 0.04,0.87,0.39,0.05);
        this.addNewSprite('../Images/bucketHollow.png', 0,0.5,0.5);
        this.addNewSprite('../Images/woodStick.png', -0.03, 0.41, 0.54);
        this.addNewSprite('../Images/sieveSide.png', 0, 0.39, 0.5, 0.22);
        this.gunpowderPasteLeft = this.addNewSprite('../Images/gunpowderPaste.png', 0,0.38,0.49,0.11);
        
        this.backButton = this.addButton(0.01,0.02,0.1,0.06, 'Back', 0xff0000, textStyle, Tags.BACK_BUTTON);
        this.nextButton = this.addButton(0.83,0.02,0.1,0.06, 'Next', 0xff0000, textStyle, Tags.NEXT_BUTTON);
        this.instructions = this.addText('Force gunpowder paste through sieve.', textStyle);

        this.hand = this.addNewSprite('../Images/hand.png', 0,0,0.1);
        this.hand.anchor.set(0.5);
    }

    onPointerMove(event) {
        const pos = event.data.global;

        this.hand.x = pos.x;
        this.hand.y = pos.y;
        
        super.onPointerMove(event);

    }
}