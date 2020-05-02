
let ball_ctx = null;
let ball_val = 0;
let ball_deg = 0;
let ball_side = 0;

let ball_dial_progress = 0;
let ball_bg_progress = 1.5;
let ball_alpha = 0;

function resetBallGaugeValues(){
	ball_dial_progress = 0;
	ball_bg_progress = 1.5;
	ball_alpha = 0;
}

function renderBallGaugeBackground(){
	ball_ctx.lineCap = "square";
	ball_ctx.lineWidth = 0.025*ball_side;
	ball_ctx.strokeStyle = "#456b85";
	
	ball_ctx.beginPath();
	ball_ctx.arc(ball_side*0.5, ball_side*0.55, ball_side*0.485, Math.PI*0.75, Math.PI*2.25);
	ball_ctx.lineTo(ball_side*0.17, ball_side*0.9);
	ball_ctx.stroke();
	
	ball_ctx.strokeStyle = "#9dbed4";
	ball_ctx.beginPath();
	ball_ctx.lineCap = "round";
	ball_ctx.lineWidth = 0.075*ball_side;
	ball_ctx.arc(ball_side*0.5, ball_side*0.55, ball_side*0.4, Math.PI*0.75, Math.PI*ball_bg_progress);
	ball_ctx.stroke();
}

function renderBallGaugeDial(){
	ball_ctx.lineWidth = 0.015*ball_side;
	ball_ctx.strokeStyle = "#FFFFFF";
	ball_ctx.fillStyle = "#5e97bd";
	
	ball_ctx.beginPath();
	ball_ctx.arc(ball_side*0.5+ball_side*0.39*Math.sin(Math.PI*((1-ball_dial_progress)*1.44+0.285)),ball_side*0.55+ ball_side*0.39*Math.cos(Math.PI*((1-ball_dial_progress)*1.44+0.285)), ball_side*0.075, 0, Math.PI*2);
	ball_ctx.fill();	
	ball_ctx.stroke();
}

function renderBallGaugeValue(){
	ball_ctx.font = ball_side*0.35+'px Helvetica';
	ball_ctx.textAlign = "center";
	ball_ctx.fillStyle = "#5e97bd";
	ball_ctx.fillText(Math.round((ball_val)*100), ball_side*0.5, ball_side*0.6, ball_side);
	ball_ctx.font = ball_side*0.275+'px Helvetica';
	ball_ctx.fillText('%', ball_side*0.5, ball_side*0.85, ball_side);

}

function ballGauge(){
	
	ball_ctx.clearRect(0, 0, ball_side, ball_side);
	ball_ctx.globalAlpha = ball_alpha;
	
	ball_alpha = ball_alpha+0.02;
	ball_bg_progress = ball_bg_progress+0.015;
	ball_dial_progress = ball_dial_progress+ball_val*0.02;
	
	renderBallGaugeBackground();
	renderBallGaugeDial();
	renderBallGaugeValue();
	
	if(ball_bg_progress+0.015<2.25){
		requestAnimationFrame(ballGauge);
	}
}

function renderBallGauge(){
	ball_val = 0.48;
	ball_deg = 360*ball_val
	let w = window.innerWidth;
	let h = window.innerHeight;
	ball_side = Math.min(w,h);
	ball_side = ball_side*0.8
	
	let c = document.getElementById('gauge-ball');
	c.width = ball_side;
	c.height = ball_side;
	
	ball_ctx = c.getContext("2d");
	ball_ctx.clearRect(0, 0, ball_side, ball_side);
	ballGauge();
}