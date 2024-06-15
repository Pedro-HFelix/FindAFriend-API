import type { Pet, Prisma } from '@prisma/client';
import type { PetsRepository } from '../pets.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPetsRepository implements PetsRepository {
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
}
