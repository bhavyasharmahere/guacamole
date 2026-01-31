function scrollToWork() {
    document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
}

// Optional: Console log to verify the 3D bot loaded
const spline = document.querySelector('spline-viewer');
spline.addEventListener('load-complete', () => {
    console.log("3D Portfolio Engine Ready.");
});