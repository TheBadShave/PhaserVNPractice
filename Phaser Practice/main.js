
var config = {
	type: Phaser.AUTO,
	width: 700,
	height: 500,
	parent: 'gameSpace',
	//canvas: document.getElementById('gameSpace'),
	scene: {
		preload: preload,
		create: create
	}
};

var game = new Phaser.Game(config);

var directorOrder = 'ERROR';
var errorText = 'An error has occured.';
var advanceReady = true;


function preload ()
{
	this.load.image('sky', 'assets/pinksky.jpg');
	this.load.image('AnnAngry', 'assets/AnnAngry.png');
	this.load.image('AnnNeutral', 'assets/AnnNeutral.png');
	storyIndex = 0;
	directorOrder = story[storyIndex];

}

function create ()
{
	VNBackground = this.add.image(250, 250, 'sky');

	//VNTalkSprite = this.add.image(250, 400, 'AnnNeutral');
	VNTalkSprite = this.add.image(100, 200, 'AnnNeutral');
		VNTalkSprite.setScale(0.5);

	VNTextBox = this.add.rectangle(450, 160, 480, 300, 'black').setInteractive();
		VNTextBox.setStrokeStyle(4, '0xFFFFFF');

	VNText = this.make.text({
		x: 220, 
		y: 25,
		text: "Click to begin",
		style: {
			font: 'bold 18px Courier',
			color: 'white',
			fontFamily: 'CustomFont',
			wordWrap: {width: 475}
		}
	});

	VNChoiceOne = this.add.rectangle(450, 345, 480, 50, 'black').setInteractive();
		VNChoiceOne.setStrokeStyle(4, '0xFFFFFF');
		VNChoiceOneText = this.make.text({x: 380, y: 338, text: "Click to begin", style: { font: 'bold 18px Courier', color: 'white', fontFamily: 'CustomFont', wordWrap: {width: 475}}});

	VNChoiceTwo = this.add.rectangle(450, 405, 480, 50, 'black').setInteractive();
		VNChoiceTwo.setStrokeStyle(4, '0xFFFFFF');
		VNChoiceTwoText = this.make.text({x: 380, y: 398, text: "Click to begin", style: { font: 'bold 18px Courier', color: 'white', fontFamily: 'CustomFont', wordWrap: {width: 475}}});

	//VNChoiceOne.setVisible(false);
	//VNChoiceOneText.setVisible(false);
	//VNChoiceTwo.setVisible(false);
	//VNChoiceTwoText.setVisible(false);

	VNChoiceOne.on('pointerover', function (event) {
        this.setFillStyle('0xFFFFFF');
		VNChoiceOneText.setColor('black');
    });

	VNChoiceOne.on('pointerout', function (event) {
        this.setFillStyle('black');
		VNChoiceOneText.setColor('white');
    });

	VNChoiceTwo.on('pointerover', function (event) {
        this.setFillStyle('0xFFFFFF');
		VNChoiceTwoText.setColor('black');
    });

	VNChoiceTwo.on('pointerout', function (event) {
        this.setFillStyle('black');
		VNChoiceTwoText.setColor('white');
    });


	 VNTextBox.on('pointerdown', function (pointer) {
		advanceStory();
	});

	//Additional func call to start story
	executeOrder(directorOrder);

}



function advanceStory(){
	if (advanceReady){
		advanceReady = false;
		storyIndex++;
		directorOrder = story[storyIndex];
		executeOrder(directorOrder);
	}
}

function executeOrder (orderToExecute)
{
	console.log("attempting to execute "+orderToExecute);

	//Catch if end of game and break
	if (orderToExecute === undefined) return;

	//Break String to Arra
	var orderArray = orderToExecute.split("|");

	console.log("Accepting Command "+orderArray[0]);

	//Use First Element to Determine Command Type
	switch(orderArray[0]) 
	{
		case 's':
			//Change sprite and advance story one index
			console.log("Change Texture to "+orderArray[1]);
			VNTalkSprite.setTexture(orderArray[1]);
			advanceReady = true;
			advanceStory();
			break;
		case 't':
			//Change text but do not advance story
			console.log("Change Text to "+orderArray[1]);
			VNText.setText(orderArray[1]);
			advanceReady = true;
			break;
		default:
			VNText.setText = errorText;
			advanceReady = true;
			break;
	}
}