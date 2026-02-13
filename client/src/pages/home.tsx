import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bike,
  Car,
  Check,
  ChevronRight,
  Clock,
  Forklift,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const cities = ["Калуга", "Тула", "Обнинск", "Область до 200 км"] as const;
const vehicleTypes = [
  { id: "car", label: "Автомобиль", icon: Car },
  { id: "moto", label: "Мотоцикл", icon: Bike },
  { id: "spec", label: "Спецтехника", icon: Forklift },
] as const;

type VehicleTypeId = (typeof vehicleTypes)[number]["id"];

type Testimonial = {
  name: string;
  city: string;
  text: string;
  rating: 5 | 4;
  deal: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Андрей, 34",
    city: "Калуга",
    text: "Оценили по фото, через час приехал эвакуатор. Деньги сразу, без попыток сбить цену на месте.",
    rating: 5,
    deal: "Выкуп авто после ДТП",
  },
  {
    name: "Ольга, 29",
    city: "Обнинск",
    text: "Продала мотоцикл за вечер. Всё чётко: договор, перевод, забрали сами. Я только ключи отдала.",
    rating: 5,
    deal: "Выкуп мото",
  },
  {
    name: "Игорь, 41",
    city: "Тула",
    text: "Нужны были быстрые деньги, спецтехнику забрали в тот же день. Удобно и по-честному.",
    rating: 5,
    deal: "Выкуп спецтехники",
  },
];

function SectionTitle(props: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-foreground/80 backdrop-blur"
        data-testid="text-eyebrow"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="uppercase">{props.eyebrow}</span>
      </div>
      <h2
        className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-5xl"
        data-testid="text-section-title"
      >
        {props.title}
      </h2>
      {props.subtitle ? (
        <p
          className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          data-testid="text-section-subtitle"
        >
          {props.subtitle}
        </p>
      ) : null}
    </div>
  );
}

function GlowBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="noise absolute inset-0 opacity-60" />
      <div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,186,25,.55),rgba(255,186,25,0)_60%)] blur-2xl"
        aria-hidden
      />
      <div
        className="absolute -right-56 top-16 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(165,75,255,.55),rgba(165,75,255,0)_62%)] blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-[-280px] left-[10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,213,215,.45),rgba(30,213,215,0)_65%)] blur-3xl"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent"
        aria-hidden
      />
    </div>
  );
}

function Nav() {
  return (
    <div className="sticky top-0 z-40 border-b border-border/60 bg-background/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a
          href="#top"
          className="group inline-flex items-center gap-3"
          data-testid="link-logo"
        >
          <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-border/60 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,.04)_inset]">
            <div className="absolute -inset-1 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,186,25,.45),transparent_60%)] blur" />
            <div className="relative text-sm font-extrabold tracking-tight text-foreground">
              A24
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight" data-testid="text-brand">
              Автовыкуп 24
            </div>
            <div
              className="text-xs font-semibold tracking-wide text-muted-foreground"
              data-testid="text-brand-sub"
            >
              Калуга • Тула • Обнинск + 200 км
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#services"
            className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground"
            data-testid="link-services"
          >
            Услуги
          </a>
          <a
            href="#benefits"
            className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground"
            data-testid="link-benefits"
          >
            Преимущества
          </a>
          <a
            href="#reviews"
            className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground"
            data-testid="link-reviews"
          >
            Отзывы
          </a>
          <a
            href="#contacts"
            className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground"
            data-testid="link-contacts"
          >
            Контакты
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+79990000000"
            className="hidden items-center gap-2 rounded-full border border-border/60 bg-white/5 px-4 py-2 text-sm font-extrabold tracking-tight text-foreground/90 shadow-sm transition hover:bg-white/10 md:inline-flex"
            data-testid="link-phone"
          >
            <Phone className="h-4 w-4" />
            +7 (999) 000-00-00
          </a>
          <Button className="rounded-full" asChild data-testid="button-cta-nav">
            <a href="#lead">Оценить за 10 минут</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const stats = useMemo(
    () => [
      { label: "оценка", value: "10 мин" },
      { label: "выезд эвакуатора", value: "0 ₽" },
      { label: "регион", value: "200 км" },
    ],
    [],
  );

  return (
    <section id="top" className="relative overflow-hidden">
      <GlowBg />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.25fr_.9fr] md:px-6 md:py-20">
        <div>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-[0.18em] text-foreground/85 backdrop-blur"
            data-testid="badge-hero"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            СРОЧНЫЙ ВЫКУП • ДЕНЬГИ СЕГОДНЯ
          </motion.div>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mt-6 text-balance text-4xl font-extrabold tracking-tight md:text-6xl"
            data-testid="text-hero-title"
          >
            Выкуп авто, мото и спецтехники
            <span className="block text-stroke text-transparent bg-clip-text bg-[linear-gradient(90deg,rgba(255,186,25,1),rgba(30,213,215,1),rgba(165,75,255,1))] glow">
              Калуга • Тула • Обнинск
            </span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            data-testid="text-hero-subtitle"
          >
            Оценка по фото/видео, честная цена, оформление быстро. Бесплатно приедем
            в радиусе до 200 км и заберём на эвакуаторе, если нужно.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="rounded-full" asChild data-testid="button-hero-primary">
              <a href="#lead" className="group inline-flex items-center gap-2">
                Получить оценку
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full bg-white/5 text-foreground hover:bg-white/10"
              asChild
              data-testid="button-hero-secondary"
            >
              <a href="tel:+79990000000" className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Позвонить
              </a>
            </Button>

            <div className="ml-0 flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-4 py-3 text-xs font-semibold text-foreground/85 backdrop-blur md:ml-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span data-testid="text-hero-safe">Договор • Без скрытых комиссий</span>
            </div>
          </motion.div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3" data-testid="grid-hero-stats">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-white/5 px-4 py-4 shadow-sm backdrop-blur"
                data-testid={`card-stat-${s.label}`}
              >
                <div className="text-lg font-extrabold tracking-tight text-foreground">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground"
            data-testid="text-hero-seo"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-2">
              <MapPin className="h-4 w-4 text-primary" />
              выкуп авто в Калуге
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-2">
              <MapPin className="h-4 w-4 text-primary" />
              выкуп авто в Туле
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-2">
              <MapPin className="h-4 w-4 text-primary" />
              выкуп авто в Обнинске
            </span>
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 }}
            className="relative rounded-[28px] border border-border/60 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,.45)] backdrop-blur"
            data-testid="card-hero-lead"
          >
            <div className="absolute -inset-1 rounded-[30px] bg-[linear-gradient(135deg,rgba(255,186,25,.35),rgba(30,213,215,.18),rgba(165,75,255,.25))] blur" />
            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-extrabold tracking-tight" data-testid="text-lead-title">
                    Оценка за 10 минут
                  </div>
                  <div className="mt-1 text-xs font-semibold text-muted-foreground" data-testid="text-lead-sub">
                    Оставьте контакты — перезвоним и скажем цену
                  </div>
                </div>
                <div className="floaty grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                  <Clock className="h-5 w-5" />
                </div>
              </div>

              <LeadForm />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
                <div className="inline-flex items-center gap-2" data-testid="text-lead-note-1">
                  <Check className="h-4 w-4 text-accent" />
                  Без спама
                </div>
                <div className="inline-flex items-center gap-2" data-testid="text-lead-note-2">
                  <Check className="h-4 w-4 text-accent" />
                  Можно в мессенджер
                </div>
                <div className="inline-flex items-center gap-2" data-testid="text-lead-note-3">
                  <Check className="h-4 w-4 text-accent" />
                  Работаем ежедневно
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border/60 bg-white/5 p-4 backdrop-blur" data-testid="card-hero-mini-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                Бесплатный эвакуатор
              </div>
              <div className="mt-2 text-sm font-extrabold tracking-tight">Вывозим сами</div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/5 p-4 backdrop-blur" data-testid="card-hero-mini-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Юридически чисто
              </div>
              <div className="mt-2 text-sm font-extrabold tracking-tight">Договор + оплата</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState<(typeof cities)[number]>("Калуга");
  const [vehicleType, setVehicleType] = useState<VehicleTypeId>("car");
  const [comment, setComment] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена",
      description: "Мы перезвоним в ближайшее время и назовём цену.",
    });

    setName("");
    setPhone("");
    setCity("Калуга");
    setVehicleType("car");
    setComment("");
  };

  return (
    <form id="lead" onSubmit={onSubmit} className="mt-5 grid gap-3" data-testid="form-lead">
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          className="h-11 rounded-2xl border-border/60 bg-background/30"
          data-testid="input-name"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          inputMode="tel"
          className="h-11 rounded-2xl border-border/60 bg-background/30"
          data-testid="input-phone"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Select value={city} onValueChange={(v) => setCity(v as (typeof cities)[number])}>
          <SelectTrigger className="h-11 rounded-2xl border-border/60 bg-background/30" data-testid="select-city">
            <SelectValue placeholder="Город" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c} data-testid={`option-city-${c}`}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={vehicleType} onValueChange={(v) => setVehicleType(v as VehicleTypeId)}>
          <SelectTrigger className="h-11 rounded-2xl border-border/60 bg-background/30" data-testid="select-vehicle">
            <SelectValue placeholder="Тип техники" />
          </SelectTrigger>
          <SelectContent>
            {vehicleTypes.map((t) => (
              <SelectItem key={t.id} value={t.id} data-testid={`option-vehicle-${t.id}`}>
                <div className="flex items-center gap-2">
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий (марка/модель, год, состояние)"
        className="min-h-24 rounded-2xl border-border/60 bg-background/30"
        data-testid="textarea-comment"
      />

      <Button type="submit" size="lg" className="group h-12 rounded-2xl" data-testid="button-submit">
        Отправить и получить цену
        <ChevronRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
      </Button>

      <div className="text-xs font-semibold text-muted-foreground" data-testid="text-privacy">
        Нажимая кнопку, вы соглашаетесь на обработку данных для обратной связи.
      </div>
    </form>
  );
}

function Services() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Что выкупаем"
          title="Выкуп любой техники — быстро и выгодно"
          subtitle="Авто, мотоциклы, спецтехника. На ходу, после ДТП, с пробегом и без — оценим честно и выкупим сегодня."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {vehicleTypes.map((t) => (
            <motion.div
              key={t.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Card
                className="group relative overflow-hidden rounded-[28px] border-border/60 bg-white/5 p-6 shadow-sm backdrop-blur"
                data-testid={`card-service-${t.id}`}
              >
                <div className="absolute -inset-px bg-[radial-gradient(circle_at_20%_20%,rgba(255,186,25,.20),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(165,75,255,.18),transparent_55%),radial-gradient(circle_at_60%_90%,rgba(30,213,215,.16),transparent_60%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                      <t.icon className="h-6 w-6" />
                    </div>
                    <div className="text-xs font-extrabold tracking-[0.18em] text-muted-foreground">
                      ВЫКУП
                    </div>
                  </div>
                  <div className="mt-4 text-xl font-extrabold tracking-tight" data-testid={`text-service-title-${t.id}`}>
                    {t.label}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid={`text-service-desc-${t.id}`}>
                    Оценка по фото/видео, выезд, оформление. Работаем по Калуге, Туле, Обнинску и области.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-foreground">
                    Узнать цену
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const prefersReducedMotion = useReducedMotion();
  const items = [
    {
      icon: Truck,
      title: "Бесплатный вывоз на эвакуаторе",
      text: "Если техника не на ходу — заберём сами. Вы не тратите время и деньги.",
    },
    {
      icon: Clock,
      title: "Быстрая оценка",
      text: "Цена за 10 минут по фото/видео. Без долгих ожиданий и пустых созвонов.",
    },
    {
      icon: ShieldCheck,
      title: "Честные цены",
      text: "Без “сюрпризов” на месте. Прозрачная логика оценки и договор.",
    },
    {
      icon: Check,
      title: "Максимум удобства",
      text: "Выезд по региону до 200 км, помощь с документами, оплата сразу.",
    },
  ];

  return (
    <section id="benefits" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Почему мы"
          title="Агрессивно быстро. Максимально удобно."
          subtitle="Мы настроены на сделку: оцениваем быстро, приезжаем сами, оформляем и платим сразу."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <motion.div
              key={it.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Card
                className="relative overflow-hidden rounded-[28px] border-border/60 bg-white/5 p-6 backdrop-blur"
                data-testid={`card-benefit-${it.title}`}
              >
                <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,186,25,.25),transparent_60%)] blur-2xl" />
                <div className="relative flex gap-4">
                  <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <it.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold tracking-tight" data-testid={`text-benefit-title-${it.title}`}>
                      {it.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid={`text-benefit-desc-${it.title}`}>
                      {it.text}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] border border-border/60 bg-[linear-gradient(135deg,rgba(255,186,25,.18),rgba(30,213,215,.10),rgba(165,75,255,.14))] p-6 shadow-[0_25px_80px_rgba(0,0,0,.35)]">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-sm font-extrabold tracking-[0.18em] text-foreground/80">ГЕОГРАФИЯ</div>
              <div className="mt-2 text-2xl font-extrabold tracking-tight" data-testid="text-geo-title">
                Калуга • Тула • Обнинск + область до 200 км
              </div>
              <div className="mt-2 text-sm font-semibold text-muted-foreground" data-testid="text-geo-sub">
                Приезжаем на осмотр и забираем технику — вы не привязаны к офису.
              </div>
            </div>
            <Button size="lg" className="rounded-full" asChild data-testid="button-geo-cta">
              <a href="#lead" className="inline-flex items-center gap-2">
                Оценить сейчас <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="reviews" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Отзывы"
          title="Слова клиентов — лучший аргумент"
          subtitle={`Мы не обещаем «золотые горы». Мы делаем сделку быстро, чисто и по-честному.`}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.04 }}
            >
              <Card
                className="relative overflow-hidden rounded-[28px] border-border/60 bg-white/5 p-6 backdrop-blur"
                data-testid={`card-review-${idx}`}
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(165,75,255,.22),transparent_60%)] blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-extrabold" data-testid={`text-review-name-${idx}`}>
                        {t.name}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-muted-foreground" data-testid={`text-review-city-${idx}`}>
                        {t.city} • {t.deal}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1" data-testid={`rating-${idx}`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85" data-testid={`text-review-text-${idx}`}>
                    {t.text}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  const offices = [
    {
      city: "Калуга",
      address: "ул. Примерная, 12",
      phone: "+7 (999) 000-00-00",
      mapQuery: "Калуга, улица Примерная 12",
    },
    {
      city: "Тула",
      address: "пр-т Примерный, 7",
      phone: "+7 (999) 000-00-00",
      mapQuery: "Тула, проспект Примерный 7",
    },
    {
      city: "Обнинск",
      address: "ул. Примерная, 3",
      phone: "+7 (999) 000-00-00",
      mapQuery: "Обнинск, улица Примерная 3",
    },
  ];

  return (
    <section id="contacts" className="relative pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Контакты"
          title="Офисы и быстрый выезд по области"
          subtitle="Звоните или оставляйте заявку — подскажем цену и приедем на осмотр."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {offices.map((o) => (
            <Card
              key={o.city}
              className="rounded-[28px] border-border/60 bg-white/5 p-6 backdrop-blur"
              data-testid={`card-office-${o.city}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-extrabold" data-testid={`text-office-city-${o.city}`}>
                  {o.city}
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-3 text-sm font-semibold text-muted-foreground" data-testid={`text-office-address-${o.city}`}>
                {o.address}
              </div>
              <a
                href={`tel:${o.phone.replace(/\s|\(|\)|-/g, "")}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-foreground/90 hover:text-foreground"
                data-testid={`link-office-phone-${o.city}`}
              >
                <Phone className="h-4 w-4 text-accent" />
                {o.phone}
              </a>

              <a
                href={`https://yandex.ru/maps/?text=${encodeURIComponent(o.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-foreground/85"
                data-testid={`link-office-map-${o.city}`}
              >
                Открыть на карте
                <ArrowRight className="h-4 w-4" />
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] border border-border/60 bg-white/5 p-6 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-semibold text-muted-foreground" data-testid="text-footer-seo">
              Ключевые запросы: выкуп авто Калуга, выкуп авто Тула, выкуп авто Обнинск, срочный выкуп автомобиля, выкуп мотоцикла, выкуп спецтехники.
            </div>
            <div className="text-xs font-semibold text-muted-foreground" data-testid="text-footer-legal">
              *Макет. Данные контактов можно заменить на реальные.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen" data-testid="page-home">
      <Nav />
      <Hero />
      <Services />
      <Benefits />
      <Reviews />
      <Contacts />
    </main>
  );
}
