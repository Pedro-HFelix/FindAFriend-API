import type { Pet, Prisma } from '@prisma/client';

export interface PetsFilterParams {
	city: string;
	state: string;
	age?: string;
	size?: string;
	energy_level?: string;
	level_independence?: string;
}

export interface PetsRepository {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
	findAll(params: PetsFilterParams): Promise<Pet[] | []>;
	findPetById(id: string): Promise<Pet | null>;
}
