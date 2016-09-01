const eventIterator = (emitter, eventName) => {
  if (typeof Promise === 'undefined') {
    throw new Error('an available Promise global is required');
  }

  if (!emitter || typeof emitter.on !== 'function') {
    throw new Error('emitter must have an "on" function property');
  }

  if (typeof eventName !== 'string' || !eventName) {
    throw new Error('eventName must be a string');
  }

  let deferred;

  emitter.on(eventName, (payload) => {
    if (deferred) {
      deferred.resolve(payload);
      deferred = null;
    }
  });

  return {
    nextEvent () {
      if (!deferred) {
        deferred = {};
        deferred.promise = new Promise((resolve) => {
          deferred.resolve = resolve;
        });
      }

      return deferred.promise;
    }
  };
};

export default eventIterator;
