# Page Editor Reference

Detailed configuration reference for the SAP Fiori tools Page Editor.

## Table of Contents

1. [List Report Page](#list-report-page)
2. [Object Page](#object-page)
3. [Extension-Based Elements](#extension-based-elements)
4. [Building Blocks](#building-blocks)
5. [Quick Actions](#quick-actions)

---

## List Report Page

### Filter Fields

Configure filter bar elements for data discovery:

**Properties**:
- Filter field type (single value, range, multi-value)
- Value help configuration
- Default values
- Visibility settings

**Configuration Path**: Page Editor > Filter Bar > Add Filter Field

### Table Configuration

**Supported Table Types**:
- Responsive Table
- Grid Table
- Analytical Table
- Tree Table (for hierarchical data)

**Column Types**:

| Column Type | Description |
|-------------|-------------|
| Basic Column | Standard data display |
| Chart Column | Inline chart visualization |
| Contact Column | Contact card integration |
| Progress Column | Progress indicator |
| Rating Column | Star rating display |

**Table Actions**:
- Inline actions (row-level)
- Table toolbar actions
- Navigation actions
- Custom actions (OData V4)

### Multiple Views

Create tabbed views with different table configurations:

**Configuration**:
1. Select Table node in Page Editor
2. Add View via context menu
3. Configure view-specific filters and columns
4. Set default view

### Analytical Chart

Add data visualizations to List Report:

**Chart Types**: Bar, Line, Column, Pie, Donut, Scatter, Bubble

**Configuration**:
- Dimensions (categories)
- Measures (values)
- Chart type selection
- Color configuration

---

## Object Page

### Header Configuration

**Header Facets**:
- Data Point - Single value display
- Progress Indicator - Progress visualization
- Rating Indicator - Star ratings
- Contact - Contact information card
- Address - Address display
- Micro Chart - Compact charts

**Header Actions**:
- Standard actions (Edit, Delete, Copy)
- Custom actions with handlers

### Section Types

#### Form Section

Display and edit entity properties in form layout:

**Field Types**:
- Basic Fields - Text, number, date inputs
- Connected Fields - Related data display
- Contact Fields - Contact information
- Smart Fields - Auto-configured based on metadata

**Layout Options**:
- Column count (1-4)
- Field grouping
- Responsive behavior

#### Table Section

Embed tables within Object Page:

**Configuration**:
- Entity association selection
- Column configuration
- Inline editing support
- Navigation to detail pages

#### Identification Section

Display key identifying information prominently.

#### Chart Section

Embed charts within Object Page for data visualization.

#### Group Section

Group related content logically with collapsible containers.

### Footer Configuration

Configure page-level actions in footer bar:

- Save/Cancel for edit mode
- Custom actions
- Determining actions (primary action highlighting)

---

## Extension-Based Elements

### Custom Columns (OData V4)

Add custom columns with XML fragments:

**Configuration Steps**:
1. Select Table in Page Editor
2. Add > Custom Column
3. Provide: Header text, Fragment name, Anchor column, Placement
4. Optional: Generate event handler

**Generated Files**:
- Fragment: `webapp/ext/fragments/<name>.fragment.xml`
- Controller (optional): `webapp/ext/<name>.controller.js`

**Fragment Template**:
```xml
<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m">
    <Text text="{PropertyPath}" id="customColumn"/>
</core:FragmentDefinition>
```

### Custom Sections (OData V4)

Add custom sections to Object Page:

**Configuration**:
- Section title
- View type: Fragment (V4) or View (V2)
- Fragment/View name
- Anchor section and placement
- Generate event handler option

**Fragment Location**: `webapp/ext/fragments/`

### Custom Actions (OData V4 1.96+)

Add action buttons with custom handlers:

**Configuration**:
- Action ID (unique identifier)
- Button Text
- Anchor and Placement
- Action Handler File
- Handler Method name
- Requires Selection toggle (for table actions)

**Handler Template**:
```javascript
sap.ui.define([], function() {
    "use strict";
    return {
        onCustomAction: function(oEvent) {
            // Custom action logic
        }
    };
});
```

### Custom Views (OData V4 1.96.29+)

Add custom tab views to List Report:

**Configuration**:
- View Key (unique)
- Label text
- Fragment selection
- Event handler generation

### Controller Extensions

Extend page controller lifecycle and methods:

**Lifecycle Methods**:
- `onInit` - Component initialization
- `onBeforeRendering` - Before UI rendering
- `onAfterRendering` - After UI rendering
- `onExit` - Component destruction

**Override Pattern**:
```javascript
sap.ui.define(["sap/ui/core/mvc/ControllerExtension"], function(ControllerExtension) {
    return ControllerExtension.extend("customer.extension.MyExtension", {
        override: {
            onInit: function() {
                // Extension logic
            }
        },
        // Custom methods outside override
        myCustomMethod: function() {
            // Custom logic
        }
    });
});
```

**File Locations**:
- Extension: `webapp/changes/coding/<name>.js`
- Change descriptor: `webapp/changes/<name>.controllerExtension.change`

---

## Building Blocks

Reusable UI components for OData V4 custom pages and sections.

### Chart Building Block

Embed charts in custom UI:

```xml
<macros:Chart
    id="chartBlock"
    metaPath="@com.sap.vocabularies.UI.v1.Chart"
    contextPath="/EntitySet"/>
```

### Filter Bar Building Block

Add filter capabilities:

```xml
<macros:FilterBar
    id="filterBar"
    metaPath="@com.sap.vocabularies.UI.v1.SelectionFields"
    liveMode="true"/>
```

### Table Building Block

Display tabular data:

```xml
<macros:Table
    id="tableBlock"
    metaPath="@com.sap.vocabularies.UI.v1.LineItem"
    readOnly="true"/>
```

### Page Building Block

Container for custom pages:

```xml
<macros:Page id="customPage">
    <!-- Page content -->
</macros:Page>
```

### Rich Text Editor Building Block

Content editing in custom sections:

```xml
<macros:RichTextEditor
    id="richTextEditor"
    value="{Description}"/>
```

---

## Quick Actions

Page Editor provides quick action shortcuts for common operations:

| Quick Action | Description | Availability |
|--------------|-------------|--------------|
| Add Custom Page Action | Add action to page header | Object Page |
| Add Custom Table Action | Add action to table toolbar | List Report, Object Page |
| Add Custom Table Column | Add custom column | List Report, Object Page |
| Add Header Field | Add field to header | Object Page |
| Add Custom Section | Add custom section | Object Page |

### Accessing Quick Actions

1. Right-click element in Page Editor outline
2. Select from context menu
3. Configure in dialog

---

## Configuration Files

### Manifest.json Updates

Page Editor modifications update `manifest.json`:

```json
{
  "sap.ui5": {
    "routing": {
      "targets": {
        "ListReport": {
          "options": {
            "settings": {
              "content": {
                "header": {},
                "body": {}
              }
            }
          }
        }
      }
    }
  }
}
```

### UI Flexibility Changes

Custom extensions generate flexibility changes in `webapp/changes/`:

- `addXML.change` - Fragment additions
- `controllerExtension.change` - Controller extensions
- `propertyChange.change` - Property modifications

---

## Documentation Source

**GitHub**: https://github.com/SAP-docs/btp-fiori-tools/tree/main/docs/Developing-an-Application

Key files:
- `list-report-page-493f2aa.md`
- `form-and-object-page-1eb11a6.md`
- `maintaining-extension-based-elements-02172d2.md`
- `maintaining-building-blocks-6d3ad83.md`
- `supported-elements-in-page-editor-47f0424.md`
