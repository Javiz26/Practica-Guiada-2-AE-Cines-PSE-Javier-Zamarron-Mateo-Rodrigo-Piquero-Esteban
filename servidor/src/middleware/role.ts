import { Request, Response, NextFunction } from 'express';
import { Role } from '../../prisma/generated/prisma'; // ← no '@prisma/client' como el slide

export const authorize = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // req.user fue inyectado por Passport previamente
        const user = req.user as any;

        if (!user || !allowedRoles.includes(user.role)) {
            res.status(403).json({
                message: "No tienes permiso para acceder a este recurso"
            });
            return; 
        }

        next();
    };
};