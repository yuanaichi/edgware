import { randomNum } from './util'
import EventEmitter from 'eventemitter3';

export default class WebSocketClient
{
    constructor(wss) {
      this._wss = wss;
      this.isFirstConnection = true;
      this.websocket = null;
      this.websocketTimeout = null;
      this.connectCount = 0;
      this.maxConnectCount = 10;

      this._eventemitter = new EventEmitter();

      this.connect();
    }

    connect() {
      if ('WebSocket' in window) {
        let hostIndex = 0;
        if (!this.isFirstConnection) {
          hostIndex = randomNum(1, 4);
        } else {
          this.isFirstConnection = false;
        }
        const host = this._wss[hostIndex];
        console.log("connect websocket host:", hostIndex, host);
        this.websocket = new WebSocket(host);
        this.wsInit();
      } else {
        alert('当前浏览器 Not support websocket')
      }
    }

    on(type, handler) {
      this._eventemitter.on(type, handler);
      return this;
    }

    once(type, handler) {
      this._eventemitter.once(type, handler);
      return this;
    }

    emit(type, ...args) {
      this._eventemitter.emit(type, ...args);
    }

    wsInit() {
      this.websocket.onerror = () => {
        console.log("WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState + "， 尝试重连");
        this.reConnect();
      };

      // //连接成功
      this.websocket.onopen = () => {
        console.log("WebSocket连接成功" + '   状态码：' + this.websocket.readyState);
        this.emit('open');
      };

      this.websocket.onmessage = (event) => {
        var data = JSON.parse(event.data);
        this.emit('data', data);
      }

      //连接关闭的回调
      this.websocket.onclose = () => {
        console.log("WebSocket连接关闭" + '   状态码：' + this.websocket.readyState);
        this.reConnect();
      }
    }

    reConnect () {
      this.connectCount = this.connectCount + 1;
      console.log("reconnection...【" + this.connectCount + "】");
      //1与服务器已经建立连接
      if (this.connectCount >= this.maxConnectCount || this.websocket.readyState == 1) {
          clearTimeout(this.websocketTimeout);
      } else {
          //2已经关闭了与服务器的连接
          if (this.websocket.readyState == 3) {
            this.connect();
          }

          //0正尝试与服务器建立连接,2正在关闭与服务器的连接
          this.websocketTimeout = setTimeout(() => this.reConnect(), 1000);
      }
    }

    sendMsg(msg) {
      if (this.websocket.readyState == 1) {
        this.websocket.send(msg);
      }
    }

    closeWebSocket() {
      if (this.websocket) {
        this.websocket.close()
      }
    }
}
