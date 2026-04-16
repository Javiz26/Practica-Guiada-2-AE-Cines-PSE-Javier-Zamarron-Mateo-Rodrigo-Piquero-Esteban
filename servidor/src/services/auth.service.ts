import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../libs/prisma';        // ← adaptado a nuestro proyecto
import { Role } from '../../prisma/generated/prisma';  // ← adaptado a nuestro proyecto

export const AuthService = {

  register: async (email: string, password: string, role: Role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, role }
      });
      return { success: true, message: 'Usuario creado', id: user.id };
    } catch (e) {
      return { success: false, error: 'error' };
    }
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, error: 'Credenciales incorrectas' };
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET || 'mi_llave_super_secreta',
      { expiresIn: '8h' }
    );

    return { success: true, token };
  }
};