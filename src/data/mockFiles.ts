import type { FileItem } from "../types/FileItem";


//to tak jak statyczne readonly juz uzupelnione

//udostepniam stałą tupy FileItem[] czyli tablica FileItem
//public static readonly FileItem[] MockFiles = new FileItem[] { ... };

export const mockFiles: FileItem[] = [
    {
    id: '1',
    name: 'Projekty 2024',
    type: 'folder',
    modifiedDate: new Date('2024-11-20'),
    owner: 'Ty',
    starred: true
  },
  {
    id: '2',
    name: 'Projekty 2025',
    type: 'folder',
    modifiedDate: new Date('2024-11-20'),
    owner: 'Ty',
    starred: true
  },
  {
    id: '3',
    name: 'Raport.pdf',
    type: 'pdf',
    size: 2048576,
    modifiedDate: new Date('2024-11-15'),
    owner: 'Ty',
    shared: true
  },
  {
    id: '4',
    name: 'Wakacje',
    type: 'folder',
    modifiedDate: new Date('2024-10-01'),
    owner: 'Ty'
  }
]