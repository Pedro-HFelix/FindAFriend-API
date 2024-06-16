import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/orgs/make-authenticate-org-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticateOrgController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodySchema.parse(request.body);

	try {
		const authenticateOrgUseCase = makeAuthenticateOrgUseCase();

		const { org } = await authenticateOrgUseCase.execute({ email, password });
		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: org.id,
				},
			},
		);

		return reply.status(200).send({ token });
	} catch (error) {
		if (error instanceof InvalidCredentialError) {
			return reply.status(401).send({ message: error.message });
		}

		throw error;
	}
}
