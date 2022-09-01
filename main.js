song="";
rightWristX="";
leftWristX="";
rightWristY="";
leftWristY="";
scoreLeftWrist="";
scoreRightWrist="";
function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotResults)
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        Ynumber =  Number(leftWristY);
        finalYvalue = floor(Ynumber);
        volume= finalYvalue/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "volume ="+volume;
    }

  if(scoreRightWrist > 0.2)
  {

    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5); 
    }

   else if(rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1); 
    }

    else if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5); 
    }

    else if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2); 
    }

    else if(rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5); 
    }
}
}

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("model is loaded");
}

function gotResults(results)
{
if(results.length > 0)
{
    console.log(results);
    scoreRightWrist=results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;

console.log("left wrist x = " + leftWristX + "left wrist y = " + leftWristY);


rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;

console.log("right wrist x = " + rightWristX + "right wrist y = " + rightWristY);
console.log("scoreLeftWrist = " + scoreLeftWrist);
console.log("scoreRightWrist = " + scoreRightWrist);
}
}