status = "";
o = [];

function preload() {
    loadimage = loadImage("d.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    od1 = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("hall_status").innerHTML = "Status: Detecting Objects";
}

function modelloaded() {
    console.log("Model Has Loaded");
    status = true;
    od1.detect(loadimage, gotresults);
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        o = results;
    }
}

function draw() {
    image(loadimage, 0, 0, 640, 420);
    if (status != "") {
        for (index = 0; index < o.length; index++) {
            document.getElementById("hall_status").innerHTML = "Objects Detected";
            fill("red");
            percent = floor(o[index].confidence * 100);
            text(o[index].label + " " + percent + "%", o[index].x + 15, o[index].y + 15);
            noFill();
            stroke("red");
            rect(o[index].x, o[index].y, o[index].width, o[index].height);
        }
    }
}