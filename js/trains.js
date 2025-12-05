// JavaScript Document

// declare globals

var g_animate = null;
//clearTimeout(g_animate);  // just in case running
var g_halt = 0;  // 0: reset (train on halt tile), 1: run, 2: paused, 3: halt (hit buffers)
var g_halt_id = 0;  // if more than 1 reset tile

var g_play;  // if 'a_' then first (and maybe only) stage
var g_loco_h;  // start heading 0 North, 1 East, 2 South, 3 West
var g_lazy_x;  // array
var g_lazy_y;  // array
var g_gang_l;  // array
var g_field;  // array

var g_tens_p;  // array, places
var g_tens_l;  // array, links
var g_tens_v;  // array, values

var loco = {  // new object, id = loco
    x: 0,  // loco tile x pos
    y: 0,   // loco tile y pos
    h: 0,  // loco heading, 0 1 2 or 3, for n e s or w
    dx: 0,  // loco x heading -1 0 or 1
    dy: 0  // loco y heading -1 0 or 1
};

/* pre load loco images for animations */
for (var i=0; i<15; i+=2) {
	var image = "img" + i;
	image = new Image(32,32);
	image.src = "loco/" + i + ".gif";
}

/*window.onload = function new_window() {  // on page load
    g_play = "a_";
    place();
}*/

function play(board) {  // on sprite click with not current board id 
	g_halt = 0;
	g_halt_id = 0;

    // turn off old border, using old value of g_play
    if (g_play !== undefined) {  // not first selection
        var obj  = document.getElementById(g_play + "bg");
        obj.style.borderColor = '#a3b1a3';
	}
	
    g_play = board;  // new board global

    var functionName = g_play + "init";  // eg "b_init"
    window[functionName]();  // set globals ... g_halt and g_halt_id = 0

    // turn on new border
    var obj  = document.getElementById(g_play + "bg");
    obj.style.borderColor = '#a66';
	
	// set sprite positions if not done before UD
	var tobj  = document.getElementById(g_play + 0);
	if (tobj.offsetTop == 32*g_field.length) {  // first time
		place();  // set sprite positions and attach handles
		}
	else {  // returning to a previously used board, so just reset sprites
		reset_lazy();  // reset lazy sprites
	}
	reset_loco();  // place and reset loco on halt_id tile
}

function place() {  // when user has selected board
	// place lazy and halts. All have default opacity 0
    for (var i=0; i<g_lazy_x.length; i++) {  
        var pos_x = 32*(g_lazy_x[i]);
        var pos_y = 32*(g_lazy_y[i]);
        var obj  = document.getElementById(g_play + i);
        obj.style.left = pos_x + "px";
        obj.style.top  = pos_y + "px";
		
		if (obj.hasAttribute("onclick")) {  // no border for no click tiles  ie9!!

			obj.onmouseover = function() {
				var res = this.id.split("_");  // array with board and number    
				var board = String(res[0]) + '_';  // get board
   				if (board !== g_play) {return; }  // mouse over another board
				var idd = parseInt(res[1],10);  // get id as an integer
				var ob  = document.getElementById(g_play + "over");
				
				ob.style.opacity = 1;  // show over tile
				
				var pos_xx = 32*(g_lazy_x[idd]);  // place over tile
				var pos_yy = 32*(g_lazy_y[idd]);
				ob.style.left = pos_xx-2 + "px";  //  -2 as over size
				ob.style.top  = pos_yy-2 + "px";
			}    
	
			obj.onmouseout = function() {
				var ob = document.getElementById(g_play + "over");
				ob.style.opacity = 0;
			}
			
		}
        if (i===0 || i > g_gang_l.length-1) {obj.style.opacity = 1; }  // show halt tile to cover bg image
    }
    
    var obj = document.getElementById(g_play + "loco");
    obj.style.opacity = 1;  // show loco tile
    obj.style.pointerEvents = "none";  // can't click loco
    var obj = document.getElementById(g_play + "over");
    obj.style.pointerEvents = "none";  // can't click cursor
	
	// place tens readout (s)
    for (var i=0; i<g_tens_p.length; i++) {  // OK if empty []
	    var pos_x = 32*(g_tens_p[i][0]);  //-2
        var pos_y = 32*(g_tens_p[i][1]);  //+5
		var j=i+1;  // ids of 0 do not exist
        var obj = document.getElementById(g_play + "tens" + j);
        obj.style.left = pos_x + "px";
        obj.style.top  = pos_y + "px";
		obj.value = 0;  // always 0
		obj.style.pointerEvents = "none";  // can't click tens textarea
	}
}

function reset_lazy() {  // reset lazy sprites
	for (var i=1; i<g_gang_l.length; i++) {  // 1!!  not halt tiles
		var obj  = document.getElementById(g_play + i);
		obj.style.opacity = 0;  // hide over tiles
		
		var functionName = g_play + "init";  // eg "b_init"
   		window[functionName]();  // set globals ... g_halt and g_halt_id = 0
	}
	// and also reset all tens readouts to 0
	for (var i=0; i<g_tens_p.length; i++) {
		var j=i+1;  // ids of 0 do not exist
        var obj = document.getElementById(g_play + "tens" + j);
		obj.value = 0;  // always 0
	}
}

function reset_loco() {  // reset loco
	g_halt = 0;  // train reset (not g_halt_id)
    clearTimeout(g_animate); g_animate = null;
	
    loco.x  = g_lazy_x[g_halt_id];  // loco tile x pos
    loco.y  = g_lazy_y[g_halt_id];  // loco tile y pos
	//loco.h  = g_loco_h;
	loco.h  = getResetHeading();  // not g_loco_h
    locodxdy();  // loco dx and dy

    // set loco tile on stage
    var locotile = document.getElementById(g_play + "loco");
    locotile.style.left = 32*(loco.x) + "px";
    locotile.style.top  = 32*(loco.y) + "px";
    locotile.setAttribute("src", "loco/" + 4*loco.h + ".gif");
}

// user input

function swit(str) {  // mouse click on olay sprite

    var res = str.split("_");  // array with board and number    
    var board = String(res[0]) + '_';  // get board
    var id = parseInt(res[1],10);  // get id as an integer

    if (board !== g_play) {  // switch to another board
		//event.stopPropagation();
		play(board);
		return;
	}
	
    if (id == 999) {  // bg click
		if (g_halt == 1) pause_loco();  // pause if running
		else if (g_halt == 3) reset_loco();  // reset if halted
		else run_loco();  // else run if g_halt = 0 or 2
		return;
	}
	
    if (id === 0 || id > g_gang_l.length-1) {  // clicked a reset tile
		if (g_halt === 0 && id == g_halt_id) {
			if (confirm("Reset all points?") == true) {reset_lazy(); }  // loco already reset UD
		}
		else {
		g_halt_id = id;  // update global halt_id
		reset_loco();  // reset loco as paused (2) or halted (3)  // UD
		}
		return;
	}

    // else must be a point so switch
	flip(id);
}

function man_swit(str) {  // mouse click on olay sprite

    var res = str.split("_");  // array with board and number    
    var board = String(res[0]) + '_';  // get board
    var id = parseInt(res[1],10);  // get id as an integer

    if (board !== g_play) {  // switch to another board
		//event.stopPropagation();
		play(board);
		return;
	}

    // else must be a manual point so switch
	man_flip(id);
}

function run_loco() {  // run loco
	g_halt = 1;
    c2e();
}

function pause_loco() {  // pause loco
	g_halt = 2;
    clearTimeout(g_animate); g_animate = null;
}

function halt_loco() {  // halt loco, has hit buffers. If click bg, reset.
	g_halt = 3;
    clearTimeout(g_animate); g_animate = null;
}

function c2e() {  // tile center to edge
    // move locotile on stage to edge of cell
    var locotile = document.getElementById(g_play+"loco");
    locotile.style.left = 32*(loco.x) + (16*loco.dx) + "px"; // move left right by 16px
    locotile.style.top  = 32*(loco.y) + (16*loco.dy) + "px"; // move up down by 16px

    // set loco frame
    locotile.setAttribute("src", "loco/" + 4*loco.h + ".gif");

    g_animate = setTimeout(e2c,80); // call e2c() after delay
}

function e2c() {  // tile edge to center
    var locotile = document.getElementById(g_play + "loco");

    // move loco on field
    loco.x = loco.x + loco.dx;  // loco x pos
    loco.y = loco.y + loco.dy;  // loco y pos

    // get new loco heading
    var newDir = getHeading();  // return tile entry heading 1 2 3

    // check if we need to halt
    if (newDir == 6) {
        locotile.style.left = 32*(loco.x) + "px"; // move left right by 16px
		locotile.style.top = 32*(loco.y) + "px"; // move left right by 16px
        halt_loco();
        return;  // end anim as timeout not set
    }
	
	// check if we need to flip lazy point tile
    if (newDir > 4) {
        var id = getId();  // get id of lazy point at current position
        flip(id);  // flip lazy point - and all gang linked points
        newDir = (newDir - 4) %4;
        }
    newDir = (newDir - 2);  // -1 0 1

    // set loco frame
    var frame = parseInt(16 + 4*loco.h + (2*newDir),10) %16;
    locotile.setAttribute("src", "loco/" + frame + ".gif");

    // old offsets
    var old_dx = loco.dx; // left right
    var old_dy = loco.dy; // up down

    // set new loco h dx dy
    loco.h = (4 + loco.h + newDir) %4;
    locodxdy();

    // move locotile on stage, with curve of 5px
    locotile.style.left = 32*(loco.x) + (5*(loco.dx - old_dx)) + "px"; // move left right by 16px
    locotile.style.top  = 32*(loco.y) + (5*(loco.dy - old_dy)) + "px"; // move up down by 16px

    g_animate = setTimeout(c2e,80); // call c2e() after delay
}

function flip(id) {  // user or loco request UD
    var orig_id = id;
    do {
        showhide(id);
        id = g_gang_l[id];  // get next gang link
    }
    while (orig_id != id);
}

function showhide(num) {  // show/hide switches
    var x = g_lazy_x[num];
    var y = g_lazy_y[num];
    var e = document.getElementById(g_play + num);
	if (e.style.opacity == 0) {  // '0'  has to be == not ===
		e.style.opacity = 1;
	}
	else e.style.opacity = 0;  // '1'
	
	// update tens display
	if (g_tens_p.length !== 0 && g_tens_l[num] !== 0) {
		var tens = g_tens_l[num];  // link num
		var valu = g_tens_v[num];  // binary value
		// always add to tens if opacity 1 and subtract from tens if opacity 0
		if (e.style.opacity == 0) valu = -1*valu;
		var t = document.getElementById(g_play + "tens" + tens);
		t.value = parseFloat(t.value) + valu;  // not Int as 0.5
	}

	switch(g_field[y][x]) {  // get current data
	
	case 7213:
		g_field[y][x] = 3251;
		break;
	case 3251:
		g_field[y][x] = 7213;
		break;
		
	case 5132:
		g_field[y][x] = 1372;
		break;
	case 1372:
		g_field[y][x] = 5132;
		break;
		
	case 2513:
		g_field[y][x] = 2137;
		break;
	case 2137:
		g_field[y][x] = 2513;
		break;
		
	case 3721:
		g_field[y][x] = 1325;
		break;
	case 1325:
		g_field[y][x] = 3721;
		break;
		
	default:
		alert("lazy point not found at "+g_field[y][x]);
		break;
	}
}

function man_flip(num) {  // user request UD  // loco sees full points as normal lazy points !!
    var e = document.getElementById(g_play + num);
	if (e.style.opacity == 1) {  // if visible, hide
		e.style.opacity = 0;  // make invisible
		man_hide(num);
	}
	else {  // assume invisible, so first make all invisible
		var orig_id = num;
		do {
			var e = document.getElementById(g_play + num);
			if (e.style.opacity == 1) {  // if visible, hide
			e.style.opacity = 0;  // make invisible
			man_hide(num);
			}
			num = g_gang_l[num];  // get next gang link as 'radio' switches
		}
		while (orig_id != num);
		
		// make visible
		var e = document.getElementById(g_play + orig_id);
		e.style.opacity = 1;  // make visible
		man_show(orig_id);
	}
}

function man_hide(num) {  // hide manual switch
    var x = g_lazy_x[num];
    var y = g_lazy_y[num];

	switch(g_field[y][x]) {  // get current data
	
	case 1362:
		g_field[y][x] = 1262;
		break;
	case 6132:
		g_field[y][x] = 6232;
		break;
	case 6213:
		g_field[y][x] = 6212;
		break;
	case 3261:
		g_field[y][x] = 3262;
		break;
		
	default:
		alert("lazy point not found at "+g_field[y][x]);
		break;
	}
}

function man_show(num) {  // show manual switch
    var x = g_lazy_x[num];
    var y = g_lazy_y[num];

	switch(g_field[y][x]) {  // get current data
	
	case 1262:
		g_field[y][x] = 1362;
		break;
	case 6232:
		g_field[y][x] = 6132;
		break;
	case 6212:
		g_field[y][x] = 6213;
		break;
	case 3262:
		g_field[y][x] = 3261;
		break;
		
	default:
		alert("lazy point not found at "+g_field[y][x]);
		break;
	}
}

function locodxdy() {  // update loco dx and dy from loco heading
    var directions = [ [0,-1],[1,0],[0,1],[-1,0] ]  // n e s w
    var direction = directions[loco.h];  // select a direction
    loco.dx = direction[0];  // loco dx
    loco.dy = direction[1];  // loco dy
}

function getResetHeading() {  // return heading when loco reset
    var newDir = String(g_field[loco.y][loco.x]);  // fieldData
    if (newDir == "undefined") {return g_loco_h; }  // vert ot horiz straight
	else {
		for (var i=0; i<4; i++) {  // step through data
			if (newDir.charAt(i) == "6") {return (i+2)%4; }
		}
	}
	alert("no direction");
}

function getHeading() {  // return tile entry heading
    var newDir = String(g_field[loco.y][loco.x]);  // fieldData
    if (newDir == "undefined") {newDir = "2222"; }
    return newDir = Number(newDir.charAt(loco.h));  // get single character as number
}

function getId() {  // return tile id
    for (var i=1; i<g_lazy_x.length; i++) {  // ignore first 'loco' item
        if (g_lazy_x[i] == loco.x && g_lazy_y[i] == loco.y) {return i; }   // Found it
    }
    alert("Not found tile id");   // Not found
}


window.onload = function() {  // menu hilight
	/*var menuarea = document.getElementById("menu");*/
	var loc = document.URL.replace(/#.*$/, "");  // remove hashtag anchors
	for (var i = 0; i < document.links.length; i++) {
		if (document.links[i].href == loc ) {
			document.links[i].style.background = '#cdd9eb';
			return;
		}
	}
}
