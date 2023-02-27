class socketInfo{
    public port: number; // number variable
    public addr: string;// string variable
  
    constructor() {
      // public, protected, private 접근 제한자 모두 클래스 내부에서 참조 가능하다.
      this.port = 20000; // number variable
      this.addr = "192.168.0.47";// string variable
    }
}

export default socketInfo;