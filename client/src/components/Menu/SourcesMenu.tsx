import React from 'react'
import { NewsSource } from '../../redux/filters'
import xor from 'lodash/xor'
import { Filters } from '../../App'

function SourcesMenu({
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
    const { hiddenSources } = filters

    const handleFilterChange = (newFilters: Partial<Filters>): void => {
        setFilters({ ...filters, ...newFilters })
    }

    const handleCheckboxChange = async (sourceId: string) => {
        handleFilterChange({ hiddenSources: xor(hiddenSources, [sourceId]) })
    }

    return (
        <>
            <div>
                <ul>
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
        </>
    )
}

export default SourcesMenu
