import { OrgNotFound } from '@/use-cases/errors/org-not-found';
import { makeCreatePetUseCase } from '@/use-cases/factories/pets/make-create-pet-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createPetController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createPetBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		age: z.string(),
		size: z.string(),
		environment: z.string(),
		energy_level: z.string(),
		level_independence: z.string(),
		adoption_requirements: z.array(z.string()).optional(),
		pictures: z.array(z.string()).optional(),
	});

	const org_id = request.user.sub;

	const {
		name,
		description,
		age,
		size,
		environment,
		energy_level,
		level_independence,
		adoption_requirements,
		pictures,
	} = createPetBodySchema.parse(request.body);

	try {
		const createOrgUseCase = makeCreatePetUseCase();

		await createOrgUseCase.execute({
			name,
			description,
			age,
			size,
			environment,
			energy_level,
			level_independence,
			adoption_requirements,
			org_id,
			pictures,
		});

		return reply.status(201).send();
	} catch (error) {
		if (error instanceof OrgNotFound) {
			return reply.status(401).send({ message: error.message });
		}

		return reply.status(500).send({ message: 'Internal server error' });
	}
}
