import serial, time


def arduino():
    port = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    time.sleep(2)
    c = 0
    hexa = ""
    while True:
        read = port.readline()
        c += 1
        if c == 4:
            valor = read.strip()
            hexa = str(valor)
            print(hexa)
        if c == 5:
            break
    port.close()
    return hexa


def lectura_arduino():
    arduino = serial.Serial('COM3', 9600)
    time.sleep(2)
    rawString = arduino.readline()
    print(rawString)
    c = 0
    hexa = ""
    while True:
        sarduino = arduino.readline()
        print(sarduino.strip())
        #c = input("igrese ::")
        c += 1
        if c == 4:
            valor = sarduino.strip()
            hexa = str(valor).split(":  ")
            hexa = hexa[1].replace("'", "")
        if c == 5:  # en 5 pasos de al lectura del aurduino para el cilo de la lectura
            # arduino.close()
            break
    arduino.close()
    return hexa


# arduino()