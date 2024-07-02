document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const buttonContainer = document.querySelector('.button-container');
    const firstQuestion = document.getElementById('first-question');
    const secondQuestion = document.getElementById('second-question');
    const availabilitySelect = document.getElementById('availability-select');
    const availabilityNextBtn = document.getElementById('availability-next-btn');
    const thirdQuestion = document.getElementById('third-question');
    const activityOptions = document.getElementById('activity-options');
    const activityNextBtn = document.getElementById('activity-next-btn');
    const finalMessage = document.getElementById('final-message');

    // No button hover and click functionality
    noBtn.addEventListener('mouseover', switchButtons);
    noBtn.addEventListener('click', switchButtons);

    function switchButtons() {
        const yesIndex = Array.prototype.indexOf.call(buttonContainer.children, yesBtn);
        const noIndex = Array.prototype.indexOf.call(buttonContainer.children, noBtn);

        if (yesIndex < noIndex) {
            buttonContainer.insertBefore(noBtn, yesBtn);
        } else {
            buttonContainer.insertBefore(yesBtn, noBtn);
        }
    }

    // Yes button functionality
    yesBtn.addEventListener('click', () => {
        firstQuestion.style.display = 'none';
        secondQuestion.style.display = 'block';
    });

    // Availability next button functionality
    availabilityNextBtn.addEventListener('click', () => {
        const availability = availabilitySelect.value;
        if (!['this-week', 'next-week', 'next-to-next-week', 'next-month'].includes(availability)) {
            alert('Seriously?');
            return;
        }
        secondQuestion.style.display = 'none';
        thirdQuestion.style.display = 'block';
    });

    // Activity next button functionality
    activityNextBtn.addEventListener('click', () => {
        const selectedActivities = Array.from(document.querySelectorAll('input[name="activity"]:checked'))
                                        .map(cb => cb.value);
        if (selectedActivities.length === 0 || selectedActivities.length > 2) {
            alert('Please select up to 2 activities.');
            return;
        }
        thirdQuestion.style.display = 'none';
        finalMessage.style.display = 'block';

        // Send email (pseudo implementation)
        sendEmail(availability, selectedActivities);
    });

    function sendEmail(availability, activities) {
        // Use a service like EmailJS or an API to send the email
        console.log('Sending email with:', availability, activities);
    }
});
