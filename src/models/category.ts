export interface ICategory {
	id?: string;
	name?: string;
	lasName?: string;
	secondLastName?: string;
	password?: string;
	email?: string;
	photo?: string;
	active?: boolean;
	rolId?: number;
	rol?: any;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
