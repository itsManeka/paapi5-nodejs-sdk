#!/bin/bash

# Release Helper Script for @itsmaneka/paapi5-nodejs-sdk
# This script helps prepare releases by updating version, running tests, and creating releases

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  @itsmaneka/paapi5-nodejs-sdk Release${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
check_directory() {
    if [ ! -f "package.json" ] || [ ! -d "src" ]; then
        print_error "This script must be run from the root of the paapi5-nodejs-sdk repository"
        exit 1
    fi
}

# Get current version from package.json
get_current_version() {
    node -p "require('./package.json').version"
}

# Validate version format
validate_version() {
    if [[ ! $1 =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        print_error "Invalid version format. Use semantic versioning (e.g., 1.2.3)"
        exit 1
    fi
}

# Check if version already exists as a git tag
check_version_exists() {
    if git rev-parse "v$1" >/dev/null 2>&1; then
        print_error "Version v$1 already exists as a git tag"
        exit 1
    fi
}

# Run tests
run_tests() {
    print_info "Running tests..."
    
    # Test package loading
    node -e "
        console.log('Testing SDK loading...');
        const sdk = require('./src/index.js');
        if (!sdk.ApiClient || !sdk.DefaultApi) {
            throw new Error('Basic SDK components not available');
        }
        if (!sdk.OffersV2 || !sdk.Money || !sdk.DealDetails) {
            throw new Error('OffersV2 components not available');
        }
        console.log('SDK tests passed');
    "
    
    # Test TypeScript definitions if available
    if command -v tsc >/dev/null 2>&1; then
        print_info "Testing TypeScript definitions..."
        cat > temp-test.ts << 'EOF'
import * as PAAPI from './index';
const request: PAAPI.SearchItemsRequest = {
    PartnerTag: 'test',
    PartnerType: 'Associates',
    Keywords: 'test'
};
EOF
        tsc temp-test.ts --noEmit --skipLibCheck
        rm temp-test.ts
        print_success "TypeScript definitions valid"
    fi
    
    # Security check
    print_info "Running security checks..."
    if npm audit --audit-level high; then
        print_success "No high-level security vulnerabilities found"
    else
        print_warning "Security vulnerabilities detected. Consider running 'npm audit fix'"
    fi
}

# Show help
show_help() {
    echo "Usage: $0 [OPTIONS] [VERSION_TYPE|VERSION]"
    echo ""
    echo "Version types:"
    echo "  patch    - Increment patch version (1.0.0 -> 1.0.1)"
    echo "  minor    - Increment minor version (1.0.0 -> 1.1.0)"
    echo "  major    - Increment major version (1.0.0 -> 2.0.0)"
    echo ""
    echo "Or specify exact version: $0 1.2.3"
    echo ""
    echo "Options:"
    echo "  --dry-run    Show what would be done without making changes"
    echo "  --help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 patch             # Increment patch version"
    echo "  $0 minor             # Increment minor version"
    echo "  $0 1.3.0             # Set specific version"
    echo "  $0 --dry-run patch   # Show what patch increment would do"
}

# Main script
main() {
    print_header
    
    # Parse arguments
    DRY_RUN=false
    VERSION_TYPE=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            --help)
                show_help
                exit 0
                ;;
            patch|minor|major)
                VERSION_TYPE=$1
                shift
                ;;
            [0-9]*.[0-9]*.[0-9]*)
                NEW_VERSION=$1
                shift
                ;;
            *)
                print_error "Unknown argument: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Check if arguments provided
    if [ -z "$VERSION_TYPE" ] && [ -z "$NEW_VERSION" ]; then
        print_error "Please specify version type (patch/minor/major) or exact version"
        show_help
        exit 1
    fi
    
    check_directory
    
    # Get current version
    CURRENT_VERSION=$(get_current_version)
    print_info "Current version: $CURRENT_VERSION"
    
    # Calculate new version
    if [ -n "$VERSION_TYPE" ]; then
        if [ "$DRY_RUN" = true ]; then
            NEW_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version --dry-run | sed 's/^v//')
        else
            # Get what the new version would be
            TEMP_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version --dry-run | sed 's/^v//')
            NEW_VERSION=$TEMP_VERSION
        fi
    fi
    
    validate_version "$NEW_VERSION"
    check_version_exists "$NEW_VERSION"
    
    print_info "New version will be: $NEW_VERSION"
    
    if [ "$DRY_RUN" = true ]; then
        print_warning "DRY RUN MODE - No changes will be made"
        echo ""
        echo "Would perform the following actions:"
        echo "1. Update package.json version to $NEW_VERSION"
        echo "2. Run comprehensive tests"
        echo "3. Create git commit with version update"
        echo "4. Create git tag v$NEW_VERSION"
        echo "5. Push changes and tag to remote"
        echo ""
        print_info "Remove --dry-run flag to execute these changes"
        exit 0
    fi
    
    # Confirm with user
    echo ""
    read -p "Continue with release $NEW_VERSION? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Release cancelled"
        exit 0
    fi
    
    # Run tests before making changes
    run_tests
    
    # Update version
    print_info "Updating version in package.json..."
    if [ -n "$VERSION_TYPE" ]; then
        npm version $VERSION_TYPE --no-git-tag-version
    else
        npm version $NEW_VERSION --no-git-tag-version
    fi
    
    # Verify version was updated
    UPDATED_VERSION=$(get_current_version)
    if [ "$UPDATED_VERSION" != "$NEW_VERSION" ]; then
        print_error "Version update failed. Expected $NEW_VERSION, got $UPDATED_VERSION"
        exit 1
    fi
    
    print_success "Version updated to $NEW_VERSION"
    
    # Create git commit
    print_info "Creating git commit..."
    git add package.json package-lock.json 2>/dev/null || git add package.json
    git commit -m "Release version $NEW_VERSION

- Updated package version to $NEW_VERSION
- All tests passing
- Ready for automated NPM publication"
    
    # Create git tag
    print_info "Creating git tag..."
    git tag -a "v$NEW_VERSION" -m "Release version $NEW_VERSION

Features and improvements in this release:
- Enhanced OffersV2 support
- Improved TypeScript definitions
- Security improvements
- Bug fixes and optimizations

See CHANGELOG.md for detailed changes."
    
    print_success "Git tag v$NEW_VERSION created"
    
    # Push to remote
    print_info "Pushing changes to remote..."
    git push origin master
    git push origin "v$NEW_VERSION"
    
    print_success "Changes pushed to remote repository"
    
    echo ""
    print_header
    print_success "Release $NEW_VERSION completed successfully! 🎉"
    echo ""
    print_info "Next steps:"
    echo "1. GitHub Actions will automatically run tests"
    echo "2. If tests pass, package will be published to NPM"
    echo "3. GitHub release will be created automatically"
    echo "4. Monitor the Actions tab for progress"
    echo ""
    print_info "NPM package will be available at:"
    echo "https://www.npmjs.com/package/@itsmaneka/paapi5-nodejs-sdk"
}

# Run main function
main "$@"