export interface ISubcategory {
	id?: string;
	name?: string;
	lasName?: string;
	secondLastName?: string;
	password?: string;
	email?: string;
	photo?: string;
	active?: boolean;
	rolId?: number;
	category?: any;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
