export function RestaurantCardSkeleton() {
  return (
    <div className="card-food overflow-hidden">
      <div className="skeleton h-48 rounded-t-3xl rounded-b-none" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-2/3 rounded-xl" />
        <div className="skeleton h-4 w-1/2 rounded-xl" />
        <div className="flex gap-3">
          <div className="skeleton h-4 w-16 rounded-xl" />
          <div className="skeleton h-4 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
