	
var position = false; //Позиции удочки
var hint = [];
var hintCount = 0;

//Опыт
var experience = 0;
var experienceLvlCurrent = 0;
var experienceLvlNumb = [1, 3, 7, 15, 30, 50, 75, 110, 150, 250, 500, 1000, 1700, 2500, 5000];
//0 - монеты, 1 - Хлеб, 2 - Опарышь и т.д.
var experienceLvl = [[[100, 0]], [[200, 0], [5, 1]], [[300, 0], [8, 1], [2, 2]], [[500, 0], [12, 1], [4, 3]], [[750, 0], [18, 1], [8, 2], [6, 3]], [[1000, 0], [15, 1], [10, 2], [8, 3]], [[1250, 0], [10, 3], [5, 4]], [[1500, 0], [8, 4], [3, 5]], [[2000, 0], [5, 5], [2, 6]], [[2500, 0], [10, 6]], [[3000, 0], [100, 1], [15, 6]], [[4000, 0], [90, 2], [20, 6]], [[5000, 0], [80, 2], [25, 6]], [[7000, 0], [70, 3], [30, 5], [15, 6]], [[10000, 0], [150, 1], [40, 5], [20, 6]], [[15000, 0], [250, 1], [80, 5], [50, 6]]]; //сиреневый по лвл, синий по призам
	
//Удочка																																									Уровень, Время до поклёвки, время поклёвки, изначальная прочность, стоимоть, цена починки, какие рыбы доступны, сколько рыб доступно, скольно наживок досутпно, картинка
var fishingRodLvl = [["Уровень", "Ожидание поклёвки", "Время поклёвки", "Прочность", "Стоимость", "Цена починки", "Виды рыб", "Количество рыб", "Количество наживок", "Вид"], [0, 40, 6, 1, 0, 0, "Уклейка, Пескарь, Ерш", 3, 1, "lvl0.png"], [1, 33, 8, 10, 800, 400, "+ Окунь, Краснопёрка", 5, 2, "lvl1.png"], [2, 28, 10, 18, 1500, 800, "+ Карась", 6, 4, "lvl2.png"], [3, 20, 12, 30, 3500, 1450, "+ Лещ", 7, 5, "lvl3.png"], [4, 13, 13, 45, 8000, 2400, "+ Карп, Щука", 9, 6, "lvl3.png"], [5, 8, 14, 65, 15000, 3900,"+ Осётр", 10, 7, "lvl3.png"]];
var fishingRodLvlCurrent = 1;
var bitingTimeCurrent = 0; //Время поклёвки текущее
var durabilityCurrent = fishingRodLvl[fishingRodLvlCurrent][3]; //текущее количество прочности - изначально равно изначальной прочности

var baitFish = 1; // Множитель времени до поклёвки
var baitStatus = false; 
	
var fishTime = 0;
var fishTimeout;
var time1;
var secondStart = 0; //количество секунд с начала
//const minute = second * 60;
	
//Наименование, стоимость, вес в вероятностях, максимальное количество в заказе, являеться ли живцом, картинка
var fishTip = [["Уклейка", 35, 0, 1, 1, "uklejka.png"], ["Пескарь", 45, 0, 1, 1, "peskar.png"], ["Ёрш", 55, 0, 1, 1, "ersh.png"], ["Окунь", 100, 0, 1, 0, "okyn.png"], ["Краснопёрка", 150, 0, 1, 0, "krasnoperka.png"], ["Карась", 200, 0, 1, 0, "karas.png"], ["Лещ", 300, 0, 1, 0, "leshh.png"], ["Карп", 400, 0, 1, 0, "Karp.png"], ["Щука", 500, 0, 1, 0, "chuka.png"], ["Осётр", 2000, 0, 1, 0, "osetr.png"]];// fishTip.length - количество видов
var fishLuck = 2; // Шанс поймать рыбу

//Наживка: Наименование, цена, количество, картинка
var FRBait = [["Пусто", 0, 1, "cellFon.png"], ["Хлеб", 5, 0, "bread.png"], ["Опарыш", 15, 0, "maggot.png"], ["Червь", 20, 0, "worm.png"], ["Мотыль", 30, 0, "moth.png"], ["Малёк", 50, 0, "fingerling.png"], ["Живец", 0, 0, "liveBait.png"]];
var FRBaitCurrent = 0;
var FRBaitMiniTaF = 0;
				//Уклейка(Пусто, Хлеб, Червь, Опарыш, Мотыль Малёк), Пескарь, 			Ёрш, 					Окунь, 						Краснопёрка,					Карась, 					Лещ, 						Карп					Щука, 					Осётр
var fishToBait = [[380, 240, 0, 0, 90, 0, 0], [300, 115, 105, 65, 55, 0, 0], [250, 80, 60, 105, 0, 25, 0], [40, 0, 50, 40, 0, 28, 45], [20, 40, 30, 30, 0, 0, 0], [10, 25, 0, 0, 60, 0, 25], [0, 0, 0, 10, 25, 26, 20], [0, 0, 5, 0, 15, 13, 20], [0, 0, 0, 0, 5, 6, 10], [0, 0, 0, 0, 0, 2, 5]];
				//Тек Вып 	122								143							132							104							 	34							50							56						37						16						6
//Рюкзак
var slotPacks = 3; //количество мест в рюкзаке общее
var slotCreate = 0; //Количество созданных ячеек
var fishScore = 0; //количество рыб в рюкзаке 
var fishInPack = [];
var fishInPackPrice = 0; //Стоимость всех рыб в рюкзаке
var cellCost = 100; //Стоимость ячейки
var orderCost = 150; //Стоимость ячейки заказа
var luckCost = 1;
var baitCost = 10;
var luckValue = 0;
	
var money = 50000; // количество денег
let t;
let t2 = 0; //количество рыб в заказе

//Заказы
var ordersScore = 1;//Максимальное количество заказов
var ordersScoreCreate = 0;
var ordersScoreCurrent = 0;//Текущее количество заказов
var ordersArray = []; //Массив со всеми заказами
var reputation = 0;
	
primaryGUI()
ordersGui();
orders();

GUI();
GUI_FR();

setInterval(GUI , 500);//обновление интерфейса каждые пол секунды

function $repFR(){
	let repFR = 0;
	if (fishingRodLvl[fishingRodLvlCurrent][0]){
		repFR = 1 + (fishingRodLvl[fishingRodLvlCurrent][0]-1)/fishingRodLvl[fishingRodLvlCurrent][0];
	}
	//console.log(repFR);
	return repFR;
}

function upReputation(rep){
		let repFR = $repFR();
		reputation += rep;
		if (reputation < 0 ){reputation = 0}
		document.getElementById("reputationID").innerHTML = Math.floor(reputation * repFR);
};

function closePopUp(){
	document.getElementById("Pop-UpWindow").style.visibility = "hidden";
	for (let i = 0; i < experienceLvl[experienceLvlCurrent-1].length; i++){
		document.getElementById("prize" + i).remove();
	}
}

function gainedExperience(exp){
	let progress;
	let progressOld = (experience - experienceLvlNumb[experienceLvlCurrent - 1]) / (experienceLvlNumb[experienceLvlCurrent] - experienceLvlNumb[experienceLvlCurrent - 1])* 1000;
	let newLvl = 0;
	let text = document.getElementById("expID");
	let bar = document.getElementById("expBarID").style;
		experience += exp;
		text.innerHTML = "Уровень " + experienceLvlCurrent + " - Опыт " + experience + "/" + experienceLvlNumb[experienceLvlCurrent];
	if (experience >= experienceLvlNumb[experienceLvlCurrent]){
		experienceLvlCurrent++;
		newLvl = 1;
	}
	progress = (experience - experienceLvlNumb[experienceLvlCurrent - 1]) / (experienceLvlNumb[experienceLvlCurrent] - experienceLvlNumb[experienceLvlCurrent - 1])* 1000;
	if (progress == 0){progress = 1000;}
	if (isNaN(progressOld) == true){progressOld = 0;}
	if (isNaN(experienceLvlNumb[experienceLvlCurrent]) == false){
		const test1 = setInterval(() => {
			if (progressOld < progress){
				bar.width = progressOld/10 + "%";
				progressOld++;
			} else {
				if (newLvl > 0){
					text.innerHTML = "Уровень " + experienceLvlCurrent + " - Опыт " + experience + "/" + experienceLvlNumb[experienceLvlCurrent];
					bar.width = "0%";
					money += experienceLvl[experienceLvlCurrent-1][0][0];
					document.getElementById("Pop-UpWindow").style.visibility = "visible";
					document.getElementById("HeadPop-Up").innerHTML = "Вы получили уровень " + experienceLvlCurrent + "!";
					for (let i = 0; i < experienceLvl[experienceLvlCurrent-1].length; i++){
						let t1 = experienceLvl[experienceLvlCurrent-1][i][1]
						document.getElementById("BodyPop-Up").append(
							Object.assign(document.createElement('div'), {id: "prize" + i, className: "prize"})
						)
						document.getElementById("prize" + i).append(
							Object.assign(document.createElement('div'), {className: "piece", innerHTML: "x" + experienceLvl[experienceLvlCurrent-1][i][0]}),
							Object.assign(document.createElement('div'), {className: "name", innerHTML: FRBait[t1][0], id: "PzName" + i})
						);
						document.getElementById("prize" + i).style.background = "url(img/" + FRBait[t1][3] + ") no-repeat 10px, url(img/cellfon.png) no-repeat 10px";
						if (t1 == 0){
							document.getElementById("PzName" + i).innerHTML = "Монет";
							document.getElementById("prize" + i).style.background = "url(img/coin.png) no-repeat 10px, url(img/cellfon.png) no-repeat 10px";
						} else {
							FRBait[t1][2] += experienceLvl[experienceLvlCurrent-1][i][0];
						}
					}
				}
				clearInterval(test1);
			}
		} , 1500/(progress - progressOld));//Анимация бежания прогресс бара;
		//console.log("Проценты: " + (experience - experienceLvlNumb[experienceLvlCurrent - 1]) / (experienceLvlNumb[experienceLvlCurrent] - experienceLvlNumb[experienceLvlCurrent - 1])* 100 + "%");
	} else {
		bar.width = "100%";
		text.innerHTML = "Уровень " + experienceLvlCurrent + " - Опыт " + experience + "/Max";
		money += experienceLvl[experienceLvlCurrent-1][0][0];
		hint.push(["Вы получили уровень " + experienceLvlCurrent + " и " + experienceLvl[experienceLvlCurrent-1][0][0] + " монет !!!" , 8, "white", 0]);
	}
}

function packMini(packMiniBtn){
	document.getElementById("fishPack").style.bottom = !packMiniBtn.value ? "-160px" : "0px";
	packMiniBtn.value = !packMiniBtn.value ? "True" : "";
}

function FRBaitMini(FRBaitMiniBtn){
	document.getElementById("FRBaitID").style.right = FRBaitMiniBtn.value != 1 ? "-209px" : "0px";
	FRBaitMiniBtn.textContent = FRBaitMiniBtn.value != 1 ? "«" : "»";
	FRBaitMiniBtn.value =  FRBaitMiniBtn.value != 1 ? 1 : 0;
}

function save(){
	localStorage.setItem("FR", fishingRodLvlCurrent);
	localStorage.setItem("FR_Dur", durabilityCurrent);
	localStorage.setItem("Money", money);
	localStorage.setItem("SlotPacks", slotPacks);
	localStorage.setItem("Money", money);
	localStorage.setItem("SlotPCost", cellCost);
	localStorage.setItem("SlotOrders", ordersScore);
	localStorage.setItem("SlotOCost", orderCost);
	localStorage.setItem("Experience", experience);
	localStorage.setItem("ExperienceLvl", experienceLvlCurrent);
}

function load(){
	fishingRodLvlCurrent = parseInt(localStorage.getItem("FR"));
	durabilityCurrent = parseInt(localStorage.getItem("FR_Dur"));
	money = parseInt(localStorage.getItem("Money"));
	slotPacks = parseInt(localStorage.getItem("SlotPacks"));
	for (let i = 0; i < slotPacks - slotCreate; i++){
			fishInPack.push([]);		
	}
	cellCost = parseInt(localStorage.getItem("SlotPCost"));
	document.getElementById("packPlusID").innerHTML = "⇮ " + cellCost;
	ordersScore = parseInt(localStorage.getItem("SlotOrders"));
	orderCost = parseInt(localStorage.getItem("SlotOCost"));
	document.getElementById("orderUpID").innerHTML = "Заказы +1 за " + orderCost;
	experience = parseInt(localStorage.getItem("Experience"));
	experienceLvlCurrent = parseInt(localStorage.getItem("ExperienceLvl"));
	gainedExperience(0);
	GUI();
	GUI_FR();
}

function fishInPackToBait(numberBait){
	fishInPack.splice(numberBait.value, 1);
	fishInPack.push([]);
	fishScore--;
	FRBait[6][2] += 1;
	GUI();
}

function FRBaitF(numberBait){
	FRBaitCurrent = Math.floor(numberBait.value);
}

function FRBaitFUp(numberBait){
	money -= FRBait[numberBait.value][1];
	FRBait[numberBait.value][2] += 1;
	GUI();
}

function luck(luckRange){
	document.getElementById("luckID").innerHTML = "Удача " + luckRange.value + " за " + luckCost * luckRange.value * fishingRodLvlCurrent;
	luckValue = Math.floor(luckRange.value);
}
	
function levelUp(){
	if (money >= fishingRodLvl[fishingRodLvlCurrent + 1][4]){
		money -= fishingRodLvl[fishingRodLvlCurrent + 1][4];
		fishingRodLvlCurrent++
		durabilityCurrent = fishingRodLvl[fishingRodLvlCurrent][3];
		console.log("Улучшение удочки до " + fishingRodLvl[fishingRodLvlCurrent][0]);
		hint.push(["Удочка улучшена до уровня " + fishingRodLvl[fishingRodLvlCurrent][0] + " !!!" , 8, "white", 0]);
	} else {
		hint.push(["У вас нехватает денег!", 8, "red", 0]);
	}
	document.getElementById('fishingRodFixedID').innerHTML = "🛠 " + fishingRodLvl[fishingRodLvlCurrent][5];//Кнопка починки
	GUI_FR();
	luck(document.getElementById("luckInputID"));
	upReputation(0);
}
	
let orderFishPlus = 0;
function orderUp(){
	if (money >= orderCost){
		money -= orderCost;
		if (orderCost < 2400){
			orderCost = Math.floor((orderCost * 2 - orderCost/4)/100)*100;
		}
		document.getElementById("orderUpID").innerHTML = "Заказы +1 за " + orderCost;
		ordersScore++;
		//console.log(ordersScore);
		ordersArray.push([]);
		orderFishPlus++;
		for (let i = 0; i < orderFishPlus; i++){
			fishTip[i][3]++
		}
	}else {
		hint.push(["У вас нехватает денег!", 8, "red", 0]);
	}
	ordersGui()
	GUI();
}
	
	function orderBtnClick(btn){
		let p2 = 0; //Сколько подходит
		let iarray = [];
		if(fishScore >= ordersArray[btn.value][3]){
			for(let i = 0; i < fishScore; i++){
				if (p2 < ordersArray[btn.value][3] && ordersArray[btn.value][2] == fishInPack[i][2]){
					p2++;
					iarray.push(i);
				} 
			}
			if (p2 == ordersArray[btn.value][3]){
				for(let i = p2; i > 0; i--){
					console.log("Продажа " + iarray[i - 1]);
					fishInPack.splice(iarray[i - 1], 1);
					fishInPack.push([]);
					fishScore--;
				}
					money = money + (ordersArray[btn.value][1] * ordersArray[btn.value][3] * 2);
					fishInPackPrice -= ordersArray[btn.value][1];
					gainedExperience(1);
					upReputation(5*fishingRodLvlCurrent);
					ordersArray.splice(btn.value, 1);
					ordersArray.push([]);
					ordersScoreCurrent--;
			} else {
				hint.push(["В рюкзаке не хватает рыб " + ordersArray[btn.value][0] + "!", 12, "red", 0]);
			}
		} else{
			hint.push(["В рюкзаке не хватает рыб " + ordersArray[btn.value][0] + "!", 12, "red", 0]);
		}
		ordersGui();
		GUI();
	}
	
	var rain = 1;
	var rainTime = 0;
	setInterval(ordersGui, 1000);
		
	function ordersGui(){
		let weather = Math.floor(Math.random() * 300);
		//console.log("weather" + weather);
		let screen = document.getElementById("screen").style;
		if (weather == 1){
			rain = 1 + Math.floor(Math.random() * 9 + 1)/10;
			rainTime = Math.floor(Math.random() * 240 + 60);
			hint.push(["Пошёл дождь! " + "Приманка увеличиваються в " + rain + " раза!", 8, "white", 0]);
			screen.background = "url(rain.gif), url(20-fon.png), url(img/gameFon.png) 0px 50%";
		}
		rainTime > 0 ? rainTime-- : (rain = 1, screen.background = "url(img/gameFon.png) 0px 50%");
		
		if (ordersScoreCreate < ordersScore){
			for(let i = ordersScoreCreate; i < ordersScore; i++){
				ordersArray.push([]);
				document.getElementById("orderButton" + i).value = i;
				document.getElementById("orderButton" + i).onclick = function(){orderBtnClick(this);};
				ordersScoreCreate++;
			}
		}
		for(let i = 0; i < ordersScore; i++){
			if(ordersArray[i][0] != null){
				document.getElementById("ordersCell" + i).style.visibility = "visible"; //Делаем заказ видимым
				document.getElementById("ordersCell" + i).style.background = "url(img/fish/" + ordersArray[i][5] + ") 4px 10px no-repeat, url('img/order" + ordersArray[i][6] + ".png') no-repeat" //Устанавливает оба фона
				document.getElementById("ordersCellText" + i).innerHTML = ordersArray[i][0] + ", " + ordersArray[i][3] + " шт"; //Выводит текст
				document.getElementById("orderButton" + i).textContent = Math.floor(ordersArray[i][1] * ordersArray[i][3] * (1.9 + ordersArray[i][3]/10)/10)*10; //Выводит кнопку
				let sec = ordersArray[i][4];
				let min = 0;
				if (sec >= 60){ //разбиваем время на секунды и минуты
					min = Math.floor(sec / 60);
					sec = sec % 60;	
				}  
				if (sec < 10){ //Добавляем 0 если секунд меньше 10
						sec = "0" + sec; 
				}
				document.getElementById("ordersCellTime" + i).innerHTML = min + ":" + sec; //Выводит время
				if (ordersArray[i][4] < 1){
					ordersArray.splice(i, 1);
					ordersArray.push([]);
					ordersScoreCurrent--;
					upReputation(-10);
				}
				ordersArray[i][4]--;
			} else {
				document.getElementById("ordersCell" + i).style.visibility = "hidden";
			}
		}
	}
	
	function orders(){
		var fishCostMedium = 0;
		for(let i = 0; i < fishTip.length; i++){
			fishCostMedium += fishTip[i][1];
		}
		fishCostMedium /= fishTip.length;
		let repFR = $repFR();
		for (let i = ordersScoreCurrent; i < ordersScore; i++){
			if (ordersScoreCurrent < ordersScore && repFR > 0){
				console.log(10*(experienceLvlCurrent-1)**3);
				console.log(Math.floor(reputation * repFR) );
				let u2 = Math.floor(Math.random() * ((10*(experienceLvlCurrent-1)**3) - Math.floor(reputation * repFR)));
				console.log(u2);
				if (u2 <= 2){
					fishSelect();
					t2++;
						for(let i = 1; i < fishTip[t][3]; i++){
							u2 = Math.floor(Math.random() * 5);
							if (u2 == 0){t2++;}
						}
						var orderTime = Math.floor(((Math.random() * 5) + 10) * t2 * (fishTip[t][1]+fishCostMedium) / 232) + 30;
						console.log("Время заказа: " + orderTime);
						ordersArray[ordersScoreCurrent].push(fishTip[t][0], fishTip[t][1], t, t2, orderTime, fishTip[t][5], Math.floor(Math.random() * 5 + 1));
						ordersGui();
						ordersScoreCurrent++;
				}	
			} else if(ordersScoreCurrent >= ordersScore){
				hint.push(["Мог бы быть ещё один заказ, но <br> предыдущие ещё не выполнены!", 28, "blue", 0]);
				i = ordersScore;
			}
		}
		GUI();
		t2 = 0;
	}
	
	function bait(check){
		let avto = document.getElementById("avtoBaitID");
		let btn = document.getElementById("baitID");
		if (position && btn.disabled){
			if (money >= baitCost){
				money -= baitCost;
				baitFish = 2 * rain;
				hint.push(["Ускорение приманки в 2 раза", 8, "white", 0]);
				GUI();
			}else {
				hint.push(["У вас нехватает денег!", 8, "red", 0]);
			}
		} else if(!position && avto.checked && btn.disabled){
			avto.removeAttribute("disabled");
		} else if (position || avto.checked || check){
			btn.disabled = "disabled";
			if (position){
				avto.disabled = "disabled";
			}
		} else {
			btn.removeAttribute("disabled");
			avto.removeAttribute("disabled");
		}
	} 
	
	var floatFon;
	var floatFonCof = 0.3;
	function fishingRod(){

		if (position == false){
			if (fishScore == slotPacks || durabilityCurrent < 1 || money < luckValue * luckCost * fishingRodLvlCurrent){
				if (fishScore == slotPacks){
					hint.push(["Рюкзак полный! Что бы продолжит <br>необходимо свободное место в рюкзаке", 20, "red", 0]);
				} else if (durabilityCurrent < 1){
					hint.push(["Сломалсь удочка её необходимо починить!", 12, "red", 0]);
				} else {
					hint.push(["Не хватает денег на удачу((", 8, "red", 0]);
				}
			} else {
				position = true;
				//console.log("Заброшена удочка");
				floatFon = Math.floor(Math.random() * 300 + 300);
				let cut = document.getElementById("floatID").style;
					cut.background = "url('m_poplavok.png') no-repeat";			
					cut.backgroundSize = "cover";
					cut.top = floatFon + "px"; 
					cut.left = Math.floor(Math.random() * 600 + 600) + "px";
					cut.height = (floatFon * floatFonCof)/1.9 + "px";
					cut.width = (floatFon * floatFonCof)/1.5 + "px";
				if (fishingRodLvlCurrent != 1){
					durabilityCurrent -= 1;
				}
				if (FRBaitCurrent != 0){
					if (FRBait[FRBaitCurrent][2] > 0){
						FRBait[FRBaitCurrent][2] -= 1;
					} else {
						hint.push(["Закончилась наживка " + FRBait[FRBaitCurrent][0] + " установлено пусто", 8, "red", 0]);
						FRBaitCurrent = 0;
					}
				}

				money -= luckValue * luckCost * fishingRodLvlCurrent;
				fishing();
				orders();
			}
		} else {
			position = false;
			//console.log("Смотана удочка");
			fishTime = 0;
			clearTimeout(fishTimeout, time1);
		}
		bait();
		GUI();
		GUI_FR();
	}
	
	function fishing(){
		fishTime = Math.floor(Math.random() * (fishingRodLvl[fishingRodLvlCurrent][1] / baitFish) + 1);
		fishTimeout = setTimeout(bobber, fishTime * 1000);
		console.log("Врема до поклёвки: " + fishTime);
	}
	
	//Поклёвка
	function bobber(){	
		if (bitingTimeCurrent == fishingRodLvl[fishingRodLvlCurrent][2] || position == false){
			escape(); // Вызываеться  если закончилась поклёвка или Вызываеться если вытащина удочка
		} else {
			baitStatus = true;
			time1 = setTimeout(biteTimer, 250);
			//console.log("Поклёвка " + (bitingTimeCurrent + 1) + "/" + fishingRodLvl[fishingRodLvlCurrent][2]);
			GUI();
		}
	}
	
	function biteTimer(){
		bitingTimeCurrent++;
		bobber();
	}
	
	
	function fishSelect(){
		let	fishingRodToBait = FRBaitCurrent == 6 ? 3 : 0;
		let rt = 0;
		for (let i = fishingRodToBait; i < fishingRodLvl[fishingRodLvlCurrent][7]; i++){ // Складываем веса всех рыб
			rt = rt + fishTip[i][2] + fishToBait[i][FRBaitCurrent] + luckValue;
			//console.log("rt: " + rt);
		}
		let t2 = Math.floor(Math.random() * (rt)); // Выбор рандомного значения из всех весов
		for (let i = fishingRodToBait; t2 > 0; i++){ 
			t2 = t2 - fishTip[i][2] - fishToBait[i][FRBaitCurrent] - luckValue; // Получение рыбы по весу
			t = i;
		}
	}
	
	function escape(){
		baitStatus = false;
		if (position == false){
			var fishChance = Math.floor(Math.random() * (fishLuck + bitingTimeCurrent + luckValue)); // Рандомайзер на поимку
			if (fishChance > 0 || experienceLvlCurrent < 3){
				if (Math.floor(Math.random() * (99 - luckValue)) > 0){
				fishSelect();
				fishInPack[fishScore].push(fishTip[t][0],fishTip[t][1],t,fishTip[t][5],fishTip[t][4]);
				fishInPackPrice += fishTip[t][1];
				hint.push(["Поймана рыба! " + fishTip[t][0], 12, "white", 0]);
				fishScore++;
				} else {
				console.log(luckValue);
					let treasure = Math.floor(Math.random() * 1900 + 100 * luckValue + 100);
					console.log("Получено сокровище в " + treasure);
					hint.push(["Поздравляю! Пойманно сокровище,<br> стоимостью " + treasure + " монет!!!" , 32, "#FFBB00", 0]);
					money += treasure;
				}
				gainedExperience(1);
				upReputation(2**fishingRodLvlCurrent);
			} else {
				hint.push(["Не повезло! сорвалась", 12, "darkorange", 0]);
				baitStatus = false;
			}
			baitFish = 1;
		} else {
			hint.push(["Сорвалась!", 12, "darkorange", 0]);
			baitStatus = false;
			fishing();
		}
		GUI();
		bitingTimeCurrent = 0;		
	}
	
	function soldAll(){
		for (let i = 0; i < fishScore; fishScore-- ){
			let cut = fishInPack[i];
			console.log("Продана рыба " + cut[0] + " за " + cut[1]);
			money += cut[1];
			fishInPack.splice(i, 1);
			fishInPack.push([]);
			upReputation(1)
		}
		fishInPackPrice = 0;
		GUI();
	}
	
	function packPlus(){ //Увеличение рюкзака по кнопке
		if (slotPacks < 18 && money >= cellCost){
			money -= cellCost;
			fishInPack.push([]);
			slotPacks++;
			if (cellCost < 2500){
				cellCost = Math.floor((cellCost * 2 - cellCost/2.3)/50) * 50;
			}
			let cut = document.getElementById("packPlusID");
				cut.innerHTML = "⇮ " + cellCost;
			if(slotPacks >= 18){
				cut.disabled = "disabled";
				cut.innerHTML = "Максимум!";
			}
		} else {
			hint.push(["У вас нехватает денег!", 8, "red", 0]);
		}	
		GUI();
	}
	
	function fixed(){ //Починка удочки
		let cut = fishingRodLvl[fishingRodLvlCurrent]
		if (money >= cut[5]){
			money -= cut[5];
			durabilityCurrent = cut[3];
		} else {
			hint.push(["У вас нехватает денег!", 8, "red", 0]);
		}
		GUI();
		GUI_FR();
	}
	
	function primaryGUI(){ //Изначальный интерфейс 
	
		//Создание рюкзака
		for(let i = 0; i < 18; i++){
			let btnBait = document.createElement('button');
			Object.assign(btnBait, {textContent: "🪝", className: 'packBaitBtn', id: "packBaitBtn" + i, value: i, onclick: function(){fishInPackToBait(this);}});
				btnBait.style.visibility = "hidden";
			let divCost = document.createElement('div');
			Object.assign(divCost, {className: "price money", id: "FPCellCost" + i, innerHTML: " g "})
				divCost.style.visibility = "hidden";
			let divName = document.createElement('div');
			Object.assign(divName, {className: "name", id: "FPCellName" + i, innerHTML: " g "});
				divName.style.visibility = "hidden";
			let divCell = document.createElement('div');
			Object.assign(divCell, {className: "FPCellBlock", id: "FPCell" + i});
				divCell.style.background = "url('img/cellFonBlock.png')";
				divCell.append(divCost, divName, btnBait);
			document.getElementById("FPCells").append(divCell);
		}
		for(let i = 0; i < slotPacks; i++){	//заполняем ячейки рюкзака	
			fishInPack.push([]);
			slotCreate++;
		}
		
		//Создание таблицы заказов
		for(let i = 0; i < 10; i++){
			let divOrder = document.createElement('div'); //Заказ
			Object.assign(divOrder, {className: "ordersCell", id: "ordersCell" + i});
				divOrder.style.visibility = "hidden";
				divOrder.append(
					Object.assign(document.createElement('div'), {className: "ordersCellTime", id: "ordersCellTime" + i, innerHTML: " g "}), 
					Object.assign(document.createElement('div'), {className: "ordersCellText", id: "ordersCellText" + i, innerHTML: " g "}), 
					Object.assign(document.createElement('button'), {className: "orderButton money", id: "orderButton" + i, textContent: " g "})
				);
			document.getElementById("orderBodyID").append(divOrder);
		} 

		//Создание таблицы свойств удочки
		for(let i = 0; i < fishingRodLvl[0].length - 1; i++){
			document.getElementById("fishingRodPropertyID").append(
				Object.assign(document.createElement('div'), {className: "PropertyCell", id: "PropertyCell" + i})
			);
		}

		//Создание таблицы наживок
		for(let i = 0; i < FRBait.length; i++){
			let divBaitIcon = document.createElement('div'); //Иконка+ имя + цена + кол-во штук
			Object.assign(divBaitIcon, {className: 'FRBaitIconClass', id: "FRBaitIcon"});
				divBaitIcon.style.background = "url(img/" + FRBait[i][3] + ") no-repeat 10px";
				divBaitIcon.append(
					Object.assign(document.createElement('div'), {className: "piece", id: "divFRBaitInStock" + i, innerHTML: "x" + FRBait[i][2]}),
					Object.assign(document.createElement('div'), {className: "price money", id: "divPriceFRBait" + i, innerHTML: FRBait[i][1]}),
					Object.assign(document.createElement('div'), {className: "name", id: "divFRBaitName" + i, innerHTML: FRBait[i][0]}),
				);
			let divBaitDescript = document.createElement('div'); //Описание кнопка выбора и покупки
			Object.assign( divBaitDescript, {className: 'FRBaitDescriptClass', id: "FRBaitDescript"});
				divBaitDescript.append(
					Object.assign(document.createElement('div'), {className: "fishChance", id: "divFRBaitChance" + i}), 
					Object.assign(document.createElement('button'), {textContent: "Выбрать", className: "GUI-btn btnBait", id: "FRBaitBtn" + i, value: i, onclick: function(){FRBaitF(this);}}), 
					Object.assign(document.createElement('button'), {textContent: "+ 1шт", className: 'GUI-btn btnBait', id: "FRBaitBtnUp" + i, value: i, disabled: 'disabled', onclick: function(){FRBaitFUp(this);}})
				);
			let divBait = document.createElement('div'); //Наживка
			Object.assign(divBait, {className: 'FRBaitClass', id: "FRBait" + i});
				divBait.append( divBaitIcon, divBaitDescript);
			document.getElementById('FRBaitID').append(divBait);
		}
		document.getElementById('FRBaitID').append(Object.assign(document.createElement('button'), {textContent: "»", title: "Свернуть", className: 'GUI-btn', id: "FRBaitMiniBtn", onclick: function(){FRBaitMini(this);}})
		)
		for(let i = 0; i < FRBait.length; i++){
			document.getElementById("divPriceFRBait" + i).innerHTML = FRBait[i][1]; //Цена
			if(FRBait[i][1] == 0){
				document.getElementById('FRBaitBtnUp' + i).remove();
				document.getElementById('divPriceFRBait' + i).remove();			
			}
		}
	}
	
	setInterval(floatWater , 250);//обновление интерфейса каждые 1/4 секунды
	function floatWater(){
		let cutFloat = document.getElementById("floatID").style; //Поплавок
		if (baitStatus == false){
			cutFloat.height = (floatFon * floatFonCof - Math.floor(Math.random()*4))/1.9 + "px"; 
			cutFloat.top = floatFon - Math.floor(Math.random()*2) + "px"; 
		} else {
			cutFloat.height = (floatFon * floatFonCof * 0.96 - (bitingTimeCurrent * 3.7)/(fishingRodLvlCurrent - fishingRodLvlCurrent * 0.2) - Math.floor(Math.random()*4))/1.9 + "px"; 
			cutFloat.top = floatFon * 1.03 + (bitingTimeCurrent * 2)/fishingRodLvlCurrent - Math.floor(Math.random()*2) + "px"; 
		}
		let cutQuest = document.getElementById("fishingRodHintID"); //Знак вопроса удочки
		let cutProp = document.getElementById("fishingRodPropertyID").style; //Свойства удочки
		cutQuest.addEventListener('mouseover', function(){cutProp.visibility = "visible"});
		cutQuest.addEventListener('mouseout', function(){cutProp.visibility = "hidden"});
	}

	function GUI_FR(){
		let cutFloat = document.getElementById("floatID").style; //Поплавок
		let cutFRod = document.getElementById("fishingRodID"); //Основная кнопка
		if (position == 1){
			cutFloat.visibility = "visible";
			cutFRod.innerHTML = '<img id="fishingRodID2" alt="Удочка"></img>Смотать';
		} else{
			cutFloat.visibility = "hidden";
			cutFRod.innerHTML = '<img id="fishingRodID2" alt="Удочка">Забросить';
		}
		document.getElementById("fishingRodID2").src="img/" + fishingRodLvl[fishingRodLvlCurrent][9];
		let cutDurabil = document.getElementById("durabilityProgress");//Школа прочности
		cutDurabil.max = fishingRodLvl[fishingRodLvlCurrent][3];
		cutDurabil.value = durabilityCurrent;
		document.getElementById("durabilityID").innerHTML = "🎣 " + durabilityCurrent + "/" + fishingRodLvl[fishingRodLvlCurrent][3];//Вывод текущей прочности к изначальной
		let cutBtnLvlUp = document.getElementById("fishingRodLevelUpID");//Кнопка улучшения удочки
		if(fishingRodLvlCurrent + 1 < fishingRodLvl.length){
			cutBtnLvlUp.innerHTML = "⇮ " + fishingRodLvl[fishingRodLvlCurrent + 1][4];
		} else {
			cutBtnLvlUp.disabled = "disabled";
			cutBtnLvlUp.innerHTML = "Max!";
		}
	}
	
	function GUI(){ //Обновление интерфейса 
		secondStart = secondStart + 0.5;

		//GUI Наживка
		for(let i = 0; i < FRBait.length; i++){
			let text = " ";
			let kFix = i == 6 ? 3 : 0;
			for(j = kFix; j < fishingRodLvl[fishingRodLvlCurrent][7]; j++){
				let sum = 0;
				for(k = kFix; k < fishingRodLvl[fishingRodLvlCurrent][7]; k++ ){
					sum += fishTip[k][2] + fishToBait[k][i] + luckValue;
				}
				let sumOne = 0;
				sumOne = fishTip[j][2] + fishToBait[j][i] + luckValue
				if (sumOne > 0){
					text += " " + fishTip[j][0] + " " + Math.floor(sumOne/sum*1000)/10 + "%";
				}
			} 
			document.getElementById("divFRBaitInStock" + i).innerHTML = "x" + FRBait[i][2];
			document.getElementById("divFRBaitName" + i).innerHTML = FRBait[i][0]; //Название
			document.getElementById("divFRBaitChance" + i).innerHTML = text;
			if(FRBait[i][2] < 1){
				document.getElementById("FRBaitBtn" + i).disabled = "disabled";
				document.getElementById("FRBait" + i).style.opacity = "0.2";
			} else if(document.getElementById("FRBaitBtn" + i).value == FRBaitCurrent){
				document.getElementById("FRBaitBtn" + i).disabled = "disabled";
				document.getElementById("FRBait" + i).style.border = "3px outset #969696";
			} else {
				document.getElementById("FRBaitBtn" + i).removeAttribute("disabled");
				document.getElementById("FRBait" + i).style.border = "";
				document.getElementById("FRBait" + i).style.opacity = "0.2";
			}
		}
		for(let i = 1; i < fishingRodLvl[fishingRodLvlCurrent][8]; i++){
			let cut = document.getElementById("FRBaitBtnUp" + i);
			if (cut != null){
				cut.removeAttribute("disabled");
			}
			document.getElementById("FRBait" + i).style.opacity = "1.0";
		}

		//GUI Заказов
		document.getElementById("orderHeadID").innerHTML = "Заказы: " + ordersScoreCurrent + "/" + ordersScoreCreate;
		if(ordersScore >= 10){
			let cut = document.getElementById("orderUpID");
				cut.disabled = "disabled";
				cut.innerHTML = "Максимум!";
		}

		//GUI Удочка
		for(let i = 0; i < fishingRodLvl[0].length - 1; i++){ //Вывод свойств текущей удочки
			document.getElementById("PropertyCell" + i).innerHTML = fishingRodLvl[0][i] + ": " + fishingRodLvl[fishingRodLvlCurrent][i];
		}
		
		//GUI Кошельёк
		document.getElementById('moneyID').innerHTML = "Кошелёк: " + money + " монет";
		
		//GUI Рюкзак
		for(let i = 0; i < fishInPack.length; i++){
			let cutCell = document.getElementById("FPCell" + i).style;
			let cutName = document.getElementById("FPCellName" + i);
			let cutCost = document.getElementById("FPCellCost" + i);
			let cutBtn = document.getElementById("packBaitBtn" + i);
			if(fishInPack[i][1] > 0){
				cutCell.background = "url(img/fish/" + fishInPack[i][3] + "), url('img/cellFon.png')" ;
				cutName.innerHTML = fishInPack[i][0];
				cutName.style.visibility = "visible";
				cutCost.innerHTML = fishInPack[i][1];
				cutCost.style.visibility = "visible";
				if(fishingRodLvlCurrent >= 5 && fishInPack[i][4] == 1){
					cutBtn.style.visibility = "visible";
				} else {
					cutBtn.style.visibility = "hidden";
				}
			} else {
				cutCell.background = "url('img/cellFon.png')";
				cutName.style.visibility = "hidden";
				cutCost.style.visibility = "hidden";
				cutBtn.style.visibility = "hidden";
			}
		}
		let cutSoldAll = document.getElementById("soldAllID");
		if (fishInPackPrice > 0){
			cutSoldAll.innerHTML = "Продать всё за " + fishInPackPrice;
			cutSoldAll.removeAttribute("disabled");
		} else {
			cutSoldAll.disabled = "disabled";
			cutSoldAll.innerHTML = "Продать всё"; 
		}
		
		//GUI Подсказки
		let cutOut = document.getElementById("out");
		if (hint.length > 0){
			cutOut.removeAttribute("hidden");
			for (let i = 0; i < hint.length ; i++){
				if (hint[i][3] == 0){
					hintCount++
					hint[i].push(hintCount);
					let divHint = document.createElement('div');
					Object.assign(divHint, {className: "hintClass", id: "hintID" + hint[i][4]});
					cutOut.append(divHint);
					hint[i][3] = 1;
				}
				let cutHint = document.getElementById("hintID" + hint[i][4]);
				Object.assign(cutHint, {innerHTML: hint[i][0]});
					cutHint.style.color = hint[i][2];
				if (hint[i][1] > 0){
					hint[i][1]--;
				} else {
					cutHint.remove();
					hint.splice(i, 1);
					if (hint.length == 0){
						cutOut.hidden = "hidden";
					}
				}
			}
		} 	
	}