import { useState, useEffect, useRef } from 'react'
import './App.css'

const base = import.meta.env.BASE_URL

const faqData = [
  { question: 'מהן שעות הפעילות?', answer: 'אנחנו פתוחים שבעה ימים בשבוע. בימי חול 06:00–22:00, בסופ"ש 08:00–18:00. ניתן לתאם אימונים מחוץ לשעות הפעילות עם מאמן אישי.' },
  { question: 'כמה זמן נמשך אימון?', answer: 'אימון אישי רגיל נמשך 60 דקות. אימונים מתקדמים או אימוני שיקום עשויים להימשך 75–90 דקות בהתאם לצרכים שלכם.' },
  { question: 'איך בוחרים מאמן?', answer: 'כל לקוח מקבל ייעוץ ראשוני חינם בו אנחנו מכירים אתכם, מבינים את המטרות, ומתאימים לכם את המאמן האישי המושלם מתוך צוות האליטה שלנו.' },
  { question: 'מה כוללים המתקנים?', answer: 'המתקן מצויד בציוד כושר מהמתקדם בעולם, חדרי שיקום, מקלחות, ממסעד ולאונג\' להמתנה. הכל בסביבה פרטית ומעוצבת.' },
  { question: 'האם יש לכם חניה?', answer: 'כן, יש חניה פרטית ללקוחות בחינם. בנוסף, אנחנו ממוקמים בסמוך לתחנות אוטובוס ורכבת.' },
  { question: 'אילו סוגי אימונים אתם מציעים?', answer: 'אנחנו מציעים אימון אישי, פיזיותרפיה, אימוני ספורט, תזונה, אימון כוח פונקציונלי, קרדיו, מדיטציה וניידות.' },
]

const reviews = [
  { name: 'מיכל רז', initial: 'מ', time: 'לפני 3 חודשים', text: 'אוירה נהדרת, ציוד חדיש והמאמנים פשוט מעולים. חמש כוכבים בלי ספק! השתפרתי יותר ב-3 חודשים מאשר בשנה בגפי.', color: null },
  { name: 'יוסי אברהם', initial: 'י', time: 'לפני 6 חודשים', text: 'הצוות המקצועי שלנו ביותר שפגשתי. תוצאות אמיתיות תוך חודשים ספורים. ממליץ בחום לכל מי שרוצה שינוי אמיתי.', color: '#7c3aed' },
  { name: 'שרה לוי', initial: 'ש', time: 'לפני שנה', text: 'רויאל פיטנס שינו לי את החיים. התחלתי אימונים עם ברנדון ואני מרוצה מאוד. מחכה לחזור לאימון הבא!', color: '#059669' },
]

const workouts = [
  {
    title: 'ירידה במשקל ועיצוב גוף',
    subtitle: 'שריפת שומן ממוקדת עם עיצוב מדויק של הגוף',
    description: 'תוכנית ירידה במשקל שמבוססת על שילוב מדעי בין אימוני התנגדות, אימוני HIIT ואימוני קרדיו מתונים. המטרה היא לא רק לרדת במשקל — אלא לשנות את הרכב הגוף, להוריד אחוזי שומן ולבנות שריר רזה.',
    benefits: [
      'תוכנית תזונה מותאמת אישית ע"י דיאטנית קלינית',
      'מעקב שבועי אחר אחוזי שומן, מסת שריר ומשקל',
      'שילוב אימוני HIIT לשריפת קלוריות מקסימלית',
      'אימוני התנגדות לשמירה על מסת שריר בזמן דיאטה',
      'ליווי מנטלי להתמודדות עם הרגלי אכילה',
    ],
    duration: '60 דקות',
    frequency: '3–5 פעמים בשבוע',
    level: 'כל הרמות',
  },
  {
    title: 'חיזוק שרירים ואימוני כוח',
    subtitle: 'בניית כוח מקסימלי והגדלת מסת שריר',
    description: 'אימוני כוח מתקדמים המבוססים על עקרונות של עומס פרוגרסיבי (Progressive Overload). התוכנית כוללת תרגילים מרכבים כמו סקוואט, מתח דד וספסל, לצד תרגילי בידוד ממוקדים לכל קבוצת שרירים.',
    benefits: [
      'תוכנית אימונים מחזורית (Periodization) להתקדמות מתמדת',
      'טכניקות מתקדמות: דרופ-סטים, סופר-סטים, Rest-Pause',
      'ניטור התקדמות עם מעקב אחר שיאים אישיים',
      'תזונה עשירה בחלבון ותזמון ארוחות אופטימלי',
      'מניעת פציעות באמצעות חימום ושחרור ממוקדים',
    ],
    duration: '60–75 דקות',
    frequency: '4–6 פעמים בשבוע',
    level: 'בינוני עד מתקדם',
  },
  {
    title: 'שיפור ביצועים ספורטיביים',
    subtitle: 'אימון ספציפי לספורטאים תחרותיים וחובבים',
    description: 'תוכנית אימון המותאמת לענף הספורט שלכם, עם דגש על שיפור מהירות, זריזות, כוח נפיצ, סיבולת וקואורדינציה. אנו עובדים עם ספורטאים מכל הרמות — מחובבים ועד מקצוענים.',
    benefits: [
      'אימוני פליומטריקס לפיתוח כוח נפיצ ומהירות',
      'תרגילי זריזות וקואורדינציה ספציפיים לענף',
      'אימוני סיבולת לב-ריאה עם מעקב דופק',
      'מניעת פציעות באמצעות חיזוק שרירי ליבה ויציבות',
      'ניתוח תנועה ביומכני לשיפור טכניקה',
    ],
    duration: '75–90 דקות',
    frequency: '3–5 פעמים בשבוע',
    level: 'בינוני עד מתקדם',
  },
  {
    title: 'פיזיותרפיה ושיקום פציעות',
    subtitle: 'חזרה לתפקוד מלא בליווי מקצועי',
    description: 'שיקום פציעות ספורט ופציעות יומיומיות בשילוב פיזיותרפיה מודרנית ואימון פונקציונלי. הצוות שלנו כולל פיזיותרפיסטים מוסמכים שעובדים בתיאום מלא עם המאמנים האישיים ליצירת תוכנית שיקום מותאמת.',
    benefits: [
      'הערכה אורתופדית מקיפה ואבחון מדויק',
      'טיפול ידני: מסאז\' רקמות עמוקות, מוביליזציה, שחרור מיופסיאלי',
      'תרגילי שיקום פרוגרסיביים — מחיזוק בסיסי ועד חזרה לספורט',
      'טיפול בכאבי גב, ברכיים, כתפיים וצוואר',
      'מניעת פציעות חוזרות באמצעות חיזוק ויציבות',
    ],
    duration: '45–60 דקות',
    frequency: '2–3 פעמים בשבוע',
    level: 'כל הרמות',
  },
  {
    title: 'תזונה ויעוץ תחזוקה',
    subtitle: 'תוכנית תזונה מדעית שמותאמת לאורח החיים שלכם',
    description: 'ייעוץ תזונתי מקיף ע"י דיאטנית קלינית, הכולל בניית תפריט מותאם אישית, חישוב קלוריות ומקרו-נוטריאנטים, והדרכה להרגלי אכילה בריאים לטווח ארוך. לא דיאטות קיצוניות — אלא שינוי אורח חיים.',
    benefits: [
      'חישוב מדויק של צריכת קלוריות יומית (TDEE)',
      'תפריט שבועי מותאם אישית עם מתכונים פשוטים',
      'הדרכה לתזמון ארוחות סביב אימונים',
      'ניהול תזונה לירידה/עלייה במשקל או תחזוקה',
      'מעקב שוטף והתאמות חודשיות לפי התקדמות',
    ],
    duration: 'פגישה של 45 דקות',
    frequency: 'פגישת מעקב כל 2–4 שבועות',
    level: 'כל הרמות',
  },
  {
    title: 'אימון כוח פונקציונלי',
    subtitle: 'חיזוק הגוף לתנועות של החיים האמיתיים',
    description: 'אימון כוח פונקציונלי מתמקד בתנועות מורכבות שמחקות פעולות יומיומיות — הרמה, דחיפה, משיכה, סיבוב ויציבות. המטרה היא לבנות גוף חזק, גמיש ועמיד שמתפקד טוב בחיי היומיום ולא רק נראה טוב.',
    benefits: [
      'תרגילים עם משקל גוף, קטלבלס, TRX וכדורי כוח',
      'שיפור יציבות, שיווי משקל וקואורדינציה',
      'חיזוק שרירי ליבה (Core) עמוקים',
      'שיפור טווח תנועה וגמישות',
      'מניעת כאבי גב ופציעות יומיומיות',
    ],
    duration: '60 דקות',
    frequency: '3–4 פעמים בשבוע',
    level: 'כל הרמות',
  },
]

const instaImages = [
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', alt: 'gym' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', alt: 'training' },
  { src: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=600&q=80', alt: 'fitness' },
  { src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80', alt: 'workout' },
]

function App() {
  const [openFaq, setOpenFaq] = useState(0)
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.1 })

    revealRefs.current.forEach(el => {
      if (el) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(20px)'
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setActiveWorkout(null) }
    if (activeWorkout !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [activeWorkout])

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index)
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="תפריט">
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>אימון אישי</a></li>
          <li><a href="#edge" onClick={() => setMenuOpen(false)}>היתרון שלנו</a></li>
          <li><a href="#transform" onClick={() => setMenuOpen(false)}>תוצאות</a></li>
          <li><a href="#reviews" onClick={() => setMenuOpen(false)}>לקוחות</a></li>
          <li><a href="#instagram" onClick={() => setMenuOpen(false)}>אינסטגרם</a></li>
          <li><a href="#faq" onClick={() => setMenuOpen(false)}>שאלות</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>אודות</a></li>
          <li><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>ייעוץ חינם</a></li>
        </ul>
        <a className="nav-logo" href="#">RF</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={`${base}mixkit-52111-video-52111-hd-ready.mp4`} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-eyebrow">מספר 1 באימון אישי בישראל</p>
          <h1 className="hero-title">
            רויאל
            <span>פיטנס</span>
          </h1>
          <p className="hero-sub">אימון אישי ברמה עולמית. מאמנים מקצועיים שמביאים תוצאות אמיתיות — בהתאמה אישית מלאה.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">הצטרפו עכשיו</a>
            <a href="#about" className="btn-ghost">גלו עוד</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">40+</div>
            <div className="stat-label">מאמנים מובילים</div>
          </div>
          <div className="stat">
            <div className="stat-num">4.9★</div>
            <div className="stat-label">דירוג Google</div>
          </div>
          <div className="stat">
            <div className="stat-num">2K+</div>
            <div className="stat-label">לקוחות מרוצים</div>
          </div>
        </div>
      </section>

      {/* ABOUT / VIDEO */}
      <section className="about" id="about">
        <div className="about-text">
          <p className="section-label">אימון אישי בישראל</p>
          <h2 className="about-title">לא רק אימון —<br /><em>שינוי אמיתי</em></h2>
          <p className="about-body">
            לא משנה מה המטרות שלכם, רויאל פיטנס מלווה אתכם בכל צעד בדרך. יחד, נשבור מחסומים, נחשוף את הפוטנציאל האמיתי שלכם וניקח אתכם למקומות חדשים שלא חשבתם שאפשריים.<br /><br />
            באמצעות מדע, ניסיון והמאמנים הישראליים ברמה עולמית שלנו, נעזור לכם לשבור שיאים אישיים ולהשיג את הגוף שתמיד חלמתם עליו.
          </p>
          <a href="#contact" className="btn-primary">קבעו ייעוץ חינם</a>
        </div>
        <div className="about-media">
          <div className="video-wrapper">
            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80" alt="Royal Fitness Training" />
            <div className="play-btn">
              <div className="play-circle">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDGE / FEATURES */}
      <section className="edge" id="edge">
        <div className="edge-image">
          <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80" alt="Training at Royal Fitness" />
        </div>
        <div className="edge-content">
          <p className="section-label">היתרון שלנו</p>
          <h2 className="section-title">מגדירים מחדש<br />את הכושר</h2>
          <p className="edge-subtitle">אימון אישי בלעדי, מונע תוצאות, ברמה עולמית.</p>
          <p className="edge-body">
            אנחנו המתקן הפרטי מספר 1 בישראל המציע אימון אישי אחד-על-אחד עם המאמנים האישיים המובילים בארץ. במתקן המתקדם שלנו, אנו גאים בגישה מקיפה לכושר, המותאמת למגוון רחב של מטרות וצרכים.
          </p>
          <ul className="features-list">
            {workouts.map((w, i) => (
              <li key={i} onClick={() => setActiveWorkout(i)} className="feature-clickable">
                {w.title}
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary">התחילו היום</a>
        </div>
      </section>

      {/* TRANSFORM / BEFORE-AFTER */}
      <section className="transform" id="transform">
        <div className="transform-text">
          <p className="section-label">תוצאות אמיתיות</p>
          <h2 className="transform-title">שנו את<br />החיים שלכם</h2>
          <p className="transform-body">
            יותר מסתם אימון, רויאל פיטנס מציעה גם אימונים אישיים וגם פיזיותרפיה. אנו מתמקדים ביצירת תוכנית אימון מלאה, מהנה ותחרותית ביותר לשיפור הגוף, הנפש והנשמה.<br /><br />
            צוות האליטה שלנו מוביל מעל 40 מהמאמנים האישיים הטובים ביותר בישראל, כל אחד מביא רקע וממחיות שונים לשולחן.
          </p>
          <a href="#contact" className="btn-primary">בקשו ייעוץ חינם</a>
        </div>
        <div className="transform-media">
          <div className="before-after">
            <div className="ba-img">
              <img src={`${base}beofre.jpg`} alt="before" />
              <span className="ba-label">לפני</span>
            </div>
            <div className="ba-img">
              <img src={`${base}AFTER.jpg`} alt="after" style={{ filter: 'grayscale(0%)' }} />
              <span className="ba-label after">אחרי</span>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews" id="reviews">
        <div className="reviews-header">
          <p className="section-label" style={{ textAlign: 'center' }}>מה הלקוחות שלנו אומרים</p>
          <h2 className="section-title">הביקורות שלנו</h2>
          <div className="stars">★★★★★</div>
          <p className="reviews-meta">4.9 כוכבים מתוך 271 ביקורות · Google</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <div className="review-card" key={i} ref={addRevealRef}>
              <div className="reviewer">
                <div className="reviewer-avatar" style={review.color ? { background: review.color } : undefined}>
                  {review.initial}
                </div>
                <div>
                  <div className="reviewer-name">{review.name}</div>
                  <div className="reviewer-time">{review.time}</div>
                </div>
              </div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="instagram" id="instagram">
        <div className="insta-header">
          <p className="section-label" style={{ textAlign: 'center' }}>חוו את התרבות של רויאל פיטנס</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>אימונים כל היום וכל הלילה</h2>
        </div>
        <div className="insta-grid">
          {instaImages.map((img, i) => (
            <div className="insta-item" key={i} ref={addRevealRef}>
              <img src={img.src} alt={img.alt} />
              <div className="insta-overlay"></div>
            </div>
          ))}
        </div>
        <div className="insta-actions">
          <a href="#" className="btn-ghost" style={{ fontSize: '13px', letterSpacing: '1.5px' }}>עקבו באינסטגרם</a>
          <a href="#" className="btn-primary">טען עוד</a>
        </div>
      </section>

      {/* FAQ */}
      <div className="faq-wrapper" id="faq">
        <div className="faq-header">
          <p className="section-label" style={{ textAlign: 'center' }}>יש לכם שאלות?</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>שאלות נפוצות</h2>
        </div>
        <div className="faq">
          {faqData.map((item, i) => (
            <div
              className={`faq-item${openFaq === i ? ' open' : ''}`}
              key={i}
              ref={addRevealRef}
              onClick={() => toggleFaq(i)}
            >
              <div className="faq-question">
                {item.question}
                <div className="faq-icon">+</div>
              </div>
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CTA */}
      <section className="footer-cta" id="contact">
        <div className="footer-tagline">
          <span className="tagline-item">הגוף <span>שלכם.</span></span>
          <span className="tagline-item">המשימה <span>שלנו.</span></span>
          <span className="tagline-item">החיים <span>שלכם.</span></span>
        </div>
        <p style={{ fontSize: '13px', color: '#888', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }}>הגישו בקשה להצטרפות</p>
        <div className="footer-form">
          <div className="form-row">
            <input className="form-field" type="text" placeholder="שם פרטי *" />
            <input className="form-field" type="text" placeholder="שם משפחה *" />
          </div>
          <input className="form-field" type="tel" placeholder="טלפון *" />
          <input className="form-field" type="email" placeholder='דוא"ל *' />
          <button className="form-submit">שלחו בקשה</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <span className="footer-logo">רויאל פיטנס</span>
        <span className="footer-copy">© 2024 רויאל פיטנס. כל הזכויות שמורות.</span>
        <div className="footer-socials">
          <a href="#" className="social-link">f</a>
          <a href="#" className="social-link">in</a>
          <a href="#" className="social-link">tt</a>
          <a href="#" className="social-link">✦</a>
        </div>
      </footer>

      {/* WORKOUT MODAL */}
      {activeWorkout !== null && (
        <div className="modal-overlay" onClick={() => setActiveWorkout(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveWorkout(null)}>✕</button>
            <p className="modal-label">{workouts[activeWorkout].level}</p>
            <h2 className="modal-title">{workouts[activeWorkout].title}</h2>
            <p className="modal-subtitle">{workouts[activeWorkout].subtitle}</p>
            <p className="modal-description">{workouts[activeWorkout].description}</p>
            <div className="modal-meta">
              <div className="modal-meta-item">
                <span className="modal-meta-label">משך אימון</span>
                <span className="modal-meta-value">{workouts[activeWorkout].duration}</span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">תדירות</span>
                <span className="modal-meta-value">{workouts[activeWorkout].frequency}</span>
              </div>
            </div>
            <h3 className="modal-benefits-title">מה כולל האימון</h3>
            <ul className="modal-benefits">
              {workouts[activeWorkout].benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <a href="#contact" className="btn-primary modal-cta" onClick={() => setActiveWorkout(null)}>קבעו ייעוץ חינם</a>
          </div>
        </div>
      )}
    </>
  )
}

export default App
