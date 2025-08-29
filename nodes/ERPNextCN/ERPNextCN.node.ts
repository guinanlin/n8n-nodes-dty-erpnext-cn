/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import { 
	getResourceOptions, 
	getAllOperations, 
	getAllFields, 
	getResourceExecute 
} from './resources';
import { erpNextApiRequest, erpNextApiRequestAllItems } from './GenericFunctions';
import { processNames } from './shared/helpers';

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
				default: 'documentQuery',
			},
			...getAllOperations(),
			...getAllFields(),
		],
	};

	methods = {
		loadOptions: {
			async getDocTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const data = await erpNextApiRequestAllItems.call(
					this,
					'data',
					'GET',
					'/api/resource/DocType',
					{},
				);
				const docTypes = data.map(({ name }: { name: string }) => {
					return { name, value: encodeURI(name) };
				});

				return processNames(docTypes);
			},
			async getDocFilters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const docType = this.getCurrentNodeParameter('docType') as string;
				const { data } = await erpNextApiRequest.call(
					this,
					'GET',
					`/api/resource/DocType/${docType}`,
					{},
				);

				const docFields = data.fields.map(
					({ label, fieldname }: { label: string; fieldname: string }) => {
						return { name: label, value: fieldname };
					},
				);

				docFields.unshift({ name: '*', value: '*' });

				return processNames(docFields);
			},
			async getDocFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const docType = this.getCurrentNodeParameter('docType') as string;
				const { data } = await erpNextApiRequest.call(
					this,
					'GET',
					`/api/resource/DocType/${docType}`,
					{},
				);

				const docFields = data.fields.map(
					({ label, fieldname }: { label: string; fieldname: string }) => {
						return { name: label, value: fieldname };
					},
				);

				return processNames(docFields);
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// 获取对应资源的执行函数
		const resourceExecute = getResourceExecute(resource);
		
		if (!resourceExecute) {
			throw new Error(`Resource ${resource} not found or not implemented`);
		}

		// 调用对应资源的执行逻辑
		return await resourceExecute.call(this, operation);
	}
} 