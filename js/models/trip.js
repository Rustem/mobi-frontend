MobiliuzTrips.Trip = DS.Model.extend({
    from_dt: DS.attr('date'),
    to_dt: DS.attr('date'),
    violations: DS.hasMany('Violation', {async: true}),
});

MobiliuzTrips.Violation = DS.Model.extend({
    title: DS.attr(),
    at: DS.attr('date'),
    type: DS.attr('string'),
    description: DS.attr('string'),
    trip: DS.belongsTo('Trip')
});


MobiliuzTrips.Trip.FIXTURES = [
  {
    id: 1,
    from_dt: new Date(),
    to_dt: new Date(moment().subtract('hours', 8).format()),
    violations: ['1']
  },
  {
    id: 2,
    from_dt: new Date(moment().subtract('hours', 8).format()),
    to_dt: new Date(moment().subtract('hours', 5).format()),
    violations: []
  },
  {
    id: 3,
    from_dt: new Date(moment().subtract('hours', 5).format()),
    to_dt: new Date(moment().subtract('hours', 3).format()),
    violations: []
  },
  {
    id: 4,
    from_dt: new Date(moment().subtract('hours', 3).format()),
    to_dt: new Date(moment().format()),
    violations: []
  }
];


MobiliuzTrips.Violation.FIXTURES = [
  {
    id: 1,
    title: '14 km/h speeding',
    at: Date(moment().subtract('hours', 7).format()),
    type: 'speed',
    description: '60 km/h max, 74 km/h registered',
    trip: 1
  },
  {
    id: 2,
    title: '14 km/h speeding',
    at: Date(moment().subtract('hours', 7).format()),
    type: 'speed',
    description: '60 km/h max, 74 km/h registered',
    trip: 1
  },
  {
    id: 3,
    title: '14 km/h speeding',
    at: Date(moment().subtract('hours', 7).format()),
    type: 'speed',
    description: '60 km/h max, 74 km/h registered',
    trip: 2
  },
  {
    id: 4,
    title: '14 km/h speeding',
    at: Date(moment().subtract('hours', 7).format()),
    type: 'speed',
    description: '60 km/h max, 74 km/h registered',
    trip: 3
  }
]
