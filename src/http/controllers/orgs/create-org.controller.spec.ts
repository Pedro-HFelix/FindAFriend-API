import request from 'supertest';

import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createOrg } from '@/use-cases/utils/test/create-org';

describe('Create Org (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to create a new org', async () => {
		const response = await request(app.server).post('/orgs').send({
			name: 'fake org',
			author_name: 'Jane Smith',
			email: 'john.doe@example.com',
			whatsapp: '9876543210',
			password: '123456',
			cep: '98765-432',
			state: 'MG',
			city: 'Nova Lima',
			neighborhood: 'Midtown',
			street: 'Broadway',
			latitude: 40.7128,
			longitude: -74.006,
		});

		expect(response.status).toBe(201);
	});

	it('should not be able to create a new org', async () => {
		const response = await request(app.server).post('/orgs').send({
			name: 'fake org',
			author_name: 'Jane Smith',
			email: 'john.doe@example.com',
			whatsapp: '9876543210',
			password: '123456',
			cep: '98765-432',
			state: 'MG',
			city: 'Nova Lima',
			neighborhood: 'Midtown',
			street: 'Broadway',
			latitude: 40.7128,
			longitude: -74.006,
		});

		expect(response.status).toBe(401);
	});
});
