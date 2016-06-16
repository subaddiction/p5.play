//mouse states and mouse events on sprites
//click and hold the mouse button while overing on the sprites

var asterisk;
var ghost;

function setup() {
  createCanvas(800, 400);

  ghost = createSprite(200, 200);
  ghost.addAnimation('normal', 'assets/ghost_spin0001.png', 'assets/ghost_spin0003.png');
  //detect the mouse position and click on this sprite
  //if no collider is defined, the image bounding box will be checked
  //ghost.mouseActive = true;

  asterisk = createSprite(600, 200);
 // asterisk.addAnimation('normal', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  //asterisk.addAnimation('stretch', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  asterisk.addAnimation('transform', 'assets/asterisk_circle0001.png', 'assets/asterisk_circle0008.png');
  asterisk.changeAnimation('transform');
  asterisk.animation.goToFrame(0);
  asterisk.mouseWasOver = false;

  //if defined, the collider will be used for mouse events
  asterisk.setCollider('circle', 0, 0, 64);

//	if(supportsTouch){
//		asterisk.onMouseOver = function() {
//			asteriskTouched(this);
//		};
//		
//		asterisk.onMouseOut = function() {
//			asteriskUntouched(this);
//		};
//		
//	} else {
//		asterisk.onMousePressed = function() {
//			asteriskTouched(this);
//		};
//		asterisk.onMouseReleased = function() {
//			asteriskUntouched(this);
//		};
//	}

	asterisk.onMousePressed = function() {
		asteriskTouched(this);
	};
	asterisk.onMouseReleased = function() {
		asteriskUntouched(this);
	};
	
	
	ghost.onMousePressed = function() {
		console.log('ghost Touched');
	};
	ghost.onMouseReleased = function() {
		console.log('ghost Untouched');
	};

}

function draw() {
  background(255, 255, 255);

  //if a sprite is mouseActive true I can check if the mouse is over its collider
  //and if the button is pressed

  drawSprites();
}



function asteriskTouched(sprite){
	//sprite.changeAnimation('transform');
	sprite.animation.goToFrame(sprite.animation.getLastFrame());
}

function asteriskUntouched(sprite){
	//sprite.changeAnimation('transform');
	sprite.animation.goToFrame(0);
}



var supportsTouch = false;
if ('ontouchstart' in window) {
    supportsTouch = true;
}
if(supportsTouch){
	
	function touchStarted(e){
		for(i=0;i<allSprites.length;i++){
			//console.log(allSprites.get(i));
			if(allSprites.get(i).mouseIsOver){
				allSprites.get(i).onMousePressed();
				allSprites.get(i).mouseWasOver = true;
			}
		}
	}
	
	function touchEnded(e){
	
		for(i=0;i<allSprites.length;i++){
			//console.log(allSprites.get(i));
			if(allSprites.get(i).mouseIsOver){
				allSprites.get(i).onMouseReleased();
			}
			allSprites.get(i).mouseWasOver = false;
		}
	}
	
	function touchMoved(e){
		
		for(i=0;i<allSprites.length;i++){
			//console.log(allSprites.get(i));
			//console.log(allSprites.get(i).mouseWasOver);
			
			if(allSprites.get(i).mouseWasOver){
			
				if(allSprites.get(i).mouseIsOver == false){
					
					allSprites.get(i).onMouseReleased();
					allSprites.get(i).mouseWasOver = false;
				}
				
			} else {
			
				if(allSprites.get(i).mouseIsOver == true){
					allSprites.get(i).onMousePressed();
					allSprites.get(i).mouseWasOver = true;
				}	
				
			}
		}
		
	}

}
