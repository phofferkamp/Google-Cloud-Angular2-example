# Google Cloud Angular2 example

Set up to make calls via [Google Cloud Datastore API](https://cloud.google.com/datastore/docs/reference/rest/).

Following process from [Using OAuth 2.0 for Server to Server Applications](https://developers.google.com/identity/protocols/OAuth2ServiceAccount).

# Sample calls

All calls are POSTs with header:

```
Authorization: Bearer <access_token>
```

## Lookup
```
https://datastore.googleapis.com/v1/projects/{Projet ID}:lookup
```
```json
{
  "keys": [
      {
		  "path": [
			  {
				"kind": "Book",
				  "id": 5629499534213120 
				}
		  ]
    }
  ]
}
```

## Run Query
```
https://datastore.googleapis.com/v1/projects/{Projet ID}:runQuery
```
```json
{
  "query": {
	  "kind": [
		{
		  "name": "Book",
		}
	  ],
	  "filter": {
		"propertyFilter": {
		  "property": {
				"name": "author",
			},
		  "op": "EQUAL",
		  "value": {
			  "stringValue": "fdasf",
			}
		}
	  }
	}
}
```

## Commit

Get transaction key:
```
https://datastore.googleapis.com/v1/projects/{Projet ID}:beginTransaction
```

Commit:
```
https://datastore.googleapis.com/v1/projects/{Projet ID}:commit
```
```json
{
  "mode": "TRANSACTIONAL",
  "mutations": [
    {
	  "insert": {
		  "key": {
			  "path": [
				{
					"kind": "Book",
				  "name": "newBook1" 
				}
			  ],
			},
		  "properties": {
			"author": {
			  "stringValue": "author1"
			}
		  },
		}
	}
  ],
  "transaction": "",
}
```

# Notes

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License

MIT © [Paul Hofferkamp](mailto:phofferkamp@gmail.com)