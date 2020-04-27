let meter_ctx = null;
let meter_side = 0;
let meterValue = 0;
let meterIndicator = 0;
let meterInterval = [];
let meterZero = 0;
let meterAlpha = 0;
let multiplier = 0;

function resetMeterValues(){
	meterAlpha = 0;
	multiplier = 0;
}

function renderMeterBackground(val){
	let tot = (meter_side*0.385) + (meter_side*0.025);
	
	meter_ctx.beginPath();
	meter_ctx.fillStyle= '#c7c7c7';
	meter_ctx.arc((meter_side*0.475)-meter_side*0.19, (meter_side*0.475), meter_side*0.075, 0, Math.PI*2);
	meter_ctx.fill();
	
	meter_ctx.beginPath();
	meter_ctx.fillStyle= meterValue > 0 ? '#a83632' : '#5e97bd';
	meter_ctx.arc((meter_side*0.475)-meter_side*0.19, (meter_side*0.475), meter_side*0.055, 0, Math.PI*2);
	meter_ctx.fill();
	
	meter_ctx.beginPath();
	meter_ctx.lineCap="round";
	meter_ctx.lineWidth=0.05*meter_side;
	meter_ctx.strokeStyle= '#c7c7c7';
	//meter_ctx.beginPath();
	meter_ctx.moveTo(meter_side*0.285, (meter_side*0.025)+tot-(tot*val));
	//meter_ctx.moveTo(meter_side*0.285, meter_side*0.025);
	//meter_ctx.lineTo(meter_side*0.285, meter_side - (meter_side*0.475) - meter_side * 0.14);
	meter_ctx.lineTo(meter_side*0.285, tot);
	meter_ctx.stroke();
	

}

function renderMeterDial(val){
	let tot = (meter_side*0.385);// + (meter_side*0.05);
	
	meter_ctx.beginPath();
	meter_ctx.lineCap="round";
	meter_ctx.lineWidth=0.03*meter_side;
	meter_ctx.strokeStyle= meterValue > 0 ? '#a83632' : '#5e97bd';
	
	meter_ctx.moveTo(meter_side*0.285, (meter_side*0.385) + (meter_side*0.025));
	meter_ctx.lineTo(meter_side*0.285, (tot*((1-meterIndicator*val)))+meter_side*0.025);
	meter_ctx.stroke();
}

function renderMeterValue(val){
	let tot = (meter_side*0.385) + meter_side*0.025;
	// Meter value
	meter_ctx.font = meter_side*0.09+'px Helvetica';
	meter_ctx.fillStyle= meterValue > 0 ? '#a83632' : '#5e97bd';
	meter_ctx.fillText(meterValue+'\u00B0'+'C', meter_side*0.01, meter_side*0.325, meter_side*0.5);
	
	meter_ctx.font = meter_side*0.035+'px Helvetica';
	meter_ctx.fillStyle= '#000000';	
	
	// Meter tic marks
	meter_ctx.beginPath();
	meter_ctx.lineCap="butt";
	meter_ctx.lineWidth=0.0075*meter_side;
	meter_ctx.strokeStyle='#303030';
	
	// Lowest value tic
	meter_ctx.moveTo(meter_side*0.285, meter_side*0.4);
	meter_ctx.lineTo(meter_side*0.285 + (meter_side*0.065*val), meter_side*0.4);
	meter_ctx.stroke();	
	meter_ctx.fillText(Math.min(meterInterval[0],meterInterval[1]), meter_side*0.36, (meter_side*0.4) + meter_side*0.01, meter_side*0.5);
	
	// 0 tic
	meter_ctx.moveTo(meter_side*0.285, (tot*(1-meterZero)));
	meter_ctx.lineTo(meter_side*0.285 + (meter_side*0.065*val), (tot*(1-meterZero)));
	meter_ctx.stroke();
	meter_ctx.fillText(0, meter_side*0.36, (tot*(1-meterZero)) + meter_side*0.0175, meter_side*0.5);
	
	// Highest value tic
	meter_ctx.moveTo(meter_side*0.285, (meter_side*0.025));
	meter_ctx.lineTo(meter_side*0.285 + (meter_side*0.065*val), (meter_side*0.025));
	meter_ctx.stroke();	
	meter_ctx.fillText(Math.max(meterInterval[0],meterInterval[1]), meter_side*0.36, (meter_side*0.035), meter_side*0.5);	
}

function meter(){
	
	meter_ctx.clearRect(0,0,meter_side,meter_side);
	meterAlpha = meterAlpha+=0.02;
	multiplier = multiplier+=0.02;
	
	meter_ctx.globalAlpha = meterAlpha;
	
	renderMeterValue(multiplier);
	
	renderMeterBackground(multiplier);
	
	renderMeterDial(multiplier);
	
	if(meterAlpha<1){
		requestAnimationFrame(meter);
	} else {
		
	}
}

function renderMeter(){
	// Value
	meterValue = -1;
	// Display Interval
	meterInterval = [-6,6];
	
	let m1 = Math.min(meterInterval[0],meterInterval[1]);
	let m2 = Math.max(meterInterval[0],meterInterval[1]);
	
	// Add meter offset if necessary 
	let d = meterValue > 0 ? meterValue + Math.abs(m1) : Math.abs(m1) - Math.abs(meterValue);
	
	// Percentage of the value on the meter
	meterIndicator = Math.abs(d)/(Math.abs(meterInterval[0])+Math.abs(meterInterval[1]));
	
	// Find position of 0
	meterZero = Math.abs(m1)/(Math.abs(meterInterval[0])+Math.abs(meterInterval[1]));
	
	let component = document.getElementById('meter');
		
	const w = window.innerWidth;
	const h = window.innerHeight;
	meter_side = Math.min(w,h);
	component.width= (meter_side*0.5)+(meter_side*0.05);
	component.height = (meter_side*0.5)+(meter_side*0.05);
	meter_ctx = component.getContext("2d");
	meter_ctx.clearRect(0,0,meter_side,meter_side);
	meter();
}