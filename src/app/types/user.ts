export interface User {

	//User Data
	id?: any;
	directory: any;
	displayName?: string;
	email: string;
	emailVerified?: boolean;
	express_data?: string;
	firstName?: string;
	firestore_doc_id?: string;
	hasAccount?: boolean;
	lastName?: string;
	lastLogin?: string;
	message?: string;
	photoURL?: string;
	public?: boolean;
	uid?: string; //Ex?:  kaTXr6Pg62RGp5DQUUNUMnXsh2n1
	refreshToken?: string;
	role?: number;
	status?: boolean;
	uid_type?: string;
	userName?: string;
}