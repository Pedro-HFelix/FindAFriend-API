import type { Pet, Prisma } from '@prisma/client';
import type { PetsFilterParams, PetsRepository } from '../pets.repository';
import type { PrismaOrgsRepository } from './prisma-orgs-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetsRepository implements PetsRepository {
	constructor(private orgsRepository: PrismaOrgsRepository) {}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.create({
			data,
		});

		return pet;
	}

	async findAll(params: PetsFilterParams) {
		const orgsByCityAndState = await prisma.org.findMany({
			where: {
				city: params.city,
				state: params.state,
			},
		});

		const pets: Pet[] = await prisma.pet.findMany({
			where: {
				org_id: {
					in: orgsByCityAndState.map((org) => org.id),
				},
				age: params.age,
				energy_level: params.energy_level,
				size: params.size,
				level_independence: params.level_independence,
			},
		});

		return pets;
	}

	async findPetById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			},
		});

		if (!pet) return null;

		return pet;
	}
}
