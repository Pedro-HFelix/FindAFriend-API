import request from 'supertest';
import type { Org } from '@prisma/client';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateOrg } from '@/use-cases/utils/test/create-and-authenticate-org';
import { makeFakePet } from '@/use-cases/utils/test/make-fake-pet';

let jtwToken: string;
let orgObject: Org;

describe('Find Pet By Id', () => {
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
		const getPet = await request(app.server)
			.get('/pets')
			.query({ city: orgObject.city, state: orgObject.state });

		const { pets } = getPet.body;
		const petResponse = await request(app.server).get(`/pet/${pets[0].id}`);

		expect(petResponse.status).toBe(200);
		expect(petResponse.body.id).toEqual(expect.any(String));
	});

	it('should not be able to search pets without city and state', async () => {
		const response = await request(app.server).get('/pet/213');

		expect(response.status).toBe(400);
	});
});
