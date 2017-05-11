import qs from 'querystring';
import fetch from 'node-fetch';

export default async function FETCH (path, options = {}) {
    const config = {};
    const { type, commit, query, body } = options;
    let { success, error, final, method, header } = options;

    header = header || {};
    method = method.toUpperCase();

    if (body && body instanceof Object && method === 'POST') config.body = body;
    if (query && query instanceof Object) path = `${path}?` + qs.stringify(query);

    config.method = method;
    config.headers = { ...header, 'Authorization': 'APPCODE f994ec0219f049799e312fc9c63bcb25' };
    // 产生错误执行的函数
    error = typeof error === 'function'? error: () => {};
    // 无论如何 最终都会执行的函数
    final = typeof final === 'function'? final: () => {};
    // 成功的时候执行的函数
    success = typeof success === 'function'? success: () => {};

    const payload  = await fetch(path, config).then((response) => {
        if (!(response instanceof Object)) return error(final());
        const payload = response.json();
        if (!(response.staus == 200 || payload instanceof Object)) return error(final());
        return payload;
    });

    commit(type, payload);
    return success(final());
};

// FETCH.GET = FETCH.get = function (path, options) {
//     FETCH(path, { ...options, method: 'GET' });
// };
// FETCH.POST = FETCH.post = function (path, options) {
//     FETCH(path, { ...options, method: 'POST' });
// };
