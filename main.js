img="";
h3="";
objects=[];
function preload()
{
    img=loadImage('dog_cat.jpg');
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetection=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded()
{
    console.log("CocoSSD is loaded!");
    h3=true;

}
function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }else
    {
        console.log(results);
        objects=results;
    }
}
function draw()
{
    image(video,0,0,380,380);

    if(h3 != "")
    {
        objectDetection.detect(video, gotResults);
        r=random(255);
        g=random(255);
        b=random(255);
        for(var i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML="The number of objects detected are:"+objects.length;
            fill(r,g,b);
            percentage=floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+10,objects[i].y+20);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}