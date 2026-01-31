// 1. Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const spline = document.querySelector('spline-viewer');
    const header = document.querySelector('header');

    // 2. Handle the "Load Complete" event from Spline
    spline.addEventListener('load-complete', () => {
        console.log("3D Bot loaded successfully.");
        // You could trigger a fade-in animation here for your text
        document.body.classList.add('loaded');
    });

    // 3. Optional: Parallax Effect
    // This moves the bot slightly as the user scrolls for a deeper 3D feel
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Adjust the bot's vertical position slightly based on scroll
        // Move it up/down by 10% of the scroll speed
        if (spline) {
            spline.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    });
});

// 4. Smooth Scroll Function
// This is called by the 'onclick' attribute in your HTML button
function scrollToWork() {
    const workSection = document.getElementById('work');
    if (workSection) {
        workSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}