if (Meteor.isClient) {
  Blaze.TemplateInstance.prototype.parent = function (height) {
    var template = this;
    for (var i = 0; (i < height) && template; i++) {
      var view = template.view.parentView;

      while (view && ! view.template)
        view = view.parentView;

      if (! view)
        return null;

      // Body view has template field, but not templateInstance,
      // which more or less signals that we reached the top.
      if (! view.templateInstance)
        return null;

      template = view.templateInstance();
    }

    return template;
  };

  Blaze.TemplateInstance.prototype.get = function (fieldName) {
    var template = this;
    while (template) {
      if (_.has(template, fieldName))
        return template[fieldName];
      template = template.parent(1);
    }

    return null;
  }
  
  Template.hello.helpers({
    templateInstanceVariable: function () {
      return Template.instance().get('_foobar');
    }
  });

  Template.noop.created = function () {
    this._foobar = 42;
  }

  Template.helloWithVariable.created = function () {
    this._foobar = 42;
  }
}
