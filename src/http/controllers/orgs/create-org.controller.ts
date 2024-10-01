import { OrgAlreadyExists } from '@/errors/org-already-exists-error';
import { makeCreateOrgUseCase } from '@/utils/factories/orgs/make-create-org-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createOrgController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createOrgBodySchema = z.object({
		name: z.string(),
		author_name: z.string(),
		email: z.string(),
		whatsapp: z.string(),
		password: z.string(),
		cep: z.string(),
		state: z.string(),
		city: z.string(),
		neighborhood: z.string(),
		street: z.string(),
		latitude: z.coerce.number(),
		longitude: z.coerce.number(),
	});

	const {
		author_name,
		cep,
		city,
		email,
		latitude,
		longitude,
		name,
		neighborhood,
		password,
		state,
		street,
		whatsapp,
	} = createOrgBodySchema.parse(request.body);

	try {
		const authenticateUseCase = makeCreateOrgUseCase();

		await authenticateUseCase.execute({
			author_name,
			cep,
			city,
			email,
			latitude,
			longitude,
			name,
			neighborhood,
			password,
			state,
			street,
			whatsapp,
		});

		return reply.status(201).send();
	} catch (error) {
		if (error instanceof OrgAlreadyExists) {
			return reply.status(400).send({ message: error.message });
		}

		return reply.status(500).send({ message: 'Internal server error' });
	}
}
