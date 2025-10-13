# Changelog for @itsmaneka/paapi5-nodejs-sdk

All notable changes to this project will be documented in this file.

> **📢 Note**: This is an actively maintained fork of the [original paapi5-nodejs-sdk](https://github.com/wusoma/paapi5-nodejs-sdk) which has been without maintenance for years.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!--LATEST=1.2.0-->
<!--ENTRYINSERT-->

## [Unreleased]

### 🔄 Changed
- **Package Scope**: Package name changed to `@itsmaneka/paapi5-nodejs-sdk` for better organization and active maintenance
- **Repository**: This is now an actively maintained fork with ongoing support and updates
- **NPM Publishing**: Automated CI/CD pipeline for seamless releases

### 📝 Updated
- **README**: Added notice about this being an enhanced fork of the original unmaintained project
- **Installation**: Updated all installation commands to use the new scoped package name
- **Documentation**: Updated all references to point to the new package location

## [1.2.0] - 2024-12-12

### 🆕 Added
- **OffersV2 Support**: Complete implementation of the new OffersV2 response format
	- `OffersV2` main model with enhanced offer listings
	- `Money` model for standardized monetary values
	- `DealDetails` model for special deal information (Prime exclusive, time-limited deals, etc.)
	- `SavingBasis` and `SavingsV2` models for enhanced savings calculations
	- `OfferAvailabilityV2`, `OfferConditionV2`, `OfferMerchantInfoV2`, `OfferPriceV2`, and `OfferListingV2` models

### 🔧 Enhanced
- **TypeScript Support**: Added comprehensive TypeScript definitions (`index.d.ts`)
	- Full type coverage for all existing and new models
	- Proper interface definitions for OffersV2 features
	- Backward compatibility with existing code

### 🔒 Security
- **Credential Security**: Removed hardcoded credentials from all sample files
	- All sample files now use environment variables with fallback placeholders
	- Added security warnings and best practices documentation
	- Updated README with security guidelines

### 📚 Documentation
- **Enhanced README**: Updated with OffersV2 usage examples and migration guide
- **API Examples**: Added examples showing both legacy Offers and new OffersV2 usage
- **Security Guidelines**: Added section on credential management best practices

### 🛠️ Infrastructure
- **GitHub Actions**: Added automated CI/CD workflows
	- Automated testing across multiple Node.js versions (14.x, 16.x, 18.x, 20.x)
	- Security auditing and credential scanning
	- Automated NPM publishing on releases
	- TypeScript compatibility validation

### 🧹 Maintenance
- **Package.json**: Updated package metadata and dependencies
- **Repository**: Updated repository URLs and metadata

### 🔄 Migration Guide
If you're upgrading from v1.1.0 or earlier:

1. **OffersV2 is additive**: Your existing code using `Offers` will continue to work
2. **New Resources**: You can now request `OffersV2.Listings.Price` for enhanced data
3. **Environment Variables**: Update your credential management to use environment variables:
	 ```javascript
	 defaultClient.accessKey = process.env.PA_API_ACCESS_KEY;
	 defaultClient.secretKey = process.env.PA_API_SECRET_KEY;
	 ```

### 📋 Breaking Changes
- None. This release is fully backward compatible.

### ⚠️ Deprecation Notices
- While legacy `Offers` model is still supported, we recommend migrating to `OffersV2` for new implementations to take advantage of enhanced deal information and more detailed pricing data.

---
 
## [1.0.0] - Initial Release
* Initial Version of Product Advertising API 5.0 NodeJS SDK