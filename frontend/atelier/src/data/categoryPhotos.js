/**
 * Photos Unsplash (usage conforme à leur licence) — ambiance par catégorie
 */
const LIBRARY_DEFAULT =
  'https://images.unsplash.com/photo-1507842217343-583bb727b70d?auto=format&fit=crop&w=800&q=80'

export const CATEGORY_PHOTOS = {
  Roman:
    'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=800&q=80',
  'Science-Fiction':
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  Biographie:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  Histoire:
    'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
  Développement:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
}

export function getCategoryPhotoUrl(nom) {
  if (!nom) return LIBRARY_DEFAULT
  return CATEGORY_PHOTOS[nom] ?? LIBRARY_DEFAULT
}

export const HERO_LIBRARY_PHOTO =
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=85'
