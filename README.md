# 🌾 KrishiMitra (कृषि मित्र) — Farmer Advisory AI & Crop Doctor

**KrishiMitra** is a full-stack, multilingual agricultural advisory platform designed specifically for Indian farmers. It combines state-of-the-art Generative AI (**Google Gemini 3.8 Flash** via `google-genai` SDK) with a specialized Agronomy Knowledge Engine to deliver real-time, practical, and localized crop care advice.

---

## ✨ Key Features

1. 💬 **Multilingual AI Agricultural Advisor (कृषि मित्र चैट)**:
   - Voice speech input (Speech-to-Text) & Voice playback (Text-to-Speech) in multiple Indian languages (Hindi, English, Punjabi, Marathi, Telugu, Tamil).
   - Instant agronomic answers on crop sowing, NPK fertilizer dosages, organic/chemical pest and disease control, irrigation schedules, and post-harvest management.
   - Quick prompt chips for common farmer queries.

2. 🔬 **Crop Doctor (फसल डॉक्टर - Plant Disease Diagnosis)**:
   - Drag-and-drop or camera leaf photo upload for AI-powered lesion analysis.
   - Multimodal computer vision analysis detecting pathogens (fungal, bacterial, viral, pests, nutrient deficiencies).
   - Prescribes organic biological remedies (Neem oil, *Trichoderma*, sour buttermilk, bio-fertilizers) as well as exact chemical fungicides/insecticides with safe per-acre dosages.
   - 1-Click built-in sample disease cases (Tomato Late Blight, Wheat Yellow Rust, Cotton Leaf Curl, Rice Blast) for testing.

3. 🌤️ **Live Farm Weather & Spray Advisory (कृषि मौसम व छिड़काव परामर्श)**:
   - Live meteorological data across major agricultural hubs (Punjab, Haryana, UP, MP, Maharashtra, Rajasthan, Gujarat, Andhra, Bihar, Karnataka) powered by Open-Meteo.
   - **Pesticide/Fertilizer Spray Feasibility Indicator**: Analyzes wind speed, humidity, and rainfall probability to prevent chemical drift or rain wash-off.
   - 5-Day agro-weather forecast and crop-specific irrigation advisories.

4. 📊 **Live Mandi Prices & MSP Tracker (ताज़ा मंडी भाव व MSP)**:
   - Real-time commodity market prices from major APMC mandis (Khanna, Karnal, Indore, Lasalgaon, Nagpur, Ganganagar, Guntur, Kolar, etc.).
   - Interactive search and filter by state or crop.
   - Direct comparison with Government Minimum Support Price (MSP 2024-25/2025-26) with profit/loss indicators and trend signals (Bullish ↗, Steady ➔, Bearish ↘).

5. 📜 **Government Schemes & Subsidies (सरकारी योजनाएं व सब्सिडी)**:
   - Curated catalog of central & state farmer welfare schemes: PM-KISAN, PMFBY (Crop Insurance), KCC (4% Loan), SMAM (Tractor & Machinery 50% Subsidy), PMKSY (Drip Irrigation 55% Subsidy), PM-KUSUM (Solar Pumps 60% Subsidy), Soil Health Card, and PKVY (Organic Farming).
   - Eligibility criteria, documents required, application process, and direct link to official government portals.
   - 1-Click "Ask Advisor" integration to discuss application steps directly in chat.

6. ⚙️ **Dual-Engine Architecture (Online + Smart Offline Fallback)**:
   - **Gemini 3.8 Flash Mode**: Enabled when `GEMINI_API_KEY` is provided in `.env`, system environment, or the in-app Settings modal.
   - **Agronomy Knowledge Engine**: Built-in fallback ensuring full, uninterrupted functionality even without an API key or offline!

---

## 🚀 Quick Start

### 1. Requirements
- Python 3.10+
- Internet connection (for weather, live APMC mandis, and Gemini API)

### 2. Installation
```bash
# Clone or navigate to the directory
cd "c:\Users\psugr\OneDrive\Desktop\farmer chatbot"

# Install dependencies
pip install -r requirements.txt
```

### 3. (Optional) Set Google Gemini API Key
Create a `.env` file or enter it inside the web app settings modal:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
HOST=127.0.0.1
```
*(Get a free Gemini API key at [Google AI Studio](https://aistudio.google.com/))*

### 4. Run the Application
```bash
python run.py
```
Or with Uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```
Open **[http://127.0.0.1:8000](http://127.0.0.1:8000)** in your web browser.

---

## 🌐 Publish a Public Live Link (Render)

1. Revoke any Gemini API key that has been committed or shared, then create a replacement in [Google AI Studio](https://aistudio.google.com/).
2. Push this project to a GitHub repository. Make sure `.env` is not committed; keep secrets in the hosting provider's environment settings.
3. In [Render](https://render.com/), choose **New → Web Service** and connect the repository.
4. Configure the service:
   - **Runtime:** Python
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. In the service's **Environment** settings, add `GEMINI_API_KEY` with your replacement key. Do not put the key in frontend code, GitHub, or this README.
6. Deploy. Render will provide a public `https://...onrender.com` URL; open that link to use the app.

The app's built-in agronomy advice works without a Gemini key, but Gemini chat and image diagnosis need one. Weather data also needs the deployed service to have outbound internet access.

---

## 📁 Project Architecture

```
farmer chatbot/
├── backend/
│   ├── main.py              # FastAPI server with chat, vision diagnosis, weather & mandi APIs
│   └── knowledge_base.py    # Curated agronomy knowledge base, MSP rates, schemes, diseases
├── static/
│   ├── index.html           # Accessible, semantic UI with responsive tabs & modals
│   ├── css/
│   │   └── style.css        # Rich agricultural design system, glassmorphism & dark/light theme
│   └── js/
│       ├── app.js           # Frontend logic, Web Speech API, camera, chat stream & filters
│       └── translations.js  # 6-language translation dictionary (Hindi, English, etc.)
├── run.py                   # One-click launcher with auto browser launch
├── requirements.txt         # Production dependencies
├── .env.example             # Configuration template
└── README.md                # Project documentation
```

---

## 👨‍🌾 Designed for Accessibility
- **Voice Recognition (STT)**: Tap the microphone button to speak queries in Hindi or local language.
- **Voice Readout (TTS)**: Tap the speaker icon on any advisory card to listen to the advice.
- **Large Tap Targets & Visual Contrast**: Designed for outdoor field visibility with one-click dark/light mode toggle.
