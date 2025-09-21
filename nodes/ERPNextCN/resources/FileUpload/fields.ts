import type { INodeProperties } from 'n8n-workflow';

export const FileUploadFields: INodeProperties[] = [
	// ----------------------------------
	//       fileUpload: uploadByBase64
	// ----------------------------------
	{
		displayName: 'File Name or ID',
		name: 'fileName',
		type: 'string',
		default: '',
		required: true,
		description: '上传文件的名称，包含扩展名',
		placeholder: 'document.pdf',
		displayOptions: {
			show: {
				resource: ['fileUpload'],
				operation: ['uploadByBase64'],
			},
		},
	},
	{
		displayName: 'Base64内容',
		name: 'base64Content',
		type: 'string',
		default: '',
		required: true,
		description: '文件的Base64编码内容',
		placeholder: 'SGVsbG8gRVBSTmV4dA==',
		displayOptions: {
			show: {
				resource: ['fileUpload'],
				operation: ['uploadByBase64'],
			},
		},
	},
	{
		displayName: '选项',
		name: 'options',
		type: 'collection',
		placeholder: '添加选项',
		default: {},
		displayOptions: {
			show: {
				resource: ['fileUpload'],
				operation: ['uploadByBase64'],
			},
		},
		options: [
			{
				displayName: '私有文件',
				name: 'isPrivate',
				type: 'boolean',
				default: false,
				description: 'Whether the file should be private (requires login to access)',
			},
			{
				displayName: '文件夹',
				name: 'folder',
				type: 'string',
				default: '',
				description: '文件存储的文件夹路径',
				placeholder: 'Home/Attachments',
			},
			{
				displayName: '关联文档类型',
				name: 'doctype',
				type: 'string',
				default: '',
				description: '关联的文档类型',
				placeholder: 'Customer',
			},
			{
				displayName: '关联文档名称',
				name: 'docname',
				type: 'string',
				default: '',
				description: '关联的文档名称',
				placeholder: 'CUST-001',
			},
		],
	},

	// ----------------------------------
	//          fileUpload: get
	// ----------------------------------
	{
		displayName: 'File Name or ID',
		name: 'fileName',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getFiles',
		},
		default: '',
		required: true,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['fileUpload'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------
	//        fileUpload: delete
	// ----------------------------------
	{
		displayName: 'File Name or ID',
		name: 'fileName',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getFiles',
		},
		default: '',
		required: true,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['fileUpload'],
				operation: ['delete'],
			},
		},
	},
];
