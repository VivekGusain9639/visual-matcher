// This is your secure backend function.
// It will run on a server, not in the user's browser.

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { imageBase64, categories } = req.body;

        if (!imageBase64 || !categories) {
            return res.status(400).json({ message: 'Missing image data or categories.' });
        }

        // Your API key is stored securely as an "Environment Variable" on the server.
        // It is NEVER exposed to the public.
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
             return res.status(500).json({ message: 'API key is not configured on the server.' });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const prompt = `Analyze the main product in this image. From the following list of categories, choose the single most relevant one: [${categories.map(c => `"${c}"`).join(', ')}]. Then, provide 5-7 additional lowercase search keywords. Return a valid JSON object with two keys: "primaryCategory" (a string) and "keywords" (an array of strings). Example: {"primaryCategory": "mens-shirts", "keywords": ["t-shirt", "clothing", "casual", "cotton", "shirt"]}`;

        const payload = {
            contents: [{
                parts: [
                    { text: prompt },
                    { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }
                ]
            }]
        };

        const googleResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!googleResponse.ok) {
            const errorBody = await googleResponse.json();
            console.error("Google AI API Error:", errorBody);
            return res.status(googleResponse.status).json({ message: 'Failed to get analysis from Google AI.' });
        }

        const result = await googleResponse.json();
        const text = result.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch && jsonMatch[0]) {
            res.status(200).json(JSON.parse(jsonMatch[0]));
        } else {
            res.status(500).json({ message: 'AI response did not contain valid JSON.' });
        }

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
}