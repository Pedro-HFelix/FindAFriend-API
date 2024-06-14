import type { Org, Prisma } from '@prisma/client';

export interface FindManyNearbyParams {
	latitude: number;
	longitude: number;
}

export interface OrgsRepository {
	create(data: Prisma.OrgCreateInput): Promise<Org>;
	findByEmail(email: string): Promise<Org | null>;
}
