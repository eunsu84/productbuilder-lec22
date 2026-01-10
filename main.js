// Teachable Machine model URL from the user
const URL = "https://teachablemachine.withgoogle.com/models/wrgclmFFL/";

let model, webcam, labelContainer, maxPredictions;

// Fortune/reading data for each class
const fortuneData = {
    "강아지상": {
        title: "천진난만 강아지상",
        description: "사람을 좋아하고 다정다감한 당신! 주변에 항상 사람들이 넘쳐나는 인싸중에 인싸군요. 가끔은 거절을 잘 못해서 손해를 보기도 하지만, 특유의 긍정적인 성격으로 잘 이겨낼 거예요."
    },
    "고양이상": {
        title: "매력만점 고양이상",
        description: "도도하고 시크해 보이지만, 알고 보면 따뜻한 마음을 가진 츤데레군요! 신비로운 분위기를 풍겨 이성에게 인기가 많고, 한번 마음을 연 상대에게는 깊은 신뢰를 보여주는 의리파입니다."
    },
-   "토끼상": {
-       title: "귀염뽀짝 토끼상",
-       description: "상상력이 풍부하고 감수성이 예민한 당신은 예술적인 재능이 뛰어나군요. 겁이 많고 눈물이 많아 여리게 보이지만, 사실은 외유내강형으로 중요한 순간에 강한 모습을 보여줍니다."
-   },
-   "공룡상": {
-       title: "카리스마 공룡상",
-       description: "강한 리더십과 카리스마로 그룹을 이끄는 것을 즐기는 당신! 시원시원한 성격과 남다른 유머감각으로 인기가 많습니다. 목표를 향해 달려가는 추진력 또한 뛰어납니다."
-   }
+    "토끼상": {
+        title: "귀염뽀짝 토끼상",
+        description: "상상력이 풍부하고 감수성이 예민한 당신은 예술적인 재능이 뛰어나군요. 겁이 많고 눈물이 많아 여리게 보이지만, 사실은 외유내강형으로 중요한 순간에 강한 모습을 보여줍니다."
+    },
+    "공룡상": {
+        title: "카리스마 공룡상",
+        description: "강한 리더십과 카리스마로 그룹을 이끄는 것을 즐기는 당신! 시원시원한 성격과 남다른 유머감각으로 인기가 많습니다. 목표를 향해 달려가는 추진력 또한 뛰어납니다."
+    }
};


// Load the model and setup the webcam
async function init() {
    const startButton = document.getElementById('startButton');
    startButton.style.display = 'none'; // Hide the start button

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // setup webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    let highestProb = 0;
    let bestClass = "";

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = prediction[i].probability.toFixed(2);
        
        let fortuneInfo = fortuneData[classPrediction];
        if (!fortuneInfo) {
            fortuneInfo = { title: classPrediction, description: "아직 데이터가 없는 관상이네요! 새로운 관상을 찾아보세요." };
        }

        if (probability > highestProb) {
            highestProb = probability;
            bestClass = classPrediction;
        }
        
        const predictionText = `${fortuneInfo.title}: ${Math.round(probability * 100)}%`;
        labelContainer.childNodes[i].innerHTML = predictionText;
    }
    
    // Display the detailed description for the best match
    const bestFortune = fortuneData[bestClass] || { description: "결과를 기다리고 있습니다..." };
    const descriptionEl = document.querySelector('p'); // Reuse the existing p-tag
    if (descriptionEl) {
        descriptionEl.innerHTML = `<strong>가장 닮은 관상은?</strong><br>${bestFortune.description}`;
    }
}

// Add event listener to the start button
document.getElementById('startButton').addEventListener('click', init);
