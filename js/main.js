var curForm="";
var inited = false;
var G_ListData = undefined;
var G_CurData = -1;
var G_Data = false;
var CST_TimeOut = 8000;
var CST_TimeUpdate = 60000*10;
var IntID = 0;
var lastEvent = new Date().getTime();

function checkPreAuth() 
{
	console.log("checkPreAuth");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) 
	   handleLogin(window.localStorage["username"],window.localStorage["password"] );
	else 
		openLogin();
}

function openLogin()
{
	console.log("OpenLogin");
	$.mobile.hidePageLoadingMsg();
	$.mobile.changePage("#loginPage");
	curForm="loginForm";
	var form = $("#loginForm");
	$("#username", form).val(window.localStorage["username"]);
    $("#password", form).val(window.localStorage["password"]);
}

function exitApplication()
{
	console.log("exit app");
	navigator.app.exitApp();
}

function init() 
{	

	 $(document).on('swipeleft', '[data-role="page"]', function(event)
	 { 
		var now = new Date().getTime();
		// This will prevent event triggering more then once
		if(event.handled != true && parseInt(now - lastEvent)> 1000) 
		{   
			lastEvent = now;
			event.handled = true;
			if ($.mobile.activePage.is("#pag1"))
				$.mobile.changePage("#pag2", { transition: "slide", reverse: false, changeHash: false});
			else if ($.mobile.activePage.is("#pag2"))
				$.mobile.changePage("#pag3", { transition: "slide", reverse: false, changeHash: false});	
		}
		return false;         
	});
	
	$(document).on('swiperight', '[data-role="page"]', function(event)
	{   
		var now = new Date().getTime();
		// This will prevent event triggering more then once
		if(event.handled != true && parseInt(now - lastEvent)> 1000) 
		{      
			lastEvent = now;
			event.handled = true;
			if ($.mobile.activePage.is("#pag2"))
				$.mobile.changePage("#pag1", { transition: "slide", reverse: true, changeHash: false});	
			else if ($.mobile.activePage.is("#pag3"))
				$.mobile.changePage("#pag2", { transition: "slide", reverse: true, changeHash: false});			
		}
		return false;            
	});


	checkPreAuth();
	delete init;
}

function checkUserPsw()
{
	var form = $("#loginForm");
	var u = $("#username", form).val();
    var p = $("#password", form).val();
	handleLogin(u,p);
}


function loadDataDB()
{
	console.log("loadDataDB");
	G_Data.batterySOC_PERC_Truncate =	window.localStorage["batterySOC_PERC_Truncate"];
	G_Data.batterySOC_PERC = window.localStorage["batterySOC_PERC"];
	G_Data.batteryI =	window.localStorage["batteryI"];
	G_Data.batterySOC_Truncate = window.localStorage["batterySOC_Truncate"];
	G_Data.batteryPTruncate =	window.localStorage["batteryPTruncate"];
	G_Data.inverterP_IN_ACReduced = window.localStorage["inverterP_IN_ACReduced"];
	G_Data.inverterP_IN_ACTruncate = window.localStorage["inverterP_IN_ACTruncate"];
	G_Data.inverterP_IN_ACPercTruncateFloat =	window.localStorage["inverterP_IN_ACPercTruncateFloat"];
	G_Data.inverterP_OUT_ACPerc =	window.localStorage["inverterP_OUT_ACPerc"];
	G_Data.inverterP_OUT_ACTruncate =	window.localStorage["inverterP_OUT_ACTruncate"];
	G_Data.plcP_IRRTruncate =	window.localStorage["plcP_IRRTruncate"];
	G_Data.plcP_IRRPercTruncateFloat = window.localStorage["plcP_IRRPercTruncateFloat"];
	//G_Data.enableViewAlarm = window.localStorage["enableViewAlarm"];
	//G_Data.workingOn = window.localStorage["workingOn"];
	
	if (window.localStorage["enableViewAlarm"].toUpperCase() === "FALSE")
		G_Data.enableViewAlarm  = false;
	else 
		G_Data.enableViewAlarm  = true;
	
	if (window.localStorage["workingOn"].toUpperCase() === "FALSE")
		G_Data.workingOn  = false;
	else 
		G_Data.workingOn  = true;
		
	G_Data.cp_1 =	window.localStorage["cp_1"];
	G_Data.percTree =	window.localStorage["percTree"];
	G_Data.numberTreeInserted = window.localStorage["numberTreeInserted"];
	G_Data.percOil = window.localStorage["percOil"];
	G_Data.numberOilInserted = window.localStorage["numberOilInserted"];
	G_Data.percChild = window.localStorage["percChild"];
	G_Data.userName =	window.localStorage["userName"];
	G_Data.literOil =	window.localStorage["literOil"];
}


function saveDataDB()
{
	console.log("saveDataDB");
	window.localStorage["batterySOC_PERC_Truncate"] = G_Data.batterySOC_PERC_Truncate;
	window.localStorage["batterySOC_PERC"] = G_Data.batterySOC_PERC;
	window.localStorage["batteryI"] = G_Data.batteryI;
	window.localStorage["batterySOC_Truncate"] = G_Data.batterySOC_Truncate;
	window.localStorage["batteryPTruncate"] = G_Data.batteryPTruncate;
	window.localStorage["inverterP_IN_ACReduced"] = G_Data.inverterP_IN_ACReduced;
	window.localStorage["inverterP_IN_ACTruncate"] = G_Data.inverterP_IN_ACTruncate;
	window.localStorage["inverterP_IN_ACPercTruncateFloat"] = G_Data.inverterP_IN_ACPercTruncateFloat;
	window.localStorage["inverterP_OUT_ACPerc"] = G_Data.inverterP_OUT_ACPerc;
	window.localStorage["inverterP_OUT_ACTruncate"] = G_Data.inverterP_OUT_ACTruncate;
	window.localStorage["plcP_IRRTruncate"] = G_Data.plcP_IRRTruncate;
	window.localStorage["plcP_IRRPercTruncateFloat"] = G_Data.plcP_IRRPercTruncateFloat;
	window.localStorage["enableViewAlarm"] = G_Data.enableViewAlarm;
	window.localStorage["workingOn"] = G_Data.workingOn;
	window.localStorage["cp_1"] = G_Data.cp_1;
	window.localStorage["percTree"] = G_Data.percTree;
	window.localStorage["numberTreeInserted"] = G_Data.numberTreeInserted;
	window.localStorage["percOil"] = G_Data.percOil;
	window.localStorage["numberOilInserted"] = G_Data.numberOilInserted;
	window.localStorage["percChild"] = G_Data.percChild;
	window.localStorage["userName"] = G_Data.userName;
	window.localStorage["literOil"] = G_Data.literOil;
}




function showPage1(u,p)
{
	window.localStorage["username"] = u;
	window.localStorage["password"] = p;   
	
	if (inited == false)
	{
		loadDevice(); //La prima devo farlo, altrimenti non viene richiamato subito
		inited = true;			
		IntID = setInterval(loadDevice, CST_TimeUpdate);
	}        
		
	$("#submitButton").removeAttr("disabled");
	document.getElementById("msgError").style.display = "none";
	$.mobile.changePage("#pag1", {transition: "slide",reverse: false, changeHash: false});
	$.mobile.hidePageLoadingMsg();
	curForm="main";
}

function handleLoginSuccess(dataLogin,u,p)
{
	console.log("dataLogin:" + dataLogin);
	$.mobile.hidePageLoadingMsg();
	if (dataLogin)
	{
		//showPage1(u,p);
		if (inited == false)
		{
			inited = true;			
			IntID = setInterval(loadDevice, CST_TimeUpdate);
		}   
		
		window.localStorage["username"] = u;
		window.localStorage["password"] = p;   
		loadDevice();
	}
	else 
	{
		if (curForm!="loginForm")
			openLogin();
		else 
			document.getElementById("msgError").style.display = "block";
	}
}

function handleLoginError()
{
	$.mobile.hidePageLoadingMsg();
	if (window.localStorage["username"] != undefined)
	{
		var u =	window.localStorage["username"];
		var p =	window.localStorage["password"] ;   
		showPage1(u,p)
	}
	else 
		openLogin();
}

function handleLogin(u,p) 
{
	console.log("handleLogin");
    if(u != '' && p!= '') 
	{			
		var url = "http://www.unesrl.com/application/authenticatemobile?username=" + encodeURIComponent(u) + "&password=" + encodeURIComponent(p) + "&remember=true";						
		console.log("url " + url);
		
		$.mobile.showPageLoadingMsg();

		var dataLogin;
		var request = $.ajax({
			dataType: "json",
			url: url,
			data: dataLogin,
			success: function(data){ handleLoginSuccess(data,u,p);    	}	,
			timeout: CST_TimeOut
		}).fail( function( xhr, status ) {	openLogin();});
    } 
	else 
	{
		//alert("You must enter a username and password");
		$.mobile.hidePageLoadingMsg();
		$.mobile.changePage("#loginForm", { transition: "slide", reverse: false, changeHash: false});
		var form = $("#loginForm");
		$("#username", form).val();
		var p = $("#password", form).val();	
    }
}


function showDevices()
{
	console.log("showDevices G_ListData.length: " + G_ListData.length);
	var tableDevices=document.getElementById("tableDevices");
	if (tableDevices!=undefined)
	{
		var htmlTotal ="";
		for (var i=0; i< G_ListData.length; i++)
		{
			G_Data =  G_ListData[i];
		var html ="  <tr> " + 
                " <td> " + 
				" <a href='#' onclick='javascript:selectDevice(" + i + ");' > ";
				
			if (G_Data.workingOn == false)
			{
				html += " <img src='./images/panel2.png' id='imgDevice1' class='imgDevice1' /> ";
			}
			else 
			{
				html += " <img src='./images/panel2Green.png' id='imgDevice1' class='imgDevice1' /> ";
			}
			
			html +=	" </a> " + 
                " </td> " +
                " <td> " +                
                " <table> " +
                " <tr> " +
                " <td class='tdSubTitle'> " +
				" Indirizzo " +
                " </td> " + 
                " <td class='tdNormal'> " +
				G_Data.address + ",<br/> " + G_Data.city +
                " </td> " +
                " </tr> " + 
                " <td class='tdSubTitle'> " +
                " Potenza: " +
                " <td class='tdNormal'> " +
				G_Data.chopperP_OUTTruncate + " kW (" + G_Data.plcP_IRRTruncate + "  kW) " +
                " </td> " +
                " <tr> " + 
                " </tr> " + 
                " </table> " +
                " </td> " + 
                " </tr> ";
			htmlTotal +=html;
		}
		tableDevices.innerHTML = htmlTotal;
	}
}


function testAndChangeMenu()
{

	logoutMenu = document.getElementsByName("logoutMenu");
	if (G_ListData.length > 1 && logoutMenu != undefined)
	{ 
		for (var i=0; i < logoutMenu.length; i++)
		{
			var str = logoutMenu[i].innerHTML;
			str = str.replace("handleLogout","viewPageDevices");
			str = str.replace("logout","Dispositivi");
			logoutMenu[i].innerHTML = str;	
		}
	}
	else
	{
		for (var i=0; i < logoutMenu.length; i++)
		{
			var str = logoutMenu[i].innerHTML;
			str = str.replace("viewPageDevices","handleLogout");
			str = str.replace("Dispositivi","logout");
			logoutMenu[i].innerHTML = str;	
		}
	}
	
}

function viewPageDevices()
{
	$.mobile.changePage("#pag0", { transition: "slide", reverse: false, changeHash: false});
}


function showWorking()
{		
	imgSummary1 = document.getElementById("imgSummary1");
	if (G_Data != false && imgSummary1!= undefined)
	{
		console.log("showWorking");
		imgSummary1 = document.getElementById("imgSummary1");
		imgSummary2 = document.getElementById("imgSummary2");
		imgSummary3 = document.getElementById("imgSummary3");
		pS1 = document.getElementById("pS1");
		pS2 = document.getElementById("pS2");
		pS3 = document.getElementById("pS3");

		if (G_Data.workingOn == false)
		{
			imgSummary1.src = "./images/panel2.png";
			pS1.style.color = "black";
			pS1.innerHTML = "Working Off";
		}
		else 
		{
			imgSummary1.src = "./images/panel2Green.png";
			pS1.style.color = "green";
			pS1.innerHTML = "Working On";
		}
		
		if (G_Data.enableViewAlarm)
		{
			imgSummary2.src = "./images/panel2Red.png";
			pS2.style.color = "red";
			pS2.innerHTML = "Alarm On";
		}
		else 
		{
			imgSummary2.src = "./images/panel2.png";
			pS2.style.color = "black";
			pS2.innerHTML = "Alarm Off";
		}
		
		console.log("pS3 " + pS3);
		
		if (G_Data.cp_1 > 0)
		{
			imgSummary3.src = "./images/panel2Green.png";
			pS3.style.color = "green";
			pS3.innerHTML = "Extra Power Avaible <br>" + G_Data.plcP_IRRTruncate + " kW"; 
		}
		else 
		{
			imgSummary3.src = "./images/panel2.png";
			pS3.style.color = "black";
			pS3.innerHTML = "Extra Power Unavailable"; 
		}
		console.log("pS3 " + pS3.innerHtml);
	}
}

function showApp()
{
	var	batteryImg = document.getElementById("batteryImg");
	if (G_Data != false && batteryImg != undefined)
	{
		console.log("showApp");
		var path = "./images/";
		var	batteryImg = document.getElementById("batteryImg");
		if (G_Data.batterySOC_PERC > 80)
			batteryImg.src = path + "battery5.png";
		else if (G_Data.batterySOC_PERC > 60 && G_Data.batterySOC_PERC <= 80)
			batteryImg.src = path + "battery4.png";
		else if (G_Data.batterySOC_PERC > 40 && G_Data.batterySOC_PERC <= 60)
			batteryImg.src = path + "battery3.png";
		else if (G_Data.batterySOC_PERC > 20 && G_Data.batterySOC_PERC <= 40)
			batteryImg.src = path + "battery2.png";
		else if (G_Data.batterySOC_PERC <= 20)
			batteryImg.src = path + "battery1.png";
			
		var batteryTxt = document.getElementById("batteryTxt");
		//batteryTxt.innerHTML = G_Data.batterySOC_PERC_Truncate + " %";
		batteryTxt.innerHTML =G_Data.batterySOC_Truncate + " Ah - " + G_Data.batterySOC_P_Truncate + "kWh";
		var batteryBar = document.getElementById("batteryBar");
		batteryBar.setAttribute('data-perc', G_Data.batterySOC_PERC);
		
		var pnlSolarTxt = document.getElementById("pnlSolarTxt");
		pnlSolarTxt.innerHTML = G_Data.chopperP_OUTTruncate + " kW" + " (" + G_Data.plcP_IRRTruncate + " kW)";
		var pnlSolarBar = document.getElementById("pnlSolarBar");
		//pnlSolarBar.setAttribute('data-perc', G_Data.plcP_IRRPercTruncateFloat);
		pnlSolarBar.setAttribute('data-perc', G_Data.chopperP_OUTPercTruncateFloat);
		
		var powerSupplyTxt = document.getElementById("powerSupplyTxt");
		powerSupplyTxt.innerHTML = G_Data.inverterP_IN_ACTruncate + " kW";
		var powerSupplyBar = document.getElementById("powerSupplyBar");
		powerSupplyBar.setAttribute('data-perc', G_Data.inverterP_IN_ACPercTruncateFloat);
		
		var consumptionTxt = document.getElementById("consumptionTxt");
		consumptionTxt.innerHTML = G_Data.inverterP_OUT_ACTruncate + " kW";
		var consumptionBar = document.getElementById("consumptionBar");
		consumptionBar.setAttribute('data-perc', G_Data.inverterP_OUT_ACPerc);

		var progrBarDirection = document.getElementById("progrBarDirection");
		progrBarDirection.innerHTML = "";
						
		//if ((G_Data.batteryI > 0.05 && G_Data.chopperP_OUTPercTruncateFloat> 0) ) 
		if ((G_Data.batteryI > 0.05 && G_Data.plcP_IRRPercTruncateFloat> 0) ) 
		{
			progrBarDirection.innerHTML = "<div class='rotateBattery1'> " + 
					"<div class='progressbar' data-perc='0'> " +
					"<div class='bar color1'><span></span></div> " +
					"</div>" + //#{continueArrows isGreen:true/}
					
					" <img class='showRB1_Arrow1' src='./images/Green-animated-arrow.gif' /> " +
					" <img class='showRB1_Arrow2' src='./images/Green-animated-arrow.gif' /> " +
					" <img class='showRB1_Arrow3' src='./images/Green-animated-arrow.gif' /> " +
					" <img class='showRB1_Arrow4' src='./images/Green-animated-arrow.gif' /> " +
					" <img class='showRB1_Arrow5' src='./images/Green-animated-arrow.gif' /> " +
					" <img class='showRB1_Arrow6' src='./images/Green-animated-arrow.gif' /> " +
					"</div>";
		}
		
		if ((G_Data.batteryI > 0.05 && G_Data.inverterP_IN_ACReduced> 0) ) 
		{
			progrBarDirection.innerHTML += "<div class='rotateBattery2'>" +
				"<div class='progressbar' data-perc='0'> " +
				"<div class='bar color3'><span></span></div> " +
				"</div>" +  
									
				"<div class='revertArrow'> " +
				" <img class='showRB1_Arrow1' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow2' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow3' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow4' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow5' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow6' src='./images/Red-animated-arrow-down.gif' /> " +
				" </div> " +	
							
				"</div>";
		}
		
		if ((G_Data.batteryI < -0.05 && G_Data.inverterP_OUT_ACPerc> 0.05 )  )
		{
			progrBarDirection.innerHTML += "<div class='rotateBattery'>" +
				"<div class='progressbar' data-perc='0'> " +
				"<div class='bar color1'><span></span></div> " +
				"</div>" + 
				" <div > " +
				" <img class='showRB1_Arrow1' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow2' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow3' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow4' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow5' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow6' src='./images/Green-animated-arrow.gif' /> " +
				" </div> " +	
				"</div>";
		}
		
		progrBarDirection2 = document.getElementById("progrBarDirection2");
		progrBarDirection2.innerHTML = "";
		//if ((G_Data.chopperP_OUTPercTruncateFloat>0 && G_Data.inverterP_OUT_ACPerc>0) ) 
		if ((G_Data.plcP_IRRPercTruncateFloat>0 && G_Data.inverterP_OUT_ACPerc>0) ) 
		{
			progrBarDirection2.innerHTML = "<div class='rotatePnlSolar'>" +
				" <div class='progressbar' data-perc='0'> " +
				" <div class='bar'><span></span></div> " +
				" </div> " +
				" <img class='showRB1_Arrow1' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow2' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow3' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow4' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow5' src='./images/Green-animated-arrow.gif' /> " +
				" <img class='showRB1_Arrow6' src='./images/Green-animated-arrow.gif' /> " +
				" </div> ";
		}
		progrBarDirection3 = document.getElementById("progrBarDirection3");
		progrBarDirection3.innerHTML = "";
		if ((G_Data.inverterP_IN_ACReduced>0  && G_Data.inverterP_OUT_ACPerc>0) ) 
		{
			progrBarDirection3.innerHTML = "<div class='rotatePowerSupply'> "+
				" <div class='progressbar' data-perc='0'> " + 
				" <div class='bar color3'><span></span></div> " +
				" </div> " +
				"<div class='revertArrow'> " +
				" <img class='showRB1_Arrow1' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow2' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow3' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow4' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow5' src='./images/Red-animated-arrow-down.gif' /> " +
				" <img class='showRB1_Arrow6' src='./images/Red-animated-arrow-down.gif' /> " +
				" </div> " +	
				" </div> ";
		}
		
		//Aggiorna i valori delle progressBar
		updateValuePB();
	} 
}

function showSummary()
{
	testAndChangeMenu();
	var spanTreeLeft = document.getElementById("spanTreeLeft");
	if (G_Data != false && spanTreeLeft!= undefined)
	{
		console.log("showSummary");
		var spanTreeLeft = document.getElementById("spanTreeLeft");

		if (G_Data.percTree < 14.28)
			spanTreeLeft.innerHTML = "<img id='showTree' class='showTree' src='./images/VasoAlbero6.png'/>";
		else if (G_Data.percTree >= 14.28 && G_Data.percTree < 28.57)
			spanTreeLeft.innerHTML = "<img id='showTree' class='showTree' src='./images/VasoAlbero5.png'/>";
		else if (G_Data.percTree >= 28.57 && G_Data.percTree < 42.84)
			spanTreeLeft.innerHTML = "<img id='showTree' class='showTree' src='./images/VasoAlbero4.png'/>";
		else if (G_Data.percTree >= 42.84 && G_Data.percTree < 57.12)
			spanTreeLeft.innerHTML = "<img id='showTree' class='showTree' src='./images/VasoAlbero3.png'/>";
		else if (G_Data.percTree >= 57.12 && G_Data.percTree < 71.42)
			spanTreeLeft.innerHTML = "<img id='showTree' class='showTree' src='./images/VasoAlbero2.png'/>";
		else if (G_Data.percTree >= 71.42 && G_Data.percTree < 85.68)
			spanTreeLeft.innerHTML = "<img id='showTree' class='showTree' src='./images/VasoAlbero1.png'/>";
		else 
			spanTreeLeft.innerHTML = "<img id='showTree' class='showTree' src='./images/VasoAlbero0.png'/>";
			
		var spanTreeRight = document.getElementById("spanTreeRight");
		
		spanTreeRight.innerHTML = "";
		//G_Data.numberTreeInserted = 5;
		for (var i=0; i< G_Data.numberTreeInserted; i++)
		{
			var position =  50 + (i%3) * 66; 
			position +=  Math.round(i/3) * 22; 
			spanTreeRight.innerHTML += "<img id='showTree' class='showTree' style='left:" + position + "px' src='./images/VasoAlbero0.png'/>";
		}
		
		var oil =  document.getElementById("ex1");
		oil.value = G_Data.percOil;
		oil.innerHTML = "<strong>Progress: " + G_Data.percOil + "%%</strong>";
		
		var txtTree = document.getElementById("txtTree");
		if (G_Data.numberTreeInserted == 1)
			txtTree.innerHTML = G_Data.userName + " hai contribuito a far crescere un albero";
		else
			txtTree.innerHTML = G_Data.userName + " hai contribuito a far crescere " + G_Data.numberTreeInserted + " alberi"; 
		 
		var oilTree = document.getElementById("oilTree");
		oilTree.innerHTML = "Hai contribuito a risparmiare " + G_Data.literOil + " l ";
		
		
		var spanChildLeft = document.getElementById("spanChildLeft");
		if (G_Data.percChild < 16.66)
			spanChildLeft.innerHTML = "<img id='showLung' class='showLung' src='./images/Lung0.png' /> ";
		else if (G_Data.percChild >= 16.66 && G_Data.percChild < 33.33)
			spanChildLeft.innerHTML = "<img id='showLung' class='showLung' src='./images/Lung1.png' /> ";
		else if (G_Data.percChild >= 33.33 && G_Data.percChild < 49.99)
			spanChildLeft.innerHTML = "<img id='showLung' class='showLung' src='./images/Lung2.png' /> ";
		else if (G_Data.percChild >= 49.99 && G_Data.percChild < 66.66)
			spanChildLeft.innerHTML = "<img id='showLung' class='showLung' src='./images/Lung3.png' /> ";
		else if (G_Data.percChild >= 66.66 && G_Data.percChild < 83.33)
			spanChildLeft.innerHTML = "<img id='showLung' class='showLung' src='./images/Lung4.png' /> ";
		else 
			spanChildLeft.innerHTML = "<img id='showLung' class='showLung' src='./images/Lung5.png' /> ";

	}
}


function selectDevice(numDevice)
{
	console.log("selectDevice numDevice:" + numDevice);
	G_CurData = numDevice;
	G_Data = G_ListData[numDevice];
	if (G_Data!=false)
	{
		$.mobile.changePage("#pag1", { transition: "slide", reverse: false, changeHash: false});
		showApp();
		showWorking();
		showSummary();
		saveDataDB();
	}
}

function loadDeviceSuccess(dataTmp)
{
	$.mobile.hidePageLoadingMsg();
	console.log(dataTmp);
	console.log(dataTmp.length);
	
	if (dataTmp.length == 1)
	{
		G_ListData = dataTmp;
		G_CurData = 0;
		G_Data = dataTmp[0];
		if (G_Data!=false)
		{
			$.mobile.changePage("#pag1", { transition: "slide", reverse: false, changeHash: false});
			showApp();
			showWorking();
			showSummary();
			saveDataDB();
		}
	}
	else
	{
		G_ListData = dataTmp;
		G_CurData = 0;
		$.mobile.changePage("#pag0", { transition: "slide", reverse: false, changeHash: false});
	}
}

function loadDeviceError()
{
	$.mobile.hidePageLoadingMsg();
	loadDataDB();
	if (G_Data!=false)
	{
		showApp();
		showWorking();
		showSummary();
	}
}

function loadDevice()
{
	console.log("loadDevice");
	var u = window.localStorage["username"];
    var p = window.localStorage["password"]; 
  			
	var url = "http://www.unesrl.com/application/getDeviceInfo?username=" + encodeURIComponent(u) + "&password=" + encodeURIComponent(p) ;						
	console.log("url " + url);
	
	$.mobile.showPageLoadingMsg();
		
	//Aggiungo un trigger sul caricamento della pagina page0	
	jQuery( ".page0" ).on( "pageshow", function( event ) 
	{ 
		showDevices();
	});
	
	var requestData =0;
	var request = $.ajax({
			dataType: "json",
			url: url,
			data: requestData,
			success: function(data){ loadDeviceSuccess(data);    	}	,
			timeout: CST_TimeOut
		}).fail( function( xhr, status ) {	loadDeviceError();});
		
}


function progressBarInit()
{
	$('.progressbar').each(function()
	{
		var t = $(this);
		t.find('.label').append('<div class="perc"></div>');
	});
}

function updateValuePB()
{
	$('.progressbar').each(function()
	{
		var t = $(this),
		dataperc = t.attr('data-perc'),
		barperc = Math.round(dataperc/1.2987);
		//t.find('.bar').animate({width:barperc}, dataperc*25);
		//t.find('.bar').style.width = dataperc*25 + "px";
		t.find('.bar').css('width', barperc + 'px');
		//t.find('.label').append('<div class="perc"></div>');
	
		var length = barperc,
		perc = Math.round(parseInt(length)*1.2987),
		labelpos = (parseInt(length));
		//t.find('.label').css('left', labelpos);
		//t.find('.label').animate({left:barperc}, dataperc*25);
		t.find('.label').css('left', dataperc/1.2987);
		//t.find('.label').style.left = dataperc*25 + "px";
		t.find('.perc').text(perc+'%');	
	
	});
}
function handleLogout()
{
	window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");  
	
	$.mobile.changePage("#loginPage", {
				  transition: "slide",
				  reverse: false,
				  changeHash: false
				});
				
	if (inited == true)
	{
		clearInterval(IntID);
		inited = false;			
	}
}


