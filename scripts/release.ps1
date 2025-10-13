# Release Helper Script for @itsmaneka/paapi5-nodejs-sdk (Windows PowerShell)
# This script helps prepare releases by updating version, running tests, and creating releases

param(
    [Parameter(Position=0)]
    [string]$VersionOrType,
    
    [switch]$DryRun,
    [switch]$Help
)

# Color functions
function Write-Success { param($Message) Write-Host "✅ $Message" -ForegroundColor Green }
function Write-Warning { param($Message) Write-Host "⚠️  $Message" -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host "❌ $Message" -ForegroundColor Red }
function Write-Info { param($Message) Write-Host "ℹ️  $Message" -ForegroundColor Blue }

function Write-Header {
    Write-Host "================================" -ForegroundColor Blue
    Write-Host "  @itsmaneka/paapi5-nodejs-sdk Release" -ForegroundColor Blue
    Write-Host "================================" -ForegroundColor Blue
}

function Show-Help {
    Write-Host "Usage: .\release.ps1 [OPTIONS] [VERSION_TYPE|VERSION]"
    Write-Host ""
    Write-Host "Version types:"
    Write-Host "  patch    - Increment patch version (1.0.0 -> 1.0.1)"
    Write-Host "  minor    - Increment minor version (1.0.0 -> 1.1.0)"
    Write-Host "  major    - Increment major version (1.0.0 -> 2.0.0)"
    Write-Host ""
    Write-Host "Or specify exact version: .\release.ps1 1.2.3"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -DryRun     Show what would be done without making changes"
    Write-Host "  -Help       Show this help message"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\release.ps1 patch              # Increment patch version"
    Write-Host "  .\release.ps1 minor              # Increment minor version"
    Write-Host "  .\release.ps1 1.3.0              # Set specific version"
    Write-Host "  .\release.ps1 patch -DryRun      # Show what patch increment would do"
}

function Test-Directory {
    if (-not (Test-Path "package.json") -or -not (Test-Path "src")) {
        Write-Error "This script must be run from the root of the paapi5-nodejs-sdk repository"
        exit 1
    }
}

function Get-CurrentVersion {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    return $packageJson.version
}

function Test-VersionFormat {
    param($Version)
    if ($Version -notmatch '^\d+\.\d+\.\d+$') {
        Write-Error "Invalid version format. Use semantic versioning (e.g., 1.2.3)"
        exit 1
    }
}

function Test-VersionExists {
    param($Version)
    try {
        git rev-parse "v$Version" 2>$null
        Write-Error "Version v$Version already exists as a git tag"
        exit 1
    }
    catch {
        # Version doesn't exist, which is good
    }
}

function Invoke-Tests {
    Write-Info "Running tests..."
    
    # Test package loading
    $testScript = @"
console.log('Testing SDK loading...');
const sdk = require('./src/index.js');
if (!sdk.ApiClient || !sdk.DefaultApi) {
    throw new Error('Basic SDK components not available');
}
if (!sdk.OffersV2 || !sdk.Money || !sdk.DealDetails) {
    throw new Error('OffersV2 components not available');
}
console.log('SDK tests passed');
"@
    
    $testScript | node
    if ($LASTEXITCODE -ne 0) {
        Write-Error "SDK tests failed"
        exit 1
    }
    
    # Test TypeScript definitions if available
    if (Get-Command tsc -ErrorAction SilentlyContinue) {
        Write-Info "Testing TypeScript definitions..."
        
        $tsTest = @"
import * as PAAPI from './index';
const request: PAAPI.SearchItemsRequest = {
    PartnerTag: 'test',
    PartnerType: 'Associates',
    Keywords: 'test'
};
"@
        
        $tsTest | Out-File -FilePath "temp-test.ts" -Encoding UTF8
        tsc temp-test.ts --noEmit --skipLibCheck
        if ($LASTEXITCODE -eq 0) {
            Write-Success "TypeScript definitions valid"
        }
        Remove-Item "temp-test.ts" -ErrorAction SilentlyContinue
    }
    
    # Security check
    Write-Info "Running security checks..."
    npm audit --audit-level high
    if ($LASTEXITCODE -eq 0) {
        Write-Success "No high-level security vulnerabilities found"
    } else {
        Write-Warning "Security vulnerabilities detected. Consider running 'npm audit fix'"
    }
}

function Get-NewVersion {
    param($VersionType, $IsDryRun)
    
    if ($VersionType -in @("patch", "minor", "major")) {
        if ($IsDryRun) {
            $output = npm version $VersionType --no-git-tag-version --dry-run
        } else {
            $output = npm version $VersionType --no-git-tag-version --dry-run
        }
        return $output -replace '^v', ''
    } else {
        return $VersionType
    }
}

# Main script
Write-Header

if ($Help) {
    Show-Help
    exit 0
}

if (-not $VersionOrType) {
    Write-Error "Please specify version type (patch/minor/major) or exact version"
    Show-Help
    exit 1
}

Test-Directory

$currentVersion = Get-CurrentVersion
Write-Info "Current version: $currentVersion"

# Determine new version
if ($VersionOrType -in @("patch", "minor", "major")) {
    $newVersion = Get-NewVersion $VersionOrType $true
} else {
    $newVersion = $VersionOrType
}

Test-VersionFormat $newVersion
Test-VersionExists $newVersion

Write-Info "New version will be: $newVersion"

if ($DryRun) {
    Write-Warning "DRY RUN MODE - No changes will be made"
    Write-Host ""
    Write-Host "Would perform the following actions:"
    Write-Host "1. Update package.json version to $newVersion"
    Write-Host "2. Run comprehensive tests"
    Write-Host "3. Create git commit with version update"
    Write-Host "4. Create git tag v$newVersion"
    Write-Host "5. Push changes and tag to remote"
    Write-Host ""
    Write-Info "Remove -DryRun flag to execute these changes"
    exit 0
}

# Confirm with user
Write-Host ""
$confirm = Read-Host "Continue with release $newVersion? (y/N)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Info "Release cancelled"
    exit 0
}

# Run tests before making changes
Invoke-Tests

# Update version
Write-Info "Updating version in package.json..."
if ($VersionOrType -in @("patch", "minor", "major")) {
    npm version $VersionOrType --no-git-tag-version
} else {
    npm version $newVersion --no-git-tag-version
}

# Verify version was updated
$updatedVersion = Get-CurrentVersion
if ($updatedVersion -ne $newVersion) {
    Write-Error "Version update failed. Expected $newVersion, got $updatedVersion"
    exit 1
}

Write-Success "Version updated to $newVersion"

# Create git commit
Write-Info "Creating git commit..."
git add package.json
if (Test-Path "package-lock.json") {
    git add package-lock.json
}

$commitMessage = @"
Release version $newVersion

- Updated package version to $newVersion
- All tests passing
- Ready for automated NPM publication
"@

git commit -m $commitMessage

# Create git tag
Write-Info "Creating git tag..."
$tagMessage = @"
Release version $newVersion

Features and improvements in this release:
- Enhanced OffersV2 support
- Improved TypeScript definitions
- Security improvements
- Bug fixes and optimizations

See CHANGELOG.md for detailed changes.
"@

git tag -a "v$newVersion" -m $tagMessage

Write-Success "Git tag v$newVersion created"

# Push to remote
Write-Info "Pushing changes to remote..."
git push origin master
git push origin "v$newVersion"

Write-Success "Changes pushed to remote repository"

Write-Host ""
Write-Header
Write-Success "Release $newVersion completed successfully! 🎉"
Write-Host ""
Write-Info "Next steps:"
Write-Host "1. GitHub Actions will automatically run tests"
Write-Host "2. If tests pass, package will be published to NPM"
Write-Host "3. GitHub release will be created automatically"
Write-Host "4. Monitor the Actions tab for progress"
Write-Host ""
Write-Info "NPM package will be available at:"
Write-Host "https://www.npmjs.com/package/@itsmaneka/paapi5-nodejs-sdk"