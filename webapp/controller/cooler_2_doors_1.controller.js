sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.connectedGoods.controller.cooler_2_doors_1", {
		handleRouteMatched: function(oEvent) {

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}

		},
		_onPageNavButtonPress: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.doNavigate("launch_page", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {

			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var sEntityNameSet;
			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			if (sEntityNameSet !== null) {
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function(bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName);
						} else {
							this.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}

			if (typeof fnPromiseResolve === "function") {
				fnPromiseResolve();
			}
		},
		_onButtonPress: function(oEvent) {

			var sPopoverName = "popover_7";
			this.mPopovers = this.mPopovers || {};
			var oPopover = this.mPopovers[sPopoverName];
			var oSource = oEvent.getSource();
			var oBindingContext = oSource.getBindingContext();
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oView;
			if (!oPopover) {
				this.getOwnerComponent().runAsOwner(function() {
					oView = sap.ui.xmlview({
						viewName: "com.sap.build.standard.connectedGoods.view." + sPopoverName
					});
					this.getView().addDependent(oView);
					oView.getController().setRouter(this.oRouter);
					oPopover = oView.getContent()[0];
					oPopover.setPlacement("Bottom");
					this.mPopovers[sPopoverName] = oPopover;
				}.bind(this));
			}

			return new Promise(function(fnResolve) {
				oPopover.attachEventOnce("afterOpen", null, fnResolve);
				oPopover.openBy(oSource);
				if (oView) {
					oPopover.attachAfterOpen(function() {
						oPopover.rerender();
					});
				} else {
					oView = oPopover.getParent();
				}

				var oModel = this.getView().getModel();
				if (oModel) {
					oView.setModel(oModel);
				}
				if (sPath) {
					var oParams = oView.getController().getBindingParameters();
					oView.bindObject({
						path: sPath,
						parameters: oParams
					});
				}
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onButtonPress1: function(oEvent) {

			var sDialogName = "dialog_11";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];
			var oSource = oEvent.getSource();
			var oBindingContext = oSource.getBindingContext();
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oView;
			if (!oDialog) {
				this.getOwnerComponent().runAsOwner(function() {
					oView = sap.ui.xmlview({
						viewName: "com.sap.build.standard.connectedGoods.view." + sDialogName
					});
					this.getView().addDependent(oView);
					oView.getController().setRouter(this.oRouter);
					oDialog = oView.getContent()[0];
					this.mDialogs[sDialogName] = oDialog;
				}.bind(this));
			}

			return new Promise(function(fnResolve) {
				oDialog.attachEventOnce("afterOpen", null, fnResolve);
				oDialog.open();
				if (oView) {
					oDialog.attachAfterOpen(function() {
						oDialog.rerender();
					});
				} else {
					oView = oDialog.getParent();
				}

				var oModel = this.getView().getModel();
				if (oModel) {
					oView.setModel(oModel);
				}
				if (sPath) {
					var oParams = oView.getController().getBindingParameters();
					oView.bindObject({
						path: sPath,
						parameters: oParams
					});
				}
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onLinkPress: function(oEvent) {

			var sDialogName = "dialog_12";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];
			var oSource = oEvent.getSource();
			var oBindingContext = oSource.getBindingContext();
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oView;
			if (!oDialog) {
				this.getOwnerComponent().runAsOwner(function() {
					oView = sap.ui.xmlview({
						viewName: "com.sap.build.standard.connectedGoods.view." + sDialogName
					});
					this.getView().addDependent(oView);
					oView.getController().setRouter(this.oRouter);
					oDialog = oView.getContent()[0];
					this.mDialogs[sDialogName] = oDialog;
				}.bind(this));
			}

			return new Promise(function(fnResolve) {
				oDialog.attachEventOnce("afterOpen", null, fnResolve);
				oDialog.open();
				if (oView) {
					oDialog.attachAfterOpen(function() {
						oDialog.rerender();
					});
				} else {
					oView = oDialog.getParent();
				}

				var oModel = this.getView().getModel();
				if (oModel) {
					oView.setModel(oModel);
				}
				if (sPath) {
					var oParams = oView.getController().getBindingParameters();
					oView.bindObject({
						path: sPath,
						parameters: oParams
					});
				}
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onComboBoxSelectionChange: function() {

			alert("Not Implemented Yet !");

		},
		_onComboBoxSelectionChange1: function() {

			alert("Not Implemented Yet");

		},
		_onComboBoxSelectionChange2: function() {

			alert("Not Implemented Yet");

		},
		_onComboBoxSelectionChange3: function() {

			alert("Not Implemented Yet");

		},
		_onButtonPress2: function() {
			return new Promise(function(fnResolve) {
				sap.m.MessageBox.confirm("Save changes ?", {
					title: "Conrirmation",
					actions: ["Yes", "Cancel"],
					onClose: function(sActionClicked) {
						fnResolve(sActionClicked === "Yes");
					}
				});
			}).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err);
				}
			});

		},
		_onButtonPress3: function() {

			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}
		},
		getQueryParameters: function(oLocation) {

			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		_onButtonPress4: function() {
			var oDialog = this.getView().getContent()[0];

			return new Promise(function(fnResolve) {
				oDialog.attachEventOnce("afterClose", null, fnResolve);
				oDialog.close();
			});

		},
		applyFiltersAndSorters: function(sControlId, sAggregationName) {
			var oBindingInfo = this.getView().byId(sControlId).getBindingInfo(sAggregationName);
			var oBindingOptions = this.updateBindingOptions(sControlId);
			this.getView().byId(sControlId).bindAggregation(sAggregationName, {
				model: oBindingInfo.model,
				path: oBindingInfo.path,
				parameters: oBindingInfo.parameters,
				template: oBindingInfo.template,
				templateShareable: true,
				sorter: oBindingOptions.sorters,
				filters: oBindingOptions.filters
			});

		},
		updateBindingOptions: function(sCollectionId, oBindingData, sSourceId) {
			this.mBindingOptions = this.mBindingOptions || {};
			this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};

			var aSorters = this.mBindingOptions[sCollectionId].sorters;
			var oGroupby = this.mBindingOptions[sCollectionId].groupby;

			// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
			if (oBindingData) {
				if (oBindingData.sorters) {
					aSorters = oBindingData.sorters;
				}
				if (oBindingData.groupby) {
					oGroupby = oBindingData.groupby;
				}
				// 1) Update the filters map for the given collection and source
				this.mBindingOptions[sCollectionId].sorters = aSorters;
				this.mBindingOptions[sCollectionId].groupby = oGroupby;
				this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
				this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
			}

			// 2) Reapply all the filters and sorters
			var aFilters = [];
			for (var key in this.mBindingOptions[sCollectionId].filters) {
				aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
			}

			// Add the groupby first in the sorters array
			if (oGroupby) {
				aSorters = aSorters ? [oGroupby].concat(aSorters) : [oGroupby];
			}

			var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
			return {
				filters: aFinalFilters,
				sorters: aSorters
			};

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("cooler_2_doors_1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			var oView = this.getView();
			var oModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oModel, "staticDataModel");

			function dateDimensionFormatter(oDimensionValue, sTextValue) {
				var oValueToFormat = sTextValue !== undefined ? sTextValue : oDimensionValue;
				if (oValueToFormat instanceof Date) {
					var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
						style: "short"
					});
					return oFormat.format(oValueToFormat);
				}
				return oValueToFormat;
			}

			this.oBindingParameters = {};

			var oData = [{
				"dim0": "2PM",
				"mea0": "1",
				"__id": 0
			}, {
				"dim0": "3PM",
				"mea0": "0",
				"__id": 1
			}, {
				"dim0": "4PM",
				"mea0": "0",
				"__id": 2
			}, {
				"dim0": "5PM",
				"mea0": "0",
				"__id": 3
			}, {
				"dim0": "6PM",
				"mea0": "1",
				"__id": 4
			}, {
				"dim0": "7PM",
				"mea0": "0",
				"__id": 5
			}, {
				"undefined": null,
				"dim0": "8PM",
				"mea0": "0",
				"__id": 6
			}, {
				"undefined": null,
				"dim0": "9PM",
				"mea0": "0",
				"__id": 7
			}, {
				"undefined": null,
				"dim0": "10PM",
				"mea0": "1",
				"__id": 8
			}, {
				"undefined": null,
				"dim0": "11PM",
				"mea0": "0",
				"__id": 9
			}];
			oView.getModel("staticDataModel").setData({
				"sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1491349375877-7aea5913059d217e0dba3aea5_S5": oData
			}, true);
			this.oBindingParameters['sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1491349375877-7aea5913059d217e0dba3aea5_S5'] = {
				"path": "/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1491349375877-7aea5913059d217e0dba3aea5_S5",
				"parameters": {},
				"model": "staticDataModel"
			};
			var aDimensions = oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1491349375877-7aea5913059d217e0dba3aea5_S5").getDimensions();
			aDimensions.forEach(function(oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

			var oData = [{
				"dim0": "2PM",
				"mea0": "4.6",
				"__id": 0
			}, {
				"dim0": "3PM",
				"mea0": "4.9",
				"__id": 1
			}, {
				"dim0": "4PM",
				"mea0": "4.8",
				"__id": 2
			}, {
				"dim0": "5PM",
				"mea0": "4",
				"__id": 3
			}, {
				"dim0": "6PM",
				"mea0": "4.9",
				"__id": 4
			}, {
				"dim0": "7PM",
				"mea0": "5.2",
				"__id": 5
			}, {
				"undefined": null,
				"dim0": "8PM",
				"mea0": "4.3",
				"__id": 6
			}, {
				"undefined": null,
				"dim0": "9PM",
				"mea0": "4.8",
				"__id": 7
			}, {
				"undefined": null,
				"dim0": "10PM",
				"mea0": "3.8",
				"__id": 8
			}, {
				"undefined": null,
				"dim0": "11PM",
				"mea0": "3.7",
				"__id": 9
			}];
			oView.getModel("staticDataModel").setData({
				"sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-7aea5913059d217e0dba3aea5_S5": oData
			}, true);
			this.oBindingParameters['sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-7aea5913059d217e0dba3aea5_S5'] = {
				"path": "/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-7aea5913059d217e0dba3aea5_S5",
				"parameters": {},
				"model": "staticDataModel"
			};
			var aDimensions = oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-7aea5913059d217e0dba3aea5_S5").getDimensions();
			aDimensions.forEach(function(oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

			var oData = [{
				"dim0": "2PM",
				"mea0": "2.5",
				"Threshold": "2",
				"__id": 0
			}, {
				"dim0": "3PM",
				"mea0": "1.4",
				"Threshold": "2",
				"__id": 1
			}, {
				"dim0": "4PM",
				"mea0": "1.9",
				"Threshold": "2",
				"__id": 2
			}, {
				"dim0": "5PM",
				"mea0": "2.1",
				"Threshold": "2",
				"__id": 3
			}, {
				"dim0": "6PM",
				"mea0": "2.7",
				"Threshold": "2",
				"__id": 4
			}, {
				"dim0": "7PM",
				"mea0": "1.9",
				"Threshold": "2",
				"__id": 5
			}, {
				"undefined": null,
				"dim0": "8PM",
				"mea0": "2.1",
				"Threshold": "2",
				"__id": 6
			}, {
				"undefined": null,
				"dim0": "9PM",
				"mea0": "2",
				"Threshold": "2",
				"__id": 7
			}, {
				"undefined": null,
				"dim0": "10PM",
				"mea0": "1.9",
				"Threshold": "2",
				"__id": 8
			}, {
				"undefined": null,
				"dim0": "11PM",
				"mea0": "2",
				"Threshold": "2",
				"__id": 9
			}];
			oView.getModel("staticDataModel").setData({
				"sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1491349280152-7aea5913059d217e0dba3aea5_S5": oData
			}, true);
			this.oBindingParameters['sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1491349280152-7aea5913059d217e0dba3aea5_S5'] = {
				"path": "/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1491349280152-7aea5913059d217e0dba3aea5_S5",
				"parameters": {},
				"model": "staticDataModel"
			};
			var aDimensions = oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1491349280152-7aea5913059d217e0dba3aea5_S5").getDimensions();
			aDimensions.forEach(function(oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

			var oData = [{
				"dim0": "2PM",
				"mea0": "9",
				"Threshold": "2",
				"__id": 0
			}, {
				"dim0": "3PM",
				"mea0": "0",
				"Threshold": "2",
				"__id": 1
			}, {
				"dim0": "4PM",
				"mea0": "10",
				"Threshold": "2",
				"__id": 2
			}, {
				"dim0": "5PM",
				"mea0": "11",
				"Threshold": "2",
				"__id": 3
			}, {
				"dim0": "6PM",
				"mea0": "14",
				"Threshold": "2",
				"__id": 4
			}, {
				"dim0": "7PM",
				"mea0": "13",
				"Threshold": "2",
				"__id": 5
			}, {
				"undefined": null,
				"dim0": "8PM",
				"mea0": "10",
				"Threshold": "2",
				"__id": 6
			}, {
				"undefined": null,
				"dim0": "9PM",
				"mea0": "0",
				"Threshold": "2",
				"__id": 7
			}, {
				"undefined": null,
				"dim0": "10PM",
				"mea0": "3",
				"Threshold": "2",
				"__id": 8
			}, {
				"undefined": null,
				"dim0": "11PM",
				"mea0": "2",
				"Threshold": "2",
				"__id": 9
			}];
			oView.getModel("staticDataModel").setData({
				"sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1490599091204-7aea5913059d217e0dba3aea5_S5": oData
			}, true);
			this.oBindingParameters['sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1490599091204-7aea5913059d217e0dba3aea5_S5'] = {
				"path": "/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1490599091204-7aea5913059d217e0dba3aea5_S5",
				"parameters": {},
				"model": "staticDataModel"
			};
			var aDimensions = oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1490599091204-7aea5913059d217e0dba3aea5_S5").getDimensions();
			aDimensions.forEach(function(oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

		},
		onAfterRendering: function() {

			var oChart,
				self = this,
				oBindingParameters = this.oBindingParameters,
				oView = this.getView();

			oChart = oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1491349375877-7aea5913059d217e0dba3aea5_S5");
			oChart.bindData(oBindingParameters['sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1491349375877-7aea5913059d217e0dba3aea5_S5']);

			oChart = oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-7aea5913059d217e0dba3aea5_S5");
			oChart.bindData(oBindingParameters['sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-7aea5913059d217e0dba3aea5_S5']);

			oChart = oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1491349280152-7aea5913059d217e0dba3aea5_S5");
			oChart.bindData(oBindingParameters['sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1491349280152-7aea5913059d217e0dba3aea5_S5']);

			oChart = oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1490599091204-7aea5913059d217e0dba3aea5_S5");
			oChart.bindData(oBindingParameters['sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_LineChart-1490599091204-7aea5913059d217e0dba3aea5_S5']);

		}
	});
}, /* bExport= */ true);
