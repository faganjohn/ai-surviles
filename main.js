video="";
status="";
object=[];
function preload(){
   video=createVideo('video.mp4');

}


function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video.hide()
}

function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video,gotResult);
    }
}

function start(){
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Dectecting Objecting";
}


function modelLoaded(){
    console.log("model is loaded");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}


function gotResult(error,results){
    if(error){
        console.log(error);

    }
    console.log(results);
    object=results;
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="status : object detected "
        document.getElementById("number_of_object").innerHTML="number of object detected are "+object.length;

        fill("#FF0000");
        percent = floor(object[i].cofidence*100);
        text(object[i].label+""+percent+"%",object[i].x +15,object.y+15);
        noFill();
        stroke("#FF0000");
        rect(object[i].x,object[i].y,object[i].width,object[i].length);
    }
}
