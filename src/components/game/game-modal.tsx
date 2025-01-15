export default function GameModal({
  heading,
  description,
  actions,
}: ModalProps) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-10 grid place-items-center bg-black/70">
      <section className="flex w-full flex-col place-items-center bg-semidark-navy py-12 uppercase">
        <h1 className="text-base font-bold text-silver">{heading}</h1>
        <p className="mb-6 mt-4 flex items-center gap-x-6">{description}</p>
        {actions}
      </section>
    </div>
  )
}
