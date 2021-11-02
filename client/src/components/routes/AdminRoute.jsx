import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../api/auth";

const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [status, setStatus] = useState(false);

	useEffect(() => {
		if (user && user.token) {
			currentAdmin(user.token)
				.then((res) => {
					console.log("Current ADMIN RES", res);
					setStatus(true);
				})
				.catch((err) => {
					console.log("ADMIN ROUTE ERR", err);
					setStatus(false);
				});
		}
	}, [user]);
	return status ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
