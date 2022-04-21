const API = "admin"

export const getMessage = async () => {
  const result = await fetch(`/${API}/getMessage`, {
    method: 'GET',
  })
  return await result.json()
}

export const getRelease = async () => {
  const result = await fetch(`/${API}/getRelease`, {
    method: 'GET',
  })
  return await result.json()
}

export const getUser = async () => {
  const result = await fetch(`/${API}/getUser`, {
    method: 'GET',
  })
  return await result.json()
}