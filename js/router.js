MobiliuzTrips.Router.map(function() {
    this.resource('trips_by_date', {path: '/'}, function() {
        this.resource('trip', {path: '/:trip_id'}, function() {

        });
    });
});

MobiliuzTrips.TripsByDateRoute = Ember.Route.extend({
    currentRoute: 'heii',

    model: function(params) {
        //date = new Date(params.date);
        dt = new Date(params.date)
        var self = this;
        return this.store.filter('trip', {}, function(trip){
            var from_dt = trip.get('from_dt'),
                to_dt = trip.get('to_dt');
            return self._compare_dates(dt, from_dt) &&
                self._compare_dates(dt, to_dt);
        });
    },
    _compare_dates: function(dt1, dt2) {
        return (dt1.getDate() >= dt2.getDate()
            && dt1.getMonth() == dt2.getMonth()
            && dt1.getFullYear() == dt2.getFullYear())
    },
    serialize: function(m, ctx) {
        return {
            'date': ctx.date,
        }
    },
    actions: {
        dateChanged: function(dt) {
            // MobiliuzTrips.S.set('date', new Date(dt));
            this.model({'date': dt});
            this.replaceWith('trips_by_date.index');
        },
    },

    redirect: function() {
        console.log('hi');
        this.transitionTo('trip.index', 1);
    }
});

MobiliuzTrips.TripsByDateIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('trips_by_date');
    },
    setupController: function(c, m) {
        c.set('content', m);
    }
});

MobiliuzTrips.TripRoute = Ember.Route.extend({
    model: function(params, transition) {
        return this.store.find('trip', params.trip_id);
    }
});

MobiliuzTrips.TripIndexRoute = Ember.Route.extend({
    model: function(m) {
        return this.modelFor('trip');
    },
    setupController: function(c, m) {
        c.set('content', m);
        dt_range = this.controllerFor('trip').get('dt_range');
        MobiliuzTrips.S.set('currentTrip', dt_range);
    }

});

MobiliuzTrips.TripViolationsRoute = Ember.Route.extend({
    needs: 'trip',
    // setupController: function() {
    //     this._super(arguments)
    // }
});
