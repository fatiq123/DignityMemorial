// Dropdown functionality
class DropdownManager {
    constructor(btnId, dropdownId, arrowId) {
        this.btn = document.getElementById(btnId);
        this.dropdown = document.getElementById(dropdownId);
        this.arrow = document.getElementById(arrowId);
        this.isOpen = false;
        this.init();
    }

    init() {
        this.btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        this.dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    open() {
        this.dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-2');
        this.dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
        this.arrow.classList.add('rotate-180');
        this.isOpen = true;
    }

    close() {
        this.dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
        this.dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
        this.arrow.classList.remove('rotate-180');
        this.isOpen = false;
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            // Close other dropdowns first
            dropdowns.forEach(d => {
                if (d !== this && d.isOpen) {
                    d.close();
                }
            });
            this.open();
        }
    }
}

// Array to hold dropdown instances
let dropdowns = [];

// Function to load components
function loadComponent(id, url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`${id} not found`);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error(`Error loading ${id}:`, error));
}

// Load header and initialize dropdowns
loadComponent('header', './components/header.html', function() {
    const planDropdown = new DropdownManager('planDropdownBtn', 'planDropdown', 'planDropdownArrow');
    const resourcesDropdown = new DropdownManager('resourcesDropdownBtn', 'resourcesDropdown', 'resourcesDropdownArrow');
    dropdowns = [planDropdown, resourcesDropdown];

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            if (dropdown.isOpen && !dropdown.dropdown.contains(e.target) && !dropdown.btn.contains(e.target)) {
                dropdown.close();
            }
        });
    });

    // Close dropdowns on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                if (dropdown.isOpen) {
                    dropdown.close();
                }
            });
        }
    });
});

// Load hero and initialize search
loadComponent('hero', './components/hero.html', function() {
    const heroDiv = document.getElementById('hero');
    const heroSearchInput = heroDiv.querySelector('input[placeholder="Find an obituary or location"]');
    const searchButton = heroDiv.querySelector('button[class*="bg-teal-400"]');

    if (heroSearchInput) {
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performHeroSearch();
            }
        });
    }
    if (searchButton) {
        searchButton.addEventListener('click', performHeroSearch);
    }
});

// Load plan-ahead-and-save-section and initialize button
loadComponent('plan-ahead-and-save-section', './components/plan-ahead-and-save-section.html', function() {
    const section = document.getElementById('plan-ahead-and-save-section');
    const actNowButton = section.querySelector('button'); // Adjust selector if needed
    if (actNowButton) {
        actNowButton.addEventListener('click', function() {
            alert('Pre-planning functionality would be implemented here');
        });
    }
});

// Load find-provider-section and initialize location search
loadComponent('find-provider-section', './components/find-provider-section.html', function() {
    const section = document.getElementById('find-provider-section');
    const locationSearchInput = section.querySelector('input[placeholder="City, state or postal code"]');
    const searchButton = section.querySelector('button[class*="bg-white hover:bg-gray-50"]');

    if (locationSearchInput) {
        locationSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performLocationSearch();
            }
        });
    }
    if (searchButton) {
        searchButton.addEventListener('click', performLocationSearch);
    }
});

// Load plan-a-cremation-section and initialize buttons
loadComponent('plan-a-cremation-section', './components/plan-a-cremation-section.html', function() {
    const section = document.getElementById('plan-a-cremation-section');
    const cremationButtons = section.querySelectorAll('button'); // Adjust selector if needed
    const topics = ['cremation costs', 'choosing a provider', 'what to do with ashes'];

    cremationButtons.forEach((button, index) => {
        if (button.textContent.includes('LEARN MORE')) {
            button.addEventListener('click', function() {
                alert(`Learn more about ${topics[index] || 'cremation'} functionality would be implemented here`);
            });
        }
    });

    const viewAllButton = section.querySelector('button'); // Adjust selector if needed
    if (viewAllButton && viewAllButton.textContent.includes('VIEW ALL ARTICLES')) {
        viewAllButton.addEventListener('click', function() {
            alert('View all cremation articles functionality would be implemented here');
        });
    }
});

// Load remaining components without interactivity (or add callbacks as needed)
loadComponent('celebration-of-life-section', './components/celebration-of-life-section.html');
loadComponent('planning-a-head-section', './components/planning-a-head-section.html');
loadComponent('cemetery-and-cremation-property', './components/cemetery-and-cremation-property.html');
loadComponent('form-section', './components/form-section.html');
loadComponent('about-dignity-memorial', './components/about-dignity-memorial.html');
loadComponent('latest-from-our-newsletter-section', './components/latest-from-our-newsletter-section.html');
loadComponent('featured-customer-testimonials-section', './components/featured-customer-testimonials-section.html');
loadComponent('newsletter-section', './components/newsletter-section.html');
loadComponent('video-section', './components/video-section.html');
loadComponent('footer', './components/footer.html');
loadComponent('copy-right-footer', './components/copy-right-footer.html');


// nested pages code goes from here
loadComponent('find-locations-section', './components/location/find-locations.html');


// Search functions
function performHeroSearch() {
    const input = document.querySelector('#hero input[placeholder="Find an obituary or location"]');
    const query = input ? input.value.trim() : '';
    if (query) {
        console.log('Hero searching for:', query);
        alert('Hero search functionality would be implemented here for: ' + query);
    }
}

function performLocationSearch() {
    const input = document.querySelector('#find-provider-section input[placeholder="City, state or postal code"]');
    const query = input ? input.value.trim() : '';
    if (query) {
        console.log('Location searching for:', query);
        alert('Location search functionality would be implemented here for: ' + query);
    }
}

