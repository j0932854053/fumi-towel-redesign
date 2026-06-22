import Image from "next/image";
import type { CSSProperties } from "react";

const pagesBasePath =
  process.env.BUILD_TARGET === "pages"
    ? process.env.PAGES_BASE_PATH ?? "/fumi-towel-redesign"
    : "";

const asset = (path: string) => `${pagesBasePath}${path}`;

const shellStyle = {
  "--fabric-url": `url("${asset("/fumi/fabric-background.webp")}")`,
} as CSSProperties;

const navItems = [
  "HOME",
  "ALL TOWELS",
  "SERIES",
  "CARE",
  "CUSTOM",
];

const featurePanels = [
  {
    title: "小時光系列",
    label: "Soft Daily Gauze",
    copy: "柔色刺繡與細緻包邊，給洗臉、擦手、外出的小日常。",
    image: asset("/fumi/series-soft.webp"),
  },
  {
    title: "台灣特色毛巾組",
    label: "Taiwan Motif",
    copy: "把熟悉的島嶼符號織進布面，輕巧又有記憶點。",
    image: asset("/fumi/series-taiwan.webp"),
  },
  {
    title: "井紋紗布毛巾組",
    label: "Woven Texture",
    copy: "透氣、速乾、柔軟，適合悶熱氣候與每日頻繁使用。",
    image: asset("/fumi/series-weave.webp"),
  },
  {
    title: "動物農場系列",
    label: "Kids & Gift",
    copy: "可愛圖樣與溫和手感，做成孩子、朋友、旅人都會用的禮物。",
    image: asset("/fumi/series-farm.webp"),
  },
];

const products = [
  {
    tag: "New Arrival",
    name: "頂級 PIMA 棉緞面提花浴巾",
    english: "Pima Cotton Jacquard Bath Towel",
    price: "NT$ 980",
    image: asset("/fumi/hero-pima.webp"),
  },
  {
    tag: "Daily",
    name: "小時光刺繡方巾",
    english: "Soft Embroidered Hand Towel",
    price: "NT$ 280",
    image: asset("/fumi/series-soft.webp"),
  },
  {
    tag: "Gift",
    name: "台灣特色毛巾組",
    english: "Taiwan Motif Towel Set",
    price: "NT$ 520",
    image: asset("/fumi/series-taiwan.webp"),
  },
  {
    tag: "Texture",
    name: "井紋紗布小手巾",
    english: "Basket Weave Gauze Towel",
    price: "NT$ 180",
    image: asset("/fumi/series-weave.webp"),
  },
  {
    tag: "Kids",
    name: "動物農場紗布巾",
    english: "Animal Farm Gauze Towel",
    price: "NT$ 220",
    image: asset("/fumi/series-farm.webp"),
  },
  {
    tag: "Travel",
    name: "兜兜風兒童小方巾",
    english: "City Ride Kids Towel",
    price: "NT$ 220",
    image: asset("/fumi/series-city.webp"),
  },
  {
    tag: "Factory",
    name: "剩紗再織限定組",
    english: "Reclaimed Yarn Limited Set",
    price: "NT$ 399",
    image: asset("/fumi/series-weave.webp"),
  },
  {
    tag: "Custom",
    name: "企業禮贈客製毛巾",
    english: "Custom Towel Program",
    price: "From NT$ 300",
    image: asset("/fumi/hero-pima.webp"),
  },
];

const stores = [
  {
    city: "彰化",
    name: "豪所在",
    address: "彰化縣社頭鄉社斗路一段353號",
  },
  {
    city: "台南",
    name: "秤秤 / SCALES_AP",
    address: "臺南市安平區郡平路274巷20弄20號",
  },
  {
    city: "高雄",
    name: "MLD 台鋁書店",
    address: "806 高雄市前鎮區忠勤路8號1樓",
  },
];

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button className="icon-button" type="button" aria-label={label}>
      {children}
    </button>
  );
}

export default function Home() {
  return (
    <main className="site-shell" style={shellStyle}>
      <header className="site-header">
        <nav className="header-nav" aria-label="Main navigation">
          <a className="brand-mark" href="#top" aria-label="FUMI Towel home">
            <Image
              src={asset("/fumi/logo-fumi.webp")}
              alt="FUMI"
              width={132}
              height={43}
              priority
              unoptimized
            />
          </a>
          <div className="nav-links">
            {navItems.map((item) => (
              <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
                {item}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <IconButton label="Search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6" />
                <path d="m16 16 4 4" />
              </svg>
            </IconButton>
            <IconButton label="Account">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>
            </IconButton>
            <IconButton label="Cart">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 7h15l-2 9H8L6 7Z" />
                <path d="M6 7 5 3H2" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </IconButton>
          </div>
        </nav>
      </header>

      <section className="hero" id="top" aria-label="FUMI Towel">
        <Image
          className="hero-image"
          src={asset("/fumi/hero-pima.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized
        />
        <div className="hero-content">
          <p className="eyebrow">FROM TAIWAN TOWEL FACTORY</p>
          <h1>FUMI Towel</h1>
          <p className="hero-copy">
            結合傳統與創新，從台灣織出你的日常。
          </p>
          <a className="text-link hero-link" href="#all-towels">
            SHOP NOW
          </a>
        </div>
      </section>

      <section className="intro-section" id="home">
        <div className="rule" />
        <p className="intro-en">for daily towels. The way we weave with care.</p>
        <p className="intro-copy">
          我們來自台灣傳統毛巾工廠，三十多年來為無數品牌打造高品質毛巾。那些被留下的優質剩紗，被重新整理、配色、織造，成為 FUMI 日常裡柔軟而有生命的開始。
        </p>
        <div className="rule" />
      </section>

      <section className="feature-grid" id="series" aria-labelledby="series-title">
        <div className="section-heading">
          <p className="eyebrow">FEATURE SERIES</p>
          <h2 id="series-title">生活裡會一直用到的毛巾</h2>
        </div>
        <div className="feature-panels">
          {featurePanels.map((panel) => (
            <article className="feature-panel" key={panel.title}>
              <a className="feature-image" href="#all-towels" aria-label={panel.title}>
                <Image
                  src={panel.image}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                  unoptimized
                />
              </a>
              <div className="feature-text">
                <p>{panel.label}</p>
                <h3>{panel.title}</h3>
                <span>{panel.copy}</span>
                <a className="text-link" href="#all-towels">
                  SHOP NOW
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="selection-section" id="all-towels" aria-labelledby="selection-title">
        <div className="section-title-line">
          <span />
          <h2 id="selection-title">FUMI SELECTION</h2>
          <span />
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <a className="product-image" href="#all-towels" aria-label={product.name}>
                <Image
                  src={product.image}
                  alt=""
                  width={1920}
                  height={1134}
                  sizes="(max-width: 720px) 100vw, (max-width: 1020px) 50vw, 25vw"
                  unoptimized
                />
              </a>
              <div className="product-meta">
                <p>{product.tag}</p>
                <h3>{product.name}</h3>
                <span>{product.english}</span>
                <strong>{product.price}</strong>
              </div>
              <button className="cart-button" type="button">
                加入購物車
              </button>
            </article>
          ))}
        </div>
        <a className="browse-more" href="#all-towels">
          瀏覽更多商品
        </a>
      </section>

      <section className="story-section" id="custom">
        <div className="story-image">
          <Image
            src={asset("/fumi/series-city.webp")}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 55vw"
            unoptimized
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">CUSTOM TOWEL</p>
          <h2>讓剩紗，也有自己的生命與色彩。</h2>
          <p>
            從商品開發、企業禮贈到品牌合作，FUMI 以工廠經驗協助你選紗、織法、尺寸與包裝，做出耐用又貼近日常的毛巾。
          </p>
          <a className="text-link" href="#stores">
            客製化毛巾
          </a>
        </div>
      </section>

      <section className="care-section" id="care">
        <div>
          <p className="eyebrow">TOWEL CARE</p>
          <h2>柔軟可以被好好保存。</h2>
        </div>
        <div className="care-list">
          <p>初次使用前先以清水單獨洗滌，讓棉纖維舒展。</p>
          <p>避免柔軟精與過量洗劑，保持吸水力與布面蓬鬆。</p>
          <p>陰乾或低溫烘乾，減少長時間曝曬造成的纖維硬化。</p>
        </div>
      </section>

      <section className="stores-section" id="stores" aria-labelledby="stores-title">
        <div className="section-title-line">
          <span />
          <h2 id="stores-title">寄售店鋪</h2>
          <span />
        </div>
        <div className="store-grid">
          {stores.map((store) => (
            <article className="store-card" key={store.name}>
              <p>{store.city}</p>
              <h3>{store.name}</h3>
              <span>{store.address}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <Image
          src={asset("/fumi/logo-fumi.webp")}
          alt="FUMI"
          width={138}
          height={44}
          unoptimized
        />
        <div>
          <p>SHOPPING</p>
          <a href="#all-towels">所有商品</a>
          <a href="#series">特色系列</a>
        </div>
        <div>
          <p>CUSTOMER</p>
          <a href="#care">毛巾洗滌與保養</a>
          <a href="#custom">客製化毛巾</a>
        </div>
        <div>
          <p>FOLLOW US</p>
          <a href="https://tdtctowel.meepshoper.com/">Original Store</a>
        </div>
      </footer>
    </main>
  );
}
