import type { PetsRepository } from '../../repositories/pets.repository';

export class findPetByIdUseCase {
	constructor(private petsRepository: PetsRepository) {}
	async execute(id: string) {
		const pet = await this.petsRepository.findPetById(id);

		return {
			pet,
		};
	}
}
