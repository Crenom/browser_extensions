//Инфо по этому говну https://developer.chrome.com/extensions/tabs
/*chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});*/

//Обработчик кнопки 
function clickHandler(e) {
  start();
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("button1").addEventListener( "click" , clickHandler);
});
//------------------

if (wasInjected == undefined || wasInjected != true){
	var wasInjected = false;
}

function start(){
	if (wasInjected == false) {
		inject_GetElemebtByXpathFunc();
		inject_SetBgColorFunc();
		executeScriptOnPage("var lastElement = undefined;");
		executeScriptOnPage("var lastElementBgColor = undefined;");
		var port = chrome.runtime.connect();
		wasInjected = true;
	}
	executeScriptOnPage('window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");');
	var xpath = getInputValue();
	var element = executeScriptOnPage ("var element = getElementByXpath(\""+xpath+"\")");
	//спиздить элемент со страницы
	//printInfo (element);
	executeScriptOnPage ("setBgColor(element)");
	/*var element = getElementByXpath(xpath);
	printInfo (element);
	setBgColor(element);*/
}

function executeScriptOnPage (script) {
	/*chrome.tabs.executeScript({
		code: 'document.body.style.backgroundColor="red"'
	});*/
	chrome.tabs.executeScript({
		code: script
	});
}

function getElementByXpath(path) {
  try{
  	var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	return element;
  } catch (e) {
  	return e;
  }
}
function inject_GetElemebtByXpathFunc(){
	var Text = "function getElementByXpath(path) {";
	Text = Text + "try{ ";
	Text = Text + "var element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; ";
	Text = Text + "return element; ";
  	Text = Text + "} catch (e) { ";
	Text = Text + "return e; ";
	Text = Text + "} ";
	Text = Text + "}";
	executeScriptOnPage (Text);
}
function inject_SetBgColorFunc() {
	var Text = "function setBgColor (obj){ ";
	Text = Text + "if (obj.style) { ";
	Text = Text + "	if (lastElement != undefined) { ";
	Text = Text + "		lastElement.style.backgroundColor = lastElementBgColor; ";
	Text = Text + "	} ";
	Text = Text + "	lastElement = obj; ";
	Text = Text + "	lastElementBgColor = obj.style.backgroundColor; ";
	Text = Text + "	obj.style.backgroundColor = 'red'; ";
	Text = Text + "} ";
	Text = Text + "}";
	executeScriptOnPage (Text);
}
function inject_ListnerFunc(){
/*chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    port.postMessage({counter: msg.counter+1});
  });
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({counter: request.counter+1});
  });*/
}

function getInputValue() {
	var inputObj = document.getElementById("input");
	return inputObj.value;
}

function printInfo (Text){
	var infoObj = document.getElementById("info");
  infoObj.innerText = Text;
}
function setBgColor (obj){
	if (obj.style) {
		if (lastElement != undefined) {
			lastElement.style.backgroundColor = lastElementBgColor;
		}
		lastElement = obj;
		lastElementBgColor = obj.style.backgroundColor;
		obj.style.backgroundColor = "red";
	}
}

//общение со страницой
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window) {
    return;
  }

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
	alert("1");
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);
//----------------------