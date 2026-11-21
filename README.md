# NovaRescue

Жерасты роботты жеткізу сайты. Каzakh / Русский / English.

## Репозиторий құрылымы

```
index.html        (сіздің файл, 1 жол қосылады, төменде)
style.css         (сіздің файл)
script.js         (сіздің файл)
journey.js        ← жаңа: 4 фото секциясы + нақты карта
map-track.js      ← жаңа: карта, геолокация, бақылау
map-track.css     ← жаңа: карта стилі
assets/
  step1-cafe-order.jpg
  step2-underground.jpg
  step3-pickup-point.jpg
  step4-warehouse.jpg
  (+ бұрынғы робот/негізін қалаушы суреттері: robot-fleet.jpg, robot-build.jpg)
4194db97-acfa-4594-b2dd-74d2bf48f1e3.jpeg, IMG_3368.jpeg, IMG_3267.jpeg  (түбірде қалсын)
firmware/
  postamat/postamat.ino
  robot_tunnel/robot_tunnel.ino
```

## index.html-ге бір жол қосу

`</body>` алдында, `<script src="script.js"></script>` жолынан кейін:

```html
<script src="journey.js"></script>
```

Бұл жол Leaflet картасын, 4 фото секциясын және бақылауды өзі қосады.
(Алдыңғы қадамдағы Leaflet / map-track тегтерін қосқан болсаңыз, қайталанбайды.)

## GitHub Pages-те ашу

1. Барлық файлдарды (assets және firmware қалталарымен) репозиторийге жүктеңіз (Add file → Upload files).
2. Settings → Pages.
3. Source: Deploy from a branch → Branch: `main`, қалта `/ (root)` → Save.
4. 1–2 минуттан кейін сайт `https://<логин>.github.io/<репозиторий>/` мекенжайында ашылады.

Негізгі бет `index.html` болуы керек, файл атаулары кіші әріппен жазылсын.

## Arduino

Arduino IDE-де `firmware/postamat/postamat.ino` және `firmware/robot_tunnel/robot_tunnel.ino` ашыңыз.
Кітапханалар: Keypad, Servo, LiquidCrystal_I2C. Сымдар файл басындағы түсініктемеде.
