# Create your tests here.
import serial, time

# Hacer que guarden el valor y enviarlo a la base de datos
def arduino():
    port = serial.Serial('COM3', 9600, timeout=1)
    time.sleep(0.1)
    c = 0
    hexa = ""
    print("Leyendo...")
    while True:
        read = port.readline()
        print(read.strip().decode('utf-8'))
        c += 1
        if c == 4:
            valor = read.strip()
            hexa = valor.decode('utf-8')
        if c == 100:
            break
    port.close()
    return hexa

