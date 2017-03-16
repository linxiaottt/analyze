import fetch from 'node-fetch';
import qs from 'querystring';

export default function FETCH (path, options = {}) {
    const config = {};
    const { type, commit, query, body } = options;
    let { success, error, final, method, header } = options;

    header = header || {};
    method = method.toUpperCase();

    if (body && body instanceof Object && method === 'POST') config.body = body;
    if (query && query instanceof Object) path = `${path}?` + qs.stringify(query);
    config.headers = { ...header, 'Authorization': 'APPCODE 2a9cbf8f1cea41ce98fb79463fca656c' };
    // 产生错误执行的函数
    error = typeof error === 'function'? error: () => {};
    // 无论如何 最终都会执行的函数
    final = typeof final === 'function'? final: () => {};
    // 成功的时候执行的函数
    success = typeof success === 'function'? success: () => {};

    fetch(path, config).then((response) => {
        if (!(response instanceof Object)) return final();

        const data = response.json();
        if (!(response.staus == 200 || data instanceof Object)) return error(final());
        success();
        commit(type, { data });

    });
}

FETCH.get = function (path, options) {
    FETCH(path, { ...options, method: 'GET' });
};
FETCH.post = function (path, options) {
    FETCH(path, { ...options, method: 'POST' });
};
