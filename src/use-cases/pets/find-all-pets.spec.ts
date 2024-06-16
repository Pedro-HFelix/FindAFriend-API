import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FindAllPetUseCase } from './find-all-pet';
import { makeFakePet } from '../utils/make-fake-memory-pet';
import { makeFakeOrgs } from '../utils/make-fake-memory-org';

describe('Search Pets Use Case', () => {
	let orgsRepository: InMemoryOrgsRepository;
	let petsRepository: InMemoryPetsRepository;
	let sut: FindAllPetUseCase;

	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository();
		petsRepository = new InMemoryPetsRepository(orgsRepository);
		sut = new FindAllPetUseCase(petsRepository);

		const org = await makeFakeOrgs();
		orgsRepository.items.push(org);

		for (let i = 0; i < 10; i++) {
			const pet = await makeFakePet(orgsRepository.items[0].id);
			petsRepository.items.push(pet);
		}
	});

	it('should not be able to search pets by city by wrong city', async () => {
		const { pets } = await sut.execute({ city: 'City', state: 'MG' });

		expect(pets).toHaveLength(0);
	});

	it('should not be able to search pets by city by wrong state', async () => {
		const { pets } = await sut.execute({ city: 'Nova Lima', state: 'MF' });

		expect(pets).toHaveLength(0);
	});

	it('should be able to search pets by city', async () => {
		const { pets } = await sut.execute({ city: 'Nova Lima', state: 'MG' });

		expect(pets).toHaveLength(10);
	});

	it('should be able to search pets by age', async () => {
		const { pets } = await sut.execute({
			city: 'Nova Lima',
			state: 'MG',
			age: 'puppy',
		});

		expect(pets).toHaveLength(10);
	});

	it('should not be able to search pets by age', async () => {
		const { pets } = await sut.execute({
			city: 'Nova Lima',
			state: 'MG',
			age: 'puppya',
		});

		expect(pets).toHaveLength(0);
	});

	it('should be able to search pets by size', async () => {
		const { pets } = await sut.execute({
			city: 'Nova Lima',
			state: 'MG',
			size: 'Medium',
		});

		expect(pets).toHaveLength(10);
	});

	it('should not be able to search pets by size', async () => {
		const { pets } = await sut.execute({
			city: 'Nova Lima',
			state: 'MG',
			size: 'Big',
		});

		expect(pets).toHaveLength(0);
	});

	it('should be able to search pets by energy_level', async () => {
		const { pets } = await sut.execute({
			city: 'Nova Lima',
			state: 'MG',
			energy_level: 'High',
		});

		expect(pets).toHaveLength(10);
	});

	it('should not be able to search pets by energy_level', async () => {
		const { pets } = await sut.execute({
			city: 'Nova Lima',
			state: 'MG',
			energy_level: 'Low',
		});

		expect(pets).toHaveLength(0);
	});

	it('should be able to search pets by level_independence', async () => {
		const { pets } = await sut.execute({
			city: 'Nova Lima',
			state: 'MG',
			level_independence: 'Low',
		});

		expect(pets).toHaveLength(10);
	});

	it('should not be able to search pets by level_independence', async () => {
		const { pets } = await sut.execute({
			city: 'Nova Lima',
			state: 'MG',
			level_independence: 'Hight',
		});

		expect(pets).toHaveLength(0);
	});
});
