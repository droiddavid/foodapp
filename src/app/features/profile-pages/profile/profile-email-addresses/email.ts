import { EmailService } from './email.service';


export class Email {
	private _userId!: number;
	private _email!: string;
	private _emailType!: string;

	emails!: Array<Email>;

	table: string = "emails";
	fields: string = "userId";
	localStorageName: string = "emails";

	constructor(private emailService: EmailService) {}

	getEmails() {
		return this.emailService.getEmails();
	}
	getEmailsFromLocalStorage(): string | null | object {
		return this.emailService.getEmailsFromLocalStorage();
	}
	//Get the address from the DB.  Return an Observable of type Address.
	getEmailsFromDatabase() {
		return this.emailService.getEmailsFromDatabase()
	}

	delete( emailToDelete: Email ) {
		return this.emailService.delete( emailToDelete );
	}


	public get userId() { return this._userId; }
	public set userId(value: any) {
		this._userId = value;
	}

	public get email() { return this._email; }
	public set email(value: any) {
		this._email = value;
	}

	public get emailType() { return this._emailType; }
	public set emailType(value: any) {
		this._emailType = value;
	}
}
