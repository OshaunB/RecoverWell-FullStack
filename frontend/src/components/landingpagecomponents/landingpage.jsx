import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import {fetchHandler} from "../../utils"
import { useState, useEffect } from "react";

export default function Landingpage(){
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [discussionCount, setDiscussionCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const [userData, userError] = await fetchHandler(`/api/users`);
      const [postData, postError] = await fetchHandler(`/api/posts`);
      const [eventData,eventError] = await fetchHandler(`/api/events`);
      const [discussionData, discussionError] = await fetchHandler(`/api/discussions`)
      setUserCount(userData.length);
      setPostCount(postData.length);
      setEventCount(eventData.length);
      setDiscussionCount(discussionData.length);
    }

    fetchUser();
  }, [])
    return(
        <>
        
      <section className="bg-white dark:bg-gray-900 bg-stone-400" >
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12  ">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-slate-900">Recovery is a community effort</h1>
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Come find your groove , and recover quickly today.</p>
      <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-blue-900 font-medium text-center text-white rounded-lg bg-neutral-50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
        Get started
        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </a>
      <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
        Speak to the Team
      </a>
    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img src="../assets/k77nhuuu_man_with_headphones_meditating_accompanied_by_a_lion_s_c2b63c05-7d32-4238-b7ea-07efc8ca39fa.png" alt="mockup" />
    </div>
  </div>
</section>
<section className="text-gray-600 body-font bg-slate-900">
        <section className="text-gray-600 body-font bg-slate-900">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white">
                  <CountUp end={postCount} redraw={true}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">Posts</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white">
                  <CountUp end={userCount} redraw={true}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">Users</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                  <CountUp end={(eventCount)} redraw={true}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">Events</p>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font bg-slate-900">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white">
                  <CountUp end={discussionCount} redraw={true}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">Discussion Count</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white">
                  <CountUp end={740} redraw={true}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">Events</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                  <CountUp end={315} redraw={true}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">Downloads</p>
              </div>
            </div>
          </div>
        </section>
      </section>
      
<div className="container px-5 pt-32 mx-auto lg:px-4 lg:py-4 bg-black">
        <div className="flex flex-col w-full mb-2 text-left md:text-center bg-black">
          <h1 className="mb-2 text-6xl font-bold tracking-tighter text-white lg:text-8xl md:text-7xl bg-black">
            <span>Let us Join you </span>
            <br className="hidden lg:block bg-black" />
            On Your Journey
          </h1>
          <br />
          <p className="mx-auto text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3 ">
            As we Recover , it is our duty to help ourseleves{" "}
          
            in all ways that we can 
          </p>
        </div>
      </div>

<section className="bg-stone-400 dark:bg-gray-800">
  <div className="py-12 lg:py-20 mx-auto max-w-screen-xl px-4">
    <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Business teams rely on Flowbite</h2>
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="flex flex-col items-center">
        <svg className="w-12 h-12 mb-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* SVG code for Marketing icon */}
        </svg>
        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">Marketing</h3>
        <p className="mt-2 text-base text-center text-gray-500 dark:text-gray-400">Supercharge your marketing efforts with Flowbite's advanced analytics and tracking features.</p>
      </div>
      <div className="flex flex-col items-center">
        <svg className="w-12 h-12 mb-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* SVG code for Marketing icon */}
        </svg>
        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">Marketing</h3>
        <p className="mt-2 text-base text-center text-gray-500 dark:text-gray-400">Supercharge your marketing efforts with Flowbite's advanced analytics and tracking features.</p>
      </div>
      <div className="flex flex-col items-center">
        <svg className="w-12 h-12 mb-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* SVG code for Marketing icon */}
        </svg>
        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">Marketing</h3>
        <p className="mt-2 text-base text-center text-gray-500 dark:text-gray-400">Supercharge your marketing efforts with Flowbite's advanced analytics and tracking features.</p>
      </div>
      
      {/* Repeat for other business teams */}
    </div>
  </div>
</section>
<section className="bg-slate-900 dark:bg-gray-900">
  <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 className="mb-4 text-4xl font-extrabold text-gray-900 text-white">We didn't reinvent the wheel</h2>
      <p className="mb-4 text-white">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
      <p className= "text-white">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-8">
      <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
      <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
    </div>
  </div>
</section>

</>
    );
}