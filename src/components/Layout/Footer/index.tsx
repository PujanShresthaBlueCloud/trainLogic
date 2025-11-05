import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { footerLinks } from "@/app/api/data";
import { Button } from "@/ui/button";


const Footer = () => {
  return (
    <footer className="pt-8 bg-midnight_text relative after:content-[''] after:absolute after:bg-[url('/images/footer/bgline.png')] after:bg-no-repeat after:w-52 after:h-24 after:right-0 after:top-28 xl:after:block after:hidden">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-2">
        <div className="flex lg:items-center justify-between lg:flex-row flex-col border-b border-dark_border pb-8 mb-16 ">
          <div className="flex sm:flex-nowrap flex-wrap gap-6">
            <div className="flex items-center text-foottext text-16">
              <Icon icon="weui:location-outlined" className="w-7 h-7 mr-3" />
              <div className="flex flex-col">
                <span>Sydney, Australia</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-foottext">
              <Icon icon="majesticons:phone-retro-line" className="w-7 h-7" />
              <Link href="#" className="text-16 hover:text-primary">
                <span>0468 055 770</span>
              </Link>
            </div>
            <div className="flex items-center text-foottext gap-2">
              <Icon icon="clarity:email-line" className="w-7 h-7" />
              <Link
                href="#"
                className="inline-flex items-center text-16 hover:text-primary"
              >
                <span>info@trainedlogic.com.au</span>
              </Link>
            </div>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Link href="#" className="text-muted hover:text-primary">
              <Icon icon="fe:facebook" width="32" height="32" />
            </Link>
            <Link href="#" className="text-muted hover:text-primary">
              <Icon icon="fa6-brands:square-twitter" width="32" height="32" />
            </Link>
            <Link href="#" className="text-muted hover:text-primary">
              <Icon icon="fa6-brands:linkedin" width="32" height="32" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 sm:mb-16 mb-8 pt-8 gap-4 relative before:content-[''] before:absolute before:w-20 before:h-20 before:bg-[url('/images/footer/bgcir.png')] before:bg-no-repeat before:-left-36 before:bottom-9 lg:before:block before:hidden">
          <div className="md:col-span-2  mb-4 md:mb-0 ml-10">
            <h4 className="text-18 text-white dark:text-white mb-3">
              Links
            </h4>
            <ul>
              {footerLinks.slice(0, 3).map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.link}
                    className="text-foottext text-16 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2  mb-4 md:mb-0 ml-10">
            <ul className="mt-8">
              {footerLinks.slice(3, 6).map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.link}
                    className="text-foottext text-16 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* <div className="md:col-span-3 col-span-6 mb-4 md:mb-0">
            <h4 className="text-18 text-white dark:text-white mb-3">
              Resources
            </h4>
            <ul>
              {footerLinks.slice(7, 12).map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.link}
                    className="text-foottext text-16 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          <div className="md:col-span-2 col-span-6 mb-4 md:mb-0">
            <h4 className="text-18 text-white dark:text-white mb-3">
              Services
            </h4>
            <ul>
              {footerLinks.slice(6, 8).map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.link}
                    className="text-foottext text-16 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          <div className="md:col-span-5 col-span-12">
            <p className="text-18 text-white font-bold">We're not just AI consultants</p><p className="text-foottext text-16 mt-5 mb-5">
              Founded by veteran IT project leaders who've spent decades delivering complex technology solutions, Trained Logic exists to make AI accessible, practical, and profitable for Australian businesses. 
            </p>
            <Link href="#contact"><Button className="w-full inline-flex items-left justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition"> Start free 5 min demo </Button></Link>
          </div>
        </div>
        <div className="flex items-center sm:flex-row flex-col justify-between py-10 mt-8">
          <p className="text-16 text-foottext sm:mb-0 mb-4">
            © Copyright 2025. All rights reserved by 
              trainedlogic.com.au.
          </p>
          <div className="flex gap-4">
            {footerLinks.slice(8, 10).map((item, index) => (
              <div key={index} className="">
                <Link href="#" className="text-foottext hover:text-primary">
                  {item.link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
