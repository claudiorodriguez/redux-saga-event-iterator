# redux-saga-event-iterator

[![Build Status][travis-image]][travis-url]

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
[travis-image]: https://travis-ci.org/claudiorodriguez/ngrammer.svg?branch=master
[travis-url]: https://travis-ci.org/claudiorodriguez/ngrammer
[license-url]: ./LICENSE
