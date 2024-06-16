import { OrgAlreadyExists } from '@/use-cases/errors/org-already-exists-error';
import { makeCreateOrgUseCase } from '@/use-cases/factories/orgs/make-create-org-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createOrgController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodySchema = z.object({
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
		latitude: z.number(),
		longitude: z.number(),
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
	} = authenticateBodySchema.parse(request.body);

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
			return reply.status(401).send({ message: error.message });
		}

		throw error;
	}
}
