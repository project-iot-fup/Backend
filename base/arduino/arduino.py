#!/usr/bin/env python

import time

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

# def validate_sala(id_sala):
#     curr.execute("SELECT * FROM base_sala WHERE sala_status = true")
#     if curr.rowcount == 0:
#         print("Sala: No esta activa")
#         return False
#     else:
#         print("Sala: Activa")
#         return True

def update_llavero(hexa):
    curr.execute(
        "SELECT * FROM base_llavero WHERE tag_status = false AND tag = %s", [hexa])
    if curr.rowcount == 0:
        print("Tag Status: Ya esta activo")
        # update_asistencia(id_llavero)
        return False
    else:
        curr.execute(
            "UPDATE base_llavero SET tag_status = true WHERE tag = %s", [hexa])
        conn.commit()
        print("Tag Status: Activo")
        # update_asistencia(id_llavero)
        return True

def update_asistencia(id_llavero):
    curr.execute(
        "SELECT * FROM base_asistencia WHERE llavero_id = %s", (id_llavero,))
    row = curr.fetchone()
    if row[4] == True:
        print("Asistencia: Ya esta en clase")
        return False
    else:
        curr.execute(
            "UPDATE base_asistencia SET entrada = true WHERE llavero_id = %s", (id_llavero,))
        conn.commit()
        print("Asistencia: En clase")
        return True


def horas(id_sala):
    curr.execute(
        "SELECT * FROM base_sala WHERE _id = %s", (id_sala,))
    sala = curr.fetchone()
    fecha_inicio = sala[2]
    hora_inicio = fecha_inicio.time()
    # print(hora_inicio)
    fecha_fin = sala[3]
    hora_fin = fecha_fin.time()
    # print(hora_fin)
    fecha_clase = fecha_inicio.date()
    print(fecha_clase)
    hora_actual = time.strftime("%H:%M:%S")
    # print(hora_actual)
    dia_actual = time.strftime("%Y-%m-%d")
    print(dia_actual)
    if dia_actual == fecha_clase:
        if hora_inicio <= hora_actual <= hora_fin:
            print("Dentro del rango")
            return True
        else:
            print("Fuera del rango")
            return False
    # else:
    #     print("No hay clase")
    
    
def get_llavero(hexa):
    curr.execute("SELECT * FROM base_llavero WHERE tag = %s", (hexa,))
    row = curr.fetchone()
    if row is None:
        print("Tag: No existe")
        return False
    else:
        id_llavero = row[4]
        # validacion si la sala relacionada con el llavero verifique si esta dentro de la hora
        curr.execute(
            "SELECT * FROM base_asistencia WHERE llavero_id = %s", (id_llavero,))
        asistencia = curr.fetchone()
        id_sala = asistencia[3]
        # curr.execute(
        #     "SELECT * FROM base_sala WHERE _id = %s", (id_sala,))
        # sala = curr.fetchone()
        # print(sala)
        while row is not None:
            # si la hora de nuetro equipo esta dentro del rango de la fecha inicio y fecha fin pass
            horas(id_sala)
            # *********
            row = curr.fetchone()
            update_llavero(hexa)
            update_asistencia(id_llavero)
            return True
            # *********


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
