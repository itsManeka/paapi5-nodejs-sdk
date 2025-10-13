/**
 * Copyright 2024 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// Run `npm install` locally before executing following code with `node sampleOffersV2Api.js`

/**
 * This sample code snippet demonstrates how to use the new OffersV2 API
 * to get enhanced offer information with deal details, improved pricing structure,
 * and better availability information.
 * 
 * OffersV2 provides significant improvements over legacy Offers including:
 * - Enhanced pricing structure with Money objects  
 * - Detailed availability information
 * - Deal details for Prime offers
 * - Improved merchant information
 * 
 * This sample successfully retrieves OffersV2 data from Amazon.com.br
 * For more details on OffersV2, refer to the README.md file.
 */
require('dotenv').config();

var ProductAdvertisingAPIv1 = require('./src/index');

var defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

// Specify your credentials here. These are used to create and sign the request.
// SECURITY WARNING: Never commit real credentials to version control!
// Use environment variables or secure configuration files in production.
defaultClient.accessKey = process.env.PA_API_ACCESS_KEY || '<YOUR ACCESS KEY>';
defaultClient.secretKey = process.env.PA_API_SECRET_KEY || '<YOUR SECRET KEY>';

/**
 * PAAPI Host and Region to which you want to send request.
 * For more details refer: https://webservices.amazon.com/paapi5/documentation/common-request-parameters.html#host-and-region
 */
defaultClient.host = 'webservices.amazon.com.br';
defaultClient.region = 'us-east-1';

var api = new ProductAdvertisingAPIv1.DefaultApi();

// Request Initialization - Using GetItems like in the scratchpad test
var getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();

/** Enter your partner tag (store/tracking id) and partner type */
getItemsRequest['PartnerTag'] = process.env.PA_API_PARTNER_TAG || '<YOUR PARTNER TAG>';
getItemsRequest['PartnerType'] = 'Associates';

/** Specify ItemIds - Using the same ASIN that worked in scratchpad */
getItemsRequest['ItemIds'] = ['6525935458'];

/** Specify Marketplace like in the scratchpad */
getItemsRequest['Marketplace'] = 'www.amazon.com.br';

/** Specify Merchant like in the scratchpad */
getItemsRequest['Merchant'] = 'Amazon';

/**
 * Testing with all working OffersV2 resources plus DealDetails
 */
getItemsRequest['Resources'] = [
	'ItemInfo.Title',
	'Images.Primary.Medium',
	'Offers.Listings.Price',
	'Offers.Summaries.LowestPrice',
	'OffersV2.Listings.Price',
	'OffersV2.Listings.Availability',
	'OffersV2.Listings.Condition',
	'OffersV2.Listings.IsBuyBoxWinner',
	'OffersV2.Listings.MerchantInfo',
	'OffersV2.Listings.LoyaltyPoints',
	'OffersV2.Listings.Type',
	'OffersV2.Listings.DealDetails'
];

function displayOffersV2Info(item) {
	console.log('\n=== OffersV2 Enhanced Information ===');
	
	if (!item['OffersV2'] || !item['OffersV2']['Listings']) {
		console.log('No OffersV2 data available for this item');
		return;
	}

	item['OffersV2']['Listings'].forEach((listing, index) => {
		console.log(`\n--- Offer ${index + 1} ---`);
		
		// Price information with enhanced Money object
		if (listing['Price'] && listing['Price']['Money']) {
			const price = listing['Price']['Money'];
			console.log(`💰 Price: ${price['DisplayAmount']} (${price['Amount']} ${price['Currency']})`);
			
			// Savings information
			if (listing['Price']['Savings']) {
				const savings = listing['Price']['Savings'];
				console.log(`💵 Savings: ${savings['Money']['DisplayAmount']} (${savings['Percentage']}%)`);
				
				if (listing['Price']['SavingBasis']) {
					const basis = listing['Price']['SavingBasis'];
					console.log(`📊 Original Price: ${basis['Money']['DisplayAmount']} (${basis['SavingBasisTypeLabel']})`);
				}
			}
		}
		
		// Deal Details (Prime exclusive, time-limited deals, etc.)
		if (listing['DealDetails']) {
			const deal = listing['DealDetails'];
			console.log('\n🎯 Deal Information:');
			console.log(`	 Access Type: ${deal['AccessType'] || 'N/A'}`);
			console.log(`	 Badge: ${deal['Badge'] || 'N/A'}`);
			
			if (deal['StartTime'] && deal['EndTime']) {
				console.log(`	 Duration: ${deal['StartTime']} to ${deal['EndTime']}`);
			}
			
			if (deal['PercentClaimed'] !== undefined) {
				console.log(`	 Claimed: ${deal['PercentClaimed']}%`);
			}
		}
		
		// Enhanced Availability Information
		if (listing['Availability']) {
			const availability = listing['Availability'];
			console.log('\n📦 Availability:');
			console.log(`	 Status: ${availability['Message'] || 'N/A'}`);
			console.log(`	 Type: ${availability['Type'] || 'N/A'}`);
			
			if (availability['MinOrderQuantity']) {
				console.log(`	 Min Order: ${availability['MinOrderQuantity']}`);
			}
			
			if (availability['MaxOrderQuantity']) {
				console.log(`	 Max Order: ${availability['MaxOrderQuantity']}`);
			}
		}
		
		// Condition Information
		if (listing['Condition']) {
			const condition = listing['Condition'];
			console.log('\n🏷️ Condition:');
			console.log(`	 Value: ${condition['Value'] || 'N/A'}`);
			console.log(`	 Sub-condition: ${condition['SubCondition'] || 'N/A'}`);
			
			if (condition['ConditionNote']) {
				console.log(`	 Note: ${condition['ConditionNote']}`);
			}
		}
		
		// Merchant Information
		if (listing['MerchantInfo']) {
			const merchant = listing['MerchantInfo'];
			console.log('\n🏪 Merchant:');
			console.log(`	 Name: ${merchant['Name'] || 'N/A'}`);
			console.log(`	 ID: ${merchant['Id'] || 'N/A'}`);
		}
		
		// Buy Box Winner
		if (listing['IsBuyBoxWinner'] !== undefined) {
			console.log(`\n🏆 Buy Box Winner: ${listing['IsBuyBoxWinner'] ? 'Yes' : 'No'}`);
		}
	});
}

function compareLegacyVsV2(item) {
	console.log('\n=== Legacy Offers vs OffersV2 Comparison ===');
	
	// Legacy Offers
	if (item['Offers'] && item['Offers']['Listings'] && item['Offers']['Listings'][0]) {
		const legacyOffer = item['Offers']['Listings'][0];
		console.log('\nLegacy Offers:');
		console.log(`	 Price: ${legacyOffer['Price'] ? legacyOffer['Price']['DisplayAmount'] : 'N/A'}`);
		console.log(`	 Availability: ${legacyOffer['Availability'] ? legacyOffer['Availability']['Message'] : 'N/A'}`);
	}
	
	// OffersV2
	if (item['OffersV2'] && item['OffersV2']['Listings'] && item['OffersV2']['Listings'][0]) {
		const v2Offer = item['OffersV2']['Listings'][0];
		console.log('\nOffersV2:');
		
		if (v2Offer['Price'] && v2Offer['Price']['Money']) {
			console.log(`	 Price: ${v2Offer['Price']['Money']['DisplayAmount']}`);
			
			if (v2Offer['Price']['Savings']) {
				console.log(`	 Savings: ${v2Offer['Price']['Savings']['Money']['DisplayAmount']} (${v2Offer['Price']['Savings']['Percentage']}%)`);
			}
		}
		
		console.log(`	 Availability: ${v2Offer['Availability'] ? v2Offer['Availability']['Message'] : 'N/A'}`);
		console.log(`	 Deal Info: ${v2Offer['DealDetails'] ? 'Available' : 'None'}`);
	}
}

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
		var getItemsResponse = ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(data);
		
		if (getItemsResponse['ItemsResult'] !== undefined && getItemsResponse['ItemsResult']['Items'] !== undefined) {
			console.log('\n🔍 Processing Item Results with OffersV2...\n');
			
			getItemsResponse['ItemsResult']['Items'].forEach((item, index) => {
				console.log(`\n${'='.repeat(60)}`);
				console.log(`📱 ITEM ${index + 1}`);
				console.log(`${'='.repeat(60)}`);
				
				if (item['ASIN']) {
					console.log(`🆔 ASIN: ${item['ASIN']}`);
				}
				
				if (item['ItemInfo'] && item['ItemInfo']['Title'] && item['ItemInfo']['Title']['DisplayValue']) {
					console.log(`📝 Title: ${item['ItemInfo']['Title']['DisplayValue']}`);
				}
				
				if (item['DetailPageURL']) {
					console.log(`🔗 URL: ${item['DetailPageURL']}`);
				}
				
				// Display OffersV2 information
				displayOffersV2Info(item);
				
				// Compare legacy vs V2
				compareLegacyVsV2(item);
				
				console.log('\n' + '-'.repeat(60));
			});
		}
		
		if (getItemsResponse['Errors'] !== undefined) {
			console.log('\n❌ Errors:');
			console.log('Complete Error Response: ' + JSON.stringify(getItemsResponse['Errors'], null, 1));
			
			getItemsResponse['Errors'].forEach((error, index) => {
				console.log(`Error ${index + 1}: ${error['Code']} - ${error['Message']}`);
			});
		}
	}
};

try {
	console.log('🚀 Starting OffersV2 API demonstration...');
	console.log('📋 Getting item: ' + getItemsRequest['ItemIds'][0]);
	console.log('📊 Requesting both legacy Offers and new OffersV2 data...\n');
	
	api.getItems(getItemsRequest, callback);
} catch (ex) {
	console.log('❌ Exception: ' + ex);
}