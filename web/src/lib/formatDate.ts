const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 30
const YEAR = DAY * 365

export const formatDate = (date: string) => {
  // convert date string to number and create new Date obj
  let formattedDate = new Date(+date)
  return formattedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getTimeAgo = (dateToFormat: string) => {
  // convert date string to number and create new Date obj
  let date = new Date(+dateToFormat)
  const secondsAgo = Math.round((Date.now() - Number(date)) / 1000)

  if (secondsAgo < MINUTE) {
    return ` less than a minute ago`
  }

  let divisor
  let unit = ''

  if (secondsAgo < HOUR) {
    ;[divisor, unit] = [MINUTE, 'minute']
  } else if (secondsAgo < DAY) {
    ;[divisor, unit] = [HOUR, 'hour']
  } else if (secondsAgo < WEEK) {
    ;[divisor, unit] = [DAY, 'day']
  } else if (secondsAgo < MONTH) {
    ;[divisor, unit] = [WEEK, 'week']
  } else if (secondsAgo < YEAR) {
    ;[divisor, unit] = [MONTH, 'month']
  } else {
    ;[divisor, unit] = [YEAR, 'year']
  }

  const count = Math.floor(secondsAgo / divisor)
  return `${count} ${unit}${count > 1 ? 's' : ''} ago`
}
