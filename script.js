document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const buttonContainer = document.querySelector('.button-container');
    const firstQuestion = document.getElementById('first-question');
    const secondQuestion = document.getElementById('second-question');
    const availabilityOptions = document.getElementById('availability-options');
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
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        secondQuestion.style.display = 'block';
        availabilityOptions.style.display = 'block';
    });

    // Availability next button functionality
    availabilityNextBtn.addEventListener('click', () => {
        const availability = document.getElementById('availability-select').value;
        if (!['this-week', 'next-week', 'next-to-next-week', 'next-month'].includes(availability)) {
            alert('Seriously?');
            return;
        }
        secondQuestion.style.display = 'none';
        availabilityOptions.style.display = 'none';
        thirdQuestion.style.display = 'block';
        activityOptions.style.display = 'block';
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
        activityOptions.style.display = 'none';
        finalMessage.style.display = 'block';

        // Send email (pseudo implementation)
        sendEmail(availability, selectedActivities);
    });

    function sendEmail(availability, activities) {
    emailjs.send("your_service_id", "your_template_id", {
        availability: availability,
        activities: activities.join(', '),
        to_name: 'Her Name',
        from_name: 'Your Name',
        to_email: 'her-email@example.com',
        from_email: 'your-email@example.com'
    }).then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}

});
