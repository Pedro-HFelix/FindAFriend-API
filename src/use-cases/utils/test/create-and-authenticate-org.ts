import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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

	const authResponse = await request(app.server)
		.post('/orgs/authenticate')
		.send({
			email: 'john.doe@example.com',
			password: '123456',
		});

	const { token } = authResponse.body;

	return {
		token,
	};
}
