import React, { useEffect, useState } from 'react'
import { fetchSources } from '../../redux/filters'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import dayjs from 'dayjs'

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
    const { sources, hiddenSources } = useSelector((state: RootState) => state.filters)
    const dispatch = useDispatch()
    const [from, setFrom] = useState(dayjs().subtract(7, 'days'))
    const [to, setTo] = useState(dayjs())
    const dateFormat = 'YYYY-MM-DD'
    const min = '2021-01-01'
    const max = dayjs().format('YYYY-MM-DD')

    const handleDateChange = (evt: React.FormEvent<HTMLInputElement>) => {
        switch (evt.currentTarget.id) {
            case 'from':
                setFrom(dayjs(evt.currentTarget.value))
                break
            case 'to':
                setTo(dayjs(evt.currentTarget.value))
                break
            default:
                return
        }
    }

    useEffect(() => {
        const fetchAll = async () => {
            await dispatch(fetchSources())
        }

        fetchAll()
    }, [])
    return (
        <>
            <span>
                <span className="font-bold uppercase">sources</span>
                <ul className="pt-4 pl-2">
                    {sources.map((source) => {
                        return (
                            <li key={source.id}>
                                <input
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
            </span>
            <div>
                <span className="font-bold uppercase">date</span>
                <span className="flex flex-col pt-4 pl-2 space-y-2">
                    <span className="flex flex-col">
                        <label htmlFor="from">From:</label>
                        <DateInput
                            id="from"
                            placeholder={dateFormat}
                            value={from.format(dateFormat)}
                            onChange={handleDateChange}
                            min={min}
                            max={to.format(dateFormat)}
                            type="date"
                        />
                    </span>
                    <span className="flex flex-col">
                        <label htmlFor="to">To:</label>
                        <DateInput
                            id="to"
                            value={to.format(dateFormat)}
                            placeholder={dateFormat}
                            onChange={handleDateChange}
                            min={from.format(dateFormat)}
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
