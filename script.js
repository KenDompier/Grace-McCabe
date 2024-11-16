function playSound(src) {
    const audio = new Audio(src);
    audio.play();
}

function showSection(section) {
    const sections = document.querySelectorAll('.section');
    const container = document.querySelector('.container');
    const scrollingText = document.querySelector('.scrolling-text');

    if (section === 'home') {
        container.style.display = 'flex';
        sections.forEach(sec => sec.style.display = 'none');
        scrollingText.style.display = 'block'; // Show scrolling text when home is displayed
    } else {
        container.style.display = 'none';
        sections.forEach(sec => sec.style.display = 'none');
        const sectionElement = document.getElementById(section);
        sectionElement.style.display = 'flex';
        
        // Load the background image smoothly
        if (section === 'about' || section === 'portfolio' || section === 'contact') {
            const bgImage = new Image();
            bgImage.src = 'imgs/aboutbackground.png';
            bgImage.onload = function() {
                sectionElement.classList.add('loaded');
            };
        }
        scrollingText.style.display = 'none'; // Hide scrolling text when a section is open
    }

    // Play the select sound
    playSound('snd/selectNav.wav');
}


// Play background music in a loop
function playBackgroundMusic() {
    const bgMusic = new Audio('snd/song.wav');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    bgMusic.play();
}

// Starts the background music when the page loads
window.addEventListener('load', function() {
    playBackgroundMusic();
});


let fadeInTimeout; // Variable to hold the timeout ID
let isHovering = false; // Flag to track if a navbar item is being hovered

function handleMouseLeave() {
    const container = document.querySelector('.container');
    const scrollingText = document.querySelector('.scrolling-text');

    // Set up the timeout to fade in the scrolling text
    fadeInTimeout = setTimeout(function() {
        if (!isHovering) { // Only fade in if not hovering
            scrollingText.classList.remove('hidden');
            scrollingText.classList.add('visible');
        }
    }, 1000); // 1000 milliseconds = 1 second

    // Remove the scrolling background
    container.querySelectorAll('.scrolling-bg').forEach(bg => bg.remove());
}

document.querySelectorAll('.nav-icon').forEach(navItem => {
    navItem.addEventListener('mouseenter', function() {
        const text = this.textContent.trim();
        const container = document.querySelector('.container');
        const scrollingText = document.querySelector('.scrolling-text');

        // Clear the fade-in timeout if still hovering
        clearTimeout(fadeInTimeout);

        // Set the hovering flag
        isHovering = true;

        // Fade out the scrolling text
        scrollingText.classList.remove('visible');
        scrollingText.classList.add('hidden');

        // Clear any existing scrolling text elements
        container.querySelectorAll('.scrolling-bg').forEach(bg => bg.remove());

        // Create multiple rows of scrolling text
        const numRows = 10; // Adjust the number of rows as needed
        const rowHeight = 95; // Adjust row height as needed (px)

        // Determine the scroll end value based on the hovered nav-item
        let scrollEndValue;
        if (text === 'About') {
            scrollEndValue = '-132%';
        } else if (text === 'Portfolio') {
            scrollEndValue = '-122%';
        } else if (text === 'Contact') {
            scrollEndValue = '-124%';
        } else {
            scrollEndValue = '-100%'; // Default value
        }

        // Apply the scroll-end value
        document.documentElement.style.setProperty('--scroll-end', scrollEndValue);

        for (let i = 0; i < numRows; i++) {
            const scrollingBg = document.createElement('div');
            scrollingBg.classList.add('scrolling-bg');
            scrollingBg.style.top = `${i * rowHeight}px`; // Set the top position based on row index
            
            // Create and append the repeating text elements
            for (let j = 0; j < 10; j++) { // Adjust the repetition count as needed
                const span = document.createElement('span');
                span.textContent = text;
                scrollingBg.appendChild(span);
            }

            // Append the scrolling background to the container
            container.appendChild(scrollingBg);
        }

        // Play the highlight sound
        playSound('snd/highlightNav.wav');
    });

    navItem.addEventListener('mouseleave', function() {
        // Reset the hovering flag
        isHovering = false;

        // Handle fading in of the scrolling text
        handleMouseLeave();
    });
});

// Handle the case when the mouse leaves the container
document.querySelector('.container').addEventListener('mouseleave', function() {
    if (!isHovering) { // Only proceed if no nav items are being hovered
        handleMouseLeave();
    }
});

