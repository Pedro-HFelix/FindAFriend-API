import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { FindOrgByEmailUseCase } from './find-org-by-email';
import { randomUUID } from 'crypto';
import { Decimal } from '@prisma/client/runtime/library';

let sut: FindOrgByEmailUseCase;
let orgsRepository: InMemoryOrgsRepository;

describe('Find Org By Email Use Case', async () => {
	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository();
		sut = new FindOrgByEmailUseCase(orgsRepository);
	});

	it('should be able to find org with email', async () => {
		orgsRepository.items.push({
			id: randomUUID(),
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

		const { org } = await sut.execute('john.doe@example.com');

		expect(org!.id).toEqual(expect.any(String));
	});

	it('should not be able to find org with invalid email', async () => {
		const { org } = await sut.execute('invalid.email@example.com');
		expect(org).toBeNull();
	});
});
