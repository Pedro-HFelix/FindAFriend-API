import { FindManyPetUseCase } from '../../../use-cases/pets/find-many-pets';
import { PrismaOrgsRepository } from '@/repositories/Prisma/prisma-orgs-repository';
import { PrismaPetsRepository } from '@/repositories/Prisma/prisma-pets-repository';

export function makeFindManyPetsUseCase() {
	const orgsRepository = new PrismaOrgsRepository();

	const petsRepository = new PrismaPetsRepository(orgsRepository);
	const findManyPetsUseCase = new FindManyPetUseCase(petsRepository);

	return findManyPetsUseCase;
}
