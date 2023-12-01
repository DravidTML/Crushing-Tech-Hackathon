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