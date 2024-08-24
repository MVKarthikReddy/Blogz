
import topic from '../assets/all_tipics.png'
import insight from '../assets/insight.png'
import community from '../assets/community.png'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
const About = () => {
    return(
        <section className='-z-10 absolute w-11/12 right-0 top-28 '>
            <div className="py-12 bg-black bg-opacity-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="lg:text-center">
                        <h2
                            className="font-heading mb-4 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                            About Blogz
                        </h2>
                        <p className="font-heading mt-2 text-2xl leading-8 font-semibold tracking-tight text-gray-100 sm:text-4xl">
                        Where every word sparks a thought, every story ignites a conversation. Welcome to Blogz—your canvas of ideas.
                        </p>
                        <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                        At Blogz, we believe that everyone has a story to tell and a unique perspective to offer. Our mission is to provide a platform for writers, thinkers, and enthusiasts to express themselves, share their passions, and connect with a global audience. Whether you're here to discover new ideas, stay informed, or simply enjoy a good read, we've got something for you.
                        </p>
                    </div>

                    <div className="mx-16 mt-7">
                        <h2
                            className="font-heading mb-7 bg-orange-100 text-center text-orange-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                            What We Offer?
                        </h2>
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <div
                                        className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                        <img src={topic} />
                                    </div>
                                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Diverse Topics</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    From technology and lifestyle to travel and personal development, our blog covers a wide range of subjects. We're committed to delivering content that not only informs but also inspires and entertains.
                                </dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <div
                                        className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                        <img src={insight} />
                                    </div>
                                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                                        Expert Insights
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500"> 
                                    Our contributors are knowledgeable and passionate about their fields. They bring you well-researched articles, personal experiences, and expert opinions that you can trust.
                                </dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <div
                                        className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                        <img src={community} />

                                    </div>
                                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                                        Community Engagement
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500"> 
                                    Blogz isn't just about reading—it's about connecting. We encourage our readers to join the conversation, share their thoughts, and become a part of our growing community.
                                </dd>
                            </div>
                            
                        </dl>
                    </div>

                    <div className="lg:text-center mt-6">
                        <h2
                            className="font-heading mb-4 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                            Our Vision
                        </h2>
                       
                        <p className="mt-4 max-w-3xl text-lg text-gray-500 lg:mx-auto">
                        We envision <span className='text-red-700'>Blogz</span> as a hub of creativity and knowledge where readers and writers alike can explore new ideas, challenge perspectives, and grow together. We're here to foster a community that values diversity, embraces curiosity, and celebrates the power of words.
                        </p>
                    </div>
                    <div className="lg:text-center mt-6">
                        <h2
                            className="font-heading mb-4 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                            Join Us
                        </h2>
                       
                        <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                            Whether you're a seasoned writer or just starting, we welcome you to contribute to Blogz. Share your stories, insights, and experiences with our readers, and become a part of our vibrant community.

                            Thank you for visiting Blogz. We hope you enjoy your time here and find content that speaks to you.
                        </p>
                    </div>

                </div>
            </div>
            <Footer />
            <ToastContainer />
        </section>
    )
}

export default About