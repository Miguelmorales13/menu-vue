export interface IRol {
	id?: string;
	name?: string;
	active?: boolean;
	access: IModuleProcess[];
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
export interface IRolToSend {
	id?: string;
	name?: string;
	access?: IAccessToSend[];
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
export interface IAccessToSend {
	accessId?: number;
	permission?: permissionAccess;
}
export type permissionAccess = "0" | "1" | "2";
export enum permissionAccessEnum {
	NoAccess = "0",
	Read = "1",
	Write = "2"
}
export interface IModuleProcess {
	moduleId?: number;
	name?: string;
	isDone?: boolean;
	accesses: IAccessProcess[];
}
export interface IAccessProcess {
	isDone: boolean;
	name: string;
	accessId: number;
	permission: boolean;
}
