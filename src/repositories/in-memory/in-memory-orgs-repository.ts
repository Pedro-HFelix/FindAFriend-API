import { type Org, Prisma } from '@prisma/client';
import type { OrgsRepository } from '../orgs.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryOrgsRepository implements OrgsRepository {
	public items: Org[] = [];

	async create(data: Prisma.OrgCreateInput) {
		const org: Org = {
			id: randomUUID(),

			author_name: data.author_name,
			name: data.name,
			email: data.email,
			password: data.password,
			whatsapp: data.whatsapp,

			state: data.state,
			city: data.city,
			cep: data.cep,
			neighborhood: data.neighborhood,
			street: data.street,

			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
			created_at: new Date(),
			updated_at: new Date(),
		};

		this.items.push(org);
		return org;
	}

	async findByEmail(email: string) {
		const org = this.items.find((item) => item.email === email);

		if (!org) {
			return null;
		}

		return org;
	}
	async findById(id: string) {
		const org = this.items.find((item) => item.id === id);

		if (!org) {
			return null;
		}

		return org;
	}
}
