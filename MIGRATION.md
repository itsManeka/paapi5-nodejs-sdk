# Migration Guide from original paapi5-nodejs-sdk

## 🚀 Migrating to @itsmaneka/paapi5-nodejs-sdk

If you were using the original `paapi5-nodejs-sdk` package, this guide will help you migrate to the actively maintained fork `@itsmaneka/paapi5-nodejs-sdk`.

### Why Migrate?

The original `paapi5-nodejs-sdk` package has been **without maintenance for years** and is missing critical features:

❌ **Original Package Issues:**
- No OffersV2 support
- Outdated dependencies with security vulnerabilities
- No TypeScript support
- Hardcoded credentials in examples
- No active maintenance or bug fixes

✅ **Enhanced Fork Benefits:**
- ✅ Full OffersV2 support with enhanced offer details
- ✅ Modern TypeScript definitions
- ✅ Security improvements and best practices
- ✅ Active maintenance and regular updates
- ✅ Comprehensive documentation and examples
- ✅ Automated testing and CI/CD

### Migration Steps

#### 1. Uninstall the old package

```bash
npm uninstall paapi5-nodejs-sdk
```

#### 2. Install the enhanced version

```bash
npm install @itsmaneka/paapi5-nodejs-sdk
```

#### 3. Update your imports

**Before:**
```javascript
var ProductAdvertisingAPIv1 = require('paapi5-nodejs-sdk');
```

**After:**
```javascript
var ProductAdvertisingAPIv1 = require('@itsmaneka/paapi5-nodejs-sdk');
```

#### 4. Update TypeScript imports (if using TypeScript)

**Before:**
```typescript
import * as PAAPI from 'paapi5-nodejs-sdk';
```

**After:**
```typescript
import * as PAAPI from '@itsmaneka/paapi5-nodejs-sdk';
```

### API Compatibility

**✅ 100% Backward Compatible**: All existing code will continue to work without changes. The enhanced fork maintains full API compatibility with the original package.

### New Features Available

After migration, you can take advantage of new features:

#### OffersV2 Support

```javascript
// New OffersV2 resources
searchItemsRequest['Resources'] = [
    'ItemInfo.Title',
    'Images.Primary.Medium',
    'OffersV2.Listings.Price',           // Enhanced pricing with Money objects
    'OffersV2.Listings.Availability',    // Detailed availability info
    'OffersV2.Listings.Condition',       // Enhanced condition details
    'OffersV2.Listings.DealDetails',     // Prime deals and promotions
    'OffersV2.Listings.MerchantInfo'     // Detailed merchant information
];
```

#### Enhanced TypeScript Support

```typescript
// Full type safety with OffersV2
const offersV2: PAAPI.OffersV2 = {
    Listings: [{
        Price: {
            Money: {
                Amount: 29.99,
                Currency: 'USD',
                DisplayAmount: '$29.99'
            }
        },
        Availability: {
            Message: 'In Stock',
            Type: 'IN_STOCK'
        }
    }]
};
```

#### Secure Configuration

```javascript
// Environment variables support (recommended)
require('dotenv').config();

defaultClient.accessKey = process.env.PA_API_ACCESS_KEY;
defaultClient.secretKey = process.env.PA_API_SECRET_KEY;
```

### Version Mapping

| Original Package | Enhanced Fork | Notes |
|-----------------|---------------|-------|
| paapi5-nodejs-sdk@1.0.x | @itsmaneka/paapi5-nodejs-sdk@1.2.0+ | Fully compatible + new features |
| paapi5-nodejs-sdk@0.x.x | @itsmaneka/paapi5-nodejs-sdk@1.2.0+ | Upgrade recommended |

### Testing Your Migration

After migration, test your integration:

```bash
# Test basic functionality
npm test

# Test specific samples
npm run sample:search
npm run sample:offersv2  # New OffersV2 functionality
```

### Support and Updates

- 📚 **Documentation**: [GitHub Repository](https://github.com/itsManeka/paapi5-nodejs-sdk)
- 🐛 **Issues**: [Report Issues](https://github.com/itsManeka/paapi5-nodejs-sdk/issues)
- 📦 **NPM**: [@itsmaneka/paapi5-nodejs-sdk](https://www.npmjs.com/package/@itsmaneka/paapi5-nodejs-sdk)
- 🔄 **Updates**: Automatic security and feature updates

### Quick Migration Checklist

- [ ] Uninstall old package: `npm uninstall paapi5-nodejs-sdk`
- [ ] Install enhanced version: `npm install @itsmaneka/paapi5-nodejs-sdk`
- [ ] Update require/import statements to use scoped package name
- [ ] Update package.json dependencies
- [ ] Test your application
- [ ] Consider using new OffersV2 features
- [ ] Update to environment variable configuration
- [ ] Update TypeScript types if applicable

### Need Help?

If you encounter any issues during migration:

1. Check the [README.md](../README.md) for examples
2. Review the [sample files](../sample*.js) for usage patterns
3. Open an issue on [GitHub](https://github.com/itsManeka/paapi5-nodejs-sdk/issues)

---

**🎉 Welcome to the enhanced, actively maintained Product Advertising API SDK!**