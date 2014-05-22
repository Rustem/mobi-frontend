MobiliuzTrips.Router.map(function() {
    this.resource('trips', {path: '/'}, function(){
        this.route('by_date', {path: '/:date'})
    });
});

MobiliuzTrips.TripsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('trips');
    }
});

MobiliuzTrips.TripsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('trip');
    },
    setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('trips').set('content', []);
        var self = this;
        Ember.Instrumentation.subscribe(GLB_EVTS.get('DATE_CHANGED'), {
            before: function (name, timestamp, payload) {
                self.transitionTo('trips.by_date', payload);
            },
            after: function () { }
        });

    },
});

MobiliuzTrips.TripsByDateRoute = Ember.Route.extend({
    model: function(params) {
        date = new Date(params.date);
        var self = this;
        return this.store.filter('trip', function(route) {
            var from_dt = route.get('from_dt'),
                to_dt = route.get('to_dt');
            return self._compare_dates(date, from_dt) &&
                   self._compare_dates(date, to_dt)
        });
    },
    _compare_dates: function(dt1, dt2) {
        return (dt1.getDate() == dt2.getDate()
            && dt1.getMonth() == dt2.getMonth()
            && dt1.getFullYear() == dt2.getFullYear())
    },
    renderTemplate: function(controller) {
        this.render('trips/index', {controller: controller});
    }
});
