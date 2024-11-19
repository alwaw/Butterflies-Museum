sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
  ],
  function (Controller, JSONModel, Filter, FilterOperator, FilterType) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.App", {
      onInit: function () {
        const oModel = new JSONModel("butterflies.json");
        this.getView().setModel(oModel, "butterflies");
      },

      // Event handler for sap.m.SearchField and filter
      onSearch: function () {
        const oView = this.getView(),
          sValue = oView.byId("searchField").getValue(),
          fValue = parseFloat(sValue); // convert value to number

        //only string filters, mapping throught the all columns with string value:
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
    });
  }
);
