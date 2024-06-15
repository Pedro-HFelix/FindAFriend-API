import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePetUseCase } from './create';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { randomUUID } from 'node:crypto';
import { Decimal } from '@prisma/client/runtime/library';
import { OrgNotFound } from '../errors/org-not-found';

let sut: CreatePetUseCase;
let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;

describe('Create pet Use Case', async () => {
	beforeEach(async () => {
		petsRepository = new InMemoryPetsRepository();
		orgsRepository = new InMemoryOrgsRepository();
		sut = new CreatePetUseCase(petsRepository, orgsRepository);
	});

	it('should be able to create a pet with adoption requirements', async () => {
		const id = randomUUID();
		orgsRepository.items.push({
			id: id,
			name: 'My Organization',
			author_name: 'John Doe',
			email: 'john.doe@example.com',
			whatsapp: '1234567890',
			password: 'password123',
			cep: '12345-678',
			state: 'California',
			city: 'Los Angeles',
			neighborhood: 'Downtown',
			street: 'Main Street',
			latitude: new Decimal(34.0522),
			longitude: new Decimal(-118.2437),
			created_at: new Date(),
			updated_at: new Date(),
		});

		const { pet } = await sut.execute({
			name: 'My Pet',
			description: 'This is my pet',
			age: 'puppy',
			size: 'medium',
			energy_level: 'low',
			environment: 'indoor',
			level_independence: 'low',
			org_id: id,
			adoption_requirements: ['home visit', 'vet reference'],
			pictures: ['img', 'img1', 'img2'],
		});
		console.log(pet);
		expect(pet.org_id).toEqual(id);
		expect(pet.adoption_requirements).toEqual(['home visit', 'vet reference']);
	});

	it('should be able to create a pet without adoption requirements and pictures', async () => {
		const id = randomUUID();
		orgsRepository.items.push({
			id: id,
			name: 'My Organization',
			author_name: 'John Doe',
			email: 'john.doe@example.com',
			whatsapp: '1234567890',
			password: 'password123',
			cep: '12345-678',
			state: 'California',
			city: 'Los Angeles',
			neighborhood: 'Downtown',
			street: 'Main Street',
			latitude: new Decimal(34.0522),
			longitude: new Decimal(-118.2437),
			created_at: new Date(),
			updated_at: new Date(),
		});

		const { pet } = await sut.execute({
			name: 'My Pet',
			description: 'This is my pet',
			age: 'puppy',
			size: 'medium',
			energy_level: 'low',
			environment: 'indoor',
			level_independence: 'low',
			org_id: id,
		});

		expect(pet.org_id).toEqual(id);
		expect(pet.adoption_requirements).toEqual([]);
	});

	it('should not be able to create pet if the organization does not exist', async () => {
		const id = randomUUID();

		await expect(() =>
			sut.execute({
				name: 'My Pet',
				description: 'This is my pet',
				age: 'puppy',
				size: 'medium',
				energy_level: 'low',
				environment: 'indoor',
				level_independence: 'low',
				org_id: id,
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
