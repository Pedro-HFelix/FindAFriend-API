import type {
	PetsFilterParams,
	PetsRepository,
} from '@/repositories/pets.repository';

export class FindAllPetUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		city,
		age,
		energy_level,
		level_independence,
		size,
		state,
	}: PetsFilterParams) {
		const pets = await this.petsRepository.findAll({
			city,
			state,
			age,
			size,
			energy_level,
			level_independence,
		});

		return {
			pets,
		};
	}
}
