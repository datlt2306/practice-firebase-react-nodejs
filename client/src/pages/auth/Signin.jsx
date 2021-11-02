import { Button } from "antd";
import { createOrUpdateUser } from "../../api/auth";
import {
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { MailOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
	const auth = getAuth();
	const history = useHistory();
	const googleAuthProvider = new GoogleAuthProvider();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		if (user && user.token) history.push("/");
		reset();
	}, [user, reset, history]);

	const roleBaseRedirect = (role) => {
		console.log("role", role);
		if (role === "admin") {
			history.push("/admin/dashboard");
		} else {
			history.push("/user/history");
		}
	};
	const googleLogin = async () => {
		try {
			const {
				user: { accessToken: token },
			} = await signInWithPopup(auth, googleAuthProvider);
			console.log("toekn google", token);
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
					roleBaseRedirect(role);
				})
				.catch((error) => console.log(error));
			history.push("/");
		} catch (error) {
			toast.error(error.message);
		}
	};
	const onSubmit = async (data) => {
		const { email, password } = data;
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
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
					roleBaseRedirect(role);
				})
				.catch((error) => {
					console.log(error);
				});
			reset();
		} catch (error) {
			toast.error(error.message);
		}
	};

	const formSignin = () => (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="email"
				{...register("email", {
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						required: true,
					},
				})}
			/>
			{errors.email && <p>invalid email address</p>}
			<input type="password" {...register("password", { required: true })} />
			{errors.password && <p>Field is require</p>}
			<br />
			<Button htmlType="submit" type="primary" shape="round" icon={<MailOutlined />}>
				Login with Email/Password
			</Button>
			<br />
			<Button type="danger" shape="round" icon={<MailOutlined />} onClick={googleLogin}>
				Login with Google
			</Button>
			<br />
			<Link to="/forgot/password">Forgot password</Link>
		</form>
	);
	return (
		<div>
			<h1>Đăng nhập</h1>
			<ToastContainer />
			{formSignin()}
		</div>
	);
};

export default Signin;
