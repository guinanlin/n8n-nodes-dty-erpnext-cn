import type { INodeProperties } from 'n8n-workflow';

// 文档查询操作
export const documentQueryOperations: INodeProperties[] = [
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

// 文档管理操作
export const documentManageOperations: INodeProperties[] = [
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

// 文档查询字段
export const documentQueryFields: INodeProperties[] = [
	// ----------------------------------
	//       documentQuery: getAll
	// ----------------------------------
	{
		displayName: '文档类型 Name or ID',
		name: 'docType',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDocTypes',
		},
		default: '',
		description: '要检索的文档类型。从列表中选择，或使用<a href="https://docs.n8n.io/code/expressions/">表达式</a>指定ID。. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		placeholder: '客户',
		displayOptions: {
			show: {
				resource: ['documentQuery'],
				operation: ['getAll'],
			},
		},
	},
	{
		displayName: '返回全部',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['documentQuery'],
				operation: ['getAll'],
			},
		},
	},
	{
		displayName: '限制数量',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['documentQuery'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
	},
	{
		displayName: '选项',
		name: 'options',
		type: 'collection',
		placeholder: '添加字段',
		default: {},
		displayOptions: {
			show: {
				resource: ['documentQuery'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: '字段名称或ID Names or IDs',
				name: 'fields',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getDocFilters',
					loadOptionsDependsOn: ['docType'],
				},
				default: [],
				description: '要返回的字段的逗号分隔列表。从列表中选择，或使用<a href="https://docs.n8n.io/code/expressions/">表达式</a>指定ID。. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				placeholder: 'name,country',
			},
			{
				displayName: '筛选条件',
				name: 'filters',
				type: 'fixedCollection',
				default: {},
				placeholder: '添加筛选条件',
				description: '自定义属性',
				typeOptions: {
					multipleValues: true,
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
								displayName: '操作符',
								name: 'operator',
								type: 'options',
								default: 'is',
								options: [
									{
										name: '不等于',
										value: 'isNot',
									},
									{
										name: '大于',
										value: 'greater',
									},
									{
										name: '等于',
										value: 'is',
									},
									{
										name: '等于或大于',
										value: 'equalsGreater',
									},
									{
										name: '等于或小于',
										value: 'equalsLess',
									},
									{
										name: '小于',
										value: 'less',
									},
								],
							},
							{
								displayName: '值',
								name: 'value',
								type: 'string',
								default: '',
								description: '操作符条件的值',
							},
						],
					},
				],
			},
		],
	},

	// ----------------------------------
	//          documentQuery: get
	// ----------------------------------
	{
		displayName: '文档类型 Name or ID',
		name: 'docType',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDocTypes',
		},
		default: '',
		description: '要获取的文档类型。从列表中选择，或使用<a href="https://docs.n8n.io/code/expressions/">表达式</a>指定ID。. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['documentQuery'],
				operation: ['get'],
			},
		},
		required: true,
	},
	{
		displayName: '文档名称',
		name: 'documentName',
		type: 'string',
		default: '',
		description: '要获取的文档名称（ID）',
		displayOptions: {
			show: {
				resource: ['documentQuery'],
				operation: ['get'],
			},
		},
		required: true,
	},
];

// 文档管理字段
export const documentManageFields: INodeProperties[] = [
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

// 保持向后兼容性
export const documentOperations = documentQueryOperations;
export const documentFields = documentQueryFields; 