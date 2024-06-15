import type { Pet, Prisma } from '@prisma/client';
import type { PetsFilterParams, PetsRepository } from '../pets.repository';
import { randomUUID } from 'node:crypto';
import type { InMemoryOrgsRepository } from './in-memory-orgs-repository';
import { makeFakeOrgs } from '@/use-cases/utils/make-fake-org';

export class InMemoryPetsRepository implements PetsRepository {
	constructor(private orgsRepository: InMemoryOrgsRepository) {}
	public items: Pet[] = [];

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet: Pet = {
			id: randomUUID(),
			name: data.name,
			description: data.description,
			age: data.age,
			size: data.size,
			environment: data.environment,
			energy_level: data.energy_level,
			level_independence: data.level_independence,
			adoption_requirements: (data.adoption_requirements as string[]) || [],
			pictures: (data.pictures as string[]) || [],
			org_id: data.org_id,
			created_at: new Date(),
			updated_at: new Date(),
		};

		this.items.push(pet);

		return pet;
	}

	async findAll(params: PetsFilterParams) {
		makeFakeOrgs(this.orgsRepository);

		const orgsByCityAndState = this.orgsRepository.items
			.filter((org) => org.city === params.city)
			.filter((org) => org.state === params.state);

		const pets: Pet[] = this.items
			.filter((pet) => orgsByCityAndState.some((org) => org.id === pet.org_id))
			.filter((pet) => (params.age ? pet.age === params.age : true))
			.filter((pet) =>
				params.energy_level ? pet.energy_level === params.energy_level : true,
			)
			.filter((pet) => (params.size ? pet.size === params.size : true))
			.filter((pet) =>
				params.level_independence
					? pet.level_independence === params.level_independence
					: true,
			);

		console.log(pets);
		return pets;
	}

	async findPetById(id: string) {
		const pet = this.items.find((pet) => pet.id === id);

		if (!pet) return null;

		return pet;
	}
}
