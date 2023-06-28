import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchHandler } from "../../utils";

export default function LandingPage() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const [userData] = await fetchHandler(`/api/users`);
      const [postData] = await fetchHandler(`/api/posts`);
      const [eventData] = await fetchHandler(`/api/events`);
      setUserCount(userData.length);
      setPostCount(postData.length);
      setEventCount(eventData.length);
    };

    fetchUser();
  }, []);
  return (
    <>
      <section className="bg-palette-default">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12  ">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-white">
              Recovery is a community effort
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-white">
              Come find your groove, and recover quickly today.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-blue-900 font-medium text-center text-white rounded-lg bg-hues-500 hover:bg-palette-aqua focus:ring-4 focus:ring-blue-300 dark:focus:ring-palette-teal"
            >
              <Link to="/sign-up">Get started</Link>

              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>

            <Link
              to="/events"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-palette-teal rounded-lg hover: focus:ring-4 focus:ring-palette-aqua dark:text-white dark:border-palette-aqua hover:bg-meadow-500 bg-hues-600 "
            >
              View Our Events
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="../assets/k77nhuuu_man_with_headphones_meditating_accompanied_by_a_lion_s_c2b63c05-7d32-4238-b7ea-07efc8ca39fa.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font bg-palette-grey">
        <section className="text-gray-600 body-font bg-slate-900">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-palette-default">
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
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-palette-default">
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
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-palette-default">
                  <CountUp end={eventCount} redraw={true}>
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
      </section>

      <div className="container pt-32 mx-auto lg:px-4 lg:py-4 bg-palette-default">
        <div className="flex flex-col w-full mb-2 text-left md:text-center bg-palette-default">
          <h1 className="mb-2 text-6xl font-bold tracking-tighter text-white lg:text-8xl md:text-7xl bg-palette-default">
            <span>Let us Join you </span>
            <br className="hidden lg:block bg-palette-default" />
            On Your Journey
          </h1>
          <br />
          <p className="mx-auto text-xl font-normal leading-relaxed text-white text-palette-white lg:w-2/3 ">
            As we Recover , it is our duty to help ourselves in all ways that we
            can
          </p>
        </div>
      </div>

      <section className="bg-white dark:bg-gray-800">
        <div className="py-12 lg:py-20 mx-auto max-w-screen-xl px-4">
          <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 text-palette-default md:text-4xl">
            In the battle against addiction, a strong community acts as a
            lifeline, offering support, understanding, and the belief that
            together we can overcome any obstacle.
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-4 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* SVG code for Marketing icon */}
              </svg>
              <h3 className="text-xl font-bold text-center text-palette-default">
                Community
              </h3>
              <p className="mt-2 text-base text-center text-palette-default">
                The strength of recovery lies not only within the individual but
                also in the bonds forged within a community. It is in this
                shared journey that we find the courage to heal, the resilience
                to persevere, and the joy of rebuilding lives.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-4 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* SVG code for Marketing icon */}
              </svg>
              <h3 className="text-xl font-bold text-center text-palette-default">
                Motivation
              </h3>
              <p className="mt-2 text-base text-center text-palette-default">
                When motivation ignites the spark within, it becomes the driving
                force behind remarkable transformations and monumental progress.
                It propels individuals beyond their perceived limitations,
                pushing them to strive for greatness and reach unprecedented
                heights.{" "}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-4 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* SVG code for Marketing icon */}
              </svg>
              <h3 className="text-xl font-bold text-center text-palette-default">
                Support
              </h3>
              <p className="mt-2 text-base text-center text-palette-default">
                In the tapestry of recovery, support weaves threads of strength,
                hope, and healing, guiding individuals towards a future adorned
                with triumph and renewed purpose.
              </p>
            </div>

            {/* Repeat for other business teams */}
          </div>
        </div>
      </section>
      <section className="bg-slate-900 dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 text-white">
              Just because there is movement , does not mean there is progress.
            </h2>
            <p className="mb-4 text-white">
              Here at RecoverFresh, we understand the day to day life of an
              individual can get in the way of actual recovery. As such we have
              formulated a platform that would give users insight on how to best
              level up their lives by using the experience of others.{" "}
            </p>
            <p className="text-white">
              It is the fact we operate with the average consumer in mind that
              allows us to give the best appeal to the masses.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://static.wixstatic.com/media/nsplsh_6c624c6746466c41447259~mv2.jpg/v1/fill/w_640,h_578,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/nsplsh_6c624c6746466c41447259~mv2.jpg"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://avenuesnewyork.com/wp-content/uploads/2018/03/Community-Sunset.jpg"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </>
  );
}
