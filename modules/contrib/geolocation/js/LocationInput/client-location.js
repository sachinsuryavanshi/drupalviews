/**
 * @file
 * Javascript for the Geolocation location input.
 */

/**
 * @typedef {Object} LocationInputClientLocationSettings
 *
 * @property {String} identifier
 * @property {Boolean} hideForm
 * @property {Boolean} autoSubmit
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Generic behavior.
   *
   * @type {Drupal~behavior}
   * @type {Object} drupalSettings.geolocation
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches functionality to relevant elements.
   */
  Drupal.behaviors.locationInputClientLocation = {

    /**
     * @param {Object} drupalSettings.geolocation.locationInput
     * @param {LocationInputClientLocationSettings[]} drupalSettings.geolocation.locationInput.clientLocation
     */
    attach: function (context, drupalSettings) {
      $.each(drupalSettings.geolocation.locationInput.clientLocation, function(index, settings) {
        var input = $('.location-input-client-location.' + settings.identifier, context).once('location-input-processed').first();
        if (
          navigator.geolocation
          && input.length
        ) {
          if (settings.hideForm) {
            input.hide();
          }
          var successCallback = function (position) {
            var latitudeInput = input.find('input.geolocation-input-latitude').first();
            var longitudeInput = input.find('input.geolocation-input-longitude').first();
            if (
              latitudeInput.val() === ''
              && longitudeInput.val() === ''
            ) {
              latitudeInput.val(position.coords.latitude);
              longitudeInput.val(position.coords.longitude);
              if (settings.autoSubmit) {
                input.closest('form').submit();
              }
            }
            return false;
          };
          navigator.geolocation.getCurrentPosition(successCallback);
        }
      });
    }
  };

})(jQuery, Drupal);
