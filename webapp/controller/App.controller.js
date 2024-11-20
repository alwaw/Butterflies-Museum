sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
  ],
  function (
    Controller,
    MessageToast,
    MessageBox,
    JSONModel,
    Filter,
    FilterOperator,
    FilterType
  ) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.App", {
      onInit: function () {
        const oModel = new JSONModel("butterflies.json");
        this.getView().setModel(oModel, "butterflies");
      },

      // Event handler for sap.m.SearchField and filter
      onSearch: function () {
        const oView = this.getView();
        const sValue = oView.byId("searchField").getValue();
        const fValue = parseFloat(sValue); // convert value to number

        //only string filters, mapping through the all columns with string value:
        const aColumns = [
          "GUID",
          "Name",
          "Family",
          "Location",
          "Date",
          "Wingspan",
          "Weight",
          "Price",
          "Habitat",
          "Lifespan",
          "Migration Pattern",
          "Threat Level",
        ];
        const aFilters = aColumns.map((sColumn) => {
          return new Filter(sColumn, FilterOperator.Contains, sValue);
        });

        const aNumberColumns = ["Abundance", "Color Rating"];
        aNumberColumns.forEach((sColumn) => {
          aFilters.push(new Filter(sColumn, FilterOperator.EQ, fValue));
        });

        const oCombinedFilter = new Filter({ filters: aFilters, and: false });

        oView
          .byId("idTheMuseumOfButterflies")
          .getBinding("rows")
          .filter(oCombinedFilter, FilterType.Application);
      },

      // Event handler for deleting selected row or rows
      onDelete: function () {
        const oTable = this.byId("idTheMuseumOfButterflies");
        const aSelectedIndices = oTable.getSelectedIndices(); // Get selected rows

        if (aSelectedIndices.length > 0) {
          // Display confirmation dialog
          sap.m.MessageBox.confirm(
            "Are you sure you want to delete the selected rows?", // Message to show
            {
              onClose: function (sAction) {
                if (sAction === sap.m.MessageBox.Action.OK) {
                  // If user confirms, proceed with deletion
                  const oModel = this.getView().getModel("butterflies");
                  const aDataArray = oModel.getProperty("/butterflies");

                  // Reverse the selected indices array to delete rows safely
                  aSelectedIndices.reverse().forEach((iIndex) => {
                    aDataArray.splice(iIndex, 1);
                  });

                  // Update the model with the modified data
                  oModel.setProperty("/butterflies", aDataArray);

                  // Success message
                  sap.m.MessageToast.show(
                    "Selected rows deleted successfully."
                  );
                } else {
                  // If user cancels, do nothing
                  sap.m.MessageToast.show("Deletion canceled.");
                }
              }.bind(this),
            }
          );
        } else {
          sap.m.MessageToast.show("Please select at least one row to delete.");
        }
      },

      // event handler for creating new row
      onCreate: function () {
        const oTable = this.byId("idTheMuseumOfButterflies");
        const oModel = this.getView().getModel("butterflies");
        const aData = oModel.getProperty("/butterflies");

        sap.m.MessageBox.confirm("Are you sure you want to add new row?", {
          onClose: function (sAction) {
            if (sAction === sap.m.MessageBox.Action.OK) {
              // add new empty row:
              const oNewRow = {
                GUID: "",
                Name: "",
                Family: "",
                Location: "",
                Date: "",
                Wingspan: "",
                Weight: "",
                Price: "",
                Habitat: "",
                Lifespan: "",
                "Migration Pattern": "",
                "Threat Level": "",
                Abundance: "",
                "Color Rating": "",
              };

              aData.push(oNewRow); // push new row to butterflies model

              // update data in model:
              oModel.setProperty("/butterflies", aData);

              // focus on newly added row:
              const iNewRowIndex = aData.length - 1; // it is the last row in the model
              oTable.setFirstVisibleRow(iNewRowIndex);

              sap.m.MessageToast.show("New row has been added");
            } else return;
          },
        });
      },
    });
  }
);
