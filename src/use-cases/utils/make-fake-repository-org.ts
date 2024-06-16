import { Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
export async function makeFakeRepositoryOrgs() {
	const org = {
		id: randomUUID(),

		author_name: 'John Doe',
		name: 'Fake Organization',
		email: `fake@example.com${randomUUID()}`,
		password: '123456',
		whatsapp: '1234567890',

		state: 'MG',
		city: 'Nova Lima',
		cep: '90001',
		neighborhood: 'Fake Neighborhood',
		street: '123 Fake Street',

		latitude: new Prisma.Decimal('37.7749'),
		longitude: new Prisma.Decimal('-122.4194'),
		created_at: new Date(),
		updated_at: new Date(),
	};

	return org;
}
