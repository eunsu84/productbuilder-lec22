document.addEventListener('DOMContentLoaded', () => {
    const recommendButton = document.getElementById('recommendButton');
    const menuDisplay = document.getElementById('menuDisplay');
    const menuImage = document.getElementById('menuImage');

    const dinnerMenus = [
        { name: 'Kimchi Stew', imageUrl: 'https://images.unsplash.com/photo-1594957421118-8f5f0b5d9c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Doenjang Jjigae', imageUrl: 'https://images.unsplash.com/photo-1620062495940-02c3b8f3a3d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Samgyeopsal (Pork Belly)', imageUrl: 'https://images.unsplash.com/photo-1595180633454-e0c6e8e8e8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Chicken', imageUrl: 'https://images.unsplash.com/photo-1626082928816-cd298f09d8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1513104882182-411a0e692268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Pasta', imageUrl: 'https://images.unsplash.com/photo-1621996384210-92a00c6d9d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1579584425332-ceb12b5a1b3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Jajangmyeon', imageUrl: 'https://img.freepik.com/free-photo/korean-black-bean-sauce-noodles-jajangmyeon_1339-166718.jpg?w=1380&t=st=1704987000~exp=1704987600~hmac=b6f5d8e7d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8' },
        { name: 'Dakgalbi (Spicy Stir-fried Chicken)', imageUrl: 'https://images.unsplash.com/photo-1628172605788-b3d1b3b3a3d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Jokbal (Pig\'s Trotters)', imageUrl: 'https://images.pexels.com/photos/7000858/pexels-photo-7000858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: 'Bossam (Boiled Pork Wrap)', imageUrl: 'https://images.pexels.com/photos/7000858/pexels-photo-7000858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: 'Galbijjim (Braised Short Ribs)', imageUrl: 'https://images.pexels.com/photos/7000858/pexels-photo-7000858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: 'Steak', imageUrl: 'https://images.unsplash.com/photo-1574672206089-6019a5b6f3b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Salad', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57962c07923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: 'Tteokbokki', imageUrl: 'https://images.unsplash.com/photo-1620062495940-02c3b8f3a3d2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max' }
    ];

    recommendButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
        const recommendedMenu = dinnerMenus[randomIndex];
        
        menuDisplay.textContent = recommendedMenu.name;
        menuImage.src = recommendedMenu.imageUrl;
        menuImage.style.display = 'block'; // Make the image visible
    });
});