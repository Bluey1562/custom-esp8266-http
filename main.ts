/**
 * ESP8266 HTTP Library + WiFi
 */

//% color="#AA278D" weight=100 icon="\uf1eb"
namespace esp8266http {

    let tx = SerialPin.P15
    let rx = SerialPin.P16
    let baud = BaudRate.BaudRate115200

    //% block="ESP8266 init TX %txPin RX %rxPin baud %baudRate"
    export function init(txPin: SerialPin, rxPin: SerialPin, baudRate: BaudRate) {
        tx = txPin
        rx = rxPin
        baud = baudRate
        serial.redirect(tx, rx, baud)
        basic.pause(2000)
    }

    //% block="ESP8266 send AT %cmd wait %ms ms"
    export function sendAT(cmd: string, ms: number) {
        serial.writeString(cmd + "\r\n")
        basic.pause(ms)
    }

        export function connectWiFi(ssid: string, pwd: string) {

        sendAT("AT+CWMODE=1", 1000)
        sendAT(
            "AT+CWJAP=\"" + ssid + "\",\"" + pwd + "\"",
            6000
        )
    }

    //% block="ESP8266 HTTP GET host %host path %path"
    export function httpGet(host: string, path: string) {

        sendAT("AT+CIPSTART=\"TCP\",\"" + host + "\",80", 2000)

        let req =
            "GET " + path + " HTTP/1.1\r\n" +
            "Host: " + host + "\r\n" +
            "Connection: close\r\n\r\n"

        sendAT("AT+CIPSEND=" + req.length, 1000)
        sendAT(req, 3000)
    }
}

