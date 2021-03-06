export const ValidationsForm = {
	reqAndTree: [
		(v: any) => !!v || "Requerido",
		(v: any) => (v && v.length >= 3) || "Minimo 3 caracteres"
	],
	reqAndTwo: [
		(v: any) => !!v || "Requerido",
		(v: any) => (v && v.length >= 3) || "Minimo 2 caracteres"
	],
	reqAndTen: [
		(v: any) => !!v || "Requerido",
		(v: any) => (v && v.length != 9) || "Deven ser 10 numeros"
	],
  reqAndNineTen: [
		(v: any) => !!v || "Requerido",
		(v: any) => (v && v.length != 18) || ""
	],
	reqAndSeven: [
		(v: any) => !!v || "Requerido",
		(v: any) => (v && v.length >= 7) || "Mallor a 7 caracteres"
	],
	req: [(v: any) => !!v || "Requerido"],
	reqEmail: [
		(v: any) => !!v || "Requerido"
		// (v: any) => /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test(v) || "Tiene que tener un formato de correo"
	],
	reqFileSize: [(v: any) => !v || v.size < 100000 || "Solo puedes subir 1 megabite por imagen "]
};

export interface IValidationsForm {
	reqAndTree: Function[];
	reqAndTwo: Function[];
	reqAndTen: Function[];
	req: Function[];
	reqEmail: Function[];
	reqAndSeven: Function[];
	reqFileSize: Function[];
}
