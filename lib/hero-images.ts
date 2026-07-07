// Rotating hero images for landing pages
// All images live in /public/hero/

export const heroImages = [
  '/hero/Startup Consultant Joshua Paul Hooks copy.png',
  '/hero/Joshua Paul Hooks Marketing Strategy copy.png',
  '/hero/Small Business Consultant Joshua Paul Hooks copy.png',
  '/hero/Joshua Paul Hooks Raise Capital copy.png',
  '/hero/Joshua Paul Hooks Mentor copy.png',
  '/hero/Board Of Advisors Joshua Paul Hooks copy.png',
  '/hero/Restaraunt Consultant Joshua Paul Hooks copy.png',
  '/hero/Joshua Paul Hooks Golf Cart Consulting.png',
  '/hero/Florist Consultant Joshua Paul Hooks.png',
  '/hero/JT Bakery.png',
  '/hero/JT Floral.png',
  '/hero/Joshua Paul Hooks China copy.png',
  '/hero/Joshua Paul Hooks BBQ copy.png',
  '/hero/20260303_1209_Business Consultation Restaurant Scene_remix_01kjtas3dtftx8zn5008kpdytm.png',
  '/hero/20260303_1210_Image Generation_remix_01kjtarabtfm2rcqyzmdb5ektk.png',
  '/hero/20260303_1211_Image Generation_remix_01kjtav04vftxsxm4d6xhjswrc.png',
  '/hero/20260303_1212_Image Generation_remix_01kjtaw9jnf4tt3249xvcmh1bk.png',
  '/hero/20260303_1213_Image Generation_remix_01kjtaxe60entsz7vrfyy60311.png',
  '/hero/IMG_0103 2.JPG',
  '/hero/IMG_0325 3.JPG',
  '/hero/IMG_0983 3.jpg',
];

/**
 * Returns a hero image deterministically based on a seed string.
 * Same slug always gets the same image — no randomness at render time.
 */
export function getHeroImage(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return heroImages[hash % heroImages.length];
}
