export interface GymClass {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
}

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface ScheduleSlot {
  time: string;
  class: string;
  coach: string;
  duration: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const gymClasses: GymClass[] = [
  {
    id: "musculation",
    title: "Musculation",
    description:
      "Développez votre force et votre masse musculaire avec nos coachs certifiés. Séances adaptées à tous les niveaux.",
    image: "/images/class-musculation.jpg",
    duration: "60 min",
    level: "Tous niveaux",
  },
  {
    id: "crossfit",
    title: "CrossFit",
    description:
      "Entraînement intense combinant haltérophilie, gymnastique et cardio. Repoussez vos limites à chaque WOD.",
    image: "/images/class-crossfit.jpg",
    duration: "45 min",
    level: "Intermédiaire",
  },
  {
    id: "yoga",
    title: "Yoga",
    description:
      "Retrouvez l'équilibre entre corps et esprit. Cours de Vinyasa et Hatha yoga pour tous les niveaux.",
    image: "/images/class-yoga.jpg",
    duration: "75 min",
    level: "Tous niveaux",
  },
  {
    id: "spinning",
    title: "Spinning",
    description:
      "Cyclisme indoor rythmé et intense. Brûlez jusqu'à 600 calories par séance en musique.",
    image: "/images/class-spinning.jpg",
    duration: "45 min",
    level: "Tous niveaux",
  },
  {
    id: "boxe",
    title: "Boxe",
    description:
      "Apprenez les techniques de la boxe anglaise tout en améliorant votre condition physique.",
    image: "/images/class-boxing.jpg",
    duration: "60 min",
    level: "Débutant",
  },
  {
    id: "danse-afro",
    title: "Danse Afro",
    description:
      "Vibrez au rythme des musiques africaines. Cours énergisant alliant danse traditionnelle et fitness.",
    image: "/images/class-danse.jpg",
    duration: "60 min",
    level: "Tous niveaux",
  },
];

export const coaches: Coach[] = [
  {
    id: "stephane",
    name: "Stéphane",
    specialty: "Coach Musculation",
    image: "/images/coach-stephane.jpg",
    bio: "10 ans d'expérience en musculation et préparation physique. Diplômé de l'INSEP.",
  },
  {
    id: "nadege",
    name: "Nadège",
    specialty: "Coach Yoga",
    image: "/images/coach-nadege.jpg",
    bio: "Instructrice certifiée en Vinyasa et Hatha Yoga. 8 ans de pratique.",
  },
  {
    id: "yannick",
    name: "Yannick",
    specialty: "Coach CrossFit",
    image: "/images/coach-yannick.jpg",
    bio: "CrossFit Level 2 Trainer. Ancien athlète de haut niveau en athlétisme.",
  },
  {
    id: "clarisse",
    name: "Clarisse",
    specialty: "Coach Danse Afro",
    image: "/images/coach-clarisse.jpg",
    bio: "Chorégraphe professionnelle spécialisée dans les danses africaines contemporaines.",
  },
];

export const schedule: Record<string, ScheduleSlot[]> = {
  Lundi: [
    { time: "06:00 - 07:00", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "07:30 - 08:15", class: "Spinning", coach: "Nadège", duration: "45 min" },
    { time: "09:00 - 10:00", class: "CrossFit", coach: "Yannick", duration: "60 min" },
    { time: "12:00 - 13:00", class: "Boxe", coach: "Yannick", duration: "60 min" },
    { time: "17:00 - 18:00", class: "Danse Afro", coach: "Clarisse", duration: "60 min" },
    { time: "18:30 - 19:30", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "20:00 - 21:00", class: "Yoga", coach: "Nadège", duration: "60 min" },
  ],
  Mardi: [
    { time: "06:00 - 07:00", class: "CrossFit", coach: "Yannick", duration: "60 min" },
    { time: "07:30 - 08:15", class: "Spinning", coach: "Nadège", duration: "45 min" },
    { time: "09:00 - 10:00", class: "Yoga", coach: "Nadège", duration: "60 min" },
    { time: "12:00 - 13:00", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "17:00 - 18:00", class: "Boxe", coach: "Yannick", duration: "60 min" },
    { time: "18:30 - 19:30", class: "Danse Afro", coach: "Clarisse", duration: "60 min" },
    { time: "20:00 - 21:00", class: "Spinning", coach: "Nadège", duration: "45 min" },
  ],
  Mercredi: [
    { time: "06:00 - 07:00", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "07:30 - 08:15", class: "Boxe", coach: "Yannick", duration: "45 min" },
    { time: "09:00 - 10:00", class: "Danse Afro", coach: "Clarisse", duration: "60 min" },
    { time: "12:00 - 13:00", class: "CrossFit", coach: "Yannick", duration: "60 min" },
    { time: "17:00 - 18:00", class: "Yoga", coach: "Nadège", duration: "60 min" },
    { time: "18:30 - 19:30", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "20:00 - 21:00", class: "Spinning", coach: "Nadège", duration: "45 min" },
  ],
  Jeudi: [
    { time: "06:00 - 07:00", class: "CrossFit", coach: "Yannick", duration: "60 min" },
    { time: "07:30 - 08:15", class: "Spinning", coach: "Nadège", duration: "45 min" },
    { time: "09:00 - 10:00", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "12:00 - 13:00", class: "Yoga", coach: "Nadège", duration: "60 min" },
    { time: "17:00 - 18:00", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "18:30 - 19:30", class: "Boxe", coach: "Yannick", duration: "60 min" },
    { time: "20:00 - 21:00", class: "Danse Afro", coach: "Clarisse", duration: "60 min" },
  ],
  Vendredi: [
    { time: "06:00 - 07:00", class: "Boxe", coach: "Yannick", duration: "60 min" },
    { time: "07:30 - 08:15", class: "Musculation", coach: "Stéphane", duration: "45 min" },
    { time: "09:00 - 10:00", class: "Spinning", coach: "Nadège", duration: "60 min" },
    { time: "12:00 - 13:00", class: "Danse Afro", coach: "Clarisse", duration: "60 min" },
    { time: "17:00 - 18:00", class: "CrossFit", coach: "Yannick", duration: "60 min" },
    { time: "18:30 - 19:30", class: "Yoga", coach: "Nadège", duration: "60 min" },
    { time: "20:00 - 21:00", class: "Musculation", coach: "Stéphane", duration: "60 min" },
  ],
  Samedi: [
    { time: "08:00 - 09:00", class: "CrossFit", coach: "Yannick", duration: "60 min" },
    { time: "09:30 - 10:30", class: "Danse Afro", coach: "Clarisse", duration: "60 min" },
    { time: "11:00 - 12:00", class: "Yoga", coach: "Nadège", duration: "60 min" },
    { time: "14:00 - 15:00", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "15:30 - 16:15", class: "Spinning", coach: "Nadège", duration: "45 min" },
    { time: "16:30 - 17:30", class: "Boxe", coach: "Yannick", duration: "60 min" },
  ],
  Dimanche: [
    { time: "09:00 - 10:00", class: "Yoga", coach: "Nadège", duration: "60 min" },
    { time: "10:30 - 11:30", class: "Musculation", coach: "Stéphane", duration: "60 min" },
    { time: "16:00 - 17:00", class: "Danse Afro", coach: "Clarisse", duration: "60 min" },
    { time: "17:30 - 18:30", class: "Spinning", coach: "Nadège", duration: "45 min" },
  ],
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basique",
    price: "15 000",
    period: "/ mois",
    description: "Accès libre 6h-22h",
    features: [
      "Accès illimité à la salle",
      "Horaires : 6h - 22h",
      "Vestiaires et douches",
      "Accès au sauna",
      "1 session coaching offerte",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "25 000",
    period: "/ mois",
    description: "Cours collectifs illimités",
    features: [
      "Tout l'abonnement Basique",
      "Cours collectifs illimités",
      "Musculation, CrossFit, Yoga",
      "Spinning, Boxe, Danse Afro",
      "4 sessions coaching/mois",
      "Accès 5h - 23h",
    ],
    highlighted: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "50 000",
    period: "/ mois",
    description: "Coaching privé + suivi nutrition",
    features: [
      "Tout l'abonnement Premium",
      "Coaching privé personnalisé",
      "Suivi nutritionnel mensuel",
      "Accès 24h/24, 7j/7",
      "Vestiaires VIP",
      "Invités gratuits (2/mois)",
      "Accès prioritaire aux cours",
    ],
    highlighted: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Yannick",
    text: "IronFit a complètement transformé ma vie. J'ai perdu 15 kg en 6 mois grâce au coaching personnalisé de Stéphane. L'ambiance est motivante et les équipements sont top niveau !",
    rating: 5,
    avatar: "/images/gallery-5.jpg",
  },
  {
    id: "2",
    name: "Nadège",
    text: "Les cours de yoga avec Nadège sont exceptionnels. C'est devenu mon rendez-vous hebdomadaire pour me ressourcer. La salle est magnifique et très bien entretenue.",
    rating: 5,
    avatar: "/images/gallery-7.jpg",
  },
  {
    id: "3",
    name: "Stéphane",
    text: "Je m'entraîne ici depuis l'ouverture. Les coachs sont passionnés et compétents. Le forfait VIP vaut vraiment le coup avec le suivi nutritionnel.",
    rating: 5,
    avatar: "/images/coach-yannick.jpg",
  },
  {
    id: "4",
    name: "Clarisse",
    text: "La danse Afro est un pur bonheur ! Clarisse est une chorégraphe géniale. Chaque cours est une fête. Je recommande à 100% !",
    rating: 5,
    avatar: "/images/coach-clarisse.jpg",
  },
];

export const galleryImages: GalleryImage[] = [
  { id: "1", src: "/images/hero-gym.jpg", alt: "Salle principale IronFit" },
  { id: "2", src: "/images/about-gym.jpg", alt: "Espace musculation" },
  { id: "3", src: "/images/gallery-1.jpg", alt: "Vestiaires premium" },
  { id: "4", src: "/images/gallery-2.jpg", alt: "Cours collectif" },
  { id: "5", src: "/images/gallery-3.jpg", alt: "Espace haltères" },
  { id: "6", src: "/images/gallery-4.jpg", alt: "Entraînement fitness" },
  { id: "7", src: "/images/gallery-6.jpg", alt: "Espace bien-être" },
  { id: "8", src: "/images/gallery-8.jpg", alt: "Réception IronFit" },
];

export const gymStats = [
  { value: "1000", unit: "m²", label: "Espace fitness" },
  { value: "6", unit: "", label: "Cours collectifs" },
  { value: "4", unit: "", label: "Coachs diplômés" },
  { value: "500+", unit: "", label: "Membres actifs" },
];
