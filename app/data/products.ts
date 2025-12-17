import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: {
      en: "decode Hoodie 2025",
      fr: "Sweat à capuche decode 2025",
      ar: "هودي أطلس 2025",
    },
    price: 850,
    category: "Hoodie",
    image: "https://picsum.photos/seed/atlas1/600/800",
    images: [
      "https://picsum.photos/seed/atlas1/600/800",
      "https://picsum.photos/seed/atlas2/600/800",
      "https://picsum.photos/seed/atlas3/600/800",
    ],
    description: {
      en: "Premium heavyweight cotton hoodie featuring the 2025 official CAF Morocco geometric pattern embroidered on the chest. Designed for warmth and style in the stadium.",
      fr: "Sweat à capuche en coton épais de qualité supérieure avec le motif géométrique officiel CAF Maroc 2025 brodé sur la poitrine. Conçu pour la chaleur et le style dans le stade.",
      ar: "هودي قطني ثقيل ممتاز يتميز بالنمط الهندسي الرسمي لكأس أفريقيا المغرب 2025 مطرز على الصدر. مصمم للدفء والأناقة في الملعب.",
    },
    isFeatured: true,
  },
  {
    id: "2",
    name: {
      en: "Casablanca Tee",
      fr: "T-shirt Casablanca",
      ar: "تي شيرت الدار البيضاء",
    },
    price: 350,
    category: "T-Shirt",
    image: "https://picsum.photos/seed/casa1/600/800",
    images: [
      "https://picsum.photos/seed/casa1/600/800",
      "https://picsum.photos/seed/casa2/600/800",
      "https://picsum.photos/seed/casa3/600/800",
    ],
    description: {
      en: "Soft organic cotton t-shirt with subtle branding. Breathable fabric perfect for match days under the sun.",
      fr: "T-shirt en coton biologique doux avec un marquage subtil. Tissu respirant parfait pour les jours de match sous le soleil.",
      ar: "تي شيرت قطن عضوي ناعم مع علامة تجارية دقيقة. قماش يسمح بمرور الهواء مثالي لأيام المباريات تحت الشمس.",
    },
    isFeatured: true,
  },
  {
    id: "3",
    name: {
      en: "Rabat Knit Sweater",
      fr: "Pull en maille Rabat",
      ar: "سترة صوفية الرباط",
    },
    price: 950,
    category: "Sweater",
    image: "https://picsum.photos/seed/rabat1/600/800",
    images: [
      "https://picsum.photos/seed/rabat1/600/800",
      "https://picsum.photos/seed/rabat2/600/800",
      "https://picsum.photos/seed/rabat3/600/800",
    ],
    description: {
      en: "Luxurious wool blend knit sweater in deep emerald green. Features heritage-inspired weave patterns along the hem.",
      fr: "Pull en maille mélangée de laine luxueuse vert émeraude profond. Présente des motifs de tissage inspirés du patrimoine le long de l'ourlet.",
      ar: "سترة صوفية فاخرة من مزيج الصوف باللون الأخضر الزمردي العميق. تتميز بأنماط نسج مستوحاة من التراث.",
    },
    isFeatured: true,
  },
  {
    id: "4",
    name: {
      en: "Marrakech Scarf",
      fr: "Écharpe Marrakech",
      ar: "وشاح مراكش",
    },
    price: 250,
    category: "Accessories",
    image: "https://picsum.photos/seed/marr1/600/800",
    images: [
      "https://picsum.photos/seed/marr1/600/800",
      "https://picsum.photos/seed/marr2/600/800",
      "https://picsum.photos/seed/marr3/600/800",
    ],
    description: {
      en: "Authentic supporter scarf featuring the classic red and green colors with gold accents.",
      fr: "Écharpe de supporter authentique aux couleurs classiques rouge et vert avec des accents dorés.",
      ar: "وشاح مشجع أصلي يتميز باللونين الأحمر والأخضر الكلاسيكيين مع لمسات ذهبية.",
    },
  },
  {
    id: "5",
    name: {
      en: "Tangier Windbreaker",
      fr: "Coupe-vent Tanger",
      ar: "سترة واقية طنجة",
    },
    price: 1200,
    category: "Hoodie",
    image: "https://picsum.photos/seed/tang1/600/800",
    images: [
      "https://picsum.photos/seed/tang1/600/800",
      "https://picsum.photos/seed/tang2/600/800",
      "https://picsum.photos/seed/tang3/600/800",
    ],
    description: {
      en: "Lightweight, water-resistant windbreaker for coastal evenings. Minimalist logo detailing.",
      fr: "Coupe-vent léger et résistant à l'eau pour les soirées côtières. Détails de logo minimalistes.",
      ar: "سترة واقية خفيفة الوزن ومقاومة للماء للأمسيات الساحلية. تفاصيل شعار مبسطة.",
    },
  },
  {
    id: "6",
    name: {
      en: "Agadir Polo",
      fr: "Polo Agadir",
      ar: "بولو أكادير",
    },
    price: 450,
    category: "T-Shirt",
    image: "https://picsum.photos/seed/agad1/600/800",
    images: [
      "https://picsum.photos/seed/agad1/600/800",
      "https://picsum.photos/seed/agad2/600/800",
      "https://picsum.photos/seed/agad3/600/800",
    ],
    description: {
      en: "Classic fit polo shirt with gold trim on the collar and sleeves. Elegant and sporty.",
      fr: "Polo coupe classique avec bordure dorée sur le col et les manches. Élégant et sportif.",
      ar: "قميص بولو كلاسيكي مع حواف ذهبية على الياقة والأكمام. أنيق ورياضي.",
    },
  },
];
