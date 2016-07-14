

var tom = {
    name:"Tom",
    hp:100,
    atk:10,
    def:10
};


var sword = {
    name: "sword",
    hit:11,
    power:6
};
var arrow = {
    name: "bow",
    hit:6,
    power:11 
};

var monsterPosition = [0,100,200,300,400,500];

var monsterHealth = 0;

var movement = 0;
var positionIndex;



document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '40') {
	if (movement < 500){
	    movement += 100;
	    console.log("Player at "+movement);
            document.getElementById("player").style.marginTop = movement+"px";
	    document.getElementById("weapon").style.marginTop = movement+"px";
	}
    }
    else if (e.keyCode == '38') {
	if (movement > 0){
            movement-=100;
	    console.log("Player at "+movement);
	    document.getElementById("player").style.marginTop = movement+"px";
	    document.getElementById("weapon").style.marginTop = movement+"px";
	}
    }
    else if (e.keyCode == '65') {
	// arrow
	console.log("arrow");
	document.getElementById("weapon").innerHTML = "->";
	setTimeout(function(){
	    document.getElementById("weapon").innerHTML = "";
	}, 500);
	pAttack(arrow,tom);
    }
    else if (e.keyCode == '83') {
	// sword
	console.log("sword");
	document.getElementById("weapon").innerHTML = "--";
	setTimeout(function(){
	    document.getElementById("weapon").innerHTML = "";
	}, 500);
	pAttack(sword,tom);
    }
};



function monsterEnters(mon){
    positionIndex = Math.floor(Math.random()*monsterPosition.length);
    document.getElementById("monster").style.marginTop = monsterPosition[positionIndex]+"px";
    console.log(positionIndex);
    monsterHealth = mon.hp;
    monsterStat(mon);
};

function monsterStat(mon){
    document.getElementById("monsterStat").innerHTML =
	"Monster Name: " + mon.name + "<br>" +
	"Monster HP: " + monsterHealth;
};


function pAttack(weaponChoice,mon){
    if ( movement == monsterPosition[positionIndex]){
	attackHit = Math.floor(Math.random()*weaponChoice.hit);
	if (attackHit == 0){
	    document.getElementById("playerTerminal").innerHTML =
		"You missed";
	} else {
	    attackPower = Math.floor(Math.random()*weaponChoice.power);
	    monsterHealth -= attackPower;
	    monsterDead(weaponChoice,mon);
	}
    } else {
	document.getElementById("playerTerminal").innerHTML =
	    "No monster there to hit.";
    }
};

function monsterDead(weaponChoice,mon){
    if (monsterHealth <= 0){
	document.getElementById("playerTerminal").innerHTML =
	    "You killed " + mon.name;
	monsterEnters(mon);
    } else {
	document.getElementById("playerTerminal").innerHTML =
	    weaponChoice.name + " does " + attackPower + " damage.";
	monsterStat(mon);
    }
};



monsterEnters(tom);
