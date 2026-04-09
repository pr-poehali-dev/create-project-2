import { useState } from "react";
import Icon from "@/components/ui/icon";

type CatalogItem = {
  id: number; art: string; name: string; category: string;
  price: string; unit: string; badge: string | null; icon: string;
  specs: string[]; images: string[];
};

const HERO_IMG = "https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/files/8217c8c0-388f-4c77-86e5-3b96d1623d82.jpg";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "conditions", label: "Условия аренды" },
  { id: "delivery", label: "Доставка" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "grinder", label: "Болгарки (УШМ)" },
  { id: "drilling", label: "Алмазное бурение" },
  { id: "concrete", label: "Бетонные работы" },
  { id: "compaction", label: "Уплотнение грунта" },
];

const CATALOG = [
  {
    id: 1, art: "USM-001",
    name: "Аккумуляторная болгарка (УШМ) TOUA DBLAG125-1",
    category: "grinder", price: "800", unit: "сутки", badge: null, icon: "Zap",
    specs: ["Диск 125 мм", "Акк. 4 А·ч / 18 В", "Вес 2.05 кг", "Рег. оборотов"],
    images: [
      "https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/c03a8f8c-09bd-470c-aa86-c8be3b0ba7d8.jpg",
      "https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/06130123-0737-4a56-9d4c-88d4b27d7d8a.jpg",
    ],
  },
  {
    id: 2, art: "USM-002",
    name: "Болгарка (УШМ) KEYANG DG-1102C",
    category: "grinder", price: "700", unit: "сутки", badge: null, icon: "Zap",
    specs: ["1100 Вт", "Диск 125 мм", "Плавный пуск", "Вес 1.6 кг"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/27b57e92-1791-4f64-a460-2ada47763cde.jpg"],
  },
  {
    id: 3, art: "USM-003",
    name: "Болгарка (УШМ) Makita GA 9020 SF",
    category: "grinder", price: "900", unit: "сутки", badge: "Хит", icon: "Zap",
    specs: ["2200 Вт", "Диск 230 мм", "Плавный пуск", "Вес 5.8 кг"],
    images: [
      "https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/8e6c4205-137b-483b-9433-954a3be29642.jpg",
      "https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/5f2ad98a-2437-4f1a-a8e3-c6fbb51a0a6d.jpg",
    ],
  },
  {
    id: 4, art: "DRL-001",
    name: "Установка алмазного бурения AT-S + бак SU-180M",
    category: "drilling", price: "1 800", unit: "сутки", badge: null, icon: "Drill",
    specs: ["2200 Вт", "Ø до 180 мм", "Мокрое/сухое", "Вес 10.7 кг"],
    images: [] as string[],
  },
  {
    id: 5, art: "DRL-002",
    name: "Установка Алмазная Diam 400",
    category: "drilling", price: "2 500", unit: "сутки", badge: "Новинка", icon: "Drill",
    specs: ["6000 Вт", "Ø коронки до 400 мм", "Изм. угол наклона"],
    images: [] as string[],
  },
  {
    id: 6, art: "CUT-001",
    name: "Бетонорез электрический Concrete SAW 400",
    category: "concrete", price: "2 000", unit: "сутки", badge: null, icon: "Scissors",
    specs: ["5500 Вт", "Диск 400 мм", "Рез 150 мм", "4700 об/мин"],
    images: [] as string[],
  },
  {
    id: 7, art: "CUT-002",
    name: "Бетонорез кольцевой BHJ500 электрический",
    category: "concrete", price: "2 500", unit: "сутки", badge: null, icon: "Scissors",
    specs: ["Ø 520 мм", "Глубина реза 40 см", "Железобетон/мрамор"],
    images: [] as string[],
  },
  {
    id: 8, art: "CON-001",
    name: "Машина затирочная (вертолёт) TSS DMR1000L",
    category: "concrete", price: "2 500", unit: "сутки", badge: null, icon: "RefreshCw",
    specs: ["Loncin G200F 6.5 л.с.", "Ширина 900 мм", "Бензиновый"],
    images: [] as string[],
  },
  {
    id: 9, art: "CON-002",
    name: "Бетономешалка Electrolite БМ-165 E",
    category: "concrete", price: "1 000", unit: "сутки", badge: null, icon: "RefreshCw",
    specs: ["800 Вт", "165 л / 123 л раствора", "Чугунный венец", "Вес 52 кг"],
    images: [] as string[],
  },
  {
    id: 10, art: "CMP-001",
    name: "Вибронога (трамбовка)",
    category: "compaction", price: "2 500", unit: "сутки", badge: null, icon: "ArrowDown",
    specs: ["Уплотнение грунта", "Аренда с оператором"],
    images: [] as string[],
  },
  {
    id: 11, art: "CMP-002",
    name: "Виброплита 90 кг",
    category: "compaction", price: "1 800", unit: "сутки", badge: null, icon: "ArrowDown",
    specs: ["90 кг", "Плиточное основание", "Грунт/щебень"],
    images: [] as string[],
  },
  {
    id: 12, art: "CMP-003",
    name: "Виброплита TOR-C 120",
    category: "compaction", price: "по запросу", unit: "сутки", badge: "Новинка", icon: "ArrowDown",
    specs: ["120 кг", "Повышенная производительность"],
    images: [] as string[],
  },
] satisfies CatalogItem[];

const REVIEWS = [
  { name: "Андрей Климов", company: "ООО СтройПроект", text: "Брали вертолёт для затирки бетона на объекте 2000 м². Техника в отличном состоянии, доставили строго по времени. Сэкономили кучу денег по сравнению с покупкой!", rating: 5 },
  { name: "Светлана Иванова", company: "ИП Иванова", text: "Арендовали установку алмазного бурения. Всё работало идеально. Менеджер подробно проконсультировал по выбору коронки. Рекомендую РентМастер!", rating: 5 },
  { name: "Олег Петренко", company: "Частный мастер", text: "Брал болгарку Makita на неделю — цена отличная, инструмент как новый. Оформление за 10 минут. Обязательно вернусь.", rating: 5 },
  { name: "Виктор Нагорный", company: "БетонСтрой", text: "Пользуемся услугами РентМастер регулярно. Всегда большой выбор, гибкие условия при долгосрочной аренде. Надёжная компания!", rating: 5 },
];

const CONDITIONS = [
  { icon: "FileText", title: "Договор аренды", text: "Оформляем официальный договор. Юридические лица и ИП работают по безналу, физические лица — наличными или картой." },
  { icon: "Shield", title: "Залог", text: "Залог составляет 50–100% от стоимости оборудования. Возвращается в полном объёме при сдаче техники в надлежащем состоянии." },
  { icon: "Clock", title: "Срок аренды", text: "Минимальный срок — 1 сутки. От 7 дней — скидка 10%, от 30 дней — скидка 20%. Долгосрочные условия обсуждаются индивидуально." },
  { icon: "AlertCircle", title: "Ответственность", text: "Арендатор несёт ответственность за сохранность оборудования. При повреждении — возмещение по рыночной стоимости ремонта." },
  { icon: "CheckCircle", title: "Документы", text: "Для физлиц: паспорт. Для юрлиц и ИП: реквизиты + доверенность. Ничего лишнего — оформляем быстро." },
  { icon: "RefreshCw", title: "Возврат", text: "Возврат на наш склад или заберём сами (платно). Совместная приёмка техники на месте при вас." },
];

const DELIVERY_ZONES = [
  { zone: "Зона 1", distance: "до 10 км", price: "500 ₽" },
  { zone: "Зона 2", distance: "10–30 км", price: "1 200 ₽" },
  { zone: "Зона 3", distance: "30–60 км", price: "2 500 ₽" },
  { zone: "Зона 4", distance: "60+ км", price: "По договору" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<Record<number, number>>({});

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filteredCatalog = CATALOG.filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.art.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-golos">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1C20] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="cursor-pointer select-none"
            onClick={() => scrollTo("home")}
          >
            <img
              src="https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/feab8425-0bfd-432f-bd8f-fdfb797f900d.png"
              alt="РентМастер"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-2 text-sm rounded transition-all ${
                  activeSection === link.id
                    ? "text-[#D14060] bg-white/8 font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Phone */}
          <a
            href="tel:+79991377779"
            className="hidden md:flex items-center gap-2 bg-[#8B1A2F] hover:bg-[#6e1525] text-white px-4 py-2 rounded-lg transition-all"
          >
            <Icon name="Phone" size={15} />
            <span className="font-oswald tracking-wider text-sm">8 999 137-77-79</span>
          </a>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#13151A] border-t border-white/10 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded text-sm"
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+79991377779"
              className="flex items-center gap-2 px-3 py-2.5 text-[#D14060] font-oswald tracking-wider"
            >
              <Icon name="Phone" size={15} />
              8 999 137-77-79
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0F13]/97 via-[#0D0F13]/80 to-[#0D0F13]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F13]/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 pb-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#8B1A2F]/25 border border-[#8B1A2F]/50 rounded-full px-5 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#D14060] animate-pulse" />
              <span className="text-[#F08090] text-sm tracking-wide">
                Надёжный партнёр в сфере аренды
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 tracking-wide">
              КОМПАНИЯ<br />
              <span className="text-[#D14060]">РЕНТМАСТЕР</span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-3 max-w-2xl">
              Надёжный партнёр в сфере аренды строительного оборудования и инструмента.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-3 max-w-xl">
              Широкий выбор инструмента для всех видов работ — от строительства до садоводства.
            </p>
            <p className="text-[#F0B040] font-oswald text-xl tracking-wide mb-10">
              ☝ Не спешите покупать — арендуйте у нас!
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("catalog")}
                className="bg-[#8B1A2F] hover:bg-[#6e1525] text-white font-oswald tracking-widest px-10 py-4 rounded-lg text-lg transition-all hover:shadow-xl hover:shadow-[#8B1A2F]/30 hover:-translate-y-0.5"
              >
                СМОТРЕТЬ КАТАЛОГ
              </button>
              <a
                href="tel:+79991377779"
                className="flex items-center justify-center gap-2 border border-white/25 text-white hover:bg-white/10 font-oswald tracking-wider px-8 py-4 rounded-lg text-lg transition-all"
              >
                <Icon name="Phone" size={18} />
                ПОЗВОНИТЬ
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#8B1A2F]/95 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "12+", label: "видов оборудования" },
              { value: "7 лет", label: "на рынке" },
              { value: "24/7", label: "поддержка" },
              { value: "1 сутки", label: "мин. срок аренды" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-oswald text-2xl text-white font-bold">{s.value}</div>
                <div className="text-white/65 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 bg-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-9 bg-[#8B1A2F] rounded-full" />
              <h2 className="font-oswald text-4xl text-[#1A1C20] tracking-wide">КАТАЛОГ ОБОРУДОВАНИЯ</h2>
            </div>
            <p className="text-gray-500 ml-4 text-sm">Поиск по названию, артикулу или характеристике</p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Например: болгарка, бурение, USM-001..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-white border border-gray-200 rounded-xl text-[#1A1C20] placeholder-gray-400 focus:outline-none focus:border-[#8B1A2F] focus:ring-2 focus:ring-[#8B1A2F]/15 shadow-sm text-base transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <Icon name="X" size={18} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat.id
                    ? "bg-[#8B1A2F] text-white border-[#8B1A2F] shadow"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#8B1A2F]/40 hover:text-[#8B1A2F]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="text-sm text-gray-400 mb-5">
              Найдено:{" "}
              <span className="font-semibold text-[#1A1C20]">{filteredCatalog.length}</span>{" "}
              позиций
            </p>
          )}

          {filteredCatalog.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCatalog.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all hover:-translate-y-1 group flex flex-col"
                >
                  {/* Card image zone */}
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    {item.images ? (
                      <>
                        <img
                          src={item.images[activeImage[item.id] ?? 0]}
                          alt={item.name}
                          className="w-full h-full object-contain p-2 transition-opacity duration-300"
                        />
                        {item.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => ({ ...prev, [item.id]: 0 })); }}
                              className={`absolute bottom-2 left-1/2 -translate-x-3 w-2 h-2 rounded-full transition-colors ${(activeImage[item.id] ?? 0) === 0 ? "bg-[#8B1A2F]" : "bg-gray-300 hover:bg-gray-400"}`}
                            />
                            <button
                              onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => ({ ...prev, [item.id]: 1 })); }}
                              className={`absolute bottom-2 left-1/2 translate-x-1 w-2 h-2 rounded-full transition-colors ${(activeImage[item.id] ?? 0) === 1 ? "bg-[#8B1A2F]" : "bg-gray-300 hover:bg-gray-400"}`}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <Icon
                        name={item.icon as string}
                        size={52}
                        className="text-gray-300 group-hover:text-[#8B1A2F] transition-colors duration-300"
                        fallback="Wrench"
                      />
                    )}
                    {item.badge && (
                      <span className="absolute top-3 right-3 bg-[#8B1A2F] text-white text-[11px] font-oswald px-2.5 py-1 rounded-full tracking-wider shadow">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute top-2 left-2 text-[10px] text-gray-400 font-mono bg-white/80 px-2 py-0.5 rounded">
                      {item.art}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-[#1A1C20] text-sm leading-snug mb-3 flex-1">
                      {item.name}
                    </h3>

                    {/* Specs toggle */}
                    <button
                      onClick={() =>
                        setExpandedCard(expandedCard === item.id ? null : item.id)
                      }
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#8B1A2F] transition-colors mb-3 w-fit"
                    >
                      <Icon
                        name={expandedCard === item.id ? "ChevronUp" : "ChevronDown"}
                        size={13}
                      />
                      {expandedCard === item.id ? "Скрыть" : "Характеристики"}
                    </button>

                    {expandedCard === item.id && (
                      <ul className="mb-3 space-y-1">
                        {item.specs.map((s) => (
                          <li
                            key={s}
                            className="flex items-start gap-1.5 text-xs text-gray-500"
                          >
                            <span className="text-[#8B1A2F] mt-0.5">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div>
                        {item.price === "по запросу" ? (
                          <span className="font-oswald text-base text-[#8B1A2F]">По запросу</span>
                        ) : (
                          <>
                            <span className="font-oswald text-xl text-[#8B1A2F]">
                              {item.price} ₽
                            </span>
                            <span className="text-[11px] text-gray-400 ml-1">/ {item.unit}</span>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => scrollTo("contacts")}
                        className="bg-[#8B1A2F] hover:bg-[#6e1525] text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Icon
                name="SearchX"
                size={52}
                className="mx-auto mb-4 opacity-30"
                fallback="Search"
              />
              <p className="text-lg text-gray-500">По запросу «{searchQuery}» ничего не найдено</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#8B1A2F] hover:underline text-sm"
              >
                Сбросить поиск
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONDITIONS */}
      <section id="conditions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-9 bg-[#8B1A2F] rounded-full" />
            <h2 className="font-oswald text-4xl text-[#1A1C20] tracking-wide">УСЛОВИЯ АРЕНДЫ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONDITIONS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#F5F5F5] border border-transparent hover:border-[#8B1A2F]/20 transition-all group"
              >
                <div className="w-12 h-12 bg-[#8B1A2F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8B1A2F] transition-colors">
                  <Icon
                    name={item.icon as string}
                    size={22}
                    className="text-[#8B1A2F] group-hover:text-white transition-colors"
                    fallback="Info"
                  />
                </div>
                <h3 className="font-oswald text-lg text-[#1A1C20] mb-2 tracking-wide">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-7 bg-gradient-to-r from-[#8B1A2F] to-[#6e1525] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <p className="font-oswald text-2xl text-white tracking-wide">
                Нужна консультация?
              </p>
              <p className="text-white/70 text-sm mt-1">
                Позвоните — ответим на любой вопрос по условиям аренды
              </p>
            </div>
            <a
              href="tel:+79991377779"
              className="flex items-center gap-2 bg-white text-[#8B1A2F] font-oswald tracking-wider px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap shadow"
            >
              <Icon name="Phone" size={16} />
              8 999 137-77-79
            </a>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-20 bg-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-9 bg-[#8B1A2F] rounded-full" />
            <h2 className="font-oswald text-4xl text-[#1A1C20] tracking-wide">ДОСТАВКА</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              {[
                { icon: "Truck", title: "Собственный транспорт", text: "Специализированные ТС для перевозки крупногабаритного и тяжёлого оборудования" },
                { icon: "Clock", title: "Доставка в день заявки", text: "При заказе до 13:00 — доставим в этот же день (зависит от загруженности)" },
                { icon: "MapPin", title: "Выгрузка на объекте", text: "Специалист помогает разгрузить и передать технику непосредственно на площадке" },
                { icon: "Package", title: "Самовывоз — бесплатно", text: "Заберите технику со склада сами без каких-либо доплат" },
              ].map((d) => (
                <div
                  key={d.title}
                  className="flex gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-[#8B1A2F]/20 transition-all"
                >
                  <div className="w-11 h-11 bg-[#8B1A2F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={d.icon as string} size={20} className="text-[#8B1A2F]" fallback="Info" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1C20] text-sm">{d.title}</p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-oswald text-2xl text-[#1A1C20] mb-5 tracking-wide">
                ТАРИФЫ ДОСТАВКИ
              </h3>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#1A1C20] text-white">
                      <th className="font-oswald tracking-wide text-left px-5 py-3.5 text-sm">Зона</th>
                      <th className="font-oswald tracking-wide text-left px-5 py-3.5 text-sm">Расстояние</th>
                      <th className="font-oswald tracking-wide text-right px-5 py-3.5 text-sm">Стоимость</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DELIVERY_ZONES.map((zone, i) => (
                      <tr key={zone.zone} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                        <td className="px-5 py-3.5 text-[#1A1C20] font-medium text-sm">{zone.zone}</td>
                        <td className="px-5 py-3.5 text-gray-500 text-sm">{zone.distance}</td>
                        <td className="px-5 py-3.5 text-[#8B1A2F] font-oswald text-right font-semibold">{zone.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3 ml-1">
                * Доставка техники свыше 200 кг — по индивидуальному расчёту
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-9 bg-[#8B1A2F] rounded-full" />
            <h2 className="font-oswald text-4xl text-[#1A1C20] tracking-wide">ОТЗЫВЫ КЛИЕНТОВ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="bg-[#F5F5F5] rounded-2xl p-6 border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute -top-2 right-4 text-8xl text-[#8B1A2F]/8 font-oswald leading-none select-none pointer-events-none">
                  "
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={15} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B1A2F] flex items-center justify-center text-white font-oswald text-base shadow">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1C20] text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-[#1A1C20]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-9 bg-[#8B1A2F] rounded-full" />
            <h2 className="font-oswald text-4xl text-white tracking-wide">КОНТАКТЫ</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-9 h-9 bg-[#8B1A2F] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Building2" size={17} className="text-white" fallback="Info" />
                  </div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Компания</p>
                </div>
                <p className="text-white font-oswald text-2xl tracking-wide ml-11">РентМастер</p>
                <p className="text-gray-400 text-sm ml-11 mt-1 leading-relaxed">
                  Надёжный партнёр в сфере аренды строительного оборудования и инструмента
                </p>
              </div>

              {[
                { icon: "Phone", label: "Телефон", value: "8 999 137-77-79", href: "tel:+79991377779" },
                { icon: "Mail", label: "Email", value: "Reentmaster@yandex.ru", href: "mailto:Reentmaster@yandex.ru" },
                { icon: "MapPin", label: "Адрес", value: "г. Нижний Новгород, ул. Ларина 27к8", href: null },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 8:00–19:00 / Сб–Вс: 8:00–18:00", href: null },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 items-start">
                  <div className="w-9 h-9 bg-[#8B1A2F] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={c.icon as string} size={16} className="text-white" fallback="Info" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-white font-medium hover:text-[#D14060] transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <h3 className="font-oswald text-xl text-white tracking-widest mb-6">
                ОСТАВИТЬ ЗАЯВКУ
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8B1A2F] transition-colors text-sm"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full px-4 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8B1A2F] transition-colors text-sm"
                />
                <textarea
                  placeholder="Какое оборудование вас интересует?"
                  rows={4}
                  className="w-full px-4 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8B1A2F] transition-colors text-sm resize-none"
                />
                <button className="w-full bg-[#8B1A2F] hover:bg-[#6e1525] text-white font-oswald tracking-widest py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#8B1A2F]/30 text-base">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
                <p className="text-gray-600 text-xs text-center">
                  Перезвоним в течение 15 минут в рабочее время
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-7 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="cursor-pointer" onClick={() => scrollTo("home")}>
            <img
              src="https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/feab8425-0bfd-432f-bd8f-fdfb797f900d.png"
              alt="РентМастер"
              className="h-8 w-auto object-contain opacity-80"
            />
          </div>
          <p className="text-gray-600 text-xs text-center">
            © 2024 РентМастер — аренда строительного оборудования и инструмента
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-gray-600 hover:text-white text-xs transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;