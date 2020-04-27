let indicator_ctx = null;
let indicator_side = 0;
let indicator_value = 0;
let indiactor_progress_multiplier = 0; 
let indicatorAlpha = 0;

function resetIndicatorValues(){
	indicatorAlpha = 0;
}

function renderIndicatorBackground(){
	indicator_ctx.beginPath();
	indicator_ctx.fillStyle= '#2e2e2e';
	indicator_ctx.rect(indicator_side*0.075, indicator_side*0.175, indicator_side*0.4, indicator_side*0.2);
	indicator_ctx.fill();
}

function renderIndicatorTrend(){
	
	indicator_ctx.beginPath();
	indicator_ctx.strokeStyle = '#5ccf32';
	
	indicator_ctx.moveTo(indicator_side*0.275, indicator_side*0.025);
	indicator_ctx.lineTo(indicator_side*0.35, indicator_side*0.15);
	indicator_ctx.lineTo(indicator_side*0.2, indicator_side*0.15);
	indicator_ctx.closePath();
	indicator_ctx.stroke();
	
	indicator_ctx.beginPath();
	indicator_ctx.strokeStyle = '#cf3232';
	
	indicator_ctx.moveTo(indicator_side*0.275, indicator_side*0.525);
	indicator_ctx.lineTo(indicator_side*0.35, indicator_side*0.415);
	indicator_ctx.lineTo(indicator_side*0.2, indicator_side*0.415);
	indicator_ctx.closePath();
	indicator_ctx.stroke();
	
}

function renderIndicatorValue(){
	indicator_ctx.font = indicator_side*0.2+'px Helvetica';
	indicator_ctx.textAlign = "center"; 
	indicator_ctx.fillStyle= '#ffffff';	
	indicator_ctx.fillText(indicator_value, indicator_side*0.275, indicator_side*0.35, indicator_side*0.5);
}

function indicator(){
	
	indicator_ctx.clearRect(0,0,indicator_side, indicator_side);
	indicatorAlpha = indicatorAlpha+=0.02;
	indiactor_progress_multiplier = indiactor_progress_multiplier+=0.02;
	
	indicator_ctx.globalAlpha = indicatorAlpha;
	
	renderIndicatorBackground();
	
	renderIndicatorTrend();
	
	renderIndicatorValue();
	
	if(indicatorAlpha<1){
		requestAnimationFrame(indicator);
	} else {
		
	}
}

function renderIndicator(){
	// Value
	indicator_value = 999;
	
	let component = document.getElementById('indicator');
		
	const w = window.innerWidth;
	const h = window.innerHeight;
	indicator_side = Math.min(w,h);
	component.width= (indicator_side*0.5)+(indicator_side*0.05);
	component.height = (indicator_side*0.5)+(indicator_side*0.05);
	indicator_ctx = component.getContext("2d");
	indicator_ctx.clearRect(0,0,indicator_side,indicator_side);
	indicator();
}