export class OrgAlreadyExists extends Error {
	constructor() {
		super('E-mail already exists.');
	}
}
