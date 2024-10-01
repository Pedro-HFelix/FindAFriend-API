import { InvalidCredentialError } from '@/errors/invalid-credentials-error';
import { makeAuthenticateOrgUseCase } from '@/utils/factories/orgs/make-authenticate-org-use-case';
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
			return reply.status(400).send({ message: error.message });
		}

		return reply.status(500).send({ message: 'Internal server error' });
	}
}
