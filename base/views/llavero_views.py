import serial, time

def arduino():
    port = serial.Serial('COM3', 9600, timeout=1)
    time.sleep(2)
    rawString = arduino.readline()
    print(rawString)
    
    c = 0
    hexa = ""
    while True:
        read = port.readline()
        # print(read.strip())
        c += 1
        if c == 4:
            valor = read.strip()
            hexa = str(valor)
            print(hexa)
        if c == 5:
            break
    arduino.close()
    return hexa


arduino()