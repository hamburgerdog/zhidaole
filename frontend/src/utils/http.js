export const mapObjectToURLParams = (obj) => {
  if (typeof obj !== 'object') {
    throw new Error("please use object !!!")
  }
  const objPropsNames = Object.getOwnPropertyNames(obj)
  const paramString = objPropsNames.map(name => {
    if (typeof obj[name] !== 'object') {
      return `${name}=${obj[name]}`
    }
    return `${name}=${JSON.stringify(obj[name])}`
  }).join('&')
  return `?${paramString}`
}
