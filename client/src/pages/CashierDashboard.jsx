import Orders from './Orders'

export default function CashierDashboard({
  setActivePage
}) {

  return (

    <div>

      <Orders
        setActivePage={
          setActivePage
        }
      />

    </div>
  )
}
