// Single Page Application Navigation
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('toggleSidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sidebar Toggle
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (event) => {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isToggleButton = toggleButton.contains(event.target);
        
        if (!isClickInsideSidebar && !isToggleButton && window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });

    // Navigation Link Active State
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            navLinks.forEach(l => l.classList.remove('active'));
            event.currentTarget.classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
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

    // Responsive Sidebar Behavior
    function handleResponsiveSidebar() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('active');
        } else {
            sidebar.classList.remove('active');
        }
    }

    // Initial check and add resize listener
    handleResponsiveSidebar();
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });

    // Search Page Functionality
    function setupSearchPage() {
        const searchInput = document.getElementById('fullTextSearch');
        const searchButton = document.getElementById('searchActionBtn');
        const searchResultsBody = document.getElementById('searchResultsBody');

        // Placeholder search results function
        function performSearch(query) {
            // Clear previous results
            searchResultsBody.innerHTML = '';

            // Simulated search results (replace with actual search logic)
            const sampleResults = [
                {
                    title: 'Project Proposal',
                    description: 'Comprehensive document outlining project strategy',
                    file: 'project_proposal.pdf',
                    placeholder: '-'
                },
                {
                    title: 'Meeting Notes',
                    description: 'Detailed notes from team strategy meeting',
                    file: 'team_meeting_notes.docx',
                    placeholder: '-'
                },
                {
                    title: 'Technical Specification',
                    description: 'Detailed technical requirements and specifications',
                    file: 'tech_spec.md',
                    placeholder: '-'
                }
            ];

            // Filter results based on query
            const filteredResults = sampleResults.filter(result => 
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.description.toLowerCase().includes(query.toLowerCase()) ||
                result.file.toLowerCase().includes(query.toLowerCase())
            );

            // Populate results table
            filteredResults.forEach(result => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.title}</td>
                    <td>${result.description}</td>
                    <td>${result.file}</td>
                    <td>${result.placeholder}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary">View</button>
                    </td>
                `;
                searchResultsBody.appendChild(row);
            });
        }

        // Search button click event
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });

        // Enter key press event for search input
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }

    // Add search page setup to page load event
    const searchTemplate = document.getElementById('search-template');
    if (searchTemplate) {
        searchTemplate.addEventListener('DOMNodeInserted', () => {
            setupSearchPage();
        });
    }
});