MobiliuzTrips.TripController = Ember.ObjectController.extend({
    format: 'HH-mm',
    tripPickerHeader: 'Hello world',
    needs: 'trips_by_date',

    trips: function() {
        return this.get('controllers.trips_by_date').get('model');
    }.property('controllers.trips_by_date'),

    from_dt: function(key, value) {
        var model = this.get('model');
        if(value === undefined) {
            return moment(model.get('from_dt')).format(this.get('format'));
        } else {
            throw('not yet working')
        }
    }.property('model.from_dt'),

    to_dt: function(key, value) {
        var model = this.get('model');
        if (value === undefined) {
            return moment(model.get('to_dt')).format(this.get('format'));
        }
    }.property('model.to_dt'),

    dt_range: function(key, value) {
        if (value === undefined) {
            return this.get('from_dt') + ' - ' + this.get('to_dt');
        }
    }.property('from_dt', 'to_dt'),

    numOfViolations: function(key, value) {
        if(value === undefined) {
            return this.get('model.violations.length');
        }
    }.property('model.violations.length'),

    actions: {
        // detail: function() {
        //     this.
        // }
    }
});

MobiliuzTrips.TripIndexController = Ember.ObjectController.extend({
    tripPickerHeader: 'hihi'
});
