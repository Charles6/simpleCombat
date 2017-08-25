var player = {
	hp: 100,
	def:3,
	xp:0
}

function playerStat(){
	document.getElementById("playerStat").innerHTML =
		"Player HP: " + player.hp;
}

playerStat();

var roach = {
    name:"Roach",
    symbol: "R",
    hp:25,
    atk:5,
    def:3,
    art: ""
};

var siren = {
    name:"Siren",
    symbol: "S",
    hp:50,
    atk:7,
    def:3,
    art: ""
};

var kelpie = {
    name:"Kelpie",
    symbol: "K",
    hp:100,
    atk:8,
    def:8,
    art:""
};

var dragon = {
    name:"Dragon",
    symbol: "D",
    hp:100,
    atk:10,
    def:10,
    art: "<pre> <>=======()<br>"+" (/\___   /|\\          ()==========<>_<br>"+"       \_/ | \\        //|\   ______/ \)<br>"+"         \_|  \\      // | \_/<br>"+"           \|\/|\_   //  /\/<br>"+"            (oo)\ \_//  /<br>"+"           //_/\_\/ /  |<br>"+"          @@/  |=\  \  |<br>"+"               \_=\_ \ |<br>"+"                 \==\ \|\_<br>"+"              __(\===\(  )\<br>"+"             (((~) __(_/   |<br>"+"                  (((~) \  /<br>"+"                  ______/ /<br>"+"                  '------'</pre>"
};

var monsterList = [roach,siren,kelpie,dragon];

var currentMonster;

var sword = {
    name: "sword",
    hit:11,
    power:6,
    dodge:3
};

var arrow = {
    name: "bow",
    hit:6,
    power:11,
    dodge:9
};

var monsterPosition = [0,100,200,300,400,500];

var monsterHealth = 0;
var monsterDef;
var monsterAtk;

var movement = 0;
var positionIndex;
var overkill = 0;


var logArray = [];

function terminalLog(newLog){
	if (logArray.length == 5){
		logArray.shift();
		logArray.push(newLog);
		document.getElementById("playerTerminal").innerHTML = "";
		for (var i = 0; i < logArray.length; i++) {
			document.getElementById("playerTerminal").innerHTML += logArray[i] + "<br>";
		}
	} else {
		logArray.push(newLog);
		document.getElementById("playerTerminal").innerHTML = "";
		for (var i = 0; i < logArray.length; i++) {
			document.getElementById("playerTerminal").innerHTML += logArray[i] + "<br>";
		}
	}
}

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
	console.log("arrow");
		document.getElementById("weapon").innerHTML = "->";
		setTimeout(function(){
		    document.getElementById("weapon").innerHTML = "";
		}, 500);
		pAttack(arrow,currentMonster);
    }
    else if (e.keyCode == '83') {
		console.log("sword");
		document.getElementById("weapon").innerHTML = "--";
		setTimeout(function(){
		    document.getElementById("weapon").innerHTML = "";
		}, 500);
		pAttack(sword,currentMonster);
    }
};



function monsterEnters(){
	cmIndex = Math.floor(Math.random()*monsterList.length);
	currentMonster = monsterList[cmIndex];
	overkill = 0;
	document.getElementById("monster").innerHTML = currentMonster.symbol;
    positionIndex = Math.floor(Math.random()*monsterPosition.length);
    document.getElementById("monster").style.marginTop = monsterPosition[positionIndex]+"px";
    console.log(positionIndex);
    monsterHealth = currentMonster.hp;
    monsterStat(currentMonster);
};

function monsterStat(mon){
    document.getElementById("monsterStat").innerHTML =
	"Monster Name: " + mon.name + "<br>" +
	"Monster HP: " + monsterHealth + "<br>" +
	"<div id='ascii'>" + mon.art + "</div>";

};

function mAttack(weaponChoice,mon){
	playerDodge = Math.floor(Math.random()*weaponChoice.dodge);
	monsterAtk = Math.floor(Math.random()*mon.atk);
	if ( playerDodge == 0 && monsterAtk > 0 ) {
		player.hp -= monsterAtk;
		terminalLog(mon.name + " hit you for " + monsterAtk +" damage.")
	  playerStat();
	  if (player.hp <= 0){
			terminalLog("You are killed");
		}
	}
}

function pAttack(weaponChoice,mon){
    if ( movement == monsterPosition[positionIndex]){
		attackHit = Math.floor(Math.random()*weaponChoice.hit);
		monsterDef = Math.floor(Math.random()*mon.def);
		if (monsterHealth <= 0 ){
			if (overkill >= 5) {
				terminalLog("Stop beating the poor thing!");
			} else {
				overkill++
				terminalLog(mon.name + " is already dead.");
			}
		} else if (attackHit == 0){
			mAttack(weaponChoice,mon);
			terminalLog("You missed.");
		} else if (monsterDef > attackHit){
			mAttack(weaponChoice,mon);
			terminalLog(mon.name + " blocked your attack.");
		} else {
			mAttack(weaponChoice,mon);
	    	attackPower = Math.floor(Math.random()*weaponChoice.power);
	    	monsterHealth -= attackPower;
	    	monsterDead(weaponChoice,mon);
		};
    } else {
		terminalLog("No monster there to hit.");
    };
};

function monsterDead(weaponChoice,mon){
    if (monsterHealth <= 0){
		terminalLog("You killed " + mon.name);
		monsterStat(mon);
		document.getElementById("monster").innerHTML = "x";
		setTimeout(function(){
		    document.getElementById("monster").innerHTML = "";
		    monsterEnters();
		}, 2000);
    } else {
		terminalLog(weaponChoice.name + " does " + attackPower + " damage.");
		monsterStat(mon);
    }
};



monsterEnters();
