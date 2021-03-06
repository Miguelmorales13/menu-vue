import {ITEMS_OFFLINE, URL_SERVER} from "./configs";
import XLSX from "xlsx";
import QRCode from "qrcode";
import {ImageCanvas} from "components/models";
import {saveAs} from "file-saver";

export function setStorage(type: string, items: any) {
	localStorage.setItem(type, JSON.stringify(items));
}

export function getStorage(type: string) {
	let items = JSON.parse(localStorage.getItem(type) as any);
	return items ? items : [];
}

export function oflineItems(url: string, type: string, content: any) {
	let items: Object[] =
		JSON.parse(localStorage.getItem(ITEMS_OFFLINE) as any) || [];
	items.push({url: `${URL_SERVER}${url}`, type, content});
	localStorage.setItem(ITEMS_OFFLINE, JSON.stringify(items));
}

export function sorted(type: string) {
	return function (a: any, b: any) {
		if (!a[type] || !b[type]) return -1;
		if (a[type] > b[type]) {
			return -1;
		}
		if (a[type] < b[type]) {
			return 1;
		}
		// a must be equal to b
		return 0;
	};
}


export function generateFormData(item: any, file: File) {
	let form = new FormData();
	for (const key in item) {
		form.append(key, item[key]);
	}
	form.append("image", file);
	return form;
}

export async function generateFormDataAny(item: any) {
	let form = new FormData();
	for (const key in item) {
		if (typeof item[key] == "object" && Array.isArray(item[key])) {
			for (const a of item[key]) {
				if (a) {
					await form.append(key, a);
				}
			}
		} else {
			if (item[key]) {
				await form.append(key, item[key]);
			}
		}
	}
	return form;
}

export function getLocalization(): Promise<any> {
	return new Promise((resolve, reject) => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			});
		} else {
			reject("No tienes accesos la geolocalizacion");
		}
	});
}

export function readExcel(file: any) {
	if (!file) return;
	return new Promise((resolve, reject) => {
		let fileReader = new FileReader();
		fileReader.onload = (e: any) => {
			var data = new Uint8Array(e.target.result);
			try {
				var workbook = XLSX.read(data, {type: "array"});
				let rowObject = XLSX.utils.sheet_to_json(
					workbook.Sheets[workbook.SheetNames[0]]
				);
				resolve(rowObject);
			} catch (error) {
				reject(error);
			}
		};
		fileReader.readAsArrayBuffer(file);
	});
}

export function genPetitionsType(petition: string) {
	switch (petition) {
		case 'add':
			return "Agregacion";
		case 'update':
			return "Actualizacion";
		case 'delete':
			return "Eliminacion";
	}
}

export function generateExcel(json: any, name: string) {
	const worksheet = XLSX.utils.json_to_sheet(json)
	const workbook: XLSX.WorkBook = {
		Sheets: {
			data: worksheet
		},
		SheetNames: ['data']
	}
	const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'})
	saveFile(excelBuffer, `${name}.xlsx`)
}

export function saveFile(buffer: any, filename: any) {
	const data = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'})
	saveAs(data, filename)
}

export function readImage(file: any) {
	if (!file) {
		return "";
	}
	if (typeof file == "string") {
		return file;
	} else {
		return URL.createObjectURL(file);
	}
}

export async function generateQr(text: string): Promise<ImageCanvas> {
	try {
		let image = document.createElement("img");
		let code = await QRCode.toDataURL(text, {width: 100});
		image.setAttribute("src", code);
		return {
			image,
			width: 100,
			height: 100
		};
	} catch (error) {
		console.log(error);
		return {
			image: document.createElement("img"),
			width: 100,
			height: 100
		};
	}
}

export function convert(cm: number, dpis = 72) {
	return Math.round((cm * dpis) / 2.54);
}

export enum AccessesEnum {
	users = 1,
	roles = 2,
	categories = 3,
	subcategories = 4,
	products = 5,
}
