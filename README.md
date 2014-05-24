mobi-frontend
=============

## Understanding Ember source

### Ember
---------

Ember stores state of application in Application `container`. It is possible to lookup the objects from this container such as App.container.lookup('controller:#NAME', options). This method is used by facade methods such as:
* ```Ember.controllerFor(container, controllerName, lookupOptions)```,
* ```Ember.modelFor()```

## Router

Router listens for url update and handles it according to the registered routes in app env.



Routes
------

Routes are responsible for mapping urls to models. Routes also can control which controller is active

To continue bubling particular action after it has been handled just return `true` from the handler.
```js
App.AlbumSongRoute = Ember.Route.extend({
      actions: {
        startPlaying: function() {
          // ...

          if (actionShouldAlsoBeTriggeredOnParentRoute) {
            return true;
          }
        }
      }
    });
```

### Transitions

Simple transition

```javascript
this.transitionTo('fourOhFour');
this.transitionTo('secret', context);
```

Transition to a nested route

```javascript
this.transitionTo('articles.new');
```

Multiple models example

```javascript
this.transitionTo('cereal', breakfast, cereal);
```

### Route initialization

```setup(context, queryParams)``` is an entry point for router. It simply calls all the hooks:
* defines controller
* setups controller

```model(params, transition)``` converts URL into the model for this route.```

```serialize(model, params)``` a hook you can implement to convert the route's model into parameters for the URL.

```renderTemplate(controller, model)``` a hook to render template for the current route. For Ex.:

```javascript
this.render('favoritePost', {
          outlet: 'posts',
          controller: favController
});
```

```render(name, options)``` renders a template into outlet.

Renders a template into an outlet.

This method has a number of defaults, based on the name of the route specified in the router.

For example:

```js
App.Router.map(function() {
  this.route('index');
  this.resource('post', {path: '/posts/:post_id'});
});

App.PostRoute = App.Route.extend({
  renderTemplate: function() {
    this.render();
  }
});
```

The name of the `PostRoute`, as defined by the router, is `post`.

By default, render will:

* render the `post` template
* with the `post` view (`PostView`) for event handling, if one exists
* and the `post` controller (`PostController`), if one exists
* into the `main` outlet of the `application` template

You can override this behavior:

```js
App.PostRoute = App.Route.extend({
  renderTemplate: function() {
    this.render('myPost', {   // the template to render
      into: 'index',          // the template to render into
      outlet: 'detail',       // the name of the outlet in that template
      controller: 'blogPost'  // the controller to use for the template
    });
  }
});
```

Remember that the controller's `content` will be the route's model. In
this case, the default model will be `App.Post.find(params.post_id)`.

@method render
@param {String} name the name of the template to render
@param {Object} options the options

### Connecting view to outlet

var MyView = Ember.View.extend({
  template: Ember.Handlebars.compile('Child view: {{outlet "main"}} ')
});
var myView = MyView.create();
myView.appendTo('body');
// The html for myView now looks like:
// <div id="ember228" class="ember-view">Child view: </div>

var FooView = Ember.View.extend({
  template: Ember.Handlebars.compile('<h1>Foo</h1> ')
});
var fooView = FooView.create();
myView.connectOutlet('main', fooView);



### Application state reuse

```javascript
App.Router.map(function() {
  this.resource('topCharts', function() {
    this.route('choose', { path: '/' });
    this.route('albums');
    this.route('songs');
    this.route('artists');
    this.route('playlists');
  });
});

App.TopChartsChooseRoute = Ember.Route.extend({
  beforeModel: function() {
    var lastFilter = this.controllerFor('application').get('lastFilter');
    this.transitionTo('topCharts.' + (lastFilter || 'songs'));
  }
});

// Superclass to be used by all of the filter routes below
App.FilterRoute = Ember.Route.extend({
  activate: function() {
    var controller = this.controllerFor('application');
    controller.set('lastFilter', this.templateName);
  }
});

App.TopChartsSongsRoute = App.FilterRoute.extend();
App.TopChartsAlbumsRoute = App.FilterRoute.extend();
App.TopChartsArtistsRoute = App.FilterRoute.extend();
App.TopChartsPlaylistsRoute = App.FilterRoute.extend();
```

NICE TO READ
------------
------------

#. http://discuss.emberjs.com/t/some-ideas-i-had-about-composable-reusable-components/2850/17
#. http://www.cerebris.com/blog/2012/03/06/understanding-ember-object/
#. http://emberjs.com/guides/object-model/classes-and-instances/
#. http://emberjs.com/guides/object-model/bindings/
#. http://www.reddit.com/r/programming/comments/1ggvdm/angularjs_vs_ember_its_not_even_close/
