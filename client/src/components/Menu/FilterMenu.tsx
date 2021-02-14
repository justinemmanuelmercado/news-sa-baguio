import React, { useEffect } from 'react'
import { fetchSources, updateFilters } from '../../redux/filters'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import dayjs from 'dayjs'
import xor from 'lodash/xor'

function DateInput(
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) {
    return (
        <input
            {...props}
            className="mt-2 py-3 px-2 rounded-sm focus:ring-2 focus:ring-blue-500 text-base text-black focus-within:ring-2 focus-within:ring-blue-100 ring-1 ring-gray-900"
        />
    )
}

function FilterMenu(): JSX.Element {
    const {
        sources,
        actualFilters: { shownSources, fromDate, toDate },
    } = useSelector((state: RootState) => state.filters)
    const dispatch = useDispatch()
    const dateFormat = 'YYYY-MM-DD'
    const min = '2021-01-01'
    const max = dayjs().format('YYYY-MM-DD')

    const handleCheckboxChange = async (sourceId: string) => {
        dispatch(await updateFilters({ shownSources: xor(shownSources, [sourceId]) }))
    }
    const handleDateChange = async (evt: React.FormEvent<HTMLInputElement>) => {
        switch (evt.currentTarget.id) {
            case 'from':
                dispatch(await updateFilters({ fromDate: evt.currentTarget.value }))
                break
            case 'to':
                console.log(evt.currentTarget.value)
                dispatch(await updateFilters({ toDate: evt.currentTarget.value }))
                break
            default:
                return
        }
    }

    useEffect(() => {
        const fetchAll = async () => {
            dispatch(fetchSources())
        }

        fetchAll()
    }, [])
    return (
        <>
            <div>
                <h2 className="font-bold uppercase">sources</h2>
                <ul className="pt-4 pl-2">
                    {sources.map((source) => {
                        return (
                            <li key={source.id}>
                                <input
                                    onChange={() => handleCheckboxChange(source.id)}
                                    value={source.name}
                                    checked={shownSources.includes(source.id)}
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
                <span className="flex flex-col pt-4 pl-2 space-y-2">
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
