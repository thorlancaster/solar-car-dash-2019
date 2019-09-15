import requests
import socket

host = "127.0.0.1"
port = 8080

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((host, port))
    s.sendall(str.encode("Hello World!"))
    msg = s.recv(1024)
    print('Received:', msg.decode("utf-8"))
