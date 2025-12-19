export interface FileUser {
    fileId: string,
    userId: string,
    permissions: 'owner' | 'view' | 'edit'
}