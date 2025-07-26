// Function to load scripts with error handling
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (error) => {
            console.error(`Error loading script: ${src}`, error);
            reject(error);
        };
        document.body.appendChild(script);
    });
}

// Function to show error message
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.style.position = 'fixed';
    errorMessage.style.bottom = '20px';
    errorMessage.style.right = '20px';
    errorMessage.style.backgroundColor = '#ffebee';
    errorMessage.style.color = '#c62828';
    errorMessage.style.padding = '10px 15px';
    errorMessage.style.borderRadius = '4px';
    errorMessage.style.zIndex = '9999';
    errorMessage.style.fontSize = '14px';
    errorMessage.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    errorMessage.textContent = message;
    document.body.appendChild(errorMessage);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        if (document.body.contains(errorMessage)) {
            document.body.removeChild(errorMessage);
        }
    }, 5000);
}

// Initialize chatbot when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load chatbot knowledge base first
        await loadScript('js/chatbot-knowledge.js');
        
        // Then load the chatbot implementation
        await loadScript('js/chatbot.js');
        
        // Initialize the chatbot if the function exists
        if (typeof window.initializeChatbot === 'function') {
            window.initializeChatbot();
        } else {
            throw new Error('Chatbot initialization function not found');
        }
        
        console.log('Chatbot initialized successfully');
    } catch (error) {
        console.error('Failed to initialize chatbot:', error);
        
        // Hide the chat toggle if initialization fails
        const chatToggle = document.getElementById('chatbotToggle');
        if (chatToggle) {
            chatToggle.style.display = 'none';
        }
        
        // Show error message to user
        showErrorMessage('Chat feature is currently unavailable. Please try again later.');
    }
});
