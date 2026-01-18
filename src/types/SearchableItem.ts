
import type { FileItem } from '../types/FileItem';
import type { User } from '../types/User';

export type SearchableItem = FileItem | User;


export function isFileItem(item: SearchableItem): item is FileItem {
    return 'type' in item;  // FileItem ma pole 'type', User nie
}


export function isUser(item: SearchableItem): item is User {
    return 'email' in item;  // User ma pole 'email', FileItem nie
}