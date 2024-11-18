sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/resource/ResourceModel"],
  (UIComponent, ResourceModel) => {
    "use strict";

    return UIComponent.extend("ui5.walkthrough/Component", {
      metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        rootView: {
          viewName: "ui5.walkthrough.view.App",
          type: "XML",
          id: "app",
        },
      },

      init() {
        UIComponent.prototype.init.apply(this, arguments);
      },
    });
  }
);
