# Расширения для браузера Хром


#### Полезная информация
В popup.html нельзя объявлять вообще никакие скрипты, также и события.  
Тоесть вместо  
```
<input type="button" value="Play" onClick="PlaySound('strawberry_fields.mp3')">
```
Нужно писать  
```
<button id="Button1" ></button>
```
А в popup.js  
```
function clickHandler(e) {
  PlaySound('strawberry_fields.mp3')
}
document.addEventListener( "DOMContentLoaded" , function () {
  document.getElementById("Button1").addEventListener( "click" , clickHandler);
});
```


#### Полезные ссылки
https://habrahabr.ru/post/198652/  
http://javascript.ru/forum/jquery/34789-kak-poluchit-dannye-s-drugogo-sajjta.html  
http://xdan.ru/pishem-javascript-parser-pri-pomoshhi-google-chrome-extension.html  
