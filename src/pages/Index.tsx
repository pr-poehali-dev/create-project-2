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
  { id: "power", label: "Генераторы и компрессоры" },
  { id: "garden", label: "Садовая техника" },
  { id: "power_tools", label: "Электроинструмент" },
  { id: "height", label: "Вышки и лестницы" },
  { id: "pumps", label: "Насосы и мотопомпы" },
  { id: "welding", label: "Сварка и покраска" },
  { id: "other", label: "Прочее" },
];

const CATALOG = [
  {
    id: 1, art: "USM-001",
    name: "Аккумуляторная болгарка (УШМ) TOUA DBLAG125-1",
    category: "grinder", price: "800", unit: "сутки", badge: null, icon: "Zap",
    specs: ["Диск 125 мм", "Акк. 4 А·ч / 18 В", "Вес 2.05 кг", "Рег. оборотов"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/USM-001.jpg"],
  },
  {
    id: 2, art: "USM-002",
    name: "Болгарка (УШМ) KEYANG DG-1102C",
    category: "grinder", price: "700", unit: "сутки", badge: null, icon: "Zap",
    specs: ["1100 Вт", "Диск 125 мм", "Плавный пуск", "Вес 1.6 кг"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/USM-002.jpg"],
  },
  {
    id: 3, art: "USM-003",
    name: "Болгарка (УШМ) Makita GA 9020 SF",
    category: "grinder", price: "900", unit: "сутки", badge: "Хит", icon: "Zap",
    specs: ["2200 Вт", "Диск 230 мм", "Плавный пуск", "Вес 5.8 кг"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/USM-003.jpg"],
  },
  {
    id: 4, art: "DRL-001",
    name: "Установка алмазного бурения AT-S + бак SU-180M",
    category: "drilling", price: "1 800", unit: "сутки", badge: null, icon: "Drill",
    specs: ["2200 Вт", "Ø до 180 мм", "Мокрое/сухое", "Вес 10.7 кг"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/DRL-001.jpg"],
  },
  {
    id: 5, art: "DRL-002",
    name: "Установка Алмазная Diam 400",
    category: "drilling", price: "2 500", unit: "сутки", badge: "Новинка", icon: "Drill",
    specs: ["6000 Вт", "Ø коронки до 400 мм", "Изм. угол наклона"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/e0fc1b59-3d94-4125-855d-1a6f8873979b.jpg"],
  },
  {
    id: 6, art: "CUT-001",
    name: "Бетонорез электрический Concrete SAW 400",
    category: "concrete", price: "2 000", unit: "сутки", badge: null, icon: "Scissors",
    specs: ["5500 Вт", "Диск 400 мм", "Рез 150 мм", "4700 об/мин"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/d9f9cbcc-9281-4229-8c27-4d1fc2fc9da3.png"],
  },
  {
    id: 7, art: "CUT-002",
    name: "Бетонорез кольцевой BHJ500 электрический",
    category: "concrete", price: "2 500", unit: "сутки", badge: null, icon: "Scissors",
    specs: ["Ø 520 мм", "Глубина реза 40 см", "Железобетон/мрамор"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/CUT-002.jpg"],
  },
  {
    id: 8, art: "CON-001",
    name: "Машина затирочная (вертолёт) TSS DMR1000L",
    category: "concrete", price: "2 500", unit: "сутки", badge: null, icon: "RefreshCw",
    specs: ["Loncin G200F 6.5 л.с.", "Ширина 900 мм", "Бензиновый"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/CON-001.jpg"],
  },
  {
    id: 9, art: "CON-002",
    name: "Бетономешалка Electrolite БМ-165 E",
    category: "concrete", price: "1 000", unit: "сутки", badge: null, icon: "RefreshCw",
    specs: ["800 Вт", "165 л / 123 л раствора", "Чугунный венец", "Вес 52 кг"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/CON-002.jpg"],
  },
  {
    id: 10, art: "CMP-001",
    name: "Вибронога ручная бензиновая TR72 4.8кВт 80кг",
    category: "compaction", price: "2 500", unit: "сутки", badge: null, icon: "ArrowDown",
    specs: ["80 кг", "4-такт. бензиновый 7.5 л.с.", "Глубина уплотнения 35 см", "Центробеж. сила 10 кН", "Плита 34.5×28.5 см"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/4609e806-66cb-4239-90c7-a421038a94cd.jpg"],
  },
  {
    id: 11, art: "CMP-002",
    name: "Виброплита Сплитстоун VS-244 90кг Loncin",
    category: "compaction", price: "1 200", unit: "сутки", badge: null, icon: "ArrowDown",
    specs: ["85 кг", "Loncin G160F 4.8 л.с.", "Глубина уплотнения 500 мм", "Центробеж. сила 13.5 кН", "Частота 93 Гц", "Бак 3.1 л / расход 1.4 л/ч"],
    images: [
      "https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/315939d2-09c1-4330-941c-c8b4cd60a238.jpg",
      "https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/f5823b99-1b0f-4c46-891e-86034f0f75a7.jpg",
    ],
  },
  {
    id: 12, art: "CMP-003",
    name: "Виброплита TOR-C 120кг",
    category: "compaction", price: "по запросу", unit: "сутки", badge: "Новинка", icon: "ArrowDown",
    specs: ["120 кг", "6.5 л.с.", "Макс. глубина уплотнения 300 мм"],
    images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/ece9314c-22dd-4704-b586-ef01e9ac7d94.jpg"],
  },
  // Виброплиты доп.
  { id: 13, art: "CMP-004", name: "Виброплита Grost VH 85C", category: "compaction", price: "1 800", unit: "сутки", badge: null, icon: "ArrowDown", specs: ["85 кг", "Loncin G160F 4.8 л.с.", "Глубина уплотнения 500 мм", "Центробеж. сила 13.5 кН", "Частота 93 Гц", "Бак 3.1 л / расход 1.4 л/ч"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/9818e2ec-f88a-410c-b6ac-447188025e87.jpg"] },
  { id: 14, art: "CMP-005", name: "Виброплита Сплитстоун VS-104 Loncin", category: "compaction", price: "1 500", unit: "сутки", badge: null, icon: "ArrowDown", specs: ["55 кг", "Loncin G160F 4.8 л.с.", "Глубина уплотнения 250 мм", "Частота 100 Гц", "Бак 3 л / расход 1.2 л/ч"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/989c0885-9eb0-4e18-963a-e2e6bf09a8c4.jpg"] },
  { id: 15, art: "CMP-006", name: "Виброплита реверсивная Patriot SVR 170 RS", category: "compaction", price: "3 300", unit: "сутки", badge: null, icon: "ArrowDown", specs: ["170 кг", "9 л.с.", "Глубина уплотнения 500 мм", "Бак 6 л", "Реверс"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/CMP-006.jpg"] },
  // Вибраторы для бетона
  { id: 16, art: "CON-003", name: "Портативный вибратор Zitrek ZKVD1500 1.5м", category: "concrete", price: "800", unit: "сутки", badge: null, icon: "Zap", specs: ["1500 Вт", "Вал 1.5 м", "Булава Ø35 мм", "50 Гц", "Вес 5.7 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/CON-003.jpg"] },
  { id: 17, art: "CON-004", name: "Вибратор для бетона Sturm CV71101", category: "concrete", price: "800", unit: "сутки", badge: null, icon: "Zap", specs: ["1000 Вт", "Вал 1 м", "Булава Ø32 мм", "Вес 3.86 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/CON-004.jpg"] },
  // Бурение/резка доп.
  { id: 18, art: "DRL-003", name: "Мотобур FUBAG FPB 52", category: "drilling", price: "1 200", unit: "сутки", badge: null, icon: "Drill", specs: ["1800 Вт / 2.45 л.с.", "Ø бура до 200 мм", "Глубина 80 см", "300 об/мин", "Вес 9.6 кг", "Бак 1 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/15e33fd3-22df-47e8-bfe7-45a4614d396b.jpg"] },
  { id: 19, art: "DRL-004", name: "Мотобур FUBAG FPB 71", category: "drilling", price: "1 400", unit: "сутки", badge: null, icon: "Drill", specs: ["2400 Вт", "Ø бура до 250 мм", "Глубина 80 см", "71 см³", "300 об/мин"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/DRL-004.png"] },
  { id: 20, art: "CUT-003", name: "Резчик швов Сплитстоун CS146 Loncin G200F", category: "concrete", price: "2 000", unit: "сутки", badge: null, icon: "Scissors", specs: ["5.5 л.с.", "Диск 400 мм", "Глубина реза 135 мм", "Вес 75 кг", "3030 об/мин"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/CUT-003.jpg"] },
  // Виброрейка
  { id: 21, art: "CON-005", name: "Бензиновая виброрейка GIKS Zongshen Z-35", category: "concrete", price: "1 500", unit: "сутки", badge: null, icon: "RefreshCw", specs: ["1100 Вт / 1.5 л.с.", "4-такт. Zongshen Z-35", "Тип плавающая", "Вес 17 кг", "Бак 0.63 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/CON-005.jpg"] },
  // Генераторы
  { id: 22, art: "PWR-001", name: "Бензиновый генератор Huter DY4000L", category: "power", price: "1 000", unit: "сутки", badge: null, icon: "Zap", specs: ["3 кВт / макс. 3.2 кВт", "220 В", "Бак 15 л", "Вес 40.3 кг", "Ручной старт"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/PWR-001.jpg"] },
  { id: 23, art: "PWR-002", name: "Бензиновый генератор Huter DY6500L", category: "power", price: "1 500", unit: "сутки", badge: null, icon: "Zap", specs: ["5 кВт / макс. 5.5 кВт", "220 В", "Бак 22 л", "Вес 74.5 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/15.jpg"] },
  { id: 24, art: "PWR-003", name: "Бензиновый генератор Huter DY8000L", category: "power", price: "1 800", unit: "сутки", badge: null, icon: "Zap", specs: ["6.5 кВт / макс. 7 кВт", "Расход 1.3 л/ч", "Вес 69.8 кг", "Масло 1.1 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/14.jpg"] },
  // Компрессоры
  { id: 25, art: "PWR-004", name: "Компрессор DENZEL BCV2200/100 ременной", category: "power", price: "1 500", unit: "сутки", badge: null, icon: "Wind", specs: ["2.2 кВт", "Ресивер 100 л", "370 л/мин", "8 бар", "Масляный", "2 выхода"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/16.jpg"] },
  { id: 26, art: "PWR-005", name: "Компрессор Aurora PASSAT-50 BLACK тихий 45л", category: "power", price: "1 200", unit: "сутки", badge: null, icon: "Wind", specs: ["2.9 кВт / 4.9 л.с.", "Ресивер 45 л", "500 л/мин", "8 бар", "Безмасляный", "Вес 38 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/17.jpg"] },
  // Вышки и лестницы
  { id: 27, art: "HGT-001", name: "Вышка-тура 1.0×2.0 высота 2.7м", category: "height", price: "600", unit: "сутки", badge: null, icon: "Layers", specs: ["Высота 2.7 м", "Ширина 1 м", "Длина помоста 2 м"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/HGT-001.jpg"] },
  { id: 28, art: "HGT-002", name: "Вышка-тура помост 1.2×2.0м высота 5.2м", category: "height", price: "900", unit: "сутки", badge: null, icon: "Layers", specs: ["Высота 5.2 м", "Помост 1.2×2.0 м", "Нагрузка 150 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/HGT-002.jpg"] },
  { id: 29, art: "HGT-003", name: "Лестница телескопическая Алюмет 2.2+2.2м", category: "height", price: "1 000", unit: "сутки", badge: null, icon: "Layers", specs: ["Длина 4.4 м", "Рабочая высота 5.4 м", "150 кг", "2×7 ступеней", "Вес 16.7 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/19.jpg"] },
  { id: 30, art: "HGT-004", name: "Лестница 3 секции Алюмет 9 ступеней 7.5м", category: "height", price: "1 000", unit: "сутки", badge: null, icon: "Layers", specs: ["Рабочая высота 8.5 м", "Нагрузка 120 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/20.jpg"] },
  { id: 31, art: "HGT-005", name: "Лестница 3×12 ступеней Gigant L-03 9.5м", category: "height", price: "1 200", unit: "сутки", badge: null, icon: "Layers", specs: ["Рабочая высота 11 м", "Нагрузка 120 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/21.jpg"] },
  { id: 32, art: "HGT-006", name: "Лестница-трансформер СИБРТЕХ 4×4 шарнирная", category: "height", price: "1 000", unit: "сутки", badge: null, icon: "Layers", specs: ["4×4 ступени", "Рабочая высота 5.15 м", "Нагрузка 120 кг", "Вес 12 кг", "Алюминий"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/22.jpg"] },
  // Садовая техника
  { id: 33, art: "GRD-001", name: "Газонокосилка Champion LM4122", category: "garden", price: "1 500", unit: "сутки", badge: null, icon: "Scissors", specs: ["2.2 кВт / 4-такт.", "Ширина 41 см", "Травосборник 40 л", "Высота 27–61 мм", "Вес 23 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/GRD-001.jpg"] },
  { id: 34, art: "GRD-002", name: "Электрическая газонокосилка Мобил К XME34", category: "garden", price: "1 200", unit: "сутки", badge: null, icon: "Scissors", specs: ["Электрическая", "Ширина 34 см"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/12.jpg"] },
  { id: 35, art: "GRD-003", name: "Культиватор Ресанта БМК-6.5", category: "garden", price: "1 700", unit: "сутки", badge: null, icon: "Tractor", specs: ["6.5 л.с. / 4-такт.", "Ширина 850 мм", "Глубина 300 мм", "Фрезы Ø300 мм", "Вес 46 кг", "Бак 3.6 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/23.jpg"] },
  { id: 36, art: "GRD-004", name: "Культиватор Ресанта БМК-7.0", category: "garden", price: "2 000", unit: "сутки", badge: null, icon: "Tractor", specs: ["7 л.с. / 4-такт.", "Ширина 900 мм", "Глубина 300 мм", "Бак 3.6 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/24.jpg"] },
  { id: 37, art: "GRD-005", name: "Мотоблок Huter MK-7800PL бензиновый 7.8 л.с.", category: "garden", price: "2 500", unit: "сутки", badge: null, icon: "Tractor", specs: ["7.8 л.с.", "Ширина 100 см", "Глубина 30 см", "3 вперёд/1 назад", "Вес 85 кг", "Бак 3.6 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/25.jpg"] },
  { id: 38, art: "GRD-006", name: "Электрический культиватор DAEWOO DAT 2200E", category: "garden", price: "1 300", unit: "сутки", badge: null, icon: "Tractor", specs: ["2000 Вт", "Ширина 470 мм", "Глубина 240 мм", "Вес 14.7 кг", "320 об/мин"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/26.jpg"] },
  { id: 39, art: "GRD-007", name: "Скарификатор бензиновый Champion GSC4840", category: "garden", price: "2 200", unit: "сутки", badge: null, icon: "Scissors", specs: ["7 л.с. / 5.15 кВт", "Ширина 400 мм", "Глубина -5…+15 мм", "Травосборник 40 л", "Вес 29 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/GRD-007.jpg"] },
  { id: 40, art: "GRD-008", name: "Скарификатор электрический Sturm SE1738", category: "garden", price: "1 500", unit: "сутки", badge: null, icon: "Scissors", specs: ["2000 Вт / 2.72 л.с.", "Ширина 38 см", "Глубина -10…+5 мм", "Травосборник 55 л", "Вес 14 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/GRD-008.jpg"] },
  { id: 41, art: "GRD-009", name: "Воздуходув-пылесос бензиновый PATRIOT BG 225", category: "garden", price: "800", unit: "сутки", badge: null, icon: "Wind", specs: ["0.735 кВт / 2-такт.", "Обдув + всасывание + измельчение", "Мусоросборник 40 л", "Вес 7.2 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/GRD-009.jpg"] },
  { id: 42, art: "GRD-010", name: "Садовый измельчитель Jonco 5000", category: "garden", price: "2 500", unit: "сутки", badge: null, icon: "Scissors", specs: ["6.5 л.с.", "Ветки до Ø6 см", "До 300 кг/ч", "3 ножа", "Вес 30 кг", "Бак 3.6 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/GRD-010.jpg"] },
  { id: 43, art: "GRD-011", name: "Садовый измельчитель Дровосек МР300", category: "garden", price: "2 500", unit: "сутки", badge: null, icon: "Scissors", specs: ["6.5 л.с.", "Ветки до Ø6 см", "До 300 кг/ч", "2 ножа", "Вес 60 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/GRD-011.jpg"] },
  { id: 44, art: "GRD-012", name: "Триммер Champion Т433S-2", category: "garden", price: "1 000", unit: "сутки", badge: null, icon: "Scissors", specs: ["1.7 л.с. / 2-такт.", "Ширина лески 400 мм", "Леска Ø2.4 мм / диск", "U-образная ручка"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/GRD-012.jpg"] },
  { id: 45, art: "GRD-013", name: "Снегоуборщик VILLARTEC WB 7066E", category: "garden", price: "2 500", unit: "сутки", badge: "Сезон", icon: "Wind", specs: ["7 л.с. Loncin", "Захват 66.3×54 см", "Дальность 11 м", "6 вперёд/2 назад", "Вес 88 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/GRD-013.jpg"] },
  // Насосы
  { id: 46, art: "PMP-001", name: "Дренажный насос Вихрь ДН-1100Н", category: "pumps", price: "800", unit: "сутки", badge: null, icon: "Droplets", specs: ["1100 Вт", "Подъём 10 м", "Погружение 8 м", "258 л/мин", "Ø частиц до 35 мм"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/PMP-001.jpg"] },
  { id: 47, art: "PMP-002", name: "Мотопомпа FUBAG PG 950T для грязной воды", category: "pumps", price: "1 300", unit: "сутки", badge: null, icon: "Droplets", specs: ["5100 Вт / 7 л.с.", "1300 л/мин", "Подъём 26 м", "Всасывание 8 м", "Ø частиц 30 мм", "Вес 34 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/PMP-002.jpg"] },
  // Электроинструмент
  { id: 48, art: "ELT-001", name: "Лобзик Makita 4326", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "Scissors", specs: ["450 Вт", "Дерево 65 мм", "Металл 6 мм", "Ход пилки 18 мм", "Вес 1.8 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/27.jpg"] },
  { id: 49, art: "ELT-002", name: "Перфоратор Sturm RH2538V SDS-MAX", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "Hammer", specs: ["1900 Вт", "SDS-MAX", "Удар 10 Дж", "Бетон Ø40 мм", "2 режима"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/43.jpg"] },
  { id: 50, art: "ELT-003", name: "Перфоратор Вихрь П-1400к SDS-Plus", category: "power_tools", price: "600", unit: "сутки", badge: null, icon: "Hammer", specs: ["1400 Вт", "SDS-Plus", "Удар 5 Дж", "Бетон Ø32 мм", "Дерево Ø40 мм", "Вес 5 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-003.jpg"] },
  { id: 51, art: "ELT-004", name: "Миксер электрический ЗУБР МРД-1400", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "RefreshCw", specs: ["1400 Вт", "Патрон М27", "Регулировка оборотов", "Вес 7.1 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/45.jpg"] },
  { id: 52, art: "ELT-005", name: "Отбойный молоток P.I.T. GSH25-C1 20Дж", category: "power_tools", price: "900", unit: "сутки", badge: null, icon: "Hammer", specs: ["1500 Вт", "SDS-MAX", "20 Дж", "4100 уд/мин", "Антивибрация", "Вес 5.5 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/a509058a-b902-42ca-a400-cb3ddeb61d62.jpeg"] },
  { id: 53, art: "ELT-006", name: "Отбойный молоток P.I.T. GSH65-C2 45Дж", category: "power_tools", price: "1 000", unit: "сутки", badge: null, icon: "Hammer", specs: ["1700 Вт", "45 Дж", "Шестигранник 30 мм", "Вес 22.3 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/33.jpg"] },
  { id: 54, art: "ELT-007", name: "Отбойный молоток P.I.T. GSH90-C2 75Дж", category: "power_tools", price: "1 100", unit: "сутки", badge: null, icon: "Hammer", specs: ["2500 Вт", "75 Дж", "Шестигранник", "Вес 18.6 кг", "Бетон/асфальт/мёрзлый грунт"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/b4580033-e2e4-4276-8f88-58acb0800146.jpeg"] },
  { id: 55, art: "ELT-008", name: "Циркулярная пила Sturm CS51185", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "Scissors", specs: ["1600 Вт", "Диск 185 мм", "Рез 90° — 59 мм", "Рез 45° — 38 мм", "5500 об/мин"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/42.jpg"] },
  { id: 56, art: "ELT-009", name: "Монтажная пила DCA AJG06-355", category: "power_tools", price: "1 000", unit: "сутки", badge: null, icon: "Scissors", specs: ["2200 Вт", "Диск 355 мм", "Ширина реза 130 мм", "4300 об/мин"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/38.jpg"] },
  { id: 57, art: "ELT-010", name: "Монтажная пила DEWALT D28730", category: "power_tools", price: "1 000", unit: "сутки", badge: null, icon: "Scissors", specs: ["2300 Вт", "Диск 355 мм", "Ширина реза 137 мм", "Маятниковый мех.", "3800 об/мин"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/39.jpg"] },
  { id: 58, art: "ELT-011", name: "Торцовочная пила ПУЛЬСАР ПТН 210-1900", category: "power_tools", price: "1 200", unit: "сутки", badge: null, icon: "Scissors", specs: ["1900 Вт", "Диск 210 мм", "Ширина реза 300 мм", "Лазер + подсветка", "5000 об/мин", "Протяжка"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/40.jpg"] },
  { id: 59, art: "ELT-012", name: "Торцовочная пила ПУЛЬСАР ПТН 305-2000", category: "power_tools", price: "1 400", unit: "сутки", badge: null, icon: "Scissors", specs: ["2000 Вт", "Диск 305 мм", "Ширина реза 335 мм", "Лазер + подсветка", "3800 об/мин", "Протяжка"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/41.jpg"] },
  { id: 60, art: "ELT-013", name: "Штроборез электрический ЗУБР ЗШ-П30-1400", category: "power_tools", price: "1 000", unit: "сутки", badge: null, icon: "Scissors", specs: ["1400 Вт", "Диск 125 мм", "Глубина 30 мм", "Ширина паза 3–30 мм", "Плавный пуск"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-013.jpg"] },
  { id: 61, art: "ELT-014", name: "Штроборез электрический ЗУБР ЗШ-П65-2600", category: "power_tools", price: "1 300", unit: "сутки", badge: null, icon: "Scissors", specs: ["2600 Вт", "2 диска 230 мм", "Глубина 65 мм", "Ширина паза 4.3–40 мм", "6000 об/мин"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-014.jpg"] },
  { id: 62, art: "ELT-015", name: "Рубанок электрический Пульсар РЭ 110-1300", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "Wrench", specs: ["1300 Вт", "Ширина 110 мм", "Глубина 0–3 мм", "Выборка четверти 14 мм"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-015.jpg"] },
  { id: 63, art: "ELT-016", name: "Лобзик электрический (ручной)", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "Scissors", specs: ["Электрический"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-016.jpg"] },
  { id: 64, art: "ELT-017", name: "Дрель-шуруповёрт ИНТЕРСКОЛ ДА-13/18ВК 18В", category: "power_tools", price: "400", unit: "сутки", badge: null, icon: "Wrench", specs: ["18 В", "45 Нм", "2 акк. 1.5 А·ч", "Металл Ø13 мм", "Дерево Ø36 мм"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-017.jpg"] },
  { id: 65, art: "ELT-018", name: "Гайковёрт аккумуляторный 1800 Нм Makita", category: "power_tools", price: "1 000", unit: "сутки", badge: null, icon: "Wrench", specs: ["40 В XGT", "1800 Нм", "Квадрат 3/4\"", "Бесщёточный", "2500 уд/мин", "Вес 3.1 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-018.jpg"] },
  { id: 66, art: "ELT-019", name: "Гвоздезабивной пистолет TOUA GSN50E аккум.", category: "power_tools", price: "1 500", unit: "сутки", badge: null, icon: "Hammer", specs: ["7.2 В", "Гвозди 15–40 мм по бетону", "120 уд/мин", "Магазин 30 шт", "2 акк."], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-019.jpg"] },
  { id: 67, art: "ELT-020", name: "Пневматический нейлер Denzel PN2190 50–90мм", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "Hammer", specs: ["Гвозди SN21 50–90 мм", "7.5 атм", "Магазин 50 шт", "Штуцер 1/4\""], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-020.jpg"] },
  { id: 68, art: "ELT-021", name: "Шлифмашина для стен Aspro C3 2650 Ø225мм", category: "power_tools", price: "1 200", unit: "сутки", badge: null, icon: "RefreshCw", specs: ["750 Вт", "Ø225 мм", "1000–1850 об/мин", "Кабель 4 м", "Вес 4.7 кг", "Рез. М14"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-021.jpg"] },
  { id: 69, art: "ELT-022", name: "Эксцентриковая шлифмашина Пульсар ЭШМ 125-350С", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "RefreshCw", specs: ["350 Вт", "Ø125 мм", "Амплитуда 2.2 мм", "Регулировка об.", "Вес 1.5 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-022.jpg"] },
  { id: 70, art: "ELT-023", name: "Паркетошлифовальная машина МИСОМ СО-206.1", category: "power_tools", price: "2 000", unit: "сутки", badge: null, icon: "RefreshCw", specs: ["2200 Вт", "Ширина 200 мм", "50 м²/ч", "Лента", "Вес 75 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-023.jpg"] },
  { id: 71, art: "ELT-024", name: "Плиткорез рельсовый 1200мм DERZHI PROFESSIONAL", category: "power_tools", price: "1 300", unit: "сутки", badge: null, icon: "Scissors", specs: ["Рез 1200 мм", "Толщина плитки до 14 мм", "Глубина 15 мм", "Лазер"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/46.jpg"] },
  { id: 72, art: "ELT-025", name: "Плиткорез ручной Diam Extra Line twin-850L", category: "power_tools", price: "1 000", unit: "сутки", badge: null, icon: "Scissors", specs: ["Рез 850 мм", "Глубина 15 мм", "Ролик Ø22 мм", "Вес 14 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-025.jpg"] },
  { id: 73, art: "ELT-026", name: "Виброприсоска для плитки Diam EX-16V", category: "power_tools", price: "600", unit: "сутки", badge: null, icon: "Layers", specs: ["16.8 В", "Ø присоски 120 мм", "До 30 кг", "Плитка до 60×60 см", "2 акк."], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/49.jpg"] },
  { id: 74, art: "ELT-027", name: "Пресс-инструмент аксиальный PEX FT1241A-18", category: "power_tools", price: "1 000", unit: "сутки", badge: null, icon: "Wrench", specs: ["Насадки 16/20/25/32 мм", "Расширитель в комплекте", "Ножницы и резак", "Кейс"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/47.jpg"] },
  { id: 75, art: "ELT-028", name: "Аппарат для сварки ПП труб Ресанта АСПТ-1000", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "Zap", specs: ["1000 Вт", "Трубы 20–63 мм", "50–300 °С", "ПВД/ПНД/ПП/ПВДФ"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-028.jpg"] },
  { id: 76, art: "ELT-029", name: "Опрессовщик МЕГЕОН 98025", category: "power_tools", price: "800", unit: "сутки", badge: null, icon: "Wrench", specs: ["До 24.7 бар", "G1/2", "Бак 5.4 л", "До 50 °С", "Ротор сухой"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-029.jpg"] },
  { id: 77, art: "ELT-030", name: "Рейсмусовый станок ЗУБР РС-305 305мм 2000Вт", category: "power_tools", price: "2 500", unit: "сутки", badge: null, icon: "Wrench", specs: ["2000 Вт", "Ширина 305 мм", "Макс. толщина 160 мм", "Глубина строгания 3 мм", "Ø пылесборника 45/50 мм"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-030.jpeg"] },
  { id: 78, art: "ELT-031", name: "Ручной станок для гибки арматуры Afacan 12PT", category: "power_tools", price: "700", unit: "сутки", badge: null, icon: "Wrench", specs: ["Арматура Ø12 мм", "Ручной привод"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/ELT-031.jpg"] },
  // Сварка и покраска
  { id: 79, art: "WLD-001", name: "Сварочный полуавтомат Aurora PRO OVERMAN 200 + баллон", category: "welding", price: "1 800", unit: "сутки", badge: null, icon: "Zap", specs: ["40–200 А", "5.6 кВт", "220 В", "Проволока 0.6–1 мм", "IP21"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/WLD-001.jpg"] },
  { id: 80, art: "WLD-002", name: "Сварочный аппарат Foxweld VARTEG 230", category: "welding", price: "800", unit: "сутки", badge: null, icon: "Zap", specs: ["20–230 А", "6.8 кВт", "Электрод 1.6–4 мм", "Min вход 140 В"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/WLD-002.jpg"] },
  { id: 81, art: "WLD-003", name: "Окрасочный аппарат безвоздушный AVS-5000M2", category: "welding", price: "2 500", unit: "сутки", badge: null, icon: "Droplets", specs: ["3 кВт", "300 л/мин", "250 бар", "Шланг до 75 м", "Сопло 0.025\"", "Бак 5 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/13.jpg"] },
  // Прочее
  { id: 82, art: "OTH-001", name: "Нивелир оптический ADA BASIS + штатив", category: "other", price: "1 200", unit: "сутки", badge: null, icon: "Crosshair", specs: ["20× увеличение", "Ø объектива 38 мм", "Погрешность 2.5 мм/км", "Резьба 5/8\""], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/18.jpg"] },
  { id: 83, art: "OTH-002", name: "Тепловая пушка газовая Gigant GH10F", category: "other", price: "900", unit: "сутки", badge: null, icon: "Flame", specs: ["10 кВт", "До 100 м²", "0.73 кг/ч газа", "320 м³/ч", "220 В / 25 Вт вентилятор"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/30.jpg"] },
  { id: 84, art: "OTH-003", name: "Тепловая пушка дизельная Ресанта ТДП-20000", category: "other", price: "1 000", unit: "сутки", badge: null, icon: "Flame", specs: ["20 кВт", "До 200 м²", "Бак 12 л", "1.58 л/ч", "900 м³/ч", "Вес 14 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/31.jpg"] },
  { id: 85, art: "OTH-004", name: "Осушитель воздуха промышленный JHAVD-120D", category: "other", price: "2 500", unit: "сутки", badge: null, icon: "Wind", specs: ["120 л/сут", "До 200 м²", "1.45 кВт", "1000 м³/ч", "Дренажная трубка"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/f34e88d0-4d76-48b1-8e90-e2c89fc1929d.jpeg"] },
  { id: 86, art: "OTH-005", name: "Бензопила Champion 256-18 45см", category: "other", price: "1 000", unit: "сутки", badge: null, icon: "Scissors", specs: ["3.4 л.с. / 2-такт.", "Шина 45 см", "Шаг 0.325\"", "54 см³", "Вес 5.6 кг"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/36.jpg"] },
  { id: 87, art: "OTH-006", name: "Бензопила DAEWOO DACS 5820XT 50см", category: "other", price: "1 000", unit: "сутки", badge: null, icon: "Scissors", specs: ["4.5 л.с. / 2-такт.", "Шина 50 см", "Шаг 0.325\"", "76 звеньев"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/37.jpg"] },
  { id: 88, art: "OTH-007", name: "Бензиновый копёр ТСС TSS-95GPD", category: "other", price: "2 500", unit: "сутки", badge: null, icon: "Hammer", specs: ["1700 Вт / 2.31 л.с.", "Удар 20–55 Дж", "Ø до 100 мм", "Вес 20.5 кг", "Бак 1.3 л"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/48.jpg"] },
  { id: 89, art: "OTH-008", name: "Складной кран-гусь гидравлический 2.5т", category: "other", price: "1 000", unit: "сутки", badge: null, icon: "ArrowUp", specs: ["Грузоподъёмность 2.5 т", "Складной", "Гидравлика"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/OTH-008.jpg"] },
  { id: 90, art: "OTH-009", name: "Рохля гидравлическая 2 тонны", category: "other", price: "1 000", unit: "сутки", badge: null, icon: "ArrowUp", specs: ["2 т", "Гидравлический привод"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/OTH-009.jpg"] },
  { id: 91, art: "OTH-010", name: "Мойка высокого давления HUTER W195-PRO", category: "other", price: "1 200", unit: "сутки", badge: null, icon: "Droplets", specs: ["2500 Вт", "130–195 бар", "420 л/ч", "Шланг 8 м"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/28.jpg"] },
  { id: 92, art: "OTH-011", name: "Мойка высокого давления DAEWOO DAW 500", category: "other", price: "1 000", unit: "сутки", badge: null, icon: "Droplets", specs: ["2.1 кВт", "155 бар", "480 л/ч", "Шланг 6 м", "Грязевая фреза"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/OTH-011.jpg"] },
  { id: 93, art: "OTH-012", name: "Мойка высокого давления Huter W200i", category: "other", price: "1 200", unit: "сутки", badge: null, icon: "Droplets", specs: ["2500 Вт", "130–195 бар", "500 л/ч", "Шланг 8 м"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog/29.jpg"] },
  { id: 94, art: "OTH-013", name: "Моющий пылесос Arnica Vira ET12200 (влажная/сухая)", category: "other", price: "1 500", unit: "сутки", badge: null, icon: "Wind", specs: ["Влажная + сухая уборка", "5 насадок", "Подача шампуня"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/OTH-013.jpg"] },
  { id: 95, art: "OTH-014", name: "Промышленный пылесос Daewoo DAVC 2516S 25л", category: "other", price: "1 100", unit: "сутки", badge: null, icon: "Wind", specs: ["1250 Вт", "Бак 25 л", "Шланг Ø32 мм / 3.5 м", "Кабель 7.5 м", "Розетка для инстр."], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/OTH-014.jpg"] },
  { id: 96, art: "OTH-015", name: "Промышленный пылесос Metabo ASA 25 L PC", category: "other", price: "1 100", unit: "сутки", badge: null, icon: "Wind", specs: ["1250 Вт", "Бак 25 л", "Шланг Ø32 мм / 3.5 м", "Кабель 7.5 м"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/OTH-015.jpg"] },
  { id: 97, art: "OTH-016", name: "Домкрат автомобильный ЗУБР", category: "other", price: "900", unit: "сутки", badge: null, icon: "ArrowUp", specs: ["Гидравлический", "Подъём авто"], images: ["https://cdn.poehali.dev/projects/a75d3d4b-fdc5-4860-b617-00ca6b3feb56/bucket/catalog2/OTH-016.jpg"] },
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
            <div className="inline-flex items-center gap-2 bg-[#8B1A2F]/30 rounded-full px-5 py-2 mb-8" style={{boxShadow: '0 0 18px 4px rgba(139,26,47,0.55), 0 0 6px 1px rgba(209,64,96,0.35)'}}>
              <div className="w-2 h-2 rounded-full bg-[#D14060] animate-pulse" />
              <span className="text-[#ffb0bc] text-base tracking-wide font-medium">
                Надёжный партнёр в сфере аренды
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 tracking-wide" style={{textShadow: '2px 3px 12px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.9)'}}>
              КОМПАНИЯ<br />
              <span className="font-russo text-[#8B1A2F]" style={{textShadow: '2px 3px 14px rgba(0,0,0,0.95), 0 0 30px rgba(139,26,47,0.5)'}}>РЕНТМАСТЕР</span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-3 max-w-2xl" style={{textShadow: '1px 2px 8px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.95)'}}>
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
              { value: "300+", label: "позиций оборудования", truck: false },
              { value: "3 года", label: "на рынке", truck: false },
              { value: "1 сутки", label: "мин. срок аренды", truck: false },
              { value: "", label: "быстрая доставка", truck: true },
            ].map((s) => (
              <div key={s.label} className="text-center flex flex-col items-center">
                {s.truck ? (
                  <Icon name="Truck" size={28} className="text-white mb-0.5" />
                ) : (
                  <div className="font-oswald text-2xl text-white font-bold">{s.value}</div>
                )}
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