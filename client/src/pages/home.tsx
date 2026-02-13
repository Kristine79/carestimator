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
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Zap,
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
    name: "Андрей",
    city: "Калуга",
    text: "Оценили по фото, через час приехал эвакуатор. Деньги сразу, без попыток сбить цену на месте.",
    rating: 5,
    deal: "Выкуп авто после ДТП",
  },
  {
    name: "Ольга",
    city: "Обнинск",
    text: "Продала мотоцикл за вечер. Всё чётко: договор, перевод, забрали сами. Я только ключи отдала.",
    rating: 5,
    deal: "Выкуп мото",
  },
  {
    name: "Игорь",
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
        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-widest text-primary backdrop-blur"
        data-testid="text-eyebrow"
      >
        <Zap className="h-3 w-3 fill-current" />
        <span className="uppercase">{props.eyebrow}</span>
      </div>
      <h2
        className="mt-6 text-balance text-3xl font-black tracking-tighter text-foreground uppercase md:text-5xl"
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
      <div className="bg-mesh absolute inset-0 opacity-40" />
      <div className="noise absolute inset-0 opacity-20" />
      <div
        className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"
        aria-hidden
      />
    </div>
  );
}

function Nav() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <a href="#top" className="flex items-center gap-2" data-testid="link-logo">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary font-black text-black">
            40
          </div>
          <div className="text-xl font-black tracking-tighter uppercase italic">
            выкуп<span className="text-primary">авто</span>40
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Услуги</a>
          <a href="#benefits" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Выгода</a>
          <a href="#reviews" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Отзывы</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="tel:+79990000000" className="hidden font-black md:block">+7 (999) 000-00-00</a>
          <Button className="rounded-none font-bold uppercase skew-x-[-12deg]" asChild>
            <a href="#lead" className="skew-x-[12deg]">Оценить авто</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="top" className="relative border-b border-white/5 pb-20 pt-12 md:pb-32 md:pt-24">
      <GlowBg />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            className="mb-6 flex items-center gap-2 text-primary"
          >
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Калужская область</span>
          </motion.div>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-black leading-[0.9] tracking-tighter uppercase italic md:text-8xl"
          >
            Выкупим ваш <br />
            <span className="text-primary glow">автомобиль</span> <br />
            <span className="text-3xl md:text-6xl text-white/40">сегодня</span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-md text-lg font-medium text-white/60"
          >
            Срочный выкуп авто, мото и спецтехники в Калуге, Туле и Обнинске. 
            Деньги на карту или наличными сразу после осмотра.
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="h-14 rounded-none px-8 font-black uppercase skew-x-[-12deg]" asChild>
              <a href="#lead" className="skew-x-[12deg] flex items-center gap-2">
                Узнать стоимость <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <div className="flex items-center gap-4 rounded-none border border-white/10 bg-white/5 px-6 py-3">
              <Phone className="h-5 w-5 text-primary" />
              <div className="text-sm font-bold uppercase tracking-wider">Круглосуточно</div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
            {[
              { label: "Минут оценка", val: "15" },
              { label: "Сделок в месяц", val: "40+" },
              { label: "Лет опыта", val: "12" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-primary italic">{s.val}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 blur-[100px] opacity-20" />
          <Card className="relative overflow-hidden rounded-none border-white/10 bg-black/40 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black uppercase italic">Быстрая оценка</h3>
              <Zap className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <LeadForm />
          </Card>
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", city: "Калуга", type: "car" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Заявка принята!", description: "Специалист свяжется с вами через 5-10 минут." });
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Input 
        placeholder="ВАШЕ ИМЯ" 
        className="h-14 rounded-none border-white/10 bg-white/5 font-bold uppercase placeholder:text-white/20" 
      />
      <Input 
        placeholder="ТЕЛЕФОН" 
        className="h-14 rounded-none border-white/10 bg-white/5 font-bold uppercase placeholder:text-white/20" 
      />
      <div className="grid grid-cols-2 gap-4">
        <Select defaultValue="Калуга">
          <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 font-bold uppercase">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/10">
            {cities.map(c => <SelectItem key={c} value={c} className="font-bold uppercase">{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select defaultValue="car">
          <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 font-bold uppercase">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/10">
            {vehicleTypes.map(t => <SelectItem key={t.id} value={t.id} className="font-bold uppercase">{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Textarea 
        placeholder="МАРКА, МОДЕЛЬ, ГОД" 
        className="min-h-[100px] rounded-none border-white/10 bg-white/5 font-bold uppercase placeholder:text-white/20" 
      />
      <Button size="lg" className="h-16 rounded-none font-black uppercase text-lg skew-x-[-12deg]">
        <span className="skew-x-[12deg]">Получить предложение</span>
      </Button>
    </form>
  );
}

function Services() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle eyebrow="Услуги" title="Что мы покупаем" />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {vehicleTypes.map((t) => (
            <Card key={t.id} className="group relative overflow-hidden rounded-none border-white/5 bg-white/[0.02] p-8 transition-colors hover:border-primary/50">
              <div className="absolute -right-4 -top-4 text-primary/10 transition-transform group-hover:scale-110">
                <t.icon size={120} strokeWidth={1} />
              </div>
              <div className="relative">
                <t.icon className="mb-6 h-12 w-12 text-primary" />
                <h3 className="mb-4 text-2xl font-black uppercase italic">{t.label}</h3>
                <p className="text-white/60">Любое состояние: кредитные, битые, не на ходу. Оформление за наш счет.</p>
                <Button variant="link" className="mt-6 h-auto p-0 font-black uppercase text-primary">Узнать цену <ChevronRight className="h-4 w-4" /></Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Truck, title: "Эвакуатор 0₽", desc: "Бесплатно вывезем технику в любом состоянии из любой точки области." },
    { icon: Clock, title: "Деньги за 1 час", desc: "От звонка до получения денег на руки проходит не более 60 минут." },
    { icon: ShieldCheck, title: "Чистая сделка", desc: "Официальный договор купли-продажи. Переоформление в ГИБДД берем на себя." },
    { icon: Check, title: "Любая техника", desc: "Покупаем легковые, грузовые, мото и спецтехнику любого года выпуска." },
  ];

  return (
    <section id="benefits" className="bg-white/[0.02] py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle eyebrow="Преимущества" title="Почему выбирают нас" />
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <div key={idx} className="text-center md:text-left">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center bg-primary/10 text-primary">
                <it.icon className="h-8 w-8" />
              </div>
              <h4 className="mb-4 text-xl font-black uppercase italic">{it.title}</h4>
              <p className="text-sm leading-relaxed text-white/40">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle eyebrow="Отзывы" title="Нам доверяют" />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="rounded-none border-white/5 bg-white/[0.02] p-8">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="mb-6 font-medium italic text-white/80">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">{t.name[0]}</div>
                <div>
                  <div className="font-bold uppercase tracking-wider">{t.name}</div>
                  <div className="text-xs font-bold text-primary uppercase">{t.city}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary font-black text-black">40</div>
            <div className="text-lg font-black tracking-tighter uppercase italic">выкуп<span className="text-primary">авто</span>40</div>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#benefits" className="hover:text-primary transition-colors">О нас</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
          </div>
          <div className="text-right">
            <a href="tel:+79990000000" className="text-xl font-black">+7 (999) 000-00-00</a>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">Работаем 24/7 по всей области</div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-[10px] font-bold uppercase tracking-widest text-white/10">
          © 2026 ВЫКУПАВТО40. Срочный выкуп автомобилей в Калуге, Туле и Обнинске.
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white" data-testid="page-home">
      <Nav />
      <Hero />
      <Services />
      <Benefits />
      <Reviews />
      <Footer />
    </main>
  );
}
