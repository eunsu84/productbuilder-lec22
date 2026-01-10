document.addEventListener('DOMContentLoaded', () => {
    const recommendButton = document.getElementById('recommendButton');
    const menuDisplay = document.getElementById('menuDisplay');

    const dinnerMenus = [
        '김치찌개',
        '된장찌개',
        '삼겹살',
        '치킨',
        '피자',
        '파스타',
        '초밥',
        '짜장면',
        '닭갈비',
        '족발',
        '보쌈',
        '갈비찜',
        '스테이크',
        '샐러드',
        '떡볶이'
    ];

    recommendButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
        menuDisplay.textContent = dinnerMenus[randomIndex];
    });
});