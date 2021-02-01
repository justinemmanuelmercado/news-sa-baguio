import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, fetchArticles } from '../store'

function Articles(): JSX.Element {
    const dispatch = useDispatch()
    const { articles } = useSelector((state: RootState) => state.articles)
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchArticles())
        }
        fetchData()
    }, [])
    console.log(articles)

    return <div>{articles.length}</div>
}

export default Articles
