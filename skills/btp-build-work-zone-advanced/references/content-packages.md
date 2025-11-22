# Content Packages Development Guide

Complete guide for creating, managing, and deploying content packages in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/btp-build-work-zone-advanced

---

## Overview

Content packages are collections of content artifacts bundled in a ZIP file for distribution and installation. They enable packaging and deploying UI Integration Cards, workspace templates, workflows, home pages, and workspaces.

## Package Types

### Global Content Packages

Pre-built packages available to all SAP Build Work Zone customers:

- Available without manual upload
- Require administrator installation
- Cannot be customized or downloaded
- Sourced from SAP or third-party providers

**Examples**:
- Employee Onboarding
- HR Content from SuccessFactors
- Insights: Change Management

### Local Content Packages

Customer-developed packages:

- Developed internally
- Require manual upload
- Can be downloaded and customized
- Require administrator installation

---

## Supported Content Items

Content packages can include:

| Item Type | Description |
|-----------|-------------|
| UI Integration Cards | SAPUI5 cards for data display |
| Workflows | Business process automation |
| Workspace Templates | Reusable workspace blueprints |
| Home Pages | Pre-configured landing pages |
| Workspaces | Complete workspace exports |

---

## Creating a Content Package

### Prerequisites

- SAP Business Application Studio subscription
- Dev space with "Development Tools for SAP Build Work Zone, Advanced Edition" extension
- Destination to content repository configured
- Workzone_Admin role collection

### Step 1: Create Project

1. Open SAP Business Application Studio
2. Select "New Project From Template"
3. Choose "Content Package"
4. Configure project settings

### Step 2: Add Content Items

Add artifacts to the package:
- UI Integration Cards
- Workspace templates
- Other supported content

### Step 3: Configure Package Manifest

The package manifest defines metadata and contents:

```json
{
  "sap.package": {
    "id": "com.company.mypackage",
    "version": "1.0.0",
    "title": "My Content Package",
    "description": "Package description"
  },
  "contents": [
    {
      "type": "card",
      "id": "namespace.cardname"
    }
  ]
}
```

### Step 4: Deploy Package

1. Right-click project in explorer
2. Select "Deploy to SAP Build Work Zone"
3. Verify in Administration Console

---

## Package Management

### Administration Console

Location: **UI Integration > Content Packages**

### Package Statuses

| Status | Description |
|--------|-------------|
| Ready to Install | Package uploaded, not installed |
| Installed | Package active in system |
| Upgrade Available | Newer version available |

### Management Features

- Search packages by name
- Filter by provider source
- Filter by installation status
- View package contents
- Install/uninstall packages

---

## Updating Content Packages

### Version Management

1. Increment version in manifest
2. Update content items as needed
3. Redeploy package
4. Install upgrade in Administration Console

### Best Practices

- Use semantic versioning (major.minor.patch)
- Document changes in package description
- Test in development before production deployment
- Maintain backward compatibility when possible

---

## Project Templates

SAP provides project templates on GitHub for sample implementations:

- Basic content package structure
- Multi-card packages
- Workspace template packages

---

**Documentation Links**:
- Content Packages: https://help.sap.com/docs/build-work-zone-advanced-edition
- GitHub Templates: https://github.com/SAP-docs/btp-build-work-zone-advanced/tree/main/docs/30-ContentPackages
