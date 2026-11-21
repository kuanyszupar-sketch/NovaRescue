/* NovaRescue постамат (Arduino Mega/Uno)
   Робот жерасты порталдан жүкті ұяшыққа салады, клиент PIN енгізіп алады.
   Кітапханалар: Keypad, Servo, LiquidCrystal_I2C
   Сымдар: Keypad 4x4 -> D22..D29 | Servo 1-4 -> D2..D5 | LCD I2C (0x27) -> SDA/SCL
   Серверден/компьютерден Serial арқылы команда: "ADD,1234,2\n" (PIN 1234, ұяшық №2) */
#include <Keypad.h>
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

const uint8_t CELLS = 4;
const uint8_t SERVO_PIN[CELLS] = {2, 3, 4, 5};
const int LOCKED = 0, OPEN = 90;
const unsigned long OPEN_MS = 5000, LOCKOUT_MS = 30000;

const byte ROWS = 4, COLS = 4;
char keys[ROWS][COLS] = {{'1','2','3','A'},{'4','5','6','B'},{'7','8','9','C'},{'*','0','#','D'}};
byte rowPins[ROWS] = {22, 23, 24, 25};
byte colPins[COLS] = {26, 27, 28, 29};
Keypad pad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);
LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo lock[CELLS];

struct Slot { uint16_t pin; bool busy; } slot[CELLS];
String entry = "", line = "";
uint8_t fails = 0;
unsigned long lockedUntil = 0;

void show(const char *a, const char *b = "") { lcd.clear(); lcd.print(a); lcd.setCursor(0, 1); lcd.print(b); }

void openCell(uint8_t i) {
  lock[i].write(OPEN);
  show("Ұяшық ашық", "Тауарды алыңыз");
  delay(OPEN_MS);
  lock[i].write(LOCKED);
  slot[i].busy = false;
  Serial.print("PICKED,"); Serial.println(i + 1);   // серверге хабар
}

void handleSerial() {
  while (Serial.available()) {
    char c = Serial.read();
    if (c != '\n') { line += c; continue; }
    int a = line.indexOf(','), b = line.indexOf(',', a + 1);
    if (line.startsWith("ADD") && a > 0 && b > 0) {
      uint8_t cell = line.substring(b + 1).toInt() - 1;
      if (cell < CELLS) { slot[cell] = { (uint16_t)line.substring(a + 1, b).toInt(), true }; Serial.print("STORED,"); Serial.println(cell + 1); }
    }
    line = "";
  }
}

void setup() {
  Serial.begin(9600);
  lcd.init(); lcd.backlight();
  for (uint8_t i = 0; i < CELLS; i++) { lock[i].attach(SERVO_PIN[i]); lock[i].write(LOCKED); slot[i] = {0, false}; }
  show("NovaRescue", "PIN енгізіңіз");
}

void loop() {
  handleSerial();
  if (millis() < lockedUntil) return;               // 3 қате = 30 с блок
  char k = pad.getKey();
  if (!k) return;
  if (k == '*') { entry = ""; show("NovaRescue", "PIN енгізіңіз"); }
  else if (k >= '0' && k <= '9' && entry.length() < 4) { entry += k; show("PIN:", entry.c_str()); }
  else if (k == '#' && entry.length() == 4) {
    uint16_t v = entry.toInt(); bool ok = false;
    for (uint8_t i = 0; i < CELLS; i++) if (slot[i].busy && slot[i].pin == v) { ok = true; fails = 0; openCell(i); break; }
    if (!ok && ++fails >= 3) { lockedUntil = millis() + LOCKOUT_MS; fails = 0; show("Блок 30 с", "Көп қате"); }
    else if (!ok) show("Қате PIN", "Қайта көріңіз");
    entry = ""; delay(1200); if (millis() >= lockedUntil) show("NovaRescue", "PIN енгізіңіз");
  }
}
