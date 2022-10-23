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

const centerPos = 350;
const rightPos = 575;
const leftPos = 125;


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

	VNTalkSpriteOne = this.add.image(centerPos, 200, 'AnnNeutral');
		VNTalkSpriteOne.setScale(0.5);

	VNTextBox = this.add.rectangle(350, 430, 680, 120, 'black').setInteractive();
        VNTextBox.setOrigin(0.5, 0.5);
		VNTextBox.setStrokeStyle(4, '0xFFFFFF');

	VNText = this.make.text({x: 20, y: 380, text: "Click to begin",
		style: {
            font: 'bold 18px Courier',
			color: 'white',
			fontFamily: 'CustomFont',
			wordWrap: {width: 660, useAdvancedWrap: true}
		}
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
		case 's1':
			//Change sprite and advance story one index
			VNTalkSpriteOne.setTexture(orderArray[1]);
			advanceReady = true;
			advanceStory();
			break;
		case 't':
			//Change text but do not advance story
			VNText.setText(orderArray[1]);
			advanceReady = true;
			break;
        case 's1pl':
			//Move Sprite 1 to position left and have the tween call advance
			var tween = game.tweens.add({targets: VNTalkSpriteOne, x: leftPos, ease: 'Power1', duration: 3000, onComplete: function () { advanceReady = true; advanceStory(); }});
			break;
		default:
			VNText.setText = errorText;
			advanceReady = true;
			break;
	}
}
