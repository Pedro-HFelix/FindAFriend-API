import { PrismaOrgsRepository } from '@/repositories/Prisma/prisma-orgs-repository';
import { PrismaPetsRepository } from '@/repositories/Prisma/prisma-pets-repository';
import { findPetByIdUseCase } from '@/use-cases/pets/find-pet-by-id';

export function makeFindUniquePetsUseCase() {
	const orgsRepository = new PrismaOrgsRepository();

	const petsRepository = new PrismaPetsRepository(orgsRepository);
	const findUniquePetsUseCase = new findPetByIdUseCase(petsRepository);

	return findUniquePetsUseCase;
}
