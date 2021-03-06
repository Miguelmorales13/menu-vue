import {RouteConfig} from "vue-router";
import {AccessesEnum} from "src/helpers/helpers";

const routes: RouteConfig[] = [
	{
		path: "/",
		meta: {requiresNoAuth: true},
		component: () => import("pages/Login.vue")
	},
	{
		path: "/forgot-password",
		meta: {requiresNoAuth: true},

		component: () => import("pages/ForgotPassword.vue")
	},
	{
		path: "/admin",
		component: () => import("pages/Admin.vue"),
		meta: {requiresAuth: true},
		children: [
			{path: "", component: () => import("pages/Admin/Index.vue")},
			{path: "users", meta: {validation: true, id: AccessesEnum.users}, component: () => import("pages/Admin/Users.vue")},
			{path: "roles", meta: {validation: true, id: AccessesEnum.roles}, component: () => import("pages/Admin/Roles.vue")},
			{path: "categories", meta: {validation: true, id: AccessesEnum.categories}, component: () => import("pages/Admin/Categories.vue")},
			{path: "subcategories", meta: {validation: true, id: AccessesEnum.subcategories}, component: () => import("pages/Admin/Subcategories.vue")},
			{path: "products", meta: {validation: true, id: AccessesEnum.products}, component: () => import("pages/Admin/Products.vue")},
		]
	}
];

export default routes;
