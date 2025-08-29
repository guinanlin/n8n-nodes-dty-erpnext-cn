import type { IDataObject } from 'n8n-workflow';
import flow from 'lodash/flow';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import { OPERATORS } from './constants';
import type { FilterProperty, OptionsProperty } from './types';

// 处理查询字符串
export const buildQueryString = (options: OptionsProperty, docType: string): IDataObject => {
	const qs: IDataObject = {};

	// 处理字段
	if (options.fields) {
		if (options.fields.includes('*')) {
			qs.fields = JSON.stringify(['*']);
		} else {
			qs.fields = JSON.stringify(options.fields);
		}
	}

	// 处理过滤器
	if (options.filters) {
		qs.filters = JSON.stringify(
			options.filters.customProperty.map((filter: FilterProperty) => {
				return [docType, filter.field, OPERATORS[filter.operator as keyof typeof OPERATORS] || filter.operator, filter.value];
			}),
		);
	}

	return qs;
};

// 验证文档属性
export const validateDocumentProperties = (properties: any): boolean => {
	return properties && properties.customProperty && properties.customProperty.length > 0;
};

// 构建请求体
export const buildRequestBody = (properties: any): IDataObject => {
	const body: IDataObject = {};
	
	if (validateDocumentProperties(properties)) {
		properties.customProperty.forEach((property: any) => {
			body[property.field] = property.value;
		});
	}
	
	return body;
};

// 错误处理
export const createNodeOperationError = (message: string, itemIndex?: number) => {
	return {
		message,
		itemIndex,
	};
};

// 处理名称的工具函数
type DocFields = Array<{ name: string; value: string }>;

const ensureName = (docFields: DocFields) => docFields.filter((o) => o.name);
const sortByName = (docFields: DocFields) => sortBy(docFields, ['name']);
const uniqueByName = (docFields: DocFields) => uniqBy(docFields, (o) => o.name);

export const processNames = flow(ensureName, sortByName, uniqueByName);

// 转换为SQL操作符
export const toSQL = (operator: string) => {
	return OPERATORS[operator as keyof typeof OPERATORS] || operator;
}; 