import type { OrgsRepository } from '@/repositories/orgs.repository';

export class FindOrgByEmailUseCase {
	constructor(private orgRepository: OrgsRepository) {}

	async execute(email: string) {
		const org = await this.orgRepository.findByEmail(email);

		return {
			org,
		};
	}
}
