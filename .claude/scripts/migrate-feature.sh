#!/bin/bash

# ==============================================================================
# migrate-feature.sh
#
# Script para migrar una feature a Bulletproof React architecture
#
# Uso:
#   ./migrate-feature.sh [feature-name] [--dry-run]
#
# Ejemplo:
#   ./migrate-feature.sh animals
#   ./migrate-feature.sh animals --dry-run  # Preview sin ejecutar
#
# ==============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ==============================================================================
# Configuration
# ==============================================================================
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SRC_DIR="$PROJECT_ROOT/patitas-unidas.client/src"
FEATURES_DIR="$SRC_DIR/features"

# ==============================================================================
# Helper Functions
# ==============================================================================

print_header() {
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# ==============================================================================
# Validation Functions
# ==============================================================================

check_git_clean() {
    print_info "Checking git status..."
    if [[ -n $(git status --porcelain) ]]; then
        print_error "Git working directory is not clean"
        print_warning "Please commit or stash your changes before migrating"
        exit 1
    fi
    print_success "Git working directory is clean"
}

check_feature_exists() {
    local feature=$1
    case $feature in
        animals|foundations|donations|volunteers|home)
            print_success "Feature '$feature' is valid"
            ;;
        *)
            print_error "Unknown feature: $feature"
            echo "Valid features: animals, foundations, donations, volunteers, home"
            exit 1
            ;;
    esac
}

# ==============================================================================
# Feature-specific Configuration
# ==============================================================================

get_feature_config() {
    local feature=$1

    case $feature in
        animals)
            COMPONENTS=("AnimalCard" "AnimalDetailModal")
            ROUTES=("Adopta")
            SERVICES=("animalService")
            SERVICE_FILES=("animalService.ts")
            TYPES=("animal.ts")
            STYLES=("Adopta.css" "Animal-modal.css:AnimalModal.css")  # old:new format for renames
            ;;
        foundations)
            COMPONENTS=("FoundationCard" "ContactModal")
            ROUTES=("Foundations" "FoundationDetail")
            SERVICES=("foundationService")
            SERVICE_FILES=("foundationService.ts")
            TYPES=("foundation.ts")
            STYLES=("Foundations.css" "FoundationDetail.css" "ContactModal.css")
            ;;
        donations)
            COMPONENTS=("Maintenance")
            ROUTES=("Dona")
            SERVICES=()
            SERVICE_FILES=()
            TYPES=()
            STYLES=("Dona.css")
            ;;
        volunteers)
            COMPONENTS=()
            ROUTES=("Voluntario")
            SERVICES=("voluntarioService")
            SERVICE_FILES=("voluntarioService.ts")
            TYPES=()
            STYLES=("Voluntario.css")
            ;;
        home)
            COMPONENTS=()
            ROUTES=("Home")
            SERVICES=()
            SERVICE_FILES=()
            TYPES=()
            STYLES=("Home.css")
            ;;
    esac
}

# ==============================================================================
# Migration Functions
# ==============================================================================

create_feature_structure() {
    local feature=$1
    local feature_dir="$FEATURES_DIR/$feature"

    print_info "Creating directory structure for $feature..."

    local dirs=()
    [[ ${#COMPONENTS[@]} -gt 0 ]] && dirs+=("components")
    [[ ${#ROUTES[@]} -gt 0 ]] && dirs+=("routes")
    [[ ${#SERVICES[@]} -gt 0 ]] && dirs+=("api")
    [[ ${#TYPES[@]} -gt 0 ]] && dirs+=("types")
    [[ ${#STYLES[@]} -gt 0 ]] && dirs+=("styles")

    for dir in "${dirs[@]}"; do
        if [[ $DRY_RUN == true ]]; then
            print_info "[DRY RUN] Would create: $feature_dir/$dir"
        else
            mkdir -p "$feature_dir/$dir"
            print_success "Created: $feature_dir/$dir"
        fi
    done
}

create_barrel_export() {
    local feature=$1
    local feature_dir="$FEATURES_DIR/$feature"
    local index_file="$feature_dir/index.ts"

    print_info "Creating barrel export..."

    local content="// ============================================\n"
    content+="// Feature: $feature\n"
    content+="// Barrel Export - Public API\n"
    content+="// ============================================\n\n"

    if [[ ${#COMPONENTS[@]} -gt 0 ]]; then
        content+="// Components\n"
        for component in "${COMPONENTS[@]}"; do
            content+="export { default as $component } from './components/$component';\n"
        done
        content+="\n"
    fi

    if [[ ${#ROUTES[@]} -gt 0 ]]; then
        content+="// Routes\n"
        for route in "${ROUTES[@]}"; do
            content+="export { default as $route } from './routes/$route';\n"
        done
        content+="\n"
    fi

    if [[ ${#SERVICES[@]} -gt 0 ]]; then
        content+="// API / Services\n"
        for service in "${SERVICES[@]}"; do
            content+="export { $service } from './api/${feature}';\n"
        done
        content+="export * from './api/${feature}';\n"
        content+="\n"
    fi

    if [[ ${#TYPES[@]} -gt 0 ]]; then
        content+="// Types\n"
        for type_file in "${TYPES[@]}"; do
            local type_name="${type_file%.ts}"
            content+="export type * from './types/$type_name';\n"
        done
    fi

    if [[ $DRY_RUN == true ]]; then
        print_info "[DRY RUN] Would create: $index_file"
        echo -e "$content"
    else
        echo -e "$content" > "$index_file"
        print_success "Created: $index_file"
    fi
}

move_files() {
    local feature=$1
    local feature_dir="$FEATURES_DIR/$feature"

    print_header "Moving Files with git mv"

    # Move components
    if [[ ${#COMPONENTS[@]} -gt 0 ]]; then
        print_info "Moving components..."
        for component in "${COMPONENTS[@]}"; do
            local src="$SRC_DIR/components/${component}.tsx"
            local dest="$feature_dir/components/${component}.tsx"
            if [[ -f $src ]]; then
                if [[ $DRY_RUN == true ]]; then
                    print_info "[DRY RUN] Would execute: git mv $src $dest"
                else
                    git mv "$src" "$dest"
                    print_success "Moved: ${component}.tsx"
                fi
            else
                print_warning "File not found: $src"
            fi
        done
    fi

    # Move routes (pages)
    if [[ ${#ROUTES[@]} -gt 0 ]]; then
        print_info "Moving routes..."
        for route in "${ROUTES[@]}"; do
            local src="$SRC_DIR/pages/${route}.tsx"
            local dest="$feature_dir/routes/${route}.tsx"
            if [[ -f $src ]]; then
                if [[ $DRY_RUN == true ]]; then
                    print_info "[DRY RUN] Would execute: git mv $src $dest"
                else
                    git mv "$src" "$dest"
                    print_success "Moved: ${route}.tsx"
                fi
            else
                print_warning "File not found: $src"
            fi
        done
    fi

    # Move services (to api/)
    if [[ ${#SERVICE_FILES[@]} -gt 0 ]]; then
        print_info "Moving API services..."
        for service_file in "${SERVICE_FILES[@]}"; do
            local src="$SRC_DIR/services/$service_file"
            local dest="$feature_dir/api/${feature}.ts"  # Rename to feature name
            if [[ -f $src ]]; then
                if [[ $DRY_RUN == true ]]; then
                    print_info "[DRY RUN] Would execute: git mv $src $dest"
                else
                    git mv "$src" "$dest"
                    print_success "Moved: $service_file → api/${feature}.ts"
                fi
            else
                print_warning "File not found: $src"
            fi
        done
    fi

    # Move types
    if [[ ${#TYPES[@]} -gt 0 ]]; then
        print_info "Moving types..."
        for type_file in "${TYPES[@]}"; do
            local src="$SRC_DIR/types/$type_file"
            local dest="$feature_dir/types/$type_file"
            if [[ -f $src ]]; then
                if [[ $DRY_RUN == true ]]; then
                    print_info "[DRY RUN] Would execute: git mv $src $dest"
                else
                    git mv "$src" "$dest"
                    print_success "Moved: $type_file"
                fi
            else
                print_warning "File not found: $src"
            fi
        done
    fi

    # Move styles
    if [[ ${#STYLES[@]} -gt 0 ]]; then
        print_info "Moving styles..."
        for style in "${STYLES[@]}"; do
            # Check if it's a rename (old:new format)
            if [[ $style == *":"* ]]; then
                local old_name="${style%%:*}"
                local new_name="${style##*:}"
                local src="$SRC_DIR/styles/$old_name"
                local dest="$feature_dir/styles/$new_name"
            else
                local src="$SRC_DIR/styles/$style"
                local dest="$feature_dir/styles/$style"
            fi

            if [[ -f $src ]]; then
                if [[ $DRY_RUN == true ]]; then
                    print_info "[DRY RUN] Would execute: git mv $src $dest"
                else
                    git mv "$src" "$dest"
                    print_success "Moved: $(basename $src) → $(basename $dest)"
                fi
            else
                print_warning "File not found: $src"
            fi
        done
    fi
}

update_imports() {
    local feature=$1

    print_header "Import Updates Required"
    print_warning "⚠️  MANUAL STEP REQUIRED"
    print_info "You need to update imports in the following files:"
    echo ""

    echo "1. Update imports WITHIN the feature:"
    echo "   - In component files: use relative imports (../types/...)"
    echo "   - In route files: use relative imports (../components/..., ../api/...)"
    echo ""

    echo "2. Update imports in App.tsx:"
    echo "   - Change: import Adopta from '../src/pages/Adopta'"
    echo "   - To:     import { Adopta } from './features/$feature'"
    echo ""

    echo "3. Update imports in OTHER features that use this feature's types"
    echo "   - Example: Foundation type used in animals feature"
    echo ""

    print_info "See .claude/plans/frontend/MIGRATION_PLAN.md for detailed examples"
}

run_validation() {
    print_header "Validation"

    print_info "Running build to check for errors..."
    if [[ $DRY_RUN == true ]]; then
        print_info "[DRY RUN] Would execute: cd patitas-unidas.client && npm run build"
    else
        cd "$PROJECT_ROOT/patitas-unidas.client" || exit 1
        if npm run build; then
            print_success "Build succeeded!"
        else
            print_error "Build failed - please fix errors before committing"
            return 1
        fi
        cd "$PROJECT_ROOT" || exit 1
    fi
}

# ==============================================================================
# Main Script
# ==============================================================================

main() {
    # Parse arguments
    FEATURE_NAME=""
    DRY_RUN=false

    for arg in "$@"; do
        case $arg in
            --dry-run)
                DRY_RUN=true
                ;;
            *)
                FEATURE_NAME="$arg"
                ;;
        esac
    done

    # Validate arguments
    if [[ -z $FEATURE_NAME ]]; then
        print_error "Feature name is required"
        echo "Usage: $0 [feature-name] [--dry-run]"
        echo "Valid features: animals, foundations, donations, volunteers, home"
        exit 1
    fi

    # Print header
    print_header "Migrating Feature: $FEATURE_NAME"
    [[ $DRY_RUN == true ]] && print_warning "DRY RUN MODE - No changes will be made"

    # Validation
    check_feature_exists "$FEATURE_NAME"
    if [[ $DRY_RUN != true ]]; then
        check_git_clean
    fi

    # Load feature configuration
    get_feature_config "$FEATURE_NAME"

    # Execute migration steps
    create_feature_structure "$FEATURE_NAME"
    create_barrel_export "$FEATURE_NAME"
    move_files "$FEATURE_NAME"

    # Print next steps
    echo ""
    print_header "Migration Complete!"
    update_imports "$FEATURE_NAME"

    if [[ $DRY_RUN != true ]]; then
        echo ""
        print_info "Next steps:"
        echo "1. Update imports in all affected files"
        echo "2. Run: cd patitas-unidas.client && npm run build"
        echo "3. Test the feature manually"
        echo "4. Review changes: git status"
        echo "5. Commit: git add . && git commit -m \"refactor(frontend): migrate $FEATURE_NAME to Bulletproof architecture\""
        echo ""
        print_info "For detailed validation checklist, see:"
        echo "  .claude/checklists/feature-migration.md"
    fi
}

# Run main script
main "$@"
