export type typeModule = "1" | "2";
export interface IAccess {
	id?: number;
	name?: string;
	keyName?: string;
	description?: string;
	moduleId?: number;
}
export interface IModule {
	id?: number;
	name?: string;
	keyName?: string;
	description?: string;
	access?: IAccess[];
	type?: typeModule;
}
