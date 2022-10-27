import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import IssueCard from './IssueCard'

const DraggableIssueCard = ({ card }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : undefined,
    backgroundColor: isDragging ? '#562BF7' : undefined,
  }

  return <IssueCard ref={setNodeRef} {...attributes} {...listeners} card={card} style={style} />
}

export default DraggableIssueCard
