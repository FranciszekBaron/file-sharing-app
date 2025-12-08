export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'pdf' | 'doc' | 'image' | 'other' | 'txt';
    size?: number;
    modifiedDate: Date;
    owner?: string;
    shared?: boolean;
    starred?: boolean;
    deleted?:boolean;
    deletedAt?: Date;
}