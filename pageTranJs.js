// const preloadImage = new Image();
// preloadImage.src = 'assets/photo/red-rose-petal-isolated-white_392895-87676-removebg-preview.png';
// class PetalTransition {
//     constructor() {
//         this.overlay = document.querySelector('.petal-transition-overlay');
//         this.isTransitioning = false;
//         this.petalCount = 15; // Number of petals
//         this.transitionDuration = 1200; // ms
        
//         // Create petals in advance
//         this.createPetals();
//     }
    
//     createPetals() {
//         // Clear existing petals
//         this.overlay.innerHTML = '';
        
//         for (let i = 0; i < this.petalCount; i++) {
//             const petal = document.createElement('div');
//             petal.className = `petal petal-style-${(i % 2) + 1}`;
            
//             // Randomize starting position (off screen to the right)
//             petal.style.right = `-100px`;
//             petal.style.top = `${Math.random() * 100}vh`;
            
//             // Random size variation
//             const size = 60 + Math.random() * 40;
//             petal.style.width = `${size}px`;
//             petal.style.height = `${size}px`;
            
//             // Random rotation
//             petal.style.transform = `rotate(${Math.random() * 360}deg)`;
            
//             // Random animation delay
//             petal.style.animationDelay = `${Math.random() * 0.5}s`;
            
//             this.overlay.appendChild(petal);
//         }
//     }
    
//     async transition(callback) {
//         if (this.isTransitioning) return;
//         this.isTransitioning = true;
        
//         // Show overlay
//         this.overlay.classList.add('active');
        
//         // Animate petals
//         const petals = this.overlay.querySelectorAll('.petal');
        
//         petals.forEach((petal, index) => {
//             // Reset position
//             petal.style.right = `-100px`;
//             petal.style.top = `${Math.random() * 100}vh`;
            
//             // Calculate target position (fly to left)
//             const targetX = `calc(100vw + 100px)`;
//             const targetY = `${Math.random() * 100}vh`;
//             const rotation = Math.random() * 720; // 0-720 degrees
            
//             // Apply animation
//             petal.style.transition = `all ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
//             petal.style.transitionDelay = `${index * 50}ms`;
            
//             setTimeout(() => {
//                 petal.style.right = targetX;
//                 petal.style.top = targetY;
//                 petal.style.transform = `rotate(${rotation}deg)`;
//             }, 10);
//         });
        
//         // Wait for transition to complete
//         await new Promise(resolve => 
//             setTimeout(resolve, this.transitionDuration + 100)
//         );
        
//         // Execute callback (page change)
//         if (callback) callback();
        
//         // Hide overlay after a brief pause
//         setTimeout(() => {
//             this.overlay.classList.remove('active');
//             this.isTransitioning = false;
            
//             // Reset petals for next transition
//             petals.forEach(petal => {
//                 petal.style.transition = 'none';
//                 petal.style.right = '-100px';
//             });
//         }, 300);
//     }
// }

// // Initialize transition system
// const petalTransition = new PetalTransition();