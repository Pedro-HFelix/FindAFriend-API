import type { OrgsRepository } from '@/repositories/orgs.repository';
import type { PetsRepository } from '@/repositories/pets.repository';
import { OrgNotFound } from '../errors/org-not-found';
import { InvalidCredentialError } from '../errors/invalid-credentials-error';

interface CreatePetUseCaseRequest {
	name: string;
	description: string;
	age: string;
	size: string;
	environment: string;
	energy_level: string;
	level_independence: string;
	adoption_requirements?: string[];
	org_id: string;
}

export class CreatePetUseCase {
	constructor(
		private petsRepository: PetsRepository,
		private orgsRepository: OrgsRepository,
	) {}

	async execute({
		name,
		description,
		age,
		size,
		environment,
		energy_level,
		level_independence,
		adoption_requirements,
		org_id,
	}: CreatePetUseCaseRequest) {
		const org = await this.orgsRepository.findById(org_id);
		if (!org) throw new OrgNotFound();

		const pet = await this.petsRepository.create({
			name,
			description,
			age,
			size,
			environment,
			energy_level,
			level_independence,
			adoption_requirements,
			org_id,
		});

		return {
			pet,
		};
	}
}
