import { PrismaOrgsRepository } from '@/repositories/Prisma/prisma-orgs-repository';
import { CreateOrgUseCase } from '@/use-cases/org/create-org';

export function makeCreateOrgUseCase() {
	const orgsRepository = new PrismaOrgsRepository();
	const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

	return createOrgUseCase;
}
