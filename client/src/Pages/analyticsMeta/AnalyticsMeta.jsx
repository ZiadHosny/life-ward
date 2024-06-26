import { useEffect } from 'react'
import AnalticsMetaViewModel from './AnalyticsViewModel';

function AnalyticsMetaTags() {
    const { analytics } = AnalticsMetaViewModel();
    useEffect(() => {
        if (analytics?.data) {
          analytics.data.forEach(item => {
            // Parse the HTML string as text/html
            const parser = new DOMParser();
            const doc = parser.parseFromString(item.value.trim(), 'text/html');
            
            // Extract and handle script elements
            const scriptElements = doc.querySelectorAll('script');
            
            scriptElements.forEach(scriptElement => {
              const script = document.createElement('script');
              
              if (scriptElement.src) {
                // If the script has a src attribute
                script.src = scriptElement.src;
                script.async = scriptElement.async || true;
              } else {
                // Inline script
                script.textContent = scriptElement.textContent;
              }
              
              // Append the script to the document head
              document.head.appendChild(script);
            });
          });
        }
      }, [analytics?.data]);



    return (
        null
    )
}

export default AnalyticsMetaTags