import type { PetsRepository } from '../../repositories/pets.repository';
import { PetNotFound } from '@/errors/pet-not-found';

export class findPetByIdUseCase {
	constructor(private petsRepository: PetsRepository) {}
	async execute(id: string) {
		const pet = await this.petsRepository.findPetById(id);

		if (!pet) {
			throw new PetNotFound();
		}

		return {
			pet,
		};
	}
}
