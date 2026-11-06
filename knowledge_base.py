"""
KrishiMitra Agricultural Knowledge Base
Curated repository of Mandi rates, MSP benchmarks, Government schemes,
crop calendars, plant pathology remedies, and localized agronomy advisories.
"""

# Current Minimum Support Price (MSP) benchmarks for 2024-25 / 2025-26 (in INR per Quintal)
MSP_DATA = {
    "Wheat": {"msp": 2425, "season": "Rabi", "hindi": "गेहूं"},
    "Paddy (Common)": {"msp": 2300, "season": "Kharif", "hindi": "धान (सामान्य)"},
    "Paddy (Grade A)": {"msp": 2320, "season": "Kharif", "hindi": "धान (ग्रेड-ए)"},
    "Mustard": {"msp": 5950, "season": "Rabi", "hindi": "सरसों / राई"},
    "Cotton (Medium Staple)": {"msp": 7121, "season": "Kharif", "hindi": "कपास"},
    "Soybean (Yellow)": {"msp": 4892, "season": "Kharif", "hindi": "सोयाबीन"},
    "Maize": {"msp": 2225, "season": "Kharif", "hindi": "मक्का"},
    "Gram (Chana)": {"msp": 5650, "season": "Rabi", "hindi": "चना"},
    "Sugarcane (FRP)": {"msp": 340, "season": "Annual", "hindi": "गन्ना (FRP प्रति क्विंटल)"},
    "Barley": {"msp": 1980, "season": "Rabi", "hindi": "जौ"},
    "Lentil (Masur)": {"msp": 6700, "season": "Rabi", "hindi": "मसूर"}
}

# Mandi prices across major agricultural market hubs in India
MANDI_PRICES = [
    {
        "id": "MND-01",
        "state": "Punjab",
        "district": "Ludhiana",
        "mandi": "Khanna Mandi (Asia's Largest)",
        "commodity": "Wheat",
        "variety": "PBW 826 / HD 3086",
        "modal_price": 2480,
        "min_price": 2425,
        "max_price": 2550,
        "msp": 2425,
        "trend": "Bullish",
        "arrivals": "12,400 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-02",
        "state": "Haryana",
        "district": "Karnal",
        "mandi": "Taraori Mandi",
        "commodity": "Paddy (Basmati)",
        "variety": "1121 Pusa Basmati",
        "modal_price": 3850,
        "min_price": 3600,
        "max_price": 4120,
        "msp": 2320,
        "trend": "Bullish",
        "arrivals": "8,100 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-03",
        "state": "Madhya Pradesh",
        "district": "Indore",
        "mandi": "Indore APMC Mandi",
        "commodity": "Soybean",
        "variety": "JS 20-34 Yellow",
        "modal_price": 4750,
        "min_price": 4400,
        "max_price": 4980,
        "msp": 4892,
        "trend": "Steady",
        "arrivals": "15,200 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-04",
        "state": "Rajasthan",
        "district": "Sri Ganganagar",
        "mandi": "Ganganagar Grain Market",
        "commodity": "Mustard",
        "variety": "Pusa Bold / 42% Oil Content",
        "modal_price": 5820,
        "min_price": 5500,
        "max_price": 6050,
        "msp": 5950,
        "trend": "Bullish",
        "arrivals": "9,450 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-05",
        "state": "Maharashtra",
        "district": "Nashik",
        "mandi": "Lasalgaon Mandi (Asia's Onion Hub)",
        "commodity": "Onion",
        "variety": "Red Garwa",
        "modal_price": 1850,
        "min_price": 1200,
        "max_price": 2300,
        "msp": None,
        "trend": "Bearish",
        "arrivals": "24,000 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-06",
        "state": "Maharashtra",
        "district": "Nagpur",
        "mandi": "Nagpur Cotton Market",
        "commodity": "Cotton",
        "variety": "BT Cotton (Medium/Long Staple)",
        "modal_price": 7250,
        "min_price": 6900,
        "max_price": 7500,
        "msp": 7121,
        "trend": "Bullish",
        "arrivals": "6,300 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-07",
        "state": "Uttar Pradesh",
        "district": "Agra",
        "mandi": "Fatehabad Mandi",
        "commodity": "Potato",
        "variety": "Chipsona / Kufri Bahar",
        "modal_price": 1420,
        "min_price": 1150,
        "max_price": 1680,
        "msp": None,
        "trend": "Steady",
        "arrivals": "18,900 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-08",
        "state": "Karnataka",
        "district": "Kolar",
        "mandi": "Kolar APMC Market",
        "commodity": "Tomato",
        "variety": "Hybrid Desi / Sahu",
        "modal_price": 1950,
        "min_price": 1400,
        "max_price": 2400,
        "msp": None,
        "trend": "Bullish",
        "arrivals": "11,200 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-09",
        "state": "Gujarat",
        "district": "Rajkot",
        "mandi": "Rajkot APMC",
        "commodity": "Groundnut",
        "variety": "GG-20 Bold",
        "modal_price": 6450,
        "min_price": 6100,
        "max_price": 6780,
        "msp": 6783,
        "trend": "Steady",
        "arrivals": "7,800 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-10",
        "state": "Uttar Pradesh",
        "district": "Muzaffarnagar",
        "mandi": "Muzaffarnagar Sugar & Gur Mandi",
        "commodity": "Sugarcane Gur",
        "variety": "Chakki Gur 1st Grade",
        "modal_price": 3800,
        "min_price": 3500,
        "max_price": 4100,
        "msp": 340,
        "trend": "Bullish",
        "arrivals": "5,400 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-11",
        "state": "Bihar",
        "district": "Gulabbagh (Purnia)",
        "mandi": "Gulabbagh Mandi (Corn Hub)",
        "commodity": "Maize",
        "variety": "Rabi Hybrid Yellow Corn",
        "modal_price": 2350,
        "min_price": 2180,
        "max_price": 2480,
        "msp": 2225,
        "trend": "Bullish",
        "arrivals": "16,500 Qtl",
        "date": "Today"
    },
    {
        "id": "MND-12",
        "state": "Andhra Pradesh",
        "district": "Guntur",
        "mandi": "Guntur Mirchi Yard",
        "commodity": "Red Chilli",
        "variety": "Teja / 334 Delux",
        "modal_price": 17800,
        "min_price": 15500,
        "max_price": 21000,
        "msp": None,
        "trend": "Bullish",
        "arrivals": "32,000 Bags",
        "date": "Today"
    }
]

# Government Agricultural Schemes (Sarkari Yojana)
GOVERNMENT_SCHEMES = [
    {
        "id": "SCH-01",
        "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "name_hindi": "प्रधानमंत्री किसान सम्मान निधि योजना",
        "category": "Direct Income Support",
        "benefit": "₹6,000 per year directly to farmer bank accounts in 3 equal installments of ₹2,000 each.",
        "eligibility": "All landholding farmer families with cultivable landholding in their name (subject to exclusion criteria like institutional landholders, income tax payees).",
        "subsidy": "100% Direct Cash Transfer (DBT)",
        "documents": ["Aadhaar Card", "Land Khatauni / Jamabandi records", "Active Bank Account linked to Aadhaar", "Mobile Number"],
        "portal_url": "https://pmkisan.gov.in",
        "key_steps": "Register via Farmers Corner on pmkisan.gov.in or CSC center with Aadhaar e-KYC."
    },
    {
        "id": "SCH-02",
        "name": "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
        "name_hindi": "प्रधानमंत्री फसल बीमा योजना (फसल सुरक्षा)",
        "category": "Crop Insurance",
        "benefit": "Comprehensive insurance coverage against non-preventable natural risks (drought, flood, unseasonal rain, pests, hail). Lowest premium rates.",
        "eligibility": "All farmers growing notified crops in notified areas (both loanee and non-loanee farmers).",
        "subsidy": "Farmers pay only 2% premium for Kharif, 1.5% for Rabi crops, and 5% for annual commercial/horticultural crops. Balance subsidized by Govt.",
        "documents": ["Land ownership papers / Tenancy agreement", "Sowing certificate (Patwari / Gram Sevak)", "Bank passbook copy", "Aadhaar Card"],
        "portal_url": "https://pmfby.gov.in",
        "key_steps": "Apply through national crop insurance portal pmfby.gov.in, CSC center, or rural bank within cut-off date."
    },
    {
        "id": "SCH-03",
        "name": "Kisan Credit Card (KCC)",
        "name_hindi": "किसान क्रेडिट कार्ड (सस्ता कृषि ऋण)",
        "category": "Institutional Credit",
        "benefit": "Adequate and timely short-term credit for crop cultivation, post-harvest expenses, farm asset maintenance, and allied activities at subsidized rates.",
        "eligibility": "All farmers, sharecroppers, tenant farmers, self-help groups (SHGs), and joint liability groups (JLGs).",
        "subsidy": "Interest subvention reduces base interest rate to 7%. Prompt repaying farmers get additional 3% incentive, making the effective interest rate only 4% per annum (up to ₹3 lakh limit). Collateral-free limit up to ₹1.6 lakh.",
        "documents": ["Land record / Revenue slip", "ID proof (Aadhaar/Voter ID)", "Address proof", "Passport photos"],
        "portal_url": "https://agricoop.nic.in",
        "key_steps": "Fill simplified 1-page KCC application at any commercial bank, RRB, or cooperative bank branch."
    },
    {
        "id": "SCH-04",
        "name": "SMAM (Sub-Mission on Agricultural Mechanization)",
        "name_hindi": "कृषि यंत्रीकरण उप-मिशन (ट्रैक्टर व कृषि उपकरण सब्सिडी)",
        "category": "Farm Machinery & Equipment",
        "benefit": "Subsidies on tractors, power tillers, rotavators, laser land levelers, multi-crop seed drills, combine harvesters, and boom sprayers.",
        "eligibility": "Individual farmers, Farmer Producer Organizations (FPOs), SHGs, cooperative societies.",
        "subsidy": "40% to 50% financial assistance for individual farmers; up to 80% subsidy for setting up Custom Hiring Centers (CHCs) by farmer cooperatives.",
        "documents": ["Aadhaar Card", "Land registry documents (7/12, Khatauni)", "Bank passbook", "Quotation of machinery from authorized dealer", "Caste certificate (if applicable)"],
        "portal_url": "https://agrimachinery.nic.in",
        "key_steps": "Register on agrimachinery.nic.in portal, choose equipment, select authorized dealer, and submit application before state target deadline."
    },
    {
        "id": "SCH-05",
        "name": "PM Krishi Sinchayee Yojana (Per Drop More Crop - PDMC)",
        "name_hindi": "प्रधानमंत्री कृषि सिंचाई योजना (ड्रिप व स्प्रिंकलर फव्वारा)",
        "category": "Micro-Irrigation & Water Conservation",
        "benefit": "Financial assistance for installing micro-irrigation systems (Drip and Sprinkler), saving up to 50% water while boosting yield by 30-40%.",
        "eligibility": "Farmers having cultivable land with reliable water source (borewell, well, canal).",
        "subsidy": "Up to 55% subsidy for Small & Marginal farmers; 45% for Other farmers. Some states offer additional top-up up to 70-80%.",
        "documents": ["Land record (Khatauni / Khasra)", "Electricity bill / Proof of water source", "Soil & water test report (where applicable)", "Bank passbook", "Aadhaar"],
        "portal_url": "https://pmksy.gov.in",
        "key_steps": "Apply through District Agriculture / Horticulture Officer or State Agriculture Portal."
    },
    {
        "id": "SCH-06",
        "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
        "name_hindi": "परंपरागत कृषि विकास योजना (जैविक खेती प्रोत्साहन)",
        "category": "Organic Farming & Soil Health",
        "benefit": "Promotion of organic farming through cluster approach with PGS-India organic certification and direct market linkages.",
        "eligibility": "Farmers willing to form a cluster of at least 20 hectares (50 farmers).",
        "subsidy": "₹50,000 per hectare for 3 years, of which ₹31,000 is directly transferred for organic inputs (seeds, bio-fertilizers, vermicompost, bio-pesticides).",
        "documents": ["Group Aadhaar list", "Cluster land records", "Bank account details of cluster / farmer"],
        "portal_url": "https://pgsindia-ncof.gov.in",
        "key_steps": "Form a local farmer cluster and register through District Agriculture Office or certified Regional Council."
    },
    {
        "id": "SCH-07",
        "name": "PM KUSUM Yojana (Solar Agriculture Pumps)",
        "name_hindi": "पीएम कुसुम योजना (सोलर पंप व सौर ऊर्जा)",
        "category": "Solar Energy & Irrigation",
        "benefit": "Installation of standalone solar water pumps (Component B) and solarization of existing grid-connected agricultural pumps (Component C).",
        "eligibility": "Individual farmers, panchayats, FPOs, and water user associations.",
        "subsidy": "60% subsidy (30% Central + 30% State Govt), farmer contributes only 10% cash, remaining 30% available via bank loan.",
        "documents": ["Aadhaar Card", "Land ownership proof", "Bank passbook", "Declaration of no electric connection for Component B"],
        "portal_url": "https://pmkusum.mnre.gov.in",
        "key_steps": "Apply through respective State Renewable Energy Development Agency (e.g. HAREDA, MEDA, UPNEDA)."
    },
    {
        "id": "SCH-08",
        "name": "Soil Health Card Scheme (मृदा स्वास्थ्य कार्ड)",
        "name_hindi": "मृदा स्वास्थ्य कार्ड योजना (मिट्टी जांच)",
        "category": "Soil Testing & Nutrient Management",
        "benefit": "Issued every 2-3 years, provides detailed report on 12 key soil parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) with dosage advice.",
        "eligibility": "All farmers across India.",
        "subsidy": "100% Free soil testing and recommendation card.",
        "documents": ["Farmer name, Aadhaar, Land Khasra number"],
        "portal_url": "https://soilhealth.dac.gov.in",
        "key_steps": "Soil sample collected by local Krishi Vibhag / KVK team, or farmer can submit at nearest Soil Testing Lab."
    }
]

# Curated crop disease pathology database
CROP_DISEASES = {
    "tomato_late_blight": {
        "name": "Tomato Late Blight",
        "name_hindi": "टमाटर का पछेती झुलसा (लेट ब्लाइट)",
        "crop": "Tomato / Potato",
        "pathogen": "Phytophthora infestans (Oomycete fungus)",
        "symptoms": "Irregular dark brown water-soaked lesions on leaves and stems; white fuzzy fungal growth under moist conditions on leaf undersides; brown sunken lesions on fruits.",
        "favorable_weather": "Cool, humid weather (15-22°C, relative humidity > 90%).",
        "organic_treatment": [
            "Spray copper-based organic formulations or Bordeaux mixture (1%).",
            "Spray diluted sour buttermilk (500ml in 15L water) or cow urine (10%) with neem oil (5ml/L).",
            "Prune infected lower foliage immediately and burn/bury away from the field.",
            "Improve air circulation and avoid overhead sprinkler watering."
        ],
        "chemical_treatment": [
            "Prophylactic: Mancozeb 75% WP @ 2.5 g/L water or Chlorothalonil 75% WP @ 2 g/L.",
            "Curative: Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5 g/L water.",
            "Severe infection: Cymoxanil 8% + Mancozeb 64% WP @ 2-3 g/L or Dimethomorph 50% WP @ 1 g/L."
        ],
        "prevention": "Use certified disease-free seeds/seedlings; practice crop rotation avoiding Solanaceous crops; provide drip irrigation; apply mulch."
    },
    "wheat_yellow_rust": {
        "name": "Wheat Yellow Rust (Stripe Rust)",
        "name_hindi": "गेहूं का पीला रतुआ (स्ट्राइप रस्ट)",
        "crop": "Wheat",
        "pathogen": "Puccinia striiformis f. sp. tritici",
        "symptoms": "Yellowish-orange pustules arranged in linear stripes along leaf veins; leaves take on a yellow powdered appearance; premature leaf drying.",
        "favorable_weather": "Cold, humid days (10-15°C) with morning dew and intermittent sunlight.",
        "organic_treatment": [
            "Foliar spray of Trichoderma viride / harzianum bio-fungicide @ 5 g/L.",
            "Spray neem seed kernel extract (NSKE 5%) or cold-pressed neem oil (3-5 ml/L).",
            "Spray wood ash solution with fermented butter milk."
        ],
        "chemical_treatment": [
            "At first sign of yellow stripe: Propiconazole 25% EC (Tilt) @ 1 ml/L (200 ml in 200 L water per acre).",
            "Alternative: Tebuconazole 25.9% EC @ 1 ml/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L."
        ],
        "prevention": "Sow rust-resistant varieties (PBW 826, HD 3226, DBW 187, DBW 222); avoid excessive nitrogen fertilizer; avoid delayed sowing."
    },
    "cotton_leaf_curl": {
        "name": "Cotton Leaf Curl Virus (CLCuV)",
        "name_hindi": "कपास का पत्ता मरोड़ रोग (लीफ कर्ल वायरस)",
        "crop": "Cotton (Kapas)",
        "pathogen": "Begomovirus (transmitted by Whitefly - Bemisia tabaci)",
        "symptoms": "Upward or downward curling of leaf margins; thickening of veins on underside; cup-shaped leaf enations; stunted plant growth.",
        "favorable_weather": "Warm dry weather favoring whitefly proliferation.",
        "organic_treatment": [
            "Install yellow sticky traps @ 15-20 per acre to capture adult whiteflies.",
            "Spray neem oil 10,000 ppm @ 2-3 ml/L or castor oil traps.",
            "Spray Verticillium lecanii entomopathogenic fungi @ 5 g/L in evening hours."
        ],
        "chemical_treatment": [
            "Target vector whiteflies: Diafenthiuron 50% WP @ 1.25 g/L or Pyriproxyfen 10% EC @ 2 ml/L.",
            "Flonicamid 50% WG @ 0.3 g/L or Dinotefuran 20% SG @ 0.5 g/L."
        ],
        "prevention": "Grow CLCuD-resistant cotton hybrids; eradicate weed hosts (Abutilon indicum, Parthenium); maintain clean border rows."
    },
    "rice_blast": {
        "name": "Rice Blast Disease",
        "name_hindi": "धान का झोंका रोग (ब्लास्ट)",
        "crop": "Paddy / Rice",
        "pathogen": "Magnaporthe oryzae (Pyricularia oryzae)",
        "symptoms": "Diamond/spindle-shaped lesions with grey/white centers and brownish margins on leaves; rotting of leaf collars, nodes, and panicle neck (neck blast).",
        "favorable_weather": "High relative humidity (>90%), night temp 18-24°C, prolonged dew periods.",
        "organic_treatment": [
            "Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed.",
            "Foliar spray of Pseudomonas fluorescens @ 2.5 kg/ha or 5 g/L.",
            "Spray fermented cow dung-urine filtrate with neem extract."
        ],
        "chemical_treatment": [
            "Seed treatment: Tricyclazole 75% WP @ 2 g/kg seed.",
            "Foliar spray: Tricyclazole 75% WP (Baan) @ 0.6 g/L water (120 g in 200 L water per acre).",
            "Alternative: Isoprothiolane 40% EC @ 1.5 ml/L or Kasugamycin 3% SL @ 2 ml/L."
        ],
        "prevention": "Balanced fertilization (avoid excess split urea applications); maintain 2-3 cm shallow water level; choose blast-tolerant varieties (Pusa 44, PR 126, MTU 1010)."
    },
    "potato_late_blight": {
        "name": "Potato Late Blight",
        "name_hindi": "आलू का पछेती झुलसा रोग",
        "crop": "Potato",
        "pathogen": "Phytophthora infestans (Oomycete fungus)",
        "symptoms": "Water-soaked dark lesions on leaf tips and margins; rapid blackening of foliage in foggy weather; rotting tubers with dry brownish skin.",
        "favorable_weather": "Cold, foggy weather (10-20°C, RH > 90%).",
        "organic_treatment": [
            "Spray copper oxychloride organic mix or Bordeaux mixture (1%).",
            "Spray sour buttermilk (10%) with neem oil (5 ml/L).",
            "Destroy infected foliage immediately to protect tubers."
        ],
        "chemical_treatment": [
            "Preventive: Mancozeb 75% WP @ 2.5 g/L water or Chlorothalonil @ 2 g/L.",
            "Curative: Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5 g/L water.",
            "Severe: Cymoxanil 8% + Mancozeb 64% WP @ 3 g/L water."
        ],
        "prevention": "Plant certified seed tubers (Kufri Pukhraj, Kufri Jyoti); high earthing up to prevent fungal spores reaching tubers."
    },
    "rice_stem_borer": {
        "name": "Rice Yellow Stem Borer & Leaf Folder",
        "name_hindi": "धान का तना छेदक व पत्ता लपेटक सुंडी",
        "crop": "Paddy / Rice",
        "pathogen": "Scirpophaga incertulas / Cnaphalocrocis medinalis (Insect Pest)",
        "symptoms": "Dead heart in vegetative stage (central leaf tiller dies and dries); white earhead (empty whitish panicle) at heading stage; folded tubular leaves with scraped white stripes.",
        "favorable_weather": "Warm humid conditions during tillering to panicle initiation.",
        "organic_treatment": [
            "Install Pheromone Traps @ 8-10 traps per acre with Scirpophaga lure.",
            "Release Trichogramma japonicum egg parasitoid cards @ 20,000 eggs/acre.",
            "Spray neem seed kernel extract (NSKE 5%) or Neem oil 10,000 ppm @ 3 ml/L."
        ],
        "chemical_treatment": [
            "Granular: Chlorantraniliprole 0.4% GR (Ferterra) @ 4 kg/acre or Cartap Hydrochloride 4% GR @ 7.5 kg/acre in 2-3 cm water.",
            "Foliar spray: Chlorantraniliprole 18.5% SC (Coragen) @ 60 ml/acre in 200 L water or Flubendiamide 39.35% SC (Fame) @ 20 ml/acre."
        ],
        "prevention": "Clip seedling leaf tips before transplanting to remove egg masses; avoid excess split nitrogen doses; maintain light and pheromone monitoring."
    },
    "mustard_aphid": {
        "name": "Mustard Aphid / Chepa",
        "name_hindi": "सरसों का चेपा / माहू कीट",
        "crop": "Mustard (Sarson)",
        "pathogen": "Lipaphis erysimi (Sucking Pest)",
        "symptoms": "Hundreds of tiny green/brown soft-bodied aphids clustering on inflorescences, tender pods, and leaves; honey-dew secretion causing sooty mold; pods wither and fail to fill oilseeds.",
        "favorable_weather": "Cloudy, humid weather in December-January.",
        "organic_treatment": [
            "Install Yellow Sticky Traps @ 15-20 per acre.",
            "Spray Neem Oil (10,000 ppm) @ 3 ml/L or 5% NSKE at initial colonization.",
            "Spray cold wood-ash powder or sour buttermilk solution."
        ],
        "chemical_treatment": [
            "Dimethoate 30% EC (Rogor) @ 1.5 ml/L water (300 ml/acre).",
            "Alternative: Thiamethoxam 25% WG @ 0.3-0.5 g/L water or Imidacloprid 17.8% SL @ 0.5 ml/L."
        ],
        "prevention": "Early sowing before October 20 escapes peak aphid infestation; harvest timely before late rise in temperatures."
    },
    "chana_pod_borer": {
        "name": "Gram Pod Borer (Helicoverpa)",
        "name_hindi": "चने की फली छेदक इल्ली (हेलिकोवर्पा)",
        "crop": "Gram / Chickpea (Chana)",
        "pathogen": "Helicoverpa armigera (Caterpillar Pest)",
        "symptoms": "Caterpillar feeds on leaves during vegetative stage; drills round entry holes into developing pods and consumes seeds, leaving empty shells.",
        "favorable_weather": "Warm dry weather following winter rains at flowering/podding stage.",
        "organic_treatment": [
            "Install Helicoverpa Pheromone Traps @ 5-8 per acre.",
            "Spray HaNPV (Helicoverpa nuclear polyhedrosis virus) @ 250 LE/acre.",
            "Spray Bacillus thuringiensis (Bt) formulation @ 1.5-2 g/L or Neem oil 3 ml/L."
        ],
        "chemical_treatment": [
            "Emamectin Benzoate 5% SG (Proclaim) @ 0.4 g/L water (80 g/acre).",
            "Alternative: Chlorantraniliprole 18.5% SC (Coragen) @ 50 ml/acre or Indoxacarb 14.5% SC @ 1 ml/L."
        ],
        "prevention": "Intercrop chickpea with coriander or mustard; install bird perches (T-shaped bamboo sticks) @ 20/acre for predatory birds."
    }
}

# Major agricultural advisory topics with grounded answers in Hindi and English
OFFLINE_ADVISORY_RULES = [
    {
        "keywords": ["fertilizer", "khad", "urea", "dap", "npk", "खाद", "यूरिया", "डीएपी"],
        "answer_en": """**Balanced Fertilizer (NPK) Best Practices:**
1. **Soil Testing First:** Always test soil via Soil Health Card before applying fertilizers. Avoid blindly over-applying Urea.
2. **Standard Basal Dose:** For cereals like Wheat & Paddy, use N:P:K in a balanced 4:2:1 ratio (approx. 120kg N, 60kg P2O5, 40kg K2O per hectare).
3. **Application Method:**
   - Apply full DAP/SSP and Potash (MOP) as basal dose at sowing time.
   - Split Urea into 2-3 top dressings (First irrigation, tillering, and pre-flowering stage) to avoid leaching.
4. **Bio-fertilizers:** Coat seeds with Azotobacter / Rhizobium and PSB (Phosphate Solubilizing Bacteria) to cut chemical fertilizer need by 20-25%.
5. **Micronutrient Zinc:** Apply Zinc Sulphate (21%) @ 10 kg/acre if leaves show yellowing between veins.""",
        "answer_hi": """**संतुलित खाद (NPK) प्रबंधन परामर्श:**
1. **मृदा परीक्षण:** अंधाधुंध यूरिया न डालें। सॉइल हेल्थ कार्ड से मिट्टी जांच के आधार पर ही खाद दें।
2. **संतुलित अनुपात:** अनाज फसलों (गेहूं, धान) के लिए N:P:K का आदर्श अनुपात 4:2:1 रखें।
3. **प्रयोग विधि:**
   - डीएपी (DAP), पोटाश (MOP) की पूरी मात्रा बुवाई के समय बेसल डोज के रूप में दें।
   - यूरिया को एक साथ न डालकर 2-3 बार में (पहली सिंचाई, कल्ले फूटते समय) टॉप ड्रेसिंग करें।
4. **जैव उर्वरक:** बीज को एजोटोबैक्टर/राइजोबियम और पीएसबी (PSB) कल्चर से उपचारित करें, इससे 20-25% रासायनिक खाद की बचत होगी।
5. **जिंक का प्रयोग:** धान और गेहूं में 10 किग्रा प्रति एकड़ जिंक सल्फेट (21%) अवश्य डालें।"""
    },
    {
        "keywords": ["pest", "insect", "keeda", "keet", "कीट", "कीड़ा", "इल्ली", "spray", "दवा"],
        "answer_en": """**Integrated Pest Management (IPM) Advisory:**
1. **Mechanical Traps:** Install 8-10 Pheromone Traps and 15-20 Yellow Sticky Traps per acre. This monitors and controls stem borers, bollworms, and whiteflies without chemicals.
2. **Organic First Line of Defense:** Spray Neem Oil (10,000 ppm) @ 3 ml/Litre at initial pest sighting. Spraying sour buttermilk (10%) or cow urine concoction works against soft-bodied sucking pests.
3. **Safe Chemical Spraying:**
   - Always spray during calm evening or early morning hours.
   - Never spray against the wind direction; wear mask and gloves.
   - For sucking pests (aphids, thrips, jassids): Imidacloprid 17.8% SL @ 0.5 ml/L or Thiamethoxam 25% WG @ 0.5 g/L.
   - For caterpillars/bollworms: Emamectin Benzoate 5% SG @ 0.4 g/L or Chlorantraniliprole 18.5% SC @ 0.3 ml/L.""",
        "answer_hi": """**एकीकृत कीट प्रबंधन (IPM) परामर्श:**
1. **जाल/ट्रैप का उपयोग:** खेत में 8-10 फेरोमोन ट्रैप और 15-20 पीले चिपचिपे कार्ड (Yellow Sticky Traps) लगाएं। इससे तना छेदक व सफेद मक्खी प्राकृतिक रूप से नियंत्रित होते हैं।
2. **जैविक उपचार:** कीट दिखते ही सबसे पहले नीम का तेल (10,000 ppm) 3 मिली प्रति लीटर पानी में मिलाकर छिड़कें।
3. **सुरक्षित रासायनिक छिड़काव:**
   - छिड़काव हमेशा सुबह या शाम को ठंडे मौसम में करें। हवा की उल्टी दिशा में छिड़काव न करें।
   - **रस चूसक कीट (माहू, तेला, थ्रिप्स):** इमिडाक्लोप्रिड 17.8% SL @ 0.5 मिली/लीटर या थायमेथोक्सम 25% WG @ 0.5 ग्राम/लीटर।
   - **इल्ली / सुंडी नियंत्रण:** इमामेक्टिन बेंजोएट 5% SG @ 0.4 ग्राम/लीटर या कोराजन (Chlorantraniliprole) @ 0.3 मिली/लीटर।"""
    },
    {
        "keywords": ["irrigation", "pani", "sinchai", "water", "सिंचाई", "पानी", "drip"],
        "answer_en": """**Smart Water & Irrigation Advisory:**
1. **Critical Stages for Wheat:** Crown Root Initiation (21 days after sowing - most critical!), Tillering, Jointing, Flowering, and Milking stages.
2. **Drip & Sprinkler Advantage:** Switching to drip irrigation saves 45-60% water, prevents weed growth, and qualifies for 45-55% PMKSY government subsidy.
3. **Summer & Moisture Conservation:** Use paddy straw or bio-mulch in orchards/vegetables to curb evaporation loss. Irrigate during late evening to reduce evaporation.""",
        "answer_hi": """**सिंचाई व जल प्रबंधन परामर्श:**
1. **गेहूं की क्रांतिक अवस्थाएं:** बुवाई के 20-25 दिन बाद (सीआरआई अवस्था - शिखर जड़ बनते समय) पहली सिंचाई अत्यंत अनिवार्य है। इसके बाद कल्ले फूटते समय, फूल आते समय और दाना भरते समय सिंचाई करें।
2. **ड्रिप व स्प्रिंकलर फव्वारा:** ड्रिप तकनीक से 50% पानी की बचत होती है और फसल उत्पादन 30% बढ़ता है। इसके लिए सरकार PMKSY के तहत 45-55% तक अनुदान देती है।
3. **नमी संरक्षण:** खेत में नमी बनाए रखने के लिए पराली या प्लास्टिक मल्चिंग का उपयोग करें। तेज धूप में दोपहर को सिंचाई करने से बचें।"""
    },
    {
        "keywords": ["wheat", "gehu", "gehoon", "गेहूं", "रबी"],
        "answer_en": """**Comprehensive Wheat Farming Advisory:**
- **Best Sowing Window:** November 1 to November 25 for Timely Sown varieties (PBW 826, HD 3226, DBW 187).
- **Seed Treatment:** Treat seeds with Carboxin + Thiram @ 2.5 g/kg seed to prevent loose smut and root rots.
- **Weed Management:** For broad-leaf weeds apply 2,4-D @ 500 g/ha; for Phalaris minor (Gulli Danda) use Clodinafop-propargyl 15% WP @ 160 g/acre or Pinoxaden 5.1% EC at 30-35 days after sowing.
- **Disease Alert:** Watch out for Yellow Rust (yellow powdery stripes on leaves) - spray Propiconazole 25% EC (Tilt) @ 1 ml/L immediately upon symptoms.""",
        "answer_hi": """**गेहूं की उन्नत खेती परामर्श:**
- **बुवाई का उपयुक्त समय:** समय पर बुवाई 1 से 25 नवंबर तक करें। उन्नत किस्में: PBW 826, DBW 187 (करण वंदना), HD 3226, DBW 222।
- **बीज उपचार:** बुवाई से पहले थीरम + बाविस्टिन (2:1) @ 2.5 ग्राम प्रति किग्रा बीज से उपचारित करें।
- **खरपतवार नियंत्रण:** गुल्ली डंडा (कनकौआ) के लिए बुवाई के 30-35 दिन बाद क्लोडिनाफॉप 15% WP (160 ग्राम/एकड़) या पिनोक्साडेन का छिड़काव करें।
- **रोग चेतावनी:** पीला रतुआ दिखने पर तुरंत टिल्ट (Propiconazole 25% EC) 1 मिली प्रति लीटर पानी की दर से छिड़कें।"""
    },
    {
        "keywords": ["paddy", "rice", "dhan", "धान", "चावल"],
        "answer_en": """**Paddy (Dhan) Agronomy Advisory:**
- **Nursery & Seed Prep:** Soak seeds in 10% brine solution to discard unviable floating seeds. Treat with Carbendazim 2 g/kg seed.
- **Transplanting:** Transplant 20-25 days old seedlings with 2-3 seedlings per hill at 20x15 cm spacing.
- **Stem Borer & Leaf Folder Control:** Install pheromone traps (Scirpophaga incertulas) @ 8/acre. If threshold exceeds, apply Chlorantraniliprole 0.4% GR (Ferterra) @ 4 kg/acre.
- **Nutrient Tip:** Keep water depth at 2-3 cm; don't let the field crack dry during panicle initiation.""",
        "answer_hi": """**धान (चावल) की उन्नत खेती परामर्श:**
- **बीजोपचार:** 10% नमक के पानी में बीज डालकर तैरने वाले हल्के बीज अलग करें। कार्बेन्डाजिम 2 ग्राम प्रति किग्रा से बीज उपचार करें।
- **रोपाई:** 20-25 दिन की स्वस्थ पौध 20x15 सेमी दूरी पर 2-3 पौधे प्रति थान रोपें।
- **तना छेदक (Stem Borer) व पत्ता लपेटक:** 8 फेरोमोन ट्रैप प्रति एकड़ लगाएं। अधिक प्रकोप होने पर फरटेरा (Chlorantraniliprole 0.4% GR) 4 किग्रा प्रति एकड़ डालें।
- **खुराक:** कल्ले फूटते समय और बाली निकलते समय खेत में 2-3 सेमी पानी अवश्य रखें।"""
    },
    {
        "keywords": ["गेहूं में पहली सिंचाई", "गेहूं सिंचाई", "wheat first irrigation", "cri stage", "सीआरआई"],
        "answer_en": """### 💧 Wheat Critical Irrigation Schedule:
1. **1st Irrigation (CRI Stage - 20 to 25 Days):** The most critical irrigation! Crown roots form during this time. Missing it reduces yield by 20-30%. Apply 1st split Urea (1 bag/acre) + 10kg Zinc Sulphate (21%) right after this irrigation.
2. **2nd Irrigation (Tillering - 40 to 45 Days):** Encourages active tillering and root spread.
3. **3rd Irrigation (Jointing - 60 to 65 Days):** Stem elongation stage.
4. **4th Irrigation (Flowering - 80 to 85 Days):** Avoid water stress during heading.
5. **5th Irrigation (Milking/Dough - 100 to 105 Days):** Helps grain plumpness. Avoid irrigating on windy days to prevent lodging.""",
        "answer_hi": """### 💧 गेहूं में सिंचाई का सही समय व क्रांतिक अवस्थाएं:
1. **पहली सिंचाई (CRI अवस्था - 20 से 25 दिन):** सबसे महत्वपूर्ण सिंचाई! इस समय शिखर जड़ें (ताज जड़ें) निकलती हैं। इसमें देरी होने पर पैदावार 25-30% तक घट जाती है। सिंचाई के बाद पैर टिकने पर 1 बोरी यूरिया व 10 किग्रा जिंक सल्फेट (21%) डालें।
2. **दूसरी सिंचाई (कल्ले फूटते समय - 40 से 45 दिन):** अधिक कल्ले बनने के लिए जरूरी।
3. **तीसरी सिंचाई (गांठे बनते समय - 60 से 65 दिन):** तने की बढ़वार अवस्था।
4. **चौथी सिंचाई (फूल व बाली आते समय - 80 से 85 दिन):** दाने के विकास के लिए नमी रखें।
5. **पांचवीं सिंचाई (दूधिया अवस्था - 100 से 105 दिन):** दाना मोटा और चमकदार बनता है। तेज हवा वाले दिन सिंचाई न करें ताकि फसल गिरे नहीं।"""
    },
    {
        "keywords": ["गुल्ली डंडा", "मंडूसी", "कनकौआ", "गेहूं खरपतवार", "phalaris minor", "gulli danda", "wheat weed", "weed control in wheat"],
        "answer_en": """### 🌾 Wheat Weed Management (Phalaris minor / Gulli Danda & Broad Leaves):
1. **Grassy Weeds (Gulli Danda / Mandusi):** Spray **Clodinafop-propargyl 15% WP** @ 160 g/acre or **Pinoxaden 5.1% EC (Axial)** @ 400 ml/acre in 150-200 L water at 30-35 days after sowing (after 1st irrigation when weeds have 2-3 leaves).
2. **Broadleaf Weeds (Bathua, Wild Spinach, Jangli Palak):** Spray **Metsulfuron-methyl 20% WP (Algrip)** @ 8 g/acre or **2,4-D amine salt 58% SL** @ 400 ml/acre.
3. **Mixed Weed Infestation:** Apply ready-mix **Sulfosulfuron 75% + Metsulfuron 5% WG (Total)** @ 16 g/acre with surfactant.
⚠️ *Always use flat fan nozzle; never spray in dry soil; soil must have adequate moisture.*""",
        "answer_hi": """### 🌾 गेहूं में खरपतवार (गुल्ली डंडा / मंडूसी व बथुआ) का पक्का नियंत्रण:
1. **घास कुल खरपतवार (गुल्ली डंडा / कनकौआ):** बुवाई के 30-35 दिन बाद (पहली सिंचाई के बाद जब खेत में पैर टिकने लगे और खरपतवार 2-3 पत्ती की अवस्था में हो):
   - **क्लोडिनाफॉप 15% WP (Clodinafop):** 160 ग्राम प्रति एकड़ 150-200 लीटर पानी में, अथवा
   - **पिनोक्साडेन 5.1% EC (Axial):** 400 मिली प्रति एकड़।
2. **चौड़ी पत्ती वाले खरपतवार (बथुआ, सेंजी, कृष्णनील):**
   - **मैटसल्फ्यूरॉन मिथाइल 20% WP (Algrip):** 8 ग्राम प्रति एकड़, अथवा 2,4-D एमीन 58% @ 400 मिली/एकड़।
3. **मिश्रित खरपतवार (दोनों एक साथ हों):**
   - **टोटल (सल्फोसल्फ्यूरॉन 75% + मैटसल्फ्यूरॉन 5%):** 16 ग्राम प्रति एकड़।
⚠️ *सावधानी: हमेशा कट या फ्लैट फैन नोजल का प्रयोग करें। खेत में पर्याप्त नमी होना अनिवार्य है।*"""
    },
    {
        "keywords": ["गेहूं की किस्में", "गेहूं की बुवाई", "wheat sowing", "sow wheat", "wheat variety", "wheat varieties", "wheat sowing time", "wheat seed rate"],
        "answer_en": """### 🌾 Wheat Sowing Window, Seed Rate & Top Varieties:
1. **Optimal Sowing Window:**
   - **Timely Sown (सिंचित समय पर):** November 1 to November 25 (Highest yield potential).
   - **Late Sown (पछेती बुवाई):** November 26 to December 25.
2. **Top High-Yielding Varieties (HYV):**
   - **PBW 826:** Heat tolerant, high yield (60-65 Qtl/ha), resistant to Yellow Rust.
   - **DBW 187 (Karan Vandana):** Rich in iron & protein, 65-75 Qtl/ha.
   - **HD 3226 (Pusa Yashasvi):** Excellent rot/rust resistance, high chapati making score.
   - **DBW 222 (Karan Narendra):** Lodging resistant, broad adaptability.
3. **Seed Rate:** 40 kg per acre for timely sowing; 50 kg/acre for late sowing.
4. **Seed Treatment:** Treat with Carboxin 37.5% + Thiram 37.5% (Vitavax Power) @ 2.5 g/kg seed + Azotobacter culture.""",
        "answer_hi": """### 🌾 गेहूं की बुवाई का समय, बीज दर एवं उन्नत किस्में:
1. **बुवाई का सही समय:**
   - **समय पर बुवाई:** 1 नवंबर से 25 नवंबर तक (सर्वाधिक उत्पादन 25-30 क्विंटल प्रति एकड़)।
   - **पछेती बुवाई:** 25 नवंबर से 25 दिसंबर तक।
2. **शीर्ष उन्नत किस्में (High Yield Varieties):**
   - **PBW 826:** नई किस्म, गर्मी सहने की क्षमता, पीला रतुआ रोधी (उत्पादन 26-28 क्विंटल/एकड़)।
   - **DBW 187 (करण वंदना):** उच्च प्रोटीन और आयरन युक्त, देश भर में लोकप्रिय।
   - **HD 3226 (पूसा यशस्वी):** रतुआ व करनाल बंट रोधी, रोटी की उत्कृष्ट गुणवत्ता।
   - **DBW 222 (करण नरेंद्र):** मजबूत तना (फसल गिरती नहीं), अधिक फुटाव।
3. **बीज दर:** समय पर बुवाई के लिए **40 किग्रा प्रति एकड़**; पछेती बुवाई के लिए 50 किग्रा/एकड़।
4. **बीजोपचार:** वीटावैक्स पावर (थीरम + कार्बोक्सिन) @ 2.5 ग्राम प्रति किग्रा बीज से उपचार अवश्य करें।"""
    },
    {
        "keywords": ["धान में खाद", "धान यूरिया", "धान डीएपी", "paddy fertilizer dose", "rice fertilizer schedule"],
        "answer_en": """### 🌾 Balanced Fertilizer Schedule for Paddy / Rice (Per Acre):
1. **Basal Dose (At Transplanting / Final Puddling):**
   - **DAP:** 30 to 35 kg (or SSP 100 kg)
   - **MOP (Potash):** 20 kg
   - **Zinc Sulphate (21%):** 10 kg (or 33% Zinc @ 6 kg). *Note: Never mix Zinc directly with DAP!*
2. **1st Top Dressing (Active Tillering - 20-25 days after transplanting):**
   - **Urea:** 30 to 35 kg per acre.
3. **2nd Top Dressing (Panicle Initiation - 40-45 days after transplanting):**
   - **Urea:** 30 to 35 kg per acre.
💡 *Tip: Maintain 2-3 cm shallow water level while applying fertilizer. Drain excess water before top-dressing.*""",
        "answer_hi": """### 🌾 धान की फसल में संतुलित खाद (उर्वरक) की पूरी खुराक (प्रति एकड़):
1. **बुवाई/रोपाई के समय (बेसल डोज - कद्दू करते समय):**
   - **डीएपी (DAP):** 30 से 35 किग्रा (या सिंगल सुपर फास्फेट 100 किग्रा)
   - **म्यूरिएट ऑफ पोटाश (MOP):** 20 किग्रा
   - **जिंक सल्फेट (21%):** 10 किग्रा प्रति एकड़ (या 33% मोनो जिंक 6 किग्रा)। *ध्यान रहे: जिंक को कभी भी सीधे डीएपी में मिलाकर न डालें।*
2. **पहली टॉप ड्रेसिंग (कल्ले फूटते समय - रोपाई के 20-25 दिन बाद):**
   - **यूरिया:** 30 से 35 किग्रा प्रति एकड़।
3. **दूसरी टॉप ड्रेसिंग (बाली निकलने की शुरुआत - रोपाई के 40-45 दिन बाद):**
   - **यूरिया:** 30 से 35 किग्रा प्रति एकड़।
💡 *सलाह: खाद डालते समय खेत में 2-3 सेमी हल्का पानी रखें। दोपहर की तेज धूप में यूरिया न डालें।*"""
    }
]

# Major agricultural cities & districts for live weather monitoring
AGRICULTURAL_HUBS = [
    {"name": "Ludhiana (Punjab)", "state": "Punjab", "lat": 30.9010, "lon": 75.8573, "major_crops": "Wheat, Paddy, Maize, Cotton"},
    {"name": "Karnal (Haryana)", "state": "Haryana", "lat": 29.6857, "lon": 76.9905, "major_crops": "Basmati Paddy, Wheat, Sugarcane"},
    {"name": "Indore (Madhya Pradesh)", "state": "Madhya Pradesh", "lat": 22.7196, "lon": 75.8577, "major_crops": "Soybean, Wheat, Gram, Garlic"},
    {"name": "Nashik (Maharashtra)", "state": "Maharashtra", "lat": 19.9975, "lon": 73.7898, "major_crops": "Onion, Grapes, Tomato, Pomegranate"},
    {"name": "Nagpur (Vidarbha)", "state": "Maharashtra", "lat": 21.1458, "lon": 79.0882, "major_crops": "Cotton, Soybean, Oranges, Tur"},
    {"name": "Sri Ganganagar (Rajasthan)", "state": "Rajasthan", "lat": 29.9038, "lon": 73.8772, "major_crops": "Mustard, Cotton, Wheat, Guar"},
    {"name": "Varanasi (Uttar Pradesh)", "state": "Uttar Pradesh", "lat": 25.3176, "lon": 82.9739, "major_crops": "Paddy, Wheat, Vegetables, Mustard"},
    {"name": "Muzaffarnagar (Uttar Pradesh)", "state": "Uttar Pradesh", "lat": 29.4727, "lon": 77.7085, "major_crops": "Sugarcane, Wheat, Mustard"},
    {"name": "Guntur (Andhra Pradesh)", "state": "Andhra Pradesh", "lat": 16.3067, "lon": 80.4365, "major_crops": "Chilli, Cotton, Paddy, Tobacco"},
    {"name": "Kolar (Karnataka)", "state": "Karnataka", "lat": 13.1367, "lon": 78.1291, "major_crops": "Tomato, Mulberry/Sericulture, Ragi"},
    {"name": "Rajkot (Gujarat)", "state": "Gujarat", "lat": 22.3039, "lon": 70.8022, "major_crops": "Groundnut, Cotton, Cumin, Castor"},
    {"name": "Purnia (Bihar)", "state": "Bihar", "lat": 25.7771, "lon": 87.4753, "major_crops": "Maize, Jute, Paddy, Makhana"}
]
