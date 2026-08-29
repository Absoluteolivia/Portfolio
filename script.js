/**
 * Olivia Das - Personal Portfolio Interactive Logic
 * Backend Developer & Computer Science Student
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. HERO TYPING EFFECT
    // -------------------------------------------------------------------------
    const typingElement = document.getElementById('typing');
    if (typingElement) {
        const roles = [
            "Backend Developer",
            "Python & Django Specialist",
            "REST API Engineer",
            "SQL & Database Developer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 110;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 1800; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 400; // Pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // -------------------------------------------------------------------------
    // 2. INTERACTIVE TERMINAL TABS
    // -------------------------------------------------------------------------
    const termTabs = document.querySelectorAll('.term-tab');
    const termContents = document.querySelectorAll('.term-content');

    termTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTabId = tab.getAttribute('data-tab');

            termTabs.forEach(t => t.classList.remove('active'));
            termContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------------------
    // 3. ARCHITECTURE CASE STUDY MODAL
    // -------------------------------------------------------------------------
    const archModal = document.getElementById('archModal');
    const openArchModalBtn = document.getElementById('openArchModal');
    const closeArchModalBtn = document.getElementById('closeArchModal');

    function openModal() {
        if (archModal) {
            archModal.classList.add('active');
            archModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (archModal) {
            archModal.classList.remove('active');
            archModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (openArchModalBtn) {
        openArchModalBtn.addEventListener('click', openModal);
    }

    if (closeArchModalBtn) {
        closeArchModalBtn.addEventListener('click', closeModal);
    }

    if (archModal) {
        archModal.addEventListener('click', (e) => {
            if (e.target === archModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && archModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // -------------------------------------------------------------------------
    // 4. MOBILE NAVIGATION DRAWER
    // -------------------------------------------------------------------------
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        const isOpen = navLinks.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        navLinks.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.querySelector('i').className = 'fa-solid fa-xmark';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.querySelector('i').className = 'fa-solid fa-bars';
        document.body.style.overflow = '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    navLinkItems.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // -------------------------------------------------------------------------
    // 5. ACTIVE NAVIGATION SCROLL OBSERVER
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // -------------------------------------------------------------------------
    // 6. BACK TO TOP BUTTON
    // -------------------------------------------------------------------------
    const topBtn = document.getElementById('topBtn');

    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------------------
    // 7. CONTACT FORM VALIDATION & HANDLING
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            // Reset errors
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));

            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('error');
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('error');
                isValid = false;
            }

            // Validate Subject
            if (!subjectInput.value.trim()) {
                subjectInput.parentElement.classList.add('error');
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Show clean success status
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been received. Opening mail client for direct send...';
                    formStatus.style.display = 'block';
                }

                // Construct mailto link to facilitate real email delivery
                const mailtoUrl = `mailto:absoluteolivia03@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=${encodeURIComponent("From: " + nameInput.value + " (" + emailInput.value + ")\n\n" + messageInput.value)}`;

                setTimeout(() => {
                    window.location.href = mailtoUrl;
                }, 800);

                contactForm.reset();
            }
        });
    }
});