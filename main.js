const uploadPhotoButton = document.getElementById('upload-photo');
const analyzeButton = document.getElementById('analyze-button');
const resultContainer = document.getElementById('result-container');
const futurePhoto = document.getElementById('future-photo');
const futureDescription = document.getElementById('future-description');
const shareTwitterButton = document.getElementById('share-twitter');
const shareFacebookButton = document.getElementById('share-facebook');
const shareKakaoButton = document.getElementById('share-kakao');
const loadingSpinner = document.querySelector('.loading-spinner');

const futureScenarios = [
    {
        image: 'public/images/placeholder.svg',
        description: '파리의 카페에서 글을 쓰는 낭만파 작가',
    },
    {
        image: 'public/images/placeholder2.svg',
        description: '뉴욕 월스트리트를 주름잡는 냉철한 투자자',
    },
    {
        image: 'public/images/placeholder.svg',
        description: '실리콘밸리를 혁신하는 천재 개발자',
    },
    {
        image: 'public/images/placeholder2.svg',
        description: '아마존 정글을 탐험하는 용감한 탐험가',
    },
    {
        image: 'public/images/placeholder.svg',
        description: '세계 최고의 요리를 만드는 미슐랭 셰프',
    },
];

analyzeButton.addEventListener('click', () => {
    // Show loading spinner
    loadingSpinner.classList.remove('hidden');
    resultContainer.classList.add('hidden');

    // Simulate AI analysis
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * futureScenarios.length);
        const scenario = futureScenarios[randomIndex];

        // Hide loading spinner and display result
        loadingSpinner.classList.add('hidden');
        futurePhoto.src = scenario.image;
        futureDescription.textContent = scenario.description;
        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('fade-in');
    }, 2000);
});

shareTwitterButton.addEventListener('click', () => {
    alert('트위터 공유 기능은 현재 개발 중입니다.');
});

shareFacebookButton.addEventListener('click', () => {
    alert('페이스북 공유 기능은 현재 개발 중입니다.');
});

shareKakaoButton.addEventListener('click', () => {
    alert('카카오톡 공유 기능은 현재 개발 중입니다.');
});
