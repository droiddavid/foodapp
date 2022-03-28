export interface Profile {	
	firstName?: string;
	lastName?: string; 
	company?: string;
	description?: string;
	message?: string;
	tagsString?: string;
	hasDelivery?: boolean;
	deliveryRange?: number;
	country?: string;
	displayName?: string;
	website?: string;
	userId?: any;
	jsonProfile: any;
	isPublic: any;
}