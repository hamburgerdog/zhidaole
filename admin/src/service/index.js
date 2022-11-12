export const getReleaseByIDList = async idList => {
  const param = idList.map(id => `idList=${id}`).join('&')
  const result = await fetch(`/origin/seachReleaseByIDList?${param}`, {
    method: 'GET',
  })
  const {
    data,
  } = await result.json()
  return data
}