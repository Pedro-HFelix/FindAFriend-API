import type { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { createPetController } from './create-pet.controller';
import { findManyPetsController } from './find-many-pets.controller';
import { findUniquePet } from './find-unique-pet';

export async function petsRoutes(app: FastifyInstance) {
	app.post('/org/pet/create', { onRequest: [verifyJwt] }, createPetController);
	app.get('/pets', findManyPetsController);
	app.get('/pet/:id', findUniquePet);
}
