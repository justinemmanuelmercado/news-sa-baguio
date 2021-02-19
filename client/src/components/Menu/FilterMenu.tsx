import React from 'react'
import { NewsSource } from '../../redux/filters'
import dayjs from 'dayjs'
import xor from 'lodash/xor'
import { Filters } from '../../App'

function DateInput(
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) {
    return (
        <input
            {...props}
            className="mt-2 py-4 px-2 rounded-sm text-base text-gray-700 border border-gray-300 bg-gray-50"
        />
    )
}

function FilterMenu({
    sources,
    filters,
    setFilters,
    sourcesStatus,
}: {
    sources: NewsSource[]
    filters: Filters
    setFilters: (f: Filters) => void
    sourcesStatus: string
}): JSX.Element {
    const { hiddenSources, fromDate, toDate } = filters
    const dateFormat = 'YYYY-MM-DD'
    const min = '2021-01-01'
    const max = dayjs().format('YYYY-MM-DD')

    const handleFilterChange = (newFilters: Partial<Filters>): void => {
        setFilters({ ...filters, ...newFilters })
    }

    const handleCheckboxChange = async (sourceId: string) => {
        handleFilterChange({ hiddenSources: xor(hiddenSources, [sourceId]) })
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
        <>
            <div>
                <h2 className="font-bold uppercase">sources</h2>
                <ul className="pt-4">
                    {sourcesStatus === 'loading' && (
                        <div className="space-y-4">
                            <li>
                                <div className="h-2 animate-pulse bg-gray-200 rounded"></div>
                            </li>
                            <li>
                                <div className="h-2 animate-pulse bg-gray-200 rounded"></div>
                            </li>
                            <li>
                                <div className="h-2 animate-pulse bg-gray-200 rounded"></div>
                            </li>
                            <li>
                                <div className="h-2 animate-pulse bg-gray-200 rounded"></div>
                            </li>
                        </div>
                    )}

                    {sourcesStatus === 'success' &&
                        sources.map((source) => {
                            return (
                                <li key={source.id}>
                                    <input
                                        onChange={() => handleCheckboxChange(source.id)}
                                        value={source.name}
                                        checked={!hiddenSources.includes(source.id)}
                                        className="cursor-pointer"
                                        type="checkbox"
                                        name={source.name}
                                        id={source.name}
                                    />{' '}
                                    <label className="cursor-pointer" htmlFor={source.name}>
                                        {source.name}
                                    </label>
                                </li>
                            )
                        })}
                </ul>
            </div>
            <div>
                <h2 className="font-bold uppercase">date</h2>
                <span className="flex flex-col pt-4 space-y-2">
                    <span className="flex flex-col">
                        <label htmlFor="from">From:</label>
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
                        <label htmlFor="to">To:</label>
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
        </>
    )
}

export default FilterMenu
