const API = "admin"

export const getMessage = async () => {
  const result = await fetch(`/${API}/getMessage`, {
    method: 'GET',
  })
  return await result.json()
}