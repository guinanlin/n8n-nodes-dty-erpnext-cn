import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { erpNextApiRequest } from '../../GenericFunctions';
import { buildRequestBody, validateDocumentProperties } from '../../shared/helpers';
import { API_ENDPOINTS } from '../../shared/constants';
import type { DocumentProperties } from '../../shared/types';

export async function DocumentManageExecute(
	this: IExecuteFunctions,
	operation: string,
): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	let responseData;

	for (let i = 0; i < items.length; i++) {
		if (operation === 'create') {
			// ----------------------------------
			//         documentManage: create
			// ----------------------------------

			const properties = this.getNodeParameter('properties', i) as DocumentProperties;

			if (!validateDocumentProperties(properties)) {
				throw new NodeOperationError(
					this.getNode(),
					'Please enter at least one property for the document to create.',
					{ itemIndex: i },
				);
			}

			const body = buildRequestBody(properties);
			const docType = this.getNodeParameter('docType', i) as string;

			responseData = await erpNextApiRequest.call(
				this,
				'POST',
				`${API_ENDPOINTS.RESOURCE}/${docType}`,
				body,
			);
			responseData = responseData.data;
		} else if (operation === 'delete') {
			// ----------------------------------
			//         documentManage: delete
			// ----------------------------------

			const docType = this.getNodeParameter('docType', i) as string;
			const documentName = this.getNodeParameter('documentName', i) as string;

			responseData = await erpNextApiRequest.call(
				this,
				'DELETE',
				`${API_ENDPOINTS.RESOURCE}/${docType}/${documentName}`,
			);
		} else if (operation === 'update') {
			// ----------------------------------
			//         documentManage: update
			// ----------------------------------

			const properties = this.getNodeParameter('properties', i) as DocumentProperties;

			if (!validateDocumentProperties(properties)) {
				throw new NodeOperationError(
					this.getNode(),
					'Please enter at least one property for the document to update.',
					{ itemIndex: i },
				);
			}

			const body = buildRequestBody(properties);
			const docType = this.getNodeParameter('docType', i) as string;
			const documentName = this.getNodeParameter('documentName', i) as string;

			responseData = await erpNextApiRequest.call(
				this,
				'PUT',
				`${API_ENDPOINTS.RESOURCE}/${docType}/${documentName}`,
				body,
			);
			responseData = responseData.data;
		}

		const executionData = this.helpers.constructExecutionMetaData(
			this.helpers.returnJsonArray(responseData as IDataObject[]),
			{ itemData: { item: i } },
		);
		returnData.push(...executionData);
	}

	return [returnData];
} 