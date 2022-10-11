// fetch url with data
export default function fetcher(url: string, data: any = undefined) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(data),
  }).then(async (res) => {
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data?.message)
    }
    return res.json()
  })
}
