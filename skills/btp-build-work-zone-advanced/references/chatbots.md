# Chatbot Integration Guide

Complete guide for integrating and configuring chatbots in SAP Build Work Zone, advanced edition.

**Source**: https://github.com/SAP-docs/btp-build-work-zone-advanced/tree/main/docs/50-Chatbots

---

## Overview

Chatbots help users accomplish tasks through conversational interaction. They support custom training, actions, and card rendering within SAP Build Work Zone.

## Built-in Capabilities

Default chatbot features include:
- Workspace creation
- Leave request processing
- Business news delivery
- Content searching
- Entertainment (jokes, weather updates)

---

## Chatbot Types

### SAP Build Work Zone Chatbot (Recommended)

Pre-built chatbots with built-in functionalities:

| Variant | Features |
|---------|----------|
| Full-featured | All capabilities enabled |
| Workspace Creation | Workspace management only |
| Business News | News delivery only |
| Search | Content search only |
| Leave Requests | Leave management only |
| Smart Talk | Conversational features |

### Custom Chatbots

Build independent chatbots using SAP Conversational AI platform:
- URL: https://cai.tools.sap/
- Custom training and intents
- Organization-specific actions

---

## Implementation Process

### Step 1: Fork Chatbot Repository

Development begins by copying a base chatbot repository:
- Creates independent branch for customization
- Can fork entire bots or specific intents only

### Step 2: OAuth Registration

Authorize chatbot to access APIs:
1. Navigate to Administration Console
2. Go to External Integrations > OAuth Clients
3. Register client credentials
4. Configure required scopes

### Step 3: Alias Account Setup

Create system user account for chatbot:
1. Go to User Management > Alias Accounts
2. Create new alias account
3. Configure permissions
4. Link to chatbot

### Step 4: Configure Push Notifications

Set up event-triggered notifications:

| Category | Events |
|----------|--------|
| Alias Account | Account-related events |
| Content | Content creation/modification |
| Workspace | Workspace activities |
| Forum | Discussion events |

---

## SAP Conversational AI Integration

### Connector Setup

1. Access SAP Conversational AI platform
2. Use built-in "SAP Jam Collaboration" connector
3. Configure connection to SAP Build Work Zone

### Configuration Location

Administration Console > External Integrations > Chatbot Configuration

---

## Chatbot Launcher

### Enabling Chatbot

1. Configure chatbot in Administration Console
2. Enable Chatbot Launcher feature
3. Chatbot icon appears in bottom-right corner

### User Access

- Available on most pages (except Applications page)
- Multiple bots can be configured
- Users select preferred bot from list

### Interface Controls

| Control | Function |
|---------|----------|
| Switch | Change between configured bots |
| Fullscreen | Toggle fullscreen mode |
| Close | Close chatbot window |
| Send | Submit message (Ctrl+Enter / Cmd+Enter) |

---

## Advanced Capabilities

### Custom Actions

Configured chatbots can execute platform-specific actions:
- Create workspaces
- Post content
- Search and retrieve information
- Manage tasks

### Card Rendering

Chatbots can render customized cards for enhanced user experiences:
- Display structured data
- Interactive card elements
- Action buttons

---

## Fallback Handling

When chatbot cannot understand a request:
- Returns fallback message
- Indicates incomprehension
- Suggests alternative phrasing

---

**Documentation Links**:
- Chatbots: https://help.sap.com/docs/build-work-zone-advanced-edition
- SAP Conversational AI: https://cai.tools.sap/
- GitHub: https://github.com/SAP-docs/btp-build-work-zone-advanced/tree/main/docs/50-Chatbots
