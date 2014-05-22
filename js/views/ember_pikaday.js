MobiliuzTrips.DatePicker = Ember.TextField.extend({
    type: 'hidden',

    classNames: ['js-datepicker'],

    _picker: null,

    modelChangedValue: function(){
      var picker = this.get("_picker");
      if (picker){
        picker.setDate(this.get("value"));
      }
      Ember.Instrumentation.instrument(GLB_EVTS.get('DATE_CHANGED'),
                                       this.get('value'));
    }.observes("value"),

    didInsertElement: function(){
      var currentYear = (new Date()).getFullYear();
      var formElement = this.$()[0];
      var container = this.$().closest('.dropdown-body')[0];
      var self = this;
      var picker = new Pikaday({
        field: formElement,
        format: 'Do MMMM YYYY',
        yearRange: [currentYear-1, currentYear+1],
        container: container,
        bound: false
      });
      if (!this.isDestroyed)
          this.set("_picker", picker);
    },

    willDestroyElement: function(){
      var picker = this.get("_picker");
      if (picker) {
          picker.destroy();
      }
      this.set("_picker", null);
    },

});

MobiliuzTrips.DatePicker.date = Ember.Object.create({
    dt: new Date()
});

MobiliuzTrips.TripPickerHeaderView = Ember.View.extend({
    templateName: 'trippicker-header',
    clickableClass: 'form-field-select'
});

MobiliuzTrips.TripPickerBodyView = Ember.View.extend({
    classNames: ['dropdown-body',],
    templateName: 'trippicker-body',

    routesView: Ember.View.extend({
        templateName: 'trippicker-routes',

        routeItemView: Ember.View.extend({
            tagName: 'li',
            classNames: [''],

            mouseEnter: function(evt) {
                self = evt.target;
                $(self)
                  .parents('ul')
                  .find('.li--focus').removeClass('li--focus');
                $(self).addClass('li--focus');
            }
        })
    })
});

MobiliuzTrips.TripPickerView = Ember.ContainerView.extend({
    tagName: 'header',
    classNames: ['pane-header', 'filter', 'dropdown'],
    classNameBindings: ['isOpened:dropdown--open',],
    childViews: ['headerView', 'bodyView',],
    headerView: MobiliuzTrips.TripPickerHeaderView,
    bodyView: MobiliuzTrips.TripPickerBodyView,
    isOpened: false,
    click: function(evt) {
        var headerView = this.get('headerView');
        if ($(evt.target).hasClass(headerView.get('clickableClass'))) {
          this.toggleProperty('isOpened');
        }
    },
});
