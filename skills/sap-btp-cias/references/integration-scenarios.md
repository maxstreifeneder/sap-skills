# SAP BTP CIAS Integration Scenarios

Complete list of supported integration scenarios in Cloud Integration Automation Service.

**Source**: https://github.com/SAP-docs/btp-cloud-integration-automation-service/tree/main/docs

---

## Overview

Cloud Integration Automation Service delivers guided workflows to integrate SAP cloud solutions with on-premise and other SAP cloud solutions. The service supports both manual task instructions and automated technical configuration.

---

## SAP BTP Services

### Asset and Performance Management
- **SAP Business Network Asset Collaboration Setup**
- **SAP Asset Performance Management**

### Financial Services
- **SAP Group Reporting Data Collection**

---

## SAP BTP ABAP Environment

### Code Migration
- **Custom Code Migration App configuration**
  - Configure Custom Code Migration app for ABAP environment

### S/4HANA Integration
- **ABAP Environment and S/4HANA Cloud integration**
  - Connect ABAP environment to S/4HANA Cloud

> **Note**: ABAP automation scenarios require OAuth2 service plan subscription.

---

## Intelligent Enterprise Scenarios

### Design to Operate

**Subcontracting**:
- Design to Operate (Subcontracting) integration workflows

### Lead to Cash

**Commerce Integration**:
- SAP Commerce integration scenarios

**Marketing Integration**:
- SAP Marketing Cloud integration

**Customer Data Cloud**:
- SAP Customer Data Cloud integration scenarios

### Recruit to Retire

**Payroll**:
- SAP Payroll integration

**Workforce Management**:
- SAP Workforce solutions

**Travel**:
- SAP Concur Travel integration

**External Workforce**:
- External workforce management integration

### Source to Pay

**Contracts**:
- Contract management integration

**Buying**:
- Procurement and buying workflows

**Sourcing**:
- Strategic sourcing integration

**Supplier Collaboration**:
- SAP Business Network supplier collaboration

---

## Communication Management

### Migration Scenarios
- **Communication Management Migration (2SL to 3SL)**
  - Migrate from 2-system landscape to 3-system landscape

---

## SAP Cloud Connector

### Configuration Scenarios
- **SAP Cloud Connector configuration**
  - Configure Cloud Connector for hybrid connectivity
  - Set up secure tunnels between on-premise and cloud

---

## SAP Integrated Business Planning (IBP)

### Real-Time Integration (RTI)
- **RTI connectivity setup** (Added 2023-11-10)
  - Enable real-time integration for IBP
  - Master data integration from SAP S/4HANA
  - Transactional data integration from SAP ERP
  - Eliminates need for batch jobs

---

## SAP Build

### Provisioning
- **SAP Build provisioning**
  - Set up SAP Build environment

### Work Zone Integration
- **SAP Build Work Zone integration**
  - Integrate SAP Build with Work Zone

---

## S/4HANA Cloud

### S/4HANA Cloud Public Edition
- **100+ integration scenarios** covering:
  - Finance integration
  - Supply chain integration
  - Manufacturing integration
  - Sales integration
  - Procurement integration
  - Asset management integration
  - Project management integration

### S/4HANA Cloud Private Edition
- **Private Edition specific scenarios**
  - Custom integration workflows
  - Hybrid deployment configurations

---

## S/4HANA On-Premise

### On-Premise Integration
- **50+ integration scenarios** including:
  - ERP to cloud integration
  - Hybrid deployment scenarios
  - Legacy system migration
  - Data synchronization workflows

---

## SAP SuccessFactors

### Employee Central Integration
- **SuccessFactors Employee Central integration**
  - HR data synchronization
  - Employee master data integration
  - Organizational structure integration

---

## Two-Tier Accelerator

### Multi-Tier Deployment
- **Two-Tier Accelerator setup**
  - Configure two-tier ERP deployment
  - Central and local system integration

---

## Business Transformation Center

### Setup Scenarios
- **Business Transformation Center setup**
  - Configure transformation workflows
  - Migration planning and execution

---

## Scenario Planning Process

### Using Cloud Integration Automation Service UI

1. **Access the service**
   - Navigate to Instances and Subscription tab in SAP BTP subaccount
   - Click application icon to launch

2. **Open Plan for Integration**
   - Select the "Plan for Integration" tile

3. **Browse Solutions**
   - View available solutions in Solutions tab
   - Use search box to filter options

4. **Select Scenario**
   - Choose appropriate scenario
   - Select scenario option from available choices

5. **Designate Systems**
   - Systems listed by customer number from global account
   - Manual entry available if systems not visible

6. **Configure Workflow**
   - Confirm cross-landscape integration if applicable
   - Designate target subaccount
   - Specify SAP BTP Workflow Users
   - Name the transaction

7. **Generate Workflow**
   - Workflow appears in My Inbox tile

### Using Maintenance Planner

**Prerequisites**:
- S-User assigned to customer ID for maintenance planner access

**Steps**:
1. Access: https://maintenanceplanner.cfapps.eu10.hana.ondemand.com
2. Select "Plan for Cloud Integration Scenario" tile
3. Choose solution from Solutions tab
4. Select scenario and scenario option
5. Pick systems for integration (by S-User customer number)
6. Configure workflow invocation:
   - SAP BTP Region (data center)
   - SAP BTP Account Technical Name
   - Workflow users list
   - Transaction name
7. Confirm (may require cross-landscape confirmation)
8. Launch CIAS from generated link

---

## Execution Scope Options

When executing scenarios, you can select scope:

| Option | Description |
|--------|-------------|
| **Don't perform optional tasks** | Execute mandatory tasks only |
| **Perform optional tasks** | Execute all tasks including optional |

> **Warning**: Execution scope cannot be changed after confirmation.

---

## Scenario Execution Summary

### Completion Process

1. Complete all scenario tasks
2. View Execution Summary screen (final task)
3. Click **Complete Execution** to finalize

> Once you click Complete Execution, the scenario no longer appears in Scenario Execution Monitoring.

### PDF Export

**From My Inbox**:
- After completing all tasks, use "Export to PDF" button on Execution Summary screen

**From Scenario Execution Monitoring**:
- Export current execution state at any time via "Export to PDF" button

---

## Documentation Links

- What is CIAS: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/what-is-cloud-integration-automation-service-35fbf2a.md
- Using CIAS: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/using-cloud-integration-automation-service-5ccb2ce.md
- Maintenance Planner: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/using-maintenance-planner-2ad4326.md
- Execution Scope: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/selecting-execution-scope-444db93.md
- Summary: https://github.com/SAP-docs/btp-cloud-integration-automation-service/blob/main/docs/summary-71f9a64.md
