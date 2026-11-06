/**
 * KrishiMitra - Modern Frontend Application Controller
 * Handles Multilingual Localization, Chat, Speech STT/TTS, Disease Diagnostics,
 * Live Farm Weather, Mandi Prices & MSP Benchmarks, and Government Schemes.
 */

// Application State
const state = {
    currentLanguage: TRANSLATIONS[localStorage.getItem("krishi_language")]
        ? localStorage.getItem("krishi_language")
        : "Hindi",
    activeTab: "chat",
    chatHistory: [],
    customApiKey: localStorage.getItem("krishi_gemini_key") || "",
    isRecording: false,
    recognition: null,
    speechSynth: window.speechSynthesis,
    currentUtterance: null,
    selectedLeafFile: null,
    weatherHubIndex: 0,
    weatherData: null,
    mandiData: [],
    schemesData: []
};

// Language to Speech Recognition & Synthesis Code Map
const LANG_VOICE_MAP = {
    Hindi: "hi-IN",
    English: "en-IN",
    Punjabi: "pa-IN",
    Marathi: "mr-IN",
    Telugu: "te-IN",
    Tamil: "ta-IN"
};

const LANG_HTML_MAP = {
    Hindi: "hi",
    English: "en",
    Punjabi: "pa",
    Marathi: "mr",
    Telugu: "te",
    Tamil: "ta"
};

// Weather Code to Emoji Icon Mapping
function getWeatherIcon(code) {
    if (code === 0) return "☀️"; // Clear
    if ([1, 2].includes(code)) return "🌤️"; // Mainly clear / partly cloudy
    if (code === 3) return "☁️"; // Overcast
    if ([45, 48].includes(code)) return "🌫️"; // Fog
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "🌧️"; // Rain
    if ([80, 81, 82].includes(code)) return "🌦️"; // Showers
    if ([95, 96, 99].includes(code)) return "⛈️"; // Thunderstorm
    return "⛅";
}

// ==========================================
// 1. Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
    initLanguage();
    initSpeechRecognition();
    initChat();
    initCropDoctor();
    initWeather();
    initMandiPrices();
    initSchemes();
    initSettingsModal();
    checkHealth();
});

// Check API Health
async function checkHealth() {
    try {
        const res = await fetch("/api/health");
        const data = await res.json();
        const badge = document.getElementById("ai-model-badge");
        const statusText = document.getElementById("key-status-badge");
        const t = TRANSLATIONS[state.currentLanguage];

        if (data.gemini_active || state.customApiKey) {
            if (badge) badge.innerHTML = `<span>✨</span><span>${t.model_badge}</span>`;
            if (statusText) statusText.textContent = t.api_key_active || "✅ Gemini 3.8 Flash is active";
        } else {
            if (badge) badge.innerHTML = `<span>🌱</span><span>${t.model_badge}</span>`;
            if (statusText) statusText.textContent = t.api_key_offline || "ℹ️ Built-in agronomy engine is active (API key is optional)";
        }
    } catch (e) {
        console.error("Health check error:", e);
    }
}

// Theme (Dark / Light)
function initTheme() {
    const savedTheme = localStorage.getItem("krishi_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("krishi_theme", next);
            updateThemeIcon(next);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.getElementById("theme-icon");
    if (icon) {
        icon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

// Navigation Tabs
function initNavigation() {
    const tabBtns = document.querySelectorAll(".nav-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tab = btn.getAttribute("data-tab");
            switchTab(tab);
        });
    });
}

function switchTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll(".nav-tab-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-tab") === tabName);
    });
    document.querySelectorAll(".tab-content").forEach(panel => {
        panel.classList.toggle("active", panel.id === `tab-panel-${tabName}`);
    });
}

// Language Switcher
function initLanguage() {
    const select = document.getElementById("language-selector");
    const timelineSelect = document.getElementById("timeline-lang-select");
    if (select) {
        select.addEventListener("change", (e) => setLanguage(e.target.value));
    }
    if (timelineSelect) {
        timelineSelect.value = LANG_HTML_MAP[state.currentLanguage] || "hi";
    }
    applyTranslations(state.currentLanguage);
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;

    state.currentLanguage = lang;
    localStorage.setItem("krishi_language", lang);
    const select = document.getElementById("language-selector");
    const timelineSelect = document.getElementById("timeline-lang-select");
    if (select) select.value = lang;
    if (timelineSelect) timelineSelect.value = LANG_HTML_MAP[lang] || "hi";
    applyTranslations(lang);
}

function onTimelineLangChange() {
    const timelineSelect = document.getElementById("timeline-lang-select");
    const langByCode = Object.fromEntries(
        Object.entries(LANG_HTML_MAP).map(([name, code]) => [code, name])
    );
    if (timelineSelect && langByCode[timelineSelect.value]) {
        setLanguage(langByCode[timelineSelect.value]);
    }
}

function applyTranslations(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.Hindi;
    state.currentLanguage = TRANSLATIONS[lang] ? lang : "Hindi";
    document.documentElement.lang = LANG_HTML_MAP[state.currentLanguage] || "hi";
    document.title = `${t.app_title} - ${t.app_tagline}`;

    // Header
    setText("app-title-text", t.app_title);
    setText("app-tagline-text", t.app_tagline);
    setText("label-nav-chat", t.nav_chat);
    setText("label-nav-doctor", t.nav_doctor);
    setText("label-nav-weather", t.nav_weather);
    setText("label-nav-mandi", t.nav_mandi);
    setText("label-nav-schemes", t.nav_schemes);
    setText("chat-room-title", t.chat_room_title);
    setText("chat-status-desc", t.chat_status_desc);
    setText("model-badge-text", t.model_badge);
    setText("settings-modal-title", t.settings_modal_title);
    setText("settings-modal-desc", t.settings_modal_desc);
    setText("save-key-btn-text", t.save_settings_btn);
    setText("footer-tagline-text", t.footer_tagline);
    const footerBrand = document.querySelector("footer .footer-tag");
    if (footerBrand) footerBrand.textContent = t.footer_brand || "🌾 KrishiMitra";
    const settingsButton = document.getElementById("settings-open-btn");
    if (settingsButton) {
        settingsButton.title = t.settings;
        settingsButton.setAttribute("aria-label", t.settings);
    }
    const languageSelect = document.getElementById("language-selector");
    if (languageSelect) languageSelect.setAttribute("aria-label", t.language_aria || "Select language");
    const themeButton = document.getElementById("theme-toggle-btn");
    if (themeButton) {
        themeButton.title = t.theme_toggle || "Toggle dark or light mode";
        themeButton.setAttribute("aria-label", themeButton.title);
    }
    const navigation = document.getElementById("main-nav");
    if (navigation) navigation.setAttribute("aria-label", t.nav_aria || "Agricultural modules navigation");
    setText("api-key-label", t.api_key_label || "Google Gemini API key:");
    setText("key-status-badge", t.api_key_status_checking || "Checking status...");

    // Chat
    setText("chat-welcome-title", t.chat_welcome_title);
    setText("chat-welcome-desc", t.chat_welcome_desc);
    setText("welcome-listen-text", t.welcome_listen);
    setText("welcome-live-label", t.welcome_live || "⏱️ 24/7");
    setText("welcome-speed-label", t.welcome_speed || "⚡ AI");
    setText("welcome-match-label", t.welcome_match || "🌱");
    setText("timeline-speed-label", t.timeline_speed || "⚡");
    const chatInput = document.getElementById("chat-input");
    if (chatInput) chatInput.placeholder = t.input_placeholder;
    const sendButton = document.getElementById("send-chat-btn");
    if (sendButton) sendButton.title = t.send;
    const micButton = document.getElementById("voice-input-btn");
    if (micButton) micButton.title = state.isRecording ? t.listening : t.input_placeholder;

    // Chat sidebar
    setText("sidebar-weather-title", t.sidebar_weather_title);
    setText("sidebar-helpline-title", t.sidebar_helpline_title);
    setText("helpline-label-kcc", t.helpline_kcc);
    setText("helpline-label-pmk", t.helpline_pmk);
    setText("helpline-label-pmfby", t.helpline_pmfby);
    setText("sidebar-tip-title", t.sidebar_tip_title);
    setText("sidebar-daily-tip-text", t.sidebar_daily_tip);

    // Timeline Header & Stages
    setText("timeline-title-text", t.timeline_title);
    setText("stage-all-text", t.stage_all);
    setText("stage-sowing-text", t.stage_sowing);
    setText("stage-fertilizer-text", t.stage_fertilizer);
    setText("stage-protection-text", t.stage_protection);
    setText("stage-mandi-text", t.stage_mandi);
    setText("stage-schemes-text", t.stage_schemes);
    // Doctor
    setText("doctor-title-text", t.doctor_title);
    setText("doctor-desc-text", t.doctor_desc);
    setText("dropzone-label-text", t.dropzone_text);
    setText("browse-leaf-btn", t.browse_file);
    setText("btn-diagnose-text", t.diagnose_btn);
    setText("sample-cases-title", t.sample_cases);
    setText("label-doctor-crop", t.crop_name);
    setText("label-doctor-symptoms", t.optional_symptoms);
    setText("sample-btn-tomato", t.sample_tomato);
    setText("sample-btn-wheat", t.sample_wheat);
    setText("sample-btn-cotton", t.sample_cotton);
    setText("sample-btn-rice", t.sample_rice);
    setText("report-header-title", t.report_header_title);
    setText("report-header-desc", t.report_header_desc);
    setText("diagnosis-loading-text", t.diagnosis_loading_text);
    setText("diagnosis-placeholder-text", t.diagnosis_placeholder_text);
    setText("rep-crop-label", t.rep_crop_label);
    setText("rep-confidence-label", t.rep_confidence_label);
    setText("rep-pathogen-label", t.rep_pathogen_label);
    setText("rep-symptoms-label", t.rep_symptoms_label);
    setText("remedy-organic-title", t.remedy_organic);
    setText("remedy-chemical-title", t.remedy_chemical);
    setText("remedy-prevention-title", t.remedy_prevention);
    setText("consult-doctor-btn-text", t.consult_doctor_btn);
    const cropInput = document.getElementById("doctor-crop-name");
    if (cropInput) cropInput.placeholder = t.crop_placeholder;
    const symptomsInput = document.getElementById("doctor-symptoms");
    if (symptomsInput) symptomsInput.placeholder = t.symptoms_placeholder;

    // Weather
    setText("weather-title-text", t.weather_title);
    setText("weather-desc-text", t.weather_desc);
    setText("weather-hub-label", t.weather_hub_label);
    setText("metric-temp-label", t.metric_temp);
    setText("metric-humidity-label", t.metric_humidity);
    setText("metric-wind-label", t.metric_wind);
    setText("metric-rain-label", t.metric_rain);
    setText("spray-status-text", t.spray_status_text);
    setText("irrigation-title-text", t.irrigation_title);
    setText("forecast-title-text", t.forecast_title);
    const irrigationDescription = document.getElementById("irrigation-desc-text");
    if (irrigationDescription && !state.weatherData) {
        irrigationDescription.textContent = t.irrigation_normal || irrigationDescription.textContent;
    }
    const diseaseHindiName = document.getElementById("rep-disease-hindi");
    if (diseaseHindiName) diseaseHindiName.style.display = lang === "Hindi" ? "" : "none";

    // Mandi
    setText("mandi-title-text", t.mandi_title);
    setText("mandi-desc-text", t.mandi_desc);
    const mandiSearch = document.getElementById("mandi-search-input");
    if (mandiSearch) mandiSearch.placeholder = t.mandi_search_placeholder;
    setAllOptionLabel("mandi-state-select", t.all_states);
    setAllOptionLabel("mandi-crop-select", t.all_crops);
    localizeDropdownOptions("mandi-state-select", t.localized_states);
    localizeDropdownOptions("mandi-crop-select", t.localized_mandi_options);

    // Schemes
    setText("schemes-title-text", t.schemes_title);
    setText("schemes-desc-text", t.schemes_desc);
    const schemeSearch = document.getElementById("scheme-search-input");
    if (schemeSearch) schemeSearch.placeholder = t.scheme_search_placeholder;
    setAllOptionLabel("scheme-cat-select", t.all_categories);
    localizeDropdownOptions("scheme-cat-select", t.localized_categories);
    const keyHelp = document.querySelector("#settings-modal .form-group small");
    if (keyHelp) keyHelp.textContent = t.key_help || keyHelp.textContent;

    const timelineLanguageSelect = document.getElementById("timeline-lang-select");
    if (languageSelect) languageSelect.value = state.currentLanguage;
    if (timelineLanguageSelect) timelineLanguageSelect.value = LANG_HTML_MAP[state.currentLanguage] || "hi";

    if (state.weatherData) renderWeatherView(state.weatherData);
    if (state.mandiData.length) {
        const search = document.getElementById("mandi-search-input")?.value.trim() || "";
        const stateVal = document.getElementById("mandi-state-select")?.value || "All";
        const cropVal = document.getElementById("mandi-crop-select")?.value || "All";
        filterMandiCards(search, stateVal, cropVal);
    }
    if (state.schemesData.length) {
        const search = document.getElementById("scheme-search-input")?.value.trim() || "";
        const category = document.getElementById("scheme-cat-select")?.value || "All";
        filterSchemes(search, category);
    }

    const activeStage = document.querySelector(".timeline-stage-btn.active")?.getAttribute("data-stage") || "all";
    renderTimelineChips(activeStage);
    checkHealth();
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined && text !== null) el.textContent = text;
}

function setAllOptionLabel(id, label) {
    const select = document.getElementById(id);
    const option = select?.querySelector('option[value="All"]');
    if (option) option.textContent = label;
}

function localizeDropdownOptions(id, labels = {}) {
    const select = document.getElementById(id);
    if (!select) return;
    for (const option of select.options) {
        if (option.value !== "All" && labels[option.value]) {
            option.textContent = labels[option.value];
        }
    }
}

function localizeVisiblePromptChips() {
    const t = TRANSLATIONS[state.currentLanguage];
    document.querySelectorAll(".prompt-chip").forEach((chip, index) => {
        const label = chip.querySelector("span:last-child");
        const originalPrompt = chip.getAttribute("data-original-prompt") || chip.getAttribute("data-prompt");
        if (!originalPrompt) return;

        if (!chip.hasAttribute("data-original-prompt")) {
            chip.setAttribute("data-original-prompt", originalPrompt);
        }
        if (label && !chip.hasAttribute("data-original-text")) {
            chip.setAttribute("data-original-text", label.textContent || "");
        }

        if (state.currentLanguage !== "Hindi") {
            const quickPrompt = getLocalizedQuickPromptItems()[index];
            chip.style.display = quickPrompt ? "" : "none";
            if (!quickPrompt) return;
            chip.setAttribute("data-prompt", quickPrompt.prompt);
            if (label) label.textContent = quickPrompt.text;
        } else {
            chip.style.display = "";
            chip.setAttribute("data-prompt", originalPrompt);
            if (label) label.textContent = chip.getAttribute("data-original-text") || "";
        }
    });
}

function getLocalizedQuickPromptItems() {
    const t = TRANSLATIONS[state.currentLanguage];
    return [1, 2, 3, 4, 5].map(index => ({
        icon: ["🌾", "🌱", "🐛", "💰", "🚜"][index - 1],
        text: t[`chip_${index}`],
        prompt: t[`chip_${index}_prompt`]
    }));
}

// ==========================================
// 2. Speech Recognition & Synthesis (Voice)
// ==========================================
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const micBtn = document.getElementById("voice-input-btn");
    
    if (!SpeechRecognition) {
        if (micBtn) {
            micBtn.title = TRANSLATIONS[state.currentLanguage].speech_not_supported || "Speech Recognition is not supported in this browser";
        }
        return;
    }

    state.recognition = new SpeechRecognition();
    state.recognition.continuous = false;
    state.recognition.interimResults = false;

    state.recognition.onstart = () => {
        state.isRecording = true;
        if (micBtn) {
            micBtn.classList.add("recording");
            micBtn.title = TRANSLATIONS[state.currentLanguage].listening_now || TRANSLATIONS[state.currentLanguage].listening;
        }
    };

    state.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById("chat-input");
        if (input && transcript) {
            input.value = transcript;
            // Automatically submit spoken prompt
            sendChatMessage(transcript);
        }
    };

    state.recognition.onerror = (event) => {
        console.warn("Speech error:", event.error);
        stopListening();
    };

    state.recognition.onend = () => {
        stopListening();
    };

    if (micBtn) {
        micBtn.addEventListener("click", () => {
            if (state.isRecording) {
                stopListening();
            } else {
                startListening();
            }
        });
    }
}

function startListening() {
    if (!state.recognition) return;
    const langCode = LANG_VOICE_MAP[state.currentLanguage] || "hi-IN";
    state.recognition.lang = langCode;
    try {
        state.recognition.start();
    } catch (e) {
        console.warn("Recognition start failed:", e);
    }
}

function stopListening() {
    state.isRecording = false;
    const micBtn = document.getElementById("voice-input-btn");
    if (micBtn) {
        micBtn.classList.remove("recording");
        micBtn.title = TRANSLATIONS[state.currentLanguage].voice_input || "Voice input";
    }
    if (state.recognition) {
        try { state.recognition.stop(); } catch (e) {}
    }
}

// Text-to-Speech (TTS)
function speakText(text, btnElement) {
    if (!('speechSynthesis' in window)) return;

    if (state.speechSynth.speaking) {
        state.speechSynth.cancel();
        if (btnElement && btnElement.classList.contains("playing")) {
            btnElement.classList.remove("playing");
            return;
        }
    }

    // Strip markdown formatting for speech
    const cleanText = text
        .replace(/[*#_`>]/g, "")
        .replace(/###/g, "")
        .replace(/- /g, " ")
        .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = LANG_VOICE_MAP[state.currentLanguage] || "hi-IN";
    utterance.rate = 0.95;

    if (btnElement) {
        btnElement.classList.add("playing");
        utterance.onend = () => btnElement.classList.remove("playing");
        utterance.onerror = () => btnElement.classList.remove("playing");
    }

    state.currentUtterance = utterance;
    state.speechSynth.speak(utterance);
}

// ==========================================
// 3. KrishiMitra Chat Engine
// ==========================================
// Timeline Crop Stage Data Mapping
const TIMELINE_STAGE_DATA = {
    all: [
        { icon: "📊", text: "गेहूं मंडी भाव व MSP", prompt: "गेहूं का आज का ताज़ा मंडी भाव और MSP कितना है?" },
        { icon: "🌾", text: "पीला रतुआ इलाज", prompt: "गेहूं में पीला रतुआ का पक्का इलाज और दवा की मात्रा बताएं" },
        { icon: "🌱", text: "धान खाद खुराक", prompt: "धान की फसल में डीएपी और यूरिया की संतुलित खुराक कब दें?" },
        { icon: "🍅", text: "टमाटर मंडी भाव", prompt: "टमाटर का आज का ताज़ा मंडी भाव क्या है?" },
        { icon: "🐛", text: "टमाटर पत्ता मरोड़", prompt: "टमाटर में पत्ता मरोड़ और सफेद मक्खी की रोकथाम कैसे करें?" },
        { icon: "💧", text: "गेहूं पहली सिंचाई", prompt: "गेहूं में पहली सिंचाई (CRI अवस्था) और खाद कब दें?" },
        { icon: "💰", text: "PM-KISAN ₹6000", prompt: "पीएम किसान सम्मान निधि ₹6000 योजना में आवेदन कैसे करें?" },
        { icon: "🚜", text: "यंत्र सब्सिडी", prompt: "ट्रैक्टर और कृषि यंत्रों पर सरकारी सब्सिडी कैसे प्राप्त करें?" }
    ],
    sowing: [
        { icon: "🌾", text: "गेहूं बुवाई व किस्में", prompt: "गेहूं की उन्नत किस्में और बुवाई का सही समय व बीज दर क्या है?" },
        { icon: "🍚", text: "धान नर्सरी तैयारी", prompt: "धान की नर्सरी कब और कैसे तैयार करें?" },
        { icon: "🌱", text: "सरसों बुवाई समय", prompt: "सरसों की बुवाई का उपयुक्त समय और उन्नत किस्में बताएं" },
        { icon: "🥔", text: "आलू बुवाई व बीज उपचार", prompt: "आलू की बुवाई और बीज उपचार का सही तरीका क्या है?" },
        { icon: "🌽", text: "मक्का बुवाई विधि", prompt: "मक्का की उन्नत खेती और बुवाई का समय क्या है?" }
    ],
    fertilizer: [
        { icon: "🌱", text: "धान खाद व यूरिया खुराक", prompt: "धान की फसल में डीएपी और यूरिया की संतुलित खुराक कब दें?" },
        { icon: "🌾", text: "गेहूं में यूरिया व जिंक", prompt: "गेहूं में पहली खाद, यूरिया और जिंक कब और कितनी मात्रा में डालें?" },
        { icon: "🧪", text: "सॉइल हेल्थ कार्ड जांच", prompt: "सॉइल हेल्थ कार्ड (मृदा स्वास्थ्य कार्ड) से मिट्टी जांच कैसे कराएं?" },
        { icon: "🍅", text: "सब्जियों में एनपीके खाद", prompt: "टमाटर और सब्जियों में संतुलित NPK और सूक्ष्म पोषक तत्व कैसे दें?" },
        { icon: "🍂", text: "जैविक खाद व वर्मीकंपोस्ट", prompt: "जैविक खाद और केंचुआ खाद बनाने की सही विधि क्या है?" }
    ],
    protection: [
        { icon: "🌾", text: "गेहूं पीला रतुआ इलाज", prompt: "गेहूं में पीला रतुआ का पक्का इलाज और दवा की मात्रा बताएं" },
        { icon: "🍅", text: "टमाटर पत्ता मरोड़ व मक्खी", prompt: "टमाटर में पत्ता मरोड़ और सफेद मक्खी की रोकथाम कैसे करें?" },
        { icon: "🐛", text: "धान तना छेदक व सुंडी", prompt: "धान में तना छेदक और पत्ता लपेटक कीट का पक्का नियंत्रण बताएं" },
        { icon: "🌿", text: "गेहूं गुल्ली डंडा खरपतवार", prompt: "गेहूं में गुल्ली डंडा (मंडूसी / कनकौआ) खरपतवार की पक्की दवा बताएं" },
        { icon: "🥔", text: "आलू पछेती झुलसा", prompt: "आलू में पछेती झुलसा (Late Blight) रोग का रासायनिक व जैविक इलाज बताएं" },
        { icon: "🟡", text: "सरसों माहू/चेपा कीट", prompt: "सरसों में चेपा (माहू) कीट का प्रकोप रोकने के लिए कौन सी दवा छिड़कें?" }
    ],
    mandi: [
        { icon: "🌾", text: "गेहूं मंडी भाव व MSP", prompt: "गेहूं का आज का ताज़ा मंडी भाव और MSP कितना है?" },
        { icon: "🍚", text: "धान व बासमती भाव", prompt: "धान और बासमती चावल का आज का मंडी भाव क्या है?" },
        { icon: "🍅", text: "टमाटर ताज़ा मंडी भाव", prompt: "टमाटर का आज का ताज़ा मंडी भाव क्या है?" },
        { icon: "🥔", text: "आलू मंडी भाव व स्टोरेज", prompt: "आलू का आज का मंडी भाव क्या है?" },
        { icon: "🧅", text: "प्याज लासलगांव भाव", prompt: "लासलगांव मंडी में प्याज का ताज़ा भाव क्या है?" },
        { icon: "🟡", text: "सरसों मंडी भाव व MSP", prompt: "सरसों का ताज़ा मंडी भाव और समर्थन मूल्य क्या है?" },
        { icon: "🌿", text: "कपास (कॉटन) भाव", prompt: "कपास (कॉटन) का आज का मंडी भाव क्या चल रहा है?" },
        { icon: "📋", text: "सभी फसलों के आज के भाव", prompt: "आज के सभी प्रमुख मंडी भाव और MSP बुलेटिन दिखाएं" }
    ],
    schemes: [
        { icon: "💰", text: "PM-KISAN ₹6000", prompt: "पीएम किसान सम्मान निधि ₹6000 योजना में आवेदन कैसे करें?" },
        { icon: "💳", text: "KCC 4% सस्ता लोन", prompt: "किसान क्रेडिट कार्ड (KCC) से 4% ब्याज पर सस्ता कृषि ऋण कैसे प्राप्त करें?" },
        { icon: "🚜", text: "ट्रैक्टर व यंत्र 50% सब्सिडी", prompt: "ट्रैक्टर और कृषि यंत्रों पर सरकारी सब्सिडी कैसे प्राप्त करें?" },
        { icon: "☀️", text: "सोलर पंप 60% सब्सिडी", prompt: "पीएम कुसुम योजना (सोलर पंप) में 60% सरकारी सब्सिडी कैसे पाएं?" },
        { icon: "🛡️", text: "फसल बीमा योजना (PMFBY)", prompt: "प्रधानमंत्री फसल बीमा योजना (PMFBY) का लाभ कैसे उठाएं?" },
        { icon: "💧", text: "ड्रिप व स्प्रिंकलर सब्सिडी", prompt: "ड्रिप और स्प्रिंकलर फव्वारा सिंचाई पर सरकारी सब्सिडी कैसे प्राप्त करें?" }
    ]
};

// ==========================================
// 3. KrishiMitra Chat Engine
// ==========================================
function initChat() {
    const sendBtn = document.getElementById("send-chat-btn");
    const chatInput = document.getElementById("chat-input");
    const welcomeSpeakBtn = document.getElementById("speak-welcome-btn");

    if (welcomeSpeakBtn) {
        welcomeSpeakBtn.addEventListener("click", () => {
            const welcomeText = document.getElementById("chat-welcome-desc")?.textContent || "";
            speakText(welcomeText, welcomeSpeakBtn);
        });
    }

    if (sendBtn && chatInput) {
        sendBtn.addEventListener("click", () => {
            const q = chatInput.value.trim();
            if (q) sendChatMessage(q);
        });

        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const q = chatInput.value.trim();
                if (q) sendChatMessage(q);
            }
        });
    }

    initTimelineStages();
}

function initTimelineStages() {
    const stageBtns = document.querySelectorAll(".timeline-stage-btn");
    stageBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            stageBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const stage = btn.getAttribute("data-stage") || "all";
            renderTimelineChips(stage);
        });
    });

    // Bind default chips
    bindPromptChips();
}

function renderTimelineChips(stage) {
    const container = document.getElementById("quick-prompts-bar");
    if (!container) return;
    const items = state.currentLanguage === "Hindi"
        ? (TIMELINE_STAGE_DATA[stage] || TIMELINE_STAGE_DATA.all)
        : getLocalizedQuickPromptItems();
    container.innerHTML = "";
    items.forEach((item, idx) => {
        const chip = document.createElement("button");
        chip.className = "prompt-chip";
        chip.id = `prompt-chip-${idx + 1}`;
        chip.setAttribute("data-prompt", item.prompt);
        chip.innerHTML = `<span>${item.icon}</span> <span>${item.text}</span>`;
        chip.addEventListener("click", () => {
            sendChatMessage(chip.getAttribute("data-prompt") || item.prompt);
        });
        container.appendChild(chip);
    });
    localizeVisiblePromptChips();
}

function bindPromptChips() {
    const promptChips = document.querySelectorAll(".prompt-chip");
    promptChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const text = chip.getAttribute("data-prompt");
            if (text) sendChatMessage(text);
        });
    });
}

async function sendChatMessage(query) {
    const chatBox = document.getElementById("chat-messages-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-chat-btn");

    if (!query || !chatBox) return;

    if (chatInput) chatInput.value = "";
    if (sendBtn) sendBtn.disabled = true;

    // Timeline Timestamps
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const startTime = performance.now();

    // Append User Message with Timeline Stamp
    appendMessage("user", query, { timeStr });

    // Create Assistant Message Element for Real-Time Streaming
    const msgId = "stream-msg-" + Date.now();
    const assistantRow = document.createElement("div");
    assistantRow.className = "message-row assistant";
    assistantRow.id = msgId;

    assistantRow.innerHTML = `
        <div class="message-avatar">🌾</div>
        <div class="message-bubble">
            <div class="message-meta-timeline">
                <span class="timeline-stamp">⏱️ ${timeStr}</span>
                <span class="timeline-tag speed-tag">⚡ ${TRANSLATIONS[state.currentLanguage].preparing_answer || TRANSLATIONS[state.currentLanguage].typing_text}</span>
            </div>
            <div class="bubble-content-text">
                <span class="streaming-cursor">▌</span>
            </div>
            <button type="button" class="skip-stream-btn" id="skip-btn-${msgId}" title="${TRANSLATIONS[state.currentLanguage].show_full_answer || "Show the complete answer now"}">
                ⏩ ${TRANSLATIONS[state.currentLanguage].show_full_answer || "Show full answer"}
            </button>
        </div>
    `;
    chatBox.appendChild(assistantRow);
    chatBox.scrollTop = chatBox.scrollHeight;

    const contentDiv = assistantRow.querySelector(".bubble-content-text");
    const skipBtn = document.getElementById(`skip-btn-${msgId}`);
    let fullText = "";
    let isStreamActive = true;
    let streamFinalSource = "knowledge_engine";
    let streamMatchBadge = state.currentLanguage === "Hindi" ? "🎯 सटीक मैच" : "🎯";

    function finishStream(completedText, source, matchBadge, durationSec) {
        if (!isStreamActive) return;
        isStreamActive = false;
        if (skipBtn) skipBtn.remove();

        fullText = completedText;
        if (contentDiv) {
            contentDiv.innerHTML = formatMarkdownText(fullText);
        }

        // Update Timeline Meta bar
        const metaDiv = assistantRow.querySelector(".message-meta-timeline");
        if (metaDiv) {
            metaDiv.innerHTML = `
                <span class="timeline-stamp">⏱️ ${timeStr}</span>
                <span class="timeline-tag speed-tag">⚡ ${TRANSLATIONS[state.currentLanguage].answered_in || "Answered in"} ${durationSec}s</span>
                <span class="timeline-tag match-tag">${matchBadge || "🎯"}</span>
            `;
        }

        // Add Bubble Actions (Speak, Copy)
        const bubble = assistantRow.querySelector(".message-bubble");
        if (bubble && !bubble.querySelector(".bubble-actions")) {
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "bubble-actions";
            actionsDiv.innerHTML = `
                <button class="action-chip-btn speak-btn" title="${TRANSLATIONS[state.currentLanguage].listen}">
                    <span>🔊</span> <span>${TRANSLATIONS[state.currentLanguage].listen}</span>
                </button>
                <button class="action-chip-btn copy-btn" title="${TRANSLATIONS[state.currentLanguage].copy || "Copy"}">
                    <span>📋</span> <span>${TRANSLATIONS[state.currentLanguage].copy || "Copy"}</span>
                </button>
                ${source === "gemini" ? '<span style="font-size:0.72rem; color:var(--text-muted); margin-left:auto;">✨ Gemini 3.8</span>' : ''}
            `;
            bubble.appendChild(actionsDiv);

            const speakBtn = actionsDiv.querySelector(".speak-btn");
            if (speakBtn) speakBtn.addEventListener("click", () => speakText(fullText, speakBtn));

            const copyBtn = actionsDiv.querySelector(".copy-btn");
            if (copyBtn) {
                copyBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText(fullText);
                    copyBtn.innerHTML = `<span>✓</span> <span>${TRANSLATIONS[state.currentLanguage].copied || "Copied"}</span>`;
                    setTimeout(() => {
                        copyBtn.innerHTML = `<span>📋</span> <span>${TRANSLATIONS[state.currentLanguage].copy || "Copy"}</span>`;
                    }, 2000);
                });
            }
        }

        // Update conversation state history
        state.chatHistory.push({ role: "user", content: query });
        state.chatHistory.push({ role: "assistant", content: fullText });
        if (state.chatHistory.length > 10) state.chatHistory = state.chatHistory.slice(-10);

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    if (skipBtn) {
        skipBtn.addEventListener("click", () => {
            const durationSec = ((performance.now() - startTime) / 1000).toFixed(2);
            finishStream(fullText, streamFinalSource, streamMatchBadge, durationSec);
        });
    }

    // Try Real-Time Streaming Endpoint
    try {
        const payload = {
            message: query,
            language: state.currentLanguage,
            history: state.chatHistory,
            api_key: state.customApiKey || undefined
        };

        const response = await fetch("/api/chat/stream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok || !response.body) {
            throw new Error("Streaming endpoint unavailable, fallback to standard chat");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith("data: ")) {
                    try {
                        const parsed = JSON.parse(trimmed.slice(6));
                        if (parsed.chunk) {
                            fullText += parsed.chunk;
                            if (isStreamActive && contentDiv) {
                                contentDiv.innerHTML = formatMarkdownText(fullText) + '<span class="streaming-cursor">▌</span>';
                                chatBox.scrollTop = chatBox.scrollHeight;
                            }
                        }
                        if (parsed.done) {
                            streamFinalSource = parsed.source || "knowledge_engine";
                            streamMatchBadge = parsed.match_badge || (state.currentLanguage === "Hindi" ? "🎯 सटीक मैच" : "🎯");
                            const durationSec = parsed.duration_s || ((performance.now() - startTime) / 1000).toFixed(2);
                            finishStream(fullText, streamFinalSource, streamMatchBadge, durationSec);
                            return;
                        }
                    } catch (e) {
                        console.warn("SSE parse error:", e);
                    }
                }
            }
        }

        const durationSec = ((performance.now() - startTime) / 1000).toFixed(2);
        finishStream(fullText, streamFinalSource, streamMatchBadge, durationSec);

    } catch (streamErr) {
        console.warn("Streaming notice, falling back to /api/chat:", streamErr);
        // Fallback to /api/chat with rapid typewriter simulation
        try {
            const payload = {
                message: query,
                language: state.currentLanguage,
                history: state.chatHistory,
                api_key: state.customApiKey || undefined
            };

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            const reply = data.reply || TRANSLATIONS[state.currentLanguage].chat_no_answer || "Sorry, no answer was received. Please try again.";
            const durationSec = data.duration_s || ((performance.now() - startTime) / 1000).toFixed(2);
            finishStream(reply, data.source, data.match_badge, durationSec);
        } catch (chatErr) {
            console.error("Chat error:", chatErr);
            finishStream(
                TRANSLATIONS[state.currentLanguage].chat_connection_error || "⚠️ Could not connect to the server. Please try again.",
                "error",
                state.currentLanguage === "Hindi" ? "⚠️ त्रुटि" : "⚠️ Error",
                "0.00"
            );
        }
    } finally {
        if (sendBtn) sendBtn.disabled = false;
        if (chatInput) chatInput.focus();
    }
}

function appendMessage(role, text, meta = {}) {
    const chatBox = document.getElementById("chat-messages-box");
    if (!chatBox) return;

    const row = document.createElement("div");
    row.className = `message-row ${role}`;

    const formattedHtml = formatMarkdownText(text);
    const now = new Date();
    const timeStr = meta.timeStr || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let metaHtml = "";
    if (role === "user") {
        metaHtml = `
            <div class="message-meta-timeline">
                <span class="timeline-stamp">⏱️ ${timeStr}</span>
                <span class="timeline-tag">${TRANSLATIONS[state.currentLanguage].question_asked || "Question asked"}</span>
            </div>
        `;
    } else {
        const speedTag = meta.speedText ? `<span class="timeline-tag speed-tag">⚡ ${meta.speedText}</span>` : "";
        const matchTag = meta.matchBadge ? `<span class="timeline-tag match-tag">${meta.matchBadge}</span>` : "";
        metaHtml = `
            <div class="message-meta-timeline">
                <span class="timeline-stamp">⏱️ ${timeStr}</span>
                ${speedTag}
                ${matchTag}
            </div>
        `;
    }

    let actionsHtml = "";
    if (role === "assistant") {
        actionsHtml = `
            <div class="bubble-actions">
                <button class="action-chip-btn speak-btn" title="${TRANSLATIONS[state.currentLanguage].listen}">
                    <span>🔊</span> <span>${TRANSLATIONS[state.currentLanguage].listen}</span>
                </button>
                <button class="action-chip-btn copy-btn" title="${TRANSLATIONS[state.currentLanguage].copy || "Copy"}">
                    <span>📋</span> <span>${TRANSLATIONS[state.currentLanguage].copy || "Copy"}</span>
                </button>
                ${meta.source === "gemini" ? '<span style="font-size:0.72rem; color:var(--text-muted); margin-left:auto;">✨ Gemini 3.8</span>' : ''}
            </div>
        `;
    }

    row.innerHTML = `
        <div class="message-avatar">${role === 'user' ? '👨‍🌾' : '🌾'}</div>
        <div class="message-bubble">
            ${metaHtml}
            <div class="bubble-content-text">${formattedHtml}</div>
            ${actionsHtml}
        </div>
    `;

    chatBox.appendChild(row);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Bind event listeners for actions
    const speakBtn = row.querySelector(".speak-btn");
    if (speakBtn) {
        speakBtn.addEventListener("click", () => speakText(text, speakBtn));
    }

    const copyBtn = row.querySelector(".copy-btn");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(text);
            copyBtn.innerHTML = `<span>✓</span> <span>${TRANSLATIONS[state.currentLanguage].copied || "Copied"}</span>`;
            setTimeout(() => {
                copyBtn.innerHTML = `<span>📋</span> <span>${TRANSLATIONS[state.currentLanguage].copy || "Copy"}</span>`;
            }, 2000);
        });
    }
}

// Basic Markdown & Table formatting helper
function formatMarkdownText(raw) {
    if (!raw) return "";
    let html = raw
        .replace(/### (.*?)\n/g, "<h3>$1</h3>")
        .replace(/## (.*?)\n/g, "<h3>$1</h3>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert bullet points, numbered lists and markdown tables
    const lines = html.split("\n");
    let inList = false;
    let listType = "ul";
    let inTable = false;
    let tableHtml = [];
    let result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Check if table row
        if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
            if (inList) {
                result.push(`</${listType}>`);
                inList = false;
            }
            if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
                continue;
            }
            if (!inTable) {
                inTable = true;
                tableHtml = ['<div class="table-responsive" style="overflow-x:auto; margin:0.6rem 0;"><table class="agro-data-table" style="width:100%; border-collapse:collapse; font-size:0.84rem;">'];
                const cells = trimmed.split("|").slice(1, -1);
                tableHtml.push("<thead style='background:var(--bg-surface-elevated);'><tr>" + cells.map(c => `<th style='padding:0.4rem 0.6rem; border:1px solid var(--border-color); text-align:left;'>${c.trim()}</th>`).join("") + "</tr></thead><tbody>");
            } else {
                const cells = trimmed.split("|").slice(1, -1);
                tableHtml.push("<tr>" + cells.map(c => `<td style='padding:0.35rem 0.6rem; border:1px solid var(--border-color);'>${c.trim()}</td>`).join("") + "</tr>");
            }
            continue;
        } else if (inTable) {
            tableHtml.push("</tbody></table></div>");
            result.push(tableHtml.join(""));
            inTable = false;
        }

        // Check if list item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            if (!inList || listType !== "ul") {
                if (inList) result.push(`</${listType}>`);
                result.push("<ul>");
                inList = true;
                listType = "ul";
            }
            result.push(`<li>${trimmed.substring(2)}</li>`);
        } else if (/^\d+\.\s/.test(trimmed)) {
            if (!inList || listType !== "ol") {
                if (inList) result.push(`</${listType}>`);
                result.push("<ol>");
                inList = true;
                listType = "ol";
            }
            result.push(`<li>${trimmed.replace(/^\d+\.\s/, "")}</li>`);
        } else {
            if (inList) {
                result.push(`</${listType}>`);
                inList = false;
            }
            if (trimmed) result.push(`<p>${trimmed}</p>`);
        }
    }
    if (inList) result.push(`</${listType}>`);
    if (inTable) {
        tableHtml.push("</tbody></table></div>");
        result.push(tableHtml.join(""));
    }
    return result.join("");
}

// ==========================================
// 4. Crop Doctor (Disease Diagnosis)
// ==========================================
function initCropDoctor() {
    const dropzone = document.getElementById("leaf-dropzone");
    const fileInput = document.getElementById("leaf-file-input");
    const browseBtn = document.getElementById("browse-leaf-btn");
    const removeBtn = document.getElementById("remove-img-btn");
    const diagnoseBtn = document.getElementById("start-diagnose-btn");

    if (browseBtn && fileInput) {
        browseBtn.addEventListener("click", () => fileInput.click());
    }

    if (dropzone && fileInput) {
        dropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropzone.classList.add("dragover");
        });
        dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
        dropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropzone.classList.remove("dragover");
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleLeafFile(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) {
                handleLeafFile(e.target.files[0]);
            }
        });
    }

    if (removeBtn) {
        removeBtn.addEventListener("click", () => {
            state.selectedLeafFile = null;
            if (fileInput) fileInput.value = "";
            document.getElementById("leaf-preview-container").style.display = "none";
            document.getElementById("leaf-dropzone").style.display = "block";
        });
    }

    if (diagnoseBtn) {
        diagnoseBtn.addEventListener("click", () => startDiagnosis());
    }

    // Sample Cases Buttons
    const sampleBtns = document.querySelectorAll(".sample-badge-btn");
    sampleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const sampleId = btn.getAttribute("data-sample");
            runSampleDiagnosis(sampleId);
        });
    });

    // Jump to chat button in diagnosis report
    const jumpBtn = document.getElementById("consult-doctor-chat-btn");
    if (jumpBtn) {
        jumpBtn.addEventListener("click", () => {
            const diseaseName = document.getElementById("rep-disease-name")?.textContent || "फसल रोग";
            switchTab("chat");
            const q = (TRANSLATIONS[state.currentLanguage].disease_query || TRANSLATIONS.English.disease_query)
                .replace("{disease}", diseaseName);
            sendChatMessage(q);
        });
    }
}

function handleLeafFile(file) {
    if (!file.type.startsWith("image/")) {
        alert(TRANSLATIONS[state.currentLanguage].invalid_image || "Please upload an image file (JPG/PNG) only.");
        return;
    }
    state.selectedLeafFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
        const previewImg = document.getElementById("leaf-preview-img");
        const previewContainer = document.getElementById("leaf-preview-container");
        const dropzone = document.getElementById("leaf-dropzone");

        if (previewImg && previewContainer && dropzone) {
            previewImg.src = e.target.result;
            previewContainer.style.display = "block";
            dropzone.style.display = "none";
        }
    };
    reader.readAsDataURL(file);
}

async function startDiagnosis() {
    const cropName = document.getElementById("doctor-crop-name")?.value.trim() || "";
    const symptoms = document.getElementById("doctor-symptoms")?.value.trim() || "";
    const loadingElem = document.getElementById("diagnosis-loading");
    const placeholder = document.getElementById("diagnosis-empty-placeholder");
    const content = document.getElementById("diagnosis-content");

    if (!state.selectedLeafFile && !symptoms && !cropName) {
        alert(TRANSLATIONS[state.currentLanguage].diagnosis_input_required || "Please upload a leaf photo or enter symptoms or a crop name first.");
        return;
    }

    if (placeholder) placeholder.style.display = "none";
    if (content) content.style.display = "none";
    if (loadingElem) loadingElem.style.display = "block";

    try {
        const formData = new FormData();
        if (state.selectedLeafFile) {
            formData.append("file", state.selectedLeafFile);
        }
        formData.append("crop_name", cropName);
        formData.append("symptoms", symptoms);
        formData.append("language", state.currentLanguage);
        if (state.customApiKey) formData.append("api_key", state.customApiKey);

        const res = await fetch("/api/diagnose", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        renderDiagnosisReport(data);

    } catch (err) {
        console.error("Diagnosis error:", err);
        alert(TRANSLATIONS[state.currentLanguage].diagnosis_error || "There was a problem diagnosing the disease. Please try again.");
    } finally {
        if (loadingElem) loadingElem.style.display = "none";
    }
}

async function runSampleDiagnosis(sampleId) {
    const loadingElem = document.getElementById("diagnosis-loading");
    const placeholder = document.getElementById("diagnosis-empty-placeholder");
    const content = document.getElementById("diagnosis-content");

    if (placeholder) placeholder.style.display = "none";
    if (content) content.style.display = "none";
    if (loadingElem) loadingElem.style.display = "block";

    try {
        const formData = new FormData();
        formData.append("sample_id", sampleId);
        formData.append("language", state.currentLanguage);

        const res = await fetch("/api/diagnose", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        renderDiagnosisReport(data);
    } catch (err) {
        console.error("Sample diagnosis error:", err);
    } finally {
        if (loadingElem) loadingElem.style.display = "none";
    }
}

function renderDiagnosisReport(data) {
    const content = document.getElementById("diagnosis-content");
    if (!content) return;
    const t = TRANSLATIONS[state.currentLanguage];

    setText("rep-disease-name", data.disease_name || t.unknown_disease || (state.currentLanguage === "Hindi" ? "अज्ञात रोग" : "Unknown Disease"));
    setText("rep-disease-hindi", data.disease_name_hindi || "");
    setText("rep-crop", data.crop || t.identified_crop || (state.currentLanguage === "Hindi" ? "पहचाना गया पौधा" : "Identified Plant"));
    setText("rep-confidence", `${data.confidence || 95}%`);
    setText("rep-pathogen", data.pathogen || t.generic_pathogen || (state.currentLanguage === "Hindi" ? "फफूंद / जीवाणु" : "Fungal / bacterial"));
    setText("rep-symptoms", data.symptoms || t.generic_symptoms || (state.currentLanguage === "Hindi" ? "पत्तियों पर रोग के लक्षण दिखाई दिए।" : "Visible symptoms observed on the leaves."));
    setText("rep-prevention", data.prevention || (state.currentLanguage === "Hindi"
        ? "फसल चक्र अपनाएं और बीज उपचार करें।"
        : t.generic_prevention || "Use crop rotation and treat seeds before sowing."));

    // Severity Pill
    const severityElem = document.getElementById("rep-severity");
    if (severityElem) {
        const sev = (data.severity || "Moderate").toLowerCase();
        const severityLabel = t.severity || "Severity";
        const severityValue = t[`severity_${sev}`] || data.severity || (state.currentLanguage === "Hindi" ? "मध्यम" : "Moderate");
        severityElem.textContent = `${severityLabel}: ${severityValue}`;
        severityElem.className = `severity-pill ${sev.includes('sev') ? 'severe' : 'moderate'}`;
    }

    // Organic Remedies List
    const orgList = document.getElementById("rep-organic-list");
    if (orgList) {
        orgList.innerHTML = "";
        const orgItems = data.organic_treatment || [];
        orgItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            orgList.appendChild(li);
        });
    }

    // Chemical Remedies List
    const chemList = document.getElementById("rep-chemical-list");
    if (chemList) {
        chemList.innerHTML = "";
        const chemItems = data.chemical_treatment || [];
        chemItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            chemList.appendChild(li);
        });
    }

    content.style.display = "block";
}

// ==========================================
// 5. Farm Weather & Spray Advisory
// ==========================================
async function initWeather() {
    const hubSelect = document.getElementById("weather-hub-select");
    
    // Load default weather
    await fetchWeatherData(state.weatherHubIndex);

    if (hubSelect) {
        hubSelect.addEventListener("change", (e) => {
            const idx = parseInt(e.target.value, 10);
            state.weatherHubIndex = idx;
            fetchWeatherData(idx);
        });
    }
}

async function fetchWeatherData(hubIndex) {
    try {
        const res = await fetch(`/api/weather?hub_index=${hubIndex}`);
        const data = await res.json();
        renderWeatherView(data);
    } catch (err) {
        console.error("Weather fetch failed:", err);
    }
}

function renderWeatherView(data) {
    state.weatherData = data;
    const t = TRANSLATIONS[state.currentLanguage];
    const localizedWeather = getLocalizedWeatherAdvisory(data);
    const hubSelect = document.getElementById("weather-hub-select");
    
    // Populate Hub Dropdown once
    if (hubSelect && hubSelect.options.length === 0 && data.all_hubs) {
        data.all_hubs.forEach(h => {
            const opt = document.createElement("option");
            opt.value = h.index;
            opt.textContent = t.localized_weather_hubs?.[h.name] || h.name;
            hubSelect.appendChild(opt);
        });
        hubSelect.value = state.weatherHubIndex;
    }
    if (hubSelect && data.all_hubs) {
        data.all_hubs.forEach(hub => {
            const option = hubSelect.options[hub.index];
            if (option) option.textContent = t.localized_weather_hubs?.[hub.name] || hub.name;
        });
    }

    // Current Metrics
    setText("weather-temp-val", `${data.current.temp}°C`);
    setText("weather-humidity-val", `${data.current.humidity}%`);
    setText("weather-wind-val", `${data.current.wind_speed} km/h`);
    setText("weather-rain-val", `${data.current.rain} mm`);

    // Spray Advisory Card
    const sprayBox = document.getElementById("spray-advisory-box");
    const sprayBadge = document.getElementById("spray-status-badge");
    const sprayText = document.getElementById("spray-status-text");
    const sprayDesc = document.getElementById("spray-desc-text");

    if (sprayBox && data.spray_advisory) {
        const badgeClass = data.spray_advisory.badge || "success";
        sprayBox.className = `advisory-box ${badgeClass}`;
        if (sprayText) sprayText.textContent = localizedWeather.status || data.spray_advisory.status;
        if (sprayDesc) sprayDesc.textContent = localizedWeather.description || data.spray_advisory.description;
    }

    // Irrigation Card
    const irrDesc = document.getElementById("irrigation-desc-text");
    if (irrDesc && (localizedWeather.irrigation || data.irrigation_advisory)) {
        irrDesc.textContent = localizedWeather.irrigation || data.irrigation_advisory;
    }

    // Sidebar Weather Pill update
    setText("sidebar-temp", `${data.current.temp}°C`);
    setText("sidebar-hub-name", t.localized_weather_hubs?.[data.hub.name] || data.hub.name);
    if (data.spray_advisory) {
        setText("sidebar-spray-cond", localizedWeather.status || data.spray_advisory.status);
    }

    // 5-Day Forecast Grid
    const forecastGrid = document.getElementById("weather-forecast-grid");
    if (forecastGrid && data.forecast) {
        forecastGrid.innerHTML = "";
        data.forecast.forEach(d => {
            const card = document.createElement("div");
            card.className = "forecast-day-card";
            const icon = getWeatherIcon(d.code);
            card.innerHTML = `
                <div class="forecast-date">${getLocalizedForecastDate(d.date, t)}</div>
                <div class="forecast-icon">${icon}</div>
                <div class="forecast-temps">
                    ${d.max_temp}°C <span class="forecast-min">/ ${d.min_temp}°C</span>
                </div>
                <div class="rain-chance-badge">💧 ${d.rain_prob}% ${t.metric_rain}</div>
            `;
            forecastGrid.appendChild(card);
        });
    }
}

function getLocalizedForecastDate(date, translations) {
    if (state.currentLanguage !== "Telugu") return date;

    const fallbackDay = /^Day\s+(\d+)$/i.exec(date);
    if (fallbackDay) return translations.forecast_day.replace("{day}", fallbackDay[1]);

    const parsedDate = new Date(`${date}T00:00:00`);
    return Number.isNaN(parsedDate.getTime())
        ? date
        : parsedDate.toLocaleDateString("te-IN", {
            weekday: "short",
            day: "numeric",
            month: "short"
        });
}

function getLocalizedWeatherAdvisory(data) {
    if (state.currentLanguage !== "Telugu") return {};

    const t = TRANSLATIONS.Telugu;
    const current = data.current || {};
    const badge = data.spray_advisory?.badge;
    let status;
    let description;

    if (badge === "warning") {
        status = t.spray_high_wind;
        description = t.spray_high_wind_desc.replace("{wind}", current.wind_speed);
    } else if (badge === "alert") {
        status = t.spray_fungal_risk;
        description = t.spray_fungal_risk_desc.replace("{humidity}", current.humidity);
    } else if (badge === "danger") {
        status = t.spray_rain;
        description = t.spray_rain_desc;
    } else {
        status = t.spray_ideal;
        description = t.spray_ideal_desc
            .replace("{temp}", current.temp)
            .replace("{wind}", current.wind_speed);
    }

    const rainProbability = Math.max(...(data.forecast || []).slice(0, 2).map(day => day.rain_prob || 0), 0);
    const irrigation = rainProbability > 50
        ? t.irrigation_rain
        : current.temp > 36
            ? t.irrigation_hot
            : t.irrigation_normal;
    return { status, description, irrigation };
}

// ==========================================
// 6. Mandi Prices & MSP
// ==========================================
async function initMandiPrices() {
    await fetchMandiData();

    const searchInput = document.getElementById("mandi-search-input");
    const stateSelect = document.getElementById("mandi-state-select");
    const cropSelect = document.getElementById("mandi-crop-select");

    const triggerFilter = () => {
        filterMandiCards(
            searchInput ? searchInput.value.trim() : "",
            stateSelect ? stateSelect.value : "All",
            cropSelect ? cropSelect.value : "All"
        );
    };

    if (searchInput) searchInput.addEventListener("input", triggerFilter);
    if (stateSelect) stateSelect.addEventListener("change", triggerFilter);
    if (cropSelect) cropSelect.addEventListener("change", triggerFilter);
}

async function fetchMandiData() {
    try {
        const res = await fetch("/api/mandi");
        const data = await res.json();
        state.mandiData = data.prices || [];

        // Populate State and Commodity filter dropdowns
        populateDropdown("mandi-state-select", data.states || []);
        populateDropdown("mandi-crop-select", data.commodities || []);

        renderMandiCards(state.mandiData);
    } catch (err) {
        console.error("Mandi fetch failed:", err);
    }
}

function populateDropdown(elemId, items) {
    const select = document.getElementById(elemId);
    if (!select) return;
    select.innerHTML = "";
    items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        const t = TRANSLATIONS[state.currentLanguage];
        const allLabel = elemId === "mandi-state-select"
            ? t.all_states
            : elemId === "mandi-crop-select"
                ? t.all_crops
                : t.all_categories;
        const labels = elemId === "mandi-state-select"
            ? t.localized_states
            : elemId === "mandi-crop-select"
                ? t.localized_mandi_options
                : t.localized_categories;
        opt.textContent = item === "All" ? allLabel : labels?.[item] || item;
        select.appendChild(opt);
    });
}

function filterMandiCards(search, stateVal, cropVal) {
    let list = state.mandiData;

    if (stateVal && stateVal !== "All") {
        list = list.filter(m => m.state.toLowerCase() === stateVal.toLowerCase());
    }

    if (cropVal && cropVal !== "All") {
        list = list.filter(m => m.commodity.toLowerCase().includes(cropVal.toLowerCase()));
    }

    if (search) {
        const s = search.toLowerCase();
        list = list.filter(m => 
            m.commodity.toLowerCase().includes(s) ||
            m.mandi.toLowerCase().includes(s) ||
            m.state.toLowerCase().includes(s) ||
        m.district.toLowerCase().includes(s) ||
        Object.values(TRANSLATIONS[state.currentLanguage].localized_mandi?.[m.id] || {})
            .some(value => value.toLowerCase().includes(s))
    );
    }

    renderMandiCards(list);
}

function renderMandiCards(items) {
    const grid = document.getElementById("mandi-cards-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (items.length === 0) {
        const emptyMessage = TRANSLATIONS[state.currentLanguage].no_mandi_records || "No mandi records found.";
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color:var(--text-muted);">${emptyMessage}</div>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "mandi-item-card";
        const t = TRANSLATIONS[state.currentLanguage];
        const localizedItem = t.localized_mandi?.[item.id] || {};
        const arrivals = state.currentLanguage === "Telugu"
            ? item.arrivals
                .replace(/\bQtl\b/i, t.arrival_quintal)
                .replace(/\bBags?\b/i, t.arrival_bag)
            : item.arrivals;

        const trendClass = (item.trend || "steady").toLowerCase();
        const trendSymbol = trendClass === "bullish"
            ? `↗ ${t.rising || "Rising"}`
            : trendClass === "bearish"
                ? `↘ ${t.falling || "Falling"}`
                : `➔ ${t.steady || "Steady"}`;

        let mspComparison = "";
        if (item.msp) {
            const diff = item.modal_price - item.msp;
            const diffSign = diff >= 0 ? `+₹${diff}` : `-₹${Math.abs(diff)}`;
            const diffColor = diff >= 0 ? "var(--success)" : "var(--danger)";
            mspComparison = `
                <div class="msp-compare-bar">
                    <span>${t.govt_msp}: <strong class="msp-tag">₹${item.msp}</strong></span>
                    <span style="color:${diffColor}; font-weight:700;">${diffSign} ${diff >= 0 ? t.above_msp : t.below_msp}</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div>
                <div class="mandi-card-header">
                    <div>
                        <div class="mandi-commodity-title">${localizedItem.commodity || item.commodity}</div>
                        <div class="mandi-variety">${localizedItem.variety || item.variety}</div>
                    </div>
                    <span class="trend-badge ${trendClass}">${trendSymbol}</span>
                </div>

                <div class="mandi-location-text">
                    <span>📍</span>
                    <span>${localizedItem.location || `${item.mandi}, ${item.district} (${item.state})`}</span>
                </div>

                <div class="price-metric-box">
                    <div class="price-metric-row">
                        <div>
                            <span class="modal-price-val">₹${item.modal_price.toLocaleString()}</span>
                            <span class="modal-price-unit">${t.per_quintal}</span>
                        </div>
                        <div style="font-size:0.75rem; color:var(--text-muted); text-align:right;">
                            ${t.arrivals}: ${arrivals}
                        </div>
                    </div>
                    <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.35rem;">
                        ${t.min_price}: ₹${item.min_price} | ${t.max_price}: ₹${item.max_price}
                    </div>
                    ${mspComparison}
                </div>
            </div>

            <button class="action-chip-btn" style="width:100%; justify-content:center;">
                <span>💬</span> <span>${t.ask_mandi_chat}</span>
            </button>
        `;
        card.querySelector(".action-chip-btn").addEventListener("click", () => {
            window.askMandiInChat(item.commodity, item.mandi);
        });
        grid.appendChild(card);
    });
}

window.askMandiInChat = function(commodity, mandi) {
    switchTab("chat");
    const query = (TRANSLATIONS[state.currentLanguage].mandi_query || TRANSLATIONS.English.mandi_query)
        .replace("{commodity}", commodity)
        .replace("{mandi}", mandi);
    sendChatMessage(query);
};

// ==========================================
// 7. Government Schemes Catalog
// ==========================================
async function initSchemes() {
    await fetchSchemesData();

    const searchInput = document.getElementById("scheme-search-input");
    const catSelect = document.getElementById("scheme-cat-select");

    const triggerFilter = () => {
        filterSchemes(
            searchInput ? searchInput.value.trim() : "",
            catSelect ? catSelect.value : "All"
        );
    };

    if (searchInput) searchInput.addEventListener("input", triggerFilter);
    if (catSelect) catSelect.addEventListener("change", triggerFilter);
}

async function fetchSchemesData() {
    try {
        const res = await fetch("/api/schemes");
        const data = await res.json();
        state.schemesData = data.schemes || [];

        populateDropdown("scheme-cat-select", data.categories || []);
        renderSchemes(state.schemesData);
    } catch (err) {
        console.error("Schemes fetch failed:", err);
    }
}

function filterSchemes(search, category) {
    let list = state.schemesData;

    if (category && category !== "All") {
        list = list.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
        const term = search.toLowerCase();
        list = list.filter(s => 
            s.name.toLowerCase().includes(term) ||
            s.name_hindi.toLowerCase().includes(term) ||
            s.benefit.toLowerCase().includes(term) ||
            s.category.toLowerCase().includes(term) ||
            Object.values(TRANSLATIONS[state.currentLanguage].localized_schemes?.[s.id] || {})
                .flat()
                .some(value => typeof value === "string" && value.toLowerCase().includes(term))
        );
    }

    renderSchemes(list);
}

function renderSchemes(items) {
    const grid = document.getElementById("schemes-cards-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (items.length === 0) {
        const emptyMessage = TRANSLATIONS[state.currentLanguage].no_schemes || "No government schemes found.";
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color:var(--text-muted);">${emptyMessage}</div>`;
        return;
    }

    items.forEach(s => {
        const card = document.createElement("div");
        card.className = "scheme-card";
        const t = TRANSLATIONS[state.currentLanguage];
        const localizedScheme = t.localized_schemes?.[s.id];
        const schemeName = localizedScheme?.name || (state.currentLanguage === "Hindi"
            ? s.name
            : s.name.replace(/\s*\([^)]*[\u0900-\u097f][^)]*\)/g, ""));
        const schemeCategory = localizedScheme?.category || t.localized_categories?.[s.category] || s.category;
        const schemeBenefit = localizedScheme?.benefit || s.benefit;
        const schemeEligibility = localizedScheme?.eligibility || s.eligibility;
        const schemeSubsidy = localizedScheme?.subsidy || s.subsidy;
        const docsList = localizedScheme?.documents?.join(", ") || (s.documents
            ? s.documents.join(", ")
            : t.scheme_fallback_docs || "Aadhaar card, land records");
        const schemeApply = localizedScheme?.apply || s.key_steps;

        card.innerHTML = `
            <div>
                <span class="scheme-category-badge">${schemeCategory}</span>
                <div class="scheme-name">${schemeName}</div>
                ${state.currentLanguage === "Hindi" ? `<div class="scheme-hindi-name">${s.name_hindi}</div>` : ""}

                <div class="scheme-benefit-box">
                    <strong>${t.benefit_label}</strong> ${schemeBenefit}
                </div>

                <div class="scheme-details-list">
                    <div><strong>${t.eligibility_label}</strong> ${schemeEligibility}</div>
                    <div><strong>${t.subsidy_label}</strong> ${schemeSubsidy}</div>
                    <div><strong>${t.docs_label}</strong> ${docsList}</div>
                    <div><strong>${t.apply_label}</strong> ${schemeApply}</div>
                </div>
            </div>

            <div class="scheme-card-footer">
                <button class="ask-bot-btn">
                    <span>💬</span> ${t.ask_scheme_chat}
                </button>
                <a href="${s.portal_url}" target="_blank" rel="noopener noreferrer" class="portal-link-btn">
                    ${t.official_portal}
                </a>
            </div>
        `;
        card.querySelector(".ask-bot-btn").addEventListener("click", () => {
            window.askSchemeInChat(s.name);
        });
        grid.appendChild(card);
    });
}

window.askSchemeInChat = function(schemeName) {
    switchTab("chat");
    const query = (TRANSLATIONS[state.currentLanguage].scheme_query || TRANSLATIONS.English.scheme_query)
        .replace("{scheme}", schemeName);
    sendChatMessage(query);
};

// ==========================================
// 8. Settings Modal & API Key Storage
// ==========================================
function initSettingsModal() {
    const openBtn = document.getElementById("settings-open-btn");
    const closeBtn = document.getElementById("settings-close-btn");
    const modal = document.getElementById("settings-modal");
    const saveBtn = document.getElementById("save-key-btn");
    const keyInput = document.getElementById("gemini-key-input");

    if (keyInput && state.customApiKey) {
        keyInput.value = state.customApiKey;
    }

    if (openBtn && modal) {
        openBtn.addEventListener("click", () => modal.classList.add("active"));
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    }

    if (saveBtn && keyInput) {
        saveBtn.addEventListener("click", async () => {
            const key = keyInput.value.trim();
            state.customApiKey = key;
            localStorage.setItem("krishi_gemini_key", key);

            try {
                const res = await fetch("/api/set-key", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ api_key: key })
                });
                const data = await res.json();
                checkHealth();
                alert(TRANSLATIONS[state.currentLanguage].settings_saved || "Settings saved successfully.");
                if (modal) modal.classList.remove("active");
            } catch (err) {
                console.error("Save key error:", err);
                alert(TRANSLATIONS[state.currentLanguage].settings_saved_local || "Settings saved locally.");
                if (modal) modal.classList.remove("active");
            }
        });
    }
}
