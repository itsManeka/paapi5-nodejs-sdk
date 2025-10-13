// Type definitions for @itsmaneka/paapi5-nodejs-sdk
// Project: https://github.com/itsManeka/paapi5-nodejs-sdk
// Definitions by: PAAPI5 NodeJS SDK Team

declare module '@itsmaneka/paapi5-nodejs-sdk' {
	export interface ApiClient {
		accessKey: string;
		secretKey: string;
		host: string;
		region: string;
	}

	export interface Money {
		Amount: number;
		Currency: string;
		DisplayAmount: string;
	}

	export interface DealDetails {
		AccessType?: string;
		Badge?: string;
		EndTime?: string;
		PercentClaimed?: number;
		StartTime?: string;
	}

	export interface SavingBasis {
		Money: Money;
		SavingBasisType?: string;
		SavingBasisTypeLabel?: string;
	}

	export interface SavingsV2 {
		Money: Money;
		Percentage?: number;
	}

	export interface OfferPriceV2 {
		Money: Money;
		SavingBasis?: SavingBasis;
		Savings?: SavingsV2;
	}

	export interface OfferAvailabilityV2 {
		MaxOrderQuantity?: number;
		Message?: string;
		MinOrderQuantity?: number;
		Type?: string;
	}

	export interface OfferConditionV2 {
		ConditionNote?: string;
		SubCondition?: string;
		Value?: string;
	}

	export interface OfferMerchantInfoV2 {
		Id?: string;
		Name?: string;
	}

	export interface OfferListingV2 {
		Availability?: OfferAvailabilityV2;
		Condition?: OfferConditionV2;
		DealDetails?: DealDetails;
		IsBuyBoxWinner?: boolean;
		MerchantInfo?: OfferMerchantInfoV2;
		Price?: OfferPriceV2;
		ViolatesMAP?: boolean;
	}

	export interface OffersV2 {
		__type?: string;
		Listings?: OfferListingV2[];
	}

	// Legacy Offer interfaces (existing)
	export interface Price {
		Amount: number;
		Currency: string;
		DisplayAmount: string;
		Savings?: {
			Amount: number;
			Currency: string;
			DisplayAmount: string;
			Percentage: number;
		};
	}

	export interface OfferListing {
		Availability?: {
			MaxOrderQuantity?: number;
			Message?: string;
			MinOrderQuantity?: number;
			Type?: string;
		};
		Condition?: {
			SubCondition?: {
				Value?: string;
			};
			Value?: string;
		};
		DeliveryInfo?: {
			IsAmazonFulfilled?: boolean;
			IsFreeShippingEligible?: boolean;
			IsPrimeEligible?: boolean;
		};
		Id?: string;
		IsBuyBoxWinner?: boolean;
		MerchantInfo?: {
			FeedbackCount?: number;
			FeedbackRating?: number;
			Id?: string;
			Name?: string;
		};
		Price?: Price;
		ProgramEligibility?: {
			IsPrimeExclusive?: boolean;
			IsPrimePantry?: boolean;
		};
		SavingBasis?: Price;
		ViolatesMAP?: boolean;
	}

	export interface OfferSummary {
		Condition?: {
			Value?: string;
		};
		HighestPrice?: Price;
		LowestPrice?: Price;
		OfferCount?: number;
	}

	export interface Offers {
		Listings?: OfferListing[];
		Summaries?: OfferSummary[];
	}

	export interface BrowseNodeInfo {
		BrowseNodes?: any[];
		WebsiteSalesRank?: {
			SalesRank?: number;
		};
	}

	export interface Images {
		Primary?: {
			Large?: {
				Height?: number;
				URL?: string;
				Width?: number;
			};
			Medium?: {
				Height?: number;
				URL?: string;
				Width?: number;
			};
			Small?: {
				Height?: number;
				URL?: string;
				Width?: number;
			};
		};
	}

	export interface ItemInfo {
		ByLineInfo?: any;
		Classifications?: any;
		ContentInfo?: any;
		ExternalIds?: any;
		Features?: any;
		ManufactureInfo?: any;
		ProductInfo?: any;
		Title?: {
			DisplayValue?: string;
			Label?: string;
			Locale?: string;
		};
	}

	export interface Item {
		ASIN?: string;
		BrowseNodeInfo?: BrowseNodeInfo;
		DetailPageURL?: string;
		Images?: Images;
		ItemInfo?: ItemInfo;
		Offers?: Offers;
		OffersV2?: OffersV2;
		ParentASIN?: string;
		RentalOffers?: any;
		Score?: number;
		VariationAttributes?: any[];
	}

	export interface SearchResult {
		Items?: Item[];
		SearchURL?: string;
		TotalResultCount?: number;
	}

	export interface ItemsResult {
		Items?: Item[];
	}

	export interface SearchItemsResponse {
		SearchResult?: SearchResult;
		Errors?: any[];
	}

	export interface GetItemsResponse {
		ItemsResult?: ItemsResult;
		Errors?: any[];
	}

	export interface SearchItemsRequest {
		PartnerTag: string;
		PartnerType: string;
		Keywords?: string;
		SearchIndex?: string;
		ItemCount?: number;
		Resources?: string[];
		SortBy?: string;
		MaxPrice?: number;
		MinPrice?: number;
		MinReviewsRating?: number;
		MinSavingPercent?: number;
	}

	export interface GetItemsRequest {
		PartnerTag: string;
		PartnerType: string;
		ItemIds: string[];
		Resources?: string[];
	}

	export interface GetVariationsRequest {
		PartnerTag: string;
		PartnerType: string;
		ASIN: string;
		Resources?: string[];
	}

	export interface GetBrowseNodesRequest {
		PartnerTag: string;
		PartnerType: string;
		BrowseNodeIds: string[];
		Resources?: string[];
	}

	export class DefaultApi {
		searchItems(
			request: SearchItemsRequest,
			callback: (error: any, data: SearchItemsResponse, response: any) => void
		): void;

		getItems(
			request: GetItemsRequest,
			callback: (error: any, data: GetItemsResponse, response: any) => void
		): void;

		getVariations(
			request: GetVariationsRequest,
			callback: (error: any, data: any, response: any) => void
		): void;

		getBrowseNodes(
			request: GetBrowseNodesRequest,
			callback: (error: any, data: any, response: any) => void
		): void;
	}

	export const ApiClient: {
		instance: ApiClient;
	};

	// Model constructors
	export class SearchItemsRequestClass {
		static constructFromObject(data: any, obj?: SearchItemsRequestClass): SearchItemsRequestClass;
	}

	export class GetItemsRequestClass {
		static constructFromObject(data: any, obj?: GetItemsRequestClass): GetItemsRequestClass;
	}

	export class SearchItemsResponseClass {
		static constructFromObject(data: any, obj?: SearchItemsResponseClass): SearchItemsResponseClass;
	}

	export class GetItemsResponseClass {
		static constructFromObject(data: any, obj?: GetItemsResponseClass): GetItemsResponseClass;
	}

	// Export model constructors with proper names
	export {
		SearchItemsRequestClass as SearchItemsRequest,
		GetItemsRequestClass as GetItemsRequest,
		SearchItemsResponseClass as SearchItemsResponse,
		GetItemsResponseClass as GetItemsResponse
	};

	// Default export for CommonJS compatibility
	const PAAPI: {
		ApiClient: ApiClient;
		DefaultApi: DefaultApi;
		// All interfaces and types exported
		Money: typeof Money;
		OffersV2: typeof OffersV2;
		SearchItemsRequest: typeof SearchItemsRequestClass;
		GetItemsRequest: typeof GetItemsRequestClass;
	};

	export = PAAPI;
}

// Also provide namespace declaration for easier imports
declare namespace PAAPI {
	export interface ApiClient {
		accessKey: string;
		secretKey: string;
		host: string;
		region: string;
	}

	export interface Money {
		Amount: number;
		Currency: string;
		DisplayAmount: string;
	}

	export interface OffersV2 {
		Listings?: OfferListingV2[];
	}

	export interface OfferListingV2 {
		Price?: OfferPriceV2;
		Availability?: OfferAvailabilityV2;
		Condition?: OfferConditionV2;
		IsBuyBoxWinner?: boolean;
		MerchantInfo?: OfferMerchantInfoV2;
	}

	export interface OfferPriceV2 {
		Money?: Money;
		SavingBasis?: SavingBasis;
		Savings?: SavingsV2;
	}

	export interface OfferAvailabilityV2 {
		Message?: string;
		Type?: string;
		MaxOrderQuantity?: number;
		MinOrderQuantity?: number;
	}

	export interface OfferConditionV2 {
		Value?: string;
		SubCondition?: string;
		ConditionNote?: string;
	}

	export interface OfferMerchantInfoV2 {
		Name?: string;
		Id?: string;
	}

	export interface SavingBasis {
		Money: Money;
		SavingBasisType?: string;
		SavingBasisTypeLabel?: string;
	}

	export interface SavingsV2 {
		Money?: Money;
		Percentage?: number;
	}

	export interface SearchItemsRequest {
		PartnerTag: string;
		PartnerType: string;
		Keywords?: string;
		SearchIndex?: string;
		ItemCount?: number;
		Resources?: string[];
	}

	export interface GetItemsRequest {
		PartnerTag: string;
		PartnerType: string;
		ItemIds: string[];
		Resources?: string[];
	}

	export interface Item {
		ASIN?: string;
		ItemInfo?: ItemInfo;
		OffersV2?: OffersV2;
	}

	export interface ItemInfo {
		Title?: {
			DisplayValue?: string;
		};
	}
}