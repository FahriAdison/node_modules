"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrerecordedTranscriptionResponse = void 0;
var helpers_1 = require("../helpers");
var PrerecordedTranscriptionResponse = /** @class */ (function () {
    function PrerecordedTranscriptionResponse() {
    }
    /**
     * Converts the transcription to the WebVTT format
     * @remarks In order to translate the transcription to WebVTT, the utterances
     * feature must be used.
     * @returns A string with the transcription in the WebVTT format
     */
    PrerecordedTranscriptionResponse.prototype.toWebVTT = function () {
        var _a, _b, _c, _d;
        if (!this.results || !this.results.utterances) {
            throw new Error("This function requires a transcript that was generated with the utterances feature.");
        }
        var webVTT = "WEBVTT\n\n";
        webVTT += "NOTE\nTranscription provided by Deepgram\nRequest Id: ".concat((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.request_id, "\nCreated: ").concat((_b = this.metadata) === null || _b === void 0 ? void 0 : _b.created, "\nDuration: ").concat((_c = this.metadata) === null || _c === void 0 ? void 0 : _c.duration, "\nChannels: ").concat((_d = this.metadata) === null || _d === void 0 ? void 0 : _d.channels, "\n\n");
        for (var i = 0; i < this.results.utterances.length; i++) {
            var utterance = this.results.utterances[i];
            var start = (0, helpers_1.secondsToTimestamp)(utterance.start);
            var end = (0, helpers_1.secondsToTimestamp)(utterance.end);
            webVTT += "".concat(i + 1, "\n").concat(start, " --> ").concat(end, "\n- ").concat(utterance.transcript, "\n\n");
        }
        return webVTT;
    };
    /**
     * Converts the transcription to the SRT format
     * @remarks In order to translate the transcription to SRT, the utterances
     * feature must be used.
     * @returns A string with the transcription in the SRT format
     */
    PrerecordedTranscriptionResponse.prototype.toSRT = function () {
        if (!this.results || !this.results.utterances) {
            throw new Error("This function requires a transcript that was generated with the utterances feature.");
        }
        var srt = "";
        for (var i = 0; i < this.results.utterances.length; i++) {
            var utterance = this.results.utterances[i];
            var start = (0, helpers_1.secondsToTimestamp)(utterance.start).replace(".", ",");
            var end = (0, helpers_1.secondsToTimestamp)(utterance.end).replace(".", ",");
            srt += "".concat(i + 1, "\n").concat(start, " --> ").concat(end, "\n").concat(utterance.transcript, "\n\n");
        }
        return srt;
    };
    return PrerecordedTranscriptionResponse;
}());
exports.PrerecordedTranscriptionResponse = PrerecordedTranscriptionResponse;
//# sourceMappingURL=prerecordedTranscriptionResponse.js.map