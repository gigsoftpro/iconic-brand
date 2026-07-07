// Target Locations for Iconic Brand Group
// Top 350 US Cities + Extended Florida Coverage (~100 FL suburbs)

import { usTop350Cities, USCity, getAllUSCitySlugs, getUSCityBySlug, getNearbyUSCities, US_CITIES_TOTAL } from './us-cities-top-350';
import { flExtendedLocations, FLCity, tampaBayExtendedLocations, orlandoExtendedLocations, TOTAL_FL_EXTENDED, getFLExtendedCityBySlug } from './fl-extended-locations';

export interface TargetLocation {
  slug: string;
  city: string;
  state: string;
  stateCode: string;
  region: string;
  market: string;
  tier: 'primary' | 'suburban' | 'secondary' | 'major' | 'large' | 'medium' | 'small';
  latitude?: number;
  longitude?: number;
}

// Convert USCity to TargetLocation format
function convertUSCityToTargetLocation(city: USCity): TargetLocation {
  const tierMap: Record<USCity['tier'], TargetLocation['tier']> = {
    major: 'primary',
    large: 'suburban',
    medium: 'secondary',
    small: 'secondary',
  };

  return {
    slug: city.slug,
    city: city.city,
    state: city.state,
    stateCode: city.stateCode,
    region: city.region,
    market: city.metro || `${city.city} Metro`,
    tier: tierMap[city.tier],
    latitude: city.latitude,
    longitude: city.longitude,
  };
}

// Convert FLCity to TargetLocation format
function convertFLCityToTargetLocation(city: FLCity): TargetLocation {
  return {
    slug: city.slug,
    city: city.city,
    state: city.state,
    stateCode: city.stateCode,
    region: city.region,
    market: city.market,
    tier: city.tier,
    latitude: city.latitude,
    longitude: city.longitude,
  };
}

// Get slugs already in top 350 to avoid duplicates
const top350Slugs = new Set(usTop350Cities.map(c => c.slug));

// Extended FL cities NOT already in top 350
const extendedFLNotInTop350 = flExtendedLocations.filter(c => !top350Slugs.has(c.slug));

// All target locations - Top 350 US cities + Extended FL suburbs (deduplicated)
export const allTargetLocations: TargetLocation[] = [
  ...usTop350Cities.map(convertUSCityToTargetLocation),
  ...extendedFLNotInTop350.map(convertFLCityToTargetLocation)
];

// Get all location slugs for static generation
export function getAllLocationSlugs(): string[] {
  return allTargetLocations.map(l => l.slug);
}

// Get location by slug - checks both top 350 and extended FL
export function getLocationBySlug(slug: string): TargetLocation | undefined {
  // First check top 350
  const usCity = getUSCityBySlug(slug);
  if (usCity) return convertUSCityToTargetLocation(usCity);
  
  // Then check extended FL
  const flCity = getFLExtendedCityBySlug(slug);
  if (flCity) return convertFLCityToTargetLocation(flCity);
  
  return undefined;
}

// Get locations by market (state)
export function getLocationsByMarket(stateCode: string): TargetLocation[] {
  return allTargetLocations.filter(l => l.stateCode === stateCode);
}

// Get locations by tier
export function getLocationsByTier(tier: TargetLocation['tier']): TargetLocation[] {
  return allTargetLocations.filter(l => l.tier === tier);
}

// Get nearby locations
export function getNearbyLocations(slug: string, limit: number = 5): TargetLocation[] {
  const nearbyCities = getNearbyUSCities(slug, limit);
  return nearbyCities.map(convertUSCityToTargetLocation);
}

// Format city name for display
export function formatCityName(location: TargetLocation): string {
  return `${location.city}, ${location.stateCode}`;
}

// Format city for URL-safe slug
export function formatCitySlug(city: string, stateCode: string): string {
  return city.toLowerCase().replace(/['\s]+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + stateCode.toLowerCase();
}

// Export totals for reference
export const TOTAL_LOCATIONS = allTargetLocations.length;

// Greater Tampa Bay Market - all Tampa Bay area cities
export const tampaBayLocations: TargetLocation[] = [
  ...tampaBayExtendedLocations.map(convertFLCityToTargetLocation)
];

// Greater Orlando Market - all Orlando area cities  
export const orlandoLocations: TargetLocation[] = [
  ...orlandoExtendedLocations.map(convertFLCityToTargetLocation)
];

export const TOTAL_TAMPA_BAY_LOCATIONS = tampaBayLocations.length;
export const TOTAL_ORLANDO_LOCATIONS = orlandoLocations.length;

// Group all locations by state for national hub page
export function getLocationsByState(): Record<string, TargetLocation[]> {
  const grouped: Record<string, TargetLocation[]> = {};
  
  for (const location of allTargetLocations) {
    if (!grouped[location.state]) {
      grouped[location.state] = [];
    }
    grouped[location.state].push(location);
  }
  
  // Sort states alphabetically, sort cities within each state
  const sortedStates = Object.keys(grouped).sort();
  const result: Record<string, TargetLocation[]> = {};
  
  for (const state of sortedStates) {
    result[state] = grouped[state].sort((a, b) => a.city.localeCompare(b.city));
  }
  
  return result;
}

// Get unique states count
export function getUniqueStatesCount(): number {
  const states = new Set(allTargetLocations.map(l => l.state));
  return states.size;
}

// Re-export types and utilities from us-cities
export type { USCity };
export { usTop350Cities, usCitiesByTier, getUSCityBySlug, getUSCitiesByState, getUSCitiesByRegion, getUSCitiesByTier } from './us-cities-top-350';
