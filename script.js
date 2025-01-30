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
        
        if (!isClickInsideSidebar && !isToggleButton) {
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

    // Dashboard Functionality
    function setupDashboard() {
        const dashboardSettings = document.getElementById('dashboardSettings');
        const profileDropdown = document.getElementById('profileDropdown');

        // Dashboard Settings Button
        if (dashboardSettings) {
            dashboardSettings.addEventListener('click', () => {
                // Placeholder for settings modal or navigation
                alert('Dashboard Settings clicked');
            });
        }

        // Profile Dropdown Interactions
        if (profileDropdown) {
            const dropdownItems = profileDropdown.closest('.dropdown').querySelectorAll('.dropdown-item');
            
            dropdownItems.forEach(item => {
                item.addEventListener('click', (event) => {
                    const target = event.currentTarget.getAttribute('href').substring(1);
                    
                    switch(target) {
                        case 'profile':
                            // Navigate to profile page or open profile modal
                            alert('Profile page');
                            break;
                        case 'settings':
                            // Open settings modal or navigate to settings page
                            alert('Settings page');
                            break;
                        case 'logout':
                            // Implement logout functionality
                            alert('Logging out');
                            break;
                    }
                });
            });
        }

        // Optional: Refresh or update metrics periodically
        function updateMetrics() {
            // Placeholder for fetching and updating metrics
            const metricCards = document.querySelectorAll('.metric-card');
            
            // Simulated metrics update
            const metrics = [
                { selector: '.total-documents .metric-value', value: '2,0134' },
                { selector: '.last-sessions .metric-value', value: '50' },
                { selector: '.most-used-search .metric-value', value: 'Project Docs' }
            ];

            metrics.forEach(metric => {
                const element = document.querySelector(metric.selector);
                if (element) {
                    element.textContent = metric.value;
                }
            });
        }

        // Update metrics every 5 minutes
        setInterval(updateMetrics, 5 * 60 * 1000);
    }

    // Remove deprecated DOMNodeInserted event listeners
    const searchTemplate = document.getElementById('search-template');
    const homeTemplate = document.getElementById('home-template');

    // Use MutationObserver for dynamic content loading
    const searchObserver = new MutationObserver((mutations) => {
        setupSearchPage();
        searchObserver.disconnect();
    });

    const homeObserver = new MutationObserver((mutations) => {
        setupDashboard();
        homeObserver.disconnect();
    });

    if (searchTemplate) {
        searchObserver.observe(searchTemplate, { childList: true, subtree: true });
    }

    if (homeTemplate) {
        homeObserver.observe(homeTemplate, { childList: true, subtree: true });
    }

    // Explicit Chat Functionality
    (function() {
        // Debugging function to log and alert issues
        function debugLog(message, data) {
            console.error('CHAT DEBUG: ' + message, data || '');
        }

        // Core chat functionality
        function initializeChat() {
            debugLog('Initializing chat functionality');

            // Explicitly find chat elements
            const chatMessages = document.getElementById('chatMessages');
            const chatInput = document.getElementById('chatInput');
            const sendMessageBtn = document.getElementById('sendMessageBtn');

            // Clear any existing event listeners to prevent multiple bindings
            if (sendMessageBtn) {
                const oldSendMessageBtn = sendMessageBtn.cloneNode(true);
                sendMessageBtn.parentNode.replaceChild(oldSendMessageBtn, sendMessageBtn);
            }

            // Detailed element validation
            if (!chatMessages || !chatInput || !sendMessageBtn) {
                debugLog('ERROR: Chat elements not found', {
                    chatMessages: !!chatMessages,
                    chatInput: !!chatInput,
                    sendMessageBtn: !!sendMessageBtn
                });
                return;
            }

            // Predefined response patterns
            const responsePatterns = {
                greetings: [
                    "Hi there! How can I assist you today?",
                    "Hello! Welcome to Enterprise Chat. What can I help you with?",
                    "Good day! I'm here to support you. What do you need?"
                ],
                help: [
                    "I'm here to help. What specific assistance do you require?",
                    "Sure, I can help you. Could you provide more details about what you need?",
                    "I'm ready to support you. Please tell me more about your request."
                ],
                default: [
                    "Thank you for your message. I'm processing your request.",
                    "I've received your message and will get back to you shortly.",
                    "Your message has been noted. Let me work on that for you."
                ]
            };

            function getResponse(userMessage) {
                const lowerMessage = userMessage.toLowerCase();
                
                // Check for greetings
                const greetingKeywords = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
                if (greetingKeywords.some(keyword => lowerMessage.includes(keyword))) {
                    return responsePatterns.greetings[Math.floor(Math.random() * responsePatterns.greetings.length)];
                }

                // Check for help-related keywords
                const helpKeywords = ['help', 'support', 'assist', 'question', 'problem', 'issue'];
                if (helpKeywords.some(keyword => lowerMessage.includes(keyword))) {
                    return responsePatterns.help[Math.floor(Math.random() * responsePatterns.help.length)];
                }

                // Default response
                return responsePatterns.default[Math.floor(Math.random() * responsePatterns.default.length)];
            }

            function createMessageElement(message, isUser = false) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('chat-message');
                messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
                
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('chat-message-content');
                contentDiv.textContent = message;
                
                messageDiv.appendChild(contentDiv);
                return messageDiv;
            }

            function sendMessage() {
                debugLog('Send message function called');
                const message = chatInput.value.trim();
                
                if (message) {
                    debugLog('Sending message', { message });
                    
                    // Add user message
                    const userMessageElement = createMessageElement(message, true);
                    chatMessages.appendChild(userMessageElement);
                    
                    // Clear input
                    chatInput.value = '';
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    // Generate AI response
                    setTimeout(() => {
                        const aiResponse = getResponse(message);
                        debugLog('AI Response generated', { response: aiResponse });
                        
                        const aiMessageElement = createMessageElement(aiResponse);
                        chatMessages.appendChild(aiMessageElement);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 1000);
                } else {
                    debugLog('Empty message, not sending');
                }
            }

            // Attach event listeners with error handling
            try {
                sendMessageBtn.addEventListener('click', sendMessage);
                chatInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        sendMessage();
                    }
                });
                
                debugLog('Chat event listeners attached successfully');
            } catch (error) {
                debugLog('Error attaching event listeners', { error });
            }

            debugLog('Chat initialization complete');
        }

        // Multiple initialization strategies
        function tryInitializeChat() {
            debugLog('Attempting to initialize chat');

            // Strategy 1: Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeChat);
            } 
            // Strategy 2: If DOM is already loaded
            else {
                initializeChat();
            }

            // Strategy 3: Fallback observer
            const observer = new MutationObserver((mutations) => {
                const chatTemplate = document.getElementById('chat-template');
                const chatMessages = document.getElementById('chatMessages');
                
                if (chatTemplate && chatMessages) {
                    debugLog('Chat template and messages found via observer');
                    observer.disconnect();
                    initializeChat();
                }
            });

            // Start observing the entire document
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }

        // Attach chat initialization to navigation events
        function attachChatInitToNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Small delay to ensure DOM is updated
                    setTimeout(tryInitializeChat, 100);
                });
            });
        }

        // Global error handler
        window.addEventListener('error', (event) => {
            debugLog('Unhandled error', { 
                message: event.message, 
                filename: event.filename, 
                lineno: event.lineno 
            });
        });

        // Initial setup
        tryInitializeChat();
        attachChatInitToNavigation();
    })();
});