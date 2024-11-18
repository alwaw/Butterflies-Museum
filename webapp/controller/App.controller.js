sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
  ],
  function (Controller, JSONModel, Sorter, Filter, FilterOperator, FilterType) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.App", {
      onInit: function () {
        const oModel = new JSONModel("butterflies.json");
        this.getView().setModel(oModel, "butterflies");
      },

      // Event handler for sap.m.SearchField
      onSearch: function () {
        const oView = this.getView(),
          sValue = oView.byId("searchField").getValue(),
          fValue = parseFloat(sValue), // convert value to number
          //może dodać mapowanie zamiast pojedynczych filtrów?
          //only string filters:
          oFilter1 = new Filter("GUID", FilterOperator.Contains, sValue),
          oFilter2 = new Filter("Name", FilterOperator.Contains, sValue),
          oFilter3 = new Filter("Family", FilterOperator.Contains, sValue),
          oFilter4 = new Filter("Location", FilterOperator.Contains, sValue),
          oFilter5 = new Filter("Date", FilterOperator.Contains, sValue),
          oFilter6 = new Filter("Wingspan", FilterOperator.Contains, sValue),
          oFilter7 = new Filter("Weight", FilterOperator.Contains, sValue),
          oFilter8 = new Filter("Price", FilterOperator.Contains, sValue),
          oFilter9 = new Filter("Habitat", FilterOperator.Contains, sValue),
          oFilter10 = new Filter("Lifespan", FilterOperator.Contains, sValue),
          oFilter11 = new Filter(
            "Migration Pattern",
            FilterOperator.Contains,
            sValue
          ),
          oFilter12 = new Filter("Location", FilterOperator.Contains, sValue),
          oFilter13 = new Filter(
            "Threat Level",
            FilterOperator.Contains,
            sValue
          ),
          // number filters:
          oFilter14 = new Filter("Abundance", FilterOperator.EQ, fValue),
          oFilter15 = new Filter("Color Rating", FilterOperator.EQ, fValue);
        const oCombinedFilter = new Filter({
          filters: [
            oFilter1,
            oFilter2,
            oFilter3,
            oFilter4,
            oFilter5,
            oFilter6,
            oFilter7,
            oFilter8,
            oFilter9,
            oFilter10,
            oFilter11,
            oFilter12,
            oFilter13,
            oFilter14,
            oFilter15,
          ],
          and: false,
        });

        oView
          .byId("idTheMuseumOfButterflies")
          .getBinding("rows")
          .filter(oCombinedFilter, FilterType.Application);
      },
    });
  }
);
