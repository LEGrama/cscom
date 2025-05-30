// 갤러리 필터링
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 활성화된 버튼 스타일 변경
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // 라이트박스 이미지 배열도 현재 보이는 것만으로 재설정
        initializeImages();
    });
});

// 라이트박스 기능
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let images = [];

// 이미지 배열 초기화
function initializeImages() {
    images = Array.from(document.querySelectorAll('.gallery-item')).map(item => ({
        src: item.querySelector('img').src,
        title: item.querySelector('h3').textContent,
        description: item.querySelector('p').textContent
    }));
}

// 라이트박스 열기
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 라이트박스 닫기
function closeLightboxHandler() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 라이트박스 이미지 업데이트
function updateLightboxImage() {
    const image = images[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxCaption.innerHTML = `<h3>${image.title}</h3><p>${image.description}</p>`;
}

// 이전 이미지
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

// 다음 이미지
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    initializeImages();

    // 갤러리 아이템 클릭 이벤트
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // 라이트박스 닫기
    closeLightbox.addEventListener('click', closeLightboxHandler);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });

    // 이전/다음 버튼
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightboxHandler();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}); 