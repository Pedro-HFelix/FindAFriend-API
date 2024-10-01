import { PrismaOrgsRepository } from '@/repositories/Prisma/prisma-orgs-repository';
import { PrismaPetsRepository } from '@/repositories/Prisma/prisma-pets-repository';
import { CreatePetUseCase } from '@/use-cases/pets/create';

export function makeCreatePetUseCase() {
	const orgsRepository = new PrismaOrgsRepository();

	const petsRepository = new PrismaPetsRepository(orgsRepository);
	const createOrgUseCase = new CreatePetUseCase(petsRepository, orgsRepository);

	return createOrgUseCase;
}
