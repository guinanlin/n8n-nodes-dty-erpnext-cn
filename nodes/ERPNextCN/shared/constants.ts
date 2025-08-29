// API 端点常量
export const API_ENDPOINTS = {
	RESOURCE: '/api/resource',
	DOCTYPE: '/api/resource/DocType',
} as const;

// 操作符映射
export const OPERATORS = {
	is: '=',
	isNot: '!=',
	greater: '>',
	less: '<',
	equalsGreater: '>=',
	equalsLess: '<=',
} as const;

// 默认值
export const DEFAULTS = {
	LIMIT: 50,
	RETURN_ALL: false,
} as const;

// 资源名称
export const RESOURCE_NAMES = {
	DOCUMENT_QUERY: 'documentQuery',
	DOCUMENT_MANAGE: 'documentManage',
} as const;

// 操作名称
export const OPERATION_NAMES = {
	GET: 'get',
	GET_ALL: 'getAll',
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete',
} as const; 