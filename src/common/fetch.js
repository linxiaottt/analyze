import qs from 'querystring';
import fetch from 'node-fetch';
import CONFIG from './config.json';

export default async function FETCH (path, options = {}) {
	const config = {};
	// let fetchPath = null;
	const { type, commit, query, data } = options;
	let { success, error, final, method, header } = options;

	header = header || {};
	method = method.toUpperCase();
	// fetchPath = fetch[method.toLowercase()](path)
	if (/http/.test(path)) config.headers = { ...header, 'Authorization': 'APPCODE f994ec0219f049799e312fc9c63bcb25' };
	if (!/http/.test(path)) config.headers = { ...header, 'Content-Type':'application/x-www-form-urlencoded'};

	if (query && query instanceof Object) path = `${path}?` + qs.stringify(query);
	if (data && data instanceof Object && /post/i.test(method)) config.body = qs.stringify(data);

	config.method = method;
	config.credentials = 'include';

	if (!/http/.test(path)) path = CONFIG.host + path;

	// 产生错误执行的函数
	error = typeof error === 'function'? error: () => {};
	// 无论如何 最终都会执行的函数
	final = typeof final === 'function'? final: () => {};
	// 成功的时候执行的函数
	success = typeof success === 'function'? success: () => {};

	const payload  = await fetch(path, config).then(async (response) => {
		if (!(response instanceof Object)) return error('请求失败', final());
		const result = await response.json();
		if (!(response.status == 200 && result instanceof Object)) return error(result.msg, final());
		return result;
	});

	if (!payload) return ;
	commit(type, payload);
	return success(final());
};


