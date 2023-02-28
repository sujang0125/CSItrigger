import socket

def main():
    # 접속 정보 설정
    SERVER_IP = '192.168.203.27'
    SERVER_PORT = 20000
    SIZE = 9999
    SERVER_ADDR = (SERVER_IP, SERVER_PORT)     

    # 소켓 객체를 생성합니다. 
    # 주소 체계(address family)로 IPv4, 소켓 타입으로 TCP 사용합니다.  
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # 포트 사용중이라 연결할 수 없다는 
    # WinError 10048 에러 해결를 위해 필요합니다. 
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    # bind 함수는 소켓을 특정 네트워크 인터페이스와 포트 번호에 연결하는데 사용됩니다.
    # HOST는 hostname, ip address, 빈 문자열 ""이 될 수 있습니다.
    # 빈 문자열이면 모든 네트워크 인터페이스로부터의 접속을 허용합니다. 
    # PORT는 1-65535 사이의 숫자를 사용할 수 있습니다.  
    server_socket.bind((SERVER_IP, SERVER_PORT))

    # 서버가 클라이언트의 접속을 허용하도록 합니다. 
    server_socket.listen()

    cnt = 2
    # 무한루프를 돌면서 
    while True:    
        client_socket, addr = server_socket.accept()
        print("connected by", addr)

        # 클라이언트가 보낸 메시지를 수신하기 위해 대기합니다. 
        data = client_socket.recv(SIZE)

        # 빈 문자열을 수신하면 루프를 중지합니다. 
        if not data:
            break

        # 수신받은 문자열을 출력합니다.
        print('Received from ', addr)
        print('Received data ',data.decode())

        # 받은 문자열을 다시 클라이언트로 전송해줍니다.(에코) 
        client_socket.sendall(bytes(str(cnt), 'utf-8'))

        # 소켓을 닫습니다.
        client_socket.close()
        cnt += 1
    server_socket.close()
    
if __name__=="__main__":
    main()