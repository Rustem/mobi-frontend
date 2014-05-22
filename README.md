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



