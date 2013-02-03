var padsConfig = {
    1: {
        primaryKey: 113,
        alterKey: 81
    },
    2: {
        primaryKey: 119,
        alterKey: 87
    },
    3: {
        primaryKey: 101,
        alterKey: 69
    },
    4: {
        primaryKey: 97,
        alterKey: 65
    },
    5: {
        primaryKey: 115,
        alterKey: 83
    },
    6: {
        primaryKey: 100,
        alterKey: 68
    },
    7: {
        primaryKey: 122,
        alterKey: 90
    },
    8: {
        primaryKey: 120,
        alterKey: 88
    },
    9: {
        primaryKey: 99,
        alterKey: 67
    }
}

function AppController() {
    var instance = this;
    var ctx = new AppContext();

    ctx.init();

    this.getCtx = function() {
        return ctx;
    }

    AppController = function() {
        return instance;
    }
}

AppController.prototype.init = function() {
    var ctx = this.getCtx();
    var padsCollection = ctx.get("PadsCollection");

    var self = this;

    for(var i in padsConfig) {
        padsCollection.add(
            new Pad(Utils.getById("pad-" + i), padsConfig[i].primaryKey, padsConfig[i].alterKey), i
        );
        padEdit = Utils.getById("pad-" + i + "-edit");
        padEdit.onclick = function() {
            self.editPad(this.rel);
            return false;
        }
    }
}

AppController.prototype.editPad = function(i) {
    var ctx = this.getCtx();
    var soundsCollection = ctx.get("SoundsCollection");

    if(soundsCollection.get(i)) {
        this.loadSoundForm(i);
    } else {
        this.loadEmptySoundForm(i);
    }
}

AppController.prototype.loadSoundForm = function(i) {
    var ctx = this.getCtx();
    var soundsCollection = ctx.get("SoundsCollection");

    var sound = soundsCollection.get(i);

    Utils.hide(Utils.getById("empty-sound-form"));
    Utils.show(Utils.getById("sound-form"));
}

AppController.prototype.loadEmptySoundForm = function(i) {
    var self = this;
    var fileInput = Utils.getById("load-sound-input");

    fileInput.value = null;
    fileInput.onchange = function() {
        var file = this.files[0];

        var reader = new FileReader();

        reader.onload = function() {
            self.loadSound(reader.result, i);
        }

        reader.readAsBinaryString(file, i);
    }

    Utils.hide(Utils.getById("sound-form"));
    Utils.show(Utils.getById("empty-sound-form"));
}

AppController.prototype.loadSound = function(file, i) {
    var ctx = this.getCtx();
    var soundsCollection = ctx.get("SoundsCollection");
    var sound = new Sound(file, ctx);

    soundsCollection.add(sound, i);
    this.connectSoundToPad(sound, i)
    this.loadSoundForm(i);
}

AppController.prototype.connectSoundToPad = function(s, i) {
    var ctx = this.getCtx();
    var padsCollection = ctx.get("PadsCollection");
    var pad = padsCollection.get(i);
    var sound = s;

    pad.setSoundReference(sound);
    pad.setAnimationTime(sound.getRealLength());
}