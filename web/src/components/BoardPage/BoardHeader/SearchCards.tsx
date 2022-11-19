import { TextInput } from '@mantine/core'
import useDebouncedCallback from 'hooks/useDebounce'
import React from 'react'
import { useBoardStore } from 'store/boardStore'

const SearchCards = () => {
  const { filterCardsByText } = useBoardStore((state) => ({
    filterCardsByText: state.filterCardsByText,
  }))

  const debouncedSearch = useDebouncedCallback((v) => filterCardsByText(v), 650)

  const handleSearch = (e: any) => {
    debouncedSearch(e.target.value)
  }

  return <TextInput onChange={handleSearch} placeholder='Search' size='xs' sx={{ maxWidth: '150px' }} />
}

export default SearchCards
