/**
 * SAP Analytics Cloud - Common Scripting Patterns
 *
 * Ready-to-use code patterns for SAC Analytics Designer and Optimized Story Experience.
 * Copy and adapt these patterns to your application.
 *
 * Source: SAP Analytics Cloud Scripting Skill
 * Version: 2025.14+
 */

// =============================================================================
// FILTERING PATTERNS
// =============================================================================

/**
 * Pattern 1: Apply filter from chart selection to table
 * Use in: Chart.onSelect event
 */
function filterTableFromChartSelection() {
    var selections = Chart_1.getSelections();
    if (selections.length > 0) {
        var selectedMember = selections[0]["{{DimensionId}}"];
        Table_1.getDataSource().setDimensionFilter("{{DimensionId}}", selectedMember);
    }
}

/**
 * Pattern 2: Apply multiple filters efficiently (batch)
 * Use when: Setting multiple filters at once
 */
function applyMultipleFilters(year, region, product) {
    var ds = Chart_1.getDataSource();

    // Pause to prevent multiple refreshes
    ds.setRefreshPaused(true);

    ds.setDimensionFilter("Year", year);
    ds.setDimensionFilter("Region", region);
    ds.setDimensionFilter("Product", product);

    // Single refresh
    ds.setRefreshPaused(false);
}

/**
 * Pattern 3: Sync filters across multiple widgets
 * Use when: Multiple charts/tables should have same filters
 */
function syncFiltersAcrossWidgets() {
    var sourceDs = Chart_1.getDataSource();

    // Copy all filters efficiently
    Table_1.getDataSource().copyDimensionFilterFrom(sourceDs);
    Chart_2.getDataSource().copyDimensionFilterFrom(sourceDs);
}

/**
 * Pattern 4: Reset all filters
 * Use in: Reset button onClick event
 */
function resetAllFilters() {
    var widgets = [Chart_1, Table_1, Chart_2];

    widgets.forEach(function(widget) {
        widget.getDataSource().clearAllFilters();
    });

    // Reset dropdowns
    Dropdown_Year.setSelectedKey("");
    Dropdown_Region.setSelectedKey("");
}

/**
 * Pattern 5: Filter from dropdown selection
 * Use in: Dropdown.onSelect event
 */
function filterFromDropdown() {
    var selectedYear = Dropdown_Year.getSelectedKey();

    if (selectedYear) {
        Application.showBusyIndicator();

        Chart_1.getDataSource().setDimensionFilter("Year", selectedYear);
        Table_1.getDataSource().setDimensionFilter("Year", selectedYear);

        Application.hideBusyIndicator();
    }
}


// =============================================================================
// DATA ACCESS PATTERNS
// =============================================================================

/**
 * Pattern 6: Find active version from attribute
 * Use when: Need to identify active planning cycle/version from master data
 */
function findActiveVersion() {
    var allVersions = PlanningModel_1.getMembers("Version");
    var activeVersion = null;

    for (var i = 0; i < allVersions.length; i++) {
        if (allVersions[i].properties.Active === "X") {
            activeVersion = allVersions[i].id;
            break;
        }
    }

    console.log("Active Version: " + activeVersion);
    return activeVersion;
}

/**
 * Pattern 7: Get booked values only (not all master data)
 * Use when: Need only members that have data, not entire master data list
 */
function getBookedValuesOnly() {
    var bookedMembers = Table_1.getDataSource().getMembers(
        "{{DimensionId}}",
        { accessMode: MemberAccessMode.BookedValues }
    );

    console.log("Booked members:", bookedMembers);
    return bookedMembers;
}

/**
 * Pattern 8: Get data value for specific selection
 * Use when: Need to read specific cell value
 */
function getSpecificDataValue() {
    var selection = {
        "@MeasureDimension": "[Account].[parentId].&[Revenue]",
        "Location": "[Location].[Country].&[US]",
        "Year": "[Date].[Year].&[2024]"
    };

    var data = Chart_1.getDataSource().getData(selection);

    console.log("Formatted:", data.formattedValue);
    console.log("Raw:", data.rawValue);

    return data;
}


// =============================================================================
// CHART MANIPULATION PATTERNS
// =============================================================================

/**
 * Pattern 9: Dynamic measure swap
 * Use in: Button onClick or Dropdown onSelect
 */
function swapMeasure(newMeasureId) {
    // Get current measure
    var currentMeasures = Chart_1.getMembers(Feed.ValueAxis);

    // Remove current measure
    if (currentMeasures.length > 0) {
        Chart_1.removeMember(Feed.ValueAxis, currentMeasures[0]);
    }

    // Add new measure
    Chart_1.addMember(Feed.ValueAxis, newMeasureId);
}

/**
 * Pattern 10: Dynamic dimension swap
 * Use when: Changing chart axis dimension
 */
function swapDimension(newDimensionId) {
    // Get current dimension
    var currentDimensions = Chart_1.getMembers(Feed.CategoryAxis);

    // Remove current
    if (currentDimensions.length > 0) {
        Chart_1.removeDimension(Feed.CategoryAxis, currentDimensions[0]);
    }

    // Add new
    Chart_1.addDimension(Feed.CategoryAxis, newDimensionId);
}

/**
 * Pattern 11: Top N ranking
 * Use when: Show only top performers
 */
function showTopN(n, measureId) {
    Chart_1.rankBy(measureId, n, SortOrder.Descending);
}


// =============================================================================
// VISIBILITY TOGGLE PATTERNS
// =============================================================================

/**
 * Pattern 12: Switch between chart and table
 * Use in: Toggle button onClick event
 */
function switchChartTable(showChart) {
    Chart_1.setVisible(showChart);
    Table_1.setVisible(!showChart);

    Button_ShowChart.setVisible(!showChart);
    Button_ShowTable.setVisible(showChart);
}

/**
 * Pattern 13: Expandable panel pattern
 * Use when: Toggle detail section visibility
 */
function toggleDetailPanel() {
    var isVisible = Panel_Details.isVisible();
    Panel_Details.setVisible(!isVisible);

    // Update button text
    if (isVisible) {
        Button_Toggle.setText("Show Details");
    } else {
        Button_Toggle.setText("Hide Details");
    }
}


// =============================================================================
// USER FEEDBACK PATTERNS
// =============================================================================

/**
 * Pattern 14: Long operation with busy indicator
 * Use when: Performing operations that take time
 */
function performLongOperation() {
    Application.showBusyIndicator();

    try {
        // Perform operation
        Table_1.getDataSource().refreshData();
        Chart_1.getDataSource().refreshData();

        Application.showMessage(
            ApplicationMessageType.Success,
            "Data refreshed successfully"
        );
    } catch (error) {
        console.log("Error:", error);
        Application.showMessage(
            ApplicationMessageType.Error,
            "Failed to refresh data"
        );
    } finally {
        Application.hideBusyIndicator();
    }
}

/**
 * Pattern 15: Confirmation popup pattern
 * Use when: Confirming destructive actions
 */
// In main button onClick:
function showConfirmation() {
    Popup_Confirm.open();
}

// In popup Yes button onClick:
function onConfirmYes() {
    Popup_Confirm.close();
    performAction();
}

// In popup No button onClick:
function onConfirmNo() {
    Popup_Confirm.close();
}


// =============================================================================
// SELECTION HANDLING PATTERNS
// =============================================================================

/**
 * Pattern 16: Handle multi-selection from table
 * Use in: Table.onSelect event
 */
function handleMultiSelection() {
    var selections = Table_1.getSelections();

    if (selections.length === 0) {
        Application.showMessage(
            ApplicationMessageType.Warning,
            "Please select at least one row"
        );
        return;
    }

    // Process all selections
    var selectedIds = selections.map(function(sel) {
        return sel["{{DimensionId}}"];
    });

    console.log("Selected IDs:", selectedIds);

    // Apply as filter (if single value needed)
    if (selections.length === 1) {
        Chart_1.getDataSource().setDimensionFilter(
            "{{DimensionId}}",
            selectedIds[0]
        );
    }
}

/**
 * Pattern 17: Clear selection
 * Use when: Need to programmatically clear widget selection
 */
function clearSelection() {
    Chart_1.getDataSource().removeDimensionFilter("{{DimensionId}}");
    Table_1.getDataSource().removeDimensionFilter("{{DimensionId}}");
}


// =============================================================================
// INITIALIZATION PATTERNS
// =============================================================================

/**
 * Pattern 18: Set initial filters from URL parameters
 * Prerequisites:
 * - Create global variable with p_ prefix (e.g., p_year)
 * - URL: ?p_year=2024&p_region=EMEA
 */
// In Script Object (not onInitialization):
function applyUrlParameters() {
    if (p_year) {
        Chart_1.getDataSource().setDimensionFilter("Year", p_year);
        Dropdown_Year.setSelectedKey(p_year);
    }

    if (p_region) {
        Chart_1.getDataSource().setDimensionFilter("Region", p_region);
        Dropdown_Region.setSelectedKey(p_region);
    }
}

/**
 * Pattern 19: Dynamic title update
 * Use when: Title should reflect current filters
 */
function updateDynamicTitle() {
    var year = Dropdown_Year.getSelectedKey() || "All Years";
    var region = Dropdown_Region.getSelectedKey() || "All Regions";

    Text_Title.setText("Sales Report - " + year + " | " + region);
}


// =============================================================================
// DEBUGGING PATTERNS
// =============================================================================

/**
 * Pattern 20: Debug logging helper
 * Use during development
 */
function debugLog(label, value) {
    console.log("=== " + label + " ===");
    console.log(value);
    console.log("Type:", typeof value);
    if (Array.isArray(value)) {
        console.log("Length:", value.length);
    }
}

/**
 * Pattern 21: Log all selections
 * Use when debugging selection handling
 */
function logSelections(widgetName, widget) {
    var selections = widget.getSelections();
    console.log(widgetName + " selections:");
    console.log(JSON.stringify(selections));
}


// =============================================================================
// EXPORT PATTERNS
// =============================================================================

/**
 * Pattern 22: Export with dynamic filename
 * Use in: Export button onClick
 */
function exportWithDynamicName() {
    var today = new Date().toISOString().split('T')[0];
    var year = Dropdown_Year.getSelectedKey() || "AllYears";

    Table_1.export(ExportType.Excel, {
        fileName: "SalesReport_" + year + "_" + today
    });
}

/**
 * Pattern 23: PDF export with header/footer
 * Use in: Export PDF button onClick
 */
function exportPDF() {
    var year = Dropdown_Year.getSelectedKey() || "All Years";
    var today = new Date().toLocaleDateString();

    Application.export(ExportType.PDF, {
        scope: ExportScope.All,
        header: "Sales Analysis Report - " + year,
        footer: "Generated: " + today + " | Page {page}",
        orientation: "landscape"
    });
}
