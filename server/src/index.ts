import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
/* ROUTE IMPORTS */
import kbClientRoutes from './routes/kbClientRoutes';
import fileStorageRoutes from './routes/fileStorageRoutes';
import socialMediaRoutes from './routes/socialMediaRoutes';
import teamMemberRoutes from './routes/teamMemberRoutes';
import catalogRoutes from './routes/catalogRoutes';
import authRoutes from './routes/authRoutes';
import { authorizeRole } from './middleware/authorizeRole';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/api/auth', authRoutes);
app.use('/api/clients', authorizeRole(['admin']), kbClientRoutes); // http://localhost:3001/api/clients
app.use('/api/files', authorizeRole(['admin']), fileStorageRoutes); // http://localhost:3001/api/files
app.use('/api/social-media', authorizeRole(['admin']), socialMediaRoutes); // http://localhost:3001/api/social-media
app.use('/api/team-member', authorizeRole(['admin']), teamMemberRoutes); // http://localhost:3001/api/team-member
app.use('/api/catalog', authorizeRole(['admin']), catalogRoutes); // http://localhost:3001/api/catalog

/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
