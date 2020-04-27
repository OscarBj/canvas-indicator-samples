
let bgAngle = 1.5;
let dAngle = 1.5;

let animation_sector_val = 0;

let sector_ctx = null;
let sector_alpha = 0;
let sector_side = 0;
let sector_val = 0;
let sector_deg = 0;
let sector_dial = 0;

function resetSectorValues(){
	bgAngle = 1.5;
	dAngle = 1.5;
	sector_alpha = 0;
	sector_dial = 0;
}

function renderGaugeSectorBackground(sector_ctx,sector_side){
	sector_ctx.beginPath();
	sector_ctx.lineCap="round";
	sector_ctx.lineWidth=0.05*sector_side;
	sector_ctx.strokeStyle='#9dbed4';
	//sector_ctx.beginPath();
	sector_ctx.arc(sector_side*0.275, sector_side*0.275, sector_side*0.25, Math.PI*0.75, Math.PI*bgAngle);
	sector_ctx.stroke();
}

function renderGaugeSectorsector_dial(sector_val){
	sector_ctx.beginPath();
	sector_ctx.lineWidth=0.05*sector_side;
	//sector_ctx.strokeStyle='#000000';
	sector_ctx.lineCap="round";
	sector_ctx.strokeStyle='#5e97bd';
	sector_ctx.arc(sector_side*0.275, sector_side*0.275, sector_side*0.25, Math.PI*0.75, sector_val*((Math.PI*0.75)/180)+Math.PI*0.75,false);
	sector_ctx.stroke();
}

function renderGaugeSectorsector_value(sector_ctx, sector_side, sector_val){
	sector_ctx.font = sector_side*0.2+'px Helvetica';
	sector_ctx.fillStyle='#5e97bd';
	sector_ctx.fillText(Math.round(sector_val*100)+'%', sector_side*0.09, sector_side*0.325, sector_side*0.5);
}

function gaugeSector(){
	
	sector_ctx.clearRect(0,0,sector_side,sector_side);
	sector_ctx.globalAlpha = sector_alpha;
	sector_alpha = sector_alpha+=0.02; 
	bgAngle = bgAngle+=0.015;
	dAngle = dAngle+=0.02;
	sector_dial = sector_dial+=sector_deg*0.02;
	sector_deg = sector_deg+=0.05;
	
	renderGaugeSectorBackground(sector_ctx,sector_side);

	renderGaugeSectorsector_dial(sector_dial);
	
	renderGaugeSectorsector_value(sector_ctx,sector_side,sector_val);
	
	if(bgAngle+0.015<2.25){
		requestAnimationFrame(gaugeSector);
	} else {
		console.log(sector_alpha);
	}
}

function renderSectorGauge(){
	sector_val = 0.95 // AKA 92 %
	
	sector_deg = 360*sector_val;
	let w = window.innerWidth;
	let h = window.innerHeight;
	sector_side = Math.min(w,h);
	
	let c2 = document.getElementById('gauge-sector');

	c2.width = (sector_side*0.5)+(sector_side*0.05);
	c2.height = (sector_side*0.5)+(sector_side*0.05);
	
	sector_ctx = c2.getContext("2d");	
	sector_ctx.clearRect(0,0,sector_side,sector_side);
	gaugeSector();
}