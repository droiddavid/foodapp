import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserComponent } from 'src/app/components/user/user.component';


@Injectable({
  providedIn: 'root'
})


export class DatabaseService {

	select: string = environment.database.baseUrl + environment.database.select;
	insert: string = environment.database.baseUrl + environment.database.insert;
	_delete: string = environment.database.baseUrl + environment.database.delete;
	deleteIn: string = environment.database.baseUrl + environment.database.deleteIn;
	fileMover: string = environment.database.baseUrl + environment.database.fileMover;
	update: string = environment.database.baseUrl + environment.database.update;


	constructor(private http: HttpClient) { }


	//Http Headers
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		})
	}


	ngOnInit() { }

	//POST
	createUser(data: any): Observable<UserComponent> {
		return this.http.post<UserComponent>(
			this.insert,
			JSON.stringify(data), 
			this.httpOptions
		)
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		)
	}

	// Error handling
	errorHandler(error: { 
		error: { message: string; }; 
		status: any; 
		message: any; 
	}) {
		let errorMessage = '';
		if(error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log(errorMessage);

		const err = new Error('test'); 
		return throwError(() => err);


		//deprecated in angular 13. see throwError.d.ts(102, 4):
		//return throwError(errorMessage);
	}

	//fileMover
	saveImage(formData: FormData): Observable<any> {
		return this.http.post(this.fileMover, formData);
	}

	// GET
	getData(table:string, fields:string, where:any): Observable<any> {
		return this.http.post(
			this.select, 
			JSON.stringify({
				table:table,
				fields:fields,
				where:where
			}),
			this.httpOptions
		)
	}

	delete(table:string, fieldName:string, fieldValue: string): Observable<any> {
		return this.http.post(this._delete, JSON.stringify({
			table: table,
			field: fieldName,
			fieldList: fieldValue
		})) //.pipe();
	}

	deleteMultipleIn(table:string, field:string, fieldList: string): Observable<any> {
		return this.http.post(this.deleteIn, JSON.stringify({
			table: table,
			field: field,
			fieldList: fieldList
		})) //.pipe();
	}

	//POST - INSERT
	addData(data: any): Observable<any> {
		return this.http.post<any>(
			this.insert,
			JSON.stringify(data), 
			this.httpOptions
		)
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		)
	}

	//update
	updateData(table:string, columnsArray: Array<string>, where: string, requiredColumnsArray: Array<string>):Observable<any> {
		return this.http.post(
			this.update,
			{table, columnsArray, where, requiredColumnsArray},
			this.httpOptions
		)		
			.pipe(catchError(error => this.errorHandler(error)))
	}
}
