// Valentine's Day Website - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('💖 Valentine website loaded!');
    
    // ===== OPEN LETTER FUNCTION =====
    window.openLetter = function() {
        const letter = document.getElementById('letterContent');
        const envelope = document.querySelector('.envelope');
        
        // Show letter with animation
        letter.style.display = 'block';
        letter.style.animation = 'fadeIn 0.8s ease-out';
        
        // Animate envelope opening
        envelope.style.transform = 'translateY(-50px) scale(0.9)';
        envelope.style.opacity = '0.5';
        
        // Add CSS for fadeIn animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        console.log('💌 Love letter opened!');
    };
    
    // ===== FORM SUBMISSION =====
    const loveForm = document.getElementById('loveResponse');
    if (loveForm) {
        loveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = this.querySelector('textarea').value.trim();
            
            if (!message) {
                alert('Please write a message first! 💕');
                return;
            }
            
            // Using Formspree (Free service)
            // Create account at formspree.io and replace YOUR_FORM_ID
            const formData = new FormData();
            formData.append('message', message);
            formData.append('_subject', 'New Valentine Message!');
            
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success animation
                    const btn = this.querySelector('.send-btn');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '💖 Sent! 💖';
                    btn.style.background = 'linear-gradient(to right, #4CAF50, #45a049)';
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 2000);
                    
                    // Clear form
                    this.reset();
                    
                    console.log('Message sent successfully!');
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Could not send message. Please try again!');
            });
        });
    }
    
    // ===== NAVIGATION ACTIVE STATE =====
    const heartButtons = document.querySelectorAll('.heart-btn');
    const sections = document.querySelectorAll('.page');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        heartButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href').substring(1) === current) {
                btn.classList.add('active');
            }
        });
    }
    
    // Update on scroll
    // window.addEventListener('scroll', updateActiveNav);
    
    // ===== ADD FLOATING HEARTS PNG (CENTER START, GROW, DISAPPEAR) =====
function createFloatingHeartsPNG() {
    const heartContainer = document.querySelector('.floating-heart-background');
    if (!heartContainer) {
        console.error('Container .floating-heart-background not found!');
        return;
    }
    console.log("PNG LOADED")
    // How many hearts
    const heartCount = 25;
    
    // Clear container
    heartContainer.innerHTML = '';
    
    // Image path
    const heartImagePath = '/assets/photo/72c2cb9a89ad9fa785f60b2ba137c8af-removebg-preview.png';
    
    for (let i = 0; i < heartCount; i++) {
        // Create image element
        const heartPng = document.createElement('img');
        heartPng.src = heartImagePath;
        heartPng.alt = 'floating heart';
        heartPng.className = 'floating-heart-png';
        
        // --- START POSITION: CENTER OF SCREEN ---
        heartPng.style.left = '50%';
        heartPng.style.top = '50%';
        heartPng.style.transform = 'translate(-50%, -50%)'; // Perfect center
        
        // --- START SIZE: SMALL ---
        const startSize = 5 + Math.random() * 15; // 5px to 20px
        heartPng.style.width = `${startSize}px`;
        heartPng.style.height = `${startSize}px`;
        
        // --- START OPACITY: VARIED ---
        heartPng.style.opacity = 0.2 + Math.random() * 0.5; // 0.2 to 0.7
        
        // --- ROTATION: Single rotation, not infinite ---
        const rotation = Math.random() * 720; // Random rotation amount
        heartPng.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        // --- ANIMATION: Grow, move, fade out ---
        const moveX = (Math.random() - 0.5) * 200; // -100px to +100px
        const moveY = -150 - Math.random() * 200; // -150px to -350px (upward)
        const finalSize = 80 + Math.random() * 100; // 80px to 180px
        const duration = 8 + Math.random() * 10; // 8s to 18s
        const delay = Math.random() * 5; // 0s to 5s delay
        
        // Create unique animation for each heart
        const animationName = `heartFloat${i}`;
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${animationName} {
                0% {
                    left: 50%;
                    top: 50%;
                    width: ${startSize}px;
                    height: ${startSize}px;
                    opacity: ${0.2 + Math.random() * 0.5};
                    transform: translate(-50%, -50%) rotate(0deg);
                }
                100% {
                    left: calc(50% + ${moveX}px);
                    top: calc(50% + ${moveY}px);
                    width: ${finalSize}px;
                    height: ${finalSize}px;
                    opacity: 0;
                    transform: translate(-50%, -50%) rotate(${rotation}deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Apply animation
        heartPng.style.animation = `${animationName} ${duration}s ease-out forwards`;
        heartPng.style.animationDelay = `${delay}s`;
        
        // Add to container
        heartContainer.appendChild(heartPng);
        
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', createFloatingHeartsPNG);
    // ===== ADD FLOATING HEARTS DYNAMICALLY =====
    function createFloatingHearts() {
        const heartContainer = document.querySelector('.floating-heart');
        if (!heartContainer) return;
        
        const hearts = ['💖', '💕', '💘', '💝', '💓'];
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.opacity = Math.random() * 0.3 + 0.1;
            heart.style.animation = `floatHeart ${Math.random() * 10 + 10}s linear infinite`;
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatHeart {
                    0% { transform: translateY(100vh) rotate(0deg); }
                    100% { transform: translateY(-100vh) rotate(${Math.random() * 360}deg); }
                }
            `;
            document.head.appendChild(style);
            
            heartContainer.appendChild(heart);
        }
    }
    
    createFloatingHearts();
    
    // ===== INITIAL ANIMATIONS =====
    setTimeout(() => {
        document.querySelector('.main-title').style.animation = 'fadeIn 1s ease-out';
    }, 500);
});

// ===== ADDITIONAL FUNCTIONS =====
// Function to add a love message to console (Easter egg)
console.log('%c💖 For the most amazing person in my universe 💖', 
    'color: #ff4d6d; font-size: 18px; font-weight: bold;');
console.log('%cThis website is made with love for Valentine\'s Day 2026', 
    'color: #ffafcc; font-size: 14px;');

// ===========    POPUP SECOND PAGE   ================ 
// =========== POPUP AND PAGE NAVIGATION ================ 
document.addEventListener('DOMContentLoaded', function() {
    // ===== GET ELEMENTS =====
    const yesButton = document.querySelector('.Yes-Button');
    const noButton = document.querySelector('.No-Button');
    const questionSection = document.getElementById('timeline'); // Your question page
    const memoriesSection = document.getElementById('memories-section');
    const noPopup = document.getElementById('no-popup-overlay');
    const yesPopup = document.getElementById('yes-popup-overlay');
    
    // ===== YES BUTTON - HIDE QUESTION, SHOW MEMORIES =====
    if (yesButton && questionSection && memoriesSection) {
        yesButton.addEventListener('click', function() {
            console.log('🎉 YES clicked - Showing memories!');
            
            // 1. Hide NO popup if showing
            if (noPopup) noPopup.classList.remove('show');
            
            // 2. Show YES popup (happy cinamon)
            if (yesPopup) {
                yesPopup.classList.add('show');
                
                // 3. Auto-hide YES popup after 2 seconds, THEN show memories
                setTimeout(function() {
                    yesPopup.classList.remove('show');
                    
                    // 4. HIDE question section (timeline page)
                    questionSection.style.display = 'none';
                    questionSection.classList.add('hide');
                    
                    // 5. SHOW memories section
                    memoriesSection.style.display = 'block';
                    setTimeout(function() {
                        memoriesSection.classList.add('show');
                    }, 50);
                    
                    // 6. Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    console.log('📸 Memories page visible!');
                    
                }, 2000); // 2 seconds delay
            }
        });
    } else {
        console.error('❌ Missing elements:', {
            yesButton: !!yesButton,
            questionSection: !!questionSection,
            memoriesSection: !!memoriesSection
        });
    }
    
    // ===== NO BUTTON - CRYING POPUP =====
    if (noButton && noPopup) {
        noButton.addEventListener('click', function() {
            noPopup.classList.add('show');
            console.log('😢 Crying Cinamon');
        });
        
        // Close NO popup
        const closeNoButton = noPopup.querySelector('.close-popup');
        if (closeNoButton) {
            closeNoButton.addEventListener('click', function() {
                noPopup.classList.remove('show');
            });
        }
        
        noPopup.addEventListener('click', function(e) {
            if (e.target === noPopup) {
                noPopup.classList.remove('show');
            }
        });
    }
    
    // ===== CLOSE YES POPUP MANUAL =====
    if (yesPopup) {
        const closeYesButton = yesPopup.querySelector('.close-popup');
        if (closeYesButton) {
            closeYesButton.addEventListener('click', function() {
                yesPopup.classList.remove('show');
            });
        }
        
        yesPopup.addEventListener('click', function(e) {
            if (e.target === yesPopup) {
                yesPopup.classList.remove('show');
            }
        });
    }
    
    // ===== ESC KEY =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (noPopup?.classList.contains('show')) noPopup.classList.remove('show');
            if (yesPopup?.classList.contains('show')) yesPopup.classList.remove('show');
        }
    });
});

