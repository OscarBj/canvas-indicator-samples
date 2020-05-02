// arc(x, y, radius, startbg_angle, endbg_angle, anticlockwise)
// fillText(text, x, y [, maxWidth])

let bg_angle = 1.5;
let d_angle = 1.5;

let animation_val = 0;

let ctx = null;
let alpha = 0;
let side = 0;
let val = 0;
let deg = 0;
let dial = 0;

function resetGaugeValues(){
	bg_angle = 1.5;
	d_Angle = 1.5;
	alpha = 0;
	dial = 0;
}

function renderGaugeBackGround(){
	ctx.beginPath();
	ctx.lineWidth=0.1*side;
	ctx.lineCap="round";
	ctx.strokeStyle='#9dbed4';
	//ctx.beginPath();
	ctx.arc(side*0.5, side*0.5, side*0.45, Math.PI*1.5, Math.PI*bg_angle);
	
	ctx.stroke();
}

function renderGaugeDial(val){
	ctx.beginPath();
	ctx.lineWidth=0.1*side;
	//ctx.strokeStyle='#000000';
	ctx.lineCap="round";
	ctx.strokeStyle='#5e97bd';
	ctx.arc(side*0.5, side*0.5, side*0.45, Math.PI*1.5, val*(Math.PI/180)-Math.PI*0.5,false);
	ctx.stroke();
}

function renderGaugeValue(){
	
	ctx.font = side*0.35+'px Helvetica';
	ctx.fillStyle='#5e97bd';
	ctx.textAlign = "center"
	ctx.fillText(Math.round(val*100)+'%', side*0.55, side*0.6, side);
}
let y = 0;
function gaugeFull(){
	y++;
	ctx.clearRect(0,0,side,side);
	ctx.globalAlpha = alpha;
	alpha = alpha+=0.02; 
	bg_angle = bg_angle+=0.05;
	//d_angle = d_angle+=0.02;
	dial = dial+=deg*0.02;
	deg = deg+=0.05;
	
	renderGaugeBackGround();

	renderGaugeDial(dial);
	
	renderGaugeValue();
	
	if(bg_angle+0.05<4){
		requestAnimationFrame(gaugeFull);
	}
}



function animationLoop(){
 // Implement simultainous render of gauges
}

function renderGauge(){
	val = 0.95 // AKA 92 %
	
	deg = 360*val;
	let w = window.innerWidth;
	let h = window.innerHeight;
	side = Math.min(w,h);
	
	// Scale
	side = side*0.8;
	
	let c1 = document.getElementById('gauge-full');

	c1.width = side;//(side*0.5)+(side*0.05);
	c1.height = side;//(side*0.5)+(side*0.05);
	
	ctx = c1.getContext("2d");
	ctx.clearRect(0,0,side,side);
	gaugeFull();
}

//export default renderGauge;