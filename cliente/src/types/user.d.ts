export interface User {
    id: number;
    email: string;
    role: 'USER' | 'CINEMA' | 'ADMIN';
}