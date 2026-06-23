import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { siteContent } from "@/lib/site-content";

const shellStyle = {
  "--fabric-url": `url("${siteContent.theme.fabric}")`,
} as CSSProperties;

function IconButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
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
              src={siteContent.theme.logo}
              alt="FUMI"
              width={132}
              height={43}
              priority
              unoptimized
            />
          </a>
          <div className="nav-links">
            {siteContent.navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
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
          src={siteContent.theme.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized
        />
        <div className="hero-content">
          <p className="eyebrow">{siteContent.hero.eyebrow}</p>
          <h1>{siteContent.hero.title}</h1>
          <p className="hero-copy">{siteContent.hero.copy}</p>
          <a className="text-link hero-link" href="#all-towels">
            {siteContent.hero.cta}
          </a>
        </div>
      </section>

      <section className="intro-section" id="home">
        <div className="rule" />
        <p className="intro-en">{siteContent.intro.title}</p>
        <p className="intro-copy">{siteContent.intro.copy}</p>
        <div className="rule" />
      </section>

      <section className="feature-grid" id="series" aria-labelledby="series-title">
        <div className="section-heading">
          <p className="eyebrow">FEATURE SERIES</p>
          <h2 id="series-title">{siteContent.featureHeading}</h2>
        </div>
        <div className="feature-panels">
          {siteContent.features.map((panel) => (
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
          {siteContent.products.map((product) => (
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
          瀏覽所有商品
        </a>
      </section>

      <section className="story-section" id="custom">
        <div className="story-image">
          <Image
            src={siteContent.story.image}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 55vw"
            unoptimized
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">{siteContent.story.eyebrow}</p>
          <h2>{siteContent.story.title}</h2>
          <p>{siteContent.story.copy}</p>
          <a className="text-link" href="#stores">
            {siteContent.story.cta}
          </a>
        </div>
      </section>

      <section className="care-section" id="care">
        <div>
          <p className="eyebrow">TOWEL CARE</p>
          <h2>{siteContent.care.title}</h2>
        </div>
        <div className="care-list">
          {siteContent.care.items.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="stores-section" id="stores" aria-labelledby="stores-title">
        <div className="section-title-line">
          <span />
          <h2 id="stores-title">實體選物通路</h2>
          <span />
        </div>
        <div className="store-grid">
          {siteContent.stores.map((store) => (
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
          src={siteContent.theme.logo}
          alt="FUMI"
          width={138}
          height={44}
          unoptimized
        />
        <div>
          <p>SHOPPING</p>
          <a href="#all-towels">所有毛巾</a>
          <a href="#series">系列選品</a>
        </div>
        <div>
          <p>CUSTOMER</p>
          <a href="#care">毛巾保養</a>
          <a href="#custom">客製服務</a>
        </div>
        <div>
          <p>FOLLOW US</p>
          <a href="https://tdtctowel.meepshoper.com/">Original Store</a>
        </div>
      </footer>
    </main>
  );
}
