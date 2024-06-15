import type { Pet } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export async function makeFakePet(org_id: string, items: Pet[]) {
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

	items.push(pet);
}
