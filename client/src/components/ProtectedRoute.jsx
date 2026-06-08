export default function ProtectedRoute({

  children,

  allowedRoles

}) {

  const user =
    JSON.parse(
      localStorage.getItem(
        'user'
      )
    )

  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

          <h1 className="text-4xl font-bold text-red-500 mb-4">

            Access Denied

          </h1>

          <p className="text-slate-500">

            Please login first

          </p>

        </div>

      </div>
    )
  }

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

          <h1 className="text-4xl font-bold text-red-500 mb-4">

            Unauthorized Access

          </h1>

          <p className="text-slate-500">

            You do not have permission to access this module

          </p>

        </div>

      </div>
    )
  }

  return children
}
