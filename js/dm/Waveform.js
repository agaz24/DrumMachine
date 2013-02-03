function Waveform(s) {
    var sound = s;
    var width = 420;

    var k = sound.length / width;
    var slice = Array.prototype.slice;
    var sums = [];

    for (var i = 0; i < width; i++) {
        var sum = 0;
        for (var c = 0; c < sound.channels.length; c++) {
            var chan = sound.channels[c];
            var vals = slice.call(chan, i * k, (i + 1) * k);
            var peak = Math.max.apply(Math, vals.map(Math.abs));

            sum += peak / 2;
        }
        sums[i] = sum;
    }

    var canvas = document.getElementById('waveform');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    for (var i = 0; i < width; i++) {
        var peak = sums[i].toFixed(2);
        var heightUp = (50 - (50 * peak)).toFixed(0);
        var heightDown = (50 + (50 *peak)).toFixed(0);
        ctx.moveTo(i, 50);
        ctx.lineTo(i, heightDown);
        ctx.moveTo(i, 50);
        ctx.lineTo(i, heightUp);
    }
    ctx.stroke();
}
