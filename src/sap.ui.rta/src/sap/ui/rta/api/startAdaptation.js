/*
 * ! ${copyright}
 */
sap.ui.define([
	"sap/ui/rta/util/adaptationStarter",
	"sap/ui/fl/Layer",
	"sap/base/util/merge"
], function(
	adaptationStarter,
	Layer,
	merge
) {
	"use strict";

	function checkLayer(sLayer) {
		var bValidLayer = Object.keys(Layer).some(function (sExistingLayer) {
			return sExistingLayer === sLayer;
		});
		if (!bValidLayer) {
			throw new Error("An invalid layer is passed");
		}
	}

	/**
	 * Starts UI adaptation, initiated for an application at the passed root control instance.
	 * With this API you are also able to modify the UI adaptation plugins list and or add some event handler functions to be called on start, failed and stop events.
	 *
	 * @function
	 * @experimental since 1.83
	 * @since 1.83
	 * @alias module:sap/ui/rta/api/startAdaptation
	 *
	 * @param {object} mOptions - Object with properties
	 * @param {sap.ui.core.Element|sap.ui.core.UIComponent} mOptions.rootControl - Control instance from where UI adaptation should be started
	 * @param {object} [mOptions.flexSettings] - Map with flex-related settings
	 * @param {string} [mOptions.flexSettings.layer] - The Layer in which RTA should be started. Default: "CUSTOMER"
	 * @param {boolean} [mOptions.flexSettings.developerMode] - Whether RTA is started in developerMode mode. Default: <code>false</code>
	 * @param {boolean} [mOptions.validateAppVersion] - Whether app version must be validated on start. Default: <code>true</code>
	 * @param {function} [loadPlugins] - Callback function that enables the modification of the default plugin list of UI adaptation. UI adaptation is passed to this function
	 * @param {function} [onStart] - Event handler function called on start event
	 * @param {function} [onFailed] - Event handler function called on failed event
	 * @param {function} [onStop] - Event handler function called on stop event
	 * @returns {Promise} Resolves when UI adaptation was successfully started
	 * @ui5-restricted
	 * @public
	 */
	function startAdaptation(mOptions, loadPlugins, onStart, onFailed, onStop) {
		var mDefaultOptions = {
			flexSettings: {
				developerMode: false,
				layer: Layer.CUSTOMER
			},
			validateAppVersion: true
		};
		mOptions = merge(mDefaultOptions, mOptions);
		return Promise.resolve()
			.then(checkLayer.bind(this, mOptions.flexSettings.layer))
			.then(adaptationStarter.bind(this, mOptions, loadPlugins, onStart, onFailed, onStop));
	}

	return startAdaptation;
});