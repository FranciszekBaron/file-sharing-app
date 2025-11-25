export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'pdf' | 'doc' | 'image' | 'other';
    size?: number;
    modifiedDate: Date;
    owner?: string;
    shared?: boolean;
    starred?: boolean;
}