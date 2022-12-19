const startYear = new Date(2000, 0, 1)

const getYearDiff = (first, second) => {
  const ms = first - second // miliseconds from epoch
  const year = new Date(ms)
  return Math.abs(year.getUTCFullYear() - 1970)
}

export const years = new Array(getYearDiff(new Date(), startYear)).fill(0).map((_, i) => 2000 + i)

export const months = [
  {
    label: 'January',
    value: 1,
  },
  {
    label: 'February',
    value: 2,
  },
  {
    label: 'March',
    value: 3,
  },
  {
    label: 'April',
    value: 4,
  },
  {
    label: 'May',
    value: 5,
  },
  {
    label: 'June',
    value: 6,
  },
  {
    label: 'July',
    value: 7,
  },
  {
    label: 'August',
    value: 8,
  },
  {
    label: 'September',
    value: 9,
  },
  {
    label: 'October',
    value: 10,
  },
  {
    label: 'November',
    value: 11,
  },
  {
    label: 'December',
    value: 12,
  },
]

export const days = month => {
  let count = 31

  if (month % 2 === 0) {
    count = 30
  }

  if (month === 2) {
    count = 28
  }

  return new Array(count).fill(0).map((_, i) => i + 1)
}
