// Chatbot Configuration
const chatbotConfig = {
    defaultLanguage: 'en',
    languages: {
        en: 'English',
        lg: 'Luganda',
        sw: 'Kiswahili',
        fr: 'Français'
    },
    botName: 'Mugisha Tailors Assistant',
    botAvatar: '👕',
    userAvatar: '👤',
    thinkingTime: 1000,
    maxChatHistory: 50
};

// Chatbot Knowledge Base is imported from chatbot-knowledge.js
// All questions and answers are defined in the external file

// Chatbot State
let chatbotState = {
    isOpen: false,
    currentLanguage: chatbotConfig.defaultLanguage,
    chatHistory: []
};

// DOM Elements
let chatWidget, chatContainer, chatHeader, chatBody, chatInput, chatSendBtn, chatToggle, languageSelector;

// Initialize Chatbot
function initChatbot() {
    createChatbotHTML();
    setupEventListeners();
    addSystemMessage('greeting');
}

// Create Chatbot HTML Structure
function createChatbotHTML() {
    // Create main container
    chatWidget = document.createElement('div');
    chatWidget.className = 'chatbot-widget';
    chatWidget.innerHTML = `
        <div class="chatbot-container">
            <div class="chatbot-header">
                <div class="chatbot-title">
                    <span class="chatbot-avatar">${chatbotConfig.botAvatar}</span>
                    <h3>${chatbotConfig.botName}</h3>
                </div>
                <div class="chatbot-actions">
                    <select class="language-selector">
                        ${Object.entries(chatbotConfig.languages).map(([code, name]) => 
                            `<option value="${code}" ${code === chatbotState.currentLanguage ? 'selected' : ''}>${name}</option>`
                        ).join('')}
                    </select>
                    <button class="minimize-btn">−</button>
                </div>
            </div>
            <div class="chatbot-body"></div>
            <div class="chatbot-footer">
                <input type="text" class="chat-input" placeholder="Type your message...">
                <button class="send-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
        <button class="chatbot-toggle">
            <i class="fas fa-comments"></i>
        </button>
    `;
    
    document.body.appendChild(chatWidget);
    
    // Cache DOM elements
    chatContainer = chatWidget.querySelector('.chatbot-container');
    chatHeader = chatWidget.querySelector('.chatbot-header');
    chatBody = chatWidget.querySelector('.chatbot-body');
    chatInput = chatWidget.querySelector('.chat-input');
    chatSendBtn = chatWidget.querySelector('.send-btn');
    chatToggle = chatWidget.querySelector('.chatbot-toggle');
    languageSelector = chatWidget.querySelector('.language-selector');
}

// Setup Event Listeners
function setupEventListeners() {
    // Toggle chat window
    chatToggle.addEventListener('click', toggleChat);
    chatWidget.querySelector('.minimize-btn').addEventListener('click', toggleChat);
    
    // Send message on button click or Enter key
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Change language
    languageSelector.addEventListener('change', (e) => {
        chatbotState.currentLanguage = e.target.value;
        // Update UI with new language
        updateChatUI();
    });
    
    // Make chat header draggable
    makeDraggable(chatHeader, chatContainer);
}

// Toggle Chat Window
function toggleChat() {
    if (chatbotState.isOpen) {
        chatWidget.classList.remove('active');
        chatContainer.style.display = 'none';
    } else {
        chatWidget.classList.add('active');
        chatContainer.style.display = 'flex';
        chatInput.focus();
    }
    
    chatbotState.isOpen = !chatbotState.isOpen;
    
    // Add animation class for smooth transition
    chatContainer.classList.add('animate');
    setTimeout(() => chatContainer.classList.remove('animate'), 300);
}

// Send Message
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Process message and get response
    setTimeout(() => {
        const response = processMessage(message);
        addMessage(response, 'bot');
        
        // Auto-scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }, chatbotConfig.thinkingTime);
}

// Process User Message and Generate Response
function processMessage(message) {
    const lang = chatbotState.currentLanguage;
    const lowerMsg = message.toLowerCase().trim();
    
    // Check for company name queries
    const companyNamePatterns = [
        'what is your company',
        'what\'s your company',
        'who are you',
        'name of your business',
        'what do you call your',
        'are you mugisha',
        'mugisha tailors',
        'mugisha and family',
        'mugisha & family',
        'mugisha super tailors'
    ];
    
    if (companyNamePatterns.some(pattern => lowerMsg.includes(pattern))) {
        if (lowerMsg.includes('short') || lowerMsg.includes('abbreviate')) {
            return getLocalizedResponse('company_name_short', lang);
        } else if (lowerMsg.includes('full') || lowerMsg.includes('complete') || lowerMsg.includes('entire')) {
            return getLocalizedResponse('company_name_full', lang);
        }
        return getLocalizedResponse('company_name', lang);
    }
    
    // Check for website-related queries
    if (lowerMsg.includes('website') || lowerMsg.includes('site') || lowerMsg.includes('purpose')) {
        if (lowerMsg.includes('what') || lowerMsg.includes('purpose') || lowerMsg.includes('do')) {
            return getLocalizedResponse('website_purpose', lang);
        }
    }
    
    // Check for owner queries
    if (lowerMsg.includes('owner') || lowerMsg.includes('who owns') || lowerMsg.includes('who run') || 
        lowerMsg.includes('founder') || lowerMsg.includes('who started') || 
        lowerMsg.includes('who is mugisha')) {
        return getLocalizedResponse('owner', lang);
    }
    
    // Check for products/services queries
    if (lowerMsg.includes('product') || lowerMsg.includes('service') || lowerMsg.includes('offer') || 
        lowerMsg.includes('sell') || lowerMsg.includes('make') || lowerMsg.includes('provide') ||
        lowerMsg.includes('what do you') || lowerMsg.includes('what can you')) {
        return getLocalizedResponse('products_services', lang);
    }
    
    // Check for school uniform queries
    if (lowerMsg.includes('school') || lowerMsg.includes('uniform') || lowerMsg.includes('education') || 
        lowerMsg.includes('student') || lowerMsg.includes('academic')) {
        if (lowerMsg.includes('partner') || lowerMsg.includes('list') || lowerMsg.includes('which schools') || 
            lowerMsg.includes('work with') || lowerMsg.includes('collaborate')) {
            return getLocalizedResponse('partner_schools', lang);
        }
        return getLocalizedResponse('school_uniforms', lang);
    }
    
    // Check for location/map queries
    if (lowerMsg.includes('where') || lowerMsg.includes('location') || lowerMsg.includes('address') || 
        lowerMsg.includes('find you') || lowerMsg.includes('directions') || lowerMsg.includes('map')) {
        if (lowerMsg.includes('map') || lowerMsg.includes('show me') || lowerMsg.includes('see on map')) {
            showMap();
            return getLocalizedResponse('show_map', lang);
        }
        return getLocalizedResponse('location', lang);
    }
    
    // Basic greetings and common queries
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        return getLocalizedResponse('greeting', lang);
    } else if (lowerMsg.includes('who are you') || lowerMsg.includes('what are you')) {
        return getLocalizedResponse('who_are_you', lang);
    } else if (lowerMsg.includes('hours') || lowerMsg.includes('open') || lowerMsg.includes('time')) {
        return getLocalizedResponse('working_hours', lang);
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email') || 
               lowerMsg.includes('reach') || lowerMsg.includes('call')) {
        return getLocalizedResponse('contact', lang);
    }
    
    // Default response if no match found
    return getLocalizedResponse('default', lang);
}

// Show map in the chat
function showMap() {
    // Create map container
    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    mapContainer.style.marginTop = '10px';
    mapContainer.style.height = '200px';
    mapContainer.style.borderRadius = '8px';
    mapContainer.style.overflow = 'hidden';
    
    // Create iframe for Google Maps
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7500000000005!2d30.450000000000003!3d-0.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzAnMDAuMCJTIDMwwrAyNycwMC4wIkU!5e0!3m2!1sen!2sug!4v1234567890123!5m2!1sen!2sug';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.style.border = '0';
    iframe.allowFullscreen = '';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    
    mapContainer.appendChild(iframe);
    
    // Add map to the chat
    const messageDiv = document.querySelector('.chat-message.bot:last-child .message-content');
    if (messageDiv) {
        messageDiv.appendChild(document.createElement('br'));
        messageDiv.appendChild(mapContainer);
        
        // Scroll to show the map
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// Add Message to Chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? chatbotConfig.botAvatar : chatbotConfig.userAvatar;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Check if text contains markdown links and convert them to HTML
    if (typeof text === 'string' && text.includes('[') && text.includes('](') && text.includes(')')) {
        const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
        parts.forEach(part => {
            if (part.startsWith('[') && part.includes('](')) {
                const [linkText, linkUrl] = part.slice(1, -1).split('](');
                const link = document.createElement('a');
                link.href = linkUrl;
                link.textContent = linkText;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.style.color = '#4a90e2';
                link.style.textDecoration = 'underline';
                content.appendChild(link);
            } else if (part.trim() !== '') {
                content.appendChild(document.createTextNode(part));
            }
        });
    } else {
        content.textContent = text;
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatBody.appendChild(messageDiv);
    
    // Add to chat history (store the original text, not the HTML)
    chatbotState.chatHistory.push({ text, sender });
    if (chatbotState.chatHistory.length > chatbotConfig.maxChatHistory) {
        chatbotState.chatHistory.shift();
    }
    
    // Auto-scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
    
    return messageDiv;
}

// Add System Message (from knowledge base)
function addSystemMessage(messageKey) {
    const response = getLocalizedResponse(messageKey, chatbotState.currentLanguage);
    addMessage(response, 'bot');
}

// Get Localized Response
function getLocalizedResponse(key, lang) {
    // If the key exists in our knowledge base
    if (chatbotKnowledge[key] && chatbotKnowledge[key][lang]) {
        return chatbotKnowledge[key][lang];
    }
    
    // Default responses if key not found
    const defaultResponses = {
        en: "I'm sorry, I don't have information about that. Could you rephrase your question?",
        lg: 'Nsonyiwa, sirina kye ndayinza kukutegeza. Osobola okunvununula ekibuuzo?',
        sw: 'Samahani, sina habari kuhusu hilo. Unaweza kusema kwa njia nyingine?',
        fr: 'Je suis désolé, je n\'ai pas d\'informations à ce sujet. Pourriez-vous reformuler votre question?'
    };
    
    return defaultResponses[lang] || defaultResponses[chatbotConfig.defaultLanguage];
}

// Update Chat UI when language changes
function updateChatUI() {
    // Update placeholder text based on language
    const placeholders = {
        en: 'Type your message...',
        lg: 'Wandiika obubaka bwo...',
        sw: 'Andika ujumbe wako...',
        fr: 'Tapez votre message...'
    };
    chatInput.placeholder = placeholders[chatbotState.currentLanguage] || placeholders[chatbotConfig.defaultLanguage];
}

// Make Element Draggable
function makeDraggable(handle, target) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    handle.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position
        target.style.top = (target.offsetTop - pos2) + "px";
        target.style.left = (target.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Initialize the chatbot when the DOM is fully loaded
function initChatbot() {
    // Suppress extension-related errors first
    const suppressExtensionErrors = () => {
        if (window.chrome && chrome.runtime) {
            try {
                if (chrome.runtime.onMessage) {
                    chrome.runtime.onMessage.addListener(() => true);
                }
            } catch (e) {
                // Ignore any extension-related errors
            }
        }
    };
    
    // Initialize the chat widget
    const initializeChatWidget = () => {
        try {
            if (!document.querySelector('.chatbot-widget')) {
                createChatbotHTML();
            }
            return true;
        } catch (e) {
            console.error('Failed to create chat widget:', e);
            return false;
        }
    };
    
    // Set up event listeners with error handling
    const setupChatListeners = () => {
        try {
            setupEventListeners();
            return true;
        } catch (e) {
            console.warn('Some event listeners could not be attached:', e);
            return false;
        }
    };
    
    // Show the chat toggle
    const showChatToggle = () => {
        try {
            const chatToggle = document.getElementById('chatbotToggle');
            if (chatToggle) {
                chatToggle.style.display = 'flex';
            }
            return true;
        } catch (e) {
            console.warn('Could not show chat toggle:', e);
            return false;
        }
    };
    
    // Main initialization routine
    try {
        // Suppress extension errors first
        suppressExtensionErrors();
        
        // Initialize the chat widget
        if (initializeChatWidget()) {
            // Set up event listeners
            setupChatListeners();
            
            // Add greeting if possible
            try {
                addSystemMessage('greeting');
            } catch (e) {
                console.warn('Could not add initial greeting:', e);
            }
            
            // Show the chat toggle
            showChatToggle();
            
            console.log('Chatbot initialized successfully');
        } else {
            console.error('Failed to initialize chat widget');
        }
    } catch (error) {
        console.error('Unexpected error during chatbot initialization:', error);
    }
}

// Export the initialize function for script loading
if (typeof window !== 'undefined') {
    window.initChatbot = initChatbot;
}
