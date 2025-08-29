import type { INodeProperties } from 'n8n-workflow';

export const DocumentManageOperations: INodeProperties[] = [
	{
		displayName: '操作',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['documentManage'],
			},
		},
		options: [
			{
				name: '创建',
				value: 'create',
				description: '创建文档',
				action: '创建文档',
			},
			{
				name: '更新',
				value: 'update',
				description: '更新文档',
				action: '更新文档',
			},
			{
				name: '删除',
				value: 'delete',
				description: '删除文档',
				action: '删除文档',
			},
		],
		default: 'create',
	},
]; 