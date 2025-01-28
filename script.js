// Single Page Application Navigation
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleSidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sidebar Toggle Functionality
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    }

    toggleBtn.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking outside on smaller screens
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(event.target) && 
            !toggleBtn.contains(event.target)) {
            sidebar.classList.remove('active');
            toggleBtn.classList.remove('active');
        }
    });

    // Navigation and Content Loading
    function loadPage(target) {
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to selected nav link
        const selectedLink = document.querySelector(`[data-target="${target}"]`);
        if (selectedLink) {
            selectedLink.classList.add('active');
        }

        // Load content from template
        const template = document.getElementById(`${target}-template`);
        if (template) {
            mainContent.innerHTML = ''; // Clear previous content
            mainContent.appendChild(template.content.cloneNode(true));
        }

        // Close sidebar on small screens after navigation
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            toggleBtn.classList.remove('active');
        }
    }

    // Handle initial page load and hash changes
    function handleNavigation() {
        let hash = window.location.hash.substring(1) || 'home';
        loadPage(hash);
    }

    // Add click event to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.currentTarget.getAttribute('data-target');
            window.location.hash = target;
            handleNavigation();
        });
    });

    // Initial page load and hash change listener
    window.addEventListener('hashchange', handleNavigation);
    handleNavigation();

    // Responsive sidebar behavior
    function handleResponsiveSidebar() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('active');
        } else {
            sidebar.classList.remove('active');
        }
    }

    // Initial check and add resize listener
    handleResponsiveSidebar();
    window.addEventListener('resize', handleResponsiveSidebar);
});