const VideoTitle = ({title , overview}) => {
    return (
        <div className=" aspect-video pt-[18%] px-24 w-full absolute text-white bg-gradient-to-r from-black h-full">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="py-6 text-lg w-1/2">{overview}</p>
            <div className="flex gap-1 justify-between w-[30%]">
                <button className="bg-white text-black py-4 px-10 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80 z-10">Play</button>
                <button className="bg-gray-500 text-white py-4 px-10 text-xl bg-opacity-50 rounded-lg z-10">More Info</button>
            </div>
        </div>
    )
}
export default VideoTitle;