import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { erpNextApiRequest } from '../GenericFunctions';
import { processNames } from '../shared/helpers';

/**
 * DocType服务类
 * 处理所有与ERPNext DocType相关的操作
 */
export class DocTypeService {
	/**
	 * 获取DocType列表，支持搜索
	 * @param context - n8n的loadOptions上下文
	 * @returns DocType选项数组
	 */
	static async getDocTypes(context: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		// 获取用户输入的搜索关键字
		const searchKeyword = context.getCurrentNodeParameter('docTypeSearchKeyword') as string;
		
		const query: Record<string, any> = {
			limit_page_length: 50, // 适中的限制，平衡性能和可用性
			limit_start: 0,
		};
		
		// 如果提供了搜索关键字，进行服务器端搜索
		if (searchKeyword && searchKeyword.trim()) {
			// ERPNext API服务器端搜索格式: filters=[["name","like","%searchKeyword%"]]
			query.filters = JSON.stringify([['name', 'like', `%${searchKeyword.trim()}%`]]);
		}
		
		const responseData = await erpNextApiRequest.call(
			context,
			'GET',
			'/api/resource/DocType',
			{},
			query,
		);
		
		// 返回符合n8n要求的格式: { name, value } 数组
		const docTypes = responseData.data.map(({ name }: { name: string }) => {
			return { name, value: encodeURI(name) };
		});

		return processNames(docTypes);
	}

	/**
	 * 获取指定DocType的字段列表（用于字段筛选）
	 * @param context - n8n的loadOptions上下文
	 * @returns DocType字段选项数组
	 */
	static async getDocFilters(context: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const docType = context.getCurrentNodeParameter('docType') as string;
		const { data } = await erpNextApiRequest.call(
			context,
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
	}

	/**
	 * 获取指定DocType的字段列表（用于字段查询）
	 * @param context - n8n的loadOptions上下文
	 * @returns DocType字段选项数组
	 */
	static async getDocFields(context: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const docType = context.getCurrentNodeParameter('docType') as string;
		const { data } = await erpNextApiRequest.call(
			context,
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
	}
}
