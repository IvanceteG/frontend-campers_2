/**
 * Mock de models de camper.
 * Les imatges es carreguen des de /public/models/ (locals, no externes).
 * Quan el backend estigui llest, `modelsService` farà fetch a l'API real
 * i aquest fitxer només s'usarà com a fallback en desenvolupament.
 *
 * Esquema (a alinear amb la BD del backend):
 *   id, slug, name, type, seats, beds, bathroom, equipment,
 *   pricePerDay, description, longDescription, includes[], image, featured
 */
export const camperModels = [
  {
    id: 1,
    slug: "sunlight-cliff-640",
    name: "Sunlight Cliff 640",
    type: "Compacta",
    seats: 4,
    beds: 2,
    bathroom: "WC químic",
    equipment: "Sensor d'aparcament + GPS",
    pricePerDay: 120,
    description:
      "Camper compacta i àgil, ideal per a parelles. Cuina equipada, frigorífic i llit elevable.",
    longDescription:
      "La Sunlight Cliff 640 combina la maniobrabilitat d'una furgoneta amb les comoditats d'una autocaravana. Perfecta per a escapades de cap de setmana o viatges llargs en parella. El llit elevable a la part posterior permet aprofitar millor l'espai diürn.",
    includes: [
      "Roba de llit i tovalloles",
      "Cuina amb 2 fogons i frigorífic",
      "WC químic portàtil",
      "Tendal exterior",
      "Kit de menatge complet",
    ],
    image: "/models/sunlight-cliff-640.jpg",
    featured: true,
  },
  {
    id: 2,
    slug: "volkswagen-california",
    name: "Volkswagen California",
    type: "Icònica",
    seats: 4,
    beds: 4,
    bathroom: "—",
    equipment: "GPS + càmera de marxa enrere",
    pricePerDay: 150,
    description:
      "La icona del camperisme amb sostre elevable, cuina lateral i acabats premium.",
    longDescription:
      "La California és l'estàndard del camperisme modern. El sostre elevable amb llit superior i el conjunt cuina-frigorífic integrats fan que sigui tan còmoda per dormir com per viatjar. Acabats premium i conducció dinàmica.",
    includes: [
      "Sostre elevable amb llit superior",
      "Cuina amb 2 fogons i nevera 42L",
      "Taula i 2 cadires plegables",
      "Mosquiteres a totes les finestres",
      "Sistema d'àudio i navegació",
    ],
    image: "/models/volkswagen-california.jpg",
    featured: true,
  },
  {
    id: 3,
    slug: "ford-transit-custom",
    name: "Ford Transit Custom",
    type: "Familiar",
    seats: 4,
    beds: 4,
    bathroom: "WC",
    equipment: "GPS + Bluetooth + càmera",
    pricePerDay: 110,
    description:
      "Espai, autonomia i fiabilitat per a famílies. Tendal exterior i taula plegable inclosa.",
    longDescription:
      "La Ford Transit Custom està pensada per a famílies que valoren l'espai i la fiabilitat. Amb dos llits amplis, banys complets i molta capacitat d'emmagatzematge, és la companya perfecta per a vacances llargues.",
    includes: [
      "Dos llits dobles",
      "WC químic amb cassette",
      "Tendal de gran format",
      "Taula i 4 cadires plegables",
      "Nevera de compressor 65L",
    ],
    image: "/models/ford-transit-custom.jpg",
    featured: true,
  },
  {
    id: 4,
    slug: "mercedes-marco-polo",
    name: "Mercedes Marco Polo",
    type: "Premium",
    seats: 4,
    beds: 4,
    bathroom: "WC + dutxa",
    equipment: "Paquet assistents Mercedes + GPS",
    pricePerDay: 180,
    description:
      "Luxe sobre rodes per al viatger exigent. Climatització bizonal i acabats en cuir.",
    longDescription:
      "La Marco Polo és la camper premium per excel·lència. Acabats en cuir, climatització bizonal, paquet d'assistents a la conducció Mercedes i un disseny interior que no té res a envejar a un saló. L'experiència més confortable de la flota.",
    includes: [
      "Acabats interiors en cuir",
      "Climatització bizonal",
      "Bany complet amb dutxa",
      "Sostre elevable elèctric",
      "Sistema MBUX amb pantalla tàctil",
    ],
    image: "/models/mercedes-marco-polo.jpg",
    featured: true,
  },
  {
    id: 5,
    slug: "fiat-ducato-adventure",
    name: "Fiat Ducato Adventure",
    type: "Aventura",
    seats: 5,
    beds: 4,
    bathroom: "WC + dutxa",
    equipment: "Tracció 4x4 + GPS off-road",
    pricePerDay: 165,
    description:
      "Pensada per a rutes off-road. Suspensió reforçada i panell solar de 200W.",
    longDescription:
      "La Ducato Adventure està preparada per anar on altres no arriben. Tracció 4x4, suspensió reforçada, panell solar de 200W i depòsits d'aigua de gran capacitat per a viatges autosuficients de diversos dies.",
    includes: [
      "Tracció 4x4 amb modes off-road",
      "Panell solar de 200W",
      "Depòsit d'aigua de 100L",
      "Suspensió reforçada",
      "Kit d'eines i recanvis bàsics",
    ],
    image: "/models/fiat-ducato-adventure.jpg",
    featured: false,
  },
  {
    id: 6,
    slug: "renault-trafic-spacenomad",
    name: "Renault Trafic SpaceNomad",
    type: "Urbana",
    seats: 4,
    beds: 2,
    bathroom: "—",
    equipment: "GPS + càmera 360° + sensors",
    pricePerDay: 95,
    description:
      "Compacta i fàcil d'aparcar a ciutat. L'opció més econòmica per escapades curtes.",
    longDescription:
      "La SpaceNomad és la camper més assequible de la nostra flota. Mides reduïdes que permeten aparcar a qualsevol ciutat europea sense complicacions, però amb tot l'essencial per escapades curtes.",
    includes: [
      "Llit doble convertible",
      "Cuina portàtil amb fogons",
      "Nevera de 30L",
      "Tendal lateral",
      "Mosquiteres",
    ],
    image: "/models/renault-trafic-spacenomad.jpg",
    featured: false,
  },
];
