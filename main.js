document.addEventListener('DOMContentLoaded', () => {
    const recommendButton = document.getElementById('recommendButton');
    const menuDisplay = document.getElementById('menuDisplay');
    const menuImage = document.getElementById('menuImage');

    const dinnerMenus = [
        { name: '김치찌개', imageUrl: 'https://images.unsplash.com/photo-1594957421118-8f5f0b5d9c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '된장찌개', imageUrl: 'https://images.unsplash.com/photo-1620062495940-02c3b8f3a3d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '삼겹살', imageUrl: 'https://images.unsplash.com/photo-1595180633454-e0c6e8e8e8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '치킨', imageUrl: 'https://images.unsplash.com/photo-1626082928816-cd298f09d8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '피자', imageUrl: 'https://images.unsplash.com/photo-1513104882182-411a0e692268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '파스타', imageUrl: 'https://images.unsplash.com/photo-1621996384210-92a00c6d9d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '초밥', imageUrl: 'https://images.unsplash.com/photo-1579584425332-ceb12b5a1b3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '짜장면', imageUrl: 'https://img.freepik.com/free-photo/korean-black-bean-sauce-noodles-jajangmyeon_1339-166718.jpg?w=1380&t=st=1704987000~exp=1704987600~hmac=b6f5d8e7d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8' },
        { name: '닭갈비', imageUrl: 'https://images.unsplash.com/photo-1628172605788-b3d1b3b3a3d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '족발', imageUrl: 'https://images.pexels.com/photos/7000858/pexels-photo-7000858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: '보쌈', imageUrl: 'https://images.pexels.com/photos/7000858/pexels-photo-7000858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: '갈비찜', imageUrl: 'https://images.pexels.com/photos/7000858/pexels-photo-7000858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: '스테이크', imageUrl: 'https://images.unsplash.com/photo-1574672206089-6019a5b6f3b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '샐러드', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57962c07923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { name: '떡볶이', imageUrl: 'https://images.unsplash.com/photo-1620062495940-02c3b8f3a3d2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max' }
    ];

    recommendButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
        const recommendedMenu = dinnerMenus[randomIndex];
        
        menuDisplay.textContent = recommendedMenu.name;
        menuImage.src = recommendedMenu.imageUrl;
        menuImage.style.display = 'block'; // Make the image visible
    });

    // Formspree submission handling
    const partnershipForm = document.getElementById('partnershipForm');
    const formStatus = document.getElementById('formStatus');

    if (partnershipForm && formStatus) {
        partnershipForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            formStatus.textContent = '보내는 중...';
            formStatus.style.color = '#3498db'; // Blue for sending

            const formData = new FormData(partnershipForm);

            try {
                const response = await fetch(partnershipForm.action, {
                    method: partnershipForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = '문의가 성공적으로 전송되었습니다!';
                    formStatus.style.color = '#2ecc71'; // Green for success
                    partnershipForm.reset(); // Clear the form
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data.errors.map(error => error.message).join(', ');
                    } else {
                        formStatus.textContent = '죄송합니다. 문의 전송 중 문제가 발생했습니다.';
                    }
                    formStatus.style.color = '#e74c3c'; // Red for error
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formStatus.textContent = '죄송합니다. 예상치 못한 오류가 발생했습니다.';
                formStatus.style.color = '#e74c3c'; // Red for error
            }
        });
    }
});