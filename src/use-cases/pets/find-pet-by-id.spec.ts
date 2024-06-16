import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { makeFakeRepositoryPet } from '../utils/make-fake-repository-pet';
import { makeFakeRepositoryOrgs } from '../utils/make-fake-repository-org';
import { findPetByIdUseCase } from './find-pet-by-id';
import { randomUUID } from 'node:crypto';

describe('Search Pets Use Case', () => {
	let orgsRepository: InMemoryOrgsRepository;
	let petsRepository: InMemoryPetsRepository;
	let sut: findPetByIdUseCase;

	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository();
		petsRepository = new InMemoryPetsRepository(orgsRepository);
		sut = new findPetByIdUseCase(petsRepository);

		const org = await makeFakeRepositoryOrgs();
		orgsRepository.items.push(org);

		for (let i = 0; i < 3; i++) {
			const pet = await makeFakeRepositoryPet(orgsRepository.items[0].id);
			petsRepository.items.push(pet);
		}
	});

	it('should be able to search pets by level_independence', async () => {
		const pet_id = petsRepository.items[0].id;

		const { pet } = await sut.execute(pet_id);

		expect(pet?.id).toEqual(expect.any(String));
		expect(pet?.name).toEqual('Fake Pet');
		expect(pet?.age).toEqual('puppy');
	});

	it('should not be able to search pets by level_independence', async () => {
		const { pet } = await sut.execute(randomUUID());

		expect(pet).toBeNull();
	});
});
