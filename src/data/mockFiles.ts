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
    starred: true,
    parentId:null
  },
  {
    id: '2',
    name: 'Projekty 2025',
    type: 'folder',
    modifiedDate: new Date('2025-11-20'),
    owner: 'Ty',
    starred: false,
    parentId:null
  },
  {
    id: '3',
    name: 'Raport.pdf',
    type: 'pdf',
    size: 1908576,
    modifiedDate: new Date('2024-11-15'),
    owner: 'Ty',
    shared: false,
    parentId:null
  },
  {
    id: '4',
    name: 'Wakacje',
    type: 'folder',
    modifiedDate: new Date('2023-10-01'),
    owner: 'Ty',
    parentId:null
  },
  {
    id: '5',
    name: 'MojaNotatka.txt',
    type: 'txt',
    size: 3068576,
    modifiedDate: new Date('2024-11-15'),
    owner: 'Ty',
    shared: false,
    starred:true,
    deleted:false,
    deletedAt:new Date('2024-12-12'),
    parentId:null
  },
  {
    id: '6',
    name: 'plikusuniety.txt',
    type: 'txt',
    size: 3068576,
    modifiedDate: new Date('2024-11-15'),
    owner: 'Ty',
    shared: false,
    deleted:true,
    deletedAt:new Date('2024-12-12'),
    parentId:null
  },
  {
    id: '7',
    name: 'plikWFolderze.txt',
    type: 'txt',
    size: 3868576,
    modifiedDate: new Date('2024-03-14'),
    owner: 'Ty',
    shared: false,
    parentId:'1'
  },
  {
    id: '8',
    name: 'plik2WFolderze.txt',
    type: 'txt',
    size: 3868576,
    modifiedDate: new Date('2024-03-14'),
    owner: 'Ty',
    shared: false,
    starred:true,
    parentId:'1'
  },
  {
    id: '9',
    name: 'plik2WFolderze2.txt',
    type: 'txt',
    size: 3868576,
    modifiedDate: new Date('2024-03-14'),
    owner: 'Ty',
    shared: false,
    parentId:'2'
  },
  {
    id: '10',
    name: 'FolderStary',
    type: 'folder',
    size: 3868576,
    modifiedDate: new Date('2021-03-14'),
    owner: 'Ty',
    shared: false,
    parentId:null
  },
  {
    id: '11',
    name: 'FolderJeszczeStarszy',
    type: 'folder',
    size: 3868576,
    modifiedDate: new Date('2021-03-10'),
    owner: 'Ty',
    shared: false,
    parentId:null
  },
  {
    id: '12',
    name: 'Sharowany1.txt',
    type: 'txt',
    size: 3068576,
    modifiedDate: new Date('2025-11-15'),
    owner: 'Ty',
    shared: true,
    starred:false,
    parentId:null
  },
  {
    id: '13',
    name: 'Sharowany2.txt',
    type: 'txt',
    size: 3068576,
    modifiedDate: new Date('2025-11-15'),
    owner: 'Ty',
    shared: true,
    starred:false,
    parentId:null
  }

]


export const MOCK_FILES_CONTENTS = new Map<string,string>([
  ["5","Cześć Hello World i w ogóle \n ide sobie dalej nie przjemuje sie tym"],
  ["3","data:application/pdf;base64"],
  ["6","jestem usuniety"],
  ["9","jestem sobei w folderku"],
  ["7","jestem sobei w folderku21e12"],
  ["8","jestem sobei w folderkuasdfaf[ok"],
]);