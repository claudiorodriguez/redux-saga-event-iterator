import test from 'ava';
import EventEmitter from 'events';
import eventIterator from '../src/index';

class MockEmitter extends EventEmitter {}

test('throws error on invalid arguments', (t) => {
  const mockEmitter = {on: () => true};

  t.throws(() => eventIterator());
  t.throws(() => eventIterator('a'));
  t.throws(() => eventIterator(true));
  t.throws(() => eventIterator({}));
  t.throws(() => eventIterator(mockEmitter));
  t.throws(() => eventIterator(mockEmitter, ''));
  t.throws(() => eventIterator(mockEmitter, 1));
  t.throws(() => eventIterator(mockEmitter, {}));
  t.throws(() => eventIterator(mockEmitter, true));
  t.throws(() => eventIterator({}, 'name'));
  t.throws(() => eventIterator(true, 'name'));
  t.throws(() => eventIterator('a', 'name'));
});

test('throws error if Promise not available', (t) => {
  const mockEmitter = {on: () => true};
  const oldPromise = Promise;
  global.Promise = undefined;

  t.throws(() => eventIterator(mockEmitter, 'name'));

  global.Promise = oldPromise;
});

test('iterator runs in sequence', function * (t) {
  const mockEmitter = new MockEmitter();
  const {nextEvent} = eventIterator(mockEmitter, 'someEvent');
  const payloads = [{a: 1}, {b: 2}];

  setTimeout(() => {
    mockEmitter.emit('someEvent', payloads[0]);
  }, 50);
  setTimeout(() => {
    mockEmitter.emit('someEvent', payloads[1]);
  }, 100);

  const firstValue = yield nextEvent();
  t.is(firstValue, payloads[0]);

  const secondValue = yield nextEvent();
  t.is(secondValue, payloads[1]);
});
