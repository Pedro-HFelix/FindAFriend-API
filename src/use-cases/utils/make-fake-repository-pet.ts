import { randomUUID } from 'node:crypto';

export async function makeFakeRepositoryPet(org_id: string) {
	const pet = {
		id: randomUUID(),
		name: 'Fake Pet',
		description: 'This is a fake pet',
		age: 'puppy',
		size: 'Medium',
		environment: 'Indoor',
		energy_level: 'High',
		level_independence: 'Low',
		adoption_requirements: [],
		pictures: [],
		org_id: org_id,
		created_at: new Date(),
		updated_at: new Date(),
	};

	return pet;
}
