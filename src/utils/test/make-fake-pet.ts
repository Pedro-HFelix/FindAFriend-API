export function makeFakePet(type = 1) {
	switch (type) {
		case 1:
			return {
				name: 'Fake Pet',
				description: 'This is a fake pet',
				age: 'puppy',
				size: 'Medium',
				environment: 'Indoor',
				energy_level: 'High',
				level_independence: 'Low',
				adoption_requirements: [],
				pictures: [],
			};
		case 2:
			return {
				name: 'Fake Pet',
				description: 'This is a fake pet',
				age: 'puppy',
				size: 'Big',
				environment: 'Indoor',
				energy_level: 'High',
				level_independence: 'Low',
				adoption_requirements: [],
				pictures: [],
			};
		case 3:
			return {
				name: 'Fake Pet',
				description: 'This is a fake pet',
				age: 'old',
				size: 'small',
				environment: 'Indoor',
				energy_level: 'Low',
				level_independence: 'High',
				adoption_requirements: [],
				pictures: [],
			};
		case 4:
			return {
				name: 'Fake Pet',
				description: 'This is a fake pet',
				age: 'puppy',
				size: 'small',
				environment: 'Indoor',
				energy_level: 'low',
				level_independence: 'Medium',
				adoption_requirements: [],
				pictures: [],
			};
		default:
			break;
	}
}
