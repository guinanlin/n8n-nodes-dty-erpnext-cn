import type { INodeProperties } from 'n8n-workflow';
import { 
	DocumentQueryOperations, 
	DocumentQueryFields, 
	DocumentQueryExecute 
} from './DocumentQuery';
import { 
	DocumentManageOperations, 
	DocumentManageFields, 
	DocumentManageExecute 
} from './DocumentManage';
import { 
	FileUploadOperations, 
	FileUploadFields, 
	FileUploadExecute 
} from './FileUpload';
import type { IResource } from '../shared/types';

// 资源注册表
export const resources: Record<string, IResource> = {
	documentQuery: {
		name: 'Doctype查询',
		value: 'documentQuery',
		operations: DocumentQueryOperations,
		fields: DocumentQueryFields,
		execute: DocumentQueryExecute,
	},
	documentManage: {
		name: 'Doctype创建、更新、删除',
		value: 'documentManage',
		operations: DocumentManageOperations,
		fields: DocumentManageFields,
		execute: DocumentManageExecute,
	},
	fileUpload: {
		name: '文件处理',
		value: 'fileUpload',
		operations: FileUploadOperations,
		fields: FileUploadFields,
		execute: FileUploadExecute,
	},
};

// 获取资源选项
export const getResourceOptions = () => {
	return Object.values(resources).map(resource => ({
		name: resource.name,
		value: resource.value,
	}));
};

// 获取所有操作
export const getAllOperations = (): INodeProperties[] => {
	return Object.values(resources).flatMap(resource => resource.operations);
};

// 获取所有字段
export const getAllFields = (): INodeProperties[] => {
	return Object.values(resources).flatMap(resource => resource.fields);
};

// 获取资源执行函数
export const getResourceExecute = (resourceValue: string) => {
	return resources[resourceValue]?.execute;
};

// 导出所有资源
export * from './DocumentQuery';
export * from './DocumentManage';
export * from './FileUpload'; 