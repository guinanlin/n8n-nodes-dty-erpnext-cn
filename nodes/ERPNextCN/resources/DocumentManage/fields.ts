import type { INodeProperties } from 'n8n-workflow';

export const DocumentManageFields: INodeProperties[] = [
	// ----------------------------------
	//       documentManage: create
	// ----------------------------------
	{
		displayName: '文档类型 Name or ID',
		name: 'docType',
		type: 'options',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getDocTypes',
		},
		required: true,
		description: '要创建的文档类型。从列表中选择，或使用<a href="https://docs.n8n.io/code/expressions/">表达式</a>指定ID。. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		placeholder: '客户',
		displayOptions: {
			show: {
				resource: ['documentManage'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: '属性',
		name: 'properties',
		type: 'fixedCollection',
		placeholder: '添加属性',
		required: true,
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['documentManage'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: '属性',
				name: 'customProperty',
				placeholder: '添加属性',
				values: [
					{
						displayName: '字段名称或ID Name or ID',
						name: 'field',
						type: 'options',
						description: '从列表中选择，或使用<a href="https://docs.n8n.io/code/expressions/">表达式</a>指定ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
						typeOptions: {
							loadOptionsMethod: 'getDocFields',
							loadOptionsDependsOn: ['docType'],
						},
						default: '',
					},
					{
						displayName: '值',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},

	// ----------------------------------
	//       documentManage: delete
	// ----------------------------------
	{
		displayName: '文档类型 Name or ID',
		name: 'docType',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDocTypes',
		},
		default: '',
		description: '要删除的文档类型。从列表中选择，或使用<a href="https://docs.n8n.io/code/expressions/">表达式</a>指定ID。. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['documentManage'],
				operation: ['delete'],
			},
		},
		required: true,
	},
	{
		displayName: '文档名称',
		name: 'documentName',
		type: 'string',
		default: '',
		description: '要删除的文档名称（ID）',
		displayOptions: {
			show: {
				resource: ['documentManage'],
				operation: ['delete'],
			},
		},
		required: true,
	},

	// ----------------------------------
	//       documentManage: update
	// ----------------------------------
	{
		displayName: '文档类型 Name or ID',
		name: 'docType',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDocTypes',
		},
		default: '',
		description: '要更新的文档类型。从列表中选择，或使用<a href="https://docs.n8n.io/code/expressions/">表达式</a>指定ID。. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['documentManage'],
				operation: ['update'],
			},
		},
		required: true,
	},
	{
		displayName: '文档名称',
		name: 'documentName',
		type: 'string',
		default: '',
		description: '要更新的文档名称（ID）',
		displayOptions: {
			show: {
				resource: ['documentManage'],
				operation: ['update'],
			},
		},
		required: true,
	},
	{
		displayName: '属性',
		name: 'properties',
		type: 'fixedCollection',
		placeholder: '添加属性',
		description: '请求体的属性',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['documentManage'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: '属性',
				name: 'customProperty',
				values: [
					{
						displayName: '字段名称或ID Name or ID',
						name: 'field',
						type: 'options',
						description: '从列表中选择，或使用<a href="https://docs.n8n.io/code/expressions/">表达式</a>指定ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
						typeOptions: {
							loadOptionsMethod: 'getDocFields',
							loadOptionsDependsOn: ['docType'],
						},
						default: '',
					},
					{
						displayName: '值',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
]; 