import {expect} from 'chai';
import EventEmitter from 'events';
import eventIterator from '../src/index';

class MockEmitter extends EventEmitter {}

describe('eventIterator', () => {
  it('throws error on invalid arguments', () => {
    const mockEmitter = {on: () => true};

    expect(() => eventIterator()).to.throw(Error);
    expect(() => eventIterator('a')).to.throw(Error);
    expect(() => eventIterator(true)).to.throw(Error);
    expect(() => eventIterator({})).to.throw(Error);
    expect(() => eventIterator(mockEmitter)).to.throw(Error);
    expect(() => eventIterator(mockEmitter, '')).to.throw(Error);
    expect(() => eventIterator(mockEmitter, 1)).to.throw(Error);
    expect(() => eventIterator(mockEmitter, {})).to.throw(Error);
    expect(() => eventIterator(mockEmitter, true)).to.throw(Error);
    expect(() => eventIterator({}, 'name')).to.throw(Error);
    expect(() => eventIterator(true, 'name')).to.throw(Error);
    expect(() => eventIterator('a', 'name')).to.throw(Error);
  });

  it('throws error if Promise not available', () => {
    const mockEmitter = {on: () => true};
    const oldPromise = Promise;
    global.Promise = undefined;

    expect(() => eventIterator(mockEmitter, 'name')).to.throw(Error);

    global.Promise = oldPromise;
  });

  it('resolves promise when event emitted', (done) => {
    const mockEmitter = new MockEmitter();
    const {nextEvent} = eventIterator(mockEmitter, 'someEvent');
    const promise = nextEvent();
    const payloads = [{a: 1}, {b: 2}];
    let resolved, resolvedSecond;

    resolved = false;
    resolvedSecond = false;

    expect(promise).to.be.a('Promise');

    promise.then((firstValue) => {
      resolved = true;
      expect(firstValue).to.be.eql(payloads[0]);

      const nextPromise = nextEvent();

      nextPromise.then((secondValue) => {
        resolvedSecond = true;
        expect(secondValue).to.be.eql(payloads[1]);
        done();
      });

      expect(resolvedSecond).to.be.eql(false);
      setTimeout(() => {
        mockEmitter.emit('someEvent', payloads[1]);
      }, 50);
    });

    expect(resolved).to.be.eql(false);
    setTimeout(() => {
      mockEmitter.emit('someEvent', payloads[0]);
    }, 50);
  });
});
