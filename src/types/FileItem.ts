
export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'pdf' | 'doc' | 'image' | 'other' | 'txt';
    size?: number;
    modifiedDate?: Date;
    isOwner?: boolean;
    ownerId?: string;
    sharedBy?:string;
    starred?: boolean;
    deleted?:boolean;
    deletedAt?: Date;
    parentId?: string | null;
    contentUrl?: string;
}