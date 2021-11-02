import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useHistory } from "react-router";

const Register = () => {
	const auth = getAuth();
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push("/");
	}, [user, history]);

	const onSubmit = async (data) => {
		const settings = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};
		// gửi email đến tài khoản đăng ký
		await sendSignInLinkToEmail(auth, data.email, settings);
		toast.success(
			`Email is send to ${data.email}. Click the link to complete your registration`,
		);
		window.localStorage.setItem("emailForRegistraion", data.email);
		reset();
	};

	const formRegister = () => (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="email"
				{...register("email", {
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
					},
				})}
			/>
			{errors.email && <p>invalid email address</p>}
			<button>Sign Up</button>
		</form>
	);
	return (
		<div>
			<h1>Register</h1>
			<ToastContainer />
			{formRegister()}
		</div>
	);
};

export default Register;
