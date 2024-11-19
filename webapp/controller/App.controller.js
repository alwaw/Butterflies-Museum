sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
  ],
  function (
    Controller,
    MessageToast,
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

      // Event handler for deleting selected row
      onDelete: function () {
        const oTable = this.byId("idTheMuseumOfButterflies");
        const aSelectedIndices = oTable.getSelectedIndices(); //get selected rows

        if (aSelectedIndices.length > 0) {
          const oModel = this.getView().getModel("butterflies");
          const aDataArray = oModel.getProperty("/butterflies");

          // reverse the selected indices array to delete rows safely:
          aSelectedIndices.reverse().forEach((iIndex) => {
            aDataArray.splice(iIndex, 1);
          });

          //update the model with the modified data:
          oModel.setProperty("/butterflies", aDataArray);

          //succes message:
          sap.m.MessageToast.show("Selected rows deleted succesfully.");
        } else {
          sap.m.MessageToast.show("Please select at least one row to delete");
        }
      },
    });
  }
);
