const dhtmlText = document.getElementById('dhtml-text')
const heroTitle = document.getElementById('hero-title')
const form = document.getElementById('application-form')
const formLog = document.getElementById('form-log')
const toggleContentBtn = document.getElementById('toggle-content-btn')
const modal = document.getElementById('myModal')
const modalImage = document.getElementById('modal-image')
const modalTitle = document.getElementById('modal-title')
const modalDescription = document.getElementById('modal-description')
const messageTextarea = document.getElementById('message')
const wordCountSpan = document.getElementById('word-count')

const wordLimit = 50
const currentFontSize = 1.125
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\d{10}$/
const userRegex = /^[A-Za-z]+$/

const initialText = `<p>Welcome, rookie racers! The Rust-eze Racing Academy is more than just a training facility; it's a family. Founded by the legendary Lightning McQueen, our mission is to prepare the next generation of champions for the high-stakes world of the Piston Cup. From learning advanced driving techniques to mastering the art of a quick pit stop, you'll be taught by the best in the business.</p>
                    <p id="more-content" class="hidden-content">Our curriculum is designed to push you to your limits, just as Doc Hudson pushed Lightning. We believe in speed, precision, and most importantly, heart. The road to success is long and filled with challenges, but with the right mentorship and a lot of horsepower, you can reach the finish line. Are you ready to rev your engines?</p>`;
  
const wrapWords = text => text.replace(/<p(.*?)>(.*?)<\/p>/g, (_, p1, p2) => 
    `<p${p1}>${p2.split(/\s+/).map(word => `<span class="highlight-word" data-word="${word.replace(/[^A-Za-z0-9]/g, '')}">${word}</span>`).join(' ')}</p>`
);

const changeTextColor = color => { 
    dhtmlText.classList.remove('text-red-500', 'text-yellow-500'); 
    if (color === 'red') dhtmlText.classList.add('text-red-500');
     else if (color === 'yellow') dhtmlText.classList.add('text-yellow-500'); 
};

const increaseFontSize = () => { 
    dhtmlText.style.fontSize = `${parseFloat(dhtmlText.style.fontSize) + 0.1}rem`; 
};

const decreaseFontSize = () => { 
    dhtmlText.style.fontSize = `${parseFloat(dhtmlText.style.fontSize) - 0.1}rem`;
};

const toggleFontWeight = () => dhtmlText.classList.toggle('bold-text');
const toggleFontStyle = () => dhtmlText.classList.toggle('italic-text');
const toggleUnderline = () => dhtmlText.classList.toggle('underline-text');
const toggleOverline = () => dhtmlText.classList.toggle('overline-text');
const toggleStrikethrough = () => dhtmlText.classList.toggle('strikethrough-text');

const resetStyles = () => { 
    dhtmlText.classList.remove('text-red-500', 'text-yellow-500', 'bold-text', 'italic-text', 'underline-text', 'overline-text', 'strikethrough-text'); 
    dhtmlText.style.fontSize = '1.125rem'; 
};

const openModal = element => {
    modal.style.display = 'flex';
    modalImage.src = element.src;
    modalImage.alt = element.alt;
    modalTitle.textContent = element.alt;
    modalTitle.style.color = "white";
    modalDescription.textContent = element.dataset.description;
};

const closeModal = () => { 
    modal.style.display = 'none';
    modalImage.src = '';
    modalImage.alt = '';
    modalTitle.textContent = '';
    modalDescription.textContent = '';
};

const updateClock = () => {
    const now = new Date();
    const [h, m, s] = [now.getHours(), now.getMinutes(), now.getSeconds()].map(val => val.toString().padStart(2, '0'));
    document.getElementById('real-time-clock').textContent = `${h}:${m}:${s}`;
};

document.addEventListener('DOMContentLoaded', () => {
    dhtmlText.innerHTML = wrapWords(initialText);
    toggleContentBtn.addEventListener('click', () => {
        const moreContent = dhtmlText.querySelector('#more-content');
        if (moreContent) {
            moreContent.classList.toggle('hidden-content');
            toggleContentBtn.textContent = moreContent.classList.contains('hidden-content') ? 'Read More' : 'Read Less';
        }
    });

    heroTitle.addEventListener('mouseover', () => {
         heroTitle.style.color = 'yellow';
          heroTitle.style.transform = 'scale(1.05)';
    });

    heroTitle.addEventListener('mouseout', () => {
        heroTitle.style.color = '';
        heroTitle.style.transform = 'scale(1)';
    });

    messageTextarea.addEventListener('input', () => {
        wordCountSpan.textContent = (messageTextarea.value.match(/\b\S+\b/g) || []).length;
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        document.querySelectorAll('.form-error').forEach(msg => msg.style.display = 'none');
        const wordsInMessage = (messageTextarea.value.match(/\b\S+\b/g) || []).length;
        let isValid = wordsInMessage <= wordLimit;
        const formData = new FormData(form), data = {};
        if (!isValid) {
            document.getElementById('message-error').textContent = `Please limit your message to ${wordLimit} words.`;
            document.getElementById('message-error').style.display = 'block';
        }
        for (const [key, value] of formData.entries()) {

            data[key] = value.trim();
            let errorElement = null;
            
            if (key === 'full-name' && !userRegex.test(value.trim())) {
                errorElement = document.getElementById('name-error');
                isValid = false;
            }
            else if (key === 'email' && !emailRegex.test(value.trim())) {
                errorElement = document.getElementById('email-error');
                isValid = false;
            }
            else if (key === 'phone' && !phoneRegex.test(value.trim())) {
                errorElement = document.getElementById('phone-error');
                isValid = false;
            }
            else if (key === 'dob' && !value.trim()) {
                errorElement = document.getElementById('dob-error');
                isValid = false;
            }
            else if (key === 'favorite-car' && !value.trim()) {
                errorElement = document.getElementById('fav-car-error');
                isValid = false;
            }
            else if (key === 'message' && !value.trim()) {
                errorElement = document.getElementById('message-error');
                isValid = false;
            }
            if (errorElement) errorElement.style.display = 'block';
        }
        if (isValid) {
            if (formLog.querySelector('p.italic')) formLog.innerHTML = '';

            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.innerHTML =   `<h4>New Application Submitted!</h4>
                                    <p><strong>Name:</strong> ${data['full-name']}</p>
                                    <p><strong>Email:</strong> ${data['email']}</p>
                                    <p><strong>Phone:</strong> ${data['phone']}</p>
                                    <p><strong>Date of Birth:</strong> ${data['dob']}</p>
                                    <p><strong>Favorite Character:</strong> ${data['favorite-car']}</p>
                                    <p><strong>Message:</strong> ${data['message']}</p>
                                    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">Submitted at: ${new Date().toLocaleString()}</p>`;

            formLog.prepend(logEntry);
            form.reset();
            wordCountSpan.textContent = '0';
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(
            entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)
        );
    }, { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section')
            .forEach(section => observer.observe(section));
    updateClock();
    setInterval(updateClock, 1000);
});