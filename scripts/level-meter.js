

let level_ctx = null;
let level_side = 0;

let levelValue = 0;
let levelInterval = [];
let levelIndicator = 0;
let levelAlpha = 0;
let levelMultiplier = 0;

function resetLevelMeterValues(){
	levelAlpha = 0;
	levelMultiplier = 0;
}

function renderLevelMeterValue(mult){
	level_ctx.fillStyle = '#000000';
	level_ctx.strokeStyle = '#000000';
	
	level_ctx.lineWidth = level_side*0.0075;
	
	// Left tick
	level_ctx.beginPath();
	level_ctx.moveTo(level_side*0.05, level_side*0.2);
	level_ctx.lineTo(level_side*0.05, level_side*0.2+level_side*0.03*mult);
	level_ctx.stroke();

	//level_ctx.rect(0, level_side*0.225, level_side*0.125, level_side*0.075);
	
	// Left value
	level_ctx.beginPath();
	level_ctx.font = level_side*0.05+'px Helvetica';
	level_ctx.textAlign = "center";
	level_ctx.fillStyle= '#000000';
	level_ctx.fillText(Math.min(levelInterval[0],levelInterval[1]), level_side*0.05, level_side*0.285, level_side*0.15);
	
	// Right tick
	level_ctx.beginPath();
	level_ctx.moveTo(level_side*0.5, level_side*0.2);
	level_ctx.lineTo(level_side*0.5, level_side*0.2+level_side*0.03*mult);
	level_ctx.stroke();
	level_ctx.fillText(Math.max(levelInterval[0],levelInterval[1]), level_side*0.5, level_side*0.285, level_side*0.15);
	
	// Center box
	level_ctx.fillStyle = '#000000';
	level_ctx.beginPath();
	level_ctx.moveTo(level_side*0.2, level_side*0.225);
	// Top
	level_ctx.lineTo(level_side*0.35, level_side*0.225);
	level_ctx.quadraticCurveTo(level_side*0.4, level_side*0.225, level_side*0.4, level_side*0.275);
	// Right
	level_ctx.lineTo(level_side*0.4, level_side*0.35);
	level_ctx.quadraticCurveTo(level_side*0.4, level_side*0.4, level_side*0.35, level_side*0.4);
	// Bottom
	level_ctx.lineTo(level_side*0.2, level_side*0.4);
	level_ctx.quadraticCurveTo(level_side*0.15, level_side*0.4, level_side*0.15, level_side*0.35);
	// Left
	level_ctx.lineTo(level_side*0.15, level_side*0.275);
	level_ctx.quadraticCurveTo(level_side*0.15, level_side*0.225, level_side*0.2, level_side*0.225);
	
	level_ctx.fill();
	
	level_ctx.font = 'bold ' + level_side*0.15+'px Century Gothic';
	level_ctx.fillStyle= '#FFFFFF';
	level_ctx.fillText(levelValue, level_side*0.275, level_side*0.365, level_side*0.25);
	
}
	
function renderLevelMeterBackground(mult){
	
	level_ctx.strokeStyle = '#212121';
	level_ctx.lineWidth = level_side*0.1;
	level_ctx.lineCap = "round";
	
	level_ctx.beginPath();
	level_ctx.moveTo(level_side*0.05+level_side*0.25*(1-mult),level_side*0.15);
	level_ctx.lineTo(level_side*0.25+level_side*0.25*mult,level_side*0.15);
	level_ctx.stroke();
	
	level_ctx.strokeStyle = '#f2f2f2';
	level_ctx.lineWidth = level_side*0.075;
	
	level_ctx.beginPath();
	level_ctx.moveTo(level_side*0.05+level_side*0.25*(1-mult),level_side*0.15);
	level_ctx.lineTo(level_side*0.25+level_side*0.25*mult,level_side*0.15);
	level_ctx.stroke();
	
}

function renderLevelMeterDial(mult){
	level_ctx.strokeStyle = '#ffbb00';
	level_ctx.lineWidth = level_side*0.05;
	
	level_ctx.beginPath();
	level_ctx.moveTo(level_side*0.05+level_side*0.25*(1-mult),level_side*0.15);
	level_ctx.lineTo(level_side*0.05+level_side*0.25*(1-mult)+(mult*level_side*0.45*levelIndicator),level_side*0.15);
	
	//level_ctx.lineTo((level_side*0.5*levelIndicator),level_side*0.15);
	level_ctx.stroke();
}

function levelMeter(){
	
	level_ctx.clearRect(0,0,level_side,level_side);
	levelAlpha = levelAlpha+=0.02;
	levelMultiplier = levelMultiplier+=0.02;
	level_ctx.globalAlpha = levelAlpha;
	
	renderLevelMeterValue(levelMultiplier);
	
	renderLevelMeterBackground(levelMultiplier);
	
	renderLevelMeterDial(levelMultiplier);
	
	if(levelAlpha<1){
		requestAnimationFrame(levelMeter);
	} else {
	
	}
}

function renderLevelMeter(){
	// Value
	levelValue = -11.9;
	// Display Interval
	levelInterval = [-40,40];
	
	let m1 = Math.min(levelInterval[0],levelInterval[1]);
	let m2 = Math.max(levelInterval[0],levelInterval[1]);

	// Add meter offset if necessary 
	let d = levelValue > 0 ? levelValue + Math.abs(m1) : Math.abs(m1) - Math.abs(levelValue);
	
	// Percentage of the value on the meter
	levelIndicator = Math.abs(d)/(Math.abs(levelInterval[0])+Math.abs(levelInterval[1]));
	console.log(levelIndicator);
	let component = document.getElementById('level-meter');
	
	let w = window.innerWidth;
	let h = window.innerHeight;
	level_side = Math.min(w,h);
	component.width = (level_side*0.5)+(level_side*0.05);
	component.height = (level_side*0.5)+(level_side*0.05);
	
	level_ctx = component.getContext("2d");
	level_ctx.clearRect(0,0,level_side,level_side);
	levelMeter();
}