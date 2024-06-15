import type { OrgsRepository } from '@/repositories/orgs.repository';

export class FindOrgByIdUseCase {
	constructor(private orgRepository: OrgsRepository) {}

	async execute(id: string) {
		const org = await this.orgRepository.findById(id);

		return {
			org,
		};
	}
}
