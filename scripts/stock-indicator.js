
let stock_ctx = null;
let stock_side = 0;
let stockAlpha = 0;

let index = "";
let price = "";
let currency = "";
let diff = "";
let timestamp = "";

function resetStockIndicatorValues(){
	stockAlpha = 0;
}

function renderStockBackground(){
	stock_ctx.lineCap="round";
	stock_ctx.lineWidth=0.01*stock_side;
	stock_ctx.strokeStyle="#000000";
	
	stock_ctx.moveTo(stock_side*0.05,stock_side*0.25);
	stock_ctx.lineTo(stock_side*0.5,stock_side*0.25);
	stock_ctx.stroke();
}

function renderStockValues(){
	stock_ctx.font = stock_side*0.06+'px Helvetica';
	stock_ctx.textAlign = "center"; 
	stock_ctx.fillStyle= diff > 0 ? '#5ccf32' : '#cf3232';	
	stock_ctx.fillText(diff+"%", stock_side*0.135, stock_side*0.225, stock_side*0.5);

	stock_ctx.font = stock_side*0.1+'px Helvetica';
	stock_ctx.textAlign = "right"; 
	stock_ctx.fillStyle= '#000000';	
	stock_ctx.fillText(index, stock_side*0.5, stock_side*0.2, stock_side*0.5);

	stock_ctx.font = stock_side*0.04+'px Helvetica';
	stock_ctx.textAlign = "center"; 
	stock_ctx.fillStyle= '#000000';	
	stock_ctx.fillText(timestamp, stock_side*0.265, stock_side*0.3, stock_side*0.5);

	stock_ctx.font = stock_side*0.1+'px Helvetica';
	stock_ctx.textAlign = "center"; 
	stock_ctx.fillStyle= '#000000';	
	stock_ctx.fillText(price, stock_side*0.2, stock_side*0.45, stock_side*0.5);

	stock_ctx.font = stock_side*0.05+'px Helvetica';
	stock_ctx.textAlign = "center"; 
	stock_ctx.fillStyle= '#000000';	
	stock_ctx.fillText(currency, stock_side*0.4, stock_side*0.45, stock_side*0.5);

}

function renderStockTrend(){
	
	stock_ctx.beginPath();
	//stock_ctx.lineWidth=stock_side*0.005;
	
	if(diff > 0){
		stock_ctx.strokeStyle = '#5ccf32';
		stock_ctx.fillStyle = '#5ccf32';
		stock_ctx.moveTo(stock_side*0.125, stock_side*0.075);
		stock_ctx.lineTo(stock_side*0.175, stock_side*0.15);
		stock_ctx.lineTo(stock_side*0.075, stock_side*0.15);
		stock_ctx.closePath();
		stock_ctx.stroke();
		stock_ctx.fill();

	} else {
		stock_ctx.strokeStyle = '#cf3232';
		stock_ctx.fillStyle = '#cf3232';
		stock_ctx.moveTo(stock_side*0.125, stock_side*0.15);
		stock_ctx.lineTo(stock_side*0.175, stock_side*0.075);
		stock_ctx.lineTo(stock_side*0.075, stock_side*0.075);
		stock_ctx.closePath();
		stock_ctx.stroke();
		stock_ctx.fill();
	}
}

function stockIndicator(){
	
	stock_ctx.clearRect(0, 0, stock_side, stock_side);
	stockAlpha = stockAlpha+=0.02;
	
	stock_ctx.globalAlpha = stockAlpha;
	
	renderStockBackground();
	
	renderStockValues();
	
	renderStockTrend();
	
	if(stockAlpha<1){
		requestAnimationFrame(stockIndicator);
	} else {
	
	}
}

function renderStockIndicator(){
	index = "AAPL";
	price = 292.97;
	currency = "USD";
	diff = 2.89;
	timestamp = "24.04.2020 19:59 UTC-4";
	
	let component = document.getElementById('indicator-stock');
	
	let w = window.innerWidth;
	let h = window.innerHeight;
	stock_side = Math.min(w,h);
	component.width = (stock_side*0.5) + (stock_side*0.05);
	component.height = (stock_side*0.5) + (stock_side*0.05);

	stock_ctx = component.getContext("2d");
	stock_ctx.clearRect(0, 0, stock_side, stock_side);
	stockIndicator();
}