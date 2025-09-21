import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { FileService } from '../../services';

export async function FileUploadExecute(
	this: IExecuteFunctions,
	operation: string,
): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	let responseData;

	for (let i = 0; i < items.length; i++) {
		if (operation === 'uploadByBase64') {
			// ----------------------------------
			//      fileUpload: uploadByBase64
			// ----------------------------------

			const fileName = this.getNodeParameter('fileName', i) as string;
			const base64Content = this.getNodeParameter('base64Content', i) as string;
			const options = this.getNodeParameter('options', i) as {
				isPrivate?: boolean;
				folder?: string;
				doctype?: string;
				docname?: string;
			};

			responseData = await FileService.uploadFileByBase64(this, {
				fileName,
				base64Content,
				isPrivate: options?.isPrivate,
				folder: options?.folder,
				doctype: options?.doctype,
				docname: options?.docname,
			});
		}

		if (operation === 'get') {
			// ----------------------------------
			//         fileUpload: get
			// ----------------------------------

			const fileName = this.getNodeParameter('fileName', i) as string;

			responseData = await FileService.downloadFile(this, fileName);
		}

		if (operation === 'delete') {
			// ----------------------------------
			//        fileUpload: delete
			// ----------------------------------

			const fileName = this.getNodeParameter('fileName', i) as string;

			responseData = await FileService.deleteFile(this, fileName);
		}

		const executionData = this.helpers.constructExecutionMetaData(
			this.helpers.returnJsonArray(responseData as any),
			{ itemData: { item: i } },
		);
		returnData.push(...executionData);
	}

	return [returnData];
}
