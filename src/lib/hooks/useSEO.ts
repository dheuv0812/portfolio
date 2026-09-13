import { useEffect } from 'react';

/**
 * Custom React Hook to manage page-level metadata.
 * Sets the document title and the description meta tag for search engines.
 */
export function useSEO(title: string, description: string) {
  useEffect(() => {
    // Set document title
    document.title = `${title} | Dhruv Singh - Full-Stack Developer`;

    // Update or create meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [title, description]);
}
