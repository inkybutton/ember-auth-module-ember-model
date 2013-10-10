# ember-model integration module for ember-auth

1. injects signed in session data (if any) to all ember-model server requests
2. optional: auto-loads an ember-model user model upon sign in

## Config

```coffeescript
App.Auth = Em.Auth.extend
  modules: ['emberModel']

  emberModel:
    # [string|false] enable auto-loading user model by setting this to a
    #   *string* of the model type, as in 'App.User', not App.User
    #   or false to disable auto-loading user model
    userModel: false
```

## Usage

```coffeescript
@auth.user # access the auto-loaded user model
```
