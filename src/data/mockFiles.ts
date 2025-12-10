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
    modifiedDate: new Date('2025-11-20'),
    owner: 'Ty',
    starred: true
  },
  {
    id: '3',
    name: 'Raport.pdf',
    type: 'pdf',
    size: 1908576,
    modifiedDate: new Date('2024-11-15'),
    owner: 'Ty',
    shared: true
  },
  {
    id: '4',
    name: 'Wakacje',
    type: 'folder',
    modifiedDate: new Date('2023-10-01'),
    owner: 'Ty'
  },
  {
    id: '5',
    name: 'MojaNotatka.txt',
    type: 'doc',
    size: 3068576,
    modifiedDate: new Date('2024-11-15'),
    owner: 'Ty',
    shared: true,
    deleted:false,
    deletedAt:new Date('2024-12-12')
  },
  {
    id: '6',
    name: 'plikusuniety.txt',
    type: 'doc',
    size: 3068576,
    modifiedDate: new Date('2024-11-15'),
    owner: 'Ty',
    shared: true,
    deleted:true,
    deletedAt:new Date('2024-12-12')
  }
]