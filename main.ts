let average = 0
let elec = 0
let list: number[] = []
let readings = 0
let std = 0
let stddev = 0
let value3 = 0
OLED.init(64, 128)
OLED.showString("Please place your fingers on the sensor.")
basic.pause(3000)
std = Math.sqrt(stddev / 30)
list = []
for (let index = 0; index < 30; index++) {
    list.push(pins.analogReadPin(AnalogReadWritePin.P1))
    elec += pins.analogReadPin(AnalogReadWritePin.P1)
    basic.pause(1500)
}
average = Math.idiv(elec, 30)
OLED.showString("average is:")
OLED.showNumber(Math.idiv(elec, 30))
for (let value3 of list) {
    stddev += (value3 - average) * (value3 - average)
}
OLED.showString("stddev is:")
OLED.showNumber(Math.sqrt(stddev / 30))
while (true) {
    readings = 0
    for (let index = 0; index < 5; index++) {
        readings += pins.analogReadPin(AnalogReadWritePin.P1)
        basic.pause(500)
    }
    if (Math.idiv(readings, 5) >= average + std) {
        OLED.showString("reading above threshold")
        OLED.showNumber(Math.idiv(readings, 5))
        basic.showIcon(IconNames.No)
        basic.pause(1500)
        basic.clearScreen()
    } else {
        OLED.showNumber(Math.idiv(readings, 5))
    }
}
