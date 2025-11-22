# Widgets Development Guide

Complete guide for using and configuring widgets in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/btp-build-work-zone-advanced

---

## Overview

Widgets are containers for various content types such as video, feeds, photos, and many other content types. They are added to workpages using the workpage editor.

## Widget Management

### Adding Widgets

1. Open workpage in edit mode
2. Select widget type from palette
3. Configure widget content
4. Adjust style and layout settings
5. Save changes

### Widget Operations

- Insert widgets
- Remove widgets
- Edit widget content
- Reposition widgets

---

## Available Widget Types (24 Total)

### Content Display Widgets

| Widget | Description |
|--------|-------------|
| Image | Display single image |
| Text | Rich text content |
| Multimedia | Video and audio content |
| Slideshow | Image carousel |
| Poll | User voting/surveys |
| Feed | Activity feeds |
| Content | Document/file display |
| Forum | Discussion threads |
| Knowledge Base | Knowledge articles |

### Navigation & Discovery Widgets

| Widget | Description |
|--------|-------------|
| Search | Search functionality |
| People | User directory |
| Workspaces | Workspace listings |
| Action | Quick actions |
| Recommendation | Suggested content |
| Recent Items | Recently accessed items |
| Tag Cloud | Popular tags display |

### User Information Widgets

| Widget | Description |
|--------|-------------|
| Name | Display logged-in user's avatar/name |

### Data & Business Widgets

| Widget | Description |
|--------|-------------|
| Business Record | External business data |
| Event | Calendar events |
| Notification | System notifications |

### Interactive Elements

| Widget | Description |
|--------|-------------|
| Rotating Banner | Animated banner display |
| Tool Content | Embedded tools |
| External Content | Third-party content |
| Application Group | App collections |

---

## Widget Styling

### Style Options

| Option | Description |
|--------|-------------|
| Follow page setting | Inherit page styling |
| Card style | Colors, borders, rounded corners |
| Without card styling | Transparent background |
| Custom color | Text widget specific |

### Image Widget Sizes

Recommended widths for optimal quality:

| Columns | Recommended Width |
|---------|------------------|
| 1 | 188 pixels |
| 2 | 396 pixels |
| 3 | 604 pixels |
| 4 | 812 pixels |
| 5 | 1020 pixels |
| 6 | 1180 pixels |

---

## Widget Limitations

### Feed Widget
- Only ONE feed widget per workpage
- Additional feeds require separate workpages

### Performance Considerations
- Limit total widgets per page
- Consider mobile performance
- Optimize image sizes

---

## Widget Configuration

### Common Settings

All widgets share common configuration options:
- Title/header
- Visibility settings
- Size/dimensions
- Border/spacing

### Widget-Specific Settings

Each widget type has unique configuration:

**Image Widget**:
- Image source
- Alt text
- Link destination
- Size constraints

**Text Widget**:
- Rich text formatting
- Background color
- Text alignment
- Link embedding

**Feed Widget**:
- Feed source
- Display count
- Refresh interval
- Filter options

---

## Custom Widgets

### Widget Builder

Administrators can create custom HTML widgets:

1. Navigate to Administration Console
2. Go to UI Integration > Widget Builders
3. Create new widget definition
4. Configure HTML/CSS/JS
5. Deploy widget

### Custom Widget Use Cases

- Embed external dashboards
- Custom data visualizations
- Third-party integrations
- Branded content displays

---

## Best Practices

### Widget Selection

1. **Match content to widget** - Use appropriate widget for content type
2. **Consider audience** - Select widgets users need
3. **Balance density** - Don't overcrowd pages
4. **Test responsiveness** - Verify mobile display

### Widget Organization

1. **Logical grouping** - Related widgets together
2. **Visual hierarchy** - Important content prominent
3. **Consistent styling** - Maintain design consistency
4. **Accessibility** - Consider all users

---

**Documentation Links**:
- Widgets: https://help.sap.com/docs/build-work-zone-advanced-edition
- GitHub: https://github.com/SAP-docs/btp-build-work-zone-advanced
