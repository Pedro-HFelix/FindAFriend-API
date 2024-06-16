import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateOrg } from '@/use-cases/utils/test/create-and-authenticate-org';
import { makeFakePet } from '@/use-cases/utils/test/make-fake-pet';

let jwtToken: string;
describe('Create Pet', () => {
	beforeAll(async () => {
		await app.ready();
		const { token } = await createAndAuthenticateOrg(app);
		jwtToken = token;
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to create a new pet', async () => {
		const response = await request(app.server)
			.post('/org/pet/create')
			.set('Authorization', `Bearer ${jwtToken}`)
			.send(makeFakePet());

		expect(response.status).toBe(201);
	});

	it('should not be able to create a new pet without data', async () => {
		const response = await request(app.server)
			.post('/org/pet/create')
			.set('Authorization', `Bearer ${jwtToken}`)
			.send();

		expect(response.status).toBe(400);
	});

	it('should not be able to create a new pet with invalid jtw', async () => {
		const response = await request(app.server)
			.post('/org/pet/create')
			.set('Authorization', `Bearer ${'1234'}`)
			.send(makeFakePet());

		expect(response.status).toBe(401);
	});
});
