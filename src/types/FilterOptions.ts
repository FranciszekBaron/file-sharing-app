// types/FilterOptions.ts  ← .ts, tylko dane
export const filterItems = [
  { id: 'folder' as const, label: 'Foldery' },
  { id: 'doc' as const, label: 'Dokumenty' },
  { id: 'pdf' as const, label: 'Pliki PDF' }
] as const;

export type FilterItemId = typeof filterItems[number]['id'];