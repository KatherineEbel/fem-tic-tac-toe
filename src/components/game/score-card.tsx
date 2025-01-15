import { cn } from '../../utils.ts'

type ScoreCardProps = Readonly<{
  label: string
  value: number
  color: 'bg-blue' | 'bg-yellow' | 'bg-silver'
}>
export default function ScoreCard({ color, label, value }: ScoreCardProps) {
  return (
    <section
      className={cn(
        'flex flex-col place-items-center rounded-2xl py-2.5 sm:py-3.5',
        color
      )}
    >
      <h2 className="text-sm font-medium uppercase">{label}</h2>
      <p className="font-bold">{value}</p>
    </section>
  )
}
