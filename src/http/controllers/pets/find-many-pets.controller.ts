import { makeFindManyPetsUseCase } from '@/utils/factories/pets/make-find-many-pets';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function findManyPetsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const queryFindPetsSchema = z.object({
		city: z.string().min(1),
		state: z.string().min(1),
		age: z.string().optional(),
		size: z.string().optional(),
		energy_level: z.string().optional(),
		level_independence: z.string().optional(),
	});

	const { city, age, energy_level, level_independence, size, state } =
		queryFindPetsSchema.parse(request.query);

	const searchPetsUseCase = makeFindManyPetsUseCase();

	try {
		const { pets } = await searchPetsUseCase.execute({
			city,
			age,
			energy_level,
			level_independence,
			size,
			state,
		});

		return reply.status(200).send({ pets });
	} catch (error) {
		return reply.status(500).send({ message: 'Internal server error' });
	}
}
