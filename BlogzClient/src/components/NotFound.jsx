import { useNavigate } from "react-router-dom"


const NotFound = () => {
    const navigate = useNavigate()
    return(
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-12 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <h1 className="my-2 text-gray-200 font-bold text-2xl">
                                Looks like you've found the
                                doorway to the great nothing
                            </h1>
                            <p>No blogs found.</p>
                            <p className="my-2 text-gray-200">Sorry about that! Please visit our hompage to get where you need to go.</p>
                            <button onClick={() => {
                                navigate('/')
                            }} className="sm:w-full mt-5 lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me home!</button>
                        </div>
                    </div>
                    <div>
                        <img className="opacity-10" src="https://i.ibb.co/G9DC8S0/404-2.png" />
                    </div>
                </div>
            </div>
            <div>
                <img className="opacity-30" src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>
    )
}

export default NotFound