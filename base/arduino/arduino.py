#!/usr/bin/env python

import time
import serial
import environ
import psycopg2
import serial

env = environ.Env()
environ.Env.read_env()


def get_connection():
    try:
        return psycopg2.connect(
            database=env('DB_NAME'),
            user=env('DB_USER'),
            password=env('DB_PASSWORD'),
            host=env('DB_HOST'),
            port=env('DB_PORT')
        )
    except:
        return False


conn = get_connection()
curr = conn.cursor()


def update_llavero(hexa):
    curr.execute(
        "UPDATE base_llavero SET tag_status = true WHERE tag = %s", (hexa,))
    conn.commit()
    print("Llavero actualizado")


def get_llavero(hexa):
    curr.execute("SELECT * FROM base_llavero WHERE tag = %s", (hexa,))
    row = curr.fetchone()
    while row is not None:
        # print(row)
        row = curr.fetchone()
        update_llavero(hexa)
    # return row


if __name__ == '__main__':
    print('Running. Press CTRL-C to exit.')
    with serial.Serial('COM3', 9600, timeout=1) as arduino:
        time.sleep(0.1)
        # c = 0
        hexa = ""
        if conn:
            print("Connection to the PostgreSQL established successfully.")
        else:
            print("Connection to the PostgreSQL encountered and error.")
        if arduino.isOpen():
            print("{} connected!".format(arduino.port))
            try:
                print("Waiting for data...")
                while True:
                    read = arduino.readline()
                    valor = read.strip()
                    hexa = valor.decode('utf-8')
                    if hexa != "":
                        print("RFID: {}".format(hexa))
                        get_llavero(hexa)

            except KeyboardInterrupt:
                print("KeyboardInterrupt has been caught.")


# curr.execute("SELECT * FROM base_llavero WHERE tag = %s", (hexa,))
# row = curr.fetchone()
# if row:
#     print("Llavero encontrado")
#     print(row)
