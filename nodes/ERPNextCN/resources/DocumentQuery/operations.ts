import type { INodeProperties } from 'n8n-workflow';

export const DocumentQueryOperations: INodeProperties[] = [
	{
		displayName: '操作',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['documentQuery'],
			},
		},
		options: [
			{
				name: '获取',
				value: 'get',
				description: '获取单个文档',
				action: '获取文档',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: '获取多个文档',
				action: '获取多个文档',
			},
		],
		default: 'get',
	},
]; 