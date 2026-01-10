// Teachable Machine model URL from the user
const URL = "https://teachablemachine.withgoogle.com/models/wrgclmFFL/";

let model, webcam, labelContainer, maxPredictions;
let isModelLoaded = false;

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
    "토끼상": {
        title: "귀염뽀짝 토끼상",
        description: "상상력이 풍부하고 감수성이 예민한 당신은 예술적인 재능이 뛰어나군요. 겁이 많고 눈물이 많아 여리게 보이지만, 사실은 외유내강형으로 중요한 순간에 강한 모습을 보여줍니다."
    },
    "공룡상": {
        title: "카리스마 공룡상",
        description: "강한 리더십과 카리스마로 그룹을 이끄는 것을 즐기는 당신! 시원시원한 성격과 남다른 유머감각으로 인기가 많습니다. 목표를 향해 달려가는 추진력 또한 뛰어납니다."
    }
};

async function loadModel() {
    if (isModelLoaded) return;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    isModelLoaded = true;
}

// Initialize webcam
async function initWebcam() {
    const controls = document.querySelector('.controls');
    const errorContainer = document.getElementById('cam-permission-error');
    const displayContainer = document.getElementById("display-container");

    // Hide error and show controls initially
    errorContainer.style.display = 'none';
    controls.style.display = 'flex';
    
    try {
        await loadModel();
        
        controls.style.display = 'none';
        displayContainer.style.display = 'flex';
        displayContainer.innerHTML = ''; // Clear previous content

        const flip = true;
        webcam = new tmImage.Webcam(400, 400, flip);
        await webcam.setup();
        await webcam.play();
        
        displayContainer.appendChild(webcam.canvas);

        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }

        window.requestAnimationFrame(loop);
    } catch (error) {
        console.error("Error setting up webcam:", error);
        controls.style.display = 'none';
        displayContainer.style.display = 'none';
        errorContainer.style.display = 'block';
    }
}

async function loop() {
    webcam.update();
    await predict(webcam.canvas);
    window.requestAnimationFrame(loop);
}

// Handle file upload
async function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    await loadModel();

    document.querySelector('.controls').style.display = 'none';

    const image = document.createElement('img');
    const reader = new FileReader();
    reader.onload = async (e) => {
        image.src = e.target.result;
        image.onload = async () => {
            const displayContainer = document.getElementById("display-container");
            displayContainer.innerHTML = '';
            displayContainer.appendChild(image);
            
            labelContainer = document.getElementById("label-container");
            labelContainer.innerHTML = '';
            for (let i = 0; i < maxPredictions; i++) {
                labelContainer.appendChild(document.createElement("div"));
            }

            await predict(image);
        }
    };
    reader.readAsDataURL(file);
}


// Predict function for both webcam and image
async function predict(inputElement) {
    const prediction = await model.predict(inputElement);
    let highestProb = 0;
    let bestClass = "";

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = prediction[i].probability;

        if (probability > highestProb) {
            highestProb = probability;
            bestClass = classPrediction;
        }
        
        let fortuneInfo = fortuneData[classPrediction] || { title: classPrediction, description: "아직 데이터가 없는 관상이네요! 새로운 관상을 찾아보세요." };
        const predictionText = `${fortuneInfo.title}: ${Math.round(probability * 100)}%`;
        if (labelContainer.childNodes[i]) {
            labelContainer.childNodes[i].innerHTML = predictionText;
        }
    }
    
    const bestFortune = fortuneData[bestClass] || { description: "결과를 기다리고 있습니다..." };
    const descriptionEl = document.querySelector('p');
    if (descriptionEl) {
        descriptionEl.innerHTML = `<strong>가장 닮은 관상은?</strong><br>${bestFortune.description}`;
    }
}

// Event Listeners
document.getElementById('webcamButton').addEventListener('click', initWebcam);
document.getElementById('uploadButton').addEventListener('click', () => document.getElementById('uploadInput').click());
document.getElementById('uploadInput').addEventListener('change', handleUpload);
document.getElementById('retryCamButton').addEventListener('click', initWebcam);