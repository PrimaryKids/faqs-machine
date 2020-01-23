import camelcaseKeys from 'camelcase-keys'

export const transformResponse = async response => {
  const json = await response.json()
  return camelcaseKeys(json, { deep: true })
}
