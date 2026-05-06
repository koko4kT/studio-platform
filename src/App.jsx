import { useState } from "react";
const SECRET_CODE = "studio2026";

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 6, color: "#fff", marginBottom: 8 }}>
          <span style={{ color: "#ff3b3b" }}>●</span> STÜDIO
        </div>
        <div style={{ fontSize: 12, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 40, fontFamily: "DM Sans, sans-serif" }}>Accès privé</div>
        <input
          style={{ background: "#0f0f0f", border: `1px solid ${error ? "#ff3b3b" : "#222"}`, color: "#fff", padding: "14px 20px", fontSize: 14, width: 260, outline: "none", textAlign: "center", letterSpacing: 4, fontFamily: "DM Sans, sans-serif", display: "block", marginBottom: 12 }}
          type="password"
          placeholder="Code d'accès"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false); }}
          onKeyDown={e => { if (e.key === "Enter") { if (input === SECRET_CODE) onUnlock(); else setError(true); } }}
        />
        {error && <div style={{ color: "#ff3b3b", fontSize: 12, fontFamily: "DM Sans, sans-serif", marginBottom: 12 }}>Code incorrect</div>}
        <button
          style={{ background: "#ff3b3b", color: "#fff", border: "none", padding: "14px 40px", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", width: 260 }}
          onClick={() => { if (input === SECRET_CODE) onUnlock(); else setError(true); }}
        >
          Entrer →
        </button>
      </div>
    </div>
  );
}
// ─── COMMISSION PALIERS N-1 ───────────────────────────────────────────────────
function getCommissionRate(h) {
  if (h >= 150) return 0.10;
  if (h >= 50) return 0.12;
  return 0.15;
}
function getPriceDisplayed(netPrice, rate) {
  return Math.round(netPrice / (1 - rate));
}
function getSlotPrice(studio, slot) {
  const rate = getCommissionRate(studio.hoursLastMonth);
  const mode = slot.engineerMode || studio.defaultEngineerMode || "included";
  const base = getPriceDisplayed(studio.netPrice, rate);
  return mode === "autonomous" ? Math.round(base * 0.70) : base;
}

// ─── DÉLAI DE RÉPONSE DYNAMIQUE INGÉ ─────────────────────────────────────────
// hoursUntilSession = heures avant la session
function getEngResponseDelay(hoursUntilSession) {
  if (hoursUntilSession > 48) return { hours: 12, label: "12h pour répondre" };
  if (hoursUntilSession > 12) return { hours: 4, label: "4h pour répondre" };
  return { hours: 2, label: "2h pour répondre" };
}

// ─── DONNÉES ──────────────────────────────────────────────────────────────────
const DAYS = ["Auj.", "Dem.", "Mer 8", "Jeu 9", "Ven 10", "Sam 11", "Dim 12", "Lun 13", "Mar 14", "Mer 15", "Jeu 16", "Ven 17", "Sam 18", "Dim 19"];

const INITIAL_STUDIOS = [
  {
    id: 1, name: "NOIR STUDIO", location: "Paris 18ème", city: "Paris",
    engineer: "DJ Kryz", engineerType: "Ingé Son",
    netPrice: 60, hoursLastMonth: 160, minHours: 2,
    rating: 4.9, reviewCount: 128,
    reviewsData: [
      { id: 1, artist: "Lil Kev", rating: 5, comment: "Session incroyable, Kryz est un génie.", date: "Il y a 2 jours" },
      { id: 2, artist: "MC Flow", rating: 5, comment: "Ambiance parfaite, matériel top. Je reviens.", date: "Il y a 1 semaine" },
      { id: 3, artist: "Yasmine R.", rating: 4, comment: "Très pro, juste un peu de retard au début.", date: "Il y a 2 semaines" },
    ],
    avatar: "N", color: "#ff3b3b", depositPercent: 30, acceptsCash: true, defaultEngineerMode: "included",
    slots: [
      { id: 1, date: "Auj.", time: "10h - 13h", hours: 3, available: true, hoursUntil: 2 },
      { id: 2, date: "Auj.", time: "14h - 17h", hours: 3, available: false, hoursUntil: 6 },
      { id: 3, date: "Auj.", time: "20h - 23h", hours: 3, available: true, engineerMode: "autonomous", hoursUntil: 12 },
      { id: 4, date: "Dem.", time: "10h - 13h", hours: 3, available: true, hoursUntil: 26 },
      { id: 5, date: "Dem.", time: "18h - 21h", hours: 3, available: true, hoursUntil: 34 },
      { id: 6, date: "Mer 8", time: "14h - 17h", hours: 3, available: true, engineerMode: "freelance", hoursUntil: 56 },
      { id: 7, date: "Sam 11", time: "12h - 15h", hours: 3, available: true, hoursUntil: 98 },
    ],
    bookings: [
      { id: 1, artist: "Lil Kev", date: "Auj.", time: "10h - 13h", hours: 3, remainderMethod: "cash", status: "confirmed", rated: true },
      { id: 2, artist: "Malia B.", date: "Dem.", time: "18h - 21h", hours: 3, remainderMethod: "card", status: "confirmed", rated: false },
    ],
  },
  {
    id: 2, name: "BEAT FACTORY", location: "Lyon Part-Dieu", city: "Lyon",
    engineer: "Lena M.", engineerType: "Productrice",
    netPrice: 45, hoursLastMonth: 70, minHours: 1,
    rating: 4.7, reviewCount: 84,
    reviewsData: [
      { id: 1, artist: "Rova", rating: 5, comment: "Lena est exceptionnelle.", date: "Il y a 3 jours" },
      { id: 2, artist: "Jayden K.", rating: 4, comment: "Super session R&B.", date: "Il y a 1 semaine" },
    ],
    avatar: "B", color: "#f5a623", depositPercent: 50, acceptsCash: true, defaultEngineerMode: "included",
    slots: [
      { id: 1, date: "Auj.", time: "09h - 12h", hours: 3, available: true, hoursUntil: 1 },
      { id: 2, date: "Dem.", time: "13h - 16h", hours: 3, available: true, hoursUntil: 29 },
      { id: 3, date: "Mer 8", time: "10h - 13h", hours: 3, available: false, hoursUntil: 50 },
      { id: 4, date: "Sam 11", time: "19h - 22h", hours: 3, available: true, engineerMode: "autonomous", hoursUntil: 107 },
    ],
    bookings: [],
  },
  {
    id: 3, name: "ZONE 93", location: "Seine-Saint-Denis", city: "Paris",
    engineer: "Skizo", engineerType: "Ingé Son / Beatmaker",
    netPrice: 35, hoursLastMonth: 20, minHours: 3,
    rating: 5.0, reviewCount: 211,
    reviewsData: [
      { id: 1, artist: "Nino", rating: 5, comment: "Le meilleur studio du 93. Point.", date: "Il y a 1 jour" },
      { id: 2, artist: "Fara B.", rating: 5, comment: "Skizo comprend le rap FR comme personne.", date: "Il y a 4 jours" },
    ],
    avatar: "Z", color: "#00e5ff", depositPercent: 20, acceptsCash: false, defaultEngineerMode: "autonomous",
    slots: [
      { id: 1, date: "Auj.", time: "16h - 19h", hours: 3, available: true, hoursUntil: 8 },
      { id: 2, date: "Auj.", time: "20h - 23h", hours: 3, available: true, hoursUntil: 12 },
      { id: 3, date: "Dem.", time: "20h - 23h", hours: 3, available: false, hoursUntil: 36 },
      { id: 4, date: "Mer 8", time: "10h - 13h", hours: 3, available: true, hoursUntil: 50 },
      { id: 5, date: "Sam 11", time: "20h - 23h", hours: 3, available: true, hoursUntil: 104 },
      { id: 6, date: "Dim 12", time: "18h - 21h", hours: 3, available: true, hoursUntil: 130 },
    ],
    bookings: [],
  },
];

const FREELANCE_ENGINEERS = [
  {
    id: 1, name: "DJ Kryz", specialty: ["Mixage", "Enregistrement"], genres: ["Trap", "Drill", "Afro"],
    rate: 40, rating: 4.9, reviewCount: 67, acceptanceRate: 97,
    avatar: "K", color: "#ff3b3b",
    city: "Paris", radiusKm: 20, minNoticeHours: 2,
    bio: "Ingé son depuis 10 ans. Spécialisé dans le rap et les musiques urbaines.",
    reviewsData: [
      { id: 1, artist: "Lil Kev", rating: 5, comment: "Kryz transforme un enregistrement basique en banger.", date: "Il y a 3 jours" },
      { id: 2, artist: "MC Flow", rating: 5, comment: "Précis, rapide, à l'écoute.", date: "Il y a 1 semaine" },
    ],
    availabilities: [
      { id: 1, date: "Auj.", time: "14h - 20h", hoursUntil: 6 },
      { id: 2, date: "Dem.", time: "10h - 18h", hoursUntil: 26 },
      { id: 3, date: "Jeu 9", time: "16h - 22h", hoursUntil: 80 },
      { id: 4, date: "Sam 11", time: "10h - 16h", hoursUntil: 98 },
    ],
    sessions: [
      { id: 1, artist: "Lil Kev", date: "Auj.", time: "10h-13h", location: "NOIR STUDIO", status: "confirmed", hours: 3 },
    ],
    pendingRequests: [
      { id: 1, artist: "Nox B.", date: "Dem.", time: "14h-17h", location: "Zone 93 — Seine-Saint-Denis", hours: 3, hoursUntil: 30, status: "pending" },
    ],
  },
  {
    id: 2, name: "Skizo", specialty: ["Mixage", "Mastering", "Beatmaking"], genres: ["Rap FR", "Drill", "Boom-bap"],
    rate: 35, rating: 5.0, reviewCount: 89, acceptanceRate: 99,
    avatar: "S", color: "#00e5ff",
    city: "Seine-Saint-Denis", radiusKm: 15, minNoticeHours: 4,
    bio: "8 ans d'expérience. Je mets l'artiste à l'aise pour tirer le meilleur de chaque session.",
    reviewsData: [
      { id: 1, artist: "Nino", rating: 5, comment: "Le meilleur. Sans discussion.", date: "Il y a 2 jours" },
    ],
    availabilities: [
      { id: 1, date: "Dem.", time: "10h - 14h", hoursUntil: 26 },
      { id: 2, date: "Mer 8", time: "16h - 22h", hoursUntil: 56 },
      { id: 3, date: "Ven 10", time: "18h - 23h", hoursUntil: 82 },
    ],
    sessions: [],
    pendingRequests: [],
  },
  {
    id: 3, name: "Lena M.", specialty: ["Production", "Enregistrement"], genres: ["R&B", "Soul", "Pop"],
    rate: 45, rating: 4.7, reviewCount: 43, acceptanceRate: 92,
    avatar: "L", color: "#f5a623",
    city: "Lyon", radiusKm: 10, minNoticeHours: 2,
    bio: "Productrice et ingé son. 6 ans avec des artistes R&B et pop.",
    reviewsData: [],
    availabilities: [
      { id: 1, date: "Auj.", time: "18h - 22h", hoursUntil: 10 },
      { id: 2, date: "Sam 11", time: "12h - 18h", hoursUntil: 100 },
    ],
    sessions: [],
    pendingRequests: [],
  },
];

const PROFILE_TYPES = [
  { id: "artist", label: "Artiste", icon: "🎤", desc: "Rappeur, chanteur, musicien" },
  { id: "engineer", label: "Ingé Son", icon: "🎛️", desc: "Ingénieur du son, beatmaker" },
  { id: "studio", label: "Studio", icon: "🏢", desc: "Propriétaire de studio" },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Carte bancaire", icon: "💳", info: null },
  { id: "paypal", label: "PayPal", icon: "🅿️", info: null },
  { id: "apple", label: "Apple Pay", icon: "🍎", info: null },
  { id: "paysafe", label: "Paysafecard", icon: "🎟️", info: "Disponible en bureau de tabac et supermarchés — pas besoin de compte bancaire" },
];

const SPECIALTIES = ["Mixage", "Mastering", "Enregistrement", "Beatmaking", "Production", "Sound design", "Auto-Tune / Vocal"];
const GENRES = ["Trap", "Drill", "Afro", "R&B", "Soul", "Pop", "Rap FR", "Boom-bap", "Reggaeton", "Afrobeats", "Jazz", "Rock"];
const ENG_MODE_LABELS = { included: "👤 Ingé inclus", autonomous: "🔧 Autonomie", freelance: "🎒 Ingé freelance" };
const ENG_MODE_COLORS = { included: "#00e5ff", autonomous: "#f5a623", freelance: "#ff3b3b" };
const RADIUS_OPTIONS = [5, 10, 15, 20, 30, 50];
const MIN_NOTICE_OPTIONS = [{ h: 0, label: "Pas de minimum" }, { h: 2, label: "2h minimum" }, { h: 4, label: "4h minimum" }, { h: 12, label: "12h minimum" }, { h: 24, label: "24h minimum" }];

const INITIAL_NOTIFS = [
  { id: 1, type: "booking", message: "Nouvelle réservation — Lil Kev · Auj. 10h-13h", time: "Il y a 5 min", read: false },
  { id: 2, type: "request", message: "Demande ingé — Nox B. veut te booker Dem. 14h-17h", time: "Il y a 20 min", read: false },
  { id: 3, type: "reminder", message: "Rappel — Session Malia B. demain à 18h", time: "Il y a 1h", read: true },
  { id: 4, type: "rating", message: "Nouvel avis 5⭐ de MC Flow", time: "Il y a 2h", read: true },
];

function calcPricing(studio, slot, freelanceEng = null) {
  const slotPrice = getSlotPrice(studio, slot);
  const studioTotal = slotPrice * slot.hours;
  const studioDeposit = Math.round(studioTotal * (studio.depositPercent / 100));
  const studioRemaining = studioTotal - studioDeposit;
  let engTotal = 0, engDeposit = 0;
  if (freelanceEng) {
    engTotal = getPriceDisplayed(freelanceEng.rate, 0.06) * slot.hours;
    engDeposit = engTotal;
  }
  return { studioTotal, studioDeposit, studioRemaining, engTotal, engDeposit, grandTotal: studioTotal + engTotal, grandDeposit: studioDeposit + engDeposit, grandRemaining: studioRemaining };
}

// ─── COMPOSANTS ───────────────────────────────────────────────────────────────
function StarRating({ value, onChange, size = 28 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star}
          style={{ fontSize: size, cursor: onChange ? "pointer" : "default", color: star <= (hovered || value) ? "#f5a623" : "#2a2a2a", transition: "color 0.1s" }}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          onClick={() => onChange && onChange(star)}
        >★</span>
      ))}
    </div>
  );
}

function RatingModal({ session, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState("rate");
  return (
    <div style={s.modalOverlay}>
      <div style={s.modalBox}>
        {step === "rate" && (<>
          <div style={s.modalEmoji}>🎙️</div>
          <div style={s.modalTitle}>Alors, ta session ?</div>
          <div style={s.modalSub}>
            {session.hasFreelanceEng ? `Comment s'est passé ton enregistrement avec ${session.engName} ?` : `Comment s'est passée ta session chez ${session.studioName} ?`}
          </div>
          <StarRating value={rating} onChange={setRating} size={44} />
          <button style={{ ...s.ctaPrimary, width: "100%", marginTop: 24, opacity: rating > 0 ? 1 : 0.4 }} onClick={() => rating > 0 && setStep("comment")}>
            Valider ma note →
          </button>
        </>)}
        {step === "comment" && (<>
          <div style={s.modalEmoji}>✍️</div>
          <div style={s.modalTitle}>Un commentaire ?</div>
          <div style={s.modalSub}>Facultatif — aide les autres artistes à choisir.</div>
          <textarea style={{ ...s.input, height: 100, resize: "none", marginTop: 8 }} placeholder="Dis ce que t'as ressenti..." value={comment} onChange={e => setComment(e.target.value)} />
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button style={s.ctaPrimary} onClick={() => { setStep("done"); setTimeout(onClose, 1500); }}>Envoyer</button>
            <button style={s.ctaSecondary} onClick={() => { setStep("done"); setTimeout(onClose, 1500); }}>Passer</button>
          </div>
        </>)}
        {step === "done" && (<>
          <div style={s.modalEmoji}>✅</div>
          <div style={s.modalTitle}>Merci !</div>
          <div style={s.modalSub}>Ton avis aide la communauté STÜDIO.</div>
        </>)}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [unlocked, setUnlocked] = useState(false);
if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  const [studios, setStudios] = useState(INITIAL_STUDIOS);
  const [engineers, setEngineers] = useState(FREELANCE_ENGINEERS);
  const [view, setView] = useState("home");
  const [profileType, setProfileType] = useState(null);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [selectedEng, setSelectedEng] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedFreelanceEng, setSelectedFreelanceEng] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [remainderMethod, setRemainderMethod] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDay, setFilterDay] = useState("Auj.");
  const [filterMode, setFilterMode] = useState(null);
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [showNotifs, setShowNotifs] = useState(false);
  const [ratingSession, setRatingSession] = useState(null);
  const [engStatus, setEngStatus] = useState(null);
  const [showEngBasket, setShowEngBasket] = useState(false); // panier ingé sur créneau autonomie

  // Studio dashboard
  const [dashStudio, setDashStudio] = useState(INITIAL_STUDIOS[0]);
  const [dashTab, setDashTab] = useState("infos");
  const [newSlot, setNewSlot] = useState({ date: DAYS[0], startH: "10", endH: "13", engineerMode: null });
  const [savedMsg, setSavedMsg] = useState(false);
  const [cashDisclaimerShown, setCashDisclaimerShown] = useState(false);

  // Engineer dashboard
  const [engProfile, setEngProfile] = useState({
    ...FREELANCE_ENGINEERS[1],
    status: "freelance", studioId: null,
  });
  const [engTab, setEngTab] = useState("profil");
  const [engSavedMsg, setEngSavedMsg] = useState(false);
  const [newDispo, setNewDispo] = useState({ date: DAYS[0], startH: "10", endH: "18" });

  const unreadCount = notifs.filter(n => !n.read).length;
  const currentRate = getCommissionRate(dashStudio.hoursLastMonth);
  const nextPalier = dashStudio.hoursLastMonth >= 150 ? null : dashStudio.hoursLastMonth >= 50 ? 150 : 50;

  // Filtrage studios
  const filtered = studios.filter(st => {
    const matchSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) || st.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMode = !filterMode || st.defaultEngineerMode === filterMode || st.slots.some(sl => (sl.engineerMode || st.defaultEngineerMode) === filterMode);
    const matchDay = !filterDay || filterDay === "Tous" || st.slots.some(sl => sl.available && sl.date === filterDay);
    return matchSearch && matchMode && matchDay;
  });

  const getNextSlot = (studio) => {
    const available = studio.slots.filter(sl => sl.available);
    const byDay = DAYS.map(d => available.find(sl => sl.date === d)).filter(Boolean);
    return byDay[0] || null;
  };

  // Ingés disponibles pour un créneau autonome (même ville, rayon OK, notice OK)
  const getAvailableEngsForSlot = (studio, slot) => {
    return engineers.filter(eng => {
      const sameCity = eng.city.toLowerCase().includes(studio.city.toLowerCase()) || studio.city.toLowerCase().includes(eng.city.toLowerCase()) || eng.radiusKm >= 20;
      const noticeOk = slot.hoursUntil >= eng.minNoticeHours;
      return sameCity && noticeOk;
    });
  };

  const openStudio = (st) => {
    setSelectedStudio(st);
    setSelectedSlot(null);
    setSelectedFreelanceEng(null);
    setBookingStep(1);
    setPaymentMethod(null);
    setRemainderMethod(null);
    setShowEngBasket(false);
    setView("studio");
  };

  const openEng = (eng) => {
    setSelectedEng(eng);
    setSelectedSlot(null);
    setBookingStep(1);
    setPaymentMethod(null);
    setView("engprofile");
  };

  const handleSlotClick = (slot) => {
    if (!slot.available) return;
    setSelectedSlot(slot);
    setSelectedFreelanceEng(null);
    const mode = slot.engineerMode || selectedStudio?.defaultEngineerMode || "included";
    // Sur créneau autonomie → ouvrir panier ingé automatiquement
    if (mode === "autonomous") {
      setShowEngBasket(true);
    } else {
      setShowEngBasket(false);
    }
  };

  const confirmBooking = () => {
    if (!paymentMethod) return;
    const p = pricing;
    if (p && p.grandRemaining > 0 && !remainderMethod) return;
    setBookingStep(3);
    setTimeout(() => {
      setRatingSession({
        studioName: selectedStudio?.name,
        hasFreelanceEng: !!selectedFreelanceEng,
        engName: selectedFreelanceEng?.name,
      });
    }, 3000);
  };

  const handleEngRequestAction = (reqId, action) => {
    setEngineers(engineers.map(eng => {
      if (eng.id !== engProfile.id) return eng;
      const updatedReqs = eng.pendingRequests.map(r => r.id === reqId ? { ...r, status: action } : r);
      return { ...eng, pendingRequests: updatedReqs };
    }));
    setEngProfile(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests.map(r => r.id === reqId ? { ...r, status: action } : r),
    }));
  };

  const pricing = selectedStudio && selectedSlot ? calcPricing(selectedStudio, selectedSlot, selectedFreelanceEng) : null;
  const slotMode = selectedSlot ? (selectedSlot.engineerMode || selectedStudio?.defaultEngineerMode || "included") : null;
  const availableEngs = selectedStudio && selectedSlot ? getAvailableEngsForSlot(selectedStudio, selectedSlot) : [];

  return (
    <div style={s.root}>
      <div style={s.noise} />

      {/* MODALE NOTATION */}
      {ratingSession && <RatingModal session={ratingSession} onClose={() => setRatingSession(null)} />}

      {/* NAV */}
      <nav style={s.nav}>
        <span style={s.logo} onClick={() => setView("home")}><span style={s.logoDot}>●</span> STÜDIO</span>
        <div style={s.navLinks}>
          {profileType === "artist" && view !== "home" && view !== "signup" && <button style={s.navBtn} onClick={() => setView("explore")}>Explorer</button>}
          {profileType === "engineer" && view !== "home" && view !== "signup" && <button style={s.navBtn} onClick={() => setView("engdashboard")}>Mon Profil</button>}
          {profileType === "studio" && view !== "home" && view !== "signup" && <button style={s.navBtn} onClick={() => setView("dashboard")}>Mon Studio</button>}
          {view !== "home" && view !== "signup" && (
            <div style={{ position: "relative" }}>
              <button style={s.notifBtn} onClick={() => setShowNotifs(!showNotifs)}>
                🔔{unreadCount > 0 && <span style={s.notifBadge}>{unreadCount}</span>}
              </button>
              {showNotifs && (
                <div style={s.notifDropdown}>
                  <div style={s.notifHeader}>
                    <span style={{ fontWeight: 700, color: "#fff", letterSpacing: 1, fontSize: 13 }}>Notifications</span>
                    <button style={{ background: "none", border: "none", color: "#555", fontSize: 11, cursor: "pointer" }} onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}>Tout lire</button>
                  </div>
                  {notifs.map(n => (
                    <div key={n.id} style={{ ...s.notifItem, ...(n.read ? {} : s.notifItemUnread) }}>
                      <div style={s.notifMsg}>{n.message}</div>
                      <div style={s.notifTime}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {(view === "home" || view === "signup") ? (
            <button style={s.navCta} onClick={() => setView("signup")}>Rejoindre</button>
          ) : (
            <div style={s.avatarIcon}>{profileType === "artist" ? "🎤" : profileType === "engineer" ? "🎛️" : "🏢"}</div>
          )}
        </div>
      </nav>

      {/* HOME */}
      {view === "home" && (
        <div style={s.page}>
          <div style={s.hero}>
            <div style={s.heroTag}>Plateforme N°1 du studio en France</div>
            <h1 style={s.heroTitle}>Book ton <span style={s.accent}>créneau</span>.<br />Enregistre ta <span style={s.accent}>vision</span>.</h1>
            <p style={s.heroSub}>Connecte artistes, ingés son et studios. Réserve, paie en ligne, débarque et crée.</p>
            <div style={s.heroButtons}>
              <button style={s.ctaPrimary} onClick={() => setView("signup")}>Je m'inscris →</button>
              <button style={s.ctaSecondary} onClick={() => { setProfileType("artist"); setView("explore"); }}>Voir les studios</button>
            </div>
            <div style={s.heroStats}>
              <div style={s.stat}><span style={s.statNum}>240+</span><span style={s.statLabel}>Studios</span></div>
              <div style={s.statDiv} />
              <div style={s.stat}><span style={s.statNum}>1.2k</span><span style={s.statLabel}>Artistes</span></div>
              <div style={s.statDiv} />
              <div style={s.stat}><span style={s.statNum}>98%</span><span style={s.statLabel}>Satisfaction</span></div>
            </div>
          </div>
          <div style={s.section}>
            <div style={s.sectionTag}>INGÉS SON FREELANCE</div>
            <h2 style={s.sectionTitle}>Les meilleurs ingés disponibles.</h2>
            <div style={s.engGrid}>
              {FREELANCE_ENGINEERS.map(eng => (
                <div key={eng.id} style={s.engCardPublic} onClick={() => openEng(eng)}>
                  <div style={{ ...s.engAvatarSm, borderColor: eng.color, color: eng.color }}>{eng.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: 16, color: "#fff", letterSpacing: 1 }}>{eng.name}</div>
                    <div style={{ fontSize: 11, color: "#666", fontFamily: "DM Sans, sans-serif", marginBottom: 4 }}>{eng.specialty.join(" · ")}</div>
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "DM Sans, sans-serif" }}>📍 {eng.city} · rayon {eng.radiusKm}km</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{getPriceDisplayed(eng.rate, 0.06)}€/h</div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>⭐ {eng.rating} · {eng.acceptanceRate}% acc.</div>
                    <div style={{ fontSize: 10, color: eng.color, marginTop: 2 }}>{eng.availabilities.length} dispos →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={s.section}>
            <div style={s.sectionTag}>POUR QUI ?</div>
            <h2 style={s.sectionTitle}>Trois profils, une plateforme.</h2>
            <div style={s.profileCards}>
              {PROFILE_TYPES.map((p) => (
                <div key={p.id} style={s.profileCard} onClick={() => { setProfileType(p.id); setView("signup"); }}>
                  <div style={s.profileIcon}>{p.icon}</div>
                  <div style={s.profileLabel}>{p.label}</div>
                  <div style={s.profileDesc}>{p.desc}</div>
                  <div style={s.profileArrow}>→</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SIGNUP */}
      {view === "signup" && (
        <div style={s.page}>
          <div style={s.centerBlock}>
            <div style={s.sectionTag}>INSCRIPTION</div>
            <h2 style={s.sectionTitle}>Tu es qui ?</h2>
            <div style={s.profileCards}>
              {PROFILE_TYPES.map((p) => (
                <div key={p.id} style={{ ...s.profileCard, ...(profileType === p.id ? s.profileCardSelected : {}) }} onClick={() => setProfileType(p.id)}>
                  <div style={s.profileIcon}>{p.icon}</div>
                  <div style={s.profileLabel}>{p.label}</div>
                  <div style={s.profileDesc}>{p.desc}</div>
                  {profileType === p.id && <div style={s.checkBadge}>✓</div>}
                </div>
              ))}
            </div>
            {profileType && (
              <div style={s.signupForm}>
                <input style={s.input} placeholder="Nom / Pseudo" />
                <input style={s.input} placeholder="Email" />
                <input style={s.input} placeholder="Mot de passe" type="password" />
                {profileType === "studio" && (<><input style={s.input} placeholder="Nom du studio" /><input style={s.input} placeholder="Ville / Adresse" /></>)}
                {profileType === "engineer" && (
                  <>
                    <input style={s.input} placeholder="Spécialité principale" />
                    <input style={s.input} placeholder="Ville de base" />
                    <div>
                      <div style={s.formLabel}>Tu travailles comment ?</div>
                      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                        {[{ id: "studio", icon: "🏢", label: "Studio fixe", desc: "Rattaché à un studio" }, { id: "freelance", icon: "🎒", label: "Freelance", desc: "Tu interviens partout" }].map((opt) => (
                          <div key={opt.id} style={{ ...s.statusCard, ...(engStatus === opt.id ? s.statusCardSelected : {}) }} onClick={() => setEngStatus(opt.id)}>
                            <div style={{ fontSize: 28, marginBottom: 8 }}>{opt.icon}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{opt.label}</div>
                            <div style={{ fontSize: 11, color: "#555", fontFamily: "DM Sans, sans-serif" }}>{opt.desc}</div>
                            {engStatus === opt.id && <div style={s.checkBadge}>✓</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    {engStatus === "freelance" && (
                      <>
                        <div style={s.formGroup}>
                          <label style={s.formLabel}>Rayon de déplacement</label>
                          <select style={s.input}>
                            {RADIUS_OPTIONS.map(r => <option key={r} value={r}>{r} km autour de ma ville</option>)}
                          </select>
                        </div>
                        <div style={s.formGroup}>
                          <label style={s.formLabel}>Délai minimum avant une session</label>
                          <select style={s.input}>
                            {MIN_NOTICE_OPTIONS.map(o => <option key={o.h} value={o.h}>{o.label}</option>)}
                          </select>
                        </div>
                        <input style={s.input} placeholder="Ton tarif horaire net (€/h)" type="number" />
                      </>
                    )}
                    {engStatus === "studio" && <select style={s.input}><option value="">Sélectionne ton studio...</option>{INITIAL_STUDIOS.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}</select>}
                  </>
                )}
                <button style={s.ctaPrimary} onClick={() => setView(profileType === "studio" ? "dashboard" : profileType === "engineer" ? "engdashboard" : "explore")}>
                  Créer mon compte →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EXPLORE */}
      {view === "explore" && (
        <div style={s.page}>
          <h2 style={s.exploreTitle}>Studios disponibles</h2>
          <input style={s.searchInput} placeholder="🔍  Ville, nom du studio..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <div style={s.filterSection}>
            <div style={s.filterLabel}>📅 Quand ?</div>
            <div style={s.filterRow}>
              {["Auj.", "Dem.", "Mer 8", "Jeu 9", "Ven 10", "Sam 11", "Dim 12"].map(day => (
                <button key={day} style={{ ...s.filterChip, ...(filterDay === day ? s.filterChipActive : {}) }} onClick={() => setFilterDay(filterDay === day ? null : day)}>{day}</button>
              ))}
            </div>
          </div>
          <div style={s.filterSection}>
            <div style={s.filterLabel}>🎛️ Type de session</div>
            <div style={s.filterRow}>
              {[{ id: "included", label: "👤 Avec ingé" }, { id: "autonomous", label: "🔧 Autonomie" }, { id: "freelance", label: "🎒 Ingé freelance" }].map(m => (
                <button key={m.id} style={{ ...s.filterChip, ...(filterMode === m.id ? s.filterChipActive : {}) }} onClick={() => setFilterMode(filterMode === m.id ? null : m.id)}>{m.label}</button>
              ))}
            </div>
          </div>
          {filtered.length === 0 && <div style={{ color: "#555", fontFamily: "DM Sans, sans-serif", padding: "32px 0", textAlign: "center" }}>Aucun studio disponible pour ces critères.</div>}
          <div style={s.studioGrid}>
            {filtered.map(studio => {
              const rate = getCommissionRate(studio.hoursLastMonth);
              const displayed = getPriceDisplayed(studio.netPrice, rate);
              const autoPrice = Math.round(displayed * 0.70);
              const nextSlot = getNextSlot(studio);
              const hasAuto = studio.slots.some(sl => (sl.engineerMode || studio.defaultEngineerMode) === "autonomous");
              const hasIncluded = studio.defaultEngineerMode === "included" || studio.slots.some(sl => sl.engineerMode === "included");
              return (
                <div key={studio.id} style={s.studioCard} onClick={() => openStudio(studio)}>
                  <div style={{ ...s.studioCardTop, background: `linear-gradient(135deg, ${studio.color}22, #0a0a0a)` }}>
                    <div style={{ ...s.studioAvatar, borderColor: studio.color, color: studio.color }}>{studio.avatar}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                      {hasIncluded && <div style={{ ...s.modeTag, color: "#00e5ff", background: "#00e5ff11" }}>👤 Avec ingé</div>}
                      {hasAuto && <div style={{ ...s.modeTag, color: "#f5a623", background: "#f5a62311" }}>🔧 Autonomie</div>}
                    </div>
                  </div>
                  <div style={s.studioCardBody}>
                    <div style={s.studioCardName}>{studio.name}</div>
                    <div style={s.studioCardLocation}>📍 {studio.location}</div>
                    <div style={s.studioCardEngineer}>
                      <span style={s.engineerBadge}>{studio.engineerType}</span>
                      <span style={s.engineerName}>{studio.engineer}</span>
                    </div>
                    <div style={s.studioCardFooter}>
                      <div>
                        {hasIncluded && <div style={s.studioPrice}><span style={s.priceNum}>{displayed}€</span>/h <span style={{ fontSize: 10, color: "#555" }}>avec ingé</span></div>}
                        {hasAuto && <div style={s.studioPrice}><span style={{ ...s.priceNum, fontSize: 16, color: "#aaa" }}>{autoPrice}€</span>/h <span style={{ fontSize: 10, color: "#555" }}>autonomie</span></div>}
                      </div>
                      <div style={s.studioRating}>⭐ {studio.rating} <span style={s.reviews}>({studio.reviewCount})</span></div>
                    </div>
                    <div style={s.studioMeta}>
                      <div style={s.availableBadge}>{studio.slots.filter(sl => sl.available).length} créneaux</div>
                      <div style={s.depositBadge}>Acompte {studio.depositPercent}%</div>
                      {studio.acceptsCash && <div style={s.cashBadge}>💵 Cash OK</div>}
                    </div>
                    {nextSlot && <div style={s.nextSlotBadge}>⚡ Prochain dispo : <strong>{nextSlot.date} {nextSlot.time}</strong></div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* INGÉS FREELANCE */}
          <div style={{ marginTop: 56 }}>
            <div style={s.sectionTag}>INGÉS SON FREELANCE</div>
            <h2 style={{ ...s.sectionTitle, fontSize: 28 }}>Ils viennent à toi.</h2>
            <div style={s.engGrid}>
              {engineers.map(eng => (
                <div key={eng.id} style={s.engCardPublic} onClick={() => openEng(eng)}>
                  <div style={{ ...s.engAvatarSm, borderColor: eng.color, color: eng.color }}>{eng.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: 15, color: "#fff", letterSpacing: 1 }}>{eng.name}</div>
                    <div style={{ fontSize: 11, color: "#666", fontFamily: "DM Sans, sans-serif", marginBottom: 2 }}>{eng.specialty.join(" · ")}</div>
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "DM Sans, sans-serif" }}>📍 {eng.city} · {eng.radiusKm}km · {eng.acceptanceRate}% acc.</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 17, fontWeight: 900, color: "#fff" }}>{getPriceDisplayed(eng.rate, 0.06)}€/h</div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>⭐ {eng.rating}</div>
                    <div style={{ fontSize: 10, color: eng.color, marginTop: 2 }}>{eng.availabilities.length} dispos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAGE PUBLIQUE INGÉ */}
      {view === "engprofile" && selectedEng && (
        <div style={s.page}>
          <button style={s.backBtn} onClick={() => setView("explore")}>← Retour</button>
          <div style={s.studioDetail}>
            <div style={{ ...s.detailHeader, background: `linear-gradient(135deg, ${selectedEng.color}33, #0a0a0a 60%)` }}>
              <div style={{ ...s.engAvatarLg, borderColor: selectedEng.color, color: selectedEng.color }}>{selectedEng.avatar}</div>
              <div style={s.detailInfo}>
                <h1 style={s.detailName}>{selectedEng.name}</h1>
                <div style={{ fontSize: 12, color: "#666", fontFamily: "DM Sans, sans-serif", marginBottom: 6 }}>🎒 Freelance · 📍 {selectedEng.city} · rayon {selectedEng.radiusKm}km</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {selectedEng.specialty.map(sp => <span key={sp} style={s.cardTag}>{sp}</span>)}
                  {selectedEng.genres.map(g => <span key={g} style={s.cardTag}>{g}</span>)}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={s.detailPrice}>{getPriceDisplayed(selectedEng.rate, 0.06)}€<span style={{ fontSize: 14, color: "#888" }}>/h</span></div>
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>⭐ {selectedEng.rating} · {selectedEng.reviewCount} avis</div>
                <div style={{ fontSize: 11, color: "#00e5ff", marginTop: 4 }}>✓ {selectedEng.acceptanceRate}% d'acceptation</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Répond en {selectedEng.minNoticeHours > 0 ? `min ${selectedEng.minNoticeHours}h` : "quelques min"}</div>
              </div>
            </div>
            <div style={s.detailBody}>
              <div style={{ background: "#111", padding: 18, marginBottom: 28, fontSize: 13, color: "#888", fontFamily: "DM Sans, sans-serif", lineHeight: 1.8 }}>
                {selectedEng.bio}
              </div>
              <div style={s.slotSection}>
                <div style={s.slotTitle}>Disponibilités</div>
                {selectedEng.availabilities.map(dispo => {
                  const delay = getEngResponseDelay(dispo.hoursUntil);
                  return (
                    <div key={dispo.id} style={{ ...s.slotListItem, marginBottom: 10 }}>
                      <div>
                        <div style={{ color: "#fff", fontWeight: 700 }}>{dispo.date} · {dispo.time}</div>
                        <div style={{ fontSize: 11, color: "#555", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>⏱ {delay.label} · 100% en ligne</div>
                      </div>
                      <button style={s.ctaPrimary} onClick={() => {
                        setSelectedSlot({ id: dispo.id, date: dispo.date, time: dispo.time, hours: 2, available: true, hoursUntil: dispo.hoursUntil });
                        setSelectedFreelanceEng(selectedEng);
                        setSelectedStudio(null);
                        setBookingStep(2);
                        setView("engbooking");
                      }}>Réserver</button>
                    </div>
                  );
                })}
              </div>
              {selectedEng.reviewsData.length > 0 && (
                <div style={s.slotSection}>
                  <div style={s.slotTitle}>Avis artistes</div>
                  {selectedEng.reviewsData.map(r => (
                    <div key={r.id} style={s.reviewCard}>
                      <div style={s.reviewHeader}>
                        <span style={s.reviewArtist}>{r.artist}</span>
                        <StarRating value={r.rating} size={13} />
                        <span style={s.reviewDate}>{r.date}</span>
                      </div>
                      {r.comment && <div style={s.reviewComment}>{r.comment}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* BOOKING INGÉ SEUL */}
      {view === "engbooking" && selectedFreelanceEng && selectedSlot && (
        <div style={s.page}>
          <button style={s.backBtn} onClick={() => setView("engprofile")}>← Retour</button>
          <div style={s.studioDetail}>
            <div style={{ padding: 32 }}>
              <div style={s.pricingTitle}>Réservation — {selectedFreelanceEng.name}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", color: "#555", marginBottom: 8, fontSize: 13 }}>
                {selectedSlot.date} · {selectedSlot.time}
              </div>
              <div style={{ ...s.cashWarning, background: "#00e5ff11", border: "1px solid #00e5ff33", color: "#00e5ff", marginBottom: 20 }}>
                ⏱ {getEngResponseDelay(selectedSlot.hoursUntil).label} — tu seras notifié de son acceptation.
              </div>
              <input style={{ ...s.input, marginBottom: 16 }} placeholder="Lieu de la session (studio, adresse, home studio...)" />
              <div style={s.pricingPreview}>
                <div style={s.pricingRow}>
                  <span style={s.pricingLabel}>Ingé freelance ({selectedSlot.hours}h)</span>
                  <span style={s.pricingValue}>{getPriceDisplayed(selectedFreelanceEng.rate, 0.06) * selectedSlot.hours}€</span>
                </div>
                <div style={{ fontSize: 11, color: "#00e5ff", marginTop: 8, fontFamily: "DM Sans, sans-serif" }}>✓ 100% en ligne · Remboursement intégral si l'ingé refuse</div>
              </div>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                {PAYMENT_METHODS.map(m => (
                  <div key={m.id}>
                    <div style={{ ...s.payMethod, ...(paymentMethod === m.id ? s.payMethodSelected : {}) }} onClick={() => setPaymentMethod(m.id)}>
                      <span style={{ fontSize: 20 }}>{m.icon}</span>
                      <span style={s.payMethodLabel}>{m.label}</span>
                      {paymentMethod === m.id && <span style={{ color: "#ff3b3b", fontWeight: 700 }}>✓</span>}
                    </div>
                    {m.info && <div style={s.paysafeInfo}>ℹ️ {m.info}</div>}
                  </div>
                ))}
              </div>
              {bookingStep !== 3 && (
                <button style={{ ...s.ctaPrimary, width: "100%", marginTop: 20, opacity: paymentMethod ? 1 : 0.4 }} onClick={() => { if (paymentMethod) setBookingStep(3); }}>
                  Payer {getPriceDisplayed(selectedFreelanceEng.rate, 0.06) * selectedSlot.hours}€ — en attente d'acceptation →
                </button>
              )}
              {bookingStep === 3 && (
                <div style={{ textAlign: "center", marginTop: 32, padding: 24, background: "#111", border: "1px solid #1a1a1a" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: 2, marginBottom: 8 }}>EN ATTENTE</div>
                  <div style={{ color: "#666", fontFamily: "DM Sans, sans-serif", fontSize: 13 }}>
                    {selectedFreelanceEng.name} a {getEngResponseDelay(selectedSlot.hoursUntil).hours}h pour accepter ou refuser.<br />
                    Tu seras notifié dès sa réponse. Remboursement intégral si refus.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STUDIO DETAIL */}
      {view === "studio" && selectedStudio && (
        <div style={s.page}>
          <button style={s.backBtn} onClick={() => setView("explore")}>← Retour aux studios</button>
          <div style={s.stepBar}>
            {["Créneau", "Paiement", "Confirmé"].map((label, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ ...s.stepBarDot, ...(bookingStep >= i + 1 ? s.stepBarDotActive : {}) }}>{bookingStep > i + 1 ? "✓" : i + 1}</div>
                  <div style={{ ...s.stepBarLabel, ...(bookingStep >= i + 1 ? s.stepBarLabelActive : {}) }}>{label}</div>
                </div>
                {i < 2 && <div style={{ ...s.stepBarLine, ...(bookingStep > i + 1 ? s.stepBarLineActive : {}) }} />}
              </div>
            ))}
          </div>

          <div style={s.studioDetail}>
            {(() => {
              const rate = getCommissionRate(selectedStudio.hoursLastMonth);
              const displayed = getPriceDisplayed(selectedStudio.netPrice, rate);
              const autoPrice = Math.round(displayed * 0.70);
              const hasAuto = selectedStudio.slots.some(sl => (sl.engineerMode || selectedStudio.defaultEngineerMode) === "autonomous");
              const hasIncluded = selectedStudio.defaultEngineerMode === "included" || selectedStudio.slots.some(sl => sl.engineerMode === "included");
              return (
                <div style={{ ...s.detailHeader, background: `linear-gradient(135deg, ${selectedStudio.color}33, #0a0a0a 60%)` }}>
                  <div style={{ ...s.studioAvatarLg, borderColor: selectedStudio.color, color: selectedStudio.color }}>{selectedStudio.avatar}</div>
                  <div style={s.detailInfo}>
                    <h1 style={s.detailName}>{selectedStudio.name}</h1>
                    <div style={s.detailLocation}>📍 {selectedStudio.location}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                      {hasIncluded && <div style={{ ...s.modeTag, color: "#00e5ff", background: "#00e5ff11" }}>👤 Ingé inclus {displayed}€/h</div>}
                      {hasAuto && <div style={{ ...s.modeTag, color: "#f5a623", background: "#f5a62311" }}>🔧 Autonomie {autoPrice}€/h</div>}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={s.detailDepositInfo}>Min {selectedStudio.minHours}h · Acompte {selectedStudio.depositPercent}%</div>
                    {selectedStudio.acceptsCash && <div style={s.cashOkBadge}>💵 Cash accepté</div>}
                  </div>
                </div>
              );
            })()}

            <div style={s.detailBody}>
              <div style={s.engineerBlock}>
                <div style={{ fontSize: 28 }}>🎛️</div>
                <div>
                  <div style={s.engineerBlockName}>{selectedStudio.engineer}</div>
                  <div style={s.engineerBlockType}>{selectedStudio.engineerType}</div>
                </div>
                <div style={s.ratingBlock}>⭐ {selectedStudio.rating} · {selectedStudio.reviewCount} avis</div>
              </div>

              {bookingStep === 1 && (
                <>
                  <div style={s.slotSection}>
                    <div style={s.slotTitle}>Créneaux disponibles</div>
                    <div style={s.slotGrid}>
                      {selectedStudio.slots.map(slot => {
                        const mode = slot.engineerMode || selectedStudio.defaultEngineerMode || "included";
                        const slotPrice = getSlotPrice(selectedStudio, slot);
                        return (
                          <div key={slot.id}
                            style={{ ...s.slotCard, ...(slot.available ? {} : s.slotUnavailable), ...(selectedSlot?.id === slot.id ? s.slotSelected : {}) }}
                            onClick={() => handleSlotClick(slot)}
                          >
                            <div style={s.slotDate}>{slot.date}</div>
                            <div style={s.slotTime}>{slot.time}</div>
                            <div style={s.slotHours}>{slot.hours}h · {slot.hours * slotPrice}€</div>
                            <div style={{ fontSize: 10, color: ENG_MODE_COLORS[mode], marginTop: 3 }}>{ENG_MODE_LABELS[mode]}</div>
                            {!slot.available && <div style={s.slotTagRed}>Complet</div>}
                            {slot.available && selectedSlot?.id === slot.id && <div style={s.slotTagBlue}>✓</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* PANIER INGÉ — s'ouvre automatiquement sur créneau autonomie */}
                  {selectedSlot && showEngBasket && (
                    <div style={s.engBasket}>
                      <div style={s.engBasketHeader}>
                        <div>
                          <div style={s.engBasketTitle}>🎒 Ajouter un ingé son à ta session ?</div>
                          <div style={s.engBasketSub}>Ce créneau est en autonomie. Tu peux venir seul ou choisir un ingé freelance disponible.</div>
                        </div>
                        <button style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18 }} onClick={() => setShowEngBasket(false)}>✕</button>
                      </div>
                      {availableEngs.length === 0 ? (
                        <div style={{ color: "#555", fontFamily: "DM Sans, sans-serif", fontSize: 13, padding: "12px 0" }}>
                          Aucun ingé freelance disponible pour ce créneau dans ce secteur.
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                          {availableEngs.map(eng => {
                            const delay = getEngResponseDelay(selectedSlot.hoursUntil);
                            return (
                              <div key={eng.id}
                                style={{ ...s.engCard, ...(selectedFreelanceEng?.id === eng.id ? s.engCardSelected : {}) }}
                                onClick={() => setSelectedFreelanceEng(selectedFreelanceEng?.id === eng.id ? null : eng)}
                              >
                                <div style={{ ...s.engAvatarSm, borderColor: eng.color, color: eng.color, width: 36, height: 36, fontSize: 14 }}>{eng.avatar}</div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{eng.name}</div>
                                  <div style={{ color: "#666", fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>{eng.specialty.join(", ")}</div>
                                  <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>⏱ {delay.label} · {eng.acceptanceRate}% acc.</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>+{getPriceDisplayed(eng.rate, 0.06)}€/h</div>
                                  <div style={{ fontSize: 10, color: "#aaa" }}>⭐ {eng.rating}</div>
                                  {selectedFreelanceEng?.id === eng.id && <div style={{ color: "#ff3b3b", fontSize: 10, marginTop: 2 }}>✓ Ajouté</div>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {selectedFreelanceEng && (
                        <div style={{ ...s.cashWarning, background: "#00e5ff11", border: "1px solid #00e5ff33", color: "#00e5ff", marginTop: 12 }}>
                          ⏱ {selectedFreelanceEng.name} a {getEngResponseDelay(selectedSlot.hoursUntil).hours}h pour accepter. Remboursement intégral si refus.
                        </div>
                      )}
                    </div>
                  )}

                  {/* PANIER INGÉ — créneau freelance */}
                  {selectedSlot && slotMode === "freelance" && !showEngBasket && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={s.slotTitle}>Choisir un ingé son <span style={{ fontSize: 11, color: "#555", fontWeight: 400 }}>(optionnel)</span></div>
                      {FREELANCE_ENGINEERS.map(eng => (
                        <div key={eng.id} style={{ ...s.engCard, ...(selectedFreelanceEng?.id === eng.id ? s.engCardSelected : {}), marginBottom: 10 }}
                          onClick={() => setSelectedFreelanceEng(selectedFreelanceEng?.id === eng.id ? null : eng)}>
                          <div>
                            <div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{eng.name}</div>
                            <div style={{ color: "#666", fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>{eng.specialty.join(", ")}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>+{getPriceDisplayed(eng.rate, 0.06)}€/h</div>
                            <div style={{ fontSize: 10, color: "#555" }}>⭐ {eng.rating} · {eng.acceptanceRate}% acc.</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedSlot && pricing && (
                    <div style={s.pricingPreview}>
                      <div style={s.pricingTitle}>Récap tarifaire</div>
                      <div style={s.pricingRow}>
                        <span style={s.pricingLabel}>Studio · {slotMode === "autonomous" ? "🔧 Autonomie" : "👤 Ingé inclus"} ({selectedSlot.hours}h)</span>
                        <span style={s.pricingValue}>{pricing.studioTotal}€</span>
                      </div>
                      {pricing.engTotal > 0 && (
                        <div style={s.pricingRow}>
                          <span style={s.pricingLabel}>+ {selectedFreelanceEng?.name} ({selectedSlot.hours}h)</span>
                          <span style={s.pricingValue}>{pricing.engTotal}€</span>
                        </div>
                      )}
                      <div style={{ ...s.pricingRow, borderTop: "1px solid #1e1e1e", paddingTop: 10, marginTop: 6 }}>
                        <span style={s.pricingLabel}>Total</span>
                        <span style={{ ...s.pricingValue, fontSize: 20 }}>{pricing.grandTotal}€</span>
                      </div>
                      <div style={s.pricingRow}>
                        <span style={s.pricingLabel}>À payer maintenant <span style={s.pricingNote}>obligatoire</span></span>
                        <span style={{ ...s.pricingValue, color: "#ff3b3b" }}>{pricing.grandDeposit}€</span>
                      </div>
                      {pricing.grandRemaining > 0 && <div style={s.pricingRow}><span style={s.pricingLabel}>Solde sur place</span><span style={s.pricingValue}>{pricing.grandRemaining}€</span></div>}
                      {pricing.grandRemaining === 0 && <div style={{ fontSize: 11, color: "#00e5ff", marginTop: 6, fontFamily: "DM Sans, sans-serif" }}>✓ 100% réglé en ligne</div>}
                      <div style={s.cancelPolicy}>
                        <div style={s.cancelTitle}>Politique d'annulation</div>
                        <div style={s.cancelRow}><span>Plus de 72h avant</span><span style={{ color: "#00e5ff" }}>100% remboursé</span></div>
                        <div style={s.cancelRow}><span>Entre 24h et 72h</span><span style={{ color: "#f5a623" }}>50% remboursé</span></div>
                        <div style={s.cancelRow}><span>Moins de 24h</span><span style={{ color: "#ff3b3b" }}>Non remboursé</span></div>
                      </div>
                      <button style={{ ...s.ctaPrimary, width: "100%", marginTop: 20 }} onClick={() => setBookingStep(2)}>Continuer →</button>
                    </div>
                  )}

                  {selectedStudio.reviewsData?.length > 0 && !selectedSlot && (
                    <div style={{ marginTop: 32 }}>
                      <div style={s.slotTitle}>Avis artistes</div>
                      {selectedStudio.reviewsData.map(r => (
                        <div key={r.id} style={s.reviewCard}>
                          <div style={s.reviewHeader}>
                            <span style={s.reviewArtist}>{r.artist}</span>
                            <StarRating value={r.rating} size={13} />
                            <span style={s.reviewDate}>{r.date}</span>
                          </div>
                          {r.comment && <div style={s.reviewComment}>{r.comment}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {bookingStep === 2 && pricing && (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={s.payBlock}>
                    <div style={s.payBlockHeader}><span>💳 À payer maintenant</span><span style={s.payBlockAmount}>{pricing.grandDeposit}€</span></div>
                    <div style={s.payBlockSub}>
                      {selectedFreelanceEng ? `Inclut l'acompte studio + ${selectedFreelanceEng.name} (100% en ligne). Remboursement si l'ingé refuse.` : "Sécurise ton créneau."}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {PAYMENT_METHODS.map(m => (
                        <div key={m.id}>
                          <div style={{ ...s.payMethod, ...(paymentMethod === m.id ? s.payMethodSelected : {}) }} onClick={() => setPaymentMethod(m.id)}>
                            <span style={{ fontSize: 20 }}>{m.icon}</span>
                            <span style={s.payMethodLabel}>{m.label}</span>
                            {paymentMethod === m.id && <span style={{ color: "#ff3b3b", fontWeight: 700 }}>✓</span>}
                          </div>
                          {m.info && <div style={s.paysafeInfo}>ℹ️ {m.info}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                  {pricing.grandRemaining > 0 && (
                    <div style={s.payBlock}>
                      <div style={s.payBlockHeader}><span>🏠 Solde sur place</span><span style={s.payBlockAmount}>{pricing.grandRemaining}€</span></div>
                      <div style={s.payBlockSub}>Comment tu règles le reste ?</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ ...s.payMethod, ...(remainderMethod === "card" ? s.payMethodSelected : {}) }} onClick={() => setRemainderMethod("card")}>
                          <span style={{ fontSize: 20 }}>💳</span><span style={s.payMethodLabel}>Carte bancaire</span>
                          {remainderMethod === "card" && <span style={{ color: "#ff3b3b", fontWeight: 700 }}>✓</span>}
                        </div>
                        {selectedStudio.acceptsCash ? (
                          <div style={{ ...s.payMethod, ...(remainderMethod === "cash" ? s.payMethodSelected : {}) }} onClick={() => setRemainderMethod("cash")}>
                            <span style={{ fontSize: 20 }}>💵</span><span style={s.payMethodLabel}>Espèces (cash)</span>
                            {remainderMethod === "cash" && <span style={{ color: "#ff3b3b", fontWeight: 700 }}>✓</span>}
                          </div>
                        ) : (
                          <div style={{ ...s.payMethod, opacity: 0.35, cursor: "not-allowed" }}>
                            <span style={{ fontSize: 20 }}>💵</span><span style={s.payMethodLabel}>Espèces — non accepté</span>
                          </div>
                        )}
                      </div>
                      {remainderMethod === "cash" && <div style={s.cashWarning}>⚠️ Prévois {pricing.grandRemaining}€ en espèces. Le studio sera notifié.</div>}
                    </div>
                  )}
                  <div style={s.payBlock}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: pricing.grandRemaining > 0 ? 6 : 16 }}>
                      <span style={{ fontFamily: "DM Sans, sans-serif", color: "#aaa" }}>À payer maintenant</span>
                      <span style={{ color: "#ff3b3b", fontWeight: 900, fontSize: 22 }}>{pricing.grandDeposit}€</span>
                    </div>
                    {pricing.grandRemaining > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                        <span style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 13 }}>Solde sur place</span>
                        <span style={{ color: "#666", fontSize: 13 }}>{pricing.grandRemaining}€ {remainderMethod === "cash" ? "en cash" : remainderMethod === "card" ? "en carte" : ""}</span>
                      </div>
                    )}
                    <button
                      style={{ ...s.ctaPrimary, width: "100%", opacity: (paymentMethod && (pricing.grandRemaining === 0 || remainderMethod)) ? 1 : 0.4 }}
                      onClick={confirmBooking}
                    >
                      {selectedFreelanceEng ? `Payer ${pricing.grandDeposit}€ — en attente d'acceptation →` : `Payer ${pricing.grandDeposit}€ et confirmer →`}
                    </button>
                    <div style={{ textAlign: "center", fontSize: 11, color: "#444", marginTop: 10, fontFamily: "DM Sans, sans-serif" }}>🔒 Paiement sécurisé</div>
                  </div>
                </div>
              )}

              {bookingStep === 3 && pricing && (
                <div style={{ textAlign: "center", paddingTop: 10 }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>{selectedFreelanceEng ? "⏳" : "✅"}</div>
                  <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: "#fff", margin: "0 0 12px" }}>
                    {selectedFreelanceEng ? "En attente" : "Confirmé !"}
                  </h2>
                  <p style={{ color: "#666", lineHeight: 1.7, marginBottom: 24, fontFamily: "DM Sans, sans-serif", fontSize: 13 }}>
                    {selectedFreelanceEng
                      ? `${pricing.grandDeposit}€ encaissés. ${selectedFreelanceEng.name} a ${getEngResponseDelay(selectedSlot.hoursUntil).hours}h pour accepter. Remboursement intégral si refus.`
                      : `${pricing.grandDeposit}€ encaissés. ${pricing.grandRemaining > 0 ? `Règle les ${pricing.grandRemaining}€ ${remainderMethod === "cash" ? "en espèces" : "par carte"} sur place.` : "Tout est réglé."}`}
                  </p>
                  <div style={{ background: "#0f0f0f", border: "1px solid #1e1e1e", padding: 20, textAlign: "left", marginBottom: 16 }}>
                    {[
                      ["Studio", selectedStudio.name],
                      ["Date", selectedSlot.date],
                      ["Horaire", selectedSlot.time],
                      selectedFreelanceEng ? ["Ingé son", `${selectedFreelanceEng.name} (en attente)`] : null,
                      pricing.grandRemaining > 0 ? ["Solde", `${pricing.grandRemaining}€ ${remainderMethod === "cash" ? "espèces" : "carte"}`] : null,
                    ].filter(Boolean).map(([label, value]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #111" }}>
                        <span style={{ color: "#555", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "DM Sans, sans-serif" }}>{label}</span>
                        <span style={{ color: "#ccc", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>{value}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0" }}>
                      <span style={{ color: "#555", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "DM Sans, sans-serif" }}>Payé</span>
                      <span style={{ color: "#ff3b3b", fontWeight: 900, fontSize: 20 }}>{pricing.grandDeposit}€</span>
                    </div>
                  </div>
                  <div style={s.notifInfoBox}>📲 Rappel 24h et 1h avant ta session.</div>
                  <button style={s.ctaSecondary} onClick={() => { setView("explore"); setBookingStep(1); setSelectedSlot(null); setSelectedFreelanceEng(null); setShowEngBasket(false); }}>Explorer d'autres studios</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STUDIO DASHBOARD */}
      {view === "dashboard" && (
        <div style={s.page}>
          <div style={s.dashHeader}>
            <div>
              <div style={s.sectionTag}>MON STUDIO</div>
              <h2 style={s.dashTitle}>{dashStudio.name}</h2>
              <div style={{ color: "#555", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>📍 {dashStudio.location}</div>
            </div>
            <div style={s.dashStats}>
              <div style={s.dashStat}><div style={s.dashStatNum}>{dashStudio.bookings.length}</div><div style={s.dashStatLabel}>Sessions</div></div>
              <div style={s.dashStat}><div style={s.dashStatNum}>{dashStudio.bookings.reduce((a, b) => a + dashStudio.netPrice * b.hours, 0)}€</div><div style={s.dashStatLabel}>Revenus</div></div>
              <div style={s.dashStat}><div style={{ ...s.dashStatNum, color: currentRate === 0.10 ? "#00e5ff" : currentRate === 0.12 ? "#f5a623" : "#aaa" }}>{Math.round(currentRate * 100)}%</div><div style={s.dashStatLabel}>Commission</div></div>
              <div style={s.dashStat}><div style={{ ...s.dashStatNum, color: "#00e5ff" }}>{dashStudio.slots.filter(sl => sl.available).length}</div><div style={s.dashStatLabel}>Créneaux</div></div>
            </div>
          </div>
          <div style={s.palierBox}>
            <div>
              <div style={s.palierTitle}>Palier — {dashStudio.hoursLastMonth}h le mois dernier</div>
              <div style={s.palierDesc}>
                Taux actuel : <strong style={{ color: currentRate === 0.10 ? "#00e5ff" : currentRate === 0.12 ? "#f5a623" : "#aaa" }}>{Math.round(currentRate * 100)}%</strong>
                {nextPalier && <span style={{ color: "#555" }}> · {nextPalier - dashStudio.hoursLastMonth}h pour passer à {nextPalier >= 150 ? "10%" : "12%"}</span>}
              </div>
              {!nextPalier && <div style={{ color: "#00e5ff", fontSize: 12, fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>🏆 Palier maximum !</div>}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#00e5ff" }}>{nextPalier ? `→ ${nextPalier >= 150 ? "10%" : "12%"}` : "✓ MAX"}</div>
          </div>
          <div style={s.tabs}>
            {[["infos", "⚙️ Infos"], ["slots", "📅 Créneaux"], ["bookings", "📋 Réservations"]].map(([id, label]) => (
              <button key={id} style={{ ...s.tab, ...(dashTab === id ? s.tabActive : {}) }} onClick={() => setDashTab(id)}>{label}</button>
            ))}
          </div>
          {dashTab === "infos" && (
            <div style={s.dashCard}>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Informations générales</div>
                <div style={s.formGrid}>
                  <div style={s.formGroup}><label style={s.formLabel}>Nom</label><input style={s.input} value={dashStudio.name} onChange={e => setDashStudio({ ...dashStudio, name: e.target.value })} /></div>
                  <div style={s.formGroup}><label style={s.formLabel}>Ville / Adresse</label><input style={s.input} value={dashStudio.location} onChange={e => setDashStudio({ ...dashStudio, location: e.target.value })} /></div>
                  <div style={s.formGroup}><label style={s.formLabel}>Responsable</label><input style={s.input} value={dashStudio.engineer} onChange={e => setDashStudio({ ...dashStudio, engineer: e.target.value })} /></div>
                  <div style={s.formGroup}><label style={s.formLabel}>Rôle</label><input style={s.input} value={dashStudio.engineerType} onChange={e => setDashStudio({ ...dashStudio, engineerType: e.target.value })} /></div>
                </div>
              </div>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Tarification</div>
                <div style={s.formGrid}>
                  <div style={s.formGroup}>
                    <label style={s.formLabel}>Prix net avec ingé (€/h)</label>
                    <input style={s.input} type="number" value={dashStudio.netPrice} onChange={e => setDashStudio({ ...dashStudio, netPrice: parseInt(e.target.value) || 0 })} />
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>
                      Affiché : <strong style={{ color: "#fff" }}>{getPriceDisplayed(dashStudio.netPrice, currentRate)}€/h</strong> · Autonomie : <strong style={{ color: "#f5a623" }}>{Math.round(getPriceDisplayed(dashStudio.netPrice, currentRate) * 0.70)}€/h</strong>
                    </div>
                  </div>
                  <div style={s.formGroup}><label style={s.formLabel}>Durée minimum</label>
                    <select style={s.input} value={dashStudio.minHours} onChange={e => setDashStudio({ ...dashStudio, minHours: parseInt(e.target.value) })}>
                      {[1, 2, 3, 4, 5, 6, 8].map(h => <option key={h} value={h}>{h}h</option>)}
                    </select>
                  </div>
                  <div style={s.formGroup}><label style={s.formLabel}>Acompte (%)</label>
                    <select style={s.input} value={dashStudio.depositPercent} onChange={e => setDashStudio({ ...dashStudio, depositPercent: parseInt(e.target.value) })}>
                      {[20, 25, 30, 35, 40, 50].map(p => <option key={p} value={p}>{p}%</option>)}
                    </select>
                  </div>
                  <div style={s.formGroup}><label style={s.formLabel}>Mode par défaut</label>
                    <select style={s.input} value={dashStudio.defaultEngineerMode} onChange={e => setDashStudio({ ...dashStudio, defaultEngineerMode: e.target.value })}>
                      <option value="included">👤 Ingé inclus</option>
                      <option value="autonomous">🔧 Autonomie</option>
                      <option value="freelance">🎒 Ingé freelance dispo</option>
                    </select>
                  </div>
                </div>
                <div style={{ ...s.formGroup, marginTop: 14 }}>
                  <label style={s.formLabel}>Cash accepté ?</label>
                  <div style={s.toggleRow}>
                    <div style={{ ...s.toggle, ...(dashStudio.acceptsCash ? s.toggleOn : {}) }} onClick={() => { if (!dashStudio.acceptsCash) setCashDisclaimerShown(true); else setDashStudio({ ...dashStudio, acceptsCash: false }); }}>
                      <div style={{ ...s.toggleDot, ...(dashStudio.acceptsCash ? s.toggleDotOn : {}) }} />
                    </div>
                    <span style={{ color: dashStudio.acceptsCash ? "#fff" : "#555", fontFamily: "DM Sans, sans-serif", fontSize: 14 }}>{dashStudio.acceptsCash ? "Oui" : "Non — en ligne uniquement"}</span>
                  </div>
                </div>
                {cashDisclaimerShown && !dashStudio.acceptsCash && (
                  <div style={s.disclaimerBox}>
                    <div style={s.disclaimerTitle}>⚠️ Avant d'activer le cash</div>
                    <div style={s.disclaimerText}>
                      • STÜDIO n'est pas responsable des litiges cash<br />
                      • La sécurité du cash est entièrement de votre responsabilité<br />
                      • Les sessions cash non honorées ne comptent pas dans votre palier<br />
                      • Vous disposez d'un système d'encaissement sécurisé sur place
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                      <button style={s.ctaPrimary} onClick={() => { setDashStudio({ ...dashStudio, acceptsCash: true }); setCashDisclaimerShown(false); }}>J'accepte</button>
                      <button style={s.ctaSecondary} onClick={() => setCashDisclaimerShown(false)}>Annuler</button>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <button style={s.ctaPrimary} onClick={() => { setStudios(studios.map(st => st.id === dashStudio.id ? { ...dashStudio } : st)); setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); }}>Sauvegarder</button>
                {savedMsg && <span style={{ color: "#00e5ff", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>✓ Sauvegardé !</span>}
              </div>
            </div>
          )}
          {dashTab === "slots" && (
            <div style={s.dashCard}>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Ajouter un créneau</div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end" }}>
                  <div style={s.formGroup}><label style={s.formLabel}>Jour</label>
                    <select style={s.input} value={newSlot.date} onChange={e => setNewSlot({ ...newSlot, date: e.target.value })}>
                      {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div style={s.formGroup}><label style={s.formLabel}>Début</label>
                    <select style={s.input} value={newSlot.startH} onChange={e => setNewSlot({ ...newSlot, startH: e.target.value })}>
                      {Array.from({ length: 24 }, (_, i) => i).map(h => <option key={h} value={h}>{String(h).padStart(2, "0")}h</option>)}
                    </select>
                  </div>
                  <div style={s.formGroup}><label style={s.formLabel}>Fin</label>
                    <select style={s.input} value={newSlot.endH} onChange={e => setNewSlot({ ...newSlot, endH: e.target.value })}>
                      {Array.from({ length: 24 }, (_, i) => i).map(h => <option key={h} value={h}>{String(h).padStart(2, "0")}h</option>)}
                    </select>
                  </div>
                  <div style={s.formGroup}><label style={s.formLabel}>Exception ?</label>
                    <select style={s.input} value={newSlot.engineerMode || ""} onChange={e => setNewSlot({ ...newSlot, engineerMode: e.target.value || null })}>
                      <option value="">Défaut ({ENG_MODE_LABELS[dashStudio.defaultEngineerMode]})</option>
                      <option value="included">👤 Ingé inclus</option>
                      <option value="autonomous">🔧 Autonomie</option>
                      <option value="freelance">🎒 Ingé freelance</option>
                    </select>
                  </div>
                  <button style={s.ctaPrimary} onClick={() => {
                    const hours = parseInt(newSlot.endH) - parseInt(newSlot.startH);
                    if (hours <= 0) return;
                    const slot = { id: Date.now(), date: newSlot.date, time: `${newSlot.startH}h - ${newSlot.endH}h`, hours, available: true, engineerMode: newSlot.engineerMode || null, hoursUntil: 48 };
                    const updated = { ...dashStudio, slots: [...dashStudio.slots, slot] };
                    setDashStudio(updated);
                    setStudios(studios.map(st => st.id === dashStudio.id ? updated : st));
                  }}>+ Ajouter</button>
                </div>
              </div>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Créneaux ({dashStudio.slots.length})</div>
                <div style={s.slotList}>
                  {dashStudio.slots.map(slot => {
                    const mode = slot.engineerMode || dashStudio.defaultEngineerMode;
                    const slotPrice = getSlotPrice(dashStudio, slot);
                    return (
                      <div key={slot.id} style={s.slotListItem}>
                        <div>
                          <div style={{ color: "#fff", fontWeight: 700 }}>{slot.date} · {slot.time}</div>
                          <div style={{ color: "#555", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>
                            {slot.hours}h · {slot.hours * slotPrice}€ · <span style={{ color: ENG_MODE_COLORS[mode] }}>{ENG_MODE_LABELS[mode]}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <div style={{ ...s.slotStatus, ...(slot.available ? s.slotStatusOk : s.slotStatusFull) }}>{slot.available ? "Dispo" : "Complet"}</div>
                          <button style={s.removeBtn} onClick={() => {
                            const updated = { ...dashStudio, slots: dashStudio.slots.filter(sl => sl.id !== slot.id) };
                            setDashStudio(updated);
                            setStudios(studios.map(st => st.id === dashStudio.id ? updated : st));
                          }}>✕</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {dashTab === "bookings" && (
            <div style={s.dashCard}>
              <div style={s.dashSectionTitle}>Réservations</div>
              {dashStudio.bookings.length === 0 && <div style={{ color: "#555", fontFamily: "DM Sans, sans-serif", padding: "20px 0" }}>Aucune réservation.</div>}
              {dashStudio.bookings.map(booking => (
                <div key={booking.id} style={s.bookingCard}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>🎤 {booking.artist}</div>
                    <div style={{ color: "#aaa", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>{booking.date} · {booking.time} · {booking.hours}h</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#00e5ff" }}>{dashStudio.netPrice * booking.hours}€ net</div>
                    <span style={s.cashBadge}>{booking.remainderMethod === "cash" ? "💵 Cash" : "💳 Carte"}</span>
                    <div style={{ fontSize: 11, color: "#00e5ff", marginTop: 6 }}>✓ Confirmé</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ENGINEER DASHBOARD */}
      {view === "engdashboard" && (
        <div style={s.page}>
          <div style={s.dashHeader}>
            <div>
              <div style={s.sectionTag}>MON PROFIL INGÉ SON</div>
              <h2 style={s.dashTitle}>{engProfile.name}</h2>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6 }}>
                <div style={{ ...s.engStatusBadge, ...(engProfile.status === "freelance" ? s.engStatusFreelance : s.engStatusStudio) }}>
                  {engProfile.status === "freelance" ? "🎒 Freelance" : "🏢 Studio fixe"}
                </div>
                <button style={s.switchStatusBtn} onClick={() => setEngProfile({ ...engProfile, status: engProfile.status === "freelance" ? "studio" : "freelance" })}>Changer</button>
              </div>
            </div>
            <div style={s.dashStats}>
              <div style={s.dashStat}><div style={s.dashStatNum}>{engProfile.sessions.length}</div><div style={s.dashStatLabel}>Sessions</div></div>
              <div style={s.dashStat}><div style={s.dashStatNum}>⭐ {engProfile.rating}</div><div style={s.dashStatLabel}>Note</div></div>
              <div style={s.dashStat}><div style={{ ...s.dashStatNum, color: "#00e5ff" }}>{engProfile.reviewCount}</div><div style={s.dashStatLabel}>Avis</div></div>
              <div style={s.dashStat}><div style={{ ...s.dashStatNum, color: "#f5a623" }}>{engProfile.acceptanceRate}%</div><div style={s.dashStatLabel}>Acceptation</div></div>
            </div>
          </div>

          {/* DEMANDES EN ATTENTE */}
          {engProfile.pendingRequests?.filter(r => r.status === "pending").length > 0 && (
            <div style={s.pendingBox}>
              <div style={s.pendingTitle}>🔔 Demandes en attente</div>
              {engProfile.pendingRequests.filter(r => r.status === "pending").map(req => {
                const delay = getEngResponseDelay(req.hoursUntil);
                return (
                  <div key={req.id} style={s.pendingCard}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>🎤 {req.artist}</div>
                      <div style={{ color: "#aaa", fontSize: 13, fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{req.date} · {req.time} · {req.hours}h</div>
                      <div style={{ color: "#666", fontSize: 12, fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>📍 {req.location}</div>
                      <div style={{ fontSize: 11, color: "#ff3b3b", marginTop: 4 }}>⏱ {delay.label} pour répondre</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                      <button style={{ ...s.ctaPrimary, padding: "10px 20px", fontSize: 12 }} onClick={() => handleEngRequestAction(req.id, "accepted")}>✓ Accepter</button>
                      <button style={{ ...s.ctaSecondary, padding: "10px 20px", fontSize: 12 }} onClick={() => handleEngRequestAction(req.id, "refused")}>✕ Refuser</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={s.tabs}>
            {[["profil", "👤 Profil"], ["sessions", "🎙️ Sessions"], ["dispo", "📅 Dispos"]].map(([id, label]) => (
              <button key={id} style={{ ...s.tab, ...(engTab === id ? s.tabActive : {}) }} onClick={() => setEngTab(id)}>{label}</button>
            ))}
          </div>

          {engTab === "profil" && (
            <div style={s.dashCard}>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Informations</div>
                <div style={s.formGrid}>
                  <div style={s.formGroup}><label style={s.formLabel}>Nom / Pseudo</label><input style={s.input} value={engProfile.name} onChange={e => setEngProfile({ ...engProfile, name: e.target.value })} /></div>
                  {engProfile.status === "freelance" && (
                    <div style={s.formGroup}>
                      <label style={s.formLabel}>Tarif net (€/h)</label>
                      <input style={s.input} type="number" value={engProfile.rate} onChange={e => setEngProfile({ ...engProfile, rate: parseInt(e.target.value) || 0 })} />
                      <div style={{ fontSize: 11, color: "#555", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>
                        Affiché : <strong style={{ color: "#fff" }}>{getPriceDisplayed(engProfile.rate, 0.06)}€/h</strong>
                      </div>
                    </div>
                  )}
                </div>
                {engProfile.status === "freelance" && (
                  <div style={{ ...s.formGrid, marginTop: 14 }}>
                    <div style={s.formGroup}>
                      <label style={s.formLabel}>Ville de base</label>
                      <input style={s.input} value={engProfile.city} onChange={e => setEngProfile({ ...engProfile, city: e.target.value })} />
                    </div>
                    <div style={s.formGroup}>
                      <label style={s.formLabel}>Rayon de déplacement</label>
                      <select style={s.input} value={engProfile.radiusKm} onChange={e => setEngProfile({ ...engProfile, radiusKm: parseInt(e.target.value) })}>
                        {RADIUS_OPTIONS.map(r => <option key={r} value={r}>{r} km</option>)}
                      </select>
                    </div>
                    <div style={s.formGroup}>
                      <label style={s.formLabel}>Délai minimum avant session</label>
                      <select style={s.input} value={engProfile.minNoticeHours} onChange={e => setEngProfile({ ...engProfile, minNoticeHours: parseInt(e.target.value) })}>
                        {MIN_NOTICE_OPTIONS.map(o => <option key={o.h} value={o.h}>{o.label}</option>)}
                      </select>
                      <div style={{ fontSize: 11, color: "#555", fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>Tu n'apparaîtras pas pour les sessions trop proches.</div>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: 14 }}>
                  <label style={s.formLabel}>Bio</label>
                  <textarea style={{ ...s.input, height: 80, resize: "none", marginTop: 8 }} value={engProfile.bio} onChange={e => setEngProfile({ ...engProfile, bio: e.target.value })} />
                </div>
              </div>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Spécialités</div>
                <div style={s.tagGrid}>
                  {SPECIALTIES.map(sp => (
                    <div key={sp} style={{ ...s.tagToggle, ...(engProfile.specialty.includes(sp) ? s.tagToggleOn : {}) }}
                      onClick={() => { const specialty = engProfile.specialty.includes(sp) ? engProfile.specialty.filter(x => x !== sp) : [...engProfile.specialty, sp]; setEngProfile({ ...engProfile, specialty }); }}>
                      {sp} {engProfile.specialty.includes(sp) ? "✓" : "+"}
                    </div>
                  ))}
                </div>
              </div>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Genres maîtrisés</div>
                <div style={s.tagGrid}>
                  {GENRES.map(g => (
                    <div key={g} style={{ ...s.tagToggle, ...(engProfile.genres.includes(g) ? s.tagToggleOn : {}) }}
                      onClick={() => { const genres = engProfile.genres.includes(g) ? engProfile.genres.filter(x => x !== g) : [...engProfile.genres, g]; setEngProfile({ ...engProfile, genres }); }}>
                      {g} {engProfile.genres.includes(g) ? "✓" : "+"}
                    </div>
                  ))}
                </div>
              </div>
              {engProfile.status === "freelance" && (
                <div style={{ ...s.simBox, marginBottom: 20 }}>
                  <div style={{ ...s.simRow, color: "#555", fontSize: 12 }}>💡 Gratuit. 6% sur tes sessions STÜDIO uniquement. Virement auto après chaque session.</div>
                </div>
              )}
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <button style={s.ctaPrimary} onClick={() => { setEngSavedMsg(true); setTimeout(() => setEngSavedMsg(false), 2000); }}>Sauvegarder</button>
                {engSavedMsg && <span style={{ color: "#00e5ff", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>✓ Sauvegardé !</span>}
              </div>
            </div>
          )}

          {engTab === "sessions" && (
            <div style={s.dashCard}>
              <div style={s.dashSectionTitle}>Sessions</div>
              {engProfile.sessions.length === 0 && <div style={{ color: "#555", fontFamily: "DM Sans, sans-serif", padding: "20px 0" }}>Aucune session pour l'instant.</div>}
              {engProfile.sessions.map(session => (
                <div key={session.id} style={s.bookingCard}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>🎤 {session.artist}</div>
                    <div style={{ color: "#aaa", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>{session.date} · {session.time}</div>
                    <div style={{ color: "#555", fontSize: 12 }}>📍 {session.location} · {session.hours}h</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#00e5ff" }}>{engProfile.rate * session.hours}€ net</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 4, fontFamily: "DM Sans, sans-serif" }}>Virement auto</div>
                    <div style={{ fontSize: 11, color: "#00e5ff", marginTop: 4 }}>✓ Confirmé</div>
                  </div>
                </div>
              ))}
              {engProfile.pendingRequests?.filter(r => r.status !== "pending").map(req => (
                <div key={req.id} style={{ ...s.bookingCard, opacity: 0.6 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>🎤 {req.artist}</div>
                    <div style={{ color: "#aaa", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>{req.date} · {req.time}</div>
                  </div>
                  <div style={{ fontSize: 12, color: req.status === "accepted" ? "#00e5ff" : "#ff3b3b", fontWeight: 700 }}>
                    {req.status === "accepted" ? "✓ Accepté" : "✕ Refusé"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {engTab === "dispo" && (
            <div style={s.dashCard}>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Ajouter une disponibilité</div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end" }}>
                  <div style={s.formGroup}><label style={s.formLabel}>Jour</label>
                    <select style={s.input} value={newDispo.date} onChange={e => setNewDispo({ ...newDispo, date: e.target.value })}>
                      {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div style={s.formGroup}><label style={s.formLabel}>De</label>
                    <select style={s.input} value={newDispo.startH} onChange={e => setNewDispo({ ...newDispo, startH: e.target.value })}>
                      {Array.from({ length: 24 }, (_, i) => i).map(h => <option key={h} value={h}>{String(h).padStart(2, "0")}h</option>)}
                    </select>
                  </div>
                  <div style={s.formGroup}><label style={s.formLabel}>À</label>
                    <select style={s.input} value={newDispo.endH} onChange={e => setNewDispo({ ...newDispo, endH: e.target.value })}>
                      {Array.from({ length: 24 }, (_, i) => i).map(h => <option key={h} value={h}>{String(h).padStart(2, "00")}h</option>)}
                    </select>
                  </div>
                  <button style={s.ctaPrimary} onClick={() => {
                    if (parseInt(newDispo.endH) <= parseInt(newDispo.startH)) return;
                    setEngProfile({ ...engProfile, availabilities: [...engProfile.availabilities, { id: Date.now(), date: newDispo.date, time: `${newDispo.startH}h - ${newDispo.endH}h`, hoursUntil: 48 }] });
                  }}>+ Ajouter</button>
                </div>
              </div>
              <div style={s.dashSection}>
                <div style={s.dashSectionTitle}>Mes disponibilités ({engProfile.availabilities.length})</div>
                <div style={s.slotList}>
                  {engProfile.availabilities.length === 0 && <div style={{ color: "#555", fontFamily: "DM Sans, sans-serif" }}>Aucune dispo.</div>}
                  {engProfile.availabilities.map((dispo, i) => (
                    <div key={i} style={s.slotListItem}>
                      <div style={{ color: "#fff", fontWeight: 700 }}>{dispo.date} · {dispo.time}</div>
                      <button style={s.removeBtn} onClick={() => setEngProfile({ ...engProfile, availabilities: engProfile.availabilities.filter((_, idx) => idx !== i) })}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = {
  root: { minHeight: "100vh", background: "#080808", color: "#e8e8e8", fontFamily: "'Bebas Neue', 'DM Sans', sans-serif", position: "relative", overflowX: "hidden" },
  noise: { position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 0, opacity: 0.5 },
  nav: { position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: "rgba(8,8,8,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a" },
  logo: { fontSize: 24, fontWeight: 900, letterSpacing: 4, cursor: "pointer", color: "#fff" },
  logoDot: { color: "#ff3b3b", marginRight: 4 },
  navLinks: { display: "flex", alignItems: "center", gap: 16 },
  navBtn: { background: "none", border: "none", color: "#888", fontSize: 13, letterSpacing: 2, cursor: "pointer", textTransform: "uppercase" },
  navCta: { background: "#ff3b3b", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: "8px 18px", cursor: "pointer", textTransform: "uppercase" },
  notifBtn: { background: "none", border: "none", fontSize: 18, cursor: "pointer", position: "relative", color: "#888", padding: 0 },
  notifBadge: { position: "absolute", top: -4, right: -4, background: "#ff3b3b", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  notifDropdown: { position: "absolute", top: "100%", right: 0, width: 300, background: "#0f0f0f", border: "1px solid #222", zIndex: 200, marginTop: 8 },
  notifHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #1a1a1a" },
  notifItem: { padding: "12px 16px", borderBottom: "1px solid #111" },
  notifItemUnread: { background: "#ff3b3b08", borderLeft: "2px solid #ff3b3b" },
  notifMsg: { fontSize: 12, color: "#ccc", fontFamily: "DM Sans, sans-serif", marginBottom: 4 },
  notifTime: { fontSize: 10, color: "#555", fontFamily: "DM Sans, sans-serif" },
  avatarIcon: { fontSize: 22 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" },
  modalBox: { background: "#0f0f0f", border: "1px solid #222", padding: 44, maxWidth: 400, width: "90%", textAlign: "center" },
  modalEmoji: { fontSize: 52, marginBottom: 14 },
  modalTitle: { fontSize: 26, fontWeight: 900, letterSpacing: 3, color: "#fff", textTransform: "uppercase", marginBottom: 8 },
  modalSub: { fontSize: 13, color: "#666", fontFamily: "DM Sans, sans-serif", marginBottom: 24, lineHeight: 1.6 },
  page: { position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" },
  hero: { textAlign: "center", padding: "80px 0 60px" },
  heroTag: { display: "inline-block", background: "#ff3b3b22", color: "#ff3b3b", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", padding: "6px 16px", marginBottom: 24 },
  heroTitle: { fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: 2, margin: "0 0 24px", textTransform: "uppercase", color: "#fff" },
  accent: { color: "#ff3b3b" },
  heroSub: { fontSize: 16, color: "#777", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7, fontFamily: "DM Sans, sans-serif" },
  heroButtons: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 },
  ctaPrimary: { background: "#ff3b3b", color: "#fff", border: "none", padding: "14px 32px", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" },
  ctaSecondary: { background: "transparent", color: "#888", border: "1px solid #333", padding: "14px 32px", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" },
  heroStats: { display: "flex", justifyContent: "center", alignItems: "center", gap: 32 },
  stat: { display: "flex", flexDirection: "column", alignItems: "center" },
  statNum: { fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: 2 },
  statLabel: { fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase" },
  statDiv: { width: 1, height: 40, background: "#222" },
  section: { marginTop: 72 },
  sectionTag: { fontSize: 11, color: "#ff3b3b", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 },
  sectionTitle: { fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: 2, textTransform: "uppercase", color: "#fff", margin: "0 0 28px" },
  profileCards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 },
  profileCard: { background: "#0f0f0f", border: "1px solid #1e1e1e", padding: 28, cursor: "pointer", position: "relative" },
  profileCardSelected: { borderColor: "#ff3b3b" },
  profileIcon: { fontSize: 36, marginBottom: 12 },
  profileLabel: { fontSize: 20, fontWeight: 900, letterSpacing: 2, color: "#fff", textTransform: "uppercase", marginBottom: 6 },
  profileDesc: { fontSize: 12, color: "#555", fontFamily: "DM Sans, sans-serif" },
  profileArrow: { position: "absolute", bottom: 20, right: 20, color: "#333", fontSize: 20 },
  checkBadge: { position: "absolute", top: 12, right: 12, background: "#ff3b3b", color: "#fff", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 },
  centerBlock: { maxWidth: 700, margin: "0 auto", textAlign: "center" },
  signupForm: { display: "flex", flexDirection: "column", gap: 14, marginTop: 28, textAlign: "left" },
  input: { background: "#0f0f0f", border: "1px solid #222", color: "#e8e8e8", padding: "13px 16px", fontSize: 14, fontFamily: "DM Sans, sans-serif", outline: "none", width: "100%", boxSizing: "border-box" },
  statusCard: { flex: 1, background: "#0f0f0f", border: "1px solid #1e1e1e", padding: "18px 14px", cursor: "pointer", position: "relative", textAlign: "center" },
  statusCardSelected: { borderColor: "#ff3b3b", background: "#ff3b3b08" },
  exploreTitle: { fontSize: 34, fontWeight: 900, letterSpacing: 3, color: "#fff", textTransform: "uppercase", marginBottom: 18 },
  searchInput: { background: "#0f0f0f", border: "1px solid #222", color: "#e8e8e8", padding: "13px 18px", fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "DM Sans, sans-serif", outline: "none", marginBottom: 16 },
  filterSection: { marginBottom: 14 },
  filterLabel: { fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 },
  filterRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  filterChip: { background: "#111", border: "1px solid #222", color: "#666", padding: "6px 14px", fontSize: 12, letterSpacing: 1, cursor: "pointer", fontFamily: "DM Sans, sans-serif" },
  filterChipActive: { background: "#ff3b3b22", borderColor: "#ff3b3b", color: "#ff3b3b" },
  studioGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 18, marginTop: 20 },
  studioCard: { background: "#0d0d0d", border: "1px solid #1a1a1a", cursor: "pointer", overflow: "hidden" },
  studioCardTop: { padding: "20px 18px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  studioAvatar: { width: 50, height: 50, borderRadius: "50%", border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, flexShrink: 0 },
  modeTag: { fontSize: 10, letterSpacing: 1, padding: "3px 10px", fontFamily: "DM Sans, sans-serif" },
  studioCardBody: { padding: "10px 18px 18px" },
  studioCardName: { fontSize: 18, fontWeight: 900, letterSpacing: 2, color: "#fff", textTransform: "uppercase", marginBottom: 3 },
  studioCardLocation: { fontSize: 11, color: "#555", marginBottom: 10, fontFamily: "DM Sans, sans-serif" },
  studioCardEngineer: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 },
  engineerBadge: { background: "#1a1a1a", color: "#666", fontSize: 10, padding: "2px 8px", letterSpacing: 1 },
  engineerName: { color: "#aaa", fontSize: 12, fontFamily: "DM Sans, sans-serif" },
  studioCardFooter: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 },
  studioPrice: { color: "#aaa", fontSize: 12, fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 },
  priceNum: { color: "#fff", fontSize: 20, fontWeight: 900 },
  studioRating: { fontSize: 12, color: "#aaa", fontFamily: "DM Sans, sans-serif" },
  reviews: { color: "#555" },
  studioMeta: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 },
  availableBadge: { background: "#00e5ff11", color: "#00e5ff", fontSize: 10, letterSpacing: 1, padding: "3px 8px" },
  depositBadge: { background: "#ff3b3b11", color: "#ff3b3b", fontSize: 10, letterSpacing: 1, padding: "3px 8px" },
  cashBadge: { background: "#f5a62311", color: "#f5a623", fontSize: 10, letterSpacing: 1, padding: "3px 8px" },
  nextSlotBadge: { fontSize: 11, color: "#aaa", fontFamily: "DM Sans, sans-serif", background: "#111", padding: "6px 10px" },
  engGrid: { display: "flex", flexDirection: "column", gap: 10 },
  engCardPublic: { display: "flex", alignItems: "center", gap: 14, background: "#0f0f0f", border: "1px solid #1e1e1e", padding: "14px 18px", cursor: "pointer" },
  engAvatarSm: { width: 44, height: 44, borderRadius: "50%", border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, flexShrink: 0 },
  engAvatarLg: { width: 80, height: 80, borderRadius: "50%", border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, flexShrink: 0 },
  cardTag: { background: "#ffffff0f", color: "#999", padding: "2px 8px", fontSize: 10, letterSpacing: 1 },
  backBtn: { background: "none", border: "none", color: "#666", fontSize: 12, letterSpacing: 2, cursor: "pointer", marginBottom: 18, padding: 0, textTransform: "uppercase" },
  stepBar: { display: "flex", alignItems: "center", marginBottom: 28 },
  stepBarDot: { width: 26, height: 26, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333", color: "#555", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 },
  stepBarDotActive: { background: "#ff3b3b", border: "1px solid #ff3b3b", color: "#fff" },
  stepBarLabel: { fontSize: 11, color: "#444", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" },
  stepBarLabelActive: { color: "#aaa" },
  stepBarLine: { flex: 1, height: 1, background: "#1a1a1a", margin: "0 10px" },
  stepBarLineActive: { background: "#ff3b3b" },
  studioDetail: { background: "#0d0d0d", border: "1px solid #1a1a1a", overflow: "hidden" },
  detailHeader: { padding: "32px 32px 24px", display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" },
  studioAvatarLg: { width: 72, height: 72, borderRadius: "50%", border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, flexShrink: 0 },
  detailInfo: { flex: 1, minWidth: 160 },
  detailName: { fontSize: 32, fontWeight: 900, letterSpacing: 3, color: "#fff", textTransform: "uppercase", margin: "0 0 5px" },
  detailLocation: { color: "#666", fontSize: 12, fontFamily: "DM Sans, sans-serif" },
  detailPrice: { fontSize: 32, fontWeight: 900, color: "#fff" },
  detailDepositInfo: { fontSize: 11, color: "#ff3b3b", letterSpacing: 1, marginTop: 4 },
  cashOkBadge: { fontSize: 11, color: "#f5a623", marginTop: 5 },
  detailBody: { padding: 32 },
  engineerBlock: { display: "flex", alignItems: "center", gap: 14, background: "#111", padding: 18, marginBottom: 28 },
  engineerBlockName: { fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: 1 },
  engineerBlockType: { fontSize: 11, color: "#666", fontFamily: "DM Sans, sans-serif" },
  ratingBlock: { marginLeft: "auto", color: "#aaa", fontSize: 12, fontFamily: "DM Sans, sans-serif" },
  slotSection: { marginBottom: 28 },
  slotTitle: { fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#fff", textTransform: "uppercase", marginBottom: 14 },
  slotGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: 10 },
  slotCard: { background: "#111", border: "1px solid #1e1e1e", padding: "13px", cursor: "pointer" },
  slotUnavailable: { opacity: 0.3, cursor: "not-allowed" },
  slotSelected: { borderColor: "#00e5ff", background: "#00e5ff08" },
  slotDate: { fontSize: 10, color: "#555", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" },
  slotTime: { fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 1, marginBottom: 2 },
  slotHours: { fontSize: 10, color: "#555", fontFamily: "DM Sans, sans-serif", marginBottom: 2 },
  slotTagRed: { fontSize: 9, letterSpacing: 1, background: "#ff3b3b22", color: "#ff3b3b", padding: "2px 6px", display: "inline-block", marginTop: 3 },
  slotTagBlue: { fontSize: 9, letterSpacing: 1, background: "#00e5ff22", color: "#00e5ff", padding: "2px 6px", display: "inline-block", marginTop: 3 },
  engBasket: { background: "#0f0f0f", border: "1px solid #f5a62344", padding: 20, marginBottom: 24 },
  engBasketHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  engBasketTitle: { fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 1 },
  engBasketSub: { fontSize: 12, color: "#666", fontFamily: "DM Sans, sans-serif", marginTop: 4 },
  engCard: { display: "flex", alignItems: "center", gap: 12, background: "#111", border: "1px solid #1e1e1e", padding: "12px 16px", cursor: "pointer" },
  engCardSelected: { borderColor: "#ff3b3b", background: "#ff3b3b08" },
  pricingPreview: { background: "#111", border: "1px solid #222", padding: 20, marginTop: 8 },
  pricingTitle: { fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#fff", textTransform: "uppercase", marginBottom: 12 },
  pricingRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" },
  pricingLabel: { fontSize: 12, color: "#666", fontFamily: "DM Sans, sans-serif" },
  pricingNote: { background: "#ff3b3b22", color: "#ff3b3b", fontSize: 9, padding: "1px 6px", marginLeft: 8 },
  pricingValue: { fontSize: 14, fontWeight: 700, color: "#fff" },
  cancelPolicy: { background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "12px 14px", marginTop: 14 },
  cancelTitle: { fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 },
  cancelRow: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "#666", fontFamily: "DM Sans, sans-serif", padding: "2px 0" },
  payBlock: { background: "#111", border: "1px solid #222", padding: 20 },
  payBlockHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5 },
  payBlockAmount: { fontSize: 20, fontWeight: 900, color: "#ff3b3b" },
  payBlockSub: { fontSize: 11, color: "#555", fontFamily: "DM Sans, sans-serif", marginBottom: 14 },
  payMethod: { display: "flex", alignItems: "center", gap: 12, background: "#0d0d0d", border: "1px solid #1e1e1e", padding: "12px 16px", cursor: "pointer" },
  payMethodSelected: { borderColor: "#ff3b3b", background: "#ff3b3b08" },
  payMethodLabel: { flex: 1, fontSize: 13, color: "#ccc", fontFamily: "DM Sans, sans-serif" },
  paysafeInfo: { fontSize: 10, color: "#555", fontFamily: "DM Sans, sans-serif", padding: "4px 16px 2px", fontStyle: "italic" },
  cashWarning: { marginTop: 10, background: "#f5a62311", border: "1px solid #f5a62333", color: "#f5a623", fontSize: 11, padding: "8px 12px", fontFamily: "DM Sans, sans-serif" },
  notifInfoBox: { background: "#111", border: "1px solid #1a1a1a", color: "#555", fontSize: 11, padding: "8px 12px", fontFamily: "DM Sans, sans-serif", marginBottom: 16 },
  reviewCard: { background: "#111", border: "1px solid #1a1a1a", padding: "12px 16px", marginBottom: 8 },
  reviewHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" },
  reviewArtist: { fontSize: 12, fontWeight: 700, color: "#fff" },
  reviewDate: { fontSize: 10, color: "#555", fontFamily: "DM Sans, sans-serif", marginLeft: "auto" },
  reviewComment: { fontSize: 12, color: "#888", fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 },
  disclaimerBox: { background: "#0f0f0f", border: "1px solid #ff3b3b44", padding: 18, marginTop: 12 },
  disclaimerTitle: { fontSize: 12, fontWeight: 700, color: "#ff3b3b", marginBottom: 10, letterSpacing: 1 },
  disclaimerText: { fontSize: 11, color: "#888", fontFamily: "DM Sans, sans-serif", lineHeight: 1.8 },
  dashHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 18, marginBottom: 20 },
  dashTitle: { fontSize: 32, fontWeight: 900, letterSpacing: 3, color: "#fff", textTransform: "uppercase", margin: "6px 0 3px" },
  dashStats: { display: "flex", gap: 10, flexWrap: "wrap" },
  dashStat: { background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "12px 16px", textAlign: "center", minWidth: 80 },
  dashStatNum: { fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: 2 },
  dashStatLabel: { fontSize: 9, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginTop: 3 },
  palierBox: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "14px 20px", marginBottom: 20, flexWrap: "wrap", gap: 10 },
  palierTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#fff", textTransform: "uppercase", marginBottom: 4 },
  palierDesc: { fontSize: 12, color: "#666", fontFamily: "DM Sans, sans-serif" },
  tabs: { display: "flex", marginBottom: 18, borderBottom: "1px solid #1a1a1a" },
  tab: { background: "none", border: "none", color: "#555", fontSize: 12, letterSpacing: 1, padding: "10px 18px", cursor: "pointer", textTransform: "uppercase", borderBottom: "2px solid transparent" },
  tabActive: { color: "#fff", borderBottom: "2px solid #ff3b3b" },
  dashCard: { background: "#0d0d0d", border: "1px solid #1a1a1a", padding: 24 },
  dashSection: { marginBottom: 28 },
  dashSectionTitle: { fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#fff", textTransform: "uppercase", marginBottom: 14 },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 },
  formGroup: { display: "flex", flexDirection: "column", gap: 7 },
  formLabel: { fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase" },
  toggleRow: { display: "flex", alignItems: "center", gap: 12, paddingTop: 8 },
  toggle: { width: 44, height: 24, background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, cursor: "pointer", position: "relative" },
  toggleOn: { background: "#ff3b3b22", borderColor: "#ff3b3b" },
  toggleDot: { position: "absolute", top: 3, left: 3, width: 16, height: 16, borderRadius: "50%", background: "#333", transition: "left 0.2s" },
  toggleDotOn: { left: 23, background: "#ff3b3b" },
  simBox: { background: "#111", border: "1px solid #1a1a1a", padding: "12px 16px", marginTop: 8 },
  simRow: { display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 12, color: "#666", fontFamily: "DM Sans, sans-serif" },
  tagGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  tagToggle: { background: "#111", border: "1px solid #222", color: "#555", padding: "6px 12px", fontSize: 11, letterSpacing: 1, cursor: "pointer" },
  tagToggleOn: { borderColor: "#ff3b3b", color: "#ff3b3b", background: "#ff3b3b11" },
  slotList: { display: "flex", flexDirection: "column", gap: 8 },
  slotListItem: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#111", border: "1px solid #1a1a1a", padding: "12px 16px" },
  slotStatus: { fontSize: 9, letterSpacing: 1, padding: "3px 8px", textTransform: "uppercase" },
  slotStatusOk: { background: "#00e5ff11", color: "#00e5ff" },
  slotStatusFull: { background: "#ff3b3b11", color: "#ff3b3b" },
  removeBtn: { background: "none", border: "1px solid #222", color: "#555", width: 26, height: 26, cursor: "pointer", fontSize: 11 },
  bookingCard: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#111", border: "1px solid #1a1a1a", padding: 18, marginBottom: 10, flexWrap: "wrap", gap: 12 },
  pendingBox: { background: "#ff3b3b08", border: "1px solid #ff3b3b33", padding: 20, marginBottom: 20 },
  pendingTitle: { fontSize: 13, fontWeight: 700, color: "#ff3b3b", letterSpacing: 1, marginBottom: 14 },
  pendingCard: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0f0f0f", border: "1px solid #222", padding: 16, marginBottom: 10, flexWrap: "wrap", gap: 12 },
  engStatusBadge: { fontSize: 12, padding: "4px 12px", letterSpacing: 1, fontFamily: "DM Sans, sans-serif" },
  engStatusFreelance: { background: "#f5a62311", color: "#f5a623", border: "1px solid #f5a62333" },
  engStatusStudio: { background: "#00e5ff11", color: "#00e5ff", border: "1px solid #00e5ff33" },
  switchStatusBtn: { background: "none", border: "1px solid #333", color: "#555", fontSize: 10, letterSpacing: 1, padding: "4px 10px", cursor: "pointer", textTransform: "uppercase" },
};
