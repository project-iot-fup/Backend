
# Create your tests here.
import serial, time


def arduino():
    port = serial.Serial('COM3', 9600)
    time.sleep(0.1)
    read = port.readline()
    hexa = read.decode('utf-8')
    port.close()
    return hexa


arduino()
