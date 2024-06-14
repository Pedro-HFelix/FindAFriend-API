import type { OrgsRepository } from '@/repositories/orgs.repository';
import { hash } from 'bcryptjs';
import { OrgAlreadyExists } from '../errors/org-already-exists-error';

interface CreateOrgUseCaseRequest {
	name: string;
	author_name: string;
	email: string;
	whatsapp: string;
	password: string;
	cep: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	latitude: number;
	longitude: number;
}

export class CreateOrgUseCase {
	constructor(private orgRepository: OrgsRepository) {}

	async execute({
		author_name,
		cep,
		city,
		email,
		latitude,
		longitude,
		name,
		neighborhood,
		password,
		state,
		street,
		whatsapp,
	}: CreateOrgUseCaseRequest) {
		const orgWithSameEmail = await this.orgRepository.findByEmail(email);
		if (orgWithSameEmail) throw new OrgAlreadyExists();

		const hashedPassword = await hash(password, 6);

		const org = await this.orgRepository.create({
			name,
			author_name,
			email,
			whatsapp,
			password: hashedPassword,
			cep,
			state,
			city,
			neighborhood,
			street,
			latitude,
			longitude,
		});

		return {
			org,
		};
	}
}
