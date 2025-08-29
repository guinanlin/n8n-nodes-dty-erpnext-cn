import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ERPNextApi implements ICredentialType {
	name = 'erpNextApi';
	displayName = 'ERPNextCN API';
	documentationUrl = 'https://docs.n8n.io/integrations/builtin/credentials/erpnext/';
	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Cloud Hosted',
					value: 'cloudHosted',
				},
				{
					name: 'Self Hosted',
					value: 'selfHosted',
				},
			],
			default: 'cloudHosted',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'API Secret',
			name: 'apiSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
			required: false,
			displayOptions: {
				show: {
					environment: ['cloudHosted'],
				},
			},
			placeholder: 'your-subdomain',
			description: 'Your ERPNext subdomain',
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					environment: ['cloudHosted'],
				},
			},
			placeholder: 'erpnext.com',
			description: 'Your ERPNext domain',
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					environment: ['selfHosted'],
				},
			},
			placeholder: 'https://your-erpnext-instance.com',
			description: 'Your ERPNext instance URL',
		},
		{
			displayName: 'Allow Unauthorized Certificates',
			name: 'allowUnauthorizedCerts',
			type: 'boolean',
			default: false,
			description: 'Whether to allow unauthorized certificates',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=token {{$credentials.apiKey}}:{{$credentials.apiSecret}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "cloudHosted" ? "https://" + $credentials.subdomain + "." + $credentials.domain : $credentials.domain}}',
			url: '/api/resource/DocType',
			method: 'GET',
		},
	};
} 