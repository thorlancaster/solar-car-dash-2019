import socket
import json

host = "127.0.0.1"
port = 8080

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind ((host, port))
s.listen(1)
while 1:
    connection, address = s.accept()
    data = connection.recv(99999).decode("utf-8")
    print("Data:", data)
    connection.sendall(str.encode('HTTP/1.0 200 OK\r\n'))
    connection.sendall(str.encode('access-control-allow-origin: *\r\n'))
    connection.sendall(str.encode("Content-Type: text/html\n\n"))
    jsonFile = '{"temperature":{"solar":25,"motor1":30,"motor2":35,"battery":30,"esc1":32,"esc2":37},"power":{"motor1":2200,"motor2":3200,"solar":950},"speed":45,"battery":75}'
    connection.sendall(str.encode(jsonFile))
    connection.close()

