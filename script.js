var golds = 0;
var gps = 0;
var click = 1;
var rebirth = 0;
var gmulti = 1;
var rbc = 1000000;
var upgrades = [
    { id: 1, name: "Slime gps x2", cost: 1000, owned: 0},
    { id: 2, name: "Undead gps x2", cost: 10000, owned: 0},
    { id: 3, name: "Imp gps x2", cost: 20000, owned: 0},
    { id: 4, name: "Troll gps x2", cost: 50000, owned: 0},
    { id: 5, name: "Skeleton gps x2", cost: 100000, owned: 0},
    { id: 6, name: "Ghost gps x2", cost: 250000, owned: 0},
    { id: 7, name: "Vampire gps x2", cost: 500000, owned: 0},
    { id: 8, name: "Dragon gps x2", cost: 1000000, owned: 0}
];

var minions = [
    { id: 1, name: "Slime", cost: 10, gps: 0.1, owned: 0 },
    { id: 2, name: "Undead", cost: 100, gps: 1, owned: 0 },
    { id: 3, name: "Imp", cost: 500, gps: 5, owned: 0 },
    { id: 4, name: "Troll", cost: 1000, gps: 10, owned: 0 },
    { id: 5, name: "Skeleton", cost: 5000, gps: 30, owned: 0 },
    { id: 6, name: "Ghost", cost: 25000, gps: 50, owned: 0 },
    { id: 7, name: "Vampire", cost: 50000, gps: 100, owned: 0 },
    { id: 8, name: "Dragon", cost: 100000, gps: 500, owned: 0 }
];

function addGolds(x) {
    golds += x*click
    displayGolds()
}

function displayGolds() {
    document.getElementById("gold").innerHTML = "Gold: "+golds.toFixed(1);
}
function goldsec() {
    if (localStorage.getItem("reset") == 1) {
         localStorage.clear();
    }
    if (localStorage.getItem("golds") != null) {
        load()
    }
    
    var Timer = setInterval(function(){
        getGPS();
        golds += gps
        displayGolds()
        displayMinions()
        displayrebirths()
        displayUpgrades()
    }, 1000);
    setInterval(function(){
        saving()
        console.log("saving...");
    }, 5000);
}
function getGPS()
{
    gps = 0
    minions.forEach(function(element){
        gps = gps + element.owned * element.gps * gmulti
    })
    gps.toFixed(1)
    displayGPS()
}
function displayGPS() {
    document.getElementById("gps").innerHTML = "GPS: "+gps.toFixed(1);
}

function displayrebirths() {
    document.getElementById("rebirth").innerHTML = "Rebirth: " + rebirth.toFixed(0);
}
function text_erreur() {
    var parent = document.getElementById("erreur")
    parent.innerHTML = "Vous avez pas assez de pieces pour acheter ce produit";
    setTimeout(function() {
        parent.innerHTML = "";
    },5000);
}
function buyMinion(id)
{
    if(golds >= minions[id].cost){
        minions[id].owned += 1
        golds -= minions[id].cost
        minions[id].cost = minions[id].cost * 1.15
        displayGolds()
        displayMinions()
        var total = 0
        minions.forEach(function(element){
            total = total + element.owned
        })
        if (total%50 == 0){
            console.log(gmulti);   
            click = click * 2
        }
        gpsminions(id)
    } else {
        text_erreur()
    }
}
function displayMinions() {
    document.getElementById("minions1").innerHTML = minions[0].name + ": " + minions[0].owned;
    document.getElementById("button1").innerHTML = minions[0].name + ": " + minions[0].cost.toFixed(1);
    document.getElementById("gps1").innerHTML = "gps: " + minions[0].gps;
    document.getElementById("minions2").innerHTML = minions[1].name + ": " + minions[1].owned;
    document.getElementById("button2").innerHTML = minions[1].name + ": " + minions[1].cost.toFixed(1);
    document.getElementById("gps2").innerHTML = "gps: " + minions[1].gps;
    document.getElementById("minions3").innerHTML = minions[2].name + ": " + minions[2].owned;
    document.getElementById("button3").innerHTML = minions[2].name + ": " + minions[2].cost.toFixed(1);
    document.getElementById("gps3").innerHTML = "gps: " + minions[2].gps;
    document.getElementById("minions4").innerHTML = minions[3].name + ": " + minions[3].owned;
    document.getElementById("button4").innerHTML = minions[3].name + ": " + minions[3].cost.toFixed(1);
    document.getElementById("gps4").innerHTML = "gps: " + minions[3].gps;
    document.getElementById("minions5").innerHTML = minions[4].name + ": " + minions[4].owned;
    document.getElementById("button5").innerHTML = minions[4].name + ": " + minions[4].cost.toFixed(1);
    document.getElementById("gps5").innerHTML = "gps: " + minions[4].gps;
    document.getElementById("minions6").innerHTML = minions[5].name + ": " + minions[5].owned;
    document.getElementById("button6").innerHTML = minions[5].name + ": " + minions[5].cost.toFixed(1);
    document.getElementById("gps6").innerHTML = "gps: " + minions[5].gps;
    document.getElementById("minions7").innerHTML = minions[6].name + ": " + minions[6].owned;
    document.getElementById("button7").innerHTML = minions[6].name + ": " + minions[6].cost.toFixed(1);
    document.getElementById("gps7").innerHTML = "gps: " + minions[6].gps;
    document.getElementById("minions8").innerHTML = minions[7].name + ": " + minions[7].owned;
    document.getElementById("button8").innerHTML = minions[7].name + ": " + minions[7].cost.toFixed(1);
    document.getElementById("gps8").innerHTML = "gps: " + minions[7].gps;
}
function gpsminions(id){
    if (minions[id].owned == 25 || minions[id].owned == 50 || minions[id].owned == 100 || minions[id].owned == 250 || minions[id].owned == 1000){
            minions[id].gps = minions[id].gps * 2
        }
}
function saving() {
    localStorage.setItem("golds", golds);
    localStorage.setItem("clicker", click);
    localStorage.setItem("rebirth", rebirth);
    localStorage.setItem('minions', JSON.stringify(minions));   
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem("rbc", rbc);
}
function load() {
    golds = Number(localStorage.getItem("golds"));
    click = Number(localStorage.getItem("clicker"));
    rebirth = Number(localStorage.getItem("rebirth"));
    minions = JSON.parse(localStorage.minions);
    upgrades = JSON.parse(localStorage.upgrades);
    rbc = Number(localStorage.getItem("rbc"));
}
function reset() {
    var r = confirm("Would you like to reset all of your progress?");
    if(r == true) {
        localStorage.setItem("reset", 1);
        document.location.reload();
    }
}

function upgrade(id) {
    if (golds >= upgrades[id].cost && upgrades[id].owned == 0) {
        golds -= upgrades[id].cost
        minions[id].gps = minions[id].gps * 2
        upgrades[id].owned += 1
    } else {
        text_erreur()
    }
    displayUpgrades()
}
function displayUpgrades() {
    if (upgrades[0].owned == 0){
        document.getElementById("up1").innerHTML = upgrades[0].name + ": " + upgrades[0].cost;
    } else {
        document.getElementById("bouton0").innerHTML ="This upgrade has already been bought  ||  "
    }
    if (upgrades[1].owned == 0){
        document.getElementById("up2").innerHTML = upgrades[1].name + ": " + upgrades[1].cost;
    } else {
        document.getElementById("bouton1").innerHTML ="This upgrade has already been bought  ||  "
    }
    if (upgrades[2].owned == 0){
        document.getElementById("up3").innerHTML = upgrades[2].name + ": " + upgrades[2].cost;
    } else {
        document.getElementById("bouton2").innerHTML ="This upgrade has already been bought  ||  "
    }
    if (upgrades[3].owned == 0){
        document.getElementById("up4").innerHTML = upgrades[3].name + ": " + upgrades[3].cost;
    } else {
        document.getElementById("bouton3").innerHTML ="This upgrade has already been bought  ||  "
    }
    if (upgrades[4].owned == 0){
        document.getElementById("up5").innerHTML = upgrades[4].name + ": " + upgrades[4].cost;
    } else {
        document.getElementById("bouton4").innerHTML ="This upgrade has already been bought || "
    }
    if (upgrades[5].owned == 0){
        document.getElementById("up6").innerHTML = upgrades[5].name + ": " + upgrades[5].cost;
    } else {
        document.getElementById("bouton5").innerHTML ="This upgrade has already been bought  ||  "
    }
    if (upgrades[6].owned == 0){
        document.getElementById("up7").innerHTML = upgrades[6].name + ": " + upgrades[6].cost;
    } else {
        document.getElementById("bouton6").innerHTML ="This upgrade has already been bought  ||  "
    }
    if (upgrades[7].owned == 0){
        document.getElementById("up8").innerHTML = upgrades[7].name + ": " + upgrades[7].cost;
    } else  {
        document.getElementById("bouton7").innerHTML ="This upgrade has already been bought  ||  "
    }
    document.getElementById("rest").innerHTML =  "Rebirth cost: " + rbc + " Golds";
}

function restart() {
    if (golds >= rbc) {
        rebirth += 1
        rbc += 1000000
        golds = 0
        click = 1
        minions.forEach(function(element){ 
            element.owned = 0
        })
        minions[0].cost = 10;
        minions[1].cost = 100;
        minions[2].cost = 500;
        minions[3].cost = 1000;
        minions[4].cost = 5000;
        minions[5].cost = 25000;
        minions[6].cost = 50000;
        minions[7].cost = 100000;
        upgrades.forEach(function(element){
            element.owned = 0
        })
        gps = 0
        gmulti = 0.2 * rebirth + 1
        click = click * gmulti
        displayrebirths()
    } else {
        text_erreur()
    }
}

