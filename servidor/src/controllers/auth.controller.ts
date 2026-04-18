import type { Request, Response } from 'express';
import { isValidEmail } from '../libs/utils';
import { AuthService } from '../services/auth.service';
import { Role } from '../../prisma/generated/prisma';  

// Registro de usuarios
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validación antes de llegar al servicio
        if (!email || !isValidEmail(email)) {
            res.status(400).json({ error: 'Email no válido' });
            return;   
        }
        if (!password || password.length < 6) {
            res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
            return;   
        }

        const response = await AuthService.register(email, password, Role.CLIENT);
        if (!response.success) {
            res.status(400).json(response);
        } else {
            res.status(201).json(response);
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

// Inicio de sesión
const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const response = await AuthService.login(email, password);
        if (!response.success) {
            res.status(401).json(response);
        } else {
            res.status(200).json(response);
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

export const AuthController = {
    register,
    login
};