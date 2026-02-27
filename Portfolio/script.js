// Theme Manager Class
class ThemeManager {
    constructor() {
        this.body = document.body;
        this.themeToggle = document.querySelector('.theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('i');
        
        // Check for saved theme preference or use default
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        // Set up event listener for theme toggle
        this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    }
    
    setTheme(theme) {
        if (theme === 'light') {
            this.body.classList.remove('dark-mode');
            this.body.classList.add('light-mode');
            this.themeIcon.className = 'fas fa-sun';
        } else {
            this.body.classList.remove('light-mode');
            this.body.classList.add('dark-mode');
            this.themeIcon.className = 'fas fa-moon';
        }
        
        // Save preference
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        if (this.body.classList.contains('dark-mode')) {
            this.setTheme('light');
        } else {
            this.setTheme('dark');
        }
    }
}

// Smooth Scroll Navigation Class
class SmoothScrollNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.page');
        this.header = document.querySelector('header');
        
        this.setupNavigation();
        this.setupScrollSpy();
        this.setupHeaderScroll();
    }
    
    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = this.header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupScrollSpy() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.updateActiveNav(sectionId);
                }
            });
        }, observerOptions);
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    updateActiveNav(sectionId) {
        this.navLinks.forEach(link => {
            const targetId = link.getAttribute('data-target');
            if (targetId === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setupHeaderScroll() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Scroll Animations Class
class ScrollAnimations {
    constructor() {
        this.animateOnScroll();
    }
    
    animateOnScroll() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('.page');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Observe portfolio items with stagger effect
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
        
        // Observe skill items with stagger effect
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
        
        // Observe certificate items with stagger effect
        const certificateItems = document.querySelectorAll('.certificate-item');
        certificateItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }
}

// Portfolio Filter Class
class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Set up event listeners
        this.filterButtons.forEach(button => {
            button.addEventListener('click', this.filterItems.bind(this));
        });
    }
    
    filterItems(e) {
        // Update active class on buttons
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Get filter value
        const filter = e.target.getAttribute('data-filter');
        
        // Show/hide items based on filter with animation
        this.portfolioItems.forEach((item, index) => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 10);
                }, index * 50);
            } else {
                item.classList.remove('visible');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Certificate Interactions Class
class CertificateInteractions {
    constructor() {
        this.certificateItems = document.querySelectorAll('.certificate-item');
        this.viewButtons = document.querySelectorAll('.view-certificate');
        
        // Add hover effects and click interactions
        this.setupInteractions();
    }
    
    setupInteractions() {
        // Add click listeners to view certificate buttons
        this.viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get the link to the certificate from the button's href attribute
                const certificateUrl = button.getAttribute('href');
                
                // Open the certificate in a new tab
                window.open(certificateUrl, '_blank');
            });
        });
    }
}

// Contact Form Class
class ContactForm {
    constructor() {
        this.form = document.getElementById('messageForm');
        
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const formValues = Object.fromEntries(formData.entries());
        
        // For demo purposes, just log the data
        console.log('Form submitted:', formValues);
        
        // Show success message
        alert('Message sent successfully!');
        
        // Reset form
        this.form.reset();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize classes
    const themeManager = new ThemeManager();
    const smoothScrollNavigation = new SmoothScrollNavigation();
    const scrollAnimations = new ScrollAnimations();
    const portfolioFilter = new PortfolioFilter();
    const certificateInteractions = new CertificateInteractions();
    const contactForm = new ContactForm();
    
    // Handle "My Works" button click - scroll to portfolio section
    const myWorksBtn = document.querySelector('.action-btn:first-child');
    if (myWorksBtn) {
        myWorksBtn.addEventListener('click', () => {
            const portfolioSection = document.getElementById('portfolio');
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = portfolioSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
    
    // Handle "Download CV" button click
    const downloadCVBtn = document.querySelector('.action-btn');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', () => {
            // Create link to CV file
            const link = document.createElement('a');
            link.href = 'assets/shreya_CV.pdf'; // Path to your CV file
            link.download = 'shreya_CV.pdf'; // Name for the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Handle resume download button
    const resumeDownloadBtn = document.querySelector('.download-btn');
    if (resumeDownloadBtn) {
        resumeDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Create link to CV file (same as above)
            const link = document.createElement('a');
            link.href = 'assets/Shreya_Resume.pdf'; // Path to your CV file
            link.download = 'Shreya_V_CV.pdf'; // Name for the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Add animation for CTA button - scroll to contact
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
    
    // Add animation for scroll indicator - scroll to next section
    const scrollIndicator = document.querySelector('.scroll-circle');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const portfolioSection = document.getElementById('about');
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = portfolioSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
    
    // Make first section visible immediately
    const firstSection = document.querySelector('.page');
    if (firstSection) {
        firstSection.classList.add('visible');
    }
});

// Form submission handler
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = new FormData(form);
        fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert("Thank you! Your message has been sent.");
                form.reset();
            } else {
                alert("Oops! There was a problem.");
            }
        });
    });
}