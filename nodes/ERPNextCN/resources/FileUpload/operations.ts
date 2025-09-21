import type { INodeProperties } from 'n8n-workflow';

export const FileUploadOperations: INodeProperties[] = [
	{
		displayName: '操作',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['fileUpload'],
			},
		},
		options: [
			{
				name: 'Base64上传',
				value: 'uploadByBase64',
				description: '通过Base64编码上传文件',
				action: '上传文件',
			},
			{
				name: '获取单一文件',
				value: 'get',
				description: '获取单一文件信息',
				action: '获取文件',
			},
			{
				name: '删除文件',
				value: 'delete',
				action: '删除文件',
			},
		],
		default: 'uploadByBase64',
	},
];
