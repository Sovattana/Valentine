// =================================================================
// PAGE NAVIGATION SYSTEM WITH PETAL TRANSITIONS
// =================================================================

// ========== 1. PETAL TRANSITION CLASS ==========
// Handles flower petal animations during page transitions
// =================================================================
class PetalTransition {
    constructor() {
        this.overlay = document.querySelector('.petal-transition-overlay');
        this.isTransitioning = false;
        this.petalCount = 200; // Number of petals (increase for denser effect)
        this.transitionDuration = 600; // Animation duration in milliseconds
        this.petalSizes = [50, 60, 70, 80, 90, 100]; // Size variations
        
        this.createPetals();
        
        // Listen for window resize to adjust petal positions
        window.addEventListener('resize', () => this.createPetals());
    }
    
    // Create and position petal elements
    createPetals() {
        this.overlay.innerHTML = '';
        
        for (let i = 0; i < this.petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = `petal petal-style-${(i % 2) + 1}`;
            
            // Position off-screen to the right
            petal.style.right = `-100px`;
            petal.style.top = `${Math.random() * 100}vh`;
            
            // Random size
            const size = 60 + Math.random() * 40;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            
            // Initial rotation
            petal.style.transform = `rotate(${Math.random() * 360}deg)`;
            petal.style.animationDelay = `${Math.random() * 0.5}s`;
            
            this.overlay.appendChild(petal);
        }
    }
    
    // Trigger petal transition animation
    async transition(direction = 'forward', callback) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.overlay.classList.add('active');
        const petals = this.overlay.querySelectorAll('.petal');
        
        // Set direction class for CSS animations
        this.overlay.classList.remove('reverse');
        if (direction === 'backward') {
            this.overlay.classList.add('reverse');
        }
        
        petals.forEach((petal, index) => {
            // Reset position based on direction
            if (direction === 'forward') {
                petal.style.right = `-100px`; // Start off-screen right
                petal.style.left = 'auto';
            } else {
                petal.style.left = `-100px`; // Start off-screen left
                petal.style.right = 'auto';
            }
            
            petal.style.top = `${Math.random() * 100}vh`;
            
            // Calculate target positions
            const targetX = `calc(100vw + 100px)`;
            const targetLeft = `calc(100vw + 100px)`;
            const targetY = `${Math.random() * 100}vh`;
            const rotation = Math.random() * 720;
            
            // Apply animation
            petal.style.transition = `all ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            petal.style.transitionDelay = `${index * 20}ms`; // Staggered start
            
            setTimeout(() => {
                if (direction === 'forward') {
                    petal.style.right = targetX; // Move right to left
                } else {
                    petal.style.left = targetLeft; // Move left to right
                }
                petal.style.top = targetY;
                petal.style.transform = `rotate(${rotation}deg)`;
            }, 20);
        });
        
        // Wait for animation to complete
        await new Promise(resolve => 
            setTimeout(resolve, this.transitionDuration + 100)
        );
        
        // Execute callback (page change)
        if (callback) callback();
        
        // Clean up
        setTimeout(() => {
            this.overlay.classList.remove('active');
            this.isTransitioning = false;
            
            // Reset petals for next transition
            petals.forEach(petal => {
                petal.style.transition = 'none';
                if (direction === 'forward') {
                    petal.style.right = '-100px';
                } else {
                    petal.style.left = '-100px';
                }
            });
        }, 1000);
    }
}

// ========== 2. INITIALIZE TRANSITION SYSTEM ==========
// =================================================================
const petalTransition = new PetalTransition();

// ========== 3. PAGE ELEMENT REFERENCES ==========
// Define all page elements and navigation controls
// =================================================================
const pages = document.querySelectorAll('.page'); // All page sections
const navButtons = document.querySelectorAll('.nav-btn'); // Direct nav buttons
const prevBtn = document.getElementById('prev-btn'); // Previous button
const nextBtn = document.getElementById('next-btn'); // Next button
const page2Arrow = document.querySelector('.arrow-btn'); // Special arrow button
let currentPageIndex = 0; // Track current page

// ========== 4. PAGE SLIDE ANIMATION FUNCTIONS ==========
// Handle page sliding effects during transitions
// =================================================================

// Apply slide-out animation to current page
function slideOutCurrentPage(direction) {
    const currentPage = pages[currentPageIndex];
    
    if (direction === 'forward') {
        currentPage.style.transform = 'translateX(-100%)';
    } else {
        currentPage.style.transform = 'translateX(100%)';
    }
    
    currentPage.style.transition = 'transform 0.7s ease';
    currentPage.style.opacity = '0.5';
}

// Apply slide-in animation to new page
function slideInNewPage(pageId, direction) {
    const newPage = document.getElementById(pageId);
    
    // Set initial position based on direction
    if (direction === 'forward') {
        newPage.style.transform = 'translateX(100%)'; // Start from right
    } else {
        newPage.style.transform = 'translateX(-100%)'; // Start from left
    }
    
    newPage.style.transition = 'transform 0.7s ease 0.3s'; // Delay for petal effect
    newPage.style.opacity = '0';
    newPage.style.display = 'block';
    
    // Trigger slide-in animation
    setTimeout(() => {
        newPage.style.transform = 'translateX(0)';
        newPage.style.opacity = '1';
    }, 10);
}

// Reset all page positions (called after transition)
function resetPageTransforms() {
    pages.forEach(page => {
        page.style.transform = '';
        page.style.transition = '';
        page.style.opacity = '';
    });
}

// ========== 5. MAIN PAGE NAVIGATION FUNCTION ==========
// Core function to handle page changes with animations
// =================================================================
async function showPage(pageId, direction = 'forward') {
    if (petalTransition.isTransitioning) return;
    
    // 1. Start petal transition
    await petalTransition.transition(direction, () => {
        // This callback runs when petals START moving
        // NOT when they finish
        
        // 2. Start page slide AFTER petals have begun (500ms delay)
        setTimeout(() => {
            // Slide current page out
            const currentPage = pages[currentPageIndex];
            if (direction === 'forward') {
                currentPage.style.transform = 'translateX(-100%)';
            } else {
                currentPage.style.transform = 'translateX(100%)';
            }
            currentPage.style.transition = 'transform 0.6s ease';
            
            // Slide new page in
            const newPage = document.getElementById(pageId);
            newPage.style.display = 'flex';
            if (direction === 'forward') {
                newPage.style.transform = 'translateX(100%)';
            } else {
                newPage.style.transform = 'translateX(-100%)';
            }
            
            setTimeout(() => {
                newPage.style.transform = 'translateX(0)';
                newPage.style.transition = 'transform 0.6s ease';
            }, 1);
            
        }, 10); // Wait 500ms before sliding pages
    });
    
    // 3. Complete the transition after petals finish
    setTimeout(() => {
        // Hide old page, show new page
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
            page.style.transform = '';
            page.style.transition = '';
        });
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.style.display = 'flex';
            targetPage.style.transform = '';
        }
        
        // Update index
        pages.forEach((page, index) => {
            if (page.id === pageId) {
                currentPageIndex = index;
            }
        });
        
        updateButton();
        
    }, petalTransition.transitionDuration + 600); // Wait for petals + slide
}

// ========== 6. NAVIGATION BUTTON HANDLERS ==========
// Event listeners for all navigation controls
// =================================================================

// Next button - moves to next page with forward animation
nextBtn.addEventListener('click', async () => {
    if (currentPageIndex < pages.length - 1) {
        const nextPageId = pages[currentPageIndex + 1].id;
        await showPage(nextPageId, 'forward');
    }
});

// Previous button - moves to previous page with backward animation
prevBtn.addEventListener('click', async () => {
    if (currentPageIndex > 0) {
        const previousPageId = pages[currentPageIndex - 1].id;
        await showPage(previousPageId, 'backward');
    }
});

// Special arrow button
if (page2Arrow) {
    page2Arrow.addEventListener('click', async () => {
        if (currentPageIndex < pages.length - 1) {
            const nextPageIdArrow = pages[currentPageIndex + 1].id;
            await showPage(nextPageIdArrow, 'forward');
        }
    });
}

// Direct navigation buttons (skip to specific page)
navButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
        const targetPage = btn.dataset.target;
        if (targetPage) {
            // Determine direction based on page index
            let targetIndex = 0;
            pages.forEach((page, index) => {
                if (page.id === targetPage) {
                    targetIndex = index;
                }
            });
            
            const direction = targetIndex > currentPageIndex ? 'forward' : 'backward';
            await showPage(targetPage, direction);
        }
    });
});

// ========== 7. UTILITY FUNCTIONS ==========
// Helper functions for navigation state
// =================================================================

// Update navigation button visibility
function updateButton() {
    prevBtn.style.display = currentPageIndex === 0 ? 'none' : 'block';
    nextBtn.style.display = currentPageIndex === pages.length - 1 ? 'none' : 'block';
    
    // Optional: Update active state on direct nav buttons
    navButtons.forEach(btn => {
        const targetPage = btn.dataset.target;
        if (targetPage && document.getElementById(targetPage).classList.contains('active')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ========== 8. KEYBOARD NAVIGATION ==========
// Allow keyboard arrow key navigation
// =================================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPageIndex < pages.length - 1) {
        nextBtn.click();
    }
    if (e.key === 'ArrowLeft' && currentPageIndex > 0) {
        prevBtn.click();
    }
});

// ========== 9. TOUCH/SWIPE SUPPORT ==========
// Add touch gestures for mobile devices
// =================================================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left = next page
        if (currentPageIndex < pages.length - 1) {
            nextBtn.click();
        }
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right = previous page
        if (currentPageIndex > 0) {
            prevBtn.click();
        }
    }
}

// ========== 10. INITIALIZATION ==========
// Set up initial page state
// =================================================================
function initializeWebsite() {
    // Hide all pages except first
    pages.forEach((page, index) => {
        if (index !== 0) {
            page.style.display = 'none';
        }
    });
    
    // Show first page
    showPage('home');
    
    // Update button states
    updateButton();
    
    console.log(`Website initialized with ${pages.length} pages`);
}

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Arrow click - will connect to music page later
document.addEventListener('DOMContentLoaded', function() {
    const musicArrow = document.querySelector('.arrow-flower-btns');
    
    if (musicArrow) {
        musicArrow.addEventListener('click', function() {
            console.log('🎵 Arrow clicked - Music page coming soon!');
            
            // Add animation
            this.style.animation = 'arrowPop 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
            
            // We'll add music page navigation here later
            alert('Music page coming soon! 🎵');
        });
    }
});

// Add to your existing DOMContentLoaded event
const musicArrow = document.querySelector('.arrow-flower-btns');
const memoriesSection = document.getElementById('memories-section');
const musicSection = document.getElementById('music-section');

if (musicArrow && memoriesSection && musicSection) {
    musicArrow.addEventListener('click', function() {
        // Hide memories section
        memoriesSection.style.display = 'none';
        
        // Show music section
        musicSection.style.display = 'flex';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('🎵 Navigating to music page');
    });
}
// =================================================================
// HOW TO ADD MORE PAGES:
// =================================================================
// 1. Add new <section id="page-name" class="page"> in HTML
// 2. Add navigation button with data-target="page-name"
// 3. Update petalCount if needed for different screen sizes
// 4. Adjust transitionDuration for desired speed
// =================================================================