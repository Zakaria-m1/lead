// API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper function to ensure trailing slash
export const apiEndpoint = (path: string) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${API_URL}/${cleanPath}${cleanPath.endsWith('/') ? '' : '/'}`;
};

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'; 