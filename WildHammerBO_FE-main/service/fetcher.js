const API_BASE = import.meta.env.VITE_API_URL;

export const fetcher = async (url, options = {}) => {
    // Use production API URL for deployed frontend
    const baseUrl = API_BASE || (window.location.hostname === 'admin.wildhammer.online' 
        ? 'https://boapi.wildhammer.online' 
        : 'http://localhost:9100');
    
    const headers = options.body instanceof FormData
        ? { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        };

    // Don't add /api prefix if URL already has /api
    const fullUrl = url.startsWith('/api/') 
        ? baseUrl + url 
        : baseUrl + "/api" + url;
    
    const response = await fetch(fullUrl, {
        ...options,
        headers,
        credentials: 'include' // Important for CORS with credentials
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    return response.json();
};

