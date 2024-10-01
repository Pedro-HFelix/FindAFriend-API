import { PetNotFound } from '@/errors/pet-not-found';
import { makeGetOrgByIdOrgUseCase } from '@/utils/factories/orgs/make-get-org-by-id-use-case';
import { makeFindUniquePetsUseCase } from '@/utils/factories/pets/make-find-unique-pet';
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
	const findOrgById = makeGetOrgByIdOrgUseCase();

	try {
		const { pet } = await getUniquePetUseCase.execute(id);
		const { org } = await findOrgById.execute(pet.org_id);

		const orgReturn = {
			name: org?.name,
			whatsapp: org?.whatsapp,
		};
		return reply.status(200).send({ pet, orgReturn });
	} catch (error) {
		if (error instanceof PetNotFound) {
			return reply.status(400).send({ message: error.message });
		}

		return reply.status(500).send({ message: 'Internal server error' });
	}
}
