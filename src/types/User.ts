export interface User {
    id:string; //later guid or smth
    name:string;
    email:string;
    password?: string; // tylko dla MOCK, potem usunac 
    avatar:string;
}