import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateForm from "./pages/FormCreationPage/CreateForm";
import CreateClass from "./pages/FormCreationPage/CreateClass";
import CreateUser from "./pages/FormCreationPage/CreateUser";
import FormListing from "./pages/FormListingPage/FormListing";
import FormListingUser from "./pages/FormListingPage/FormListingUser";
import FormResponse from "./pages/FormResponsePage/FormResponse";
import FormUser from "./pages/FormResponsePage/user";
import FormLogin from "./pages/FormResponsePage/login";
import FormStudent from "./pages/FormResponsePage/formStudent";
import IndexAdmin from "./layout/admin";

const routes = [
	{
		url: "/",
		component: FormStudent,
	},
	{
		url: "/student",
		component: FormUser,
	},
	{
		url: "/structure",
		component: FormLogin,
	},
	{
		url: "/listin-user",
		component: FormListingUser,
	},
	{
		url: "/create-form",
		component: CreateForm,
	},
	{
		url: "/create-user",
		component: CreateUser,
	},
	{
		url: "/create-class",
		component: CreateClass,
	},
	{
		url: "/form-response/:id",
		component: FormResponse,
	},
	{
		url: "/admin/*",
		component: IndexAdmin,
	},
];

const ReactRoutes = ({ history }) => {
	return (
		<>
			{
				<BrowserRouter history={history}>
					<Routes>
						{routes.map((route, index) => {
							return <Route element={<route.component />} path={route.url} key={index} />;
						})}
					</Routes>
				</BrowserRouter>
			}
		</>
	);
};

export default ReactRoutes;
