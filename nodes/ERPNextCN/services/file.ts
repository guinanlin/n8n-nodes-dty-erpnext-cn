import type { IExecuteFunctions } from 'n8n-workflow';
import { erpNextApiRequest } from '../GenericFunctions';

/**
 * File服务类
 * 处理所有与ERPNext文件相关的操作
 */
export class FileService {
	/**
	 * 通过base64上传文件到ERPNext
	 * @param context - n8n的执行上下文
	 * @param fileData - 文件数据
	 * @returns 上传结果
	 */
	static async uploadFileByBase64(
		context: IExecuteFunctions,
		fileData: {
			fileName: string;
			base64Content: string;
			isPrivate?: boolean;
			folder?: string;
			doctype?: string;
			docname?: string;
		}
	): Promise<any> {
		const { fileName, base64Content, isPrivate = false, folder, doctype, docname } = fileData;

		// 构建请求体
		const requestBody: Record<string, any> = {
			file_name: fileName,
			is_private: isPrivate ? 1 : 0,
			content: base64Content,
		};

		// 可选参数
		if (folder) {
			requestBody.folder = folder;
		}
		if (doctype) {
			requestBody.attached_to_doctype = doctype;
		}
		if (docname) {
			requestBody.attached_to_name = docname;
		}

		// 调用ERPNext API上传文件
		const responseData = await erpNextApiRequest.call(
			context,
			'POST',
			'/api/resource/File',
			requestBody
		);

		return responseData;
	}

	/**
	 * 获取文件列表
	 * @param context - n8n的上下文
	 * @returns 文件选项数组
	 */
	static async getFiles(context: any): Promise<any[]> {
		const query = {
			limit_page_length: 50,
			limit_start: 0,
			fields: JSON.stringify(['name', 'file_name', 'file_url', 'is_private']),
		};

		const responseData = await erpNextApiRequest.call(
			context,
			'GET',
			'/api/resource/File',
			{},
			query
		);

		return responseData.data;
	}

	/**
	 * 下载文件
	 * @param context - n8n的执行上下文
	 * @param fileName - 文件名
	 * @returns 文件内容
	 */
	static async downloadFile(context: IExecuteFunctions, fileName: string): Promise<any> {
		const responseData = await erpNextApiRequest.call(
			context,
			'GET',
			`/api/resource/File/${fileName}`
		);

		return responseData;
	}

	/**
	 * 删除文件
	 * @param context - n8n的执行上下文
	 * @param fileName - 文件名
	 * @returns 删除结果
	 */
	static async deleteFile(context: IExecuteFunctions, fileName: string): Promise<any> {
		const responseData = await erpNextApiRequest.call(
			context,
			'DELETE',
			`/api/resource/File/${fileName}`
		);

		return responseData;
	}
}
