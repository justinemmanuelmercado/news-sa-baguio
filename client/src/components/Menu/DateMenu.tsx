import dayjs from 'dayjs'
import React from 'react'
import { Filters } from '../../App'

function DateInput(
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) {
    return (
        <input
            {...props}
            className="mt-2 p-2 rounded-sm text-base text-gray-700 border border-gray-300 bg-gray-100"
        />
    )
}

function DateMenu({
    filters,
    setFilters,
}: {
    filters: Filters
    setFilters: (f: Filters) => void
}): JSX.Element {
    const { fromDate, toDate } = filters

    const dateFormat = 'YYYY-MM-DD'
    const min = '2021-01-01'
    const max = dayjs().format('YYYY-MM-DD')

    const handleFilterChange = (newFilters: Partial<Filters>): void => {
        setFilters({ ...filters, ...newFilters })
    }
    const handleDateChange = (evt: React.FormEvent<HTMLInputElement>) => {
        switch (evt.currentTarget.id) {
            case 'from':
                handleFilterChange({ fromDate: evt.currentTarget.value })
                break
            case 'to':
                handleFilterChange({ toDate: evt.currentTarget.value })
                break
            default:
                return
        }
    }

    return (
        <div>
            <span className="flex flex-col space-y-2">
                <span className="flex flex-col">
                    <label htmlFor="from">From</label>
                    <DateInput
                        id="from"
                        placeholder={dateFormat}
                        value={fromDate}
                        onChange={handleDateChange}
                        min={min}
                        max={toDate}
                        type="date"
                    />
                </span>
                <span className="flex flex-col">
                    <label htmlFor="to">To</label>
                    <DateInput
                        id="to"
                        value={toDate}
                        placeholder={dateFormat}
                        onChange={handleDateChange}
                        min={fromDate}
                        max={max}
                        type="date"
                    />
                </span>
            </span>
        </div>
    )
}

export default DateMenu
