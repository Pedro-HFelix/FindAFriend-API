import { PrismaOrgsRepository } from '@/repositories/Prisma/prisma-orgs-repository';
import { CreateOrgUseCase } from '@/use-cases/org/create-org';
import { FindOrgByIdUseCase } from '@/use-cases/org/find-org-by-id';

export function makeGetOrgByIdOrgUseCase() {
	const orgsRepository = new PrismaOrgsRepository();
	const findOrgById = new FindOrgByIdUseCase(orgsRepository);

	return findOrgById;
}
