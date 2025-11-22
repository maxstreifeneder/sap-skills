# Workspaces and Workpages Guide

Complete guide for creating and managing workspaces and workpages in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/btp-build-work-zone-advanced

---

## Workspaces Overview

A workspace is a collaborative environment designed to encourage users to share and communicate about specific subjects, projects, events, goals, or teams.

## Workspace Features

- Dedicated pages and feeds
- Member management
- Content sharing
- Task collaboration
- Business record integration

---

## Workspace Roles

| Role | Permissions |
|------|-------------|
| Owner | Full control, created automatically for workspace creator |
| Administrator | Manage members, settings, content |
| Member | Participate, create content, collaborate |
| Viewer | Read-only access |

---

## Navigation and Organization

### Workspaces Menu

Users can access:
- Recently viewed workspaces
- Favorite workspaces
- All available workspaces
- Managed workspaces (filter)

### Administrative Areas

Workspaces can be organized into administrative areas for:
- Organizational grouping
- Permission management
- Reporting and analytics

---

## Creating Workspaces

### From Scratch

1. Navigate to Workspaces menu
2. Select "Create Workspace"
3. Configure settings:
   - Name and description
   - Privacy settings
   - Member permissions
4. Create workspace

### From Template

1. Navigate to Workspaces menu
2. Select "Create Workspace"
3. Choose template
4. Customize as needed
5. Create workspace

---

## Workpages

### Overview

Workpages are pages within workspaces where users add content. They use a grid layout with sections containing up to six columns.

### Layout Structure

```
Workpage
├── Section 1
│   ├── Column 1 (widgets)
│   ├── Column 2 (widgets)
│   └── ...up to 6 columns
├── Section 2
│   └── ...
└── ...
```

### Creating Workpages

1. Navigate to workspace
2. Select "Add Page"
3. Choose template or blank layout
4. Configure sections and columns
5. Add widgets and content
6. Publish or save as draft

---

## Workpage Editor

### Capabilities

- Add apps, cards, and widgets
- Configure sections and columns
- Adjust widget settings
- Design styling options

### Publishing Options

| Option | Description |
|--------|-------------|
| Publish | Make visible to workspace members |
| Save as Draft | Save for later completion |

---

## Workspace Settings

### Privacy Settings

| Type | Description |
|------|-------------|
| Public | Visible to all users |
| Private | Visible to members only |
| Secret | Hidden from non-members |

### Member Management

- Add/remove members
- Assign roles
- Configure permissions
- Manage invitations

### Feature Enablement

Enable/disable workspace features:
- Feeds
- Content creation
- Forums
- Knowledge base
- Events

---

## Business Records Integration

If integrated with external business systems (e.g., SAP Cloud for Customer):

### Supported Record Types
- Accounts
- Opportunities
- Service tickets

### Capabilities
- Browse and search records
- Create dedicated workspaces for records
- Feature records in workspaces
- Post comments and create tasks
- Tag and like records

### Access Requirements
Users must have appropriate access rights in integrated external systems.

---

## Best Practices

### Workspace Design

1. **Clear purpose** - Define workspace goal
2. **Logical structure** - Organize workpages logically
3. **Appropriate permissions** - Limit access as needed
4. **Active moderation** - Maintain content quality

### Workpage Design

1. **Grid efficiency** - Use appropriate column counts
2. **Widget organization** - Group related content
3. **Mobile consideration** - Test on mobile devices
4. **Performance** - Limit widgets per page

---

**Documentation Links**:
- Workspaces: https://help.sap.com/docs/build-work-zone-advanced-edition
- GitHub: https://github.com/SAP-docs/btp-build-work-zone-advanced
