video = "";
Status = "";
object = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide()

}

function setup() {
    canvas = createCanvas(480, 350);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 350);
    if (Status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("s1").innerHTML = "STATUS: OBJECTS DETECTED";
            document.getElementById("n1").innerHTML = "NUMBER OF OBJECTS: " + object.length;
            fill("#00ff00");
            percent = floor(object[i].confidence * 100);
            text(object[i], label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#00ff00");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", Modelloaded);
    document.getElementById("s1").innerHTML = "DETECTING OBJECT";
}

function Modelloaded() {
    console.log("modelloaded successfully");
    video.loop();
    video.speed(1);
    video.volume(0);
    Status = true;

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}