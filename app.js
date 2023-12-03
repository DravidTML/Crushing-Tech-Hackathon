document.addEventListener('DOMContentLoaded', function () {
    // Initial progress value
    const initialProgress = 0;

    // Set initial progress
    setProgress(initialProgress);
});

// Function to toggle completion of a step and update progress
function toggleStep(stepNumber) {
    const imgId = `step${stepNumber}Img`;
    const currentImg = document.getElementById(imgId);
    const currentStep = document.getElementById(`step-${stepNumber}-cont`);
    const currentStepInfo = currentStep.querySelector(`.step-info`);
    const next = `${stepNumber + 1}`;
    
    // Check if backgroundImage is empty
    if (!currentImg.style.backgroundImage) {
    currentImg.style.backgroundImage = 'url(\'/images/dotted-loading.svg\')';
    }

    // Delay the transition by 10 milliseconds
    setTimeout(() => {
        // Toggle between dotted-loading.svg and check.svg
        if (currentImg.style.backgroundImage.includes('dotted-loading.svg')) {
            currentImg.style.backgroundImage = 'url(\'/images/check.svg\')';
            if (next < 6){
                const nextStep = document.getElementById(`step-${next}-cont`);
                const nextStepInfo = nextStep.querySelector(`.step-info`);
                console.log(nextStep);

                if (nextStepInfo.classList.contains("hide") && !currentStepInfo.classList.contains("hide")) {
                    showHideStep(next);
                }
                else if (nextStepInfo.classList.contains("hide") && currentStepInfo.classList.contains("hide")) {
                    showHideStep(next);
                }
        
            } else{
                if (!currentStepInfo.classList.contains("hide")){
                    showHideStep(stepNumber);
                }
            }
        } else {
            currentImg.style.backgroundImage = 'url(\'/images/dotted-loading.svg\')';
        }

        // Update progress based on completed steps
        updateProgress();
    }, 10);
}


// Function to update progress based on completed steps
function updateProgress() {
    const completedSteps = document.querySelectorAll('.status-img[style*="check.svg"]').length;
    const totalSteps = 5;
    const newProgress = (completedSteps / totalSteps) * 100;

    // Update progress bar
    setProgress(newProgress);

    // Update completed steps text
    document.getElementById('completed-steps').textContent = `${completedSteps}/${totalSteps} completed`;
}

// Function to set the progress dynamically
function setProgress(value) {
    const progressBar = document.getElementById('progress');
    progressBar.style.width = value + '%';
}

//Function to show and hide all step guides
function showHideGuide(){
    const guide = document.querySelector('.guide-body');
    const trigImg = document.getElementById('guide');

    if (guide.classList.contains('hide')) {
        guide.classList.remove('hide');
        trigImg.style.backgroundImage = 'url(\'/images/collapse.svg\')';
    } else {
        guide.classList.add('hide');
        trigImg.style.backgroundImage = 'url(\'/images/expand.svg\')';
    }
}

var isShown = false;

//Function to show and hide step guide body
function showHideStep(stepnumber){
    const stepHideImg= document.querySelector(`.step-${stepnumber}-img`);
    const stepHideButton= document.querySelector(`.step-${stepnumber}-button`);
    const stepHideInfo= document.querySelector(`.step-${stepnumber}-info`);
    const stepCont = document.getElementById(`step-${stepnumber}-cont`);
    const allImg= document.querySelectorAll(".step-image");
    const allButton= document.querySelectorAll(".step-button");
    const allInfo= document.querySelectorAll(".step-info");
    const allSteps = document.querySelectorAll(".step");
    console.log(allImg);

    if (isShown == false){
        stepHideImg.classList.remove("hide");
        stepHideButton.classList.remove("hide");
        stepHideInfo.classList.remove("hide");
        stepCont.style.backgroundColor = "#F3F3F3";
        isShown = true;
    } else if (isShown==true && stepHideInfo.classList.contains("hide")) {
        allImg.forEach(img => img.classList.add("hide"));
        allButton.forEach(button => button.classList.add("hide"));
        allInfo.forEach(info => info.classList.add("hide"));
        allSteps.forEach(step => {
            step.style.backgroundColor = "";
        });
        stepHideImg.classList.remove("hide");
        stepHideButton.classList.remove("hide");
        stepHideInfo.classList.remove("hide");
        stepCont.style.backgroundColor = "#F3F3F3";
        isShown = true;
    }
    else if (isShown==true && !stepHideInfo.classList.contains("hide")) {
        allImg.forEach(img => img.classList.add("hide"));
        allButton.forEach(button => button.classList.add("hide"));
        allInfo.forEach(info => info.classList.add("hide"));
        stepCont.style.backgroundColor = "";
        isShown = false;
    }
}

function hide(elementClass){
    const hideEle = document.querySelector(`.${elementClass}`);
    hideEle.classList.add("hide");
}

var menuPopUp = document.getElementById("menu");
var alertPopUp = document.getElementById("alert");
var menuBtn = document.getElementById("menu-btn");
var alertBtn = document.getElementById("alert-btn");

function showPopUp(pop){
    const popUp = document.getElementById(`${pop}`);
    const popUpBtn = document.getElementById(`${pop}-btn`);
    
    if (popUp == menuPopUp) {
        popUp.classList.remove("hide");
        alertPopUp.classList.add("hide");
        alertBtn.style.backgroundColor = `var(--gray-200)`;
    } else if (popUp == alertPopUp) {
        popUp.classList.remove("hide");
        menuPopUp.classList.add("hide");
        menuBtn.style.backgroundColor = `var(--gray-200)`;
    }
    popUpBtn.style.backgroundColor =`var(--gray-50)`;
}

document.addEventListener('click', event=> {
    // Check if the clicked element is outside the popup
    if (!menuPopUp.classList.contains("hide") && !menuBtn.contains(event.target) ) {
        menuPopUp.classList.add("hide");
        menuBtn.style.backgroundColor = `var(--gray-200)`;
    }
    if (!alertPopUp.classList.contains("hide") && !alertBtn.contains(event.target)) {
        alertPopUp.classList.add("hide");
        alertBtn.style.backgroundColor = `var(--gray-200)`;
    }
})

alertBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = 'var(--gray-50)';
});

menuBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = 'var(--gray-50)';
});

// Reset the background color when the mouse leaves the element
menuBtn.addEventListener('mouseleave', function() {
    if (menuPopUp.classList.contains("hide")) {
        this.style.backgroundColor = `var(--gray-200)`;
    }
});

alertBtn.addEventListener('mouseleave', function() {
    if (alertPopUp.classList.contains("hide")) {
        this.style.backgroundColor = `var(--gray-200)`;
    }
});

function url(url) {
    const page = `https://${url}`;

    window.open(page, '_blank')
}