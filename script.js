document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;

    // 갤러리 아이템 클릭 이벤트
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(item);
        });
    });

    // 라이트박스 열기
    function openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;

        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // 라이트박스 닫기
    function closeLightboxHandler() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // 이전 이미지
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(galleryItems[currentImageIndex]);
    }

    // 다음 이미지
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        openLightbox(galleryItems[currentImageIndex]);
    }

    // 이벤트 리스너 등록
    closeLightbox.addEventListener('click', closeLightboxHandler);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // ESC 키로 라이트박스 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightboxHandler();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    // 라이트박스 외부 클릭시 닫기
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });
});

// 모바일 메뉴 토글
const mobileMenuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// 스크롤 애니메이션
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 적용할 요소들
document.querySelectorAll('.service-card, .project-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CCTV spotlight and thief animation for service cards

document.querySelectorAll('.cctv-spotlight-container').forEach(container => {
    const svg = container.querySelector('svg');
    if (!svg) return;
    const spotlight = svg.querySelector('.spotlight-beam');
    const thief = svg.querySelector('.thief-group');
    const surpriseLine = svg.querySelector('.surprise-line');

    container.addEventListener('mouseenter', () => {
        if (spotlight) spotlight.setAttribute('opacity', '1');
        if (thief) thief.setAttribute('opacity', '1');
        if (surpriseLine) {
            surpriseLine.setAttribute('opacity', '1');
            surpriseLine.animate([
                { transform: 'scaleY(0.2)' },
                { transform: 'scaleY(1.2)' },
                { transform: 'scaleY(1)' }
            ], {
                duration: 400,
                fill: 'forwards'
            });
        }
        // Thief jump animation
        if (thief) {
            thief.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(-10px)' },
                { transform: 'translateY(0)' }
            ], {
                duration: 400,
                fill: 'forwards'
            });
        }
    });
    container.addEventListener('mouseleave', () => {
        if (spotlight) spotlight.setAttribute('opacity', '0');
        if (thief) thief.setAttribute('opacity', '0');
        if (surpriseLine) surpriseLine.setAttribute('opacity', '0');
    });
});

// More dynamic CCTV spotlight and thief animation for hero section
(function() {
    const svg = document.getElementById('cctv-thief-hero-svg');
    if (!svg) return;
    const spotlight = svg.querySelector('.spotlight-beam');
    const thiefGroup = svg.querySelector('.thief-group');
    const eyeLeft = svg.querySelector('.thief-eye-left');
    const eyeRight = svg.querySelector('.thief-eye-right');
    const eyeLeftCry = svg.querySelector('.thief-eye-left-cry');
    const eyeRightCry = svg.querySelector('.thief-eye-right-cry');
    const tearLeft = svg.querySelector('.thief-tear-left');
    const tearRight = svg.querySelector('.thief-tear-right');
    const mouth = svg.querySelector('.thief-mouth');
    const mouthCry = svg.querySelector('.thief-mouth-cry');
    const surpriseLine = svg.querySelector('.surprise-line');
    const lensGlint = svg.querySelector('.lens-glint');
    const contactBtn = document.querySelector('.hero-contact-btn');

    // Thief initial movement (looping left-to-right)
    let thiefMoving = true;
    let thiefX = 0;
    let thiefDir = 1;
    function moveThief() {
        if (!thiefMoving) return;
        thiefX += 0.7 * thiefDir;
        if (thiefX > 80) thiefDir = -1;
        if (thiefX < -40) thiefDir = 1;
        thiefGroup.setAttribute('transform', `translate(${900 + thiefX},480)`);
        requestAnimationFrame(moveThief);
    }
    moveThief();

    function animateCCTV() {
        // Stop thief movement
        thiefMoving = false;
        // Spotlight beam animation
        if (spotlight) {
            spotlight.setAttribute('opacity', '1');
            spotlight.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                duration: 400,
                fill: 'forwards'
            });
        }
        // Thief jump and cry
        if (thiefGroup) {
            thiefGroup.animate([
                { transform: `translate(${900 + thiefX},480)` },
                { transform: `translate(${900 + thiefX},465) scale(1.05)` },
                { transform: `translate(${900 + thiefX},480)` }
            ], {
                duration: 500,
                fill: 'forwards'
            });
        }
        // Eyes/mouth to crying
        if (eyeLeftCry) eyeLeftCry.setAttribute('opacity', '1');
        if (eyeRightCry) eyeRightCry.setAttribute('opacity', '1');
        if (eyeLeft) eyeLeft.setAttribute('opacity', '0');
        if (eyeRight) eyeRight.setAttribute('opacity', '0');
        if (mouthCry) mouthCry.setAttribute('opacity', '1');
        if (mouth) mouth.setAttribute('opacity', '0');
        if (tearLeft) tearLeft.setAttribute('opacity', '1');
        if (tearRight) tearRight.setAttribute('opacity', '1');
        // Surprise line
        if (surpriseLine) {
            surpriseLine.setAttribute('opacity', '1');
            surpriseLine.animate([
                { transform: 'scaleY(0.2)' },
                { transform: 'scaleY(1.2)' },
                { transform: 'scaleY(1)' }
            ], {
                duration: 400,
                fill: 'forwards'
            });
        }
        // Lens sparkle
        if (lensGlint) {
            lensGlint.animate([
                { opacity: 0.7, transform: 'scale(1)' },
                { opacity: 1, transform: 'scale(1.3)' },
                { opacity: 0.7, transform: 'scale(1)' }
            ], {
                duration: 600,
                fill: 'forwards'
            });
        }
    }
    function resetCCTV() {
        // Resume thief movement
        thiefMoving = true;
        moveThief();
        if (spotlight) spotlight.setAttribute('opacity', '0');
        if (eyeLeftCry) eyeLeftCry.setAttribute('opacity', '0');
        if (eyeRightCry) eyeRightCry.setAttribute('opacity', '0');
        if (eyeLeft) eyeLeft.setAttribute('opacity', '1');
        if (eyeRight) eyeRight.setAttribute('opacity', '1');
        if (mouthCry) mouthCry.setAttribute('opacity', '0');
        if (mouth) mouth.setAttribute('opacity', '1');
        if (tearLeft) tearLeft.setAttribute('opacity', '0');
        if (tearRight) tearRight.setAttribute('opacity', '0');
        if (surpriseLine) surpriseLine.setAttribute('opacity', '0');
    }
    if (contactBtn) {
        contactBtn.addEventListener('mouseenter', animateCCTV);
        contactBtn.addEventListener('mouseleave', resetCCTV);
    }
})(); 