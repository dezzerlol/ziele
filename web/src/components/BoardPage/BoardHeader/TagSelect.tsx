import TagSelectItem from '@components/Select/Tags/TagSelectItem'
import TagSelectValue from '@components/Select/Tags/TagSelectValue'
import { MultiSelect } from '@mantine/core'
import React from 'react'
import { useBoardStore } from 'store/boardStore'
import { ProjectType } from 'types/ziele'

const TagSelect = ({ project }: { project: ProjectType }) => {
  const { filterCardsByTags, clearFilters } = useBoardStore((state) => ({
    filterCardsByTags: state.filterCardsByTags,
    clearFilters: state.clearFilters,
  }))

  const tags = project.tags.map((tag) => ({ label: tag.body, value: tag.body, color: tag.color }))

  const handleFilter = (e: any) => {
    console.log(e.length)
    if (e.length == 0) {
      return clearFilters()
    }

    filterCardsByTags(e)
  }

  return (
    <MultiSelect
      size='xs'
      variant='filled'
      data={tags}
      onChange={handleFilter}
      itemComponent={TagSelectItem}
      valueComponent={TagSelectValue}
      placeholder='Tag'
      sx={{ maxWidth: '150px' }}
      clearButtonLabel='Clear selection'
      clearable
    />
  )
}

export default TagSelect
