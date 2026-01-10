document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('ladderCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const playerInputs = document.querySelectorAll('#player-inputs input');
    const resultInputs = document.querySelectorAll('#result-inputs input');
    const finalResultsDiv = document.getElementById('final-results');

    const PLAYER_COUNT = 4;
    const LADDER_HEIGHT = canvas.height;
    const LADDER_WIDTH = canvas.width;
    const LINE_SPACING = LADDER_WIDTH / (PLAYER_COUNT);
    const RUNG_COUNT = 8;
    const LINE_COLOR = '#333';
    const RUNG_COLOR = '#555';
    const PATH_COLORS = ['#E74C3C', '#3498DB', '#2ECC71', '#9B59B6'];

    let rungs = [];
    let results = [];

    function drawLadder() {
        ctx.clearRect(0, 0, LADDER_WIDTH, LADDER_HEIGHT);
        ctx.lineWidth = 4;
        ctx.strokeStyle = LINE_COLOR;

        // Draw vertical lines
        for (let i = 0; i < PLAYER_COUNT; i++) {
            const x = LINE_SPACING / 2 + i * LINE_SPACING;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, LADDER_HEIGHT);
            ctx.stroke();
        }

        // Draw rungs
        ctx.lineWidth = 3;
        ctx.strokeStyle = RUNG_COLOR;
        rungs.forEach(rung => {
            const y = rung.y;
            const startX = LINE_SPACING / 2 + rung.left * LINE_SPACING;
            const endX = LINE_SPACING / 2 + (rung.left + 1) * LINE_SPACING;
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
        });
    }

    function generateRungs() {
        rungs = [];
        let availableRungSlots = [];
        for (let i = 0; i < RUNG_COUNT + 2; i++) {
            availableRungSlots[i] = [0, 1, 2];
        }

        for (let i = 0; i < RUNG_COUNT; i++) {
            const yStep = Math.floor(Math.random() * (RUNG_COUNT + 1)) + 1;
            const y = (LADDER_HEIGHT / (RUNG_COUNT + 2)) * yStep;
            
            const availableSlots = availableRungSlots[yStep];
            if(availableSlots.length === 0) {
                i--;
                continue;
            }
            
            const leftIndex = Math.floor(Math.random() * availableSlots.length);
            const left = availableSlots[leftIndex];

            rungs.push({ y, left });

            availableSlots.splice(leftIndex, 1);
            if(left > 0) {
                const index = availableSlots.indexOf(left - 1);
                if (index > -1) availableSlots.splice(index, 1);
            }
             if(left < 2) {
                const index = availableSlots.indexOf(left + 1);
                if (index > -1) availableSlots.splice(index, 1);
            }
        }
        
        // Calculate results
        results = Array.from({length: PLAYER_COUNT}, (_, i) => i);
        for(let i = 0; i < PLAYER_COUNT; i++){
            let currentPath = i;
            rungs.sort((a,b) => a.y - b.y).forEach(rung => {
                if (rung.left === currentPath) {
                    currentPath++;
                } else if (rung.left + 1 === currentPath) {
                    currentPath--;
                }
            });
            results[i] = currentPath;
        }
    }

    function traceAndAnimate() {
        startButton.disabled = true;
        finalResultsDiv.innerHTML = '';
        drawLadder();
        
        let completedPlayers = 0;

        for (let i = 0; i < PLAYER_COUNT; i++) {
            let currentX = LINE_SPACING / 2 + i * LINE_SPACING;
            let currentY = 0;
            let playerPath = i;
            
            ctx.strokeStyle = PATH_COLORS[i % PATH_COLORS.length];
            ctx.lineWidth = 5;

            const sortedRungs = rungs.filter(r => r.left === playerPath || r.left + 1 === playerPath).sort((a, b) => a.y - b.y);

            function animate() {
                if (currentY >= LADDER_HEIGHT) {
                    completedPlayers++;
                    if (completedPlayers === PLAYER_COUNT) {
                        displayResults();
                    }
                    return;
                }
                
                let nextRung = rungs.find(r => (r.left === playerPath || r.left + 1 === playerPath) && r.y > currentY);

                let targetY = nextRung ? nextRung.y : LADDER_HEIGHT;

                ctx.beginPath();
                ctx.moveTo(currentX, currentY);
                ctx.lineTo(currentX, targetY);
                ctx.stroke();
                currentY = targetY;

                if (nextRung) {
                    let newPlayerPath = playerPath;
                    let targetX;
                    if (nextRung.left === playerPath) {
                        newPlayerPath++;
                    } else {
                        newPlayerPath--;
                    }
                    targetX = LINE_SPACING / 2 + newPlayerPath * LINE_SPACING;
                    
                    ctx.beginPath();
                    ctx.moveTo(currentX, currentY);
                    ctx.lineTo(targetX, currentY);
                    ctx.stroke();
                    currentX = targetX;
                    playerPath = newPlayerPath;
                }
                requestAnimationFrame(animate);
            }
            setTimeout(animate, i * 200);
        }
    }

    function displayResults() {
        let resultHtml = '<h2>--- 최종 결과 ---</h2>';
        for (let i = 0; i < PLAYER_COUNT; i++) {
            const playerName = playerInputs[i].value || `참가자 ${i + 1}`;
            const resultIndex = results.indexOf(i);
            const resultName = resultInputs[resultIndex].value || `결과 ${resultIndex + 1}`;
            resultHtml += `<p>${playerName} ➞ ${resultName}</p>`;
        }
        finalResultsDiv.innerHTML = resultHtml;
        startButton.disabled = false;
    }

    function init() {
        generateRungs();
        drawLadder();
    }

    startButton.addEventListener('click', traceAndAnimate);
    
    init();
});
