import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOrgUseCase } from './create-org';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { compare } from 'bcryptjs';
import { OrgAlreadyExists } from '@/errors/org-already-exists-error';

let sut: CreateOrgUseCase;
let orgsRepository: InMemoryOrgsRepository;

describe('Create Org Use Case', async () => {
	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository();
		sut = new CreateOrgUseCase(orgsRepository);
	});

	it('should be able to create a org', async () => {
		const { org } = await sut.execute({
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
			latitude: 34.0522,
			longitude: -118.2437,
		});

		expect(org.id).toEqual(expect.any(String));
	});

	it('should hash org password', async () => {
		const { org } = await sut.execute({
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
			latitude: 34.0522,
			longitude: -118.2437,
		});

		const isPasswordCorrectlyHashed = await compare(
			'password123',
			org.password,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('not should be able to create a org with same email', async () => {
		const email = 'john.doe@example.com';

		await sut.execute({
			name: 'My Organization',
			author_name: 'John Doe',
			email: email,
			whatsapp: '1234567890',
			password: 'password123',
			cep: '12345-678',
			state: 'California',
			city: 'Los Angeles',
			neighborhood: 'Downtown',
			street: 'Main Street',
			latitude: 34.0522,
			longitude: -118.2437,
		});

		expect(
			async () =>
				await sut.execute({
					name: 'Another Organization',
					author_name: 'Jane Smith',
					email: email,
					whatsapp: '9876543210',
					password: 'password456',
					cep: '98765-432',
					state: 'New York',
					city: 'New York City',
					neighborhood: 'Midtown',
					street: 'Broadway',
					latitude: 40.7128,
					longitude: -74.006,
				}),
		).rejects.toBeInstanceOf(OrgAlreadyExists);
	});
});
