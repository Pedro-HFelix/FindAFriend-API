import type { Prisma } from '@prisma/client';
import type { OrgsRepository } from '../orgs.repository';
import { prisma } from '@/lib/prisma';

export class PrismaOrgsRepository implements OrgsRepository {
	async create(data: Prisma.OrgCreateInput) {
		const org = await prisma.org.create({ data });

		return org;
	}

	async findByEmail(email: string) {
		const org = await prisma.org.findUnique({
			where: {
				email,
			},
		});

		if (!org) {
			return null;
		}

		return org;
	}

	async findById(id: string) {
		const org = await prisma.org.findUnique({
			where: {
				id,
			},
		});

		if (!org) {
			return null;
		}

		return org;
	}
}
