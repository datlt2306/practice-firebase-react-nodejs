import { Menu } from "antd";
import { AppstoreOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const { SubMenu, Item } = Menu;
	const history = useHistory();
	const auth = getAuth();
	const dispatch = useDispatch();

	const [current, setCurrent] = useState(null);
	const handleClick = () => {
		setCurrent(null);
	};
	const logout = async () => {
		await auth.signOut();

		dispatch({
			type: "LOGOUT",
			payload: { email: null },
		});
		history.push("/signin");
	};
	return (
		<header>
			<div className="grid grid-cols-[300px,1fr]">
				<div>
					<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
						<Item key="home" icon={<AppstoreOutlined />}>
							<Link to="/">Home </Link>
						</Item>
					</Menu>
				</div>
				<div>
					<Menu
						onClick={handleClick}
						selectedKeys={[current]}
						mode="horizontal"
						className="justify-end"
					>
						{user.email && (
							<SubMenu key="username" icon={<UserOutlined />} title={user.name}>
								<Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
									Logout
								</Item>
							</SubMenu>
						)}
						{!user.email && (
							<>
								<Item key="signup" icon={<UserOutlined />}>
									<Link to="/signup">Signup</Link>
								</Item>
								<Item key="signin" icon={<LoginOutlined />}>
									<Link to="/signin">Signin</Link>
								</Item>
							</>
						)}
					</Menu>
				</div>
			</div>
		</header>
	);
};

export default Header;
