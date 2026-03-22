/**
 * Helper to lazily load and cache pdf.js so we don't block initial page load.
 */
let pdfjsLibPromise = null;

export const getPDFJS = () => {
    if (pdfjsLibPromise) return pdfjsLibPromise;

    pdfjsLibPromise = new Promise((resolve) => {
        if (window.pdfjsLib) { 
            resolve(window.pdfjsLib); 
            return; 
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        
        script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve(window.pdfjsLib);
        };
        
        document.head.appendChild(script);
    });

    return pdfjsLibPromise;
};

/**
 * Extracts all text from a standard PDF File object.
 * @param {File} file 
 * @returns {Promise<string>}
 */
export const extractTextFromPDF = async (file) => {
    try {
        const pdfjsLib = await getPDFJS();
        const arrayBuffer = await file.arrayBuffer();
        
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            // concatenate all strings found on the page
            fullText += content.items.map(item => item.str).join(' ') + ' ';
        }
        
        return fullText.trim();
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Could not parse PDF content.');
    }
};

/**
 * Normalizes reading text or PDF
 */
export const extractFileText = async (file) => {
    if (file.type === 'application/pdf') {
        return await extractTextFromPDF(file);
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read text file'));
            reader.readAsText(file);
        });
    }
    throw new Error('Unsupported file type. Please upload a PDF or TXT file.');
};
