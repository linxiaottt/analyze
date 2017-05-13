import qs from 'querystring';
import fetch from 'node-fetch';
import CONFIG from './config.json';

export default async function FETCH (path, options = {}) {
    const config = {};
    const { type, commit, query, data } = options;
    let { success, error, final, method, header } = options;

    header = header || {};
    method = method.toUpperCase();

    if (/http/.test(path)) config.headers = { ...header, 'Authorization': 'APPCODE f994ec0219f049799e312fc9c63bcb25' };
    if (!/http/.test(path)) path = CONFIG.host + path;
    if (data && data instanceof Object && /post/i.test(method)) config.body = JSON.stringify(data);
    if (query && query instanceof Object) path = `${path}?` + qs.stringify(query);
    config.method = method;

    // 产生错误执行的函数
    error = typeof error === 'function'? error: () => {};
    // 无论如何 最终都会执行的函数
    final = typeof final === 'function'? final: () => {};
    // 成功的时候执行的函数
    success = typeof success === 'function'? success: () => {};

    const payload  = await fetch(path, config).then(async (response) => {
        if (!(response instanceof Object)) return error('请求失败', final());
        const result = await response.json();
        if (!(response.staus == 200 && result instanceof Object)) return error(result.msg, final());
        return result;
    });

    if (!payload) return ;
    commit(type, payload);
    return success(final());
};

// FETCH.GET = FETCH.get = function (path, options) {
//     FETCH(path, { ...options, method: 'GET' });
// };
// FETCH.POST = FETCH.post = function (path, options) {
//     FETCH(path, { ...options, method: 'POST' });
// };
