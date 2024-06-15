import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { randomUUID } from 'node:crypto';
import { Decimal } from '@prisma/client/runtime/library';
import { FindOrgByIdUseCase } from './find-org-by-id';

let sut: FindOrgByIdUseCase;
let orgsRepository: InMemoryOrgsRepository;

describe('Find Org By Id Use Case', async () => {
	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository();
		sut = new FindOrgByIdUseCase(orgsRepository);
	});

	it('should be able to find org with id', async () => {
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

		const { org } = await sut.execute(id);

		expect(org?.id).toEqual(id);
	});

	it('should not be able to find org with invalid id', async () => {
		const { org } = await sut.execute('123421');
		expect(org).toBeNull();
	});
});
