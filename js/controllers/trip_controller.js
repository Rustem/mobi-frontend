MobiliuzTrips.TripController = Ember.ObjectController.extend({
    format: 'HH-mm',

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
})
