# Product Advertising API 5.0 SDK for NodeJS - Enhanced Fork

[![NPM](https://nodei.co/npm/@itsmaneka/paapi5-nodejs-sdk.svg?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@itsmaneka/paapi5-nodejs-sdk/)

[![npm version](https://badge.fury.io/js/@itsmaneka%2Fpaapi5-nodejs-sdk.svg)](https://badge.fury.io/js/@itsmaneka%2Fpaapi5-nodejs-sdk)
[![npm](https://img.shields.io/npm/dt/@itsmaneka/paapi5-nodejs-sdk.svg)](https://www.npmjs.com/package/@itsmaneka/paapi5-nodejs-sdk)

> **📢 Important Note**: This is an actively maintained fork of the [original paapi5-nodejs-sdk](https://github.com/wusoma/paapi5-nodejs-sdk) which has been without maintenance for years. This enhanced version includes OffersV2 support, security improvements, TypeScript definitions, and ongoing maintenance.

This repository contains an enhanced Product Advertising API 5.0 NodeJS SDK called **@itsmaneka/paapi5-nodejs-sdk** that allows you to access the [Product Advertising API](https://webservices.amazon.com/paapi5/documentation/index.html) from your NodeJS app with modern features and active support.

## 🆕 New in v1.2.0

- **OffersV2 Support**: Full support for the new OffersV2 response format with enhanced offer details, deal information, and improved pricing structure
- **Enhanced Models**: New models including `Money`, `DealDetails`, `SavingBasis`, and V2 versions of offer-related models
- **Security Improvements**: Removed hardcoded credentials from sample files
- **TypeScript Compatibility**: Improved TypeScript support with proper type definitions
- **Bug Fixes**: Various bug fixes and stability improvements
- **Active Maintenance**: Regular updates and community support

## Installation

### For [Node.js](https://nodejs.org/)

The Product Advertising API NodeJS SDK can be installed via [npm](https://www.npmjs.com/package/@itsmaneka/paapi5-nodejs-sdk):

```shell
npm install @itsmaneka/paapi5-nodejs-sdk --save
```

You should now be able to `require('@itsmaneka/paapi5-nodejs-sdk')` in javascript files.

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file, that's to say your javascript file where you actually 
use this library):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
	rules: [
		{
			parser: {
				amd: false
			}
		}
	]
}
```
## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

Simple example for [SearchItems](https://webservices.amazon.com/paapi5/documentation/search-items.html) to discover Amazon products with the keyword 'Harry Potter' in All categories:

```javascript
var ProductAdvertisingAPIv1 = require('@itsmaneka/paapi5-nodejs-sdk');

var defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

// Specify your credentials here. These are used to create and sign the request.
defaultClient.accessKey = '<YOUR ACCESS KEY>';
defaultClient.secretKey = '<YOUR SECRET KEY>';

/**
 * Specify Host and Region to which you want to send the request to.
 * For more details refer:
 * https://webservices.amazon.com/paapi5/documentation/common-request-parameters.html#host-and-region
 */
defaultClient.host = 'webservices.amazon.com';
defaultClient.region = 'us-east-1';

var api = new ProductAdvertisingAPIv1.DefaultApi();

/**
 * The following is a sample request for SearchItems operation.
 * For more information on Product Advertising API 5.0 Operations,
 * refer: https://webservices.amazon.com/paapi5/documentation/operations.html
 */
var searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();

/** Enter your partner tag (store/tracking id) and partner type */
searchItemsRequest['PartnerTag'] = '<YOUR PARTNER TAG>';
searchItemsRequest['PartnerType'] = 'Associates';

// Specify search keywords
searchItemsRequest['Keywords'] = 'Harry Potter';

/**
 * Specify the category in which search request is to be made.
 * For more details, refer:
 * https://webservices.amazon.com/paapi5/documentation/use-cases/organization-of-items-on-amazon/search-index.html
 */
searchItemsRequest['SearchIndex'] = 'All';

// Specify the number of items to be returned in search result
searchItemsRequest['ItemCount'] = 1;

/**
 * Choose resources you want from SearchItemsResource enum
 * For more details, refer: https://webservices.amazon.com/paapi5/documentation/search-items.html#resources-parameter
 */
searchItemsRequest['Resources'] = ['Images.Primary.Medium', 'ItemInfo.Title', 'Offers.Listings.Price', 'OffersV2.Listings.Price'];


var callback = function (error, data, response) {
	if (error) {
		console.log('Error calling PA-API 5.0!');
		console.log('Printing Full Error Object:\n' + JSON.stringify(error, null, 1));
		console.log('Status Code: ' + error['status']);
		if (error['response'] !== undefined && error['response']['text'] !== undefined) {
			console.log('Error Object: ' + JSON.stringify(error['response']['text'], null, 1));
		}
	} else {
		console.log('API called successfully.');
		var searchItemsResponse = ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);
		console.log('Complete Response: \n' + JSON.stringify(searchItemsResponse, null, 1));
		if (searchItemsResponse['SearchResult'] !== undefined) {
			console.log('Printing First Item Information in SearchResult:');
			var item_0 = searchItemsResponse['SearchResult']['Items'][0];
			if (item_0 !== undefined) {
				if (item_0['ASIN'] !== undefined) {
					console.log('ASIN: ' + item_0['ASIN']);
				}
				if (item_0['DetailPageURL'] !== undefined) {
					console.log('DetailPageURL: ' + item_0['DetailPageURL']);
				}
				if (item_0['ItemInfo'] !== undefined && item_0['ItemInfo']['Title'] !== undefined && item_0['ItemInfo']['Title']['DisplayValue'] !== undefined) {
					console.log('Title: ' + item_0['ItemInfo']['Title']['DisplayValue']);
				}
				// Legacy Offers format
				if (item_0['Offers'] !== undefined && item_0['Offers']['Listings'] !== undefined && item_0['Offers']['Listings'][0]['Price'] !== undefined && item_0['Offers']['Listings'][0]['Price']['DisplayAmount'] !== undefined) {
					console.log('Buying Price (Legacy): ' + item_0['Offers']['Listings'][0]['Price']['DisplayAmount']);
				}
				// New OffersV2 format with enhanced details
				if (item_0['OffersV2'] !== undefined && item_0['OffersV2']['Listings'] !== undefined && item_0['OffersV2']['Listings'][0] !== undefined) {
					var offerV2 = item_0['OffersV2']['Listings'][0];
					if (offerV2['Price'] !== undefined && offerV2['Price']['Money'] !== undefined) {
						console.log('Buying Price (V2): ' + offerV2['Price']['Money']['DisplayAmount']);
						if (offerV2['Price']['Savings'] !== undefined) {
							console.log('Savings: ' + offerV2['Price']['Savings']['Money']['DisplayAmount'] + ' (' + offerV2['Price']['Savings']['Percentage'] + '%)');
						}
					}
					if (offerV2['DealDetails'] !== undefined) {
						console.log('Deal Details: ' + JSON.stringify(offerV2['DealDetails'], null, 2));
					}
				}
			}
		}
		if (searchItemsResponse['Errors'] !== undefined) {
			console.log('Errors:');
			console.log('Complete Error Response: ' + JSON.stringify(searchItemsResponse['Errors'], null, 1));
			console.log('Printing 1st Error:');
			var error_0 = searchItemsResponse['Errors'][0];
			console.log('Error Code: ' + error_0['Code']);
			console.log('Error Message: ' + error_0['Message']);
		}
	}
};

try {
	api.searchItems(searchItemsRequest, callback);
} catch (ex) {
	console.log('Exception: ' + ex);
}
```

## OffersV2 Enhanced Features

The new OffersV2 format provides enhanced offer information including:

### New Models
- **Money**: Standardized monetary values with amount, currency, and display formatting
- **DealDetails**: Information about special deals, including access type, badges, start/end times, and percent claimed
- **SavingBasis**: Enhanced saving calculations with basis type and labels
- **Enhanced Availability**: More detailed availability information including order quantity limits

### Key Differences from Legacy Offers

| Feature | Legacy Offers | OffersV2 |
|---------|---------------|----------|
| Price Structure | Simple Amount/Currency | Money object with enhanced formatting |
| Deal Information | Limited | Full DealDetails with timing and access info |
| Savings Calculation | Basic percentage | Enhanced with basis type and detailed breakdowns |
| Availability | Basic message | Detailed with quantity limits and stock status |

### OffersV2 Usage Example

```javascript
// Access OffersV2 data
if (item['OffersV2'] && item['OffersV2']['Listings']) {
	item['OffersV2']['Listings'].forEach(listing => {
		// Price information
		if (listing['Price'] && listing['Price']['Money']) {
			console.log('Price:', listing['Price']['Money']['DisplayAmount']);
		}
		
		// Deal details (if available)
		if (listing['DealDetails']) {
			console.log('Deal Type:', listing['DealDetails']['AccessType']);
			console.log('Deal Badge:', listing['DealDetails']['Badge']);
			console.log('Deal End Time:', listing['DealDetails']['EndTime']);
		}
		
		// Enhanced availability
		if (listing['Availability']) {
			console.log('Availability:', listing['Availability']['Message']);
			console.log('Stock Type:', listing['Availability']['Type']);
			if (listing['Availability']['MaxOrderQuantity']) {
				console.log('Max Order Quantity:', listing['Availability']['MaxOrderQuantity']);
			}
		}
	});
}
```

Complete documentation, installation instructions, and examples are available [here](https://webservices.amazon.com/paapi5/documentation/index.html).

## Security Note

⚠️ **Important**: Never commit your API credentials to version control. Always use environment variables or secure configuration files to store your access keys, secret keys, and partner tags.

```javascript
// ✅ Good practice - use environment variables
defaultClient.accessKey = process.env.PA_API_ACCESS_KEY;
defaultClient.secretKey = process.env.PA_API_SECRET_KEY;
searchItemsRequest['PartnerTag'] = process.env.PA_API_PARTNER_TAG;
```

## License

## 🚀 Development & Contributing

### Automated CI/CD Pipeline

This project uses GitHub Actions for automated testing and publishing:

- **Continuous Integration**: All pushes and pull requests are automatically tested across Node.js versions 16.x, 18.x, and 20.x
- **Automated Publishing**: When PRs are merged to `master`, the package is automatically published to NPM
- **Security Scanning**: Automated security audits and credential scanning
- **TypeScript Validation**: Automated testing of TypeScript definitions

### Publishing Process

1. **Development**: Create feature branches and submit pull requests
2. **Testing**: CI automatically runs comprehensive tests
3. **Version Bump**: Update version in `package.json` using:
   ```bash
   npm version patch   # Bug fixes
   npm version minor   # New features  
   npm version major   # Breaking changes
   ```
4. **Automatic Release**: On merge to `master`, the package is automatically:
   - Tested across multiple Node.js versions
   - Published to NPM
   - Tagged in Git
   - Released on GitHub

### For Maintainers

To set up automated publishing, configure these GitHub repository secrets:
- `NPM_TOKEN`: Your NPM automation token

See [`.github/README.md`](.github/README.md) for detailed workflow documentation.

## License

This SDK is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see LICENSE.txt and NOTICE.txt for more information.
