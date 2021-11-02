import instance from "./instance";

export const createCategories = async (category, token) => {
	const url = "/category";
	return await instance.post(url, category, {
		headers: {
			authtoken: token,
		},
	});
};
export const getCategories = async () => {
	const url = "/category";
	return await instance.get(url);
};
export const getCategory = async (slug) => {
	const url = `/category/${slug}`;
	return await instance.get(url);
};
export const updateCategory = async (slug, category, token) => {
	const url = `/category/${slug}`;
	return await instance.patch(url, category, {
		headers: {
			authtoken: token,
		},
	});
};
export const deleteCategory = async (slug, token) => {
	const url = `/category/${slug}`;
	return await instance.delete(url, {
		headers: {
			authtoken: token,
		},
	});
};
