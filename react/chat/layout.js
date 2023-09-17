export default function Chat() {
    return (
        <div className="">
            <div
                className="hidden sm:block sm:fixed sm:left-0 sm:h-full sm:bg-white sm:border-r sm:border-gray/20 z-10"
            >
                Sidebar
            </div>

            <div className="z-0">
                <div className="bg-white">
                    <div className="">
                        Prompt
                    </div>

                    <div className="fixed bottom-0 w-full bg-white">
                        Input
                    </div>
                </div>
            </div>
        </div>
    )
}
