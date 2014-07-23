function updateStatus()
{
	// update all the status variables
	var cash = document.getElementById("cash");
	cash.innerHTML = "$" + currentCash;
 
	var score = document.getElementById("score");
	score.innerHTML = currentScore;
 
	var wave = document.getElementById("wave");
	wave.innerHTML = currentWave;
 
	var lives = document.getElementById("lives");
	lives.innerHTML = currentLives;
 
	// highlight turrets we can purchase
	var turrets = document.getElementsByClassName("turret");
	for(var i = 0; i < turrets.length; i++)
	{
		if(currentCash >= turretValue(turrets[i].id))
		{
			turrets[i].style.opacity = 1;
		}
		else
		{
			turrets[i].style.opacity = 0.5;			
		}
	}
}
 