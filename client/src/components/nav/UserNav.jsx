import React from "react";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const UserNav = () => {
	return (
		<Menu style={{ width: 256 }} mode="vertical">
			<Menu.Item icon={<MailOutlined />} key="1">
				<Link to="/user/history">History</Link>
			</Menu.Item>
			<Menu.Item icon={<AppstoreOutlined />} key="2">
				<Link to="/user/password">Password</Link>
			</Menu.Item>
			<Menu.Item icon={<SettingOutlined />} key="3">
				<Link to="/user/wishlist">Wishlist</Link>
			</Menu.Item>
		</Menu>
	);
};

export default UserNav;
