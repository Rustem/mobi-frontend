window.MobiliuzTrips = Ember.Application.create({
    //LOG_TRANSITIONS_INTERNAL: true
    LOG_TRANSITIONS: true
});

MobiliuzTrips.FixtureAdapter = DS.FixtureAdapter.extend({
  queryFixtures: function(records, query, type) {
    return records.filter(function(record) {
        for(var key in query) {
            if (!query.hasOwnProperty(key)) { continue; }
            var value = query[key];
            if (record[key] !== value) { return false; }
        }
        return true;
    });
  }
});
MobiliuzTrips.S = Ember.Object.create({
    currentTrip: null,
    date: new Date(),
});


MobiliuzTrips.Store = DS.Store.extend({
    adapter: 'Fixture'
})

//MobiliuzTrips.ApplicationAdapter = DS.FixtureAdapter.extend();

window.GLB_EVTS = Ember.Map.create()
GLB_EVTS.set('DATE_CHANGED', 'mobiliuz.dateChanged');

