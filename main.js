document.addEventListener('DOMContentLoaded', () => {
    const recommendButton = document.getElementById('recommendButton');
    const menuDisplay = document.getElementById('menuDisplay');

    const dinnerMenus = [
        'Kimchi Stew',
        'Doenjang Jjigae',
        'Samgyeopsal (Pork Belly)',
        'Chicken',
        'Pizza',
        'Pasta',
        'Sushi',
        'Jajangmyeon',
        'Dakgalbi (Spicy Stir-fried Chicken)',
        'Jokbal (Pig\'s Trotters)',
        'Bossam (Boiled Pork Wrap)',
        'Galbijjim (Braised Short Ribs)',
        'Steak',
        'Salad',
        'Tteokbokki'
    ];

    recommendButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
        menuDisplay.textContent = dinnerMenus[randomIndex];
    });
});