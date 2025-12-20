export interface Country {
    name: string;
    code: string; // ISO code for flags or just a slug
    image: string;
}

export const countries: Country[] = [
    { name: "Morocco", code: "morocco", image: "https://flagcdn.com/w320/ma.png" },
    { name: "Algeria", code: "algeria", image: "https://flagcdn.com/w320/dz.png" },
    { name: "Angola", code: "angola", image: "https://flagcdn.com/w320/ao.png" },
    { name: "Benin", code: "benin", image: "https://flagcdn.com/w320/bj.png" },
    { name: "Botswana", code: "botswana", image: "https://flagcdn.com/w320/bw.png" },
    { name: "Burkina Faso", code: "burkina-faso", image: "https://flagcdn.com/w320/bf.png" },
    { name: "Cameroon", code: "cameroon", image: "https://flagcdn.com/w320/cm.png" },
    { name: "Comoros", code: "comoros", image: "https://flagcdn.com/w320/km.png" },
    { name: "DR Congo", code: "dr-congo", image: "https://flagcdn.com/w320/cd.png" },
    { name: "Egypt", code: "egypt", image: "https://flagcdn.com/w320/eg.png" },
    { name: "Equatorial Guinea", code: "equatorial-guinea", image: "https://flagcdn.com/w320/gq.png" },
    { name: "Gabon", code: "gabon", image: "https://flagcdn.com/w320/ga.png" },
    { name: "Ivory Coast", code: "ivory-coast", image: "https://flagcdn.com/w320/ci.png" },
    { name: "Mali", code: "mali", image: "https://flagcdn.com/w320/ml.png" },
    { name: "Mozambique", code: "mozambique", image: "https://flagcdn.com/w320/mz.png" },
    { name: "Nigeria", code: "nigeria", image: "https://flagcdn.com/w320/ng.png" },
    { name: "Senegal", code: "senegal", image: "https://flagcdn.com/w320/sn.png" },
    { name: "South Africa", code: "south-africa", image: "https://flagcdn.com/w320/za.png" },
    { name: "Sudan", code: "sudan", image: "https://flagcdn.com/w320/sd.png" },
    { name: "Tanzania", code: "tanzania", image: "https://flagcdn.com/w320/tz.png" },
    { name: "Tunisia", code: "tunisia", image: "https://flagcdn.com/w320/tn.png" },
    { name: "Uganda", code: "uganda", image: "https://flagcdn.com/w320/ug.png" },
    { name: "Zambia", code: "zambia", image: "https://flagcdn.com/w320/zm.png" },
    { name: "Zimbabwe", code: "zimbabwe", image: "https://flagcdn.com/w320/zw.png" },
];
