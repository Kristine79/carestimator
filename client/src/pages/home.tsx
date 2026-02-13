import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
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

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

function SectionTitle(props: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="mx-auto max-w-3xl text-center"
    >
      <motion.div
        variants={revealVariants}
        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-widest text-primary backdrop-blur"
        data-testid="text-eyebrow"
      >
        <Zap className="h-3 w-3 fill-current" />
        <span className="uppercase">{props.eyebrow}</span>
      </motion.div>
      <motion.h2
        variants={revealVariants}
        className="mt-6 text-balance text-3xl font-black tracking-tighter text-foreground uppercase md:text-5xl italic"
        data-testid="text-section-title"
      >
        {props.title}
      </motion.h2>
      {props.subtitle ? (
        <motion.p
          variants={revealVariants}
          className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          data-testid="text-section-subtitle"
        >
          {props.subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

function GlowBg() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-mesh absolute inset-0 opacity-40" />
      <div className="noise absolute inset-0 opacity-20" />
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"
        aria-hidden
      />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-white/10 bg-black/90 py-3' : 'border-white/0 bg-transparent py-5'} backdrop-blur-md`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#top" className="flex items-center gap-2 group" data-testid="link-logo">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="flex h-10 w-10 items-center justify-center rounded bg-primary font-black text-black shadow-[0_0_20px_rgba(255,0,0,0.3)]"
          >
            40
          </motion.div>
          <div className="text-xl font-black tracking-tighter uppercase italic">
            выкуп<span className="text-primary group-hover:glow transition-all">авто</span>40
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {['services', 'benefits', 'reviews'].map((link) => (
            <a 
              key={link}
              href={`#${link}`} 
              className="relative text-sm font-bold uppercase tracking-wider text-white/70 hover:text-primary transition-colors group"
            >
              {link === 'services' ? 'Услуги' : link === 'benefits' ? 'Выгода' : 'Отзывы'}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href="tel:+79990000000" 
            className="hidden font-black md:block hover:text-primary transition-colors"
          >
            +7 (999) 000-00-00
          </motion.a>
          <Button 
            className="rounded-none font-bold uppercase skew-x-[-12deg] shadow-[5px_5px_0_rgba(255,0,0,0.2)] hover:shadow-none transition-all" 
            asChild
          >
            <a href="#lead" className="skew-x-[12deg]">Оценить авто</a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section id="top" className="relative border-b border-white/5 pb-20 pt-12 md:pb-32 md:pt-24 overflow-hidden">
      <GlowBg />
      <motion.div 
        style={{ scale, opacity }}
        className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-6"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={revealVariants}
            className="mb-6 flex items-center gap-2 text-primary"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] bg-primary" 
            />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Калужская область</span>
          </motion.div>

          <motion.h1
            variants={revealVariants}
            className="text-5xl font-black leading-[0.9] tracking-tighter uppercase italic md:text-8xl"
          >
            Выкупим ваш <br />
            <motion.span 
              animate={{ color: ["#fff", "#f00", "#fff"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-primary glow"
            >
              автомобиль
            </motion.span> <br />
            <span className="text-3xl md:text-6xl text-white/40">сегодня</span>
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mt-8 max-w-md text-lg font-medium text-white/60"
          >
            Срочный выкуп авто, мото и спецтехники в Калуге, Туле и Обнинске. 
            Деньги на карту или наличными сразу после осмотра.
          </motion.p>

          <motion.div variants={revealVariants} className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="h-14 rounded-none px-8 font-black uppercase skew-x-[-12deg] relative group overflow-hidden" asChild>
              <a href="#lead" className="skew-x-[12deg] flex items-center gap-2">
                <span className="relative z-10">Узнать стоимость</span>
                <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </a>
            </Button>
            <motion.div 
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="flex items-center gap-4 rounded-none border border-white/10 bg-white/5 px-6 py-3 cursor-pointer"
            >
              <Phone className="h-5 w-5 text-primary animate-bounce" />
              <div className="text-sm font-bold uppercase tracking-wider">Круглосуточно</div>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} className="mt-12 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
            {[
              { label: "Минут оценка", val: "15" },
              { label: "Сделок в месяц", val: "40+" },
              { label: "Лет опыта", val: "12" },
            ].map((s) => (
              <motion.div variants={revealVariants} key={s.label}>
                <div className="text-3xl font-black text-primary italic">{s.val}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-[100px] opacity-20" />
          <Card className="relative overflow-hidden rounded-none border-white/10 bg-black/40 p-8 backdrop-blur-xl group">
            <motion.div 
              className="absolute top-0 left-0 w-full h-[2px] bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black uppercase italic">Быстрая оценка</h3>
              <Zap className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <LeadForm />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function LeadForm() {
  const { toast } = useToast();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Заявка принята!", description: "Специалист свяжется с вами через 5-10 минут." });
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {['ВАШЕ ИМЯ', 'ТЕЛЕФОН'].map((placeholder) => (
        <motion.div key={placeholder} whileFocus={{ scale: 1.02 }} className="transition-transform">
          <Input 
            placeholder={placeholder} 
            className="h-14 rounded-none border-white/10 bg-white/5 font-bold uppercase placeholder:text-white/20 focus:border-primary/50 transition-colors" 
          />
        </motion.div>
      ))}
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
        className="min-h-[100px] rounded-none border-white/10 bg-white/5 font-bold uppercase placeholder:text-white/20 focus:border-primary/50 transition-colors" 
      />
      <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }}>
        <Button size="lg" className="w-full h-16 rounded-none font-black uppercase text-lg skew-x-[-12deg] shadow-[0_10px_20px_rgba(255,0,0,0.2)]">
          <span className="skew-x-[12deg]">Получить предложение</span>
        </Button>
      </motion.div>
    </form>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle eyebrow="Услуги" title="Что мы покупаем" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {vehicleTypes.map((t) => (
            <motion.div variants={revealVariants} key={t.id}>
              <Card className="group relative overflow-hidden rounded-none border-white/5 bg-white/[0.02] p-8 transition-all hover:border-primary/50 hover:bg-white/[0.05]">
                <div className="absolute -right-4 -top-4 text-primary/5 transition-all duration-500 group-hover:text-primary/20 group-hover:scale-125 group-hover:rotate-12">
                  <t.icon size={150} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-block"
                  >
                    <t.icon className="h-12 w-12 text-primary" />
                  </motion.div>
                  <h3 className="mb-4 text-2xl font-black uppercase italic group-hover:text-primary transition-colors">{t.label}</h3>
                  <p className="text-white/60">Любое состояние: кредитные, битые, не на ходу. Оформление за наш счет.</p>
                  <Button variant="link" className="mt-6 h-auto p-0 font-black uppercase text-primary group-hover:translate-x-2 transition-transform">
                    Узнать цену <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
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
    <section id="benefits" className="relative bg-white/[0.02] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle eyebrow="Преимущества" title="Почему выбирают нас" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((it, idx) => (
            <motion.div 
              variants={revealVariants} 
              key={idx} 
              className="text-center md:text-left group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,0,0,0.2)' }}
                className="mb-6 inline-flex h-16 w-16 items-center justify-center bg-primary/10 text-primary transition-colors"
              >
                <it.icon className="h-8 w-8" />
              </motion.div>
              <h4 className="mb-4 text-xl font-black uppercase italic group-hover:text-primary transition-colors">{it.title}</h4>
              <p className="text-sm leading-relaxed text-white/40">{it.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle eyebrow="Отзывы" title="Нам доверяют" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, idx) => (
            <motion.div variants={revealVariants} key={idx}>
              <Card className="h-full rounded-none border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.05] transition-colors">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>
                <p className="mb-6 font-medium italic text-white/80 leading-relaxed">"{t.text}"</p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary ring-2 ring-primary/20">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-wider">{t.name}</div>
                    <div className="text-xs font-bold text-primary uppercase">{t.city}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2 group cursor-pointer">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="flex h-8 w-8 items-center justify-center rounded bg-primary font-black text-black"
            >
              40
            </motion.div>
            <div className="text-lg font-black tracking-tighter uppercase italic">выкуп<span className="text-primary group-hover:glow transition-all">авто</span>40</div>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            {['services', 'benefits', 'reviews'].map(item => (
              <a key={item} href={`#${item}`} className="hover:text-primary transition-colors">
                {item === 'services' ? 'Услуги' : item === 'benefits' ? 'О нас' : 'Отзывы'}
              </a>
            ))}
          </div>
          <div className="text-center md:text-right">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="tel:+79990000000" 
              className="text-xl font-black block hover:text-primary transition-colors"
            >
              +7 (999) 000-00-00
            </motion.a>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">Работаем 24/7 по всей области</div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-[10px] font-bold uppercase tracking-widest text-white/10">
          © {new Date().getFullYear()} ВЫКУПАВТО40. Срочный выкуп автомобилей в Калуге, Туле и Обнинске.
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-white" data-testid="page-home">
      <Nav />
      <Hero />
      <Services />
      <Benefits />
      <Reviews />
      <Footer />
    </main>
  );
}
