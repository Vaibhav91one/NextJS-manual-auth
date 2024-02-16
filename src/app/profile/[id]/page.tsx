
const UserProfile = ({params}: any) => {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center py-2">
        <p className="text-4xl">{params.id}</p>
      </div>
    )
  }
  
  export default UserProfile
  