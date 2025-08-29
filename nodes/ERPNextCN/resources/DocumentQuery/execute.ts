import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { erpNextApiRequest, erpNextApiRequestAllItems } from '../../GenericFunctions';
import { buildQueryString } from '../../shared/helpers';
import { API_ENDPOINTS } from '../../shared/constants';

export async function DocumentQueryExecute(
	this: IExecuteFunctions,
	operation: string,
): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	let responseData;

	for (let i = 0; i < items.length; i++) {
		if (operation === 'get') {
			// ----------------------------------
			//          documentQuery: get
			// ----------------------------------

			const docType = this.getNodeParameter('docType', i) as string;
			const documentName = this.getNodeParameter('documentName', i) as string;

			responseData = await erpNextApiRequest.call(
				this,
				'GET',
				`${API_ENDPOINTS.RESOURCE}/${docType}/${documentName}`,
			);
			responseData = responseData.data;
		}

		if (operation === 'getAll') {
			// ----------------------------------
			//         documentQuery: getAll
			// ----------------------------------

			const docType = this.getNodeParameter('docType', i) as string;
			const endpoint = `${API_ENDPOINTS.RESOURCE}/${docType}`;

			const options = this.getNodeParameter('options', i) as {
				fields: string[];
				filters: {
					customProperty: Array<{ field: string; operator: string; value: string }>;
				};
			};

			const qs = buildQueryString(options, docType);

			const returnAll = this.getNodeParameter('returnAll', i);

			if (!returnAll) {
				const limit = this.getNodeParameter('limit', i);
				qs.limit_page_length = limit;
				qs.limit_start = 0;
				responseData = await erpNextApiRequest.call(this, 'GET', endpoint, {}, qs);
				responseData = responseData.data;
			} else {
				responseData = await erpNextApiRequestAllItems.call(
					this,
					'data',
					'GET',
					endpoint,
					{},
					qs,
				);
			}
		}

		const executionData = this.helpers.constructExecutionMetaData(
			this.helpers.returnJsonArray(responseData as IDataObject[]),
			{ itemData: { item: i } },
		);
		returnData.push(...executionData);
	}

	return [returnData];
} 