const VideoTitle = ({title , overview}) => {
    return (
        <div className="aspect-video pt-[16%] px-24 w-full absolute text-white bg-gradient-to-r from-black h-full">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="py-4 text-lg max-w-[60%] min-w-[50%]">{overview}</p>
            <div className="flex gap-1 justify-between w-[30%]">
                <button className="text-black bg-white py-4 px-10 text-xl rounded-lg relative z-10 font-bold">Play</button>
                <button className="bg-gray-500 text-white py-4 px-10 text-xl bg-opacity-50 rounded-lg z-10">More Info</button>
            </div>
        </div>
    )
}
export default VideoTitle;