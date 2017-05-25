import fetch from 'superagent';
import CONFIG from './config.json';

export default async function FETCH (originPath, options = {}) {
	const config = {};
	let fetchPath = null;
	const { type, commit, query, data } = options;
	let { success, error, final, method, header } = options;
	const path = /http/.test(originPath) ? originPath : CONFIG.host + originPath;

	method = method.toLowerCase();
	fetchPath = fetch[method](path);


	if (query) fetchPath.query(query);
	if (data && /post/i.test(method)) fetchPath = fetchPath.send(data);

	if (!/http/.test(originPath)) fetchPath = fetchPath.withCredentials();
	if (/http/.test(originPath)) fetchPath = fetchPath.set('Authorization', 'APPCODE f994ec0219f049799e312fc9c63bcb25');

	// 产生错误执行的函数
	error = typeof error === 'function'? error: () => {};
	// 无论如何 最终都会执行的函数
	final = typeof final === 'function'? final: () => {};
	// 成功的时候执行的函数
	success = typeof success === 'function'? success: () => {};

	const payload  = await fetchPath.then(response => {
		const result = response.body;
		if (!(response instanceof Object)) return error('请求失败', final());
		if (!(response.status == 200 && result && (result.code == 200 || result.showapi_res_code == 0))) return error(result.msg, final());
		return result;
	}).catch(error => {});
	if (!payload) return ;
	commit(type, payload);
	return success(final());
};


