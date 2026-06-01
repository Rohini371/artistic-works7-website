// ================================
// ARTISTIC WORKS 7 - MINIMAL JS
// ================================

// Mobile Menu Toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Guard: in some pages (if any) navbar might be missing
const navbar = document.querySelector('.navbar');


// Toggle mobile menu
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Categories dropdown behavior
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
const dropdownItem = dropdownToggle ? dropdownToggle.closest('.nav-dropdown') : null;

if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dropdownItem.classList.toggle('open');
        dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
        if (!dropdownItem.contains(e.target) && !e.target.closest('.nav-dropdown-toggle')) {
            dropdownItem.classList.remove('open');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Auto-detect current page and mark nav link active (reusable across site)
document.addEventListener('DOMContentLoaded', () => {
    try {
        const path = window.location.pathname || '';
        let current = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
        if (!current || current === '') current = 'index.html';
        // normalize (remove query/hash)
        current = current.split(/[?#]/)[0];

        const normalize = (str) => (str || '').replace(/\.html$/i, '').toLowerCase();
        const currentBase = normalize(current);

        // Helpers to find activeable elements
        const homeLink = document.querySelector('.nav-link[href*="index.html"]');
        const workshopsLink = document.querySelector('.nav-link[href="workshops.html"]');
        const shopLink = document.querySelector('.nav-link[href="shop.html"]');
        const giftLink = document.querySelector('.nav-link[href="gift.html"]');
        const experiencesLink = document.querySelector('.nav-link[href="experiences.html"]');
        const aboutLink = document.querySelector('.nav-link[href*="about.html"]');
        const contactLink = document.querySelector('.nav-link[href="contact.html"]');

        // Categories dropdown toggle is a BUTTON (not an <a>)
        const categoriesToggle = document.querySelector('.nav-dropdown-toggle');

        // Dropdown item links are <a> inside .nav-dropdown-panel
        const dropdownPanel = document.querySelector('.nav-dropdown-panel');
        const dropdownItemGallery = document.querySelector('.nav-dropdown-panel a[href="gallery.html"]');
        const dropdownItemReviews = document.querySelector('.nav-dropdown-panel a[href="reviews.html"]');
        const dropdownItemFaq = document.querySelector('.nav-dropdown-panel a[href="faq.html"]');

        const clearAllActive = () => {
            // Clear ALL top nav active states including Home and Categories toggle
            document.querySelectorAll('.nav-link.active').forEach(el => el.classList.remove('active'));

            // If dropdown items can ever have active state, clear them too (they are also .nav-link? unlikely)
            document.querySelectorAll('.nav-dropdown-panel a.active').forEach(el => el.classList.remove('active'));
        };

        clearAllActive();

        const setTopActive = (el) => {
            if (el && el.classList) el.classList.add('active');
        };

        const setDropdownActive = (el) => {
            // Ensure dropdown item's active state is applied using the same .active class
            if (el && el.classList) el.classList.add('active');
        };

        // Categories subpages
        const isGallery = currentBase === 'gallery';
        const isReviews = currentBase === 'reviews';
        const isFaq = currentBase === 'faq';

        if (isGallery || isReviews || isFaq) {
            // Keep Categories active, never Home
            setTopActive(categoriesToggle);

            if (isGallery) setDropdownActive(dropdownItemGallery);
            else if (isReviews) setDropdownActive(dropdownItemReviews);
            else if (isFaq) setDropdownActive(dropdownItemFaq);

            // Explicitly ensure no home active remains
            if (homeLink) homeLink.classList.remove('active');
            return;
        }

        // Home page (index.html)
        if (currentBase === 'index') {
            setTopActive(homeLink);
            // Categories must NOT be active
            setTopActive(null);
            if (categoriesToggle) categoriesToggle.classList.remove('active');
            return;
        }

        // Main pages: exactly one top item active
        const pageMap = {
            workshops: workshopsLink,
            shop: shopLink,
            gift: giftLink,
            experiences: experiencesLink,
            about: aboutLink,
            contact: contactLink
        };

        const activeEl = pageMap[currentBase] || null;
        setTopActive(activeEl);

        // Ensure categories and home are not active on main pages
        if (categoriesToggle) categoriesToggle.classList.remove('active');
        if (homeLink) homeLink.classList.remove('active');

    } catch (e) {
        console.warn('Nav active script error', e);
    }
});

// Navbar scroll effect
let lastScrollTop = 0;

// Hero/banner transparent overlay only on specific pages
const HERO_TRANSPARENT_PAGES = new Set([
    'index', // index.html
    'workshops',
    'shop',
    'gift',
    'experiences',
    'gallery',
    'reviews',
    'faq',
    'about',
    'contact'
]);

const setNavbarHeroTransparentMode = () => {
    if (!navbar) return;
    const path = window.location.pathname || '';
    let current = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
    if (!current || current === '') current = 'index.html';
    current = current.split(/[?#]/)[0];
    const base = current.replace(/\.html$/i, '').toLowerCase();

    if (HERO_TRANSPARENT_PAGES.has(base)) {
        navbar.classList.add('navbar--hero-transparent');
    } else {
        navbar.classList.remove('navbar--hero-transparent');
    }
};

setNavbarHeroTransparentMode();

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const isHeroTransparentMode = navbar?.classList.contains('navbar--hero-transparent');

    // Keep navbar transparent for the first ~120px on banner pages,
    // then enable the premium glass style.
    if (isHeroTransparentMode && scrollTop <= 120) {
        navbar.classList.remove('scrolled');
    } else {
        if (scrollTop > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});



// Smart lead capture configuration
const SMART_WHATSAPP_NUMBER = '919449237357';
const SMART_WHATSAPP_BASE = `https://wa.me/${SMART_WHATSAPP_NUMBER}`;
const SMART_LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyo6kiwvlDk9S_sYAL3nEcHlBSIHkIffKg3gOFQIzFF1zhJM_JHJJ4fgUFVCWuDzCI84Q/exec';
let isLeadSubmitting = false;
let lastLeadHash = null;
let lastLeadTime = 0;

const getCurrentPageName = () => {
    const file = window.location.pathname.split('/').pop() || 'index.html';
    const pageMap = {
        'index.html': 'Home',
        'workshops.html': 'Workshops',
        'experiences.html': 'Experiences',
        'shop.html': 'Shop',
        'gift.html': 'Gift',
        'contact.html': 'Contact',
        'about.html': 'About',
        'faq.html': 'FAQ',
        'gallery.html': 'Gallery',
        'reviews.html': 'Reviews'
    };
    return pageMap[file.toLowerCase()] || document.title || file;
};

const getInterestType = () => {
    const page = getCurrentPageName().toLowerCase();
    if (page.includes('workshop')) return 'Workshop';
    if (page.includes('shop') || page.includes('collection')) return 'Shop';
    if (page.includes('gift')) return 'Gift';
    if (page.includes('experience')) return 'Experience';
    if (page.includes('gallery')) return 'Gallery';
    if (page.includes('contact')) return 'Enquiry';
    return 'General';
};

const normalizeCategoryLabel = (raw) => {
    if (!raw) return '';
    if (raw.includes('2500-plus')) return 'Rs. 2500+';
    if (raw.includes('1000-2500')) return 'Rs. 1000-2500';
    if (raw.includes('500-1000')) return 'Rs. 500-1000';
    return raw
        .replace(/-/g, ' ')
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(', ');
};

const extractPriceFromText = (text) => {
    if (!text) return '';
    const match = text.match(/₹\s?[\d,]+/);
    return match ? match[0].trim() : '';
};

const getActiveFilterText = (group) => {
    const activeButton = document.querySelector(`[data-filter-group="${group}"] .category-btn.active`);
    return activeButton ? activeButton.textContent.trim() : '';
};

const getCardContext = (element) => {
    const card = element.closest('article.workshop-card, article.collection-card, article.gallery-card, .experience-card, .collection-card, .workshop-card, .gallery-card');
    if (!card) return {};
    const title = card.querySelector('h3, h2')?.textContent.trim() || '';
    const categoryTag = card.querySelector('.card-tag, .gallery-tag')?.textContent.trim();
    const selection = title || categoryTag || '';
    const rawCategory = card.dataset.category || categoryTag || '';
    const category = normalizeCategoryLabel(rawCategory);
    const location = card.dataset.location
        ? card.dataset.location.split(' ').filter(Boolean).map(l => l.charAt(0).toUpperCase() + l.slice(1)).shift()
        : card.querySelector('.card-meta-row span:last-child')?.textContent.trim() || '';
    const price = card.querySelector('.pricing-badge')?.textContent.trim() || extractPriceFromText(card.textContent);
    const budget = category.includes('Rs.') ? category : '';
    const type = card.dataset.type || '';
    return { selection, category, location, price, budget, type };
};

const buildSmartMessage = (params = {}) => {
    const interestType = params.type || getInterestType();
    const category = params.category || getActiveFilterText('workshop-category') || getActiveFilterText('gift') || '';
    const selection = params.selection || '';
    const location = params.location || getActiveFilterText('workshop-location') || '';
    const price = params.price || '';
    const budget = params.budget || '';
    const note = params.note || '';
    const budgetValue = budget || price;

    const subjectLine = (() => {
        if (interestType === 'Workshop') return 'I’m interested in a workshop.';
        if (interestType === 'Shop') return 'I’m interested in an artwork.';
        if (interestType === 'Gift') return 'I’m interested in a gift.';
        if (interestType === 'Experience') return 'I’m interested in an experience.';
        if (interestType === 'Gallery') return 'I’m interested in the gallery collection.';
        return 'I’m interested in learning more.';
    })();

    const lines = [
        'Hi Artistic Works 7,',
        '',
        subjectLine
    ];

    if (selection) lines.push(`Selection: ${selection}`);
    if (category && category.toLowerCase() !== selection.toLowerCase()) {
        lines.push(`Category: ${category}`);
    }
    if (location) lines.push(`Location: ${location}`);
    if (budgetValue) {
        const label = interestType === 'Gift' ? 'Budget' : 'Budget/Price';
        lines.push(`${label}: ${budgetValue}`);
    }
    if (note) lines.push(`Message: ${note}`);

    const closingLine = (() => {
        if (interestType === 'Shop') return 'Please share pricing and availability.';
        if (interestType === 'Gift') return 'Please share available options.';
        return 'Please share booking details.';
    })();

    lines.push('', closingLine);
    return lines.join('\n');
};

const openWhatsApp = (message) => {
    window.open(`${SMART_WHATSAPP_BASE}?text=${encodeURIComponent(message)}`, '_blank');
};

const showFormStatus = (form, text, isError = false) => {
    if (!form) return;
    let status = form.querySelector('.lead-status-message');
    if (!status) {
        status = document.createElement('div');
        status.className = 'lead-status-message';
        status.style.margin = '0.75rem 0 0';
        status.style.fontSize = '0.95rem';
        status.style.lineHeight = '1.4';
        form.appendChild(status);
    }
    status.textContent = text;
    status.style.color = isError ? '#a00' : '#1a7f37';
};

const saveLead = async (payload) => {
    try {
        await fetch(SMART_LEAD_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return { success: true };
    } catch (error) {
        console.error('Lead save failed:', error);
        return null;
    }
};

const saveLeadToSheet = async (payload) => {
    try {
        await fetch(SMART_LEAD_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(payload)
        });

        console.log('Lead saved');
        return true;

    } catch (error) {
        console.warn('Lead save failed', error);
        return false;
    }
};

const getLeadHash = (payload) => {
    return [
        payload.name,
        payload.phone,
        payload.email,
        payload.interestType || payload.interest_type,
        payload.category,
        payload.selection,
        payload.location,
        payload.price || payload.budget,
        payload.message,
        payload.page
    ].join('|');
};

const saveLeadWithTimeout = async (payload, timeoutMs = 2000) => {
    if (!SMART_LEAD_ENDPOINT) {
        return false;
    }

    const savePromise = saveLeadToSheet(payload);
    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(false), timeoutMs));
    return Promise.race([savePromise, timeoutPromise]);
};

const isDuplicateLead = (payload) => {
    const hash = getLeadHash(payload);
    const now = Date.now();

    // block same lead for 2 seconds
    if (
        hash === lastLeadHash &&
        now - lastLeadTime < 2000
    ) {
        return true;
    }

    lastLeadHash = hash;
    lastLeadTime = now;

    return false;
};

const buildLeadPayload = (payload) => ({

    timestamp: new Date().toISOString(),
    name: payload.name || '',
    phone: payload.phone || '',
    email: payload.email || '',
    page: payload.page || getCurrentPageName(),
    selected_category: payload.category || getInterestType(),
    workshop_product_experience: payload.selection || '',
    location: payload.location || '',
    budget: payload.budget || '',
    message: payload.message || '',
    lead_source: 'Website',
    interestType: payload.interestType || payload.interest_type || getInterestType()
});

const inferInterestTypeFromContext = (context = {}) => {
    if (context.type) return context.type;
    const page = getCurrentPageName();
    if (page === 'Workshops') return 'Workshop';
    if (page === 'Shop') return 'Shop';
    if (page === 'Gift') return 'Gift';
    if (page === 'Experiences') return 'Experience';
    if (page === 'Gallery') return 'Gallery';
    if (page === 'Contact') return 'Custom Request';
    if (context.category && context.category.toLowerCase().includes('gift')) return 'Gift';
    if (context.category && context.category.toLowerCase().includes('painting')) return 'Workshop';
    if (context.category && context.category.toLowerCase().includes('experience')) return 'Experience';
    return getInterestType();
};

const buildTrackingPayload = (payload) => ({
    name: payload.name || '',
    phone: payload.phone || '',
    email: payload.email || '',
    interestType: payload.interestType || payload.interest_type || inferInterestTypeFromContext(payload),
    category: payload.category || '',
    selection: payload.selection || '',
    location: payload.location || '',
    price: payload.price || payload.budget || '',
    message: payload.message || '',
    page: payload.page || getCurrentPageName()
});

const saveLeadAndOpenWhatsApp = async (payload, message) => {
    const trackingPayload = buildTrackingPayload(payload);
    if (!isDuplicateLead(trackingPayload)) {
        await saveLeadWithTimeout(trackingPayload, 2000);
    }
    openWhatsApp(message);
};

const extractPageContextFromElement = (element) => {
    const cardContext = getCardContext(element);
    const category = cardContext.category || getActiveFilterText('workshop-category') || getActiveFilterText('gift');
    return {
        type: cardContext.type,
        category,
        selection: cardContext.selection,
        location: cardContext.location,
        price: cardContext.price,
        budget: cardContext.budget,
        note: ''
    };
};

const setupClickableCollectionAndGalleryCards = () => {
    const handleCardClick = async (card, event) => {
        if (event.target.closest('a')) return;
        const pageContext = extractPageContextFromElement(card);
        const message = buildSmartMessage(pageContext);
        const payload = {
            name: '',
            phone: '',
            email: '',
            interestType: inferInterestTypeFromContext(pageContext),
            category: pageContext.category,
            selection: pageContext.selection,
            location: pageContext.location,
            price: pageContext.budget || pageContext.price || '',
            message: pageContext.note || 'WhatsApp enquiry from website',
            page: getCurrentPageName()
        };
        await saveLeadAndOpenWhatsApp(payload, message);
    };

    document.querySelectorAll('article.collection-card, article.gallery-card').forEach(card => {
        card.addEventListener('click', function(e) {
            handleCardClick(card, e);
        });
    });
};

// ================================
// REUSABLE FILTERS
// ================================
function initCategoryFilter() {
    const getCardsForGroup = (group) => {
        const section = group.closest('.section, .events-section') || document;
        return section.querySelectorAll('[data-filter-card], .experience-card');
    };

    const applySingleGroupFilter = (group, filter) => {
        getCardsForGroup(group).forEach(card => {
            const categories = (card.getAttribute('data-category') || '').split(' ').filter(Boolean);
            const shouldShow = filter === 'all' || categories.includes(filter);
            card.classList.toggle('hidden', !shouldShow);
            card.style.display = shouldShow ? 'flex' : 'none';
        });
    };

    const applyWorkshopFilters = () => {
        const categoryActive = document.querySelector('[data-filter-group="workshop-category"] .category-btn.active');
        const locationActive = document.querySelector('[data-filter-group="workshop-location"] .category-btn.active');
        const monthActive = document.querySelector('[data-filter-group="workshop-month"] .category-btn.active');
        const categoryFilter = categoryActive ? categoryActive.getAttribute('data-filter') : 'all';
        const locationFilter = locationActive ? locationActive.getAttribute('data-filter') : 'all';
        const monthFilter = monthActive ? monthActive.getAttribute('data-filter') : 'all';

        document.querySelectorAll('.workshop-grid [data-filter-card]').forEach(card => {
            const categories = (card.getAttribute('data-category') || '').split(' ').filter(Boolean);
            const locations = (card.getAttribute('data-location') || '').split(' ').filter(Boolean);
            const months = (card.getAttribute('data-month') || '').split(' ').filter(Boolean);
            const categoryMatch = categoryFilter === 'all' || categories.includes(categoryFilter);
            const locationMatch = locationFilter === 'all' || locations.includes(locationFilter);
            const monthMatch = monthFilter === 'all' || months.includes(monthFilter);
            const shouldShow = categoryMatch && locationMatch && monthMatch;
            card.classList.toggle('hidden', !shouldShow);
            card.style.display = shouldShow ? 'flex' : 'none';
        });
        updateWorkshopEmptyState();
        updateWorkshopExploreLocationButton();
    };

    const updateWorkshopEmptyState = () => {
        const cards = document.querySelectorAll('.workshop-grid [data-filter-card]');
        const visibleCount = Array.from(cards).filter(card => !card.classList.contains('hidden')).length;
        const emptyState = document.getElementById('workshopEmptyState');
        if (!emptyState) return;
        emptyState.classList.toggle('is-hidden', visibleCount > 0);
    };

    const getActiveFilterText = (group) => {
        const activeButton = document.querySelector(`[data-filter-group="${group}"] .category-btn.active`);
        return activeButton ? activeButton.textContent.trim() : '';
    };

    const getWorkshopExploreLocationButton = () => document.getElementById('workshopExploreLocationBtn');

    const updateWorkshopExploreLocationButton = () => {
        const button = getWorkshopExploreLocationButton();
        if (!button) return;

        const locationActive = document.querySelector('[data-filter-group="workshop-location"] .category-btn.active');
        const locationFilter = locationActive ? locationActive.getAttribute('data-filter') : 'all';
        const visibleCards = Array.from(document.querySelectorAll('.workshop-grid [data-filter-card]'))
            .filter(card => !card.classList.contains('hidden')).length;

        if (!locationActive || locationFilter === 'all' || visibleCards === 0) {
            button.classList.add('is-hidden');
            return;
        }

        const route = getLocationPageRoute(locationFilter);
        if (!route) {
            button.classList.add('is-hidden');
            return;
        }

        button.href = route;
        button.textContent = `Explore Workshops in ${locationActive.textContent.trim()}`;
        button.classList.remove('is-hidden');
    };

    const WORKSHOP_LOCATION_ROUTE_MAP = {
        'cubbon-park': 'locations/cubbon-park.html',
        'rajajinagar': 'locations/rajajinagar.html',
        'whitefield': 'locations/whitefield.html',
        'indiranagar': 'locations/indiranagar.html',
        'hsr-layout': 'locations/hsr-layout.html',
        'yeshwanthpur': 'locations/yeshwanthpur.html',
        'malleshwaram': 'locations/malleshwaram.html'
    };

    const getLocationPageRoute = (filter) => {
        return WORKSHOP_LOCATION_ROUTE_MAP[filter] || null;
    };

    const redirectToLocationPage = (filter) => {
        const route = getLocationPageRoute(filter);
        if (!route || filter === 'all') return false;
        window.location.href = route;
        return true;
    };

    /* Modal: open/close/send - robust, document-level handlers to avoid parent dependency */
    const openPremiumModal = (opts = {}) => {
        const overlay = document.getElementById('premiumModalOverlay');
        if (!overlay) return;
        const locationInput = overlay.querySelector('#modalLocation') || document.getElementById('modalLocation');
        const locationText = getActiveFilterText('workshop-location');
        if (locationInput && locationText && locationText.toLowerCase() !== 'all') {
            locationInput.value = locationText;
        }
        overlay.classList.remove('is-hidden');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        // focus first input for accessibility
        const first = overlay.querySelector('input, select, textarea, button');
        if (first) first.focus();
    };

    const closePremiumModal = () => {
        const overlay = document.getElementById('premiumModalOverlay');
        if (!overlay) return;
        overlay.classList.add('is-hidden');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    const sendEnquiryWhatsApp = async () => {
        const form = document.getElementById('premiumModalForm');
        if (!form || isLeadSubmitting || form.dataset.submitted === 'true') return;
        const fullName = (form.fullName && form.fullName.value) ? form.fullName.value.trim() : '';
        const phone = (form.phone && form.phone.value) ? form.phone.value.trim() : '';
        const eventType = (form.eventType && form.eventType.value) ? form.eventType.value : '';
        const location = (form.location && form.location.value) ? form.location.value.trim() : '';
        const details = (form.details && form.details.value) ? form.details.value.trim() : '';
        if (!fullName || !phone) {
            alert('Please share your name and phone number so we can respond quickly.');
            return;
        }

        const pageContext = extractPageContextFromElement(form);
        const message = buildSmartMessage({
            category: eventType || pageContext.category,
            selection: eventType || pageContext.selection,
            location: location || pageContext.location,
            price: pageContext.price,
            budget: pageContext.budget,
            note: details
        });

        const payload = {
            name: fullName,
            phone,
            email: '',
            interestType: 'Custom Request',
            category: eventType || pageContext.category,
            selection: pageContext.selection || eventType,
            location: location || pageContext.location,
            price: pageContext.budget || pageContext.price || '',
            message: details || 'Enquiry submitted through website form',
            page: getCurrentPageName()
        };

        try {
            isLeadSubmitting = true;
            showFormStatus(form, 'Saving your enquiry... please wait.');
            await saveLeadAndOpenWhatsApp(payload, message);
            form.dataset.submitted = 'true';
            showFormStatus(form, 'Enquiry saved. Opening WhatsApp...');
            setTimeout(closePremiumModal, 300);
        } catch (error) {
            showFormStatus(form, 'Unable to save lead. Please try again.', true);
        } finally {
            isLeadSubmitting = false;
        }
    };

    const handleWhatsAppModalButton = async (form) => {
        if (!form || isLeadSubmitting) return;
        const name = form.fullName?.value.trim() || '';
        const phone = form.phone?.value.trim() || '';
        const eventType = form.eventType?.value || '';
        const location = form.location?.value || '';
        const details = form.details?.value.trim() || '';
        const pageContext = extractPageContextFromElement(form);
        const message = buildSmartMessage({
            category: eventType || pageContext.category,
            selection: pageContext.selection,
            location: location || pageContext.location,
            price: pageContext.price,
            budget: pageContext.budget,
            note: details,
            type: 'Custom Request'
        });
        const payload = {
            name,
            phone,
            email: '',
            interestType: 'Custom Request',
            category: eventType || pageContext.category,
            selection: pageContext.selection,
            location: location || pageContext.location,
            price: pageContext.budget || pageContext.price || '',
            message: details || 'WhatsApp enquiry from enquiry modal',
            page: getCurrentPageName()
        };

        isLeadSubmitting = true;
        showFormStatus(form, 'Saving your enquiry... please wait.');
        await saveLeadAndOpenWhatsApp(payload, message);
        form.dataset.submitted = 'true';
        showFormStatus(form, 'Enquiry saved. Opening WhatsApp...');
        isLeadSubmitting = false;
        closePremiumModal();
    };

    const setupModalHandlers = () => {
        // use event delegation so buttons added in DOM later still work
        document.addEventListener('click', async (e) => {
            const btn = e.target.closest('.request-workshop-btn, .floating-request-btn');
            if (btn) {
                e.preventDefault();
                openPremiumModal();
                return;
            }
            // whatsapp inside modal or standalone
            const whatsappInside = e.target.closest('.whatsapp-modal-btn');
            if (whatsappInside) {
                e.preventDefault();
                const form = document.getElementById('premiumModalForm');
                if (form) {
                    handleWhatsAppModalButton(form);
                    return;
                }
                const pageContext = extractPageContextFromElement(whatsappInside);
                const message = buildSmartMessage(pageContext);
                const payload = {
                    name: '',
                    phone: '',
                    email: '',
                    interestType: inferInterestTypeFromContext(pageContext),
                    category: pageContext.category,
                    selection: pageContext.selection,
                    location: pageContext.location,
                    price: pageContext.budget || pageContext.price || '',
                    message: pageContext.note || 'WhatsApp enquiry from website',
                    page: getCurrentPageName()
                };
                await saveLeadAndOpenWhatsApp(payload, message);
                return;
            }
            // close modal when clicking on overlay outside modal content
            if (e.target && e.target.id === 'premiumModalOverlay') {
                closePremiumModal();
            }
            if (e.target && e.target.closest('.modal-close-btn')) {
                closePremiumModal();
            }
        });

        // handle form submissions
        const form = document.getElementById('premiumModalForm');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                sendEnquiryWhatsApp();
            });
        }

        // keyboard
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closePremiumModal();
        });
    };

    const setupSmartWhatsAppLinks = () => {
        document.addEventListener('click', async (event) => {
            const anchor = event.target.closest(`a[href^="${SMART_WHATSAPP_BASE}"]`);
            if (!anchor) return;
            event.preventDefault();
            const pageContext = extractPageContextFromElement(anchor);
            const message = buildSmartMessage(pageContext);
            const payload = {
                name: '',
                phone: '',
                email: '',
                interestType: inferInterestTypeFromContext(pageContext),
                category: pageContext.category,
                selection: pageContext.selection,
                location: pageContext.location,
                price: pageContext.budget || pageContext.price || '',
                message: pageContext.note || 'WhatsApp enquiry from website',
                page: getCurrentPageName()
            };
            await saveLeadAndOpenWhatsApp(payload, message);
        });
    };

    setupModalHandlers();
    setupClickableCollectionAndGalleryCards();

    const filterGroups = document.querySelectorAll('[data-filter-group]');

    if (!filterGroups.length) return;

    filterGroups.forEach(group => {
        const buttons = group.querySelectorAll('.category-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const groupName = group.getAttribute('data-filter-group');
                const filterValue = btn.getAttribute('data-filter');

                if (groupName === 'workshop-category' || groupName === 'workshop-location' || groupName === 'workshop-month') {
                    applyWorkshopFilters();
                    return;
                }

                applySingleGroupFilter(group, filterValue);
            });
        });
    });

    updateWorkshopEmptyState();
    updateWorkshopExploreLocationButton();
}

// Initialize smart WhatsApp link handler - attach listeners to ALL WhatsApp links
const initSmartWhatsAppLinks = () => {
    // Find and attach listeners to all WhatsApp links
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const pageContext = extractPageContextFromElement(link);
            const message = buildSmartMessage(pageContext);
            const payload = {
                name: '',
                phone: '',
                email: '',
                interestType: inferInterestTypeFromContext(pageContext),
                category: pageContext.category,
                selection: pageContext.selection,
                location: pageContext.location,
                price: pageContext.budget || pageContext.price || '',
                message: pageContext.note || 'WhatsApp enquiry from website',
                page: getCurrentPageName()
            };
            await saveLeadAndOpenWhatsApp(payload, message);
        });
    });
};

// Initialize filter and WhatsApp link handler when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSmartWhatsAppLinks();
        initCategoryFilter();
    });
} else {
    initSmartWhatsAppLinks();
    initCategoryFilter();
}

// Button click handlers (you can add actual functionality later)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('btn-primary')) {
            console.log('Explore Workshops clicked');
            // Navigate to workshops section
        } else if (this.classList.contains('btn-secondary')) {
            console.log('Shop Art Collection clicked');
            // Navigate to collection section
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || !href.startsWith('#')) {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

        // IntersectionObserver to reveal cards when in view
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    // keep visible once revealed (optional: remove to animate out)
                    // entry.target.classList.remove('in-view');
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.12
        });

        document.querySelectorAll('.explore-card, .featured-card, .why-card, .service-card').forEach(el => revealObserver.observe(el));

// Optional: Add animation on scroll (lazy load effect)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe hero content on load
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        observer.observe(heroContent);
    }
});

// Explore card click handlers
document.querySelectorAll('.explore-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const category = this.getAttribute('data-category');
        console.log('Explore card clicked:', category);
        // Future: Navigate to category page
        // window.location.href = `/category/${category}`;
    });

    // Add subtle feedback on click
    card.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-6px) scale(0.98)';
    });

    card.addEventListener('mouseup', function() {
        this.style.transform = '';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Featured card click handlers
document.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const title = this.querySelector('.featured-card-title').textContent;
        console.log('Featured workshop clicked:', title);
        // Future: Navigate to workshop details page
    });
});

// FAQ accordion behavior
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    button.addEventListener('click', () => {
        const isOpen = item.classList.toggle('expanded');
        button.setAttribute('aria-expanded', isOpen);
        if (isOpen) {
            answer.hidden = false;
            const contentHeight = answer.scrollHeight;
            answer.style.maxHeight = `${contentHeight}px`;
        } else {
            answer.style.maxHeight = '0';
            setTimeout(() => {
                if (!item.classList.contains('expanded')) answer.hidden = true;
            }, 350);
        }
        faqItems.forEach(other => {
            if (other !== item && other.classList.contains('expanded')) {
                other.classList.remove('expanded');
                other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                const otherAnswer = other.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = '0';
                setTimeout(() => {
                    if (!other.classList.contains('expanded')) otherAnswer.hidden = true;
                }, 350);
            }
        });
    });
});

// Testimonial carousel controls
(function() {
    const cards = document.querySelectorAll('.testimonial-card');
    const prev = document.querySelector('.testimonial-prev');
    const next = document.querySelector('.testimonial-next');
    let activeIndex = 0;

    if (!cards.length || !prev || !next) return;

    const updateTestimonials = () => {
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === activeIndex);
        });
    };

    prev.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + cards.length) % cards.length;
        updateTestimonials();
    });

    next.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % cards.length;
        updateTestimonials();
    });
})();

document.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll('.workshop-slide');
    const dots = document.querySelectorAll('.dot');

    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (!slides.length) return;

    let current = 0;

    function updateSlider(index) {

        slides.forEach(slide =>
            slide.classList.remove('active')
        );

        dots.forEach(dot =>
            dot.classList.remove('active')
        );

        slides[index].classList.add('active');

        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        updateSlider(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        updateSlider(current);
    }

    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            current = Number(dot.dataset.slide);
            updateSlider(current);
        });
    });

    setInterval(nextSlide, 4000);
});

function initSlider(config) {

    const slides = document.querySelectorAll(config.slide);
    const dots = document.querySelectorAll(config.dot);

    const nextBtn = document.querySelector(config.next);
    const prevBtn = document.querySelector(config.prev);

    if (!slides.length) return;

    let current = 0;

    function updateSlider(index) {

        slides.forEach(slide =>
            slide.classList.remove('active')
        );

        dots.forEach(dot =>
            dot.classList.remove('active')
        );

        slides[index].classList.add('active');

        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        updateSlider(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        updateSlider(current);
    }

    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            current = Number(dot.dataset.slide);
            updateSlider(current);
        });
    });

    setInterval(nextSlide, 4000);
}

/* workshop */
initSlider({
    slide: '.workshop-slide',
    dot: '.dot',
    next: '.next',
    prev: '.prev'
});

/* shop */
initSlider({
    slide: '.shop-slide',
    dot: '.shop-dot',
    next: '.next-shop',
    prev: '.prev-shop'
});

/* gift */
initSlider({
    slide: '.gift-slide',
    dot: '.gift-dot',
    next: '.next-gift',
    prev: '.prev-gift'
});