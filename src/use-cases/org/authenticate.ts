import type { OrgsRepository } from '@/repositories/orgs.repository';
import { compare } from 'bcryptjs';
import { InvalidCredentialError } from '@/errors/invalid-credentials-error';

export interface AuthenticateOrgUseCaseRequest {
	email: string;
	password: string;
}

export class AuthenticateOrgUseCase {
	constructor(private orgsRepository: OrgsRepository) {}

	async execute({ email, password }: AuthenticateOrgUseCaseRequest) {
		const org = await this.orgsRepository.findByEmail(email);

		if (!org) {
			throw new InvalidCredentialError();
		}

		const doesPasswordMatches = await compare(password, org.password);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialError();
		}

		return {
			org,
		};
	}
}
