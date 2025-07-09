const VideoTitle = ({title , overview}) => {
    return (
        <div className="aspect-video pt-[25%] xl:pt-[16%] px-12 lg:px-24 w-full absolute text-white bg-gradient-to-r from-black h-full md:mt-0 mt-[50%]">
            <h1 className="text-2xl lg:text-4xl font-bold mb-0 max-xl:mb-2">{title}</h1>
            <p className="py-4 text-lg max-w-[60%] min-w-[50%] max-lg:hidden inline-block">{overview}</p>
            <div className="flex gap-1 justify-between w-[30%]">
                <button className="text-black bg-white px-4 py-1 h-1/2 lg:h-full lg:py-4 lg:px-10 text-lg lg:text-xl rounded-lg relative z-10 font-bold">Play</button>
                <button className="bg-gray-500 text-white px-4 py-1 lg:py-4 lg:px-10 text-xl bg-opacity-50 rounded-lg z-10 max-xl:hidden inline-block">More Info</button>
            </div>
        </div>
    )
}
export default VideoTitle;