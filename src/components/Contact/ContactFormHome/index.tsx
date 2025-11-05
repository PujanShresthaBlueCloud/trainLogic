// "use client";
// import React, { useState, useRef } from "react";
// import { Icon } from "@iconify/react";
// import Image from "next/image";
// import Link from "next/link";
// import { review } from "@/app/api/data";
// import { CheckCircle, Lock, Phone, CaptionsOff, Clock } from "lucide-react";

// const ContactFormHome = () => {
//   const [form, setForm] = useState({ name: "", business: "", phone: "" });
// //   const [errors, setErrors] = useState({});
//   const [errors, setErrors] = useState<Partial<Record<'name'|'business'|'phone'|'submit', string>>>({});
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

//   function formatAustralianPhone(value:any) {
//     if (!value) return "";
//     let digits = value.replace(/[^+0-9]/g, "");
//     if (digits.startsWith("0")) {
//       digits = "+61" + digits.slice(1);
//     }
//     if (digits.startsWith("61") && !digits.startsWith("+61")) {
//       digits = "+" + digits;
//     }

//     const onlyDigits = digits.replace(/[^0-9]/g, "");
//     return digits;
//   }

//   function validate() {
//     // const e: FormErrors = {};
//     // const e = {} as FormErrors;
//     const e = {} as Partial<Record<'name' | 'business' | 'phone' | 'submit', string>>;

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

// //   async function handleSubmit(evt) {
// async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {

//     evt.preventDefault();
//     setSuccess(false);
//     if (!validate()) return;
//     setSubmitting(true);
//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: form.name.trim(), business: form.business, phone: form.phone.trim() })
//       });
//       if (!res.ok) throw new Error('Server error');
//       setSuccess(true);
//       setForm({ name: '', business: '', phone: '' });
//       setErrors({});
//     } catch (err) {
//       console.error(err);
//       setErrors({ submit: 'Failed to submit. Please try again later.' });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   const ref = useRef(null);

//   const renderStars = (rating: any) => {
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
//     <section className="dark:bg-darkmode overflow-hidden py-10" id="contact">
//       <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
//         <div
//           ref={ref}
          
//         >
//           <div className="text-center lg:px-20 px-4 pt-12">
//             <h1 className="text-midnight_text font-bold dark:text-white md:text-35 sm:text-28 text-24 mt-4">Let's Bring Your AI Vision to Life</h1>
//             <div className="flex justify-center">
//               <Image
//                 src="/images/search/free.png"
//                 alt="image"
//                 width={67}
//                 height={38}
//               />
//             </div>
//             <h2 className="text-midnight_text font-bold dark:text-white md:text-35 sm:text-28 text-24 mt-4">
//               Request Your Free <span className="lg:text-35 text-primary text-24"> Demo </span>
//             </h2>

//             <div className="md:max-w-75% mx-auto mt-6">
//               <div className="flex items-start justify-center">
//                 <form onSubmit={handleSubmit} className="w-full max-w-md text-left bg-white rounded-xl p-6 shadow-sm" aria-label="Contact form">

//                   {/* Name */}
//                   <label className="block mb-3">
//                     <span className="text-sm font-medium">Full Name</span>
//                     <input
//                       aria-label="Full name"
//                       placeholder="Full name"
//                       value={form.name}
//                       onChange={(e) => setForm({ ...form, name: e.target.value })}
//                       className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
//                       aria-invalid={errors.name ? "true" : "false"}
//                       required
//                     />
//                     {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
//                   </label>

//                   {/* Phone */}
//                   <label className="block mb-4">
//                     {/* <div className="flex justify-between items-center mb-1"> */}
//                       {/* <div className="flex items-center gap-2 text-gray-700 font-medium">
//                         <Phone className="w-4 h-4 text-green-600" />
//                         <span className="text-sm font-medium">Call me now</span>
//                       </div> */}
                      
//                     {/* <p className="text-xs text-gray-500 mb-1">We will call you in 10 sec</p> */}
//                     <span className="text-sm font-medium block mb-1">Mobile Number</span>
//                     <input
//                       aria-label="Phone number"
//                       placeholder="xxxx xxx xxx"
//                       value={form.phone}
//                       onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                       onBlur={(e) => setForm({ ...form, phone: formatAustralianPhone(e.target.value) })}
//                       className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
//                       aria-invalid={errors.phone ? "true" : "false"}
//                       required
//                     />
//                     {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
//                   </label>

//                   {/* Business Type */}
//                   <label className="block mb-3">
//                     <span className="text-sm font-medium">Select Your Business <span className="text-red-500">*</span></span>
//                     <select
//                       aria-label="Business type"
//                       value={form.business}
//                       onChange={(e) => setForm({ ...form, business: e.target.value })}
//                       className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.business ? 'border-red-300' : 'border-gray-200'}`}
//                       aria-invalid={errors.business ? "true" : "false"}
//                       required
//                     >
//                       <option value="">Please select your business type</option>
//                       {businessOptions.map((b) => (
//                         <option key={b} value={b}>{b}</option>
//                       ))}
//                     </select>
//                     {errors.business && <p className="text-xs text-red-600 mt-1">{errors.business}</p>}
//                   </label>
//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition disabled:opacity-60"
//                   >
//                     {submitting ? 'Please wait…' : 'Start My 5-Minute Demo'}
//                   </button>

//                   {errors.submit && <div className="mt-4 text-red-700 font-medium">{errors.submit}</div>}
//                   {success && <div className="mt-4 text-green-700 font-medium">Thanks — we will call you shortly.</div>}
//                 </form>
//               </div>
//               <div className="mt-6 border-t pt-4 text-center">
//                 <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-700">
//                   <CaptionsOff className="w-5 h-5 text-green-500" />
//                   <span>No credit card required</span>
//                   <CheckCircle className="w-5 h-5 text-green-500" />
//                   <span>No commitment</span>
//                   <Clock className="w-5 h-5 text-green-500" />
//                   <span>Just 2 minutes</span>
//                 </div>

//                 <div className="flex justify-center items-center gap-2 text-sm text-gray-700 mt-2">
//                   <Lock className="w-4 h-4 text-gray-500" />
//                   <span className="font-medium">Your information is secure</span>
//                 </div>
//               </div>
//             </div>
//             {/* Disabled client opinions ---- */}
//             {/* <div className="mt-20">
//               {review.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-3xl lg:py-16 sm:py-10 py-5 my-2 lg:px-24 sm:px-12 px-6 dark:bg-darkmode"
//                 >
//                   <div className="grid lg:grid-cols-2 lg:gap-0 gap-7">
//                     <div>
//                       <div className="mb-10">
//                         <Image
//                           src="/images/search/double.png"
//                           alt="image"
//                           width={52}
//                           height={39}
//                         />
//                       </div>
//                       <p className="text-midnight_text dark:text-white text-base mb-9">
//                         {item.text}
//                       </p>
//                       <div className="flex items-center gap-4">
//                         <div>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             width={64}
//                             height={64}
//                           />
//                         </div>
//                         <div className="flex sm:items-center sm:gap-2 sm:flex-row flex-col">
//                           <h3 className="font-medium text-base text-midnight_text dark:text-white">
//                             {item.name}
//                           </h3>
//                           <Icon
//                             icon="bytesize:minus"
//                             className="sm:block hidden"
//                           />
//                           <h5 className="text-muted dark:text-muted text-base">
//                             {item.post}
//                           </h5>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex sm:items-center items-start lg:justify-evenly sm:flex-row flex-col lg:gap-0 gap-10">
//                       <div>
//                         <div className="sm:mb-8 mb-5">
//                           <div className="flex gap-2 mb-3">
//                             {renderStars(parseFloat(item.appstorerating))}
//                           </div>
//                           <p className="text-muted text-base">
//                             <span className="text-midnight_text dark:text-white font-bold">
//                               {item.appstorerating}
//                             </span>
//                             /5 — From 1800+ ratings
//                           </p>
//                         </div>
//                         <div>
//                           <Link href="#">
//                             <Image
//                               src="/images/search/app.png"
//                               alt="app store"
//                               width={130}
//                               height={44}
//                             />
//                           </Link>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="sm:mb-8 mb-5">
//                           <div className="flex gap-2 mb-3">
//                             {renderStars(parseFloat(item.gplayrating))}
//                           </div>
//                           <p className="text-muted text-base">
//                             <span className="text-midnight_text dark:text-white font-bold">
//                               {item.gplayrating}
//                             </span>
//                             /5 — From 1800+ ratings
//                           </p>
//                         </div>
//                         <div>
//                           <Link href="/">
//                             <Image
//                               src="/images/search/google.png"
//                               alt="google play"
//                               width={130}
//                               height={44}
//                             />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactFormHome;


"use client";
import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon, PhoneIcon, ChevronDownIcon, Loader, AlertTriangleIcon, LockIcon, ArrowLeftIcon } from 'lucide-react';

// --- Configuration ---
// Map business types to their unique Retell AI Agent IDs
const agentIdMap: Record<string, string> = {
    "Builder / Renovator": "agent_208183adba8913a73ac3c58e82",
    "Plumber": "agent_700c951b18e58b9ed7717b7b38",
    "Removalist": "agent_208183adba8913a73ac3c58e82",
    "Migration Agent": "agent_6ed8355ac98c9988ac22f69fe9",
    "Mortgage Broker": "agent_208183adba8913a73ac3c58e82",
    "Electrician": "agent_208183adba8913a73ac3c58e82",
};

// WARNING: Storing API keys and auth tokens on the client-side is highly insecure.
// These should be handled by a secure backend service in a production environment to prevent unauthorized use.


const TWILIO_VERIFY_SERVICE_SID = process.env.NEXT_PUBLIC_TWILIO_VERIFY_SERVICE_SID;
const TWILIO_AUTH_HEADER = process.env.NEXT_PUBLIC_TWILIO_AUTH_HEADER;
const RETELL_API_KEY = process.env.NEXT_PUBLIC_RETELL_API_KEY;

const businessTypes = ['Builder / Renovator', 'Plumber', 'Removalist', 'Migration Agent', 'Mortgage Broker', 'Electrician'];

type FormStep = 'details' | 'otp' | 'submitted';
type FormData = {
  fullName: string;
  phone: string;
  businessType: string;
}

// --- Main Component ---
const ContactFormHome: React.FC = () => {
    const [formStep, setFormStep] = useState<FormStep>('details');
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phone: '',
        businessType: '',
    });
    const [userOtp, setUserOtp] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // --- Phone & Form Helpers ---
    const formatPhoneNumber = (value: string) => {
        const cleaned = ('' + value).replace(/\D/g, '');
        if (cleaned.length === 0) return '';
        const match = cleaned.match(/^(\d{0,4})(\d{0,3})(\d{0,3})$/);
        if (!match) return cleaned;
        return [match[1], match[2], match[3]].filter(Boolean).join(' ');
    };
    
    // Formats Australian mobile numbers for APIs. Removes spaces, and replaces leading '0' with '+61'.
    const getFormattedPhoneNumber = () => {
        let digits = formData.phone.replace(/\D/g, '');
        if (digits.startsWith('0')) {
            digits = digits.substring(1);
        }
        return `+61${digits}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            setFormData(prev => ({ ...prev, phone: formatPhoneNumber(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (errors[name]) {
            validateField(name, value);
        }
    };

    const validateField = (name: string, value: string) => {
        let error = '';
        switch (name) {
            case 'fullName':
                if (!value) error = 'Full name is required.';
                break;
            case 'businessType':
                if (!value) error = 'Please select a business type.';
                break;
            case 'phone':
                const digits = value.replace(/\s/g, '');
                if (!value) error = 'Phone number is required.';
                else if (digits.length !== 10 || !digits.startsWith('04')) error = 'Please enter a valid 10-digit Australian mobile number starting with 04.';
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return error === '';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateForm = () => {
        const formIsValid = Object.keys(formData).every(key => validateField(key as keyof FormData, 
        formData[key as keyof FormData]));
        return formIsValid;
    };

    const resetForm = () => {
        setFormStep('details');
        setFormData({ fullName: '', phone: '', businessType: '' });
        setErrors({});
        setUserOtp('');
        setApiError('');
    };
    
    // --- API Logic ---
    const handleDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError('');

        if (!TWILIO_AUTH_HEADER || !TWILIO_VERIFY_SERVICE_SID) {
            setApiError('This feature is currently unavailable. Please contact support.');
            return;
        }
        if (!validateForm()) return;

        setIsLoading(true);
        const formattedPhone = getFormattedPhoneNumber();

        try {
            const response = await fetch(`https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/Verifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TWILIO_AUTH_HEADER,
                },
                body: new URLSearchParams({
                    'To': formattedPhone,
                    'Channel': 'sms'
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send OTP. Please check the phone number.');
            }
            
            setFormStep('otp');

        } catch (err) {
            if (err instanceof Error) {
                setApiError(err.message);
            } else {
                setApiError('An unknown error occurred while sending the OTP.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setApiError('');
    
        if (!TWILIO_AUTH_HEADER || !TWILIO_VERIFY_SERVICE_SID || !RETELL_API_KEY) {
            setApiError('This feature is currently unavailable. Please contact support.');
            setIsLoading(false);
            return;
        }
        const formattedPhone = getFormattedPhoneNumber();
        
        try {
            // Step 1: Verify the OTP with Twilio
            const verificationResponse = await fetch(`https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/VerificationCheck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TWILIO_AUTH_HEADER,
                },
                body: new URLSearchParams({
                    'To': formattedPhone,
                    'Code': userOtp
                })
            });
    
            const verificationData = await verificationResponse.json();
    
            if (!verificationResponse.ok || verificationData.status !== 'approved') {
                throw new Error('Invalid OTP. Please try again.');
            }
    
            // Step 2: If OTP is approved, create the phone call with Retell AI
            const agentId = agentIdMap[formData.businessType];
    
            const retellResponse = await fetch('https://api.retellai.com/v2/create-phone-call', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${RETELL_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from_number: "+61468055770",
                    to_number: formattedPhone,
                    override_agent_id: agentId,
                    retell_llm_dynamic_variables: {
                        full_name: formData.fullName,
                    },
                }),
            });
    
            if (!retellResponse.ok) {
                const errorData = await retellResponse.json().catch(() => ({ message: `HTTP error! status: ${retellResponse.status}` }));
                throw new Error(errorData.message || `Failed to start the demo call. Status: ${retellResponse.status}`);
            }
            
            setFormStep('submitted');
    
        } catch (err) {
            if (err instanceof Error) {
                setApiError(err.message);
            } else {
                setApiError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // --- Render Logic ---
    const isFormValid = Object.values(errors).every(x => !x) && Object.values(formData).every(Boolean);

    const renderFormContent = () => {
        switch (formStep) {
            case 'otp':
                return (
                    <>
                        <button 
                            onClick={() => {
                                setFormStep('details');
                                setApiError('');
                                setUserOtp('');
                            }} 
                            className="absolute top-6 left-6 flex items-center text-sm font-medium text-gray-500 hover:text-brand-dark transition-colors"
                            aria-label="Go back to details"
                        >
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back
                        </button>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-brand-primary">Verify Your Number</h3>
                            <p className="text-gray-600 mt-2">Enter the 6-digit code we sent to your mobile.</p>
                        </div>
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-semibold text-brand-dark mb-2">VERIFICATION CODE *</label>
                                <input
                                    id="otp"
                                    type="tel"
                                    inputMode="numeric"
                                    value={userOtp}
                                    onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ''))}
                                    placeholder="------"
                                    required
                                    maxLength={6}
                                    className="w-full h-14 px-4 bg-gray-50 border-2 rounded-lg transition-colors duration-200 text-center text-2xl tracking-[0.5em] sm:tracking-[1em] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            
                            {apiError && 
                                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-3">
                                    <AlertTriangleIcon className="h-5 w-5" />
                                    <p className="text-sm font-medium">{apiError}</p>
                                </div>
                            }

                            <button
                                type="submit"
                                disabled={isLoading || userOtp.length < 6}
                                className="w-full h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? <Loader className="h-6 w-6 animate-spin" /> : 'Verify & Start Demo'}
                            </button>
                        </form>
                    </>
                );
            case 'submitted':
                return (
                    <div className="text-center py-8">
                        <div className="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-green-100">
                            <CheckIcon className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-brand-primary">Demo Requested!</h3>
                        <p className="text-gray-600 mt-2">
                            We're calling your number now to begin the demo.
                        </p>
                        <div className="text-left bg-gray-50 p-6 rounded-lg mt-8 space-y-3 border border-gray-200">
                            <p className="flex justify-between"><span className="font-semibold text-gray-500">Name:</span> <span className="font-medium text-brand-dark">{formData.fullName}</span></p>
                            <p className="flex justify-between"><span className="font-semibold text-gray-500">Phone:</span> <span className="font-medium text-brand-dark">+61 {formData.phone}</span></p>
                            <p className="flex justify-between"><span className="font-semibold text-gray-500">Business Type:</span> <span className="font-medium text-brand-dark">{formData.businessType}</span></p>
                        </div>
                        <button
                            onClick={resetForm}
                            className="mt-8 w-full h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                        >
                            Request Another Demo
                        </button>
                    </div>
                );
            case 'details':
            default:
                return (
                    <form onSubmit={handleDetailsSubmit} noValidate className="grid grid-cols-1 gap-y-6">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-brand-dark mb-2">FULL NAME *</label>
                            <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. John Smith" className={`w-full h-14 px-4 bg-gray-50 border-2 rounded-lg transition-colors duration-200 ${errors.fullName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`} />
                            {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-brand-dark mb-2">PHONE NUMBER *</label>
                            <div className="flex items-center">
                                <span className="inline-flex items-center px-4 h-14 border border-r-0 border-gray-200 bg-gray-100 text-gray-600 rounded-l-lg">+61</span>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} placeholder="04XX XXX XXX" className={`w-full h-14 px-4 bg-gray-50 border-2 rounded-r-lg transition-colors duration-200 ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`} maxLength={12} />
                            </div>
                            <p className={`mt-2 text-sm flex items-center gap-2 ${errors.phone ? 'text-red-600' : 'text-gray-500'}`}>
                                {errors.phone ? errors.phone : <><PhoneIcon className="h-4 w-4" /> You will get an instant call on this number from our Voice Agent.</>}
                            </p>
                        </div>
                        
                        {/* Business Type Field */}
                        <div>
                            <label htmlFor="businessType" className="block text-sm font-semibold text-brand-dark mb-2">WHAT TYPE OF BUSINESS ARE YOU? *</label>
                            <CustomDropdown selected={formData.businessType} setSelected={(val: string) => setFormData(prev => ({...prev, businessType: val}))} error={errors.businessType} setErrors={setErrors} />
                            {errors.businessType && <p className="mt-2 text-sm text-red-600">{errors.businessType}</p>}
                        </div>

                        {apiError && 
                            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-3">
                                <AlertTriangleIcon className="h-5 w-5" />
                                <p className="text-sm font-medium">{apiError}</p>
                            </div>
                        }

                        {/* Submit Button */}
                        <div>
                            <button type="submit" disabled={!isFormValid || isLoading} className="w-full h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none">
                                {isLoading ? <><Loader className="h-6 w-6 animate-spin mr-3" /> Sending OTP...</> : "Start My 5-Minute Demo"}
                            </button>
                        </div>
                    </form>
                );
        }
    };

    return (
        <section 
            id="contact"
            ref={sectionRef}
            className={`pt-8 pb-28 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-semibold text-brand-primary mt-2">
                    Experience How Our AI Handles Your Business Calls
                </h2> 
                <h3 className="text-midnight_text font-bold dark:text-white md:text-35 sm:text-28 text-24 mt-4">
                  Request Your Free <span className="lg:text-35 text-primary text-24"> Demo </span>             
                </h3>     
                <div className="relative max-w-xl mx-auto mt-12 bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-200 text-left">
                    {renderFormContent()}
                </div>

                <div className="max-w-xl mx-auto mt-8">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-3 text-gray-600">
                        <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-green-500"/>No credit card required</span>
                        <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-green-500"/>No commitment</span>
                        <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-green-500"/>5-min max.</span>
                    </div>
                     <div className="mt-6 inline-flex items-center gap-2 bg-green-600 text-white text-sm font-bold py-2 px-5 rounded-full shadow-lg shadow-green-600/40">
                        <LockIcon className="h-4 w-4"/>
                        Your information is secure
                    </div>
                </div>
            </div>
        </section>
    );
};

type CustomDropdownProps = {
  selected: string;
  setSelected: (val: string) => void;
  error: string;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

// --- Sub-Components ---
const CustomDropdown: React.FC<CustomDropdownProps> = ({ selected, setSelected, error, setErrors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (type: string) => {
        setSelected(type);
        setIsOpen(false);
        setErrors(prev => ({...prev, businessType: ''}));
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => !selected && setErrors(prev => ({ ...prev, businessType: 'Please select a business type.'}))}
                className={`w-full h-14 px-4 text-left bg-gray-50 border-2 rounded-lg flex items-center justify-between transition-colors duration-200 ${
                    error ? 'border-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                } ${selected ? 'text-brand-dark' : 'text-gray-400'}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {selected || 'Select your business type'}
                <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {businessTypes.map(type => (
                        <li
                            key={type}
                            onClick={() => handleSelect(type)}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between"
                        >
                            {type}
                            {selected === type && <CheckIcon className="h-5 w-5 text-blue-500" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContactFormHome;