# Visual Product Matcher 🤖✨

Find products with a picture! This AI-powered web application lets you upload an image and instantly discovers visually similar items from a product catalog. It leverages the power of Google's Gemini AI to understand the contents of your image and perform a smart semantic search.

![Visual Product Matcher Demo](https://visual-matcher.vercel.app)
<!-- NOTE: do not upload images till the database is loaded!! -->

---

## 🌟 Key Features

* 🖼️ **Multiple Upload Options**: Upload images via file selection, drag-and-drop, or by pasting an image URL.
* 🧠 **AI-Powered Analysis**: Utilizes the **Google Gemini 1.5 Flash** model to analyze image content, identify the primary product category, and generate relevant search keywords.
* ⚡ **Smart Semantic Search**: Ranks products based on the AI analysis, providing more relevant results than simple tag-based searching.
* 🔐 **Secure & Scalable Backend**: Protects the Google AI API key by using a serverless function as a secure backend proxy. **Your API key is never exposed in the frontend code.**
* 💅 **Modern & Responsive UI**: A clean, intuitive interface built with **Tailwind CSS**, featuring smooth animations, skeleton loaders for a better user experience, and toast notifications for feedback.
* 🇮🇳 **Localized Pricing**: Product prices are fetched in USD and displayed in Indian Rupees (₹).

---

## 🛠️ Tech Stack

| Area       | Technology                                                                                                    |
| :--------- | :------------------------------------------------------------------------------------------------------------ |
| **Frontend** | `HTML5`, `Tailwind CSS`, `Vanilla JavaScript (ES6+)`                                                          |
| **AI Model** | `Google Gemini 1.5 Flash`                                                                                     |
| **Backend** | `Serverless Function` (Node.js runtime, designed for Vercel/Netlify)                                          |
| **Deployment**| `Vercel` or any platform supporting serverless functions                                                        |
| **Data Source**| `DummyJSON API` for the product catalog                                                                       |

---

## 🚀 How It Works

The application follows a secure and efficient workflow to process user requests without exposing sensitive API keys.

1.  **Image Upload**: The user uploads an image on the frontend.
2.  **Secure API Call**: The frontend sends the image data (as Base64) to a local backend endpoint (`/api/analyze`).
3.  **Serverless Function**: This endpoint is a serverless function running on the Vercel platform. It securely accesses the `GEMINI_API_KEY` stored as an environment variable.
4.  **AI Analysis**: The serverless function sends the image and a list of product categories to the Google Gemini API.
5.  **JSON Response**: Gemini returns a structured JSON object containing the most likely `primaryCategory` and an array of `keywords`.
6.  **Filter & Rank**: The frontend receives this JSON and uses it to filter and score products from the catalog, ranking them by relevance.
7.  **Display Results**: The most relevant products are displayed to the user in a responsive grid.

---

## 📦 Setup and Deployment

Deploying this project is straightforward, especially with Vercel.

### Prerequisites

* A **GitHub** account.
* A **Vercel** account.
* A **Google AI API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Deployment Steps

1.  **Fork/Clone the Repository**
    Fork this repository to your own GitHub account, then clone it to your local machine.

2.  **Push to Your GitHub**
    If you cloned it, make sure to push the project to a new repository on your GitHub account.

3.  **Deploy on Vercel**
    * Log in to your Vercel account and click **"Add New... > Project"**.
    * Import the GitHub repository you just created.
    * Vercel will automatically detect the project structure. No special build commands are needed.

4.  **Add Environment Variable (Crucial Step!)**
    * In the project settings on Vercel, navigate to the **"Environment Variables"** section.
    * Add a new variable with the following name and your API key as the value:
        * **Name**: `GEMINI_API_KEY`
        * **Value**: `Your_Google_AI_API_Key_Here`


5.  **Deploy**
    * Click the **"Deploy"** button. Vercel will build and deploy your application.
    * Once finished, you will have a live URL for your Visual Product Matcher!

---

## 📁 Project Structure

The project has a simple and intuitive structure, optimized for deployment on platforms like Vercel.
/
├── api/
│   └── analyze.js   # The secure serverless backend function
│
└── index.html       # The main application file (UI and frontend logic)
