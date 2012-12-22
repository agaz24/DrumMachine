/*
 * Key Mapping Class
 */

var PadMap = function(element, keyCode, alternateKeyCode) {
    this.element          = element;
    this.keyCode          = keyCode;
    this.alternateKeyCode = alternateKeyCode;

    this.bind();
};

PadMap.prototype.bind = function() {
    var self = this;

    if(this.element != null && this.keyCode != null) {
        var prevEvent = window.onkeypress;

        if (window.onkeypress == null) {
            window.onkeypress = function(e) {
                if (e.keyCode == self.keyCode || e.keyCode == self.alternateKeyCode) {
                    self.clearAnimation();
                }
            };
        } else {
            window.onkeypress = function(e) {
                prevEvent(e);
                if (e.keyCode == self.keyCode || e.keyCode == self.alternateKeyCode) {
                    self.clearAnimation();
                }
            };
        }

        this.element.onclick = function() {
            self.clearAnimation();
        }
    } else {
        console.log("Called bind() before setting data.");
    }
};

PadMap.prototype.clearAnimation = function() {
    var self = this;

    this.element.style.webkitAnimation = 'none';

    setTimeout(function() {
        self.element.style.webkitAnimation = '';
    }, 1);
};

PadMap.prototype.toString = function() {
    return 'PadMapping';
};


/*
 * Init function
 */

window.onload = function() {
    new PadMap(document.getElementById("pad-1"), 113, 81);
    new PadMap(document.getElementById("pad-2"), 119, 87);
    new PadMap(document.getElementById("pad-3"), 101, 69);
    new PadMap(document.getElementById("pad-4"), 97, 65);
    new PadMap(document.getElementById("pad-5"), 115, 83);
    new PadMap(document.getElementById("pad-6"), 100, 68);
    new PadMap(document.getElementById("pad-7"), 122, 90);
    new PadMap(document.getElementById("pad-8"), 120, 88);
    new PadMap(document.getElementById("pad-9"), 99, 67);
};


/*function handleFiles() {
 var file = document.getElementById('file').files;
 var file = file[0];

 var reader = new FileReader();

 reader.onload = function(e) {
 playExample(reader.result);
 }

 reader.readAsBinaryString(file);
 }

 function playExample(file) {
 var AudioletApp = function(file) {
 this.audiolet = new Audiolet();
 this.audiolet.scheduler.setTempo(125);

 this.file = new AudioletBuffer(1, 0);

 decoder = new WAVDecoder();
 decoded = decoder.decode(file);

 this.file.length           = decoded.length;
 this.file.numberofChanels  = decoded.channels.length;
 this.file.unslicedChannels = decoded.channels;
 this.file.channels         = decoded.channels;

 // Create buffer player
 this.player = new BufferPlayer(this.audiolet, this.file, 1, 0, 1);
 // Create trigger to force breakbeat cuts
 this.restartTrigger = new TriggerControl(this.audiolet);

 // Connect it all up
 this.restartTrigger.connect(this.player, 0, 1);
 this.player.connect(this.audiolet.output);

 // Work through the four bars in order
 var barStartPosition = new PSequence([0, 0, 0, 0,
 1, 1, 1, 1,
 2, 2, 2, 2,
 3, 3, 3, 3],
 Infinity);
 // Rearrange the individual beats within a bar
 var positionInBar = new PChoose([new PSequence([0, 1, 2, 3]),
 new PSequence([0, 0, 0, 0]),
 new PSequence([0, 0, 2, 2]),
 new PSequence([0, 3, 2, 1])],
 Infinity);

 this.audiolet.scheduler.play([barStartPosition, positionInBar], 1,
 function(barStartPosition, positionInBar) {
 // Scale position 0->1
 var position = barStartPosition / 4 + positionInBar / 16;
 // Scale position 0->length
 position *= this.file.length;
 this.player.startPosition.setValue(position);
 this.restartTrigger.trigger.setValue(1);
 }.bind(this)
 );
 }

 this.audioletApp = new AudioletApp(file);
 }*/
