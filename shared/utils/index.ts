export const addQueryParams = (value: any) => {
  const data = { ...value }
  Object.keys(data).forEach((e) => (data[e] === '' || typeof data[e] === 'object' || !data[e]?.toString().length) && delete data[e])
  return new URLSearchParams(data)?.toString()
}

export const parseParams = (params = ''): Record<string, string> => {
  const urlParams = new URLSearchParams(decodeURIComponent(params))
  const rawParams = decodeURIComponent(params).replace('?', '').split('&')

  const extractedParams: Record<string, string> = {}
  if (rawParams[0]) {
    rawParams.forEach((item) => {
      const itemData = item.split('=')
      extractedParams[itemData[0]] = urlParams.get(itemData[0]) ? urlParams.get(itemData[0])! : ''
    })
    return extractedParams
  } else {
    return extractedParams
  }
}

export const months: any = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
}

export const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const convertDate = (data: string) => {
  if (data && isNaN(Number(data))) {
    return new Date(data)
  } else if (data) {
    return new Date(Number(data))
  } else {
    return new Date()
  }
}

export const appendParams = (value: any) => {
  const params = parseParams(location.search)
  const data = { ...params, ...value }
  Object.keys(data).filter((e) => (data[e] === '' || !data[e].toString().length) && delete data[e])
  window.history.pushState({}, '', `${location.pathname}?${new URLSearchParams(data).toString()}`)
}

export function formatDate(date: string, separator = '-', reverseDate = false) {
  const d = new Date(date).toString().split(' ')
  const formatted = reverseDate ? [d[2], months[d[1]], d[3]].reverse() : [d[2], months[d[1]], d[3]]
  return date && formatted.join(separator)
}
