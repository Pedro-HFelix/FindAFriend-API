import request from 'supertest';
import type { Org } from '@prisma/client';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org';
import { makeFakePet } from '@/utils/test/make-fake-pet';

let jtwToken: string;
let orgObject: Org;

describe('Find many Pets', () => {
	beforeAll(async () => {
		await app.ready();

		const { token, org } = await createAndAuthenticateOrg(app);
		jtwToken = token;
		orgObject = org;

		for (let i = 1; i < 5; i++) {
			await request(app.server)
				.post('/org/pet/create')
				.set('Authorization', `Bearer ${jtwToken}`)
				.send(makeFakePet(i));
		}
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to search pets by only city and state', async () => {
		const response = await request(app.server)
			.get('/pets')
			.query({ city: orgObject.city, state: orgObject.state });

		expect(response.status).toBe(200);
		expect(response.body.pets).toHaveLength(4);
	});

	it('should not be able to search pets without city and state', async () => {
		const response = await request(app.server).get('/pets');

		expect(response.status).toBe(400);
	});

	it('should be able to search pets by age', async () => {
		const response = await request(app.server)
			.get('/pets')
			.query({ city: orgObject.city, state: orgObject.state, age: 'puppy' });

		expect(response.status).toBe(200);
		expect(response.body.pets).toHaveLength(3);
	});

	it('should be able to search pets by size', async () => {
		const response = await request(app.server)
			.get('/pets')
			.query({ city: orgObject.city, state: orgObject.state, size: 'small' });

		expect(response.status).toBe(200);
		expect(response.body.pets).toHaveLength(2);
	});

	it('should be able to search pets by energy level', async () => {
		const response = await request(app.server).get('/pets').query({
			city: orgObject.city,
			state: orgObject.state,
			energy_level: 'low',
		});

		expect(response.status).toBe(200);
		expect(response.body.pets).toHaveLength(1);
	});

	it('should be able to search pets by level independence', async () => {
		const response = await request(app.server).get('/pets').query({
			city: orgObject.city,
			state: orgObject.state,
			level_independence: 'Low',
		});

		expect(response.status).toBe(200);
		expect(response.body.pets).toHaveLength(2);
	});

	it('should be able to search pets by all the filters', async () => {
		const response = await request(app.server).get('/pets').query({
			city: orgObject.city,
			state: orgObject.state,
			age: 'puppy',
			size: 'small',
			energy_level: 'low',
			level_independence: 'Medium',
		});

		expect(response.body.pets).toHaveLength(1);
	});
});
