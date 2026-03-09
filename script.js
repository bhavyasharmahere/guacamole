// Wait for the HTML document to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Target the Spline 3D viewer element
    const splineViewer = document.querySelector('spline-viewer');

    if (splineViewer) {
        // Listen for the event that fires when the 3D model is ready
        splineViewer.addEventListener('load-complete', () => {
            console.log("Success! The 3D model is fully loaded and interactive.");
            // You can add logic here, like hiding a loading spinner
        });
    } else {
        console.error("Spline viewer element not found in the HTML.");
    }
});