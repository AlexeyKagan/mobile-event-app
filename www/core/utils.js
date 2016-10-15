export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/** TODO: @ Write Get method which will get metadata by dots.
 *
 * @example
 * const obj = {
 *  foo: {
 *    bar: 4
 *  }
 * }
 *
 * get('foo.bar') => 4
 */
function get(key) {

}