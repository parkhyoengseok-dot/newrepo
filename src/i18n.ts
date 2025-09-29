export type Lang = "en" | "hi" | "ta" | "te";

export const i18n: Record<Lang, Record<string,string>> = {
  en: {
    heroTitle:"Real-time coastal awareness for India’s shores",
    heroSub:"Geotagged citizen reports, social signal mining, and live hotspots to aid disaster managers during tsunamis, storm surges, swell events, and high waves.",
    about:"The Indian National Centre for Ocean Information Services (INCOIS), under the Ministry of Earth Sciences, provides ocean information and advisory services that support disaster risk reduction and maritime safety. Early warnings cover tsunamis, storm surges, high waves, swell surges, and coastal currents.",
    background:"Despite satellite, sensor, and model-based alerts, on-the-ground reports can be delayed. This demo shows how citizen observations and social media signals can boost situational awareness in real time.",
    kpi1Sub:"Live crowd reports today",
    kpi2Sub:"Flagged hotspots (last 24h)"
  },
  hi: {
    heroTitle:"भारत के समुद्री तटों के लिए रियल-टाइम जागरूकता",
    heroSub:"जियो-टैग्ड नागरिक रिपोर्ट, सोशल संकेत और लाइव हॉटस्पॉट—सुनामी, तूफानी ज्वार, स्वेल व उच्च तरंगों के दौरान आपदा प्रबंधन में सहायक।",
    about:"पृथ्वी विज्ञान मंत्रालय के अंतर्गत INCOIS आपदा जोखिम में कमी और समुद्री सुरक्षा हेतु महासागर संबंधी सेवाएँ प्रदान करता है। चेतावनियाँ: सुनामी, तूफानी ज्वार, उच्च तरंगें, स्वेल, तटीय धाराएँ।",
    background:"उपग्रह/सेंसर/मॉडल आधारित अलर्ट के बावजूद जमीनी रिपोर्ट देर से मिलती हैं। यह डेमो दिखाता है कि नागरिक अवलोकन और सोशल मीडिया संकेत कैसे स्थिति को बेहतर समझने में मदद करते हैं।",
    kpi1Sub:"आज की लाइव रिपोर्ट्स",
    kpi2Sub:"चिह्नित हॉटस्पॉट (24 घंटे)"
  },
  ta: {
    heroTitle:"இந்தியக் கடற்கரைகளுக்கான நேரடி கடல் அபாய விழிப்புணர்வு",
    heroSub:"இடத்துடன் கூடிய குடிமக்கள் புகார்கள், சமூகச் சிக்னல்கள் மற்றும் ஹாட்ஸ்பாட்கள்—சுனாமி, புயல் அலை, ஸ்வெல் நிகழ்வின்போது உதவும்.",
    about:"புவி அறிவியல் அமைச்சகத்தின் INCOIS, பேரிடர் ஆபத்து குறைப்பு மற்றும் கடற்பயண பாதுகாப்பிற்கான கடல் தகவல் சேவைகளை வழங்குகிறது.",
    background:"செயற்கைக்கோள்/சென்சார்/மாதிரிகள் இருந்தாலும் நில தகவல் தாமதமாகிறது. இந்த டெமோ கூட்டுப் புகார்களும் சமூகச் சிக்னல்களும் எப்படி உதவுகின்றன என்பதை காட்டுகிறது.",
    kpi1Sub:"இன்றைய புகார்கள்",
    kpi2Sub:"கடந்த 24 மணி ஹாட்ஸ்பாட்கள்"
  },
  te: {
    heroTitle:"భారత తీరాలకు రియల్-టైమ్ సముద్ర హెచ్చరిక అవగాహన",
    heroSub:"జియోట్యాగ్‌డ్ నివేదికలు, సోషల్ సంకేతాలు, లైవ్ హాట్‌స్పాట్లు—సునామీ, స్టార్మ్ సర్జ్, స్వెల్ సంఘటనలలో సహాయం.",
    about:"భూవిజ్ఞాన మంత్రిత్వశాఖలోని INCOIS సముద్ర సమాచారం/సలహా సేవలు అందిస్తుంది. సునామీ, స్టార్మ్ సర్జ్, ఎత్తైన అలలు, స్వెల్, తీర ప్రవాహాలకు ముందస్తు హెచ్చరికలు.",
    background:"ఉపగ్రహ/సెన్సార్/మోడల్ హెచ్చరికలున్నా నేలమీద సమాచారం ఆలస్యం అవుతుంది. ఈ డెమో పౌర నివేదికలు, సోషల్ సంకేతాలు ఎలా సహాయపడతాయో చూపిస్తుంది.",
    kpi1Sub:"ఈరోజు నివేదికలు",
    kpi2Sub:"గత 24గంటల హాట్‌స్పాట్లు"
  }
};
