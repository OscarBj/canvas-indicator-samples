let components = [];

function selectDial(type){

	switch(type){
		case 'gauge':
			components[0].style.display='inline';
			components[1].style.display='inline';
			components[2].style.display='inline';
			
			components[3].style.display='none';
			components[4].style.display='none';
			components[5].style.display='none';
			components[6].style.display='none';
			
			resetSectorGaugeValues();
			resetGaugeValues();
			resetBallGaugeValues();
			
			renderBallGauge();
			renderSectorGauge();
			return renderGauge();
			
		case 'meter':
			components[0].style.display='none';
			components[1].style.display='none';
			components[2].style.display='none';
			
			components[3].style.display='inline';
			components[4].style.display='inline';
			
			components[5].style.display='none';
			components[6].style.display='none';
			
			resetMeterValues();
			resetLevelMeterValues();
			
			renderLevelMeter();
			return renderMeter();
			
		case 'indicator':
			components[0].style.display='none';
			components[1].style.display='none';
			components[2].style.display='none';
			components[3].style.display='none';
			components[4].style.display='none';
			
			components[5].style.display='inline';
			components[6].style.display='inline';	
			
			resetIndicatorValues();
			resetStockIndicatorValues();
			
			renderStockIndicator();
			return renderIndicator();
			
		default: return null;
	}
}

function setup(){
	components[0] = document.getElementById('gauge-full');
	components[1] = document.getElementById('gauge-sector');
	components[2] = document.getElementById('gauge-ball');
	
	components[3] = document.getElementById('meter');
	components[4] = document.getElementById('level-meter');
	
	components[5] = document.getElementById('indicator');
	components[6] = document.getElementById('indicator-stock');
	
	renderGauge();
	renderSectorGauge();
	renderBallGauge();
	
	components[0].style.display='inline';
	components[1].style.display='inline';
	components[2].style.display='inline';
	
	components[3].style.display='none';
	components[4].style.display='none';
	
	components[5].style.display='none';
	components[6].style.display='none';
		
}