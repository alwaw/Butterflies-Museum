sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.App", {
      onInit: function () {
        const oModel = new JSONModel("butterflies.json");
        this.getView().setModel(oModel, "butterflies");
      },
    });
  }
);
