import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { AuthenticateOrgUseCase } from './authenticate';
import { randomUUID } from 'node:crypto';
import { Decimal } from '@prisma/client/runtime/library';
import { InvalidCredentialError } from '@/errors/invalid-credentials-error';

let sut: AuthenticateOrgUseCase;
let orgsRepository: InMemoryOrgsRepository;

const password = 'password123';
const email = 'john.doe@example.com';

describe('Authenticate Org Use Case', async () => {
	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository();
		sut = new AuthenticateOrgUseCase(orgsRepository);

		orgsRepository.items.push({
			id: randomUUID(),
			name: 'My Organization',
			author_name: 'John Doe',
			email: email,
			whatsapp: '1234567890',
			password: await hash(password, 6),
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
	});

	it('should be able to authenticate a org', async () => {
		const { org } = await sut.execute({
			email: email,
			password: password,
		});

		expect(org.id).toEqual(expect.any(String));
	});

	it('should not be able to authenticate with wrong email', async () => {
		expect(
			async () =>
				await sut.execute({
					email: 'error@email',
					password: password,
				}),
		).rejects.toBeInstanceOf(InvalidCredentialError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		expect(
			async () =>
				await sut.execute({
					email: email,
					password: '213',
				}),
		).rejects.toBeInstanceOf(InvalidCredentialError);
	});
});
