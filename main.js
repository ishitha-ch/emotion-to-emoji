prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    image_quality: 90
});

camera=document.getElementById('camera');
Webcam.attach("#camera");

function takesnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

          });
}
console.log("ml5.version", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/u98qC3e8b/model.json", modelLoaded);
function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    var synth=window.speechSynthesis;
    speakdata1="The first prediction is"+prediction1;
    speakdata2="The second prediction is"+prediction2;
    var utterThis= new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);
    console.log("spoken");
}

function check() {
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[0].label;
        speak();
        if(results[0].label=="Surprised") {
            document.getElementById('update_emoji').innerHTML= "&#128558;";
        }
        if(results[0].label=="Happy") {
            document.getElementById('update_emoji').innerHTML="&#128512;";
        }
        if(results[0].label=="Sad") {
            document.getElementById('update_emoji').innerHTML="&#128532;";
        }
        if(results[0].label=="Angry") {
            document.getElementById('update_emoji').innerHTML="&#128544;";
        }
        if(results[1].label=="Surprised") {
            document.getElementById("update_emoji2").innerHTML="&#128558;";
        }
        if(results[1].label=="Happy") {
            document.getElementById('update_emoji2').innerHTML="&#128512;";
        }
        if(results[1].label=="Sad") {
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="Angry") {
            document.getElementById("update_emoji2").innerHTML="&#128544;";
        }

    }
}
