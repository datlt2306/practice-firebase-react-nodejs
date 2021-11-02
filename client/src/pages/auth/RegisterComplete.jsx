import { createOrUpdateUser } from "../../api/auth";
import { getAuth, signInWithEmailLink, updatePassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterComplete = () => {
	const auth = getAuth();
	const dispatch = useDispatch();
	const history = useHistory();
	const { register, handleSubmit } = useForm();
	const [email, setEmail] = useState("");
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		setEmail(window.localStorage.getItem("emailForRegistraion"));
		if (user && user.token) history.push("/");
	}, [user, history]);

	const onSubmit = async (data) => {
		try {
			const result = await signInWithEmailLink(auth, email, window.location.href);
			if (result.user.emailVerified) {
				window.localStorage.removeItem("emailForRegistraion");
				let user = auth.currentUser;
				await updatePassword(user, data.password);

				const { token } = await user.getIdTokenResult();
				createOrUpdateUser(token)
					.then(({ data: { name, email, role, _id } }) => {
						dispatch({
							type: "LOGGED_IN_USER",
							payload: {
								name,
								token,
								email,
								role,
								_id,
							},
						});
					})
					.catch((error) => console.log(error));
				history.push("/");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	const completeRegistrationForm = () => (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="email" value={email} disabled />
			<input type="password" {...register("password")} autoFocus placeholder="password" />
			<button>Sign Up</button>
		</form>
	);
	return (
		<div>
			<h1>Register</h1>
			<ToastContainer />
			{completeRegistrationForm()}
		</div>
	);
};

export default RegisterComplete;
