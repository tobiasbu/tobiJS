
export default function RemoveAudioBuffer(webAudioSource) {

    if (webAudioSource.buffer) {
        webAudioSource.buffer.stop();
        webAudioSource.buffer.disconnect();
        webAudioSource.buffer = null;
    }

    webAudioSource.playTime = 0;
    webAudioSource.startTime = 0;
}