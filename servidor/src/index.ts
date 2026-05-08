import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import movieRoutes from './routes/movie.routes';
import cinemaRoutes from './routes/cinema.routes';
import authRoutes from './routes/auth.routes';
import paymentRoutes from './routes/payment.routes';
import { JWTStrategy } from './libs/auth';

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(JWTStrategy);

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cines API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', movieRoutes);
app.use('/api', cinemaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`Swagger en http://localhost:${PORT}/api-docs`);
});