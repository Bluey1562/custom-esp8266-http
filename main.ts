/**
 * ESP8266 HTTP Library + WiFi
 */

//% color="#AA278D" weight=100 icon="\uf1eb"
namespace esp8266http {

    let tx = SerialPin.P15
    let rx = SerialPin.P16
    let baud = BaudRate.BaudRate115200

    //% blockId=esp_init
    //% block="ESP8266 init TX %txPin RX %rxPin baud %baudRate"
    export function init(txPin: SerialPin, rxPin: SerialPin, baudRate: BaudRate) {
        serial.redirect(txPin, rxPin, baudRate)
        basic.pause(2000)
    }

    //% blockId=esp_send_at
    //% block="ESP8266 send AT %cmd wait %ms ms"
    export function sendAT(cmd: string, ms: number) {
        serial.writeString(cmd + "\r\n")
        basic.pause(ms)
    }

    //% blockId=esp_connect_wifi
    //% block="ESP8266 connect WiFi SSID %ssid PASSWORD %pwd"
    export function connectWiFi(ssid: string, pwd: string) {
        sendAT("AT", 1000)
        sendAT("AT+CWMODE=1", 1000)
        sendAT("AT+CWJAP=\"" + ssid + "\",\"" + pwd + "\"", 7000)
    }

    //% blockId=esp_check_wifi
    //% block="ESP8266 check WiFi connection"
    export function checkWiFi() {
        sendAT("AT+CWJAP?", 2000)
    }

    //% blockId=esp_http_get
    //% block="ESP8266 HTTP GET host %host path %path"
    export function httpGet(host: string, path: string) {

        sendAT("AT+CIPMUX=0", 1000)
        sendAT("AT+CIPSTART=\"TCP\",\"" + host + "\",80", 2000)

        let req =
            "GET " + path + " HTTP/1.1\r\n" +
            "Host: " + host + "\r\n" +
            "Connection: close\r\n\r\n"

        sendAT("AT+CIPSEND=" + req.length, 1000)
        sendAT(req, 3000)
    }
}
