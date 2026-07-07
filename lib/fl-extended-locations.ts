// Extended Florida Locations - Tampa Bay + Orlando Metro Suburbs
// These are additional FL cities beyond the top 350 national list

export interface FLCity {
  slug: string;
  city: string;
  state: "Florida";
  stateCode: "FL";
  region: string;
  market: "Tampa Bay" | "Orlando";
  tier: "primary" | "suburban" | "secondary";
  latitude: number;
  longitude: number;
}

// Greater Tampa Bay Market (~55 cities)
const tampaBayPrimaryCities: FLCity[] = [
  { slug: "tampa-fl", city: "Tampa", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "primary", latitude: 27.9506, longitude: -82.4572 },
  { slug: "st-petersburg-fl", city: "St. Petersburg", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "primary", latitude: 27.7676, longitude: -82.6403 },
  { slug: "clearwater-fl", city: "Clearwater", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "primary", latitude: 27.9659, longitude: -82.8001 }
];

const tampaBaySuburbanCities: FLCity[] = [
  { slug: "brandon-fl", city: "Brandon", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 27.9378, longitude: -82.2859 },
  { slug: "riverview-fl", city: "Riverview", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 27.8661, longitude: -82.3265 },
  { slug: "valrico-fl", city: "Valrico", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 27.9378, longitude: -82.2362 },
  { slug: "carrollwood-fl", city: "Carrollwood", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 28.0550, longitude: -82.5148 },
  { slug: "westchase-fl", city: "Westchase", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 28.0592, longitude: -82.6101 },
  { slug: "new-tampa-fl", city: "New Tampa", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 28.1289, longitude: -82.3943 },
  { slug: "wesley-chapel-fl", city: "Wesley Chapel", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "suburban", latitude: 28.2397, longitude: -82.3273 },
  { slug: "lutz-fl", city: "Lutz", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 28.1511, longitude: -82.4615 },
  { slug: "land-o-lakes-fl", city: "Land O' Lakes", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "suburban", latitude: 28.2189, longitude: -82.4576 },
  { slug: "odessa-fl", city: "Odessa", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "suburban", latitude: 28.1839, longitude: -82.5937 },
  { slug: "temple-terrace-fl", city: "Temple Terrace", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 28.0353, longitude: -82.3893 },
  { slug: "seffner-fl", city: "Seffner", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 27.9836, longitude: -82.2759 },
  { slug: "ruskin-fl", city: "Ruskin", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 27.7206, longitude: -82.4332 },
  { slug: "apollo-beach-fl", city: "Apollo Beach", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 27.7731, longitude: -82.4076 },
  { slug: "sun-city-center-fl", city: "Sun City Center", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 27.7181, longitude: -82.3518 },
  { slug: "plant-city-fl", city: "Plant City", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "suburban", latitude: 28.0147, longitude: -82.1195 }
];

const pinellasCountyCities: FLCity[] = [
  { slug: "largo-fl", city: "Largo", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.9095, longitude: -82.7873 },
  { slug: "palm-harbor-fl", city: "Palm Harbor", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 28.0781, longitude: -82.7637 },
  { slug: "safety-harbor-fl", city: "Safety Harbor", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 28.0058, longitude: -82.6926 },
  { slug: "dunedin-fl", city: "Dunedin", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 28.0197, longitude: -82.7718 },
  { slug: "tarpon-springs-fl", city: "Tarpon Springs", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 28.1461, longitude: -82.7568 },
  { slug: "oldsmar-fl", city: "Oldsmar", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 28.0339, longitude: -82.6651 },
  { slug: "pinellas-park-fl", city: "Pinellas Park", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.8428, longitude: -82.6993 },
  { slug: "seminole-fl", city: "Seminole", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.8395, longitude: -82.7907 },
  { slug: "gulfport-fl", city: "Gulfport", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.7489, longitude: -82.7037 },
  { slug: "south-pasadena-fl", city: "South Pasadena", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.7553, longitude: -82.7382 },
  { slug: "madeira-beach-fl", city: "Madeira Beach", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.7981, longitude: -82.7973 },
  { slug: "redington-beach-fl", city: "Redington Beach", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.8089, longitude: -82.8101 },
  { slug: "redington-shores-fl", city: "Redington Shores", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.8203, longitude: -82.8276 },
  { slug: "indian-rocks-beach-fl", city: "Indian Rocks Beach", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.8831, longitude: -82.8512 },
  { slug: "indian-shores-fl", city: "Indian Shores", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.8575, longitude: -82.8454 },
  { slug: "belleair-fl", city: "Belleair", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.9356, longitude: -82.8068 },
  { slug: "belleair-beach-fl", city: "Belleair Beach", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.9231, longitude: -82.8437 },
  { slug: "belleair-bluffs-fl", city: "Belleair Bluffs", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.9203, longitude: -82.8173 },
  { slug: "treasure-island-fl", city: "Treasure Island", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.7681, longitude: -82.7693 },
  { slug: "st-pete-beach-fl", city: "St. Pete Beach", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.7253, longitude: -82.7412 },
  { slug: "pass-a-grille-fl", city: "Pass-A-Grille", state: "Florida", stateCode: "FL", region: "Pinellas County", market: "Tampa Bay", tier: "secondary", latitude: 27.6906, longitude: -82.7376 }
];

const hillsboroughAdditionalCities: FLCity[] = [
  { slug: "thonotosassa-fl", city: "Thonotosassa", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "secondary", latitude: 28.0611, longitude: -82.3018 },
  { slug: "mango-fl", city: "Mango", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "secondary", latitude: 27.9778, longitude: -82.3079 },
  { slug: "gibsonton-fl", city: "Gibsonton", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "secondary", latitude: 27.8536, longitude: -82.3804 },
  { slug: "lithia-fl", city: "Lithia", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "secondary", latitude: 27.8661, longitude: -82.2087 },
  { slug: "fishhawk-ranch-fl", city: "FishHawk Ranch", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "secondary", latitude: 27.8517, longitude: -82.2181 },
  { slug: "wimauma-fl", city: "Wimauma", state: "Florida", stateCode: "FL", region: "Hillsborough County", market: "Tampa Bay", tier: "secondary", latitude: 27.7117, longitude: -82.3004 }
];

const pascoCountyCities: FLCity[] = [
  { slug: "new-port-richey-fl", city: "New Port Richey", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "secondary", latitude: 28.2444, longitude: -82.7193 },
  { slug: "port-richey-fl", city: "Port Richey", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "secondary", latitude: 28.2717, longitude: -82.7196 },
  { slug: "holiday-fl", city: "Holiday", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "secondary", latitude: 28.1875, longitude: -82.7396 },
  { slug: "hudson-fl", city: "Hudson", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "secondary", latitude: 28.3644, longitude: -82.6932 },
  { slug: "zephyrhills-fl", city: "Zephyrhills", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "secondary", latitude: 28.2336, longitude: -82.1812 },
  { slug: "dade-city-fl", city: "Dade City", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "secondary", latitude: 28.3647, longitude: -82.1962 },
  { slug: "trinity-fl", city: "Trinity", state: "Florida", stateCode: "FL", region: "Pasco County", market: "Tampa Bay", tier: "secondary", latitude: 28.1828, longitude: -82.6832 }
];

const hernandoCountyCities: FLCity[] = [
  { slug: "spring-hill-fl", city: "Spring Hill", state: "Florida", stateCode: "FL", region: "Hernando County", market: "Tampa Bay", tier: "secondary", latitude: 28.4767, longitude: -82.5276 },
  { slug: "brooksville-fl", city: "Brooksville", state: "Florida", stateCode: "FL", region: "Hernando County", market: "Tampa Bay", tier: "secondary", latitude: 28.5553, longitude: -82.3879 },
  { slug: "weeki-wachee-fl", city: "Weeki Wachee", state: "Florida", stateCode: "FL", region: "Hernando County", market: "Tampa Bay", tier: "secondary", latitude: 28.5181, longitude: -82.5718 }
];

// Greater Orlando Market (~45 cities)
const orlandoPrimaryCities: FLCity[] = [
  { slug: "orlando-fl", city: "Orlando", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "primary", latitude: 28.5383, longitude: -81.3792 },
  { slug: "kissimmee-fl", city: "Kissimmee", state: "Florida", stateCode: "FL", region: "Osceola County", market: "Orlando", tier: "primary", latitude: 28.2920, longitude: -81.4076 },
  { slug: "sanford-fl", city: "Sanford", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "primary", latitude: 28.8128, longitude: -81.2700 }
];

const orlandoSuburbanCities: FLCity[] = [
  { slug: "winter-park-fl", city: "Winter Park", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "suburban", latitude: 28.5997, longitude: -81.3392 },
  { slug: "lake-mary-fl", city: "Lake Mary", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "suburban", latitude: 28.7589, longitude: -81.3178 },
  { slug: "altamonte-springs-fl", city: "Altamonte Springs", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "suburban", latitude: 28.6611, longitude: -81.3656 },
  { slug: "apopka-fl", city: "Apopka", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "suburban", latitude: 28.6934, longitude: -81.5322 },
  { slug: "ocoee-fl", city: "Ocoee", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "suburban", latitude: 28.5692, longitude: -81.5439 },
  { slug: "winter-garden-fl", city: "Winter Garden", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "suburban", latitude: 28.5653, longitude: -81.5862 },
  { slug: "windermere-fl", city: "Windermere", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "suburban", latitude: 28.4956, longitude: -81.5348 },
  { slug: "maitland-fl", city: "Maitland", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "suburban", latitude: 28.6275, longitude: -81.3631 },
  { slug: "longwood-fl", city: "Longwood", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "suburban", latitude: 28.7031, longitude: -81.3384 },
  { slug: "casselberry-fl", city: "Casselberry", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "suburban", latitude: 28.6778, longitude: -81.3278 },
  { slug: "oviedo-fl", city: "Oviedo", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "suburban", latitude: 28.6700, longitude: -81.2081 },
  { slug: "clermont-fl", city: "Clermont", state: "Florida", stateCode: "FL", region: "Lake County", market: "Orlando", tier: "suburban", latitude: 28.5494, longitude: -81.7729 },
  { slug: "celebration-fl", city: "Celebration", state: "Florida", stateCode: "FL", region: "Osceola County", market: "Orlando", tier: "suburban", latitude: 28.3253, longitude: -81.5331 },
  { slug: "bay-lake-fl", city: "Bay Lake", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "suburban", latitude: 28.3908, longitude: -81.5553 },
  { slug: "lake-buena-vista-fl", city: "Lake Buena Vista", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "suburban", latitude: 28.3747, longitude: -81.5217 }
];

const osceolaCountyCities: FLCity[] = [
  { slug: "st-cloud-fl", city: "St. Cloud", state: "Florida", stateCode: "FL", region: "Osceola County", market: "Orlando", tier: "secondary", latitude: 28.2489, longitude: -81.2812 },
  { slug: "poinciana-fl", city: "Poinciana", state: "Florida", stateCode: "FL", region: "Osceola County", market: "Orlando", tier: "secondary", latitude: 28.1408, longitude: -81.4584 }
];

const seminoleCountyCities: FLCity[] = [
  { slug: "heathrow-fl", city: "Heathrow", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "secondary", latitude: 28.7681, longitude: -81.3728 },
  { slug: "chuluota-fl", city: "Chuluota", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "secondary", latitude: 28.6428, longitude: -81.1209 },
  { slug: "geneva-fl", city: "Geneva", state: "Florida", stateCode: "FL", region: "Seminole County", market: "Orlando", tier: "secondary", latitude: 28.7386, longitude: -81.1153 }
];

const orangeCountyCities: FLCity[] = [
  { slug: "doctor-phillips-fl", city: "Doctor Phillips", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "secondary", latitude: 28.4497, longitude: -81.4923 },
  { slug: "horizon-west-fl", city: "Horizon West", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "secondary", latitude: 28.4406, longitude: -81.6154 },
  { slug: "union-park-fl", city: "Union Park", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "secondary", latitude: 28.5678, longitude: -81.2192 },
  { slug: "azalea-park-fl", city: "Azalea Park", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "secondary", latitude: 28.5417, longitude: -81.3006 },
  { slug: "pine-hills-fl", city: "Pine Hills", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "secondary", latitude: 28.5772, longitude: -81.4559 }
];

const lakeCountyCities: FLCity[] = [
  { slug: "leesburg-fl", city: "Leesburg", state: "Florida", stateCode: "FL", region: "Lake County", market: "Orlando", tier: "secondary", latitude: 28.8108, longitude: -81.8779 },
  { slug: "eustis-fl", city: "Eustis", state: "Florida", stateCode: "FL", region: "Lake County", market: "Orlando", tier: "secondary", latitude: 28.8528, longitude: -81.6854 },
  { slug: "mount-dora-fl", city: "Mount Dora", state: "Florida", stateCode: "FL", region: "Lake County", market: "Orlando", tier: "secondary", latitude: 28.8025, longitude: -81.6445 },
  { slug: "tavares-fl", city: "Tavares", state: "Florida", stateCode: "FL", region: "Lake County", market: "Orlando", tier: "secondary", latitude: 28.8042, longitude: -81.7256 },
  { slug: "minneola-fl", city: "Minneola", state: "Florida", stateCode: "FL", region: "Lake County", market: "Orlando", tier: "secondary", latitude: 28.5744, longitude: -81.7462 }
];

const tourismMicroMarkets: FLCity[] = [
  { slug: "international-drive-fl", city: "International Drive", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "secondary", latitude: 28.4292, longitude: -81.4701 },
  { slug: "disney-springs-fl", city: "Disney Springs", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "secondary", latitude: 28.3715, longitude: -81.5191 },
  { slug: "universal-orlando-area-fl", city: "Universal Orlando Area", state: "Florida", stateCode: "FL", region: "Orange County", market: "Orlando", tier: "secondary", latitude: 28.4722, longitude: -81.4686 }
];

// Combine all Tampa Bay locations
export const tampaBayExtendedLocations: FLCity[] = [
  ...tampaBayPrimaryCities,
  ...tampaBaySuburbanCities,
  ...pinellasCountyCities,
  ...hillsboroughAdditionalCities,
  ...pascoCountyCities,
  ...hernandoCountyCities
];

// Combine all Orlando locations
export const orlandoExtendedLocations: FLCity[] = [
  ...orlandoPrimaryCities,
  ...orlandoSuburbanCities,
  ...osceolaCountyCities,
  ...seminoleCountyCities,
  ...orangeCountyCities,
  ...lakeCountyCities,
  ...tourismMicroMarkets
];

// All extended Florida locations
export const flExtendedLocations: FLCity[] = [
  ...tampaBayExtendedLocations,
  ...orlandoExtendedLocations
];

// Get all extended FL slugs
export function getExtendedFLSlugs(): string[] {
  return flExtendedLocations.map(loc => loc.slug);
}

// Get FL city by slug
export function getFLExtendedCityBySlug(slug: string): FLCity | undefined {
  return flExtendedLocations.find(loc => loc.slug === slug);
}

// Total counts
export const TOTAL_TAMPA_BAY_EXTENDED = tampaBayExtendedLocations.length;
export const TOTAL_ORLANDO_EXTENDED = orlandoExtendedLocations.length;
export const TOTAL_FL_EXTENDED = flExtendedLocations.length;
