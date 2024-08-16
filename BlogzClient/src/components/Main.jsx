
import 'react-slideshow-image/dist/styles.css'
import { Slide, Fade } from 'react-slideshow-image';

const Main = () => {

    const slideImages = [
        {
          url: 'https://wallpaperaccess.com/full/3320018.jpg',
          caption: 'Technology'
        },
        {
          url: 'https://img.freepik.com/premium-photo/adventure-travel-hd-8k-wallpaper-stock-photographic-image_915071-72176.jpg?w=1060',
          caption: 'Travelling & Adventures'
        },
        {
          url: 'https://images7.alphacoders.com/872/872479.jpg',
          caption: 'Sports'
        },
      ];

      
      
      const divStyle = {        
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }

    return(
        <>
            <div className="pt-10"></div>
            <div className="font-mono items-center">
                <div className=" flex flex-row text-center">
                    <caption className="text-5xl w-4/6">Welcome to <span className="text-red-700 font-bold">Blogz</span></caption>
                </div>
                <div className="flex flex-row justify-center">
                    <p className="w-4/6 text-lg leading-7 pt-3">
                        <span className="pl-24"></span>Your go-to platform for insightful articles, fresh ideas, and a community of curious minds. Whether you're here to stay informed, get inspired, or share your thoughts, Blogz is designed to be a space where every voice matters.
                    </p>
                </div>
            
            </div>
            <div className='w-full flex flex-row justify-center mt-9 relative -z-10'>
                <div className='w-4/6'>
                    <Fade>
                        {slideImages.map((slideImage, index)=> (
                            <div key={index}>
                                <div className='flex flex-row justify-center lg:h-96 md:h-72 sm:h-56'  style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                    <span className='text-black font-semibold font-mono border px-4 py-1 bg-white bg-opacity-55 rounded h-8 text-center mt-5'>{slideImage.caption}</span>
                                </div>
                            </div>
                        ))} 
                    </Fade>
                </div>
            </div>
        </>
    )
}

export default Main