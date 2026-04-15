export interface JwtPayload {
sub: string;
role: 'CLIENT' | 'CINEMA' | 'ADMIN';
}