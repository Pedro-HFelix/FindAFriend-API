import { PetNotFound } from '@/use-cases/errors/pet-not-found';
import { makeFindUniquePetsUseCase } from '@/use-cases/factories/pets/make-find-unique-pet';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function findUniquePet(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const routerParamSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = routerParamSchema.parse(request.params);

	const getUniquePetUseCase = makeFindUniquePetsUseCase();

	try {
		const { pet } = await getUniquePetUseCase.execute(id);

		return reply.status(200).send(pet);
	} catch (error) {
		if (error instanceof PetNotFound) {
			return reply.status(400).send({ message: error.message });
		}

		return reply.status(500).send({ message: 'Internal server error' });
	}
}
