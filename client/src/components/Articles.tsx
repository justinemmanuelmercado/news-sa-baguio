import React, { useEffect, useState } from 'react'
import { sb } from '../api'

function Articles(): JSX.Element {
    const [articles, setArticles] = useState<unknown>()
    useEffect(() => {
        const getArticles = async () => {
            const result = await sb.getArticles()
            console.log(result)
            if (result) {
                setArticles(result)
            }
        }

        getArticles()
    }, [])
    return <div>Articles</div>
}

export default Articles
