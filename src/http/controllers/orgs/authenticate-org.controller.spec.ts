import request from 'supertest';

import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createOrg } from '@/use-cases/utils/test/create-org';
import type { Org } from '@prisma/client';

let org: Org;
describe('Authenticate Org (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
		org = await createOrg();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to authenticate an org', async () => {
		const response = await request(app.server).post('/orgs/authenticate').send({
			email: org.email,
			password: org.password,
		});

		expect(response.status).toBe(200);
		expect(response.body.token).toEqual(expect.any(String));
	});

	it('should not be able to authenticate an org', async () => {
		const response = await request(app.server).post('/orgs/authenticate').send({
			email: org.email,
			password: '1234567',
		});

		expect(response.status).toBe(401);
	});
});
