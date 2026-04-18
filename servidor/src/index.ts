import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movie.routes';
import cinemaRoutes from './routes/cinema.routes';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import { JWTStrategy } from './libs/auth';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(JWTStrategy);

// Enganchamos las rutas de cines, películas y autenticación
app.use('/api', movieRoutes);
app.use('/api', cinemaRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});