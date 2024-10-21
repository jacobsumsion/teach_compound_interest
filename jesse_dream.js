// jesse_dream.js

// Hide header on scroll
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        header.classList.add("hidden-header"); // Hide header when scrolling down
    } else {
        header.classList.remove("hidden-header"); // Show header when scrolling up
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Ensure no negative scroll
});

function changeSection(toSectionId) {
    // Hide all sections
    hideAllSections();

    // Show the next section and reset its content
    showSection(toSectionId);

    // Highlight the dot for the active section
    highlightActiveDot(toSectionId);

    // Reset non-standard elements for the new section
    resetNonStandardElements(toSectionId);
}

// Function to hide all sections
function hideAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
}

function showSection(sectionId) {
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        selectedSection.classList.add('active');

        resetSlides(sectionId);

        const sectionIndex = Object.keys(sectionsContent).indexOf(sectionId) + 1;
        const speechBubbleId = `speech-bubble-${sectionIndex}`;
        const imageId = `jesse-image-${sectionIndex}`;
        const buttonId = `next-text-button-${sectionIndex}`;
        reattachSlideClickListener(sectionId, speechBubbleId, imageId, buttonId);

        // Special case for section 7 (growth-chart)
        if (sectionId === 'growth-chart') {
            unhideChartInputs();  // Call this only for section 7
        }
    }
}


function resetNonStandardElements(sectionId) {
    if (sectionId === 'savings-plan') {
        const savingsInput = document.getElementById('savings-input');

        // Hide the savings input at the start of the section
        if (savingsInput) {
            savingsInput.classList.add('input-group-hidden');
            savingsInput.classList.remove('input-group-visible');
        }
    }

    if (sectionId === 'watch-money-grow') {
        const moneyballInputs = document.getElementById('moneyball-inputs');
        const moneyballContainer = document.getElementById('moneyball-container');
        const jesseImage = document.getElementById('jesse-image-5');
        const pushMoneyballButton = document.getElementById('push-moneyball-button');
        const compoundOutput = document.getElementById('compound-output');

        // Ensure inputs are hidden at the start
        if (moneyballInputs) {
            moneyballInputs.classList.add('input-group-hidden');
            moneyballInputs.classList.remove('input-group-visible');
        }

        // Ensure the moneyball container is hidden and the image is shown
        if (moneyballContainer) {
            moneyballContainer.classList.add('hidden');
        }
        if (jesseImage) {
            jesseImage.classList.remove('hidden');
        }

        // Ensure the push button and output are hidden
        if (pushMoneyballButton) {
            pushMoneyballButton.classList.add('input-group-hidden');
            pushMoneyballButton.classList.remove('input-group-visible');
        }

        if (compoundOutput) {
            compoundOutput.classList.add('input-group-hidden');
            compoundOutput.classList.remove('input-group-visible');
        }
    }
}

function resetSlides(sectionId) {
    currentSlide = 0; // Reset the slide index for this section

    // Generate the IDs for speech bubble, image, and button based on sectionId
    const sectionIndex = Object.keys(sectionsContent).indexOf(sectionId) + 1;
    const speechBubbleId = `speech-bubble-${sectionIndex}`;
    const imageId = `jesse-image-${sectionIndex}`;
    const buttonId = `next-text-button-${sectionIndex}`;

    // Reset the content to the first slide
    updateSectionContent(sectionId, speechBubbleId, imageId, buttonId);

    // Re-attach the event listener for progressing within the section
    reattachSlideClickListener(sectionId, speechBubbleId, imageId, buttonId);
}

// Function to re-attach slide click listeners
function reattachSlideClickListener(sectionId, speechBubbleId, imageId, buttonId) {
    const buttonElement = document.getElementById(buttonId);

    // Remove any existing event listeners
    buttonElement.replaceWith(buttonElement.cloneNode(true)); // This removes all listeners

    // Re-select the newly cloned button
    const newButtonElement = document.getElementById(buttonId);

    // Attach a fresh event listener for progressing within the section
    newButtonElement.addEventListener('click', function () {
        handleSlideClick(sectionId, speechBubbleId, imageId, buttonId);
    });
}

// Function to highlight the active dot based on the current section
function highlightActiveDot(sectionId) {
    // Remove the active class from all dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active-dot');
    });

    // Ensure the correct dot is highlighted based on the current section
    const activeDot = document.querySelector(`.dot[data-section="${sectionId}"]`);
    if (activeDot) {
        activeDot.classList.add('active-dot');
    }

    // Reset slides and reattach listeners after navigating with dots
    const sectionIndex = Object.keys(sectionsContent).indexOf(sectionId) + 1;
    const speechBubbleId = `speech-bubble-${sectionIndex}`;
    const imageId = `jesse-image-${sectionIndex}`;
    const buttonId = `next-text-button-${sectionIndex}`;
    
    // Reset slides and reattach listeners
    resetSlides(sectionId);
    reattachSlideClickListener(sectionId, speechBubbleId, imageId, buttonId);
}

// Navigation dot click event listener
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const sectionId = dot.getAttribute('data-section');
        changeSection(sectionId);
    });
});

// Contents of the speech-bubbles, buttons, and images for each section
const sectionsContent = {
    "meet-jesse": {
        texts: [
            "Hi there! I'm Jesse. Do you know what I <strong>DREAM</strong> about?",
            "I want to buy an actual, real-life, super cool - <strong>CAR</strong>!",
            "Cars are expensive, but I heard that there is a <strong>magic spell</strong> that can help me out. Do you want to learn the magic?"
        ],
        images: ["images/jesse_hello.webp", "images/jesse_car.webp", "images/jesse_asks.webp"],
        buttonText: ["Please tell me!", "Wow!", "Yes, I want to Learn" ],
        nextSection: "savings-plan"
    },
    "savings-plan": {
        texts: [
            "You probably already know the first part of this magic. Some people don't like it because it can be sweaty, gross, or <strong>BORING</strong>. Can you guess what it is?",
            "That's right, it's <strong>WORK</strong>! But don't give up just yet. Work is how we earn and save money. Even if it's hard, it will be <strong>AMAZING</strong>.",
            "How much money should I save each week? Click the <strong>'SAVE!'</strong> button to put money into savings.",
            "Watch how when we save each week, the money <strong>GROWS</strong> 52 times.<br> <strong>x 52!!</strong>", "Saving is like magic, but <strong>even more powerful</strong> magic is next."
        ],
        images: ["images/jesse_working.webp", "images/jesse_celebrate.webp", "images/jesse_bank.webp"],
        buttonText: ["Oh, no, don't tell me...", "Ok, let's save money!", "SAVE!", "Wow, We're RICH!", "Even MORE powerful?  What is it?"],
        nextSection: "jesse-investing"
    },
    "jesse-investing": {
        texts: [
            "<strong>First, let's review.</strong> We've worked hard to earn money.",
            "Now the <strong>REALLY AWESOME</strong> magic can happen!!",
            "We <strong>INVEST</strong> the money!",
            "Investing means we let our money grow <strong>ON ITS OWN</strong>!",
            "Do you want to see how it works?"
        ],
        images: [
            "images/jesse_bank.webp",
            "images/jesse_celebrate.webp",
            "images/jesse_invests.webp",
            "images/jesse_shocked.webp",
            "images/jesse_asks.webp"
        ],
        buttonText: ["Right, the first step is to save money.", "What is the magic??", "What is 'Investing'?", "Money can grow on its own??", "Show me how it works!"],
        nextSection: "compound-interest"
    },
    "compound-interest": {
        texts: [
            "THIS is the magic formula!",
            "Don't worry if it looks challenging, I'll help you to use it, <strong>NO PROBLEM</strong>!",
            "This formula is <strong>SIMPLE</strong>. It means to grow my money, I need <strong class='highlight'>3 ingredients</strong>.",
            'The "P" is called the "Principal".  Its the same word as the Principal of a school, but this is a different meaning.  Its the amount of money that I invest at the start.',
            'That little "r" is how fast my money grows. It\'s called the "rate".',
            'The little "t" is how long I let it invest before I spend it. "t" stands for "time".',
            "That's the whole magic spell!",
            'Oh, right! The "A" stands for the amount of money when the spell is done. In other words, the final pile of money.'
        ],
        images: [
            "images/jesse_celebrate.webp",
            "images/jesse_asks.webp",
            "images/jesse_asks.webp",
            "images/jesse_asks.webp",
            "images/jesse_running.webp",
            "images/jesse_bank.webp",
            "images/jesse_done.webp",
            "images/money_pile.webp"
        ],
        buttonText: [
            "That looks like MATH!",
            "Can you explain it?",
            "What are the 3 ingredients?",
            "P is the principal, or starting amount.",
            'Easy, "r" means the rate',
            'So "t" means time',
            'Wait, what is the "A"?',
            'Can you show me how it works?'
        ],
        nextSection: "watch-money-grow"
    },
    "watch-money-grow": {
        texts: [
            "Sure, in fact, would you like to see it in action?",
            "Investing is like rolling a snowball downhill. At first it starts small...",
            "As it rolls it gets bigger and bigger. You just have to start it rolling. It does the rest on its own.",
            "Investing is like that snowball, but it's a <strong>moneyball</strong>! It will grow all on its own.",
            "The investing magic needs those three ingredients: starting money, rate, and time",
            "Adjust the 3 ingredients then see what happens to the moneyball!",
            "Enter the ingredients and push the moneyball! Remember: A=P(1 + r)<sup>t<sup>"
        ],
        images: [
            "images/jesse_celebrate.webp",
            "images/jesse_snow.webp",
            "images/jesse_snow.webp",
            "images/moneyball.webp",
            "images/moneyball.webp",
            "images/jesse_asks.webp"
        ],
        buttonText: ["Lets do it!", "That seems fun.", "I want to try that.", "A giant ball of money?", "Got it!", "I'm ready.", "That was fun, thanks."],
        nextSection: "review"
    },
    "review": {
        texts: [
            "So lets see what you've learned so far...",
            "Not a test.  We learned that hard work is important.",
            "We can save money.",
            "Then we can invest that money.",
            "Money grows and grows when we invest it.",
            "In fact, investing is like creating a moneyball-friend that earns money for you, all the time.",
            "I'll show you how your moneyball can earn more for you than you could ever earn on your own..."
        ],
        images: [
            "images/jesse_asks.webp",
            "images/jesse_working.webp",
            "images/jesse_bank.webp",
            "images/jesse_invests.webp",
            "images/money_pile.webp",
            "images/jesse_done.webp",
            "images/jesse_done.webp"
        ],
        buttonText: ["Oh, no, a test??", "Work earns money.", "Yep!", "Thats the magic.", "Like the Moneyball!", "Thats a great friend!", "Show me the money!" ],
        nextSection: "growth-chart"
    },
    "growth-chart": {
        texts: [
            "Lets build a chart that will show us how the money grows over time.",
            "Enter the P, r, and t and you see how your money grows each year.",
            "I hope you learned a lot.  I know I did and now I can get my future car!  What do you want to save for someday?"
        ],
        images: [
            "images/jesse_asks.webp",
            "images/jesse_done.webp",
            "images/jesse_bugatti.webp"
        ],
        buttonText: ["Sounds fun!","It looks like a slide!","Start Over"],
        nextSection: null // Last section
    }
};

document.getElementById('start-button').addEventListener('click', function () {
    changeSection('meet-jesse');
});

let currentSlide = 0;

function updateSectionContent(sectionId, textId, imageId, buttonId) {
    const sectionContent = sectionsContent[sectionId];
    const speechBubble = document.getElementById(textId);
    const imageElement = document.getElementById(imageId);
    const buttonElement = document.getElementById(buttonId);

    // Update the visible text bubble
    speechBubble.innerHTML = sectionContent.texts[currentSlide]; // Update text

    // If the section is not "growth-chart", update the image element
    if (sectionId !== 'growth-chart') {
        const imageElement = document.getElementById(imageId);
        imageElement.src = sectionContent.images[currentSlide]; // Update image
    }

    // Update button text
    buttonElement.textContent = sectionContent.buttonText[currentSlide];

    // Check if the button text is "SAVE!" and the section is 'savings-plan'
    if (sectionId === 'savings-plan' && buttonElement.textContent === 'SAVE!') {
        buttonElement.addEventListener('click', function () {
            unhideSavingsInput();  // Unhide the savings-input when "SAVE!" button is clicked
        });
    }

    // Check if the button text is "I'm ready" and the section is 'watch-money-grow'
    if (sectionId === 'watch-money-grow' && buttonElement.textContent === "I'm ready.") {
        buttonElement.addEventListener('click', function () {
            unhideMoneyballInputs();  // Unhide the moneyball inputs when "I'm ready" is clicked
        });
    }

    // If it's section 4 (compound-interest), highlight the appropriate part of the formula
    if (sectionId === 'compound-interest') {
        highlightFormulaVariable(currentSlide);
    }

    // Increment to the next slide for the next click
    currentSlide++;

      // If we've reached the end of the slides, update the button to move to the next section
      if (currentSlide >= sectionContent.texts.length) {
        buttonElement.textContent = sectionContent.buttonText[sectionContent.buttonText.length - 1];
        buttonElement.removeEventListener('click', handleSlideClick); // Remove the current event listener

        // Add new event listener to move to the next section
        buttonElement.addEventListener('click', function () {
            // Special case for Growth Chart (section 7): Go back to 'meet-jesse' instead of next section
            if (sectionId === 'growth-chart') {
                changeSection('meet-jesse'); // Go back to the start
            } else if (sectionContent.nextSection) {
                changeSection(sectionContent.nextSection);  // Update to move to next section
            }
        });
    }
}

function unhideSavingsInput() {
    const savingsInput = document.getElementById('savings-input');
    const savingsPlanSection = document.getElementById('savings-plan');

    if (savingsInput) {
        savingsInput.classList.remove('input-group-hidden');
        savingsInput.classList.add('input-group-visible');

        // Add a specific class to the section when input-savings is shown
        savingsPlanSection.classList.add('input-savings-active');
    }
}

function unhideMoneyballInputs() {
    const moneyballInputs = document.getElementById('moneyball-inputs');
    const pushMoneyballButton = document.getElementById('push-moneyball-button');
    const moneyballContainer = document.getElementById('moneyball-container');
    const jesseImage = document.getElementById('jesse-image-5');
    const compoundOutput = document.getElementById('compound-output');

    if (moneyballInputs) {
        // Show inputs
        moneyballInputs.classList.remove('input-group-hidden');
        moneyballInputs.classList.add('input-group-visible');
        
        // Show the button
        pushMoneyballButton.classList.remove('input-group-hidden');
        pushMoneyballButton.classList.add('input-group-visible');

        // Hide the image and show the animation
        jesseImage.classList.add('hidden');
        moneyballContainer.classList.remove('hidden');

        // Show the output field
        compoundOutput.classList.remove('input-group-hidden');
        compoundOutput.classList.add('input-group-visible');

        // Move the button to the bottom
        moveButtonDown();
    }
}

function handleSlideClick(sectionId, textId, imageId, buttonId) {
    updateSectionContent(sectionId, textId, imageId, buttonId);
}

function highlightFormulaVariable(currentSlide) {
    const formulaBubble = document.getElementById('s4-formula-bubble');

    if (currentSlide === 3) {
        formulaBubble.innerHTML = "A = <strong class='highlight-p'>P</strong>(1 + r)<sup>t</sup>";
    } else if (currentSlide === 4) {
        formulaBubble.innerHTML = "A = P(1 + <strong class='highlight-r'>r</strong>)<sup>t</sup>";
    } else if (currentSlide === 5) {
        formulaBubble.innerHTML = "A = P(1 + r)<sup><strong class='highlight-t'>t</strong></sup>";
    } else if (currentSlide === 6) {
        formulaBubble.innerHTML = "<strong class='highlight-a'>A</strong> = P(1 + r)<sup>t</sup>";
    } else if (currentSlide === 7) {
        formulaBubble.innerHTML = "<strong class='highlight-a'>A</strong> = P(1 + r)<sup>t</sup>";
    } else {
        // Default case: reset the formula to a non-highlighted state
        formulaBubble.innerHTML = "A = P(1 + r)<sup>t</sup>";
    }
}


// Event listener for section 1: Meet Jesse
document.getElementById('next-text-button-1').addEventListener('click', function () {
    handleSlideClick('meet-jesse', 'speech-bubble-1', 'jesse-image-1', 'next-text-button-1');
});

// Event listener for section 2: Savings Plan
document.getElementById('next-text-button-2').addEventListener('click', function () {
    handleSlideClick('savings-plan', 'speech-bubble-2', 'jesse-image-2', 'next-text-button-2');
});

// Event listener for section 3: Jesse Investing
document.getElementById('next-text-button-3').addEventListener('click', function () {
    handleSlideClick('jesse-investing', 'speech-bubble-3', 'jesse-image-3', 'next-text-button-3');
});

// Event listener for section 4: Compound Interest
document.getElementById('next-text-button-4').addEventListener('click', function () {
    handleSlideClick('compound-interest', 'speech-bubble-4', 'jesse-image-4', 'next-text-button-4');
});

// Event listener for section 5: Watch Money Grow
document.getElementById('next-text-button-5').addEventListener('click', function () {
    handleSlideClick('watch-money-grow', 'speech-bubble-5', 'jesse-image-5', 'next-text-button-5');
});

// Event listener for section 6: review
document.getElementById('next-text-button-6').addEventListener('click', function () {
    handleSlideClick('review', 'speech-bubble-6', 'jesse-image-6', 'next-text-button-6');
});

// Event listener for section 7: Growth Chart
document.getElementById('next-text-button-7').addEventListener('click', function () {
    handleSlideClick('growth-chart', 'speech-bubble-7', 'jesse-image-7', 'next-text-button-7');
});

// Dynamically update yearly savings as user types
document.getElementById('weekly-savings').addEventListener('input', function() {
    const weeklyAmount = parseFloat(this.value);
    const yearlyResult = document.getElementById('yearly-result');

    if (!isNaN(weeklyAmount) && weeklyAmount > 0) {
        const yearlySavings = weeklyAmount * 52;
        yearlyResult.textContent = yearlySavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

        // Add animation class
        yearlyResult.classList.add('animate');

        // Remove the animation class after a short delay
        setTimeout(() => {
            yearlyResult.classList.remove('animate');
        }, 800);

    } else {
        yearlyResult.textContent = '0.00';
    }
});

function moveButtonDown() {
    const button = document.getElementById('next-text-button-5');
    if (button) {
        button.classList.add('force-down');
    }
}

// Function to add highlighting on focus for the speech bubble in Section 5
function addSection5InputFocusHighlight() {
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');
    const section5Bubble = document.getElementById('speech-bubble-5'); // Speech bubble in Section 5

    // Define the formula with highlightable placeholders for P, r, t
    const defaultFormula = "Enter the ingredients and push the moneyball! Remember: A=P(1 + r)<sup>t</sup>";

    // Event listener for principal input
    principalInput.addEventListener('focus', function() {
        section5Bubble.innerHTML = "Enter the ingredients and push the moneyball! Remember: A=<strong class='highlight-p'>P</strong>(1 + r)<sup>t</sup>";
    });
    principalInput.addEventListener('blur', function() {
        section5Bubble.innerHTML = defaultFormula; // Reset formula on blur
    });

    // Event listener for rate input
    rateInput.addEventListener('focus', function() {
        section5Bubble.innerHTML = "Enter the ingredients and push the moneyball! Remember: A=P(1 + <strong class='highlight-r'>r</strong>)<sup>t</sup>";
    });
    rateInput.addEventListener('blur', function() {
        section5Bubble.innerHTML = defaultFormula; // Reset formula on blur
    });

    // Event listener for time input
    timeInput.addEventListener('focus', function() {
        section5Bubble.innerHTML = "Enter the ingredients and push the moneyball! Remember: A=P(1 + r)<sup><strong class='highlight-t'>t</strong></sup>";
    });
    timeInput.addEventListener('blur', function() {
        section5Bubble.innerHTML = defaultFormula; // Reset formula on blur
    });
}

// Call the function when Section 5 is initialized
document.addEventListener('DOMContentLoaded', function() {
    addSection5InputFocusHighlight(); // Attach focus event listeners when DOM is loaded
});

// Function to calculate compound interest
function calculateCompoundInterest(P, r, t) {
    return P * Math.pow(1 + r, t);  // A = P(1 + r)^t
}

// Function to reset the moneyball after the animation ends
function resetMoneyball(moneyball) {
    // Remove animation style after it finishes
    moneyball.style.animation = 'none';
    
    // Force reflow to restart the animation (if needed)
    moneyball.offsetHeight; // This line is necessary to trigger a reflow, allowing a fresh animation

    // Reset the size to the default hardcoded size (40px by 40px)
    moneyball.style.width = '40px';
    moneyball.style.height = '40px';

    // Reset size to the initial size
    moneyball.style.transform = 'scale(1)';
}

// Function to gradually increase the final amount display
function animateFinalAmount(finalAmount, duration) {
    const finalAmountElement = document.getElementById('final-amount');
    let currentAmount = 0;
    const increment = finalAmount / (duration * 100); // Calculate the amount to increase per interval
    const intervalDuration = 10; // Update the display every 10 milliseconds
    
    const intervalId = setInterval(() => {
        currentAmount += increment; // Increase the displayed amount
        if (currentAmount >= finalAmount) {
            currentAmount = finalAmount; // Ensure it stops exactly at the final amount
            clearInterval(intervalId);   // Stop the interval when the target is reached
        }
        finalAmountElement.textContent = currentAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }, intervalDuration);
}

// Run the moneyball animation with 'Push the Moneyball' click
document.getElementById('push-moneyball-button').addEventListener('click', function () {
    // Get user input values
    const PInput = parseFloat(document.getElementById('principal').value); // Keep uncapped value for calculation
    const r = parseFloat(document.getElementById('rate').value);
    let t = parseFloat(document.getElementById('time').value);

    // Check if the inputs are valid
    if (isNaN(PInput) || isNaN(r) || isNaN(t)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Cap time (t) to 12 seconds max for the animation, but preserve the original t for calculation
    let animationTime = t;
    if (animationTime > 12) {
        animationTime = 12; // Use animationTime for the animation duration
    }

    // Calculate the compound interest final amount using the original uncapped PInput and t
    const finalAmount = calculateCompoundInterest(PInput, r, t); // Use original PInput for calculation
    
    // Dynamically scale the starting size for animation based on PInput
    let PForAnimation;
    
    // If PInput is small, ensure the size is at least 20px
    if (PInput <= 50) {
        PForAnimation = 20 + PInput * 0.2;  // Scale small amounts up slightly for better visibility
    } else {
        // For larger values, scale proportionally but cap the starting size
        PForAnimation = Math.min(PInput * 0.2, 500); // Cap large values at 500px
    }
    
    const moneyball = document.getElementById('moneyball');
    moneyball.style.width = `${PForAnimation}px`; // Starting size based on dynamic scaling
    moneyball.style.height = `${PForAnimation}px`;

    // Reset the animation if it's been run before
    resetMoneyball(moneyball);

    // Dynamically create keyframes for growth based on rate and time
    let scaleFactor = 1 + r * 40; // Growth influenced by r, no cap on the scale

    let animationKeyframes = `
        @keyframes growMoneyball {
            0% { transform: scale(1); }
            100% { transform: scale(${scaleFactor}); } /* Uncapped growth */
        }
    `;

    // Inject keyframes into a new <style> element
    let styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = animationKeyframes;
    document.head.appendChild(styleSheet);

    // Apply the animation with a dynamic duration based on animationTime
    moneyball.style.animation = `growMoneyball ${animationTime}s ease-in-out 1`;

    // Reset the moneyball to its initial size after the animation ends
    setTimeout(() => {
        resetMoneyball(moneyball); // Reset size after animation finishes
    }, animationTime * 1000);

    // Start the final amount increment animation in sync with the ball animation
    animateFinalAmount(finalAmount, animationTime);
});

function unhideChartInputs() {
    const chartCanvas = document.getElementById('compound-interest-chart');
    const reviewInput = document.getElementById('chart-inputs');

    if (chartCanvas && reviewInput) {
        // Unhide the canvas and inputs
        chartCanvas.classList.remove('hidden');
        chartCanvas.classList.add('visible');
        reviewInput.classList.remove('hidden');
        reviewInput.classList.add('visible');

        // Initialize the chart (only if it hasn't already been initialized)
        if (!window.myChart) {
            window.myChart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: [], // You can fill this dynamically based on input (e.g., years)
                    datasets: [{
                        label: 'Compound Interest Growth',
                        data: [],  // Fill this based on input (calculated values for each year)
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Years'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Amount ($)'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
}

function updateChart() {
    const principal = parseFloat(document.getElementById('principal-chart').value);
    const rate = parseFloat(document.getElementById('rate-chart').value);
    const time = parseFloat(document.getElementById('time-chart').value);

    if (!isNaN(principal) && !isNaN(rate) && !isNaN(time)) {
        // Generate labels for each year
        const labels = Array.from({ length: time }, (_, i) => i + 1);
        const data = labels.map(year => calculateCompoundInterest(principal, rate, year));

        // Update chart labels and data
        window.myChart.data.labels = labels;
        window.myChart.data.datasets[0].data = data;
        window.myChart.update();
    }
}

// Attach event listeners to update chart when inputs change
document.getElementById('principal-chart').addEventListener('input', updateChart);
document.getElementById('rate-chart').addEventListener('input', updateChart);
document.getElementById('time-chart').addEventListener('input', updateChart);


