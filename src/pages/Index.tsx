import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/files/784082f1-1e57-48a2-a3c3-0f6eb6136f0c.jpg";

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
  { id: "excavation", label: "Земляные работы" },
  { id: "concrete", label: "Бетонные работы" },
  { id: "lifting", label: "Подъёмное" },
  { id: "tools", label: "Инструмент" },
  { id: "scaffolding", label: "Леса и опалубка" },
];

const CATALOG = [
  { id: 1, art: "EXC-001", name: "Мини-экскаватор Komatsu PC35", category: "excavation", price: "4 500", unit: "сутки", badge: "Хит", icon: "Tractor" },
  { id: 2, art: "EXC-002", name: "Экскаватор-погрузчик JCB 3CX", category: "excavation", price: "8 200", unit: "сутки", badge: null, icon: "Tractor" },
  { id: 3, art: "CON-001", name: "Бетономешалка 300л", category: "concrete", price: "950", unit: "сутки", badge: null, icon: "RefreshCw" },
  { id: 4, art: "CON-002", name: "Глубинный вибратор ИВ-116", category: "concrete", price: "450", unit: "сутки", badge: null, icon: "Zap" },
  { id: 5, art: "CON-003", name: "Бетонный насос Putzmeister", category: "concrete", price: "12 000", unit: "сутки", badge: "Новинка", icon: "Zap" },
  { id: 6, art: "LIF-001", name: "Автовышка 22м", category: "lifting", price: "6 800", unit: "сутки", badge: null, icon: "ArrowUp" },
  { id: 7, art: "LIF-002", name: "Телескопический погрузчик 6т", category: "lifting", price: "9 500", unit: "сутки", badge: null, icon: "ArrowUp" },
  { id: 8, art: "TOL-001", name: "Перфоратор Bosch GBH 8-45", category: "tools", price: "350", unit: "сутки", badge: null, icon: "Wrench" },
  { id: 9, art: "TOL-002", name: "Угловая шлифмашина 230мм", category: "tools", price: "280", unit: "сутки", badge: null, icon: "Wrench" },
  { id: 10, art: "TOL-003", name: "Лазерный нивелир Leica", category: "tools", price: "600", unit: "сутки", badge: "Хит", icon: "Crosshair" },
  { id: 11, art: "SCA-001", name: "Строительные леса (секция 2м)", category: "scaffolding", price: "180", unit: "сутки", badge: null, icon: "Grid3x3" },
  { id: 12, art: "SCA-002", name: "Опалубка перекрытий (м²)", category: "scaffolding", price: "120", unit: "м²/сутки", badge: null, icon: "Grid3x3" },
];

const REVIEWS = [
  { name: "Алексей Соколов", company: "СтройМонтаж", text: "Брали экскаватор на две недели. Техника в отличном состоянии, доставили точно в срок. Будем обращаться снова!", rating: 5 },
  { name: "Марина Ковалёва", company: "ЖилСтрой", text: "Оперативно оформили аренду бетонного насоса. Цены честные, менеджер помог с выбором. Рекомендую!", rating: 5 },
  { name: "Дмитрий Петров", company: "ИП Петров", text: "Брал несколько видов инструмента. Всё работает исправно. Единственное — хотелось бы почаще обновлять парк.", rating: 4 },
  { name: "Ольга Назарова", company: "РемСервис", text: "Отличный сервис! Леса и опалубка были в наличии, оформление за 30 минут. Спасибо за профессионализм.", rating: 5 },
];

const CONDITIONS = [
  { icon: "FileText", title: "Договор аренды", text: "Оформляем официальный договор. Юридические лица и ИП работают по безналу, физические лица — наличными или картой." },
  { icon: "Shield", title: "Залог", text: "Залог составляет 50–100% от стоимости оборудования. Возвращается в полном объёме при сдаче техники в надлежащем состоянии." },
  { icon: "Clock", title: "Срок аренды", text: "Минимальный срок аренды — 1 сутки. Долгосрочная аренда (от 7 дней) — скидка 10%, от 30 дней — скидка 20%." },
  { icon: "AlertCircle", title: "Ответственность", text: "Арендатор несёт ответственность за сохранность оборудования. При повреждении — возмещение по рыночной стоимости ремонта." },
  { icon: "CheckCircle", title: "Документы", text: "Для физлиц: паспорт + водительское удостоверение. Для юрлиц и ИП: реквизиты компании + доверенность." },
  { icon: "RefreshCw", title: "Возврат", text: "Возврат оборудования осуществляется на наш склад или силами нашей службы доставки (платно). Приёмка техники при вас." },
];

const DELIVERY_ZONES = [
  { zone: "Зона 1", distance: "до 20 км", price: "1 500 ₽" },
  { zone: "Зона 2", distance: "20–50 км", price: "3 000 ₽" },
  { zone: "Зона 3", distance: "50–100 км", price: "5 500 ₽" },
  { zone: "Зона 4", distance: "100–200 км", price: "По договору" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filteredCatalog = CATALOG.filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || item.name.toLowerCase().includes(q) || item.art.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-golos">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2C2E33] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-8 h-8 bg-[#8B1A2F] rounded flex items-center justify-center">
              <Icon name="Hammer" size={18} className="text-white" />
            </div>
            <span className="font-oswald text-white text-xl tracking-wide font-semibold">
              СТРОЙ<span className="text-[#d14060]">ПРОКАТ</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-2 text-sm rounded transition-colors ${
                  activeSection === link.id
                    ? "text-[#d14060] bg-white/10"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+78001234567" className="flex items-center gap-2 text-white hover:text-[#d14060] transition-colors">
              <Icon name="Phone" size={16} />
              <span className="font-oswald text-base tracking-wide">8 800 123-45-67</span>
            </a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#232529] border-t border-white/10 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-3 py-2 text-gray-200 hover:text-white hover:bg-white/10 rounded text-sm"
              >
                {link.label}
              </button>
            ))}
            <a href="tel:+78001234567" className="px-3 py-2 text-[#d14060] font-oswald">8 800 123-45-67</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-16 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2E33]/96 via-[#2C2E33]/78 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 pb-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#8B1A2F]/20 border border-[#8B1A2F]/40 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#d14060] animate-pulse" />
              <span className="text-[#e07090] text-sm">Более 200 единиц техники в наличии</span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl text-white leading-tight mb-6 tracking-wide">
              АРЕНДА<br />
              <span className="text-[#d14060]">СТРОИТЕЛЬНОЙ</span><br />
              ТЕХНИКИ
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
              Профессиональное оборудование для любых строительных задач. Доставка, страховка, техподдержка.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("catalog")}
                className="bg-[#8B1A2F] hover:bg-[#6e1525] text-white font-oswald tracking-wider px-8 py-4 rounded text-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                СМОТРЕТЬ КАТАЛОГ
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="border border-white/30 text-white hover:bg-white/10 font-oswald tracking-wider px-8 py-4 rounded text-lg transition-all"
              >
                СВЯЗАТЬСЯ С НАМИ
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-[#8B1A2F]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "200+", label: "единиц техники" },
              { value: "10 лет", label: "на рынке" },
              { value: "1 500+", label: "довольных клиентов" },
              { value: "24/7", label: "поддержка" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-oswald text-2xl text-white font-bold">{stat.value}</div>
                <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 bg-[#EBEBEB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#8B1A2F] rounded-full" />
              <h2 className="font-oswald text-4xl text-[#2C2E33] tracking-wide">КАТАЛОГ ОБОРУДОВАНИЯ</h2>
            </div>
            <p className="text-gray-500 ml-4">Найдите нужную технику по названию или артикулу</p>
          </div>

          <div className="relative mb-6">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию или артикулу (например: EXC-001)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg text-[#2C2E33] placeholder-gray-400 focus:outline-none focus:border-[#8B1A2F] focus:ring-2 focus:ring-[#8B1A2F]/20 text-base shadow-sm transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Icon name="X" size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#8B1A2F] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-red-50 hover:text-[#8B1A2F] border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="text-sm text-gray-500 mb-4">
              Найдено: <span className="font-semibold text-[#2C2E33]">{filteredCatalog.length}</span> позиций
            </p>
          )}

          {filteredCatalog.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCatalog.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-1 group"
                >
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <Icon name={item.icon as string} size={48} className="text-gray-400 group-hover:text-[#8B1A2F] transition-colors" fallback="Wrench" />
                    {item.badge && (
                      <span className="absolute top-3 right-3 bg-[#8B1A2F] text-white text-xs font-oswald px-2 py-1 rounded tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-400 font-mono mb-1">{item.art}</div>
                    <h3 className="font-semibold text-[#2C2E33] text-sm leading-tight mb-3">{item.name}</h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="font-oswald text-xl text-[#8B1A2F]">{item.price} ₽</span>
                        <span className="text-xs text-gray-400 ml-1">/ {item.unit}</span>
                      </div>
                      <button className="bg-[#8B1A2F] hover:bg-[#6e1525] text-white text-xs px-3 py-1.5 rounded transition-colors">
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Icon name="SearchX" size={48} className="mx-auto mb-3 opacity-40" fallback="Search" />
              <p className="text-lg">По запросу «{searchQuery}» ничего не найдено</p>
              <button onClick={() => setSearchQuery("")} className="mt-3 text-[#8B1A2F] hover:underline text-sm">
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
            <div className="w-1 h-8 bg-[#8B1A2F] rounded-full" />
            <h2 className="font-oswald text-4xl text-[#2C2E33] tracking-wide">УСЛОВИЯ АРЕНДЫ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONDITIONS.map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-[#F5F5F5] border border-gray-100 hover:border-red-200 transition-all group">
                <div className="w-12 h-12 bg-[#8B1A2F]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#8B1A2F] transition-colors">
                  <Icon name={item.icon as string} size={22} className="text-[#8B1A2F] group-hover:text-white transition-colors" fallback="Info" />
                </div>
                <h3 className="font-oswald text-lg text-[#2C2E33] mb-2 tracking-wide">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-[#8B1A2F] rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-oswald text-xl text-white tracking-wide">Нужна консультация по условиям аренды?</p>
              <p className="text-white/70 text-sm mt-1">Наши менеджеры ответят на все вопросы</p>
            </div>
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-white text-[#8B1A2F] font-oswald tracking-wider px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              ПОЗВОНИТЬ НАМ
            </button>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-20 bg-[#EBEBEB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-[#8B1A2F] rounded-full" />
            <h2 className="font-oswald text-4xl text-[#2C2E33] tracking-wide">ДОСТАВКА</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              {[
                { icon: "Truck", title: "Собственный автопарк", text: "Специализированные транспортные средства для перевозки крупногабаритной техники" },
                { icon: "Clock", title: "Доставка день в день", text: "При заявке до 14:00 — доставка в день обращения (зависит от загруженности)" },
                { icon: "MapPin", title: "Выезд на объект", text: "Специалист помогает разгрузить и проверить технику непосредственно на строительной площадке" },
                { icon: "RotateCcw", title: "Самовывоз — бесплатно", text: "Можно забрать технику со склада самостоятельно, без оплаты доставки" },
              ].map((d) => (
                <div key={d.title} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-[#8B1A2F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={d.icon as string} size={20} className="text-[#8B1A2F]" fallback="Info" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2C2E33] text-sm">{d.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-oswald text-2xl text-[#2C2E33] mb-5 tracking-wide">СТОИМОСТЬ ДОСТАВКИ</h3>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2C2E33] text-white">
                      <th className="font-oswald tracking-wide text-left px-5 py-3 text-sm">Зона</th>
                      <th className="font-oswald tracking-wide text-left px-5 py-3 text-sm">Расстояние</th>
                      <th className="font-oswald tracking-wide text-right px-5 py-3 text-sm">Стоимость</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DELIVERY_ZONES.map((zone, i) => (
                      <tr key={zone.zone} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-5 py-3 text-[#2C2E33] font-medium text-sm">{zone.zone}</td>
                        <td className="px-5 py-3 text-gray-500 text-sm">{zone.distance}</td>
                        <td className="px-5 py-3 text-[#8B1A2F] font-oswald text-right">{zone.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3 ml-1">* Стоимость доставки техники весом от 5 тонн рассчитывается индивидуально</p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-[#8B1A2F] rounded-full" />
            <h2 className="font-oswald text-4xl text-[#2C2E33] tracking-wide">ОТЗЫВЫ КЛИЕНТОВ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.name} className="bg-[#F5F5F5] rounded-xl p-6 border border-gray-100 relative">
                <div className="absolute top-4 right-5 text-5xl text-[#8B1A2F]/15 font-oswald leading-none select-none">"</div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#8B1A2F] flex items-center justify-center text-white font-oswald text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2C2E33] text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-[#2C2E33]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-[#8B1A2F] rounded-full" />
            <h2 className="font-oswald text-4xl text-white tracking-wide">КОНТАКТЫ</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "8 800 123-45-67 (бесплатно)", href: "tel:+78001234567" },
                { icon: "Mail", label: "Email", value: "info@stroyprokat.ru", href: "mailto:info@stroyprokat.ru" },
                { icon: "MapPin", label: "Адрес склада", value: "г. Москва, ул. Промышленная, д. 15", href: null },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 8:00–20:00, Сб–Вс: 9:00–18:00", href: null },
              ].map((c) => (
                <div key={c.label} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#8B1A2F] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon as string} size={18} className="text-white" fallback="Info" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-white font-medium hover:text-[#d14060] transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-oswald text-xl text-white tracking-wide mb-5">ОСТАВИТЬ ЗАЯВКУ</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#8B1A2F] transition-colors text-sm"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#8B1A2F] transition-colors text-sm"
                />
                <textarea
                  placeholder="Какое оборудование вас интересует?"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#8B1A2F] transition-colors text-sm resize-none"
                />
                <button className="w-full bg-[#8B1A2F] hover:bg-[#6e1525] text-white font-oswald tracking-wider py-3 rounded-lg transition-colors text-base">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
                <p className="text-gray-500 text-xs text-center">Перезвоним в течение 15 минут в рабочее время</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/80 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#8B1A2F] rounded flex items-center justify-center">
              <Icon name="Hammer" size={13} className="text-white" />
            </div>
            <span className="font-oswald text-white text-sm tracking-wide">
              СТРОЙ<span className="text-[#d14060]">ПРОКАТ</span>
            </span>
          </div>
          <p className="text-gray-500 text-xs">© 2024 СтройПрокат. Аренда строительного оборудования.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-gray-500 hover:text-white text-xs transition-colors"
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