# NovaRescue: LEGO SPIKE Prime робот-курьер (Pybricks firmware)
# 1) https://code.pybricks.com ашып, хабқа Pybricks firmware орнатыңыз (LEGO-ға қайтуға болады).
# 2) Осы кодты Pybricks Code-қа қойып, хабқа жүктеңіз (Download and run).
# 3) Бағдарлама жұмыс істеп тұрғанда сайттан "1", "2" немесе "3" (ЖК нөмірі) келеді.
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction, Color
from pybricks.robotics import DriveBase
from pybricks.tools import wait
from usys import stdin
from uselect import poll

hub = PrimeHub()

# Моторлар порттары (A және B). Робот кері жүрсе, Direction-ды ауыстырыңыз.
left = Motor(Port.A, Direction.COUNTERCLOCKWISE)
right = Motor(Port.B)

# SPIKE Prime стандартты дөңгелек: 56 мм, дөңгелектер арасы ~112 мм (өлшеп түзетіңіз)
robot = DriveBase(left, right, wheel_diameter=56, axle_track=112)
robot.settings(straight_speed=200)  # мм/с

# Әр ЖК-ға дейінгі қашықтық, мм (өз трассаңызға қарай өзгертіңіз)
DIST = {b"1": 600, b"2": 1200, b"3": 1800}

keyboard = poll()
keyboard.register(stdin)

hub.light.on(Color.GREEN)
print("READY")

while True:
    while not keyboard.poll(0):
        wait(10)
    cmd = stdin.buffer.read(1)

    if cmd in DIST:
        d = DIST[cmd]
        hub.light.on(Color.ORANGE)
        print("GO")
        robot.straight(d)          # ЖК-ға дейін жүру
        hub.light.on(Color.BLUE)
        print("ARRIVED")           # сайтқа хабар: жетті
        wait(5000)                 # 5 с күту (тапсырыс беру)
        robot.straight(-d)         # складқа қайту
        hub.light.on(Color.GREEN)
        print("HOME")
    elif cmd == b"S":
        robot.stop()
        hub.light.on(Color.RED)
