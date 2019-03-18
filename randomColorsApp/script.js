var numberOfRandomColors = 5;

function randomPalette() {
    var interval = 1 / numberOfRandomColors;
    var r, g, b;
    r = getRandomInt(0, 255);
    g = getRandomInt(0, 255);
    b = getRandomInt(0, 255);

    var hsl = rgbToHsl(r, g, b);
    var randomColors = [];

    for (var i = 0; i < numberOfRandomColors; i++) {
        hsl[0] = getNextHue(hsl[0], interval);
        var rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
        var hex = rgbToHex(rgb[0], rgb[1], rgb[2]).toUpperCase();
        randomColors.push(hex);
    }
    generateRules(randomColors);
}

function cleanPalette() {
    generateRules(
        [
            'white',
            'white',
            'white',
            'white',
            'white'
        ]
    );
}


function generateRules(randomColors) {
    var rules = [
        `.website-background{ color: ${randomColors[0]};}`,
        `.element-text{ color: ${randomColors[1]};}`,
        `.element-border{ border-color: ${randomColors[2]};}`,
        `.element-background{ background-color: ${randomColors[3]};}`,
        `.header{ color: ${randomColors[4]};}`
    ];
    for (var i = 0; i < numberOfRandomColors; i++) {
        $(`#color${i + 1}`).css('background-color', randomColors[i]);
    }
    $("textarea#css-rules").val(rules.join('\r\n\n'));
}

function getNextHue(h, distance) {
    h += distance;
    h = h <= 1 ? h : h - 1;
    return h;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function componentToHex(c) {
    c = parseInt(c);
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// init random palette
randomPalette();