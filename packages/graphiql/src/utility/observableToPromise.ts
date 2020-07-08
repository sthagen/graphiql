import { Observable } from '../types';

export function observableToPromise<T>(
  observable: Observable<T> | Promise<T>,
): Promise<T> {
  if (!isObservable<T>(observable)) {
    return observable;
  }
  return new Promise((resolve, reject) => {
    const subscription = observable.subscribe(
      v => {
        resolve(v);
        subscription.unsubscribe();
      },
      reject,
      () => {
        reject(new Error('no value resolved'));
      },
    );
  });
}

// Duck-type observable detection.
export function isObservable<T>(value: any): value is Observable<T> {
  return (
    typeof value === 'object' &&
    'subscribe' in value &&
    typeof value.subscribe === 'function'
  );
}
