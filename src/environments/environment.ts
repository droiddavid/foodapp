// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: true,

	firebase: {
		apiKey: "AIzaSyCbzKG_RnS4V5QDg2FoxUEOF39bZpzH77w",
		authDomain: "my-personal-kitchen.firebaseapp.com",
		locationId: 'us-central',
		databaseURL: "https://my-personal-kitchen.firebaseio.com",
		projectId: "my-personal-kitchen",
		storageBucket: "my-personal-kitchen.appspot.com",
		messagingSenderId: "45285634202",
		appId: "1:45285634202:web:e82d159118561426422f23"
	},

	web_server: {
		WEB_SERVER: "www.mypersonalkitchen.com",
		WEB_SERVER_DEVBOX: "devbox.mypersonalkitchen.com",
		WEB_SERVER_ANGDEV: "angdev.mypersonalkitchen.com"
	},

	database: {
		baseUrl: "https://www.mypersonalkitchen.com/globals/database/",
		select: "select.php",
		select2: "select2.php",
		selectIn: "selectIn.php",
		selectLike: "selectLike.php",
		selectLikeTwoColumns: "selectLikeTwoColumns.php",
		insert: "insert.php",
		update: "update.php",
		delete: "delete.php",
		delete2: "delete2.php",
		deleteIn: "deleteIn.php",
		fileMover: "fileMover.php",
		photos: "photos.php",
		fileImageMover: "fileImageMover"
	}
};


























/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
