export function myClassTransformer(obj) {
  if (obj instanceof Array) {
    return obj.map((item) => {
      return removeCircular(item);
    });
  }
  return removeCircular(obj);
}

function removeCircular(obj, seen = new WeakSet()) {
  if (typeof obj === "object" && obj !== null) {
    if (seen.has(obj)) {
      return null;
    }
    seen.add(obj);
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        //do nothing when its a date
        if (obj[key] instanceof Date) {
          newObj[key] = obj[key];
          continue;
        }
        let value = removeCircular(obj[key], seen);
        if (value) {
          newObj[key] = value;
        }
      }
    }
    return newObj;
  }
  return obj;
}
