sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("ui5odataemptyrows.controller.View1", {
    onInit() {
      window.__model = this.getOwnerComponent().getModel();
    },

    onCategoriesSmartTableBeforeRebind(oEvent) {
      const oBindingParams = oEvent.getParameter("bindingParams");
      oBindingParams.events.dataReceived =
        this.onCategoriesSmartTableDataReceived.bind(this);
      oBindingParams.events.createActivate =
        this.onCreateActivateCategory.bind(this);
    },
    onProductsSmartTableBeforeRebind(oEvent) {
      const oBindingParams = oEvent.getParameter("bindingParams");
      oBindingParams.events.dataReceived =
        this.onProductsSmartTableDataReceived.bind(this);
      oBindingParams.events.createActivate =
        this.onCreateActivateProduct.bind(this);
    },
    onCategoriesSmartTableDataReceived(oEvent) {
      const oCategoriesBinding = oEvent.getSource();
      if (
        oCategoriesBinding.isLengthFinal() &&
        oCategoriesBinding.isFirstCreateAtEnd() === undefined
      ) {
        const oCategoryContext = oCategoriesBinding.create({}, false, {
          inactive: true,
        });
        const oProductsTable = this.byId("ProductsSmartTable");
        oProductsTable.setBindingContext(oCategoryContext);
        oProductsTable.rebindTable(true);
      }
    },

    onProductsSmartTableDataReceived(oEvent) {
      const oProductsBinding = oEvent.getSource();
      if (
        oProductsBinding.isLengthFinal() &&
        oProductsBinding.isFirstCreateAtEnd() === undefined
      ) {
        const oProductContext = oProductsBinding.create({}, false, {
          inactive: true,
        });
      }
    },

    onCreateActivateCategory(oEvent) {
      const oBinding = oEvent.getSource();
      const oCtx = oEvent.getParameter("context");
      const oEmptyCtx = oBinding.create({}, false, {
        inactive: true,
      });
    },

    onCreateActivateProduct(oEvent) {
      const oBinding = oEvent.getSource();
      const oCtx = oEvent.getParameter("context");
      const oEmptyCtx = oBinding.create({}, false, {
        inactive: true,
      });
    },

    handleCategoriesSelectionChange(oEvent) {
      const oCtx = oEvent.getParameter("rowContext");
      const oProductsSmartTable = this.byId("ProductsSmartTable");
      oProductsSmartTable.setBindingContext(oCtx);
      if (oCtx !== null) {
        if (oCtx.isTransient()) {
          oProductsSmartTable.getTable().getBinding("rows").create(
            {},
            false
            // ,{
            //   inactive: true,
            // }
          );
        }
      }
      oProductsSmartTable.rebindTable(true);
    },
  });
});
