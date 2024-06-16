import { PrismaOrgsRepository } from '@/repositories/Prisma/prisma-orgs-repository';
import { AuthenticateOrgUseCase } from '../../org/authenticate';

export function makeAuthenticateOrgUseCase() {
	const orgsRepository = new PrismaOrgsRepository();
	const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository);

	return authenticateOrgUseCase;
}
