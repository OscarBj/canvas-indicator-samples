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
	let tot = (meter_side*0.725);//; + (meter_side*0.05);
	
	// Meter circle bg
	meter_ctx.beginPath();
	meter_ctx.fillStyle= '#c7c7c7';
	meter_ctx.arc((meter_side*0.95)-meter_side*0.4, (meter_side*0.85), meter_side*0.15, 0, Math.PI*2);
	meter_ctx.fill();
	
	// Meter circle fill
	meter_ctx.beginPath();
	meter_ctx.fillStyle= meterValue > 0 ? '#a83632' : '#5e97bd';
	meter_ctx.arc((meter_side*0.95)-meter_side*0.4, (meter_side*0.85), meter_side*0.11, 0, Math.PI*2);
	meter_ctx.fill();
	
	
	// Meter column
	meter_ctx.beginPath();
	meter_ctx.lineCap="round";
	meter_ctx.lineWidth=0.1*meter_side;
	meter_ctx.strokeStyle= '#c7c7c7';
	//meter_ctx.beginPath();
	meter_ctx.moveTo(meter_side*0.55, (meter_side*0.05)+tot-(tot*val));
	//meter_ctx.moveTo(meter_side*0.285, meter_side*0.025);
	//meter_ctx.lineTo(meter_side*0.285, meter_side - (meter_side*0.475) - meter_side * 0.14);
	meter_ctx.lineTo(meter_side*0.55, tot);
	meter_ctx.stroke();
	

}

function renderMeterDial(val){
	let tot = (meter_side*0.675);
	
	meter_ctx.beginPath();
	meter_ctx.lineCap="round";
	meter_ctx.lineWidth=0.06*meter_side;
	meter_ctx.strokeStyle= meterValue > 0 ? '#a83632' : '#5e97bd';
	
	meter_ctx.moveTo(meter_side*0.55, (meter_side*0.675) + (meter_side*0.05));
	meter_ctx.lineTo(meter_side*0.55, (tot*((1-meterIndicator*val)))+meter_side*0.05);
	meter_ctx.stroke();
}

function renderMeterValue(val){
	let tot = (meter_side*0.775);
	// Meter value
	meter_ctx.font = meter_side*0.2+'px Helvetica';
	meter_ctx.textAlign = "center";
	meter_ctx.fillStyle= meterValue > 0 ? '#a83632' : '#5e97bd';
	meter_ctx.fillText(meterValue+'\u00B0'+'C', meter_side*0.25, meter_side*0.55, meter_side);
	
	meter_ctx.font = meter_side*0.07+'px Helvetica';
	meter_ctx.fillStyle= '#000000';	
	
	meter_ctx.textAlign = "left";
	
	// Meter tic marks
	meter_ctx.beginPath();
	meter_ctx.lineCap="butt";
	meter_ctx.lineWidth=0.015*meter_side;
	meter_ctx.strokeStyle='#303030';
	
	// Lowest value tic
	meter_ctx.moveTo(meter_side*0.55, meter_side*0.725);
	meter_ctx.lineTo(meter_side*0.55 + (meter_side*0.13*val), meter_side*0.725);
	meter_ctx.stroke();	
	meter_ctx.fillText(Math.min(meterInterval[0],meterInterval[1]), meter_side*0.72, (meter_side*0.725) + meter_side*0.02, meter_side);
	
	// 0 tic
	if(Math.min(meterInterval[0],meterInterval[1]) < 0){
		meter_ctx.moveTo(meter_side*0.55, (tot*(1-meterZero)));
		meter_ctx.lineTo(meter_side*0.55 + (meter_side*0.13*val), (tot*(1-meterZero)));
		meter_ctx.stroke();
		meter_ctx.fillText(0, meter_side*0.72, (tot*(1-meterZero)) + meter_side*0.035, meter_side);
	}
	// Highest value tic
	meter_ctx.moveTo(meter_side*0.55, (meter_side*0.05));
	meter_ctx.lineTo(meter_side*0.55 + (meter_side*0.13*val), (meter_side*0.05));
	meter_ctx.stroke();	
	meter_ctx.fillText(Math.max(meterInterval[0],meterInterval[1]), meter_side*0.72, (meter_side*0.07), meter_side);	
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
	meterValue = 0;
	// Display Interval
	meterInterval = [-15,45];
	
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
	
	// Scale
	meter_side = meter_side*0.5
	
	component.width= meter_side;
	component.height = meter_side;
	meter_ctx = component.getContext("2d");
	meter_ctx.clearRect(0,0,meter_side,meter_side);
	meter();
}