//Обработчик кнопки 
function clickHandler(e) {
  start();
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("button1").addEventListener( "click" , clickHandler);
});
//------------------

function start(){
	var inputValue = document.getElementById("input1").value;
	var ms = parseInt(inputValue) * 1000;
	
	executeScriptOnPage ("function freezeTime() {setTimeout(function(){debugger}, "+ms+");}");
	executeScriptOnPage ("freezeTime()");
}



//Вспомогательные функции
function executeScriptOnPage (script) {
	/*chrome.tabs.executeScript({
		code: 'document.body.style.backgroundColor="red"'
	});*/
	chrome.tabs.executeScript({
		code: script
	});
}