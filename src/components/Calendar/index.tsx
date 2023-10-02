import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";
import { getWeekDays } from "../../utils/get-week-days";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

interface CalendarWeek {
    week: number
    days: Array<{
        date: dayjs.Dayjs
        disabled: boolean
    }>
}

type CalendarWeeks = CalendarWeek[]

export function Calendar() {

    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs().set('date', 1)
    })

    function handlePreviewMonth() {
        const previousMonthDate = currentDate.subtract(1, 'month')
        setCurrentDate(previousMonthDate)
    }


    function handleNextMonth() {
        const nextMonthDate = currentDate.add(1, 'month')
        setCurrentDate(nextMonthDate)
    }

    const shortWeekDays = getWeekDays({ short: true })

    const currentMonth = currentDate.format('MMMM')
    const currentYear = currentDate.format('YYYY')

    const calendarWeeks = useMemo(() => {
        const daysInMonthsArray = Array.from({
            length: currentDate.daysInMonth(),
        }).map((_, i) => {
            return currentDate.set('date', i + 1)
        })

        const firstWeekDay = currentDate.get('day')

        const previousMonthFillArray = Array.from({
            length: firstWeekDay,
        })
            .map((_, i) => {
                return currentDate.subtract(i + 1, 'day')
            }).reverse()

        const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth())
        const lastWeekDay = lastDayInCurrentMonth.get('day')

        const nextMonthFillArray = Array.from({
            length: 7 - (lastWeekDay + 1),
        }).map((_, i) => {
            return lastDayInCurrentMonth.add(i + 1, 'day')
        })

        const calendarDays = [
            ...previousMonthFillArray.map(date => {
                return { date, disabled: true }
            }),

            ...daysInMonthsArray.map(date => {
                return { date, disabled: false }
            }),

            ...nextMonthFillArray.map(date => {
                return { date, disabled: true }
            })
        ]

        const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
            (weeks, _, i, original) => {
                const weekHasEnded = (i % 7)

                if (!weekHasEnded) {

                }
            }, [])

        return calendarDays
    }, [currentDate])

    return (
        <CalendarContainer>
            <CalendarHeader>
                <CalendarTitle>
                    {currentMonth} <span>{currentYear}</span>
                </CalendarTitle>
                <CalendarActions>
                    <button onClick={handlePreviewMonth} title="Previous Month">
                        <CaretLeft />
                    </button>
                    <button onClick={handleNextMonth} title="Next Month">
                        <CaretRight />
                    </button>
                </CalendarActions>
            </CalendarHeader>
            <CalendarBody>
                <thead>
                    <tr>
                        {shortWeekDays.map(weekDay => <th key={weekDay}>{weekDay}.</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <CalendarDay>1</CalendarDay>
                        </td>
                        <td>
                            <CalendarDay>2</CalendarDay>
                        </td>
                        <td>
                            <CalendarDay>3</CalendarDay>
                        </td>
                    </tr>
                </tbody>
            </CalendarBody>
        </CalendarContainer>
    )
}