import Login from "./Login"

export default function Home({ user }: { user: any }) {
    return (
        <div className="card flex items-center justify-center">
            <div className="sm:w-1/2 flex flex-col items-center">
                <h1 className=" text-center mb-12 text-midnight text-3xl font-bold">דף ריכוז טפסים</h1>
                {user != null && <> <h2 className=" text-center text-xl text-midnight font-bold">
                    {user.name} שלום 👋
                </h2>
                    <h2 className="text-center mb-12 text-xl text-midnight font-bold">
                        יש לך 0 שעות מאושרות 🎉
                    </h2>
                </>}
                <Login />
            </div>
            <div className="w-1/2 p-5 sm:block hidden">
                <img src="/KedmaLogo.png" className="max-h-96" />
            </div>

        </div>
    )
}