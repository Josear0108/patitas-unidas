// API Configuration
// En desarrollo, usa el proxy de Vite. En producción, usa la variable de entorno o la URL completa
//export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api' : 'https://localhost:5176/api');
export const API_BASE_URL = 'http://localhost:5176/api'
// Helper function to make API calls
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Resource not found');
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

