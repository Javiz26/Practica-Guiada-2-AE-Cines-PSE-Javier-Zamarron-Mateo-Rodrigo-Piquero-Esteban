import type{ JwtPayload } from "./JwtPayload";


export interface AuthContextType {
token: string | null;
user: JwtPayload | null;
login: ((email: string, password: string) => Promise<void>);
logout: () => void;
}