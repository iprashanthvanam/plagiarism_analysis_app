// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useAuth } from '@/contexts/AuthContext';

// export function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<'admin' | 'student'>('admin');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await login(username, password, role);
//       navigate(role === 'admin' ? '/admin' : '/student');
//     } catch {
//       setError('Invalid credentials or server error');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center p-4">
//       <Card className="bg-slate-800/50 border-slate-700 w-full max-w-md backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="text-white text-center text-2xl">LOGIN</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <Label htmlFor="role" className="text-white">Role</Label>
//               <select id="role" value={role} onChange={(e) => setRole(e.target.value as any)}
//                 className="w-full bg-slate-700 text-white border-slate-600 p-2 rounded">
//                 <option value="admin">Admin</option>
//                 <option value="student">Student</option>
//               </select>
//             </div>
//             <div>
//               <Label htmlFor="username" className="text-white">ID</Label>
//               <Input id="username" type="text" value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="bg-slate-700 text-white border-slate-600" />
//             </div>
//             <div>
//               <Label htmlFor="password" className="text-white">Password</Label>
//               <Input id="password" type="password" value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="bg-slate-700 text-white border-slate-600" />
//             </div>
//             {error && (
//               <Alert className="border-red-500 bg-red-500/10">
//                 <AlertDescription className="text-red-300">{error}</AlertDescription>
//               </Alert>
//             )}
//             <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Login</Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }











// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useAuth } from '@/contexts/AuthContext';
// import { Eye, EyeOff, User, Lock } from 'lucide-react';

// export function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<'admin' | 'student'>('admin');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   /* 🔒 AUTH LOGIC — UNCHANGED */
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await login(username, password, role);
//       navigate(role === 'admin' ? '/admin' : '/student');
//     } catch {
//       setError('Invalid credentials or server error');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-purple-600">


//        {/* ================= TOP BANNER ================= */}
//       <div className="relative h-[320px] w-full overflow-hidden">
//         <img
//           src="/assets/collegebanner.jpg"
//           alt="TKREC"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//           <div className="text-center text-white px-4">
//             <h1 className="text-4xl font-bold">
//               Teegala Krishna Reddy Engineering College
//             </h1>
//             <p className="mt-2 text-lg">
//               Where Knowledge Meets Innovation
//             </p>
//           </div>
//         </div>
//       </div>



//       {/* ================= LOGIN + NOTIFICATIONS ================= */}
//       <div className="max-w-6xl mx-auto w-full grid md:grid-cols-3 gap-6 p-6">

//         {/* ORIENTATION / ACHIEVEMENTS */}
// <Card className="md:col-span-1 bg-slate-800/90 border-slate-700">
//   <CardHeader>
//     <CardTitle className="text-white text-center text-2xl">
//       College Orientation & Achievements
//     </CardTitle>
//   </CardHeader>

//   <CardContent className="text-white">
//     <div>
//       <img src="/orientation/collegebanner.jpg"
//         className="rounded mb-2"
//         alt="Orientation"
//       />
//       <p>2025 Student Orientation Program</p>
//     </div>

//     {/* <div>
//       <img src="/orientation/collegebanner.jpg"
//         className="rounded mb-2"
//         alt="Achievement"
//       />
//       <p>NAAC & NBA Academic Excellence</p>
//     </div>

//     <div>
//       <img src="/orientation/collegebanner.jpg"
//         className="rounded mb-2"
//         alt="Placements"
//       />
//       <p>Top Placements – Infosys, TCS</p>
//     </div>

//     <div>
//       <img src="/orientation/collegebanner.jpg"
//         className="rounded mb-2"
//         alt="Events"
//       />
//       <p>Workshops & Technical Events</p>
//     </div> */}
//   </CardContent>
// </Card>


//         {/* LOGIN BOX */}
//         <Card className="md:col-span-1 bg-slate-800/90 border-slate-700">
//           <CardHeader>
//             <CardTitle className="text-white text-center text-2xl">
//               Login
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-4">

//               {/* ROLE */}
//               <div>
//                 <Label className="text-white">Role</Label>
//                 <select
//                   value={role}
//                   onChange={(e) => setRole(e.target.value as any)}
//                   className="w-full mt-1 bg-slate-700 text-white border border-slate-600 p-2 rounded"
//                 >
//                   <option value="admin">Admin</option>
//                   <option value="student">Student</option>
//                 </select>
//               </div>

//               {/* USERNAME */}
//               <div className="relative">
//                 <Label className="text-white">ID</Label>
//                 <User className="absolute left-3 top-9 h-4 w-4 text-slate-400" />
//                 <Input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="pl-10 bg-slate-700 text-white border-slate-600"
//                 />
//               </div>

//               {/* PASSWORD */}
//               <div className="relative">
//                 <Label className="text-white">Password</Label>
//                 <Lock className="absolute left-3 top-9 h-4 w-4 text-slate-400" />
//                 <Input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 pr-10 bg-slate-700 text-white border-slate-600"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-9 text-slate-400"
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>

//               {error && (
//                 <Alert className="border-red-500 bg-red-500/10">
//                   <AlertDescription className="text-red-300">
//                     {error}
//                   </AlertDescription>
//                 </Alert>
//               )}

//               <Button
//                 type="submit"
//                 className="w-full bg-purple-600 hover:bg-purple-700"
//               >
//                 Login
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         {/* NOTIFICATIONS */}
//         <Card className="bg-slate-800/90 border-slate-700">
//   <CardHeader>
//     <CardTitle className="text-white">Notifications</CardTitle>
//   </CardHeader>

//   <CardContent className="text-white">
//   <div className="h-64 overflow-hidden relative">
//     <div className="animate-scroll space-y-3 absolute w-full">


//        {[
//         "R25 BTECH II-I MID II DECEMBER 2025 TIMETABLE",
//         "R20 BTECH I YEAR I SEM SUPPLEMENTARY EXAM – JAN 2026",
//         "R25 BTECH I YEAR I SEM REGULAR END EXAMS – JAN 2026",
//         "MBA I SEM END EXAMS – JAN 2026",
//         "BTECH IV YEAR PROJECT REVIEW DATES",
//         "R23 BTECH II YEAR LAB EXAM SCHEDULE",
//         "Campus placement drive – Infosys",
//         "Campus placement drive – TCS",
//         "Workshop on AI & ML – CSE Dept",
//         "Guest lecture on Cyber Security",
//         "Holiday notice – Sankranti",
//         "Library due date extension",
//         "Internal assessment marks published",
//         "Semester registration open",
//         "Orientation program – 2025 Batch",
//       ].map((n, i) => (
//         <p key={i} className="text-sm text-slate-200">
//           📢 {n}
//         </p>
//       ))}
//     </div>
//     </div>
//   </CardContent>
// </Card>

//       </div>

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-blue-900 text-white text-sm py-4 mt-auto">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-6">
//           <p>
//             © 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.
//           </p>
//           <p>
//             Under the guidance of Dr. B. Srinivasa Rao (Dean Academics, TKREC)
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }



















































































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Eye, EyeOff, User, Lock, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// /* ========================================================================
//    1. INTERNAL UI COMPONENTS
//    ======================================================================== */

// // --- Orientation Slider ---
// const OrientationSlider = () => {
//   const slides = [
//     {
//       id: 1,
//       image: "/orientation/orientationday-2025-1920.webp",
//       text: "Welcome to Orientation 2025"
//     },
//     {
//       id: 2,
//       image: "orientation/graduation1-1920.webp",  
//       text: "Graduation day"
//     },
//     {
//       id: 3,
//       image: "/orientation/orientation1-2025-1920.webp",
//       text: "Orientation day 2025"
//     }
//   ];

//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
//   const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

//   return (
//     <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl group bg-black border border-slate-700">
//       <div 
//         className="flex transition-transform duration-700 ease-in-out h-full" 
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className="min-w-full h-full relative">
//             <img 
//                 src={slide.image} 
//                 alt={slide.text} 
//                 className="w-full h-full object-cover opacity-90"
//                 onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1920&auto=format&fit=crop"; }}
//             />
//             <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-6 text-white text-center">
//               <h3 className="text-2xl font-bold tracking-wide">{slide.text}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 p-3 rounded-full text-white transition-all z-10">
//         <ChevronLeft size={28} />
//       </button>
//       <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 p-3 rounded-full text-white transition-all z-10">
//         <ChevronRight size={28} />
//       </button>
//     </div>
//   );
// };

// // --- Delegate Card ---
// const DelegateCard = ({ name, role, img }: { name: string, role: string, img: string }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center p-4 border border-blue-900">
//     <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-900 mb-3 shadow-inner">
//       <img 
//         src={img} 
//         alt={name} 
//         className="w-full h-full object-cover"
//         onError={(e) => { e.currentTarget.src = "https://randomuser.me/api/portraits/men/1.jpg"; }} 
//       />
//     </div>
//     <div className="text-center w-full">
//       <div className="bg-black text-white py-1 px-4 rounded-full text-sm font-bold uppercase mb-2 shadow-md inline-block">
//         {name}
//       </div>
//       <p className="text-blue-900 text-xs font-bold tracking-wider">{role}</p>
//     </div>
//   </div>
// );

// // --- Info Box Component (For About/Vision/Mission) ---
// const InfoBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
//   <div className="bg-white border-2 border-blue-600 rounded-lg overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-shadow h-full">
//     <div className="bg-blue-600 text-white font-bold py-2 px-3 text-center uppercase tracking-wider text-sm">
//       {title}
//     </div>
//     <div className="p-4 text-xs md:text-sm text-gray-800 flex-1 leading-relaxed bg-blue-50">
//       {children}
//     </div>
//   </div>
// );

// /* ========================================================================
//    2. MAIN LOGIN PAGE COMPONENT
//    ======================================================================== */
// export function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<'admin' | 'student'>('admin');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsSubmitting(true);
//     try {
//       await login(username, password, role);
//       navigate(role === 'admin' ? '/admin' : '/student');
//     } catch (err) {
//       setError('Invalid credentials or server error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      
//       {/* --- HERO BANNER --- */}
//       <div className="relative w-full h-[250px] md:h-[200px]">
//         <img 
//           src="/assets/logo.jpg" 
//           alt="College Campus" 
//           className="w-full h-full object-cover"
//           onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
//         />
//       </div>

//       {/* --- TOP SECTION (SLIDER + LOGIN) --- */}
//       <div className="w-full p-4 md:p-6 bg-white">
//         <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          
//           {/* LEFT: ORIENTATION SLIDER (Occupies 3 columns - 75%) */}
//           <div className="lg:col-span-3 h-[500px] lg:h-[700px]">
//             <OrientationSlider />
//           </div>

//           {/* RIGHT: LOGIN & LINKS (Occupies 1 column - 25%) */}
//           <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            
//             {/* LOGIN BOX */}
//             <div className="bg-black border-2 border-blue-600 rounded-lg p-6 shadow-2xl text-white flex-1 flex flex-col justify-center">
//               <h2 className="text-3xl font-bold text-center mb-6 border-b-2 border-blue-900 pb-3 tracking-widest">PLAGIARISM</h2>
              
//               <form onSubmit={handleLogin} className="space-y-5">
//                 <div>
//                   <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">Select Role</label>
//                   <select 
//                     value={role} 
//                     onChange={(e) => setRole(e.target.value as any)}
//                     className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                   >
//                     <option value="admin">STAFF LOGIN</option>
//                     <option value="student">STUDENT LOGIN</option>
//                   </select>
//                 </div>

//                 <div className="relative">
//                   <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">User ID</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                     <input
//                       type="text"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="Enter ID"
//                       className="w-full bg-gray-900 border border-gray-600 rounded p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter Password"
//                       className="w-full bg-gray-900 border border-gray-600 rounded p-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
//                     >
//                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="bg-red-900/40 border border-red-500 text-red-200 text-sm p-3 rounded text-center font-semibold animate-pulse">
//                     {error}
//                   </div>
//                 )}

//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 rounded uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/50 mt-2"
//                 >
//                   {isSubmitting ? 'Verifying...' : 'LOGIN'}
//                 </button>
//               </form>
//             </div>

//             {/* QUICK LINKS */}
//             <div className="bg-black border-2 border-blue-600 rounded-lg p-4 shadow-xl">
//               <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2 text-sm uppercase tracking-wider">Quick Links</h3>
//               <div className="space-y-3">
//                 <a 
//                   href="https://tkrec.in/" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white py-3 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
//                 >
//                   <ExternalLink size={16} /> MS PORTAL
//                 </a>
//                 <a 
//                   href="https://tkrecautonomous.org/Login.aspx" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white py-3 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
//                 >
//                   <ExternalLink size={16} /> BET PORTAL
//                 </a>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* --- NOTIFICATIONS MARQUEE --- */}
//       <div className="w-full bg-white px-4 md:px-6 pb-6">
//         <div className="w-full bg-black border-y-4 border-blue-700 h-16 flex relative overflow-hidden shadow-2xl z-20">
//           <div className="bg-blue-700 text-white px-6 h-full flex items-center justify-center font-bold text-lg tracking-widest shadow-lg shrink-0 z-20">
//             NOTIFICATIONS
//           </div>
//           <div className="flex-1 flex items-center overflow-hidden bg-black/90 h-full relative">
//              <div className="animate-marquee whitespace-nowrap flex gap-16 items-center h-full pl-4">
//                <span className="text-white text-lg font-medium flex items-center gap-2">📢 R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
//                <span className="text-yellow-400 text-lg font-medium flex items-center gap-2">📢 CAMPUS PLACEMENT DRIVE: INFOSYS RECRUITMENT ON JAN 10</span>
//                <span className="text-white text-lg font-medium flex items-center gap-2">📢 MBA I SEMESTER REGISTRATIONS OPEN NOW</span>
//                <span className="text-green-400 text-lg font-medium flex items-center gap-2">📢 CONGRATULATIONS TO TOPPERS OF 2024 BATCH</span>
//                <span className="text-white text-lg font-medium flex items-center gap-2">📢 R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= COMBINED BOTTOM SECTION ================= */}
//       <div className="w-full pb-12 bg-white px-4 md:px-6">
//         <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          
//           {/* --- LEFT COLUMN: CONTENT (About + Delegates) --- */}
//           <div className="lg:col-span-3 flex flex-col gap-12">
             
//              {/* 1. ABOUT / VISION / MISSION */}
//              <div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <InfoBox title="About Us">
//                         <h3 className="font-bold text-base mb-2 text-center text-blue-900 border-b border-blue-200 pb-1">
//                           TKR Engineering College
//                         </h3>
//                         <p className="mb-2 text-justify">
//                           A modern temple of learning, established in 2005 in a lush green 10 acre campus at Meerpet, Hyderabad.
//                         </p>
//                         <p className="text-justify">
//                           The college provides a serene environment that boosts mental potential and prepares students to face global competition.
//                         </p>
//                     </InfoBox>
//                     <InfoBox title="Institute Vision">
//                         <p className="text-center font-semibold text-blue-900 mb-2 mt-4 text-base">
//                           Excellence in Education
//                         </p>
//                         <p className="text-justify leading-relaxed">
//                           Imparting knowledge and instilling skills in Engineering, Technology, Science and Management to face emerging challenges.
//                         </p>
//                     </InfoBox>
//                     <InfoBox title="Institute Mission">
//                         <ul className="space-y-3 text-xs md:text-sm">
//                             <li className="flex gap-2">
//                                <span className="font-bold text-red-600 whitespace-nowrap">M1:</span> 
//                                <span>Encouraging scholarly activities that transfer knowledge.</span>
//                             </li>
//                             <li className="flex gap-2">
//                                <span className="font-bold text-red-600 whitespace-nowrap">M2:</span> 
//                                <span>Ensuring students are well trained for education and future endeavors.</span>
//                             </li>
//                             <li className="flex gap-2">
//                                <span className="font-bold text-red-600 whitespace-nowrap">M3:</span> 
//                                <span>Inculcating human values and ethics for all-round development.</span>
//                             </li>
//                         </ul>
//                     </InfoBox>
//                     <InfoBox title="Quality Policy">
//                         <p className="text-center font-semibold text-blue-900 mb-2 mt-4 text-base">
//                           Commitment to Quality
//                         </p>
//                         <p className="text-justify leading-relaxed">
//                           TKREC is committed to providing quality technical education with dedicated faculty, infrastructure, labs, and research.
//                         </p>
//                     </InfoBox>
//                 </div>
//              </div>

//              {/* 2. DELEGATES SECTION */}
//              <div>
//                 <div className="bg-black text-white px-8 py-3 inline-block mb-8 rounded-r-full border-l-8 border-white shadow-lg">
//                    <h2 className="text-xl font-bold uppercase tracking-widest">Our Management Delegates</h2>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//                   <DelegateCard name="Sir T. Krishna Reddy" role="Chairman & Founder TKRES" img="/delegates/tkrcet-chairman.webp" />
//                   <DelegateCard name="Sri. T. Harinath Reddy" role="Secretary, TKRES" img="/delegates/tkrcet-secretary.webp" />
//                   <DelegateCard name="Sri. T. Amaranath Reddy" role="Treasurer, TKRES" img="/delegates/tkres-treasurer.webp" />
//                   <DelegateCard name="Dr. K Murali Mohan" role="Principal, TKREC" img="/delegates/tkrec_principal.webp" />
//                   <DelegateCard name="Dr B. Srinivasa Rao" role="Dean of Academics, TKREC" img="/delegates/tkrec-dean.webp" />
//                 </div>
//              </div>

//           </div>
          
//           {/* --- RIGHT COLUMN: CONTACT INFO (Sidebar) --- */}
//           {/* Updated: Added flex flex-col to allow inner flex-1 expansion */}
//           <div className="hidden lg:flex lg:col-span-1 flex-col h-full">
//             <div className="bg-black border-2 border-blue-600 rounded-lg p-4 shadow-xl flex flex-col h-full">
//               <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 text-sm uppercase tracking-wider flex items-center gap-2">
//                  Reach Us
//               </h3>
              
//               {/* Updated Container: flex flex-col allows children to grow */}
//               <div className="space-y-6 flex-1 flex flex-col">
                
//                 {/* Address */}
//                 <div className="flex gap-3 items-start shrink-0">
//                   <div className="mt-1 min-w-[20px]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
//                   </div>
//                   <div>
//                     <p className="text-blue-400 text-xs font-bold uppercase mb-1">Campus Address</p>
//                     <p className="text-gray-300 text-sm leading-snug">
//                       Medbowli, Meerpet, Balapur(M), Hyderabad, Telangana- 500097
//                     </p>
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div className="flex gap-3 items-start shrink-0">
//                   <div className="mt-1 min-w-[20px]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
//                   </div>
//                   <div>
//                     <p className="text-blue-400 text-xs font-bold uppercase mb-1">Contact Support</p>
//                     <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">+91 9849477550</p>
//                     <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">+91 84980 85239 </p>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="flex gap-3 items-start shrink-0">
//                   <div className="mt-1 min-w-[20px]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
//                   </div>
//                   <div>
//                     <p className="text-blue-400 text-xs font-bold uppercase mb-1">Email Inquiry</p>
//                     <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">info@tkrcet.ac.in </p>
//                     <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">verifications@tkrec.ac.in</p>
//                   </div>
//                 </div>

//                 {/* Map - Updated: Wrapped in <a> tag for hyperlink */}
//                 <a 
//                   href="https://www.google.com/maps/search/?api=1&query=Teegala+Krishna+Reddy+Engineering+College+Medbowli+Meerpet+Hyderabad" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="mt-4 border border-gray-700 rounded overflow-hidden flex-1 min-h-[250px] relative group cursor-pointer block"
//                 >
//                   <img 
//                     src="/assets/Meerpet.webp" 
//                     alt="Map Location" 
//                     className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="bg-black/70 text-white text-xs px-2 py-1 rounded border border-blue-500 group-hover:bg-blue-600 transition-colors">
//                         View on Google Maps
//                     </span>
//                   </div>
//                 </a>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* --- FOOTER --- */}
//       <footer className="bg-black text-white text-center py-6 text-sm border-t-4 border-blue-800 mt-auto">
//         <div className="flex flex-col gap-2">
//           <p className="font-semibold tracking-wide">© 2026 Teegala Krishna Reddy Engineering College, All Rights Reserved.</p>
//           <p className="text-gray-400">Designed, Developed & Maintenance  under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>

//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee {
//           animation: marquee 30s linear infinite;
//         }
//         .animate-marquee:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </div>
//   );
// }




























































import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, User, Lock, ChevronLeft, ChevronRight, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';

/* ========================================================================
   1. INTERNAL UI COMPONENTS
   ======================================================================== */

// --- Orientation Slider ---
const OrientationSlider = () => {
  const slides = [
    {
      id: 1,
      image: "/orientation/orientationday-2025-1920.webp",
      text: "Welcome to Orientation 2025"
    },
    {
      id: 2,
      image: "orientation/graduation1-1920.webp",  
      text: "Graduation day"
    },
    {
      id: 3,
      image: "/orientation/orientation1-2025-1920.webp",
      text: "Orientation day 2025"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl group bg-black border border-slate-700">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img 
                src={slide.image} 
                alt={slide.text} 
                className="w-full h-full object-cover opacity-90"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1920&auto=format&fit=crop"; }}
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 md:p-6 text-white text-center">
              <h3 className="text-xl md:text-3xl font-bold tracking-wide shadow-black drop-shadow-md">{slide.text}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 p-2 md:p-3 rounded-full text-white transition-all z-10 backdrop-blur-sm">
        <ChevronLeft size={24} className="md:w-8 md:h-8" />
      </button>
      <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 p-2 md:p-3 rounded-full text-white transition-all z-10 backdrop-blur-sm">
        <ChevronRight size={24} className="md:w-8 md:h-8" />
      </button>
    </div>
  );
};

// --- Delegate Card ---
const DelegateCard = ({ name, role, img }: { name: string, role: string, img: string }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center p-4 border border-blue-900 h-full">
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-900 mb-3 shadow-inner shrink-0">
      <img 
        src={img} 
        alt={name} 
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = "https://randomuser.me/api/portraits/men/1.jpg"; }} 
      />
    </div>
    <div className="text-center w-full flex flex-col justify-between flex-1">
      <div className="bg-black text-white py-1 px-3 rounded-full text-xs md:text-sm font-bold uppercase mb-2 shadow-md inline-block mx-auto">
        {name}
      </div>
      <p className="text-blue-900 text-[10px] md:text-xs font-bold tracking-wider">{role}</p>
    </div>
  </div>
);

// --- Info Box Component (For About/Vision/Mission) ---
const InfoBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white border-2 border-blue-600 rounded-lg overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-shadow h-full">
    <div className="bg-blue-600 text-white font-bold py-2 px-3 text-center uppercase tracking-wider text-sm">
      {title}
    </div>
    <div className="p-4 text-sm text-gray-800 flex-1 leading-relaxed bg-blue-50">
      {children}
    </div>
  </div>
);

/* ========================================================================
   2. MAIN LOGIN PAGE COMPONENT
   ======================================================================== */
export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'student'>('admin');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(username, password, role);
      navigate(role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      setError('Invalid credentials or server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // REMOVED min-w-[1280px]. Now it adapts to phone width naturally.
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      
      {/* --- HERO BANNER --- */}
      {/* Height grows on desktop (md/lg), shrinks on mobile */}
      <div className="relative w-full h-[150px] md:h-[250px]">
        <img 
          src="/assets/logo.jpg" 
          alt="College Campus" 
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* --- TOP SECTION (SLIDER + LOGIN) --- */}
      <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6">
        
        {/* RESPONSIVE GRID: 1 column on mobile, 4 columns on desktop (lg) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* LEFT: ORIENTATION SLIDER */}
          {/* Responsive Span: Full width mobile, 3 cols desktop */}
          {/* Responsive Height: 250px mobile, 400px tablet, 650px desktop */}
          <div className="lg:col-span-3 h-[250px] sm:h-[400px] lg:h-[650px]">
            <OrientationSlider />
          </div>

          {/* RIGHT: LOGIN & LINKS */}
          {/* Responsive Span: Full width mobile, 1 col desktop */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            
            {/* LOGIN BOX */}
            <div className="bg-black border-2 border-blue-600 rounded-lg p-5 md:p-6 shadow-2xl text-white">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 border-b-2 border-blue-900 pb-3 tracking-widest">PLAGIARISM</h2>
              
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">Select Role</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  >
                    <option value="admin">STAFF LOGIN</option>
                    <option value="student">STUDENT LOGIN</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">User ID</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter ID"
                      className="w-full bg-gray-900 border border-gray-600 rounded p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full bg-gray-900 border border-gray-600 rounded p-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-900/40 border border-red-500 text-red-200 text-xs p-2 rounded text-center font-semibold animate-pulse">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 rounded uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/50 mt-2 text-sm md:text-base"
                >
                  {isSubmitting ? 'Verifying...' : 'LOGIN'}
                </button>
              </form>
            </div>

            {/* QUICK LINKS */}
            <div className="bg-black border-2 border-blue-600 rounded-lg p-4 shadow-xl">
              <h3 className="text-white font-bold mb-3 border-b border-gray-700 pb-2 text-sm uppercase tracking-wider">Quick Links</h3>
              <div className="space-y-3">
                <a 
                  href="https://tkrec.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white py-2.5 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ExternalLink size={16} /> MS PORTAL
                </a>
                <a 
                  href="https://tkrecautonomous.org/Login.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white py-2.5 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ExternalLink size={16} /> BET PORTAL
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- NOTIFICATIONS MARQUEE --- */}
      <div className="w-full bg-white px-2 md:px-6 pb-6">
        <div className="w-full bg-black border-y-4 border-blue-700 h-12 md:h-16 flex relative overflow-hidden shadow-2xl z-20">
          <div className="bg-blue-700 text-white px-3 md:px-6 h-full flex items-center justify-center font-bold text-xs md:text-lg tracking-widest shadow-lg shrink-0 z-20">
            NOTIFICATIONS
          </div>
          <div className="flex-1 flex items-center overflow-hidden bg-black/90 h-full relative">
             <div className="animate-marquee whitespace-nowrap flex gap-8 md:gap-16 items-center h-full pl-4">
               <span className="text-white text-sm md:text-lg font-medium flex items-center gap-2">📢 R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
               <span className="text-yellow-400 text-sm md:text-lg font-medium flex items-center gap-2">📢 CAMPUS PLACEMENT DRIVE: INFOSYS RECRUITMENT ON JAN 10</span>
               <span className="text-white text-sm md:text-lg font-medium flex items-center gap-2">📢 MBA I SEMESTER REGISTRATIONS OPEN NOW</span>
               <span className="text-green-400 text-sm md:text-lg font-medium flex items-center gap-2">📢 CONGRATULATIONS TO TOPPERS OF 2024 BATCH</span>
               <span className="text-white text-sm md:text-lg font-medium flex items-center gap-2">📢 R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
             </div>
          </div>
        </div>
      </div>

      {/* ================= COMBINED BOTTOM SECTION ================= */}
      <div className="w-full max-w-[1440px] mx-auto pb-12 px-4 md:px-6">
        {/* RESPONSIVE GRID: 1 col mobile -> 4 cols desktop (lg) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* --- LEFT COLUMN: CONTENT (About + Delegates) --- */}
          <div className="lg:col-span-3 flex flex-col gap-8 md:gap-12">
             
             {/* 1. ABOUT / VISION / MISSION */}
             <div>
                {/* 1 col mobile -> 2 col tablet -> 4 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <InfoBox title="About Us">
                        <h3 className="font-bold text-base mb-2 text-center text-blue-900 border-b border-blue-200 pb-1">
                          TKR Engineering College
                        </h3>
                        <p className="mb-2 text-justify">
                          A modern temple of learning, established in 2005 in a lush green 10 acre campus at Meerpet, Hyderabad.
                        </p>
                        <p className="text-justify">
                          The college provides a serene environment that boosts mental potential and prepares students to face global competition.
                        </p>
                    </InfoBox>
                    <InfoBox title="Institute Vision">
                        <p className="text-center font-semibold text-blue-900 mb-2 mt-4 text-base">
                          Excellence in Education
                        </p>
                        <p className="text-justify leading-relaxed">
                          Imparting knowledge and instilling skills in Engineering, Technology, Science and Management to face emerging challenges.
                        </p>
                    </InfoBox>
                    <InfoBox title="Institute Mission">
                        <ul className="space-y-3 text-sm">
                            <li className="flex gap-2">
                               <span className="font-bold text-red-600 whitespace-nowrap">M1:</span> 
                               <span>Encouraging scholarly activities that transfer knowledge.</span>
                            </li>
                            <li className="flex gap-2">
                               <span className="font-bold text-red-600 whitespace-nowrap">M2:</span> 
                               <span>Ensuring students are well trained for education and future endeavors.</span>
                            </li>
                            <li className="flex gap-2">
                               <span className="font-bold text-red-600 whitespace-nowrap">M3:</span> 
                               <span>Inculcating human values and ethics for all-round development.</span>
                            </li>
                        </ul>
                    </InfoBox>
                    <InfoBox title="Quality Policy">
                        <p className="text-center font-semibold text-blue-900 mb-2 mt-4 text-base">
                          Commitment to Quality
                        </p>
                        <p className="text-justify leading-relaxed">
                          TKREC is committed to providing quality technical education with dedicated faculty, infrastructure, labs, and research.
                        </p>
                    </InfoBox>
                </div>
             </div>

             {/* 2. DELEGATES SECTION */}
             <div>
                <div className="bg-black text-white px-4 md:px-8 py-3 inline-block mb-6 md:mb-8 rounded-r-full border-l-8 border-white shadow-lg">
                   <h2 className="text-sm md:text-xl font-bold uppercase tracking-widest">Our Management Delegates</h2>
                </div>
                {/* 2 cols mobile -> 3 cols tablet -> 5 cols desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  <DelegateCard name="Sir T. Krishna Reddy" role="Chairman & Founder TKRES" img="/delegates/tkrcet-chairman.webp" />
                  <DelegateCard name="Sri. T. Harinath Reddy" role="Secretary, TKRES" img="/delegates/tkrcet-secretary.webp" />
                  <DelegateCard name="Sri. T. Amaranath Reddy" role="Treasurer, TKRES" img="/delegates/tkres-treasurer.webp" />
                  <DelegateCard name="Dr. K Murali Mohan" role="Principal, TKREC" img="/delegates/tkrec_principal.webp" />
                  <DelegateCard name="Dr B. Srinivasa Rao" role="Dean of Academics, TKREC" img="/delegates/tkrec-dean.webp" />
                </div>
             </div>

          </div>
          
          {/* --- RIGHT COLUMN: CONTACT INFO (Sidebar) --- */}
          <div className="flex lg:col-span-1 flex-col h-full">
            <div className="bg-black border-2 border-blue-600 rounded-lg p-4 shadow-xl flex flex-col h-full">
              <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                  Reach Us
              </h3>
              
              <div className="space-y-6 flex-1 flex flex-col">
                
                {/* Address */}
                <div className="flex gap-3 items-start shrink-0">
                  <div className="mt-1 min-w-[20px]">
                    <MapPin size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs font-bold uppercase mb-1">Campus Address</p>
                    <p className="text-gray-300 text-sm leading-snug">
                      Medbowli, Meerpet, Balapur(M), Hyderabad, Telangana- 500097
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 items-start shrink-0">
                  <div className="mt-1 min-w-[20px]">
                     <Phone size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs font-bold uppercase mb-1">Contact Support</p>
                    <a href="tel:+919849477550" className="block text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">+91 9849477550</a>
                    <a href="tel:+918498085239" className="block text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">+91 84980 85239 </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-start shrink-0">
                  <div className="mt-1 min-w-[20px]">
                    <Mail size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs font-bold uppercase mb-1">Email Inquiry</p>
                    <a href="mailto:info@tkrcet.ac.in" className="block text-gray-300 text-sm hover:text-white transition-colors cursor-pointer break-all">info@tkrcet.ac.in </a>
                    <a href="mailto:verifications@tkrec.ac.in" className="block text-gray-300 text-sm hover:text-white transition-colors cursor-pointer break-all">verifications@tkrec.ac.in</a>
                  </div>
                </div>

                {/* Map */}
                <a 
                  href="https://maps.google.com/?q=TKREC+Hyderabad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 border border-gray-700 rounded overflow-hidden flex-1 min-h-[200px] lg:min-h-[250px] relative group cursor-pointer block bg-gray-900"
                >
                  <img 
                    src="/assets/Meerpet.webp" 
                    alt="Map Location" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    onError={(e) => { e.currentTarget.style.display='none'; }} 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/70 text-white text-xs px-3 py-2 rounded border border-blue-500 group-hover:bg-blue-600 transition-colors">
                        View on Google Maps
                    </span>
                  </div>
                </a>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white text-center py-6 px-4 text-xs md:text-sm border-t-4 border-blue-800 mt-auto">
        <div className="flex flex-col gap-2">
          <p className="font-semibold tracking-wide">© 2026 Teegala Krishna Reddy Engineering College, All Rights Reserved.</p>
          <p className="text-gray-400">Designed, Developed & Maintenance  under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
