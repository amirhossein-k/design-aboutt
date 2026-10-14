import { useState, useEffect, useRef } from "react";

/* ─────────────────────────── COUNT-UP HOOK ─────────────────────────── */
function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

/* ─────────────────────────── STAT CARD ─────────────────────────── */
function StatCard({
  icon,
  value,
  suffix,
  label,
  started,
}: {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1800, started);
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.09)",
        borderRadius: "18px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        border: "1.5px solid rgba(167,139,250,0.25)",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.15)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(167,139,250,0.5)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.09)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(167,139,250,0.25)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>{icon}</div>
      <div
        style={{
          color: "white",
          fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
          fontWeight: "800",
          lineHeight: 1,
          marginBottom: "0.4rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count.toLocaleString("fa-IR")}
        <span style={{ color: "#a78bfa" }}>{suffix}</span>
      </div>
      <div style={{ color: "#c4b5fd", fontSize: "0.88rem" }}>{label}</div>
    </div>
  );
}

/* ─────────────────────────── VALUE CARD ─────────────────────────── */
function ValueCard({
  emoji,
  title,
  description,
  gradient,
}: {
  emoji: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "2rem 1.75rem",
        border: "1.5px solid #ede9fe",
        boxShadow: "0 4px 20px rgba(30,27,75,0.06)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 16px 40px rgba(124,58,237,0.15)";
        el.style.borderColor = "#a78bfa";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 20px rgba(30,27,75,0.06)";
        el.style.borderColor = "#ede9fe";
      }}
    >
      {/* decorative blob */}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: "-30px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: gradient,
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "16px",
          background: gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          marginBottom: "1.25rem",
          boxShadow: "0 6px 18px rgba(124,58,237,0.25)",
        }}
      >
        {emoji}
      </div>
      <h3
        style={{
          fontSize: "1.05rem",
          fontWeight: "700",
          color: "#1e1b4b",
          margin: "0 0 0.75rem",
        }}
      >
        {title}
      </h3>
      <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.85", margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

/* ─────────────────────────── TIMELINE ITEM ─────────────────────────── */
function TimelineItem({
  year,
  title,
  description,
  isLast,
}: {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: "1.75rem" }}>
      {/* Left column: dot + line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#4c1d95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "800",
            fontSize: "0.78rem",
            boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
            border: "3px solid #ede9fe",
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          {year}
        </div>
        {!isLast && (
          <div
            style={{
              width: "2.5px",
              flex: 1,
              background: "linear-gradient(180deg,#7c3aed,#c4b5fd)",
              margin: "8px 0",
              minHeight: "44px",
              borderRadius: "2px",
            }}
          />
        )}
      </div>
      {/* Right column: content */}
      <div
        style={{
          paddingBottom: isLast ? "0" : "2.5rem",
          paddingTop: "10px",
        }}
      >
        <h3
          style={{
            fontSize: "1.05rem",
            fontWeight: "700",
            color: "#1e1b4b",
            margin: "0 0 0.5rem",
          }}
        >
          {title}
        </h3>
        <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: "1.85", margin: 0 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────── TEAM MEMBER ─────────────────────────── */
function TeamMember({
  emoji,
  name,
  role,
  bio,
  color,
}: {
  emoji: string;
  name: string;
  role: string;
  bio: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        border: "1.5px solid #ede9fe",
        boxShadow: "0 4px 20px rgba(30,27,75,0.06)",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-5px)";
        el.style.boxShadow = "0 14px 36px rgba(124,58,237,0.14)";
        el.style.borderColor = "#a78bfa";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 20px rgba(30,27,75,0.06)";
        el.style.borderColor = "#ede9fe";
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          margin: "0 auto 1.1rem",
          boxShadow: `0 6px 20px ${color}40`,
          border: "3px solid white",
        }}
      >
        {emoji}
      </div>
      <h3
        style={{
          color: "#1e1b4b",
          fontSize: "1rem",
          fontWeight: "700",
          margin: "0 0 0.25rem",
        }}
      >
        {name}
      </h3>
      <p
        style={{
          color: "#7c3aed",
          fontSize: "0.78rem",
          fontWeight: "600",
          margin: "0 0 0.75rem",
        }}
      >
        {role}
      </p>
      <p style={{ color: "#9ca3af", fontSize: "0.8rem", lineHeight: "1.75", margin: 0 }}>
        {bio}
      </p>
    </div>
  );
}

/* ══════════════════════════ MAIN APP ═══════════════════════════ */

export default function App() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
      4500,
    );
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: "🛍️", value: 50000, suffix: "+", label: "سفارش موفق" },
    { icon: "😊", value: 12000, suffix: "+", label: "مشتری وفادار" },
    { icon: "📦", value: 3500, suffix: "+", label: "محصول فعال" },
    { icon: "🏙️", value: 450, suffix: "+", label: "شهر پوشش داده‌شده" },
  ];

  const values = [
    {
      emoji: "💎",
      title: "کیفیت بدون تعارض",
      description:
        "تنها محصولات اصل و باکیفیت را از تأمین‌کنندگان معتبر عرضه می‌کنیم. هر کالا قبل از ارسال بازرسی دقیق کیفیت می‌شود.",
      gradient: "linear-gradient(135deg,#ede9fe,#c4b5fd)",
    },
    {
      emoji: "🚀",
      title: "ارسال سریع",
      description:
        "با داشتن شبکه‌ای از شرکای ارسال معتبر، بسته شما را سریع و مطمئن به دستتان می‌رسانیم — در سراسر ایران.",
      gradient: "linear-gradient(135deg,#dbeafe,#93c5fd)",
    },
    {
      emoji: "❤️",
      title: "رضایت مشتری",
      description:
        "خوشحالی شما اولویت اول ماست. پشتیبانی ۲۴ ساعته، مرجوعی آسان و تجربه خریدی که هر بار سطح بالاتری را انتظار داشته باشید.",
      gradient: "linear-gradient(135deg,#fce7f3,#fbcfe8)",
    },
    {
      emoji: "🔒",
      title: "امنیت و اعتماد",
      description:
        "پرداخت امن با SSL، اطلاعات محرمانه، و تضمین بازگشت وجه. خریدی بی‌دغدغه که بتوان به آن اعتماد کرد.",
      gradient: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
    },
    {
      emoji: "💡",
      title: "نوآوری مستمر",
      description:
        "دائماً به دنبال راه‌های بهتر هستیم. از رابط کاربری تا سیستم لجستیک، تمام جزئیات بهبود می‌یابند تا تجربه‌ای بهینه ارائه کنیم.",
      gradient: "linear-gradient(135deg,#fef9c3,#fde68a)",
    },
    {
      emoji: "🤝",
      title: "احترام بین‌المللی",
      description:
        "به تنوع مشتریان احترام می‌گذاریم و سیاست‌های قابل‌اطمینان و منصفانه‌ای برای همه طراحی کرده‌ایم.",
      gradient: "linear-gradient(135deg,#e0e7ff,#a5b4fc)",
    },
  ];

  const timeline = [
    {
      year: "۱۳۹۸",
      title: "تولد مارلو شاپ",
      description:
        "مارلو شاپ با یک هدف ساده استارت خورد: خرید آنلاین باید آسان، سریع و مطمئن باشد. از یک تیم کوچک و یک اتاق کار شروع کردیم.",
    },
    {
      year: "۱۳۹۹",
      title: "توسعه اولیه",
      description:
        "اولین انبار خود را راه‌اندازی کردیم و دسته‌های محصولی را از ۳ به ۱۲ دسته مختلف گسترش دادیم. برنامه وفاداری را آغاز کردیم.",
    },
    {
      year: "۱۴۰۰",
      title: "ارسال سراسری",
      description:
        "با راه‌اندازی شبکه ارسال سراسری، بتوانیم به تمام شهرهای ایران خدمات ارائه دهیم. رضایت مشتریان به معنای واقعی کلمه پاداش تلاش ما بود.",
    },
    {
      year: "۱۴۰۱",
      title: "تیم متخصص",
      description:
        "تیم ما به ۳۰ نفر افزایش یافت. واحدهای تخصصی پشتیبانی، طراحی رابط کاربری و فناوری تشکیل شد تا تجربه‌ای بهتر بسازیم.",
    },
    {
      year: "۱۴۰۲",
      title: "رشد انفجاری",
      description:
        "مشتریان وفادار مارلو شاپ از ۵ هزار نفر عبور کردند. رابط کاربری کاملاً جدید را با طراحی مدرن راه‌اندازی کردیم.",
    },
    {
      year: "۱۴۰۳",
      title: "امروز و فردا",
      description:
        "امروز با افتخار بهترین محصولات را به شما ارائه می‌کنیم. هدف ما این است که مارلو شاپ را به مکانی تبدیل کنیم که همیشه در آنجا باشید.",
    },
  ];

  const team = [
    {
      emoji: "👩‍💻",
      name: "سارا محمدی",
      role: "مدیر محصول",
      bio: "با بیش از ۷ سال تجربه در تجارت الکترونیک، تیم محصول را هدایت می‌کند.",
      color: "#ede9fe",
    },
    {
      emoji: "👨‍💼",
      name: "رضا کریمی",
      role: "مدیر فنی",
      bio: "مسئولیت سکوی فروشگاه و بهبود تجربه کاربری را بر عهده دارد.",
      color: "#dbeafe",
    },
    {
      emoji: "🙋‍♀️",
      name: "نازنین عزیزی",
      role: "سرپرست پشتیبانی",
      bio: "پاسخگویی به سؤالات شما را با انگیزه و لبخند انجام می‌دهد.",
      color: "#fce7f3",
    },
    {
      emoji: "🧑‍🎨",
      name: "امیر حسینی",
      role: "سرپرست طراحی",
      bio: "تجربه‌ای مدرن و لذت‌بخش برای مشتریان مارلو شاپ طراحی می‌کند.",
      color: "#d1fae5",
    },
  ];

  const testimonials = [
    {
      text: "واقعاً از خریدم لذت بردم! ارسال فوق‌العاده سریع بود و بسته‌بندی هم خیلی تمیز و حرفه‌ای بود. تطابق محصول با تصویر هم عالی بود.",
      name: "محسن ر.",
      city: "تهران",
      stars: 5,
      emoji: "👏",
      color: "#ede9fe",
    },
    {
      text: "یکی از بدترین تجربه‌های خرید آنلاینم رو داشتم، اما تیم پشتیبانی مارلو شاپ به سرعت مشکل را برطرف کرد و بازگشت وجه هم منصفانه انجام شد.",
      name: "الهه ک.",
      city: "اصفهان",
      stars: 4,
      emoji: "🤝",
      color: "#dbeafe",
    },
    {
      text: "چند ماهه که از مارلو شاپ خرید می‌کنم و هر بار تجربه بهتری داشتم. پیشنهاد ویژه‌ها و اطلاع‌رسانی‌ها هم خوب طراحی شده. پیشنهاد می‌کنم!",
      name: "وحید ت.",
      city: "شیراز",
      stars: 5,
      emoji: "⭐",
      color: "#fce7f3",
    },
    {
      text: "معمولاً نگران اصالت کالا بودم اما تمام محصولات مارلو شاپ اصیل و باکیفیت بود. اتکا به گارانتی آن‌ها هم بسیار آسان و شفاف بود.",
      name: "فرناز م.",
      city: "مشهد",
      stars: 5,
      emoji: "💎",
      color: "#d1fae5",
    },
  ];

  const milestones = [
    { label: "روزهای کاری", value: "۱۴۰۰+" },
    { label: "تأمین‌کننده معتبر", value: "۸۰+" },
    { label: "دسته محصول", value: "۲۵+" },
    { label: "پرسنل", value: "۳۰ نفر" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Vazirmatn', sans-serif",
        direction: "rtl",
        background: "#faf9ff",
        minHeight: "100vh",
      }}
    >
      {/* ══════════ HEADER ══════════ */}
      <header
        style={{
          background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 55%,#4c1d95 100%)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 4px 20px rgba(30,27,75,0.35)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0.85rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                borderRadius: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                boxShadow: "0 4px 12px rgba(124,58,237,0.45)",
              }}
            >
              🛍️
            </div>
            <div>
              <div style={{ color: "white", fontSize: "1.1rem", fontWeight: "700" }}>
                مارلو شاپ
              </div>
              <div style={{ color: "#c4b5fd", fontSize: "0.71rem" }}>فروشگاه اینترنتی</div>
            </div>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
            {[
              { label: "صفحه اصلی", href: "https://marloo.shop" },
              { label: "محصولات", href: "https://marloo.shop/products" },
              { label: "قوانین", href: "#" },
              { label: "سوالات متداول", href: "#" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  color: "#c4b5fd",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "7px",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://marloo.shop/products"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                color: "white",
                fontSize: "0.82rem",
                fontWeight: "600",
                textDecoration: "none",
                padding: "0.45rem 1.1rem",
                borderRadius: "7px",
                boxShadow: "0 2px 8px rgba(124,58,237,0.4)",
              }}
            >
              🛒 خرید
            </a>
          </nav>
        </div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section
        style={{
          position: "relative",
          height: "520px",
          overflow: "hidden",
        }}
      >
        {/* Background image with overlay */}
        <img
          src="/images/about-hero.jpg"
          alt="مارلو شاپ"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(30,27,75,0.88) 0%, rgba(49,46,129,0.75) 50%, rgba(76,29,149,0.65) 100%)",
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(167,139,250,0.2)",
              border: "1px solid rgba(167,139,250,0.4)",
              borderRadius: "100px",
              padding: "0.35rem 1.2rem",
              marginBottom: "1.5rem",
              backdropFilter: "blur(4px)",
            }}
          >
            <span style={{ fontSize: "0.95rem" }}>👋</span>
            <span style={{ color: "#c4b5fd", fontSize: "0.82rem", fontWeight: "500" }}>
              خوشحالیم که با ما همراه هستید
            </span>
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: "900",
              margin: "0 0 1.25rem",
              lineHeight: 1.3,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            داستان مارلو شاپ
          </h1>

          <p
            style={{
              color: "#e0e7ff",
              fontSize: "clamp(0.95rem,2vw,1.1rem)",
              lineHeight: 2,
              maxWidth: "560px",
              margin: "0 auto 2.25rem",
              textShadow: "0 1px 6px rgba(0,0,0,0.2)",
            }}
          >
            کار ما از جایی شروع شد که فهمیدیم خرید آنلاین نیاز به تجربه‌ای دارد که ترکیب آن سادگی، امنیت و لذت باشد.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="https://marloo.shop/products"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                color: "white",
                padding: "0.85rem 2.25rem",
                borderRadius: "11px",
                fontSize: "0.95rem",
                fontWeight: "700",
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(124,58,237,0.45)",
              }}
            >
              🛒 دیدن محصولات
            </a>
            <a
              href="#story"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "white",
                padding: "0.85rem 2.25rem",
                borderRadius: "11px",
                fontSize: "0.95rem",
                fontWeight: "600",
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              بیشتر بدانی
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ MISSION STRIP ══════════ */}
      <section
        style={{
          background: "linear-gradient(135deg,#ede9fe,#ddd6fe)",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#4c1d95",
            fontSize: "clamp(1rem,2vw,1.15rem)",
            fontWeight: "600",
            lineHeight: 2,
            margin: 0,
            maxWidth: "700px",
          }}
        >
          ✨ مأموریت ما: «کیفیت عالی + قیمت واقعی + تجربه‌ای که دوست داشته باشید» ✨
        </p>
      </section>

      {/* ══════════ STORY SECTION ══════════ */}
      <section id="story" style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/* Text */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#ede9fe",
                borderRadius: "100px",
                padding: "0.3rem 1rem",
                marginBottom: "1.4rem",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>📖</span>
              <span style={{ color: "#7c3aed", fontSize: "0.8rem", fontWeight: "700" }}>
                داستان ما
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.4rem,3vw,2rem)",
                fontWeight: "800",
                color: "#1e1b4b",
                margin: "0 0 1.5rem",
                lineHeight: 1.4,
              }}
            >
              راهی که طی کردیم تا بتوانیم تجربه خرید بهتری را بسازیم
            </h2>
            <p
              style={{
                color: "#6b7280",
                lineHeight: 2.1,
                fontSize: "0.935rem",
                margin: "0 0 1rem",
              }}
            >
              مارلو شاپ در سال ۱۳۹۸ با یک سؤال شروع شد: چرا خرید اینترنتی پیچیده و پر
              استرس است؟ ما فهمیدیم مشتریان امروز بیشتر از هر چیزی به اعتماد و سادگی
              نیاز دارند. از همین رو مارلو شاپ را با هدف تبدیل خرید آنلاین به یک
              تجربه دلپذیر راه‌اندازی کردیم.
            </p>
            <p
              style={{
                color: "#6b7280",
                lineHeight: 2.1,
                fontSize: "0.935rem",
                margin: "0 0 1rem",
              }}
            >
              ابتدا تیمی کوچک داشتیم و به چند دسته‌بندی محدود شدیم، اما با گوش دادن
              به بازخورد مشتریان، سرعت ارسال را بالا بردیم، پشتیبانی بهتر راه‌اندازی
              کردیم و هر روز به دنبال ارائه بهتر بودیم.
            </p>
            <p
              style={{
                color: "#6b7280",
                lineHeight: 2.1,
                fontSize: "0.935rem",
                margin: 0,
              }}
            >
              امروز مارلو شاپ با افتخار هزاران مشتری را با بهترین محصولات و تجربه خریدی
              ممتاز همراه می‌کند — و این هنوز شروع راه است.
            </p>

            {/* Milestones inline */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              {milestones.map((m) => (
                <div key={m.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      color: "#7c3aed",
                      fontSize: "1.25rem",
                      fontWeight: "800",
                      lineHeight: 1,
                      marginBottom: "3px",
                    }}
                  >
                    {m.value}
                  </div>
                  <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src="/images/about-team.jpg"
              alt="تیم مارلو شاپ"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                borderRadius: "24px",
                boxShadow: "0 20px 60px rgba(30,27,75,0.2)",
              }}
            />
            {/* Badge overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "2rem",
                background: "linear-gradient(135deg,#7c3aed,#4c1d95)",
                color: "white",
                padding: "1.1rem 1.5rem",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#c4b5fd" }}>از سال</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "800", lineHeight: 1 }}>۱۳۹۸</div>
              <div style={{ fontSize: "0.72rem", color: "#c4b5fd" }}>محصول فعال: ۳۵۰۰+</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section
        ref={statsRef}
        style={{
          background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4c1d95 100%)",
          padding: "4.5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(167,139,250,0.15)",
                border: "1px solid rgba(167,139,250,0.3)",
                borderRadius: "100px",
                padding: "0.35rem 1.25rem",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>📊</span>
              <span style={{ color: "#c4b5fd", fontSize: "0.82rem", fontWeight: "500" }}>
                آمار و سفر ما
              </span>
            </div>
            <h2
              style={{
                color: "white",
                fontSize: "clamp(1.5rem,3.5vw,2.2rem)",
                fontWeight: "800",
                margin: "0 0 0.75rem",
              }}
            >
              به اعداد نگاهی بیندازید
            </h2>
            <p style={{ color: "#c4b5fd", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>
              ما رشد علاقه را به مسیر شایسته دوستندن اشتراک‌گذاری شده
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: "1.25rem",
            }}
          >
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                started={statsVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CORE VALUES ══════════ */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#ede9fe",
              borderRadius: "100px",
              padding: "0.3rem 1rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>💫</span>
            <span style={{ color: "#7c3aed", fontSize: "0.8rem", fontWeight: "700" }}>
              ارزش‌های ما
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.5rem,3.5vw,2.2rem)",
              fontWeight: "800",
              color: "#1e1b4b",
              margin: "0 0 0.75rem",
            }}
          >
            چه چیزی مارلو شاپ را متفاوت می‌کند؟
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            ما در هر تصمیمی دقیقاً به این ارزش‌ها وفاداریم — از انتخاب محصول تا نحوه ارتباط با شما
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
            gap: "1.5rem",
          }}
        >
          {values.map((v) => (
            <ValueCard key={v.title} {...v} />
          ))}
        </div>
      </section>

      {/* ══════════ TIMELINE + PHOTO ══════════ */}
      <section
        style={{
          background: "linear-gradient(180deg,#f5f3ff 0%,#faf9ff 100%)",
          padding: "5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "start",
            }}
            className="timeline-grid"
          >
            {/* Timeline */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "#ede9fe",
                  borderRadius: "100px",
                  padding: "0.3rem 1rem",
                  marginBottom: "2.5rem",
                }}
              >
                <span style={{ fontSize: "0.9rem" }}>🗓</span>
                <span style={{ color: "#7c3aed", fontSize: "0.8rem", fontWeight: "700" }}>
                  مسیر ما
                </span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.4rem,3vw,1.9rem)",
                  fontWeight: "800",
                  color: "#1e1b4b",
                  margin: "0 0 2.5rem",
                  lineHeight: 1.4,
                }}
              >
                از شروع تا امروز
              </h2>
              {timeline.map((item, i) => (
                <TimelineItem
                  key={item.year}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  isLast={i === timeline.length - 1}
                />
              ))}
            </div>

            {/* Right column: about-products image */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <img
                src="/images/about-products.jpg"
                alt="محصولات مارلو شاپ"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "24px",
                  boxShadow: "0 12px 40px rgba(30,27,75,0.15)",
                }}
              />
              {/* Ethics / quality badge */}
              <div
                style={{
                  background: "white",
                  borderRadius: "18px",
                  padding: "1.75rem",
                  border: "1.5px solid #ede9fe",
                  boxShadow: "0 6px 24px rgba(30,27,75,0.07)",
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>🏆</div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "#1e1b4b",
                    margin: "0 0 0.6rem",
                  }}
                >
                  ضمانت اصالت
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.8", margin: 0 }}>
                  تمام محصولات ما دارای ضمانت اصالت هستند. اگر کالای تقلبی دریافت کردید،
                  وجه شما کامل و بدون قید و شرط بازگردانده می‌شود.
                </p>
              </div>
              <img
                src="/images/about-service.jpg"
                alt="تیم بکنویی مارلو شاپ"
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  borderRadius: "24px",
                  boxShadow: "0 12px 40px rgba(30,27,75,0.15)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TEAM ══════════ */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#ede9fe",
              borderRadius: "100px",
              padding: "0.3rem 1rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>👥</span>
            <span style={{ color: "#7c3aed", fontSize: "0.8rem", fontWeight: "700" }}>
              تیم ما
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.5rem,3.5vw,2.2rem)",
              fontWeight: "800",
              color: "#1e1b4b",
              margin: "0 0 0.75rem",
            }}
          >
            افرادی که مارلو شاپ را می‌سازند
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            تیم کوچک ما با اشتیاقی بزرگ هر روز تلاش می‌کند تا بهتر باشد
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
            gap: "1.5rem",
          }}
        >
          {team.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section
        style={{
          background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 0%,#4c1d95 100%)",
          padding: "5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(167,139,250,0.15)",
                border: "1px solid rgba(167,139,250,0.3)",
                borderRadius: "100px",
                padding: "0.35rem 1.25rem",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>💬</span>
              <span style={{ color: "#c4b5fd", fontSize: "0.82rem", fontWeight: "500" }}>
                نظرات مشتریان
              </span>
            </div>
            <h2
              style={{
                color: "white",
                fontSize: "clamp(1.5rem,3vw,2rem)",
                fontWeight: "800",
                margin: "0 0 0.5rem",
              }}
            >
              چه می‌گویند درباره ما؟
            </h2>
          </div>

          {/* Carousel */}
          <div
            style={{
              position: "relative",
              minHeight: "260px",
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  position: i === activeTestimonial ? "relative" : "absolute",
                  inset: 0,
                  opacity: i === activeTestimonial ? 1 : 0,
                  transform:
                    i === activeTestimonial
                      ? "translateY(0)"
                      : "translateY(16px)",
                  transition: "all 0.55s cubic-bezier(0.4,0,0.2,1)",
                  pointerEvents: i === activeTestimonial ? "auto" : "none",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.09)",
                    borderRadius: "24px",
                    padding: "2.5rem",
                    border: "1.5px solid rgba(167,139,250,0.25)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1rem" }}>
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <span key={s} style={{ color: "#fbbf24", fontSize: "1.1rem" }}>
                        ★
                      </span>
                    ))}
                    {Array.from({ length: 5 - t.stars }).map((_, s) => (
                      <span key={s} style={{ color: "#4c1d95", fontSize: "1.1rem" }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote
                    style={{
                      color: "#e0e7ff",
                      fontSize: "1rem",
                      lineHeight: 2.1,
                      margin: "0 0 1.75rem",
                      fontStyle: "normal",
                    }}
                  >
                    "{t.text}"
                  </blockquote>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: t.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      {t.emoji}
                    </div>
                    <div>
                      <div
                        style={{
                          color: "white",
                          fontWeight: "700",
                          fontSize: "0.95rem",
                        }}
                      >
                        {t.name}
                      </div>
                      <div style={{ color: "#a78bfa", fontSize: "0.8rem" }}>{t.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1.75rem",
            }}
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: i === activeTestimonial ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  background:
                    i === activeTestimonial
                      ? "#a78bfa"
                      : "rgba(167,139,250,0.35)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "5.5rem 2rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg,#ede9fe,#ddd6fe)",
            borderRadius: "28px",
            padding: "4rem 3rem",
            textAlign: "center",
            border: "1.5px solid #c4b5fd",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* decorative blobs */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "rgba(124,58,237,0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "-40px",
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              background: "rgba(167,139,250,0.12)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "3rem", marginBottom: "1.25rem" }}>🎁</div>
            <h2
              style={{
                fontSize: "clamp(1.4rem,3vw,2rem)",
                fontWeight: "800",
                color: "#1e1b4b",
                margin: "0 0 1rem",
              }}
            >
              وارد جمع مارلو شاپ شوید
            </h2>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.95rem",
                lineHeight: 1.9,
                maxWidth: "480px",
                margin: "0 auto 2rem",
              }}
            >
              هزاران محصول با کیفیت، ارسال سریع و پشتیبانی عالی در انتظار شماست.
              خریدت رو همین حالا شروع کن!
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://marloo.shop/products"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#4c1d95)",
                  color: "white",
                  padding: "0.9rem 2.5rem",
                  borderRadius: "11px",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  textDecoration: "none",
                  boxShadow: "0 6px 24px rgba(124,58,237,0.4)",
                }}
              >
                🛒 شروع خرید
              </a>
              <a
                href="https://marloo.shop"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "white",
                  color: "#6d28d9",
                  padding: "0.9rem 2.5rem",
                  borderRadius: "11px",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  textDecoration: "none",
                  border: "1.5px solid #ddd6fe",
                  boxShadow: "0 2px 8px rgba(30,27,75,0.08)",
                }}
              >
                بازگشت به فروشگاه
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer
        style={{
          background: "#13112b",
          padding: "3rem 2rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Top row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              marginBottom: "2.5rem",
            }}
            className="footer-grid"
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                  }}
                >
                  🛍️
                </div>
                <span style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>
                  مارلو شاپ
                </span>
              </div>
              <p
                style={{
                  color: "#6d6a9e",
                  fontSize: "0.85rem",
                  lineHeight: 2,
                  margin: "0 0 1.25rem",
                }}
              >
                خرید آسان، سریع و مطمئن. مارلو شاپ فروشگاه اینترنتی با هدف ارائه بهترین
                تجربه خرید آنلاین در ایران است.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ color: "#a78bfa", fontSize: "0.82rem", margin: 0 }}>
                  📧 support@marloo.shop
                </p>
                <p style={{ color: "#a78bfa", fontSize: "0.82rem", margin: 0 }}>
                  🌐 marloo.shop
                </p>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div>
                <h4
                  style={{
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: "700",
                    margin: "0 0 1rem",
                  }}
                >
                  دسترسی سریع
                </h4>
                {[
                  { label: "صفحه اصلی", href: "https://marloo.shop" },
                  { label: "محصولات", href: "https://marloo.shop/products" },
                  { label: "پیشنهادهای ویژه", href: "https://marloo.shop/products" },
                  { label: "درباره ما", href: "#" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      color: "#6d6a9e",
                      fontSize: "0.82rem",
                      textDecoration: "none",
                      padding: "0.35rem 0",
                      transition: "color 0.2s",
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <div>
                <h4
                  style={{
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: "700",
                    margin: "0 0 1rem",
                  }}
                >
                  خدمات مشتری
                </h4>
                {["سوالات متداول", "قوانین و مقررات", "حریم خصوصی", "تماس با ما"].map(
                  (l) => (
                    <a
                      key={l}
                      href="#"
                      style={{
                        display: "block",
                        color: "#6d6a9e",
                        fontSize: "0.82rem",
                        textDecoration: "none",
                        padding: "0.35rem 0",
                      }}
                    >
                      {l}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "1.5rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#413e6e", fontSize: "0.78rem", margin: 0 }}>
              © ۱۴۰۴ مارلو شاپ — تمامی حقوق محفوظ است
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════ GLOBAL STYLES ══════════ */}
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }

        @media (max-width: 900px) {
          .story-grid, .timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
