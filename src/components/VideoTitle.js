
const VideoTitle = ( {title,overview}) => {
    return (
        <div className=" w-screen aspect-video   pt-[10%] md:px-24 absolute">
              <h1 className="text-sm  md:text-4xl font-bold w-2/4 bg-gradient-to-r from-black text-white">{title}</h1>
              <p className="hidden md:inline-block py-6 text-lg w-1/4 bg-gradient-to-r from-black text-white">{overview}</p>

             <div className="">
                <button className="bg-white  mx-0 px-3 md:px-5 text-lg  rounded-lg text-black  cursor-pointer  hover:bg-opacity-80 ">▶️Play</button>
                <button className="bg-gray-500 mx-1 px-3 md:px-5 text-lg  rounded-lg text-white hover:bg-opacity-80">More Info</button>
             </div>
        </div>
    );
}

export default VideoTitle;
