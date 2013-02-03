function Sound(f, c) {
    var ctx = c;

    var decoder = ctx.get("WAVDecoder");
    var file = decoder.decode(f);

    var sound = new AudioletBuffer(file.channels.length, file.length);

    sound.unslicedChannels = file.channels;
    sound.channels = file.channels;

    var audiolet = ctx.get("Audiolet");
    var player = new BufferPlayer(audiolet, sound);

    player.playing = false;
    player.connect(audiolet.output);

    var realLength = 0.5;

    var waveform = new Waveform(sound);

    this.getSound = function() {
        return sound;
    }

    this.getAudiolet = function() {
        return audiolet;
    }

    this.getPlayer = function() {
        return player;
    }

    if(sound.length) {
        realLength = (sound.length / 44101).toFixed(2);
    }

    this.getRealLength = function() {
        return realLength;
    }
}

Sound.prototype.play = function() {
    var player = this.getPlayer();

    player.playing = true;
}

Sound.prototype.restartTrigger = function() {
    var player = this.getPlayer();

    player.position = 0;
}