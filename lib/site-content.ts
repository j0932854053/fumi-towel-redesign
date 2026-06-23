export const asset = (path: string) => path;

export const siteContent = {
  navItems: [
    { label: "HOME", href: "#home" },
    { label: "ALL TOWELS", href: "#all-towels" },
    { label: "SERIES", href: "#series" },
    { label: "CARE", href: "#care" },
    { label: "CUSTOM", href: "#custom" },
  ],
  theme: {
    logo: asset("/fumi/logo-fumi.webp"),
    fabric: asset("/fumi/fabric-background.webp"),
    hero: asset("/fumi/hero-pima.webp"),
  },
  hero: {
    eyebrow: "FROM TAIWAN TOWEL FACTORY",
    title: "FUMI Towel",
    copy: "結合傳統與創新，從台灣織出你的日常。",
    cta: "SHOP NOW",
  },
  intro: {
    title: "for daily towels. The way we weave with care.",
    copy: "FUMI 來自擁有三十年經驗的台灣毛巾工廠，重新整理織造技術、剩餘紗線與在地生活圖案，把柔軟、耐用、好整理的毛巾放回每一天。",
  },
  featureHeading: "把日常毛巾做成值得細看的選品",
  features: [
    {
      title: "柔軟日用系列",
      label: "Soft Daily Gauze",
      copy: "輕柔親膚、吸水快乾，適合每天洗臉、擦手與旅行攜帶。",
      image: asset("/fumi/series-soft.webp"),
    },
    {
      title: "台灣記憶系列",
      label: "Taiwan Motif",
      copy: "把在地風景與日常符號織進毛巾，送禮或自用都帶一點溫度。",
      image: asset("/fumi/series-taiwan.webp"),
    },
    {
      title: "織紋質感系列",
      label: "Woven Texture",
      copy: "以織法與紗線層次表現觸感，讓浴室也有安靜的設計感。",
      image: asset("/fumi/series-weave.webp"),
    },
    {
      title: "親子禮物系列",
      label: "Kids & Gift",
      copy: "明亮圖案與舒服觸感，適合孩子、彌月、交換禮物與日常小驚喜。",
      image: asset("/fumi/series-farm.webp"),
    },
  ],
  products: [
    {
      tag: "New Arrival",
      name: "PIMA 提花浴巾",
      english: "Pima Cotton Jacquard Bath Towel",
      price: "NT$ 980",
      image: asset("/fumi/hero-pima.webp"),
    },
    {
      tag: "Daily",
      name: "柔軟刺繡小毛巾",
      english: "Soft Embroidered Hand Towel",
      price: "NT$ 280",
      image: asset("/fumi/series-soft.webp"),
    },
    {
      tag: "Gift",
      name: "台灣記憶毛巾組",
      english: "Taiwan Motif Towel Set",
      price: "NT$ 520",
      image: asset("/fumi/series-taiwan.webp"),
    },
    {
      tag: "Texture",
      name: "籃紋紗布毛巾",
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
      name: "城市散步童巾",
      english: "City Ride Kids Towel",
      price: "NT$ 220",
      image: asset("/fumi/series-city.webp"),
    },
    {
      tag: "Factory",
      name: "剩紗限定毛巾組",
      english: "Reclaimed Yarn Limited Set",
      price: "NT$ 399",
      image: asset("/fumi/series-weave.webp"),
    },
    {
      tag: "Custom",
      name: "品牌客製毛巾",
      english: "Custom Towel Program",
      price: "From NT$ 300",
      image: asset("/fumi/hero-pima.webp"),
    },
  ],
  story: {
    eyebrow: "CUSTOM TOWEL",
    title: "為活動、品牌與禮贈做一條專屬毛巾",
    copy: "從圖案、尺寸、材質到包裝，FUMI 可以協助企業禮品、活動紀念、店鋪選物與學校團體客製，讓毛巾不只是消耗品，而是能被留下來使用的日常物件。",
    image: asset("/fumi/series-city.webp"),
    cta: "洽詢客製需求",
  },
  care: {
    title: "讓毛巾維持蓬鬆與吸水感",
    items: [
      "第一次使用前先以清水單獨洗滌，去除表面棉絮並喚醒纖維。",
      "避免長時間浸泡與過量柔軟精，讓毛巾保留原本的吸水力。",
      "洗後展開晾乾，保持通風，能減少異味並延長使用時間。",
    ],
  },
  stores: [
    {
      city: "台北",
      name: "選品合作店",
      address: "台北市生活風格選物通路，歡迎到店感受實品觸感。",
    },
    {
      city: "台中",
      name: "Scales_AP",
      address: "以設計與日常用品為主的選物空間，提供系列商品展售。",
    },
    {
      city: "高雄",
      name: "MLD 選物",
      address: "南部生活風格通路，適合現場挑選禮物與居家用品。",
    },
  ],
};
