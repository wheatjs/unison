export enum Method {
    GET,
    POST,
    PATCH,
    DELETE,
    COPY,
    HEAD,
    OPTIONS,
    LINK,
    UNLINK,
    PURGE,
    LOCK,
    UNLOCK,
    PROPFIND,
    VIEW
}

export const MethodMap = {
    0: 'get',
    1: 'post',
    2: 'patch',
    3: 'delete',
    4: 'copy',
    5: 'head',
    6: 'options',
    7: 'link',
    8: 'unlink',
    9: 'purge',
    10: 'lock',
    11: 'unlock',
    12: 'propfind',
    13: 'view'
}