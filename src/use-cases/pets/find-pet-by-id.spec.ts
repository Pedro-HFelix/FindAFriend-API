import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { makeFakePet } from '../utils/make-fake-pet';
import { makeFakeOrgs } from '../utils/make-fake-org';
import { findPetByIdUseCase } from './find-pet-by-id';
import { randomUUID } from 'node:crypto';

describe('Search Pets Use Case', () => {
	let orgsRepository: InMemoryOrgsRepository;
	let petsRepository: InMemoryPetsRepository;
	let sut: findPetByIdUseCase;

	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository();
		petsRepository = new InMemoryPetsRepository(orgsRepository);
		sut = new findPetByIdUseCase(petsRepository);
	});

	it('should be able to search pets by level_independence', async () => {
		await makeFakeOrgs(orgsRepository);
		for (let i = 0; i < 3; i++) {
			await makeFakePet(orgsRepository.items[0].id, petsRepository.items);
		}
		const pet_id = petsRepository.items[0].id;

		const { pet } = await sut.execute(pet_id);

		expect(pet?.id).toEqual(expect.any(String));
		expect(pet?.name).toEqual('Fake Pet');
		expect(pet?.age).toEqual('puppy');
	});

	it('should not be able to search pets by level_independence', async () => {
		await makeFakeOrgs(orgsRepository);
		await makeFakePet(orgsRepository.items[0].id, petsRepository.items);

		const { pet } = await sut.execute(randomUUID());

		expect(pet).toBeNull();
	});
});
