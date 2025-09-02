const dhtmlText = document.getElementById('dhtml-text')
const heroTitle = document.getElementById('hero-title')
const form = document.getElementById('application-form')
const formLog = document.getElementById('form-log')
const toggleContentBtn = document.getElementById('toggle-content-btn')
const modal = document.getElementById('myModal')
const modalImage = document.getElementById('modal-image')
const modalTitle = document.getElementById('modal-title')
const modalDescription = document.getElementById('modal-description')
const wordCountSpan = document.getElementById('word-count')

const name = document.getElementById('full-name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const dob = document.getElementById('dob')
const favoriteCar = document.getElementById('favorite-car')
const messageTextarea = document.getElementById('message')
const submitbtn = document.getElementById('submit')

const wordLimit = 50
const currentFontSize = 1.125
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\d{10}$/
const userRegex = /^[A-Za-z ]+$/

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
    
    name.addEventListener("blur", () => {
        if(userRegex.test(name.value.trim())) {
            email.removeAttribute('disabled');
            email.classList.remove('contains-disabled');
            name.classList.add('crt');
            document.getElementById('name-error').textContent = '';
        }else{
            document.getElementById('name-error').textContent = 'Please enter a valid name (letters only).';
            document.getElementById('name-error').style.display = 'block';
        }
    });
    email.addEventListener("blur", () => {
        if(emailRegex.test(email.value.trim())) {
            phone.removeAttribute('disabled');
            phone.classList.remove('contains-disabled');
            email.classList.add('crt');
            document.getElementById('email-error').textContent = '';
        }else{
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            document.getElementById('email-error').style.display = 'block';
        }
    });
    phone.addEventListener("blur", () => {
        if(phoneRegex.test(phone.value.trim())) {
            dob.removeAttribute('disabled');
            dob.classList.remove('contains-disabled');
            phone.classList.add('crt');
            document.getElementById('phone-error').textContent = ''
        }else{
            document.getElementById('phone-error').textContent = 'Please enter a valid 10-digit phone number.';
            document.getElementById('phone-error').style.display = 'block';
        }
    });
    dob.addEventListener("blur", () => {
        const today = new Date();
        const [today_date, today_month, today_year] = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        const formattedToday = `${today_year}-${String(today_month).padStart(2, '0')}-${String(today_date).padStart(2, '0')}`;
        if(formattedToday <= dob.value.trim()) {
            document.getElementById('dob-error').textContent = 'Please enter your date of birth.';
            document.getElementById('dob-error').style.display = 'block';
        }else{
             document.getElementById('dob-error').textContent = '';
            favoriteCar.removeAttribute('disabled');
            favoriteCar.classList.remove('contains-disabled');
            dob.classList.add('crt');
        }
    });
    favoriteCar.addEventListener("blur", () => {
        if(favoriteCar.value.trim()) {
            messageTextarea.removeAttribute('disabled');
            messageTextarea.classList.remove('contains-disabled');
            submitbtn.removeAttribute('disabled');
            submitbtn.classList.remove('contains-disabled');
            favoriteCar.classList.add('crt');
            document.getElementById('fav-car-error').textContent = '';
        }else{
            document.getElementById('fav-car-error').textContent = 'Please select your favorite Cars character.';
            document.getElementById('fav-car-error').style.display = 'block';
        }
    });
    messageTextarea.addEventListener("blur", () => {
        const wordsInMessage = (messageTextarea.value.match(/\b\S+\b/g) || []).length;
        let isValid = wordsInMessage <= wordLimit;
        messageTextarea.classList.add('crt');
        if (isValid) {
            submitbtn.addEventListener('click',() => {
                const formData = new FormData(form), data = {};

                for (const [key, value] of formData.entries()) {
                    data[key] = value.trim();
                }

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
                name.classList.remove('crt');
                email.setAttribute('style','disabled'); email.classList.add('contains-disabled'); email.classList.remove('crt');
                phone.setAttribute('style','disabled'); phone.classList.add('contains-disabled'); phone.classList.remove('crt');
                dob.setAttribute('style','disabled'); dob.classList.add('contains-disabled'); dob.classList.remove('crt');
                favoriteCar.setAttribute('style','disabled'); favoriteCar.classList.add('contains-disabled'); favoriteCar.classList.remove('crt');
                messageTextarea.setAttribute('style','disabled'); messageTextarea.classList.add('contains-disabled'); messageTextarea.classList.remove('crt');
                submitbtn.setAttribute('style','disabled'); submitbtn.classList.add('contains-disabled'); submitbtn.classList.remove('crt');
                wordCountSpan.textContent = '0';
                document.getElementById('message-error').textContent = '';
            });
        }else{
            document.getElementById('message-error').textContent = `Please limit your message to ${wordLimit} words.`;
            document.getElementById('message-error').style.display = 'block';
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