import type { OrgsRepository } from '@/repositories/orgs.repository';
import type { Org } from '@prisma/client';

export async function makeFakeOrgs(orgsRepository: OrgsRepository) {
	const orgs: Org[] = [];
	for (let i = 0; i < 10; i++) {
		const orgData = {
			name: `${i} org`,
			author_name: 'Jane Smith',
			email: `john.doe@example.com${i}`,
			whatsapp: '9876543210',
			password: 'password456',
			cep: '98765-432',
			state: 'MG',
			city: 'Nova Lima',
			neighborhood: 'Midtown',
			street: 'Broadway',
			latitude: 40.7128,
			longitude: -74.006,
		};
		orgs.push(await orgsRepository.create(orgData));
	}

	return orgs;
}
