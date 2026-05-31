export default function Navbar() {

  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Retail POS System
        </h1>

        <p className="text-slate-500 text-sm">
          Omnichannel Retail Management Platform
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold text-slate-700">
            Inventory Manager
          </p>

          <p className="text-sm text-slate-500">
             RBAC Enabled
          </p>

        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          A
        </div>

      </div>

    </div>
  )
}
