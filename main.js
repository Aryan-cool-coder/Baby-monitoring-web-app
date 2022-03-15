song = "";
objects = [];
var status = "";
function preload() {
    song = loadSound("alert.mp3");
}

function setup() {
    canvas = createCanvas(555, 320);
    canvas.position(685, 230);

    video = createCapture(VIDEO);
    video.hide();
    
     objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 555, 320);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById("numberOfObjects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else {
                document.getElementById("numberOfObjects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }
        }
    }
}



function modelLoaded() {
    console.log("model is loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}