let isTyping = false; // Track if typing is in progress

function flipCard() {
    if (isTyping) return; // Block further clicks while typing
    const card = document.getElementById('birthdayCard');
    const cardInner = document.getElementById('cardInner');
    const birthdaySound = document.getElementById('birthdaySound');
    const text = "May this special day bring you endless joy, laughter, and memories that last forever. \n\nI’ll always be rooting for you and I know good things are coming your way. Thank you for being there, for your kindness, for your support, and for just being a great friend. Here’s to another year of unforgettable adventures, cherished moments, and dreams coming true! 🎂🎁";

    // Play birthday sound
    birthdaySound.play();

    // Flip the card
    cardInner.classList.add('flipped');

    // Prevent further flips while typing
    setTimeout(() => {
        card.classList.add('enlarged');
        startConfetti();
        isTyping = true; // Start typing, set flag
        document.getElementById("typedText").innerHTML = ""; // Clear any existing text
        setTimeout(() => typeWriter(text, 0), 500);  // Start typing after the enlargement
    }, 800); // Delay to match card flipping
}

function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let confetti = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff6666', '#ffcc66', '#66ff66', '#66ccff', '#ff66ff'];

    function createConfetti() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * (Math.min(window.innerWidth, window.innerHeight) / 50) + 5,
            speedY: Math.random() * 3 + 2,
            zIndex: Math.random() < 0.5 ? -1 : 3 // Half confetti in background, half in foreground
        };
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            ctx.save();
            if (c.zIndex === -1) {
                ctx.globalCompositeOperation = 'destination-over'; // Behind elements
            } else {
                ctx.globalCompositeOperation = 'source-over'; // In front of elements
            }
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
            ctx.fillStyle = c.color;
            ctx.fill();
            ctx.restore();
        });
    }

    function updateConfetti() {
        confetti.forEach(c => {
            c.y += c.speedY;
            if (c.y > canvas.height) {
                c.y = -c.size;
                c.x = Math.random() * canvas.width;
            }
        });
    }

    function loop() {
        drawConfetti();
        updateConfetti();
        requestAnimationFrame(loop);
    }

    for (let i = 0; i < 100; i++) {
        confetti.push(createConfetti());
    }

    loop();
}

function typeWriter(text, index) {
    if (index < text.length) {
        document.getElementById("typedText").innerHTML += text.charAt(index);
        setTimeout(() => typeWriter(text, index + 1), 100); // Speed of the typewriter effect
    } else {
        isTyping = false; // Typing is done, allow interaction again
    }
}
