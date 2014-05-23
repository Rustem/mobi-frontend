MobiliuzTrips.TripsByDateController = Ember.ArrayController.extend({
    tripPickerHeader: "hello trips",

    actions: {
        currentTrip: function(trip_id) {
            this.transitionToRoute('trip.index', trip_id);
        }
    }
});
