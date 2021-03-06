// Generated by EmberScript 0.0.7
var get$ = Ember.get;
Em.onLoad('Ember.Application', function (application) {
  application.initializer({
    name: 'ember-auth.module.ember-model',
    before: 'ember-auth-load',
    initialize: function (container, app) {
      app.register('authModule:emberModel', get$(get$(Em, 'Auth'), 'EmberModelAuthModule'), { singleton: true });
      return app.inject('authModule:emberModel', 'auth', 'auth:main');
    }
  });
  return application.initializer({
    name: 'ember-auth.module.ember-model-load',
    after: 'ember-auth-load',
    initialize: function (container, app) {
      return container.lookup('authModule:emberModel');
    }
  });
});// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(Em, 'Auth'), 'EmberModelAuthModule', Ember.Object.extend({
  init: function () {
    get$(this, 'auth')._config('emberModel', get$(this, '_defaultConfig'));
    null != get$(this, 'config') || set$(this, 'config', get$(this, 'auth')._config('emberModel'));
    this.patch();
    get$(this, 'auth').reopen({ user: get$(Em, 'computed').alias('module.emberModel.user') });
    get$(this, 'auth').addHandler('signInSuccess', get$(this, 'findUser').bind(this));
    get$(this, 'auth').addHandler('signInError', get$(this, 'clearUser').bind(this));
    return get$(this, 'auth').addHandler('signOutSuccess', get$(this, 'clearUser').bind(this));
  },
  _defaultConfig: { userModel: false },
  user: null,
  findUser: function () {
    var model, this$;
    if (!(null != get$(get$(this, 'auth'), 'userId') && (model = Em.get(get$(get$(this, 'config'), 'userModel')))))
      return;
    return model.fetch(get$(get$(this, 'auth'), 'userId')).then((this$ = this, function (user) {
      return set$(this$, 'user', user);
    }));
  },
  clearUser: function () {
    return set$(this, 'user', null);
  },
  patch: function () {
    var self;
    self = this;
    return Ember.RESTAdapter.reopen({
      _ajax: function (url, params, method, settings) {
        return this._super(url, params, method, get$(get$(self, 'auth'), '_strategy').serialize(settings || {}));
      }
    });
  }
}));