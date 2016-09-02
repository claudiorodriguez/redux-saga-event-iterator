# redux-saga-event-iterator

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

An easy way of consuming an EventEmitter (e.g. [socket.io][socket-io]) in [redux-saga][redux-saga]

## Installation

Install using [npm](http://npmjs.org/):

```bash
$ npm install --save redux-saga-event-iterator
```

## Example

```javascript
import {call} from 'redux-saga/effects';
import eventIterator from 'redux-saga-event-iterator';
import io from 'socket.io-client';

const socketClient = io('localhost:12345');

const listenerSaga = function * (eventName) {
  const {nextEvent} = yield call(eventIterator, socketClient, eventName);

  while (true) {
    const payload = yield call(nextEvent);

    // Do something with payload
  }
};
```

## Testing

To run the tests:

```bash
$ npm test
```

## Contributing

Feel free to create a pull request.
Make sure to lint and test:

```bash
$ npm run lint && npm run test
```

## License

MIT - see [LICENSE][license-url]

[redux-saga]: https://github.com/yelouafi/redux-saga
[socket-io]: https://github.com/socketio/socket.io
[travis-image]: https://travis-ci.org/claudiorodriguez/redux-saga-event-iterator.svg?branch=master
[travis-url]: https://travis-ci.org/claudiorodriguez/redux-saga-event-iterator
[coveralls-image]: https://coveralls.io/repos/github/claudiorodriguez/redux-saga-event-iterator/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/claudiorodriguez/redux-saga-event-iterator?branch=master
[license-url]: ./LICENSE
