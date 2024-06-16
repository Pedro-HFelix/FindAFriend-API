import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function createOrg() {
	const org = await prisma.org.create({
		data: {
			name: 'fake org',
			author_name: 'Jane Smith',
			email: 'john.doe@example.com',
			whatsapp: '9876543210',
			password: await hash('123456', 6),
			cep: '98765-432',
			state: 'MG',
			city: 'Nova Lima',
			neighborhood: 'Midtown',
			street: 'Broadway',
			latitude: 40.7128,
			longitude: -74.006,
		},
	});

	org.password = '123456';

	return org;
}
