// "use client";
// import React, { useState } from "react";
// import { Icon } from "@iconify/react";
// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { review } from "@/app/api/data";
// import { CheckCircle, Lock, Phone } from "lucide-react";

// const ContactFormHome = () => {
//   const [form, setForm] = useState({ name: "", business: "", phone: "" });
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const businessOptions = [
//     "Builder / Renovator",
//     "Plumber",
//     "Removalist",
//     "Migration Agent",
//     "Mortgage Broker",
//     "Electrician",
//   ];

//   // Loose AU phone validator (accepts common formats)
//   const auPhoneRegex = /^(?:\+61\s?4\d{2}\s?\d{3}\s?\d{3}|\+61\s?[2378]\s?\d{4}\s?\d{4})$/;

//   function formatAustralianPhone(value: any) {
//     if (!value) return "";
//     // remove non-digit and plus
//     let digits = value.replace(/[^+0-9]/g, "");
//     // normalize leading 0 to +61
//     if (digits.startsWith("0")) {
//       digits = "+61" + digits.slice(1);
//     }
//     if (digits.startsWith("61") && !digits.startsWith("+61")) {
//       digits = "+" + digits;
//     }
//     if (!digits.startsWith("+61") && digits.startsWith("+")) {
//       // leave as-is
//     }

//     // Format for mobile +61 4xx xxx xxx (11 digits with country)
//     const onlyDigits = digits.replace(/[^0-9]/g, "");
//     // if (onlyDigits.length >= 11 && onlyDigits.startsWith("61")) {
//     //   // mobile
//     //   if (onlyDigits[2] === "4") {
//     //     const part1 = onlyDigits.slice(0, 3); // 61 4
//     //     const part2 = onlyDigits.slice(3, 6);
//     //     const part3 = onlyDigits.slice(6, 9);
//     //     const part4 = onlyDigits.slice(9, 12);
//     //     return `+${part1} ${part2} ${part3} ${part4}`.trim();
//     //   } else {
//     //     // landline: +61 X XXXX XXXX
//     //     const part1 = onlyDigits.slice(0, 3);
//     //     const part2 = onlyDigits.slice(3, 7);
//     //     const part3 = onlyDigits.slice(7, 11);
//     //     return `+${part1} ${part2} ${part3}`.trim();
//     //   }
//     // }

//     // fallback: return original cleaned string
//     return digits;
//   }

//   function validate() {
//     const e = {};
//     if (!form.name.trim()) e.name = "Please enter your full name.";
//     if (!form.business) e.business = "Please select your business type.";
//     if (!form.phone.trim()) {
//       e.phone = "Please enter your phone number.";
//     } else if (!auPhoneRegex.test(form.phone.trim())) {
//       e.phone = "Enter a valid Australian phone (e.g. +61 412 345 678 or +61 2 1234 5678).";
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   async function handleSubmit(evt) {
//     evt.preventDefault();
//     setSuccess(false);
//     if (!validate()) return;
//     setSubmitting(true);
//     try {
//         console.log("inside submit ---------", form.name, form.business, form.phone);
//         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

//       // send to server API (create /api/contact on server to receive this)
//       const res = await fetch(`${baseUrl}/api/airtable/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: form.name.trim(), business: form.business, phone: form.phone.trim() })
//       });
//       if (!res.ok) throw new Error('Server error');
//       // handle response if needed
//       setSuccess(true);
//       setForm({ name: '', business: '', phone: '' });
//       setErrors({});
//     } catch (err) {
//       console.error(err);
//       setErrors({ submit: 'Failed to submit. Please try again later.'});
//     } finally {
//       setSubmitting(false);
//     }
//   }
//   const ref = useRef(null);

//   const renderStars = (rating: number) => {
//     const fullStars = Math.floor(rating);
//     const halfStars = rating % 1 >= 0.5 ? 1 : 0;
//     const emptyStars = 5 - fullStars - halfStars;

//     const stars = [];

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(
//         <Icon
//           key={`full-${i}`}
//           icon="ph:star-fill"
//           className="w-5 h-5 text-yellow-500"
//         />
//       );
//     }

//     if (halfStars) {
//       stars.push(
//         <Icon
//           key="half"
//           icon="ph:star-half-fill"
//           className="w-5 h-5 text-yellow-500"
//         />
//       );
//     }

//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <Icon
//           key={`empty-${i}`}
//           icon="ph:star-bold"
//           className="w-5 h-5 text-yellow-500"
//         />
//       );
//     }

//     return stars;
//   };

//   return (
//     <section className="dark:bg-darkmode overflow-hidden py-14">
//       <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
//         <div
//           ref={ref}
//           className="dark:bg-midnight_text bg-hero-bg rounded-3xl p-2"
//         >
//           <div
//             className="text-center lg:px-20 px-4 pt-20"
//           >
//             <div className="flex justify-center">
//               <Image
//                 src="/images/search/free.png"
//                 alt="image"
//                 width={67}
//                 height={38}
//               />
//             </div>
//             <h2 className="text-midnight_text font-bold dark:text-white md:text-35 sm:text-28 text-24">
//               Get started in under <span className="lg:text-35 text-primary text-24"> 2 minutes </span>
//             </h2>
//             <div className="md:max-w-75% mx-auto mt-6">
//               <div className="flex justify-center lg:items-center md:items-start items-center bg-white sm:flex-row flex-col dark:bg-darkHeroBg shadow-md  overflow-hidden">
//                 <form onSubmit={handleSubmit} className="w-full max-w-lg text-center bg-white p-18 text-left" aria-label="Contact form">
//                     {/* Name */}
//                     <label className="block mb-3">
//                     <span className="text-sm font-medium">Name <span className="text-red-500">*</span></span>
//                     <input
//                         aria-label="Full name"
//                         placeholder="Full name"
//                         value={form.name}
//                         onChange={(e) => setForm({ ...form, name: e.target.value })}
//                         className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
//                         aria-invalid={errors.name ? "true" : "false"}
//                         required
//                     />
//                     {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
//                     </label>

//                     {/* Business Type */}
//                     <label className="block mb-3">
//                     <span className="text-sm font-medium">What type of business are you? <span className="text-red-500">*</span></span>
//                     <select
//                         aria-label="Business type"
//                         value={form.business}
//                         onChange={(e) => setForm({ ...form, business: e.target.value })}
//                         className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.business ? 'border-red-300' : 'border-gray-200'}`}
//                         aria-invalid={errors.business ? "true" : "false"}
//                         required
//                     >
//                         <option value="">Please select your business type</option>
//                         {businessOptions.map((b) => (
//                         <option key={b} value={b}>{b}</option>
//                         ))}
//                     </select>
//                     {errors.business && <p className="text-xs text-red-600 mt-1">{errors.business}</p>}
//                     </label>

//                     {/* Phone */}
//                     <label className="block mb-4">
//                     <span >When should we call you? <span className="text-red-500">*</span></span>

//                     <div className="flex justify-between items-center mb-1">
//                         <div className="flex items-center gap-2 text-gray-700 font-medium">
//                         <Phone className="w-4 h-4 text-green-600" />
//                         <span className="text-sm font-medium block mb-1">Call me now</span>
//                         </div>
//                         <span className="text-sm text-green-600 font-semibold">Instant</span>
//                     </div>
//                     <p className="text-xs text-gray-500 mb-1">We will call you in 10 sec</p>
//                     <input
//                         aria-label="Phone number"
//                         placeholder="xxxx xxx xxx"
//                         value={form.phone}
//                         onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                         onBlur={(e) => setForm({ ...form, phone: formatAustralianPhone(e.target.value) })}
//                         className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
//                         aria-invalid={errors.phone ? "true" : "false"}
//                         required
//                     />
//                     {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
//                     </label>

//                     <button
//                     type="submit"
//                     disabled={submitting}
//                     className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition disabled:opacity-60"
//                     >
//                     {submitting ? 'Please wait…' : 'Start My 2-Minute Demo'}
//                     </button>

//                     {errors.submit && <div className="mt-4 text-red-700 font-medium">{errors.submit}</div>}
//                     {success && <div className="mt-4 text-green-700 font-medium">Thanks — we will call you shortly.</div>}


//                 </form>

//               </div>
//               <div className="flex items-center justify-center my-7">
//                         <div className="flex flex-wrap justify-center items-center gap-1.5 text-sm text-gray-700">
//                             <CheckCircle className="w-5 h-5 text-green-500" />
//                             <span>No credit card required</span>
//                             <CheckCircle className="w-5 h-5 text-green-500" />
//                             <span>No commitment</span>
//                             <CheckCircle className="w-5 h-5 text-green-500" />
//                             <span>Just 2 minutes</span>
//                         </div>

//                         {/* <div className="flex justify-center items-center gap-2 text-sm text-gray-700 mt-2">
//                             <Lock className="w-4 h-4 text-gray-500" />
//                             <span className="font-medium">Your information is secure</span>
//                         </div> */}
//               </div>
//               <div className="flex items-center justify-center my-7">
//                 <div className="w-5 h-5 rounded-full flex items-center justify-center">
//                     <Lock className="w-4 h-4 text-gray-500" />
//                 </div>
//                 <p className="ml-4 text-17 text-muted dark:text-white/60">
//                     Your information is secure
//                     </p>
//               </div>
//             </div>
//           </div>
//           <div>
//             {review.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-3xl lg:py-16 sm:py-10 py-5 my-2 lg:px-24 sm:px-12 px-6 dark:bg-darkmode"
//               >
//                 <div className="grid lg:grid-cols-2 lg:gap-0 gap-7">
//                   <div>
//                     <div className="mb-10">
//                       <Image
//                         src="/images/search/double.png"
//                         alt="image"
//                         width={52}
//                         height={39}
//                       />
//                     </div>
//                     <p className="text-midnight_text dark:text-white text-base mb-9">
//                       {item.text}
//                     </p>
//                     <div className="flex items-center gap-4">
//                       <div>
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           width={64}
//                           height={64}
//                         />
//                       </div>
//                       <div className="flex sm:items-center sm:gap-2 sm:flex-row flex-col">
//                         <h3 className="font-medium text-base text-midnight_text dark:text-white">
//                           {item.name}
//                         </h3>
//                         <Icon
//                           icon="bytesize:minus"
//                           className="sm:block hidden"
//                         />
//                         <h5 className="text-muted dark:text-muted text-base">
//                           {item.post}
//                         </h5>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex sm:items-center items-start lg:justify-evenly sm:flex-row flex-col lg:gap-0 gap-10">
//                     <div>
//                       <div className="sm:mb-8 mb-5">
//                         <div className="flex gap-2 mb-3">
//                           {renderStars(parseFloat(item.appstorerating))}
//                         </div>
//                         <p className="text-muted text-base">
//                           <span className="text-midnight_text dark:text-white font-bold">
//                             {item.appstorerating}
//                           </span>
//                           /5 — From 1800+ ratings
//                         </p>
//                       </div>
//                       <div>
//                         <Link href="#">
//                           <Image
//                             src="/images/search/app.png"
//                             alt="app store"
//                             width={130}
//                             height={44}
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="sm:mb-8 mb-5">
//                         <div className="flex gap-2 mb-3">
//                           {renderStars(parseFloat(item.gplayrating))}
//                         </div>
//                         <p className="text-muted text-base">
//                           <span className="text-midnight_text dark:text-white font-bold">
//                             {item.gplayrating}
//                           </span>
//                           /5 — From 1800+ ratings
//                         </p>
//                       </div>
//                       <div>
//                         <Link href="/">
//                           <Image
//                             src="/images/search/google.png"
//                             alt="google play"
//                             width={130}
//                             height={44}
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactFormHome;

"use client";
import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { review } from "@/app/api/data";
import { CheckCircle, Lock, Phone, CaptionsOff, Clock } from "lucide-react";

const ContactFormHome = () => {
  const [form, setForm] = useState({ name: "", business: "", phone: "" });
//   const [errors, setErrors] = useState({});
  const [errors, setErrors] = useState<Partial<Record<'name'|'business'|'phone'|'submit', string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const businessOptions = [
    "Builder / Renovator",
    "Plumber",
    "Removalist",
    "Migration Agent",
    "Mortgage Broker",
    "Electrician",
  ];

  // Loose AU phone validator (accepts common formats)
  const auPhoneRegex = /^(?:\+61\s?4\d{2}\s?\d{3}\s?\d{3}|\+61\s?[2378]\s?\d{4}\s?\d{4})$/;

  function formatAustralianPhone(value:any) {
    if (!value) return "";
    let digits = value.replace(/[^+0-9]/g, "");
    if (digits.startsWith("0")) {
      digits = "+61" + digits.slice(1);
    }
    if (digits.startsWith("61") && !digits.startsWith("+61")) {
      digits = "+" + digits;
    }

    const onlyDigits = digits.replace(/[^0-9]/g, "");
    return digits;
  }

  function validate() {
    // const e: FormErrors = {};
    // const e = {} as FormErrors;
    const e = {} as Partial<Record<'name' | 'business' | 'phone' | 'submit', string>>;

    if (!form.name.trim()) e.name = "Please enter your full name.";
    if (!form.business) e.business = "Please select your business type.";
    if (!form.phone.trim()) {
      e.phone = "Please enter your phone number.";
    } else if (!auPhoneRegex.test(form.phone.trim())) {
      e.phone = "Enter a valid Australian phone (e.g. +61 412 345 678 or +61 2 1234 5678).";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

//   async function handleSubmit(evt) {
async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {

    evt.preventDefault();
    setSuccess(false);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), business: form.business, phone: form.phone.trim() })
      });
      if (!res.ok) throw new Error('Server error');
      setSuccess(true);
      setForm({ name: '', business: '', phone: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Failed to submit. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  }

  const ref = useRef(null);

  const renderStars = (rating: any) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`full-${i}`}
          icon="ph:star-fill"
          className="w-5 h-5 text-yellow-500"
        />
      );
    }

    if (halfStars) {
      stars.push(
        <Icon
          key="half"
          icon="ph:star-half-fill"
          className="w-5 h-5 text-yellow-500"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          icon="ph:star-bold"
          className="w-5 h-5 text-yellow-500"
        />
      );
    }

    return stars;
  };

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14" id="contact">
      <div className="container mx-auto lg:max-w-6xl md:max-w-(--breakpoint-md) px-4">
        <div
          ref={ref}
          className="dark:bg-midnight_text bg-hero-bg rounded-3xl p-6"
        >
          <div className="text-center lg:px-20 px-4 pt-12">
            <div className="flex justify-center">
              <Image
                src="/images/search/free.png"
                alt="image"
                width={67}
                height={38}
              />
            </div>
            <h2 className="text-midnight_text font-bold dark:text-white md:text-35 sm:text-28 text-24 mt-4">
              Request Your Free <span className="lg:text-35 text-primary text-24"> Demo </span>
            </h2>

            <div className="md:max-w-75% mx-auto mt-6">
              <div className="flex items-start justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-md text-left bg-white rounded-xl p-6 shadow-sm" aria-label="Contact form">

                  {/* Name */}
                  <label className="block mb-3">
                    <span className="text-sm font-medium">Full Name</span>
                    <input
                      aria-label="Full name"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
                      aria-invalid={errors.name ? "true" : "false"}
                      required
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </label>

                  {/* Phone */}
                  <label className="block mb-4">
                    {/* <div className="flex justify-between items-center mb-1"> */}
                      {/* <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Call me now</span>
                      </div> */}
                      
                    {/* <p className="text-xs text-gray-500 mb-1">We will call you in 10 sec</p> */}
                    <span className="text-sm font-medium block mb-1">Mobile Number</span>
                    <input
                      aria-label="Phone number"
                      placeholder="xxxx xxx xxx"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      onBlur={(e) => setForm({ ...form, phone: formatAustralianPhone(e.target.value) })}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
                      aria-invalid={errors.phone ? "true" : "false"}
                      required
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </label>

                  {/* Business Type */}
                  <label className="block mb-3">
                    <span className="text-sm font-medium">Select Your Business <span className="text-red-500">*</span></span>
                    <select
                      aria-label="Business type"
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.business ? 'border-red-300' : 'border-gray-200'}`}
                      aria-invalid={errors.business ? "true" : "false"}
                      required
                    >
                      <option value="">Please select your business type</option>
                      {businessOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {errors.business && <p className="text-xs text-red-600 mt-1">{errors.business}</p>}
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition disabled:opacity-60"
                  >
                    {submitting ? 'Please wait…' : 'Start My 5-Minute Demo'}
                  </button>

                  {errors.submit && <div className="mt-4 text-red-700 font-medium">{errors.submit}</div>}
                  {success && <div className="mt-4 text-green-700 font-medium">Thanks — we will call you shortly.</div>}
                </form>
              </div>
              <div className="mt-6 border-t pt-4 text-center">
                <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-700">
                  <CaptionsOff className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No commitment</span>
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Just 2 minutes</span>
                </div>

                <div className="flex justify-center items-center gap-2 text-sm text-gray-700 mt-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Your information is secure</span>
                </div>
              </div>
            </div>
            <div className="mt-20">
              {review.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl lg:py-16 sm:py-10 py-5 my-2 lg:px-24 sm:px-12 px-6 dark:bg-darkmode"
                >
                  <div className="grid lg:grid-cols-2 lg:gap-0 gap-7">
                    <div>
                      <div className="mb-10">
                        <Image
                          src="/images/search/double.png"
                          alt="image"
                          width={52}
                          height={39}
                        />
                      </div>
                      <p className="text-midnight_text dark:text-white text-base mb-9">
                        {item.text}
                      </p>
                      <div className="flex items-center gap-4">
                        <div>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                          />
                        </div>
                        <div className="flex sm:items-center sm:gap-2 sm:flex-row flex-col">
                          <h3 className="font-medium text-base text-midnight_text dark:text-white">
                            {item.name}
                          </h3>
                          <Icon
                            icon="bytesize:minus"
                            className="sm:block hidden"
                          />
                          <h5 className="text-muted dark:text-muted text-base">
                            {item.post}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:items-center items-start lg:justify-evenly sm:flex-row flex-col lg:gap-0 gap-10">
                      <div>
                        <div className="sm:mb-8 mb-5">
                          <div className="flex gap-2 mb-3">
                            {renderStars(parseFloat(item.appstorerating))}
                          </div>
                          <p className="text-muted text-base">
                            <span className="text-midnight_text dark:text-white font-bold">
                              {item.appstorerating}
                            </span>
                            /5 — From 1800+ ratings
                          </p>
                        </div>
                        <div>
                          <Link href="#">
                            <Image
                              src="/images/search/app.png"
                              alt="app store"
                              width={130}
                              height={44}
                            />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="sm:mb-8 mb-5">
                          <div className="flex gap-2 mb-3">
                            {renderStars(parseFloat(item.gplayrating))}
                          </div>
                          <p className="text-muted text-base">
                            <span className="text-midnight_text dark:text-white font-bold">
                              {item.gplayrating}
                            </span>
                            /5 — From 1800+ ratings
                          </p>
                        </div>
                        <div>
                          <Link href="/">
                            <Image
                              src="/images/search/google.png"
                              alt="google play"
                              width={130}
                              height={44}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormHome;
