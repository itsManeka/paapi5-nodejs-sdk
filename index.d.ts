/**
 * @itsmaneka/paapi5-nodejs-sdk TypeScript Definitions
 * Versão: 1.0.1
 * Repositório: https://github.com/itsmaneka/paapi5-nodejs-sdk
 */

declare module '@itsmaneka/paapi5-nodejs-sdk' {

	// ===== INTERFACES BÁSICAS =====

	export interface DisplayValue {
		DisplayValue?: string;
		Label?: string;
		Locale?: string;
	}

	export interface Money {
		Amount?: number;
		Currency?: string;
		DisplayAmount?: string;
	}

	// ===== CONFIGURAÇÃO DA API =====

	export interface ApiClientConfig {
		accessKey?: string;
		secretKey?: string;
		host?: string;
		region?: string;
		basePath?: string;
	}

	export declare class ApiClient {
		constructor(config?: ApiClientConfig);

		accessKey?: string;
		secretKey?: string;
		host?: string;
		region?: string;
		basePath?: string;

		static instance: ApiClient;
	}

	// ===== CONTRIBUIDORES E BY LINE INFO =====

	export interface Contributor {
		Name?: string;
		Locale?: string;
		Role?: string;
	}

	export interface ByLineInfo {
		Brand?: DisplayValue;
		Manufacturer?: DisplayValue;
		Contributors?: Contributor[];
	}

	// ===== BROWSE NODE INFO =====

	export interface BrowseNode {
		Id?: string;
		DisplayName?: string;
		ContextFreeName?: string;
		Ancestor?: BrowseNode;
		Children?: BrowseNode[];
		SalesRank?: number;
	}

	export interface BrowseNodeInfo {
		BrowseNodes?: BrowseNode[];
		WebsiteSalesRank?: {
			ContextFreeName?: string;
			DisplayName?: string;
			SalesRank?: number;
		};
	}

	// ===== CLASSIFICAÇÕES E CATEGORIAS =====

	export interface Classifications {
		Binding?: DisplayValue;
		ProductGroup?: DisplayValue;
	}

	// ===== PREÇOS E OFERTAS =====

	export interface OfferPrice {
		Money?: Money;
		PriceType?: string;
		Savings?: Money;
	}

	export interface OfferPriceV2 {
		Money?: Money;
		PriceType?: string;
		Savings?: Money;
		SavingBasis?: Money;
	}

	export type AvailabilityType = 'PREORDER' | 'OUT_OF_STOCK' | 'IN_STOCK' | 'LEADTIME';

	export interface OfferAvailability {
		MaxOrderQuantity?: number;
		Message?: string;
		MinOrderQuantity?: number;
		Type?: AvailabilityType;
	}

	export interface MerchantInfo {
		Id?: string;
		Name?: string;
		DefaultShippingCountry?: string;
	}

	export interface OfferCondition {
		ConditionNote?: DisplayValue;
		SubCondition?: DisplayValue;
		Value?: string;
	}

	export interface DeliveryInfo {
		IsAmazonFulfilled?: boolean;
		IsFreeShippingEligible?: boolean;
		IsPrimeEligible?: boolean;
		ShippingCharges?: Money;
	}

	export interface LoyaltyPoints {
		Points?: number;
	}

	export interface ProgramEligibility {
		IsPrimeExclusive?: boolean;
		IsPrimePantry?: boolean;
	}

	export interface OfferListingV2 {
		Availability?: OfferAvailability;
		Condition?: OfferCondition;
		DeliveryInfo?: DeliveryInfo;
		IsBuyBoxWinner?: boolean;
		LoyaltyPoints?: LoyaltyPoints;
		MerchantInfo?: MerchantInfo;
		Price?: OfferPriceV2;
		ProgramEligibility?: ProgramEligibility;
		Promotions?: any[];
		SavingBasis?: OfferPriceV2;
		ViolatesMAP?: boolean;
	}

	export interface OffersV2 {
		Listings?: OfferListingV2[];
		Summary?: {
			HighestPrice?: Money;
			LowestPrice?: Money;
			OfferCount?: number;
		};
	}

	// ===== INFORMAÇÕES DO ITEM =====

	export interface ItemInfo {
		ByLineInfo?: ByLineInfo;
		Classifications?: Classifications;
		ContentInfo?: {
			Edition?: DisplayValue;
			PagesCount?: DisplayValue;
			PublicationDate?: DisplayValue;
		};
		ContentRating?: {
			AudienceRating?: DisplayValue;
		};
		ExternalIds?: {
			EANs?: DisplayValue[];
			ISBNs?: DisplayValue[];
			UPCs?: DisplayValue[];
		};
		Features?: DisplayValue[];
		ManufactureInfo?: {
			ItemPartNumber?: DisplayValue;
			Model?: DisplayValue;
			Warranty?: DisplayValue;
		};
		ProductInfo?: {
			Color?: DisplayValue;
			IsAdultProduct?: DisplayValue;
			ItemDimensions?: {
				Height?: DisplayValue;
				Length?: DisplayValue;
				Weight?: DisplayValue;
				Width?: DisplayValue;
			};
			ReleaseDate?: DisplayValue;
			Size?: DisplayValue;
			UnitCount?: DisplayValue;
		};
		TechnicalInfo?: {
			Formats?: DisplayValue[];
			EnergyEfficiencyClass?: DisplayValue;
		};
		Title?: DisplayValue;
		TradeInInfo?: {
			Price?: Money;
			IsEligibleForTradeIn?: boolean;
		};
	}

	// ===== IMAGENS =====

	export interface ImageInfo {
		URL?: string;
		Height?: number;
		Width?: number;
	}

	export interface Images {
		Primary?: {
			Small?: ImageInfo;
			Medium?: ImageInfo;
			Large?: ImageInfo;
		};
		Variants?: {
			Small?: ImageInfo[];
			Medium?: ImageInfo[];
			Large?: ImageInfo[];
		};
	}

	// ===== ITEM COMPLETO =====

	export interface Item {
		ASIN?: string;
		BrowseNodeInfo?: BrowseNodeInfo;
		DetailPageURL?: string;
		Images?: Images;
		ItemInfo?: ItemInfo;
		OffersV2?: OffersV2;
		ParentASIN?: string;
		RentalOffersV2?: any; // Pode ser detalhado se necessário
		Score?: number;
		VariationSummary?: any; // Pode ser detalhado se necessário
	}

	// ===== RESOURCES UNION TYPES =====

	export type GetItemsResource =
		| 'BrowseNodeInfo.BrowseNodes'
		| 'BrowseNodeInfo.BrowseNodes.Ancestor'
		| 'BrowseNodeInfo.BrowseNodes.SalesRank'
		| 'BrowseNodeInfo.WebsiteSalesRank'
		| 'Images.Primary.Small'
		| 'Images.Primary.Medium'
		| 'Images.Primary.Large'
		| 'Images.Variants.Small'
		| 'Images.Variants.Medium'
		| 'Images.Variants.Large'
		| 'ItemInfo.ByLineInfo'
		| 'ItemInfo.Classifications'
		| 'ItemInfo.ContentInfo'
		| 'ItemInfo.ContentRating'
		| 'ItemInfo.ExternalIds'
		| 'ItemInfo.Features'
		| 'ItemInfo.ManufactureInfo'
		| 'ItemInfo.ProductInfo'
		| 'ItemInfo.TechnicalInfo'
		| 'ItemInfo.Title'
		| 'ItemInfo.TradeInInfo'
		| 'OffersV2.Listings.Availability.MaxOrderQuantity'
		| 'OffersV2.Listings.Availability.Message'
		| 'OffersV2.Listings.Availability.MinOrderQuantity'
		| 'OffersV2.Listings.Availability.Type'
		| 'OffersV2.Listings.Condition'
		| 'OffersV2.Listings.Condition.ConditionNote'
		| 'OffersV2.Listings.Condition.SubCondition'
		| 'OffersV2.Listings.DeliveryInfo.IsAmazonFulfilled'
		| 'OffersV2.Listings.DeliveryInfo.IsFreeShippingEligible'
		| 'OffersV2.Listings.DeliveryInfo.IsPrimeEligible'
		| 'OffersV2.Listings.DeliveryInfo.ShippingCharges'
		| 'OffersV2.Listings.IsBuyBoxWinner'
		| 'OffersV2.Listings.LoyaltyPoints.Points'
		| 'OffersV2.Listings.MerchantInfo'
		| 'OffersV2.Listings.Price'
		| 'OffersV2.Listings.ProgramEligibility.IsPrimeExclusive'
		| 'OffersV2.Listings.ProgramEligibility.IsPrimePantry'
		| 'OffersV2.Listings.Promotions'
		| 'OffersV2.Listings.SavingBasis'
		| 'OffersV2.Summary.HighestPrice'
		| 'OffersV2.Summary.LowestPrice'
		| 'OffersV2.Summary.OfferCount'
		| 'ParentASIN';

	export type SearchItemsResource = 
		| GetItemsResource
		| 'SearchRefinements'
		| 'VariationSummary.Price.HighestPrice'
		| 'VariationSummary.Price.LowestPrice'
		| 'VariationSummary.VariationDimension';

	// ===== REQUESTS =====

	export interface GetItemsRequestClass {
		ItemIds?: string[];
		ItemIdType?: 'ASIN' | 'EAN' | 'ISBN' | 'UPC';
		Condition?: 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished';
		CurrencyOfPreference?: string;
		LanguagesOfPreference?: string[];
		Marketplace?: string;
		Merchant?: 'All' | 'Amazon';
		OfferCount?: number;
		PartnerTag?: string;
		PartnerType?: 'Associates';
		Resources?: GetItemsResource[];
	}

	export interface SearchItemsRequestClass {
		Keywords?: string;
		SearchIndex?: string;
		Actor?: string;
		Artist?: string;
		Author?: string;
		Availability?: 'Available' | 'IncludeOutOfStock';
		Brand?: string;
		BrowseNodeId?: string;
		Condition?: 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished';
		CurrencyOfPreference?: string;
		DeliveryFlags?: string[];
		ItemCount?: number;
		ItemPage?: number;
		LanguagesOfPreference?: string[];
		Marketplace?: string;
		MaxPrice?: number;
		Merchant?: 'All' | 'Amazon';
		MinPrice?: number;
		MinReviewsRating?: number;
		MinSavingPercent?: number;
		OfferCount?: number;
		PartnerTag?: string;
		PartnerType?: 'Associates';
		Resources?: SearchItemsResource[];
		SearchIndex?: string;
		SortBy?: string;
		Title?: string;
	}

	export interface GetBrowseNodesRequestClass {
		BrowseNodeIds?: string[];
		LanguagesOfPreference?: string[];
		Marketplace?: string;
		PartnerTag?: string;
		PartnerType?: 'Associates';
		Resources?: string[];
	}

	export interface GetVariationsRequestClass {
		ASIN?: string;
		Condition?: 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished';
		CurrencyOfPreference?: string;
		LanguagesOfPreference?: string[];
		Marketplace?: string;
		Merchant?: 'All' | 'Amazon';
		OfferCount?: number;
		PartnerTag?: string;
		PartnerType?: 'Associates';
		Resources?: string[];
		VariationCount?: number;
		VariationPage?: number;
	}

	// ===== RESPONSES =====

	export interface ErrorData {
		Code?: string;
		Message?: string;
	}

	export interface GetItemsResponse {
		ItemsResult?: {
			Items?: Item[];
		};
		Errors?: ErrorData[];
	}

	export interface SearchItemsResponse {
		SearchResult?: {
			Items?: Item[];
			SearchRefinements?: any;
			TotalResultCount?: number;
			SearchURL?: string;
		};
		Errors?: ErrorData[];
	}

	export interface GetBrowseNodesResponse {
		BrowseNodesResult?: {
			BrowseNodes?: BrowseNode[];
		};
		Errors?: ErrorData[];
	}

	export interface GetVariationsResponse {
		VariationsResult?: {
			Items?: Item[];
			VariationSummary?: any;
		};
		Errors?: ErrorData[];
	}

	// ===== API PRINCIPAL =====

	export declare class DefaultApi {
		constructor(apiClient?: ApiClient);

		/**
		 * Busca itens por ASIN, EAN, ISBN ou UPC
		 * @param getItemsRequest Requisição com IDs dos produtos
		 * @param callback Callback opcional para execução assíncrona
		 * @returns Promise com resposta da API
		 */
		getItems(
			getItemsRequest: GetItemsRequestClass,
			callback?: (error: any, data?: GetItemsResponse) => void
		): Promise<GetItemsResponse>;

		/**
		 * Pesquisa produtos por palavra-chave
		 * @param searchItemsRequest Requisição de pesquisa
		 * @param callback Callback opcional para execução assíncrona
		 * @returns Promise com resposta da API
		 */
		searchItems(
			searchItemsRequest: SearchItemsRequestClass,
			callback?: (error: any, data?: SearchItemsResponse) => void
		): Promise<SearchItemsResponse>;

		/**
		 * Busca informações de categorias (browse nodes)
		 * @param getBrowseNodesRequest Requisição de categorias
		 * @param callback Callback opcional para execução assíncrona
		 * @returns Promise com resposta da API
		 */
		getBrowseNodes(
			getBrowseNodesRequest: GetBrowseNodesRequestClass,
			callback?: (error: any, data?: GetBrowseNodesResponse) => void
		): Promise<GetBrowseNodesResponse>;

		/**
		 * Busca variações de um produto
		 * @param getVariationsRequest Requisição de variações
		 * @param callback Callback opcional para execução assíncrona
		 * @returns Promise com resposta da API
		 */
		getVariations(
			getVariationsRequest: GetVariationsRequestClass,
			callback?: (error: any, data?: GetVariationsResponse) => void
		): Promise<GetVariationsResponse>;
	}

	// ===== EXPORTS =====

	export const GetItemsRequest: typeof GetItemsRequestClass;
	export const SearchItemsRequest: typeof SearchItemsRequestClass;
	export const GetBrowseNodesRequest: typeof GetBrowseNodesRequestClass;
	export const GetVariationsRequest: typeof GetVariationsRequestClass;

	export const ApiClient: {
		new(config?: ApiClientConfig): ApiClient;
		instance: ApiClient;
	};

	export const DefaultApi: {
		new(apiClient?: ApiClient): DefaultApi;
	};
}