function Pad(e, k, ak) {
    var element = e;
    var primaryKey = k;
    var alterKey = ak;
    var soundRef;

    var self = this;

    if(element != null && primaryKey != null) {
        var prevEvent = window.onkeypress;

        if (window.onkeypress == null) {
            window.onkeypress = function(e) {
                if (e.keyCode == primaryKey || e.keyCode == alterKey) {
                    self.restartSoundReference();
                    self.playSoundReference();
                }
            };
        } else {
            window.onkeypress = function(e) {
                prevEvent(e);
                if (e.keyCode == primaryKey || e.keyCode == alterKey) {
                    self.restartSoundReference();
                    self.playSoundReference();
                }
            };
        }

        element.onclick = function() {
            self.restartSoundReference();
            self.playSoundReference();
        }
    } else {
        throw new Error("Called bind() before setting data.");
    }

    this.getElement = function() {
        return element;
    }

    this.getSoundReference = function() {
        return soundRef;
    }

    this.setSoundReference = function(s) {
        soundRef = s;
    }
};

Pad.prototype.setSoundReference = function(s) {
    this.setSoundReference(s);
}

Pad.prototype.playSoundReference = function() {
    var sound = this.getSoundReference();

    if(sound) {
        sound.play();
    }
}

Pad.prototype.restartSoundReference = function() {
    var element = this.getElement();
    var sound = this.getSoundReference();

    if(sound) {
        sound.restartTrigger();
    }

    element.style.webkitAnimationName = "none";

    setTimeout(function() {
        element.style.webkitAnimationName = '';
    }, 1);
};

Pad.prototype.setAnimationTime = function(t) {
    var element = this.getElement();

    element.style.webkitAnimationDuration = t + "s";
};

Pad.prototype.toString = function() {
    return "Pad"
};
