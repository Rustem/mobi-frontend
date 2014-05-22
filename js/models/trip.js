MobiliuzTrips.Trip = DS.Model.extend({
  from_dt: DS.attr('date'),
  to_dt: DS.attr('date'),
  violations: DS.attr('number')
});

MobiliuzTrips.Trip.FIXTURES = [
  {
    id: 1,
    from_dt: new Date(),
    to_dt: new Date(moment().subtract('hours', 8).format()),
    violations: 4
  },
  {
    id: 2,
    from_dt: new Date(moment().subtract('hours', 8).format()),
    to_dt: new Date(moment().subtract('hours', 5).format()),
    violations: 12
  },
  {
    id: 3,
    from_dt: new Date(moment().subtract('hours', 5).format()),
    to_dt: new Date(moment().subtract('hours', 3).format()),
    violations: 14
  },
  {
    id: 4,
    from_dt: new Date(moment().subtract('hours', 3).format()),
    to_dt: new Date(moment().format()),
    violations: 18
  }
];
