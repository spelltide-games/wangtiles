// JavaScript Document  ontouchmove

window.areaCol = 0;
window.areaRow = 0;
 
function init() {  // on page load

		document.body.addEventListener('touchmove',function(event){event.preventDefault();},false); 
		
	var theZone = document.getElementById("zone");
	theZone.addEventListener("mousemove", getMousePosition, false);
	
	/*theZone.addEventListener('touchmove', getMousePosition, false);*/
	
	theZone.addEventListener('touchmove', function(e){ 
	
	var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;
	
	var new_areaCol = Math.round (xPosition / 32) -1;
	var new_areaRow = Math.round (yPosition / 32) -1;
	
	if ( (new_areaCol !== areaCol) || ( new_areaRow !== areaRow) ) {
		
		alert();
		
		window.areaCol = parseInt(new_areaCol);
		window.areaRow = parseInt(new_areaRow);
		
		var theOver = document.getElementById("over");
		theOver.style.left = 32 * window.areaCol +16 + "px"; 
		theOver.style.top = 32 * window.areaRow +16 + "px";
		
		var stageInfo = document.getElementById('stageInfo');
		stageInfo.innerHTML = "Col: " + window.areaCol + "   Row: " + window.areaRow;
		
		var tileID = window.areaCol + '_' + window.areaRow;
		var tile = document.getElementById(tileID);
		tile.src = "../art/block/pool/1.gif";
	}
	//e.preventDefault();  // ipad
	 e.preventDefault(); });
	
	/*theZone.addEventListener("mouseout", leaveElement, false);*/
	<!--theZone.addEventListener("click", clickElement, false);-->    no click!!
	
	tableWrite();
}

function leaveElement() {
	var theOver = document.getElementById("over");
	theOver.style.left = -32 + "px"; 
    theOver.style.top = -32 + "px";
}

function clickElement() {
	var theDown = document.getElementById("down");
	theDown.style.left = 32 * areaCol +16 + "px"; 
    theDown.style.top = 32 * areaRow +16 + "px";
	
	var tileID = areaCol + '_' + areaRow;
	var tile = document.getElementById(tileID);
	tile.src = "../art/block/pool/1.gif";
}
 
function getMousePosition(e) {
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;
	
	var new_areaCol = Math.round (xPosition / 32) -1;
	var new_areaRow = Math.round (yPosition / 32) -1;
	
	if ( (new_areaCol !== areaCol) || ( new_areaRow !== areaRow) ) {
		
		//alert();
		
		window.areaCol = parseInt(new_areaCol);
		window.areaRow = parseInt(new_areaRow);
		
		var theOver = document.getElementById("over");
		theOver.style.left = 32 * window.areaCol +16 + "px"; 
		theOver.style.top = 32 * window.areaRow +16 + "px";
		
		var stageInfo = document.getElementById('stageInfo');
		stageInfo.innerHTML = "Col: " + window.areaCol + "   Row: " + window.areaRow;
		
		var tileID = window.areaCol + '_' + window.areaRow;
		var tile = document.getElementById(tileID);
		tile.src = "../art/block/pool/1.gif";
	}
	//e.preventDefault();  // ipad
}
 
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function tableWrite() {
	var text = "";
	for (var j = 0; j <= 11; j++) {  // row
		for (var i = 0; i <= 17; i++) { // col
			text += '<img id="' + i + '_' + j + '" src="../art/block/pool/0.gif" width="32" height="32">';
		}
	}
	var theArea = document.getElementById('area');
	theArea.innerHTML = text;
}