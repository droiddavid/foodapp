import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserComponent } from 'src/app/components/user/user.component';


@Injectable({
  providedIn: 'root'
})


export class DatabaseService {

	private baseUrl: string = environment.database.baseUrl;

	select: string = `${ this.baseUrl }select.php`;
	_select2: string = `${ this.baseUrl }select2.php`;
	_selectIn: string = `${ this.baseUrl }selectIn.php`;
	_insert: string = `${ this.baseUrl }insert.php`;
	_delete: string = `${ this.baseUrl }delete.php`;
	deleteIn: string = `${ this.baseUrl }deleteIn.php`;
	_delete2: string = `${ this.baseUrl }delete2.php`;
	fileMover: string = `${ this.baseUrl }fileMover.php`;
	update: string = `${ this.baseUrl }update.php`;
	_fileMover: string = `${ this.baseUrl }fileMover.php`;
	_photos: string = `${ this.baseUrl }photos.php`;
	_fileImageMover: string = `${ this.baseUrl }fileImageMover.php`;

	constructor(private http: HttpClient) { }

	//Http Headers
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Origin, X-Auth-Token, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Authorization, Content-Type',
		})
	}


	ngOnInit() { }


	//POST
	createUser(data: any): Observable<UserComponent> {
		return this.http.post<UserComponent>(
			this._insert,
			JSON.stringify(data), 
			this.httpOptions
		)
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
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

		return throwError(() => errorMessage);

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
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
	}

	//select * from table where field in fieldlist
	selectIn(table:string, field:string, fieldList: string): Observable<any> {
		return this.http.post(
			this._selectIn, 
			JSON.stringify({
				table: table,
				field: field,
				fieldList: fieldList
			})
		)
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
	}


	select2(obj:any): Observable<any> {
		return this.http.post(this._select2, {
			table: obj.table,
			firstFieldName: obj.firstFieldName,
			firstFieldValue: obj.firstFieldValue,
			secondFieldName: obj.secondFieldName,
			secondFieldValue: obj.secondFieldValue
		})
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
	}

	delete(obj:any): Observable<any> {
		return this.http.post(this._delete, {
			table: obj.table,
			fieldName: obj.fieldName,
			fieldValue: obj.fieldValue
		})
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
	}

	delete2(obj:any): Observable<any> {
		return this.http.post(this._delete2, {
			table: obj.table,
			firstFieldName: obj.firstFieldName,
			firstFieldValue: obj.firstFieldValue,
			secondFieldName: obj.secondFieldName,
			secondFieldValue: obj.secondFieldValue
		})
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
	}

	deleteMultipleIn(table:string, field:string, fieldList: string): Observable<any> {
		return this.http.post(this.deleteIn, JSON.stringify({
			table: table,
			field: field,
			fieldList: fieldList
		}))
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
	}

	//POST - INSERT
	insert(data: any): Observable<any> {
		return this.http.post<any>(
			this._insert,
			JSON.stringify(data), 
			this.httpOptions
		)
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
	}

	//update
	updateData(
		table:string, 
		columnsArray: Array<string>, 
		where: string, 
		requiredColumnsArray: Array<string>
	): Observable<any> {
		return this.http.post(
			this.update,
			{table, columnsArray, where, requiredColumnsArray},
			this.httpOptions
		)
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
	}

	//photos
	uploadPhotos(url: any, formData: any): Promise<any> {
		return fetch(url, {
			method: 'POST',
			body: formData
		})
		.pipe(
			retry(1),
			catchError(error => this.errorHandler(error))
		);
		// return this.http.post<any>(
		// 	this._fileMover,
		// 	JSON.stringify(data), 
		// 	this.httpOptions
		// )
	}
}