window.MobiliuzTrips = Ember.Application.create({
    //LOG_TRANSITIONS_INTERNAL: true
    LOG_TRANSITIONS: true
});

MobiliuzTrips.ApplicationAdapter = DS.FixtureAdapter.extend();

window.GLB_EVTS = Ember.Map.create()
GLB_EVTS.set('DATE_CHANGED', 'mobiliuz.dateChanged');
