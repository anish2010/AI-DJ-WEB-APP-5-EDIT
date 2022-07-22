song= "";
song2= "";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
leftWrist_score= 0;
rightWrist_score= 0;
song_imran_khan= "";
song_passori= "";

function setup(){
    canvas= createCanvas(600,500);
    canvas.position(500,200);

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is Intialized");
}
function draw(){
    image(video, 0,0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    song_imran_khan= song.isPlaying();
    console.log("Song I am the rider = "+song_imran_khan);

    song_passori= song2.isPlaying();
    console.log("Song Pasoori"+song_passori);
    if(leftWrist_score > 0.2){
         circle(leftWristX,leftWristY,20);
         song2.stop();
         if(song_imran_khan == false){
            song.play();
         }
         else{
            document.getElementById("song_id").innerHTML= "Song Name: I am Rider ";
         }


           }
     if(rightWrist_score > 0.2){
        circle(rightWristX,rightWristY,20);
        song.stop();
        if(song_passori == false){
            song2.play();
         }
         else{
        document.getElementById("song_id").innerHTML= "Song Name: Pasoori ";
         }
        }
}

function preload(){
    song= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}
function play(){
    song.play();
    song2.play();
}
function gotPoses(results){
    if(results.length>0){
       console.log(results);
       leftWristX= results[0].pose.leftWrist.x;
       leftWristY= results[0].pose.leftWrist.y;
       console.log("LeftWristX = "+ leftWristX + "leftWristY = " + leftWristY);
   
       rightWristX= results[0].pose.rightWrist.x;
       rightWristY= results[0].pose.rightWrist.y;
       console.log("RightWristX = " + rightWristX + "RightWristY = " + rightWristY );

       leftWrist_score= results[0].pose.keypoints[9].score;
       console.log("Score = "+ leftWrist_score);
       
       rightWrist_score= results[0].pose.keypoints[10].score;
       console.log("Score = "+ rightWrist_score);
   
    }
   }