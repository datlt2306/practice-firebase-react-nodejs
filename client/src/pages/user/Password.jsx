import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { useForm } from "react-hook-form";
import { getAuth, updatePassword } from "@firebase/auth";

import { ToastContainer, toast } from "react-toastify";

const Password = () => {
	const auth = getAuth();
	const { register, handleSubmit, reset } = useForm();
	const [loading, setLoading] = useState(false);

	const onSubmit = async ({ password }) => {
		console.log("password", password);
		await updatePassword(auth.currentUser, password)
			.then(() => {
				setLoading(false);
				toast.success("Password updated");
				reset();
			})
			.catch((error) => {
				setLoading(true);
				toast.error(error);
			});
		// console.log(result);
		// updatePassword(user, password).then((result) => {
		// 	console.log(result);
		// });
	};
	const passwordUpdateForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<input
						type="password"
						{...register("password")}
						className="border"
						disabled={loading}
					/>
					<button>Submit</button>
				</div>
			</form>
		);
	};
	return (
		<div className="container-fluid mx-auto">
			<ToastContainer />
			<div className="grid grid-cols-[300px,1fr]">
				<UserNav />
				<div className="py-10 max-w-4xl mx-auto">
					<h4>User Password</h4>
					{loading ? <h4>Loading....</h4> : passwordUpdateForm()}
				</div>
			</div>
		</div>
	);
};

export default Password;
