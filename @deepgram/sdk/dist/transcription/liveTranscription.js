"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveTranscription = void 0;
var events_1 = __importDefault(require("events"));
var querystring_1 = __importDefault(require("querystring"));
var ws_1 = __importDefault(require("ws"));
var enums_1 = require("../enums");
var userAgent_1 = require("../userAgent");
var LiveTranscription = /** @class */ (function (_super) {
    __extends(LiveTranscription, _super);
    function LiveTranscription(credentials, apiUrl, options) {
        var _this = _super.call(this, undefined) || this;
        _this._socket = new ws_1.default("wss://".concat(apiUrl, "/v1/listen?").concat(querystring_1.default.stringify(options)), {
            headers: {
                Authorization: "token ".concat(credentials),
                "User-Agent": (0, userAgent_1.userAgent)(),
            },
        });
        _this._bindSocketEvents();
        return _this;
    }
    LiveTranscription.prototype._bindSocketEvents = function () {
        var _this = this;
        this._socket.onopen = function () {
            _this.emit("open" /* Open */, _this);
        };
        this._socket.onclose = function (event) {
            _this.emit("close" /* Close */, event);
        };
        this._socket.onerror = function (event) {
            _this.emit("error" /* Error */, event);
        };
        this._socket.onmessage = function (m) {
            _this.emit("transcriptReceived" /* TranscriptReceived */, m.data);
        };
    };
    /**
     * Returns the ready state of the websocket connection
     */
    LiveTranscription.prototype.getReadyState = function () {
        return this._socket.readyState;
    };
    /**
     * Sends data to the Deepgram API via websocket connection
     * @param data Audio data to send to Deepgram
     */
    LiveTranscription.prototype.send = function (data) {
        if (this._socket.readyState === enums_1.ConnectionState.OPEN) {
            this._socket.send(data);
        }
        else {
            this.emit("error" /* Error */, "Could not send. Connection not open.");
        }
    };
    /**
     * Denote that you are finished sending audio and close
     * the websocket connection when transcription is finished
     */
    LiveTranscription.prototype.finish = function () {
        this._socket.send(new Uint8Array(0));
    };
    return LiveTranscription;
}(events_1.default));
exports.LiveTranscription = LiveTranscription;
//# sourceMappingURL=liveTranscription.js.map