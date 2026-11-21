/* NovaRescue робот-курьер (Arduino Uno + L298N + 2 IR сызық сенсоры + HC-SR04)
   Тоннельдегі сызықпен жүреді, кедергіде тоқтайды, порталды (көлденең белгі) санайды.
   Сымдар: ENA D5, IN1 D6, IN2 D7, ENB D10, IN3 D8, IN4 D9
           IR сол A0, IR оң A1 | HC-SR04 TRIG D11, ECHO D12
   Сервер Serial-мен "GO,3" жібереді: 3-портал (постамат) дейін жүр. */
const uint8_t ENA = 5, IN1 = 6, IN2 = 7, ENB = 10, IN3 = 8, IN4 = 9;
const uint8_t IR_L = A0, IR_R = A1, TRIG = 11, ECHO = 12;
const uint8_t SPEED = 140, STOP_CM = 15;
const int BLACK = 500;                 // сенсор шегі (калибровка керек)

int target = 0, portal = 0;
bool running = false, onMark = false;

void drive(int l, int r) {             // -255..255
  digitalWrite(IN1, l > 0); digitalWrite(IN2, l < 0); analogWrite(ENA, abs(l));
  digitalWrite(IN3, r > 0); digitalWrite(IN4, r < 0); analogWrite(ENB, abs(r));
}

long distanceCm() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10); digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 20000);
  return t ? t / 58 : 999;
}

void setup() {
  Serial.begin(9600);
  for (uint8_t p : {ENA, IN1, IN2, ENB, IN3, IN4, TRIG}) pinMode(p, OUTPUT);
  pinMode(ECHO, INPUT);
}

void loop() {
  if (Serial.available()) {            // "GO,n"
    String s = Serial.readStringUntil('\n');
    if (s.startsWith("GO,")) { target = s.substring(3).toInt(); portal = 0; running = true; }
  }
  if (!running) { drive(0, 0); return; }

  if (distanceCm() < STOP_CM) { drive(0, 0); Serial.println("OBSTACLE"); delay(200); return; }

  bool l = analogRead(IR_L) > BLACK, r = analogRead(IR_R) > BLACK;
  if (l && r) {                        // көлденең белгі = портал
    if (!onMark) { onMark = true; portal++; Serial.print("PORTAL,"); Serial.println(portal); }
    if (portal >= target) {            // постаматқа келдік
      drive(0, 0); running = false; Serial.println("ARRIVED"); return;
    }
    drive(SPEED, SPEED);
  } else {
    onMark = false;
    if (l) drive(-40, SPEED);          // солға бұрыл
    else if (r) drive(SPEED, -40);     // оңға бұрыл
    else drive(SPEED, SPEED);
  }
}
