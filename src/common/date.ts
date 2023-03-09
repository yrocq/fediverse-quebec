import { formatWithOptions } from 'date-fns/fp'
import { formatDistance } from 'date-fns'

import { fr } from 'date-fns/locale'
export const dateFormatLong = formatWithOptions({ locale: fr }, `d MMMM Y`)
export const dateFormatMonthYear = formatWithOptions({ locale: fr }, 'MMMM Y')
export const dateFormatYearMonth = formatWithOptions({ locale: fr }, 'yyyy-LL')
export const dateFormatDistance = (date1: Date, date2: Date) => {
    return formatDistance(date1, date2, {'locale': fr});
}