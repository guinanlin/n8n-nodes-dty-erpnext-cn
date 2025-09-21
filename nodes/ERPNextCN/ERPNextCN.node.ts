/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

import { 
	getResourceOptions, 
	getAllOperations, 
	getAllFields, 
	getResourceExecute 
} from './resources';
import { DocTypeService, FileService } from './services';

export class ERPNextCN implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'erpNextcn',
		name: 'erpNextCn',
		icon: 'file:erpnext.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'ERPNext中国版本API集成',
		defaults: {
			name: 'erpNextcn',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'erpNextApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: '资源',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: getResourceOptions(),
				default: '',
			},
			...getAllOperations(),
			...getAllFields(),
		],
	};

	methods = {
		loadOptions: {
			// DocType相关方法委托给DocTypeService处理
			async getDocTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return DocTypeService.getDocTypes(this);
			},
			async getDocFilters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return DocTypeService.getDocFilters(this);
			},
			async getDocFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return DocTypeService.getDocFields(this);
			},
			// File相关方法委托给FileService处理
			async getFiles(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const files = await FileService.getFiles(this);
				return files.map((file: any) => ({
					name: file.file_name,
					value: file.name,
				}));
			},
			async getFileNames(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const files = await FileService.getFiles(this);
				return files.map((file: any) => ({
					name: file.file_name,
					value: file.file_name, // 使用file_name作为value，便于在其他操作中使用
				}));
			},
			// 未来可以添加更多服务的loadOptions方法
			// async getUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
			//     return UserService.getUsers(this);
			// },
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// 获取对应资源的执行函数
		const resourceExecute = getResourceExecute(resource);
		
		if (!resourceExecute) {
			throw new NodeOperationError(this.getNode(), `Resource ${resource} not found or not implemented`);
		}

		// 调用对应资源的执行逻辑
		return await resourceExecute.call(this, operation);
	}
} 