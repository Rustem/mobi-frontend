MobiliuzTrips.Router.map(function() {
    this.resource('trips_by_date', {path: '/trips/:date'}, function() {
        this.resource('trip', {path: '/:trip_id'}, function() {
            this.route('violations', {path: '/violations'})
        });
    });
});

MobiliuzTrips.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('trips_by_date.index', (new Date()).toString());
    },
});

// MobiliuzTrips.TripsRoute = Ember.Route.extend({
//     model: function() {
//         return this.store.find('trip');
//     },
//     setupController: function(controller, model) {
//         this._super(controller, model);
//         this.controllerFor('trips').set('content', []);
//         var self = this;
//         Ember.Instrumentation.subscribe(GLB_EVTS.get('DATE_CHANGED'), {
//             before: function (name, timestamp, payload) {
//                 self.transitionTo('by_date', payload);
//             },
//             after: function () { }
//         });
//     },
// });
MobiliuzTrips.TripsByDateRoute = Ember.Route.extend({

    dt: null,

    model: function(params) {
        //date = new Date(params.date);
        var self = this;
        dt = new Date(params.date);
        this.set('dt', dt);
        return this.store.filter('trip', {}, function(trip){
            var from_dt = trip.get('from_dt'),
                to_dt = trip.get('to_dt');
            return self._compare_dates(dt, from_dt) && self._compare_dates(dt, to_dt);
        });
    },
    _compare_dates: function(dt1, dt2) {
        return (dt1.getDate() >= dt2.getDate()
            && dt1.getMonth() == dt2.getMonth()
            && dt1.getFullYear() == dt2.getFullYear())
    },
    // setupController: function(c, m) {
    //     c.set('content', m);
    // },
    _compare_dates: function(dt1, dt2) {
        return (dt1.getDate() >= dt2.getDate()
            && dt1.getMonth() == dt2.getMonth()
            && dt1.getFullYear() == dt2.getFullYear())
    },
    actions: {
        dateChanged: function(dt) {
            // this.model({'date': dt});
            this.transitionTo('trips_by_date.index', dt);
        }
    },
    serialize: function(m, ctx) {
        return {
            'date': ctx.date,
        }
    }
});

MobiliuzTrips.TripsByDateIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('trips_by_date');
    },
});

MobiliuzTrips.TripViolationsRoute = Ember.Route.extend({
    model: function(params) {
        alert('here')
        console.log(params);
    }
});
