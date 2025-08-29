import type { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

// 资源接口定义
export interface IResource {
	name: string;
	value: string;
	operations: INodeProperties[];
	fields: INodeProperties[];
	execute: (this: IExecuteFunctions, operation: string) => Promise<INodeExecutionData[][]>;
}

// 文档属性类型
export interface DocumentProperties {
	customProperty: Array<{
		field: string;
		value: string;
	}>;
}

// 过滤器类型
export interface FilterProperty {
	field: string;
	operator: string;
	value: string;
}

// 选项类型
export interface OptionsProperty {
	fields: string[];
	filters: {
		customProperty: FilterProperty[];
	};
}

// 资源执行上下文
export interface ResourceExecuteContext {
	resource: string;
	operation: string;
	itemIndex: number;
} 