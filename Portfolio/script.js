// Router Class
class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentPage = null;
        
        // Add event listeners
        window.addEventListener('hashchange', this.hashChanged.bind(this));
        document.addEventListener('DOMContentLoaded', this.hashChanged.bind(this));
        
        // Setup navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-target');
                this.navigateTo(target);
            });
        });
    }
    
    hashChanged() {
        // Get the hash from the URL (remove the # symbol)
        const hash = window.location.hash.substring(1) || 'home';
        this.navigateTo(hash);
    }
    
    navigateTo(route) {
        // Update URL hash
        window.location.hash = route;
        
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the target page
        const targetPage = document.getElementById(route);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = route;
            
            // Update nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                const linkTarget = link.getAttribute('data-target');
                if (linkTarget === route) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
}

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
        
        // Show/hide items based on filter
        this.portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
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
    // Define routes
    const routes = [
        { path: 'home', element: document.getElementById('home') },
        { path: 'portfolio', element: document.getElementById('portfolio') },
        { path: 'about', element: document.getElementById('about') },
        { path: 'certificates', element: document.getElementById('certificates') },
        { path: 'resume', element: document.getElementById('resume') },
        { path: 'contact', element: document.getElementById('contact') }
    ];
    
    // Initialize classes
    const router = new Router(routes);
    const themeManager = new ThemeManager();
    const portfolioFilter = new PortfolioFilter();
    const certificateInteractions = new CertificateInteractions();
    const contactForm = new ContactForm();
    
    // Handle "My Works" button click - direct to portfolio section
    const myWorksBtn = document.querySelector('.action-btn:first-child');
    if (myWorksBtn) {
        myWorksBtn.addEventListener('click', () => {
            router.navigateTo('portfolio');
        });
    }
    
    // Handle "Download CV" button click
    const downloadCVBtn = document.querySelector('.action-btn.outline');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', () => {
            // Create link to CV file
            const link = document.createElement('a');
            link.href = 'assets/Shreya_V_CV.pdf'; // Path to your CV file
            link.download = 'Shreya_V_CV.pdf'; // Name for the downloaded file
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
            link.href = 'assets/Shreya_V_CV.pdf'; // Path to your CV file
            link.download = 'Shreya_V_CV.pdf'; //  name for the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Add animation for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            router.navigateTo('contact');
        });
    }
    
    // Add animation for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-circle');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            router.navigateTo('portfolio');
        });
    }
});
// Initialize EmailJS with your Public Key

  const form = document.querySelector("form");
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


