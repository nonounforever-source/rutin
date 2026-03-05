// app.ts

// Initialization function for the app
function initApp() {
    console.log('App initialized');
    setupEventListeners();
}

// Function to set up event listeners
function setupEventListeners() {
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    window.addEventListener('resize', detectOrientation);
    detectOrientation(); // Initial check
}

// Function to handle form submissions
function handleFormSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target as HTMLFormElement);
    // Process form data here
    console.log('Form submitted:', Object.fromEntries(formData));
}

// Function to detect orientation changes
function detectOrientation() {
    if (window.innerWidth > window.innerHeight) {
        console.log('Landscape orientation');
    } else {
        console.log('Portrait orientation');
    }
}

// Run the initialization on load
window.onload = initApp;