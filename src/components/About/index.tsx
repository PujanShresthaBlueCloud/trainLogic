import React from "react";
import Link from "next/link";

const About = () => {
    return (
        <>
            <section className="dark:bg-darkmode pt-8 pb-24">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                    <div className="flex md:flex-row flex-col items-center justify-center md:gap-28 gap-8 mt-10">
                        Headline : We bridge the gap between business and AI.
                        Headlines: We build custom AI chatbots and voice agents for Australian businesses.
                        Subheadings:Automate your customer service, capture more leads, and free up your team’s time — all powered by Australian-built AI that speaks your language.
                        More Text : Founded by IT project professionals passionate about innovation, our mission is to help organisations embrace AI confidently and responsibly. With expertise across IT project delivery, data-driven strategy, and emerging technology, we partner with businesses to identify real opportunities — not hype. (Keep about us page thats final)
                        **Short explainer block:**We help you bring AI to life — without the tech headaches. From strategy and setup to training and optimisation, we handle the heavy lifting so your business runs smarter every day.
                    </div>
                    <div className="border-b border-solid border-border dark:border-dark_border"></div>
                </div>
            </section>
        </>
    )
}

export default About;