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























































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Eye, EyeOff, User, Lock, ChevronLeft, ChevronRight, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';

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
//               <h3 className="text-2xl font-bold tracking-wide shadow-black drop-shadow-md">{slide.text}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 p-3 rounded-full text-white transition-all z-10 backdrop-blur-sm">
//         <ChevronLeft size={28} />
//       </button>
//       <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 p-3 rounded-full text-white transition-all z-10 backdrop-blur-sm">
//         <ChevronRight size={28} />
//       </button>
//     </div>
//   );
// };

// // --- Delegate Card ---
// const DelegateCard = ({ name, role, img }: { name: string, role: string, img: string }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center p-4 border border-blue-900 h-full">
//     <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-900 mb-3 shadow-inner shrink-0">
//       <img 
//         src={img} 
//         alt={name} 
//         className="w-full h-full object-cover"
//         onError={(e) => { e.currentTarget.src = "https://randomuser.me/api/portraits/men/1.jpg"; }} 
//       />
//     </div>
//     <div className="text-center w-full flex flex-col justify-between flex-1">
//       <div className="bg-black text-white py-1 px-4 rounded-full text-sm font-bold uppercase mb-2 shadow-md inline-block mx-auto">
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
//     <div className="p-4 text-sm text-gray-800 flex-1 leading-relaxed bg-blue-50">
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
//     // FIX 1: Added min-w-[1280px] to force desktop width on all devices
//     <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden pb-24">
      
//      {/* --- HERO BANNER --- */}
//       <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 pt-4 md:pt-6">
//         <div className="relative w-full h-auto overflow-hidden rounded-lg shadow-md">
//           <img 
//             src="/assets/logo.jpg" 
//             alt="College Campus" 
//             className="w-full h-auto object-contain"
//             onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
//           />
//           {/* Optional Overlay - removed or made lighter so it doesn't obscure text */}
//           <div className="absolute inset-0 bg-black/5"></div>
//         </div>
//       </div>

//       {/* --- TOP SECTION (SLIDER + LOGIN) --- */}
//       <div className="w-full max-w-[1440px] mx-auto p-6">
//         {/* FIX 3: Removed lg: prefix, forced grid-cols-4 */}
//         <div className="w-full grid grid-cols-4 gap-6">
          
//           {/* LEFT: ORIENTATION SLIDER (Occupies 3 columns) */}
//           {/* FIX 4: Fixed height to 650px */}
//           <div className="col-span-3 h-[650px]">
//             <OrientationSlider />
//           </div>

//           {/* RIGHT: LOGIN & LINKS (Occupies 1 column) */}
//           <div className="col-span-1 flex flex-col gap-4">
            
//             {/* LOGIN BOX */}
//             <div className="bg-black border-2 border-blue-600 rounded-lg p-6 shadow-2xl text-white">
//               <h2 className="text-3xl font-bold text-center mb-6 border-b-2 border-blue-900 pb-3 tracking-widest">PLAGIARISM</h2>
              
//               <form onSubmit={handleLogin} className="space-y-5">
//                 <div>
//                   <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">Select Role</label>
//                   <select 
//                     value={role} 
//                     onChange={(e) => setRole(e.target.value as any)}
//                     className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
//                   >
//                     <option value="admin">STAFF LOGIN</option>
//                     <option value="student">STUDENT LOGIN</option>
//                   </select>
//                 </div>

//                 <div className="relative">
//                   <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">User ID</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                     <input
//                       type="text"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="Enter ID"
//                       className="w-full bg-gray-900 border border-gray-600 rounded p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <label className="block text-xs uppercase text-blue-400 mb-1 font-bold">Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter Password"
//                       className="w-full bg-gray-900 border border-gray-600 rounded p-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="bg-red-900/40 border border-red-500 text-red-200 text-xs p-2 rounded text-center font-semibold animate-pulse">
//                     {error}
//                   </div>
//                 )}

//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 rounded uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/50 mt-2 text-base"
//                 >
//                   {isSubmitting ? 'Verifying...' : 'LOGIN'}
//                 </button>
//               </form>
//             </div>

//             {/* QUICK LINKS */}
//             <div className="bg-black border-2 border-blue-600 rounded-lg p-4 shadow-xl">
//               <h3 className="text-white font-bold mb-3 border-b border-gray-700 pb-2 text-sm uppercase tracking-wider">Quick Links</h3>
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

//      {/* --- NOTIFICATIONS MARQUEE (FIXED ALIGNMENT) --- */}
//       <div className="w-full bg-white pb-6">
//         <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
//           <div className="w-full bg-black border-y-4 border-blue-700 h-12 md:h-16 flex relative overflow-hidden shadow-2xl z-20">
//             <div className="bg-blue-700 text-white px-3 md:px-6 h-full flex items-center justify-center font-bold text-xs md:text-lg tracking-widest shadow-lg shrink-0 z-20">
//               NOTIFICATIONS
//             </div>
//             <div className="flex-1 flex items-center overflow-hidden bg-black/90 h-full relative">
//                <div className="animate-marquee whitespace-nowrap flex gap-8 md:gap-16 items-center h-full pl-4">
//                  <span className="text-white text-sm md:text-lg font-medium flex items-center gap-2">📢 R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
//                  <span className="text-yellow-400 text-sm md:text-lg font-medium flex items-center gap-2">📢 CAMPUS PLACEMENT DRIVE: INFOSYS RECRUITMENT ON JAN 10</span>
//                  <span className="text-white text-sm md:text-lg font-medium flex items-center gap-2">📢 MBA I SEMESTER REGISTRATIONS OPEN NOW</span>
//                  <span className="text-green-400 text-sm md:text-lg font-medium flex items-center gap-2">📢 CONGRATULATIONS TO TOPPERS OF 2024 BATCH</span>
//                  <span className="text-white text-sm md:text-lg font-medium flex items-center gap-2">📢 R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
//                </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= COMBINED BOTTOM SECTION ================= */}
//       <div className="w-full max-w-[1440px] mx-auto pb-12 px-6">
//         {/* FIX 5: Forced grid-cols-4 (No responsive changing) */}
//         <div className="w-full grid grid-cols-4 gap-6">
          
//           {/* --- LEFT COLUMN: CONTENT (About + Delegates) --- */}
//           <div className="col-span-3 flex flex-col gap-12">
             
//              {/* 1. ABOUT / VISION / MISSION */}
//              <div>
//                 {/* FIX 6: Forced grid-cols-4 */}
//                 <div className="grid grid-cols-4 gap-4">
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
//                         <ul className="space-y-3 text-sm">
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
//                 {/* FIX 7: Forced grid-cols-5 */}
//                 <div className="grid grid-cols-5 gap-6">
//                   <DelegateCard name="Sir T. Krishna Reddy" role="Chairman & Founder TKRES" img="/delegates/tkrcet-chairman.webp" />
//                   <DelegateCard name="Sri. T. Harinath Reddy" role="Secretary, TKRES" img="/delegates/tkrcet-secretary.webp" />
//                   <DelegateCard name="Sri. T. Amaranath Reddy" role="Treasurer, TKRES" img="/delegates/tkres-treasurer.webp" />
//                   <DelegateCard name="Dr. K Murali Mohan" role="Principal, TKREC" img="/delegates/tkrec_principal.webp" />
//                   <DelegateCard name="Dr B. Srinivasa Rao" role="Dean of Academics, TKREC" img="/delegates/tkrec-dean.webp" />
//                 </div>
//              </div>

//           </div>
          
//           {/* --- RIGHT COLUMN: CONTACT INFO --- */}
//           {/* FIX 8: Removed 'hidden' and flex display logic to stay as sidebar */}
//           <div className="col-span-1 flex flex-col h-full">
//             <div className="bg-black border-2 border-blue-600 rounded-lg p-4 shadow-xl flex flex-col h-full">
//               <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 text-sm uppercase tracking-wider flex items-center gap-2">
//                   Reach Us
//               </h3>
              
//               <div className="space-y-6 flex-1 flex flex-col">
                
//                 {/* Address */}
//                 <div className="flex gap-3 items-start shrink-0">
//                   <div className="mt-1 min-w-[20px]">
//                     <MapPin size={18} className="text-blue-500" />
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
//                      <Phone size={18} className="text-blue-500" />
//                   </div>
//                   <div>
//                     <p className="text-blue-400 text-xs font-bold uppercase mb-1">Contact Support</p>
//                     <a href="tel:+919849477550" className="block text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">+91 9849477550</a>
//                     <a href="tel:+918498085239" className="block text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">+91 84980 85239 </a>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="flex gap-3 items-start shrink-0">
//                   <div className="mt-1 min-w-[20px]">
//                     <Mail size={18} className="text-blue-500" />
//                   </div>
//                   <div>
//                     <p className="text-blue-400 text-xs font-bold uppercase mb-1">Email Inquiry</p>
//                     <a href="mailto:info@tkrcet.ac.in" className="block text-gray-300 text-sm hover:text-white transition-colors cursor-pointer break-all">info@tkrcet.ac.in </a>
//                     <a href="mailto:verifications@tkrec.ac.in" className="block text-gray-300 text-sm hover:text-white transition-colors cursor-pointer break-all">verifications@tkrec.ac.in</a>
//                   </div>
//                 </div>

//                 {/* Map */}
//                 <a 
//                   href="https://maps.google.com/?q=TKREC+Hyderabad" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="mt-4 border border-gray-700 rounded overflow-hidden flex-1 min-h-[250px] relative group cursor-pointer block bg-gray-900"
//                 >
//                   <img 
//                     src="/assets/Meerpet.webp" 
//                     alt="Map Location" 
//                     className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
//                     onError={(e) => { e.currentTarget.style.display='none'; }} 
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="bg-black/70 text-white text-xs px-3 py-2 rounded border border-blue-500 group-hover:bg-blue-600 transition-colors">
//                         View on Google Maps
//                     </span>
//                   </div>
//                 </a>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//      {/* --- FOOTER (FIXED AT BOTTOM) --- */}
//       <footer className="fixed bottom-0 left-0 w-full bg-black text-white text-center py-4 px-4 text-xs md:text-sm border-t-4 border-blue-800 z-50 shadow-2xl">
//         <div className="flex flex-col gap-1 md:gap-2 max-w-[1440px] mx-auto">
//           <p className="font-semibold tracking-wide">© 2026 Teegala Krishna Reddy Engineering College, All Rights Reserved.</p>
//           <p className="text-gray-400 text-[10px] md:text-xs">Designed, Developed & Maintenance under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
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


















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Eye, EyeOff, User, Lock, ChevronLeft, ChevronRight, ExternalLink, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

// /* ========================================================================
//    1. INTERNAL UI COMPONENTS
//    ======================================================================== */

// // --- Orientation Slider (Modernized) ---
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
//       text: "Celebrating Excellence - Graduation Day"
//     },
//     {
//       id: 3,
//       image: "/orientation/orientation1-2025-1920.webp",
//       text: "A New Chapter Begins"
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
//     <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl group border border-gray-100 bg-white">
//       <div 
//         className="flex transition-transform duration-700 ease-in-out h-full" 
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className="min-w-full h-full relative">
//             <img 
//                 src={slide.image} 
//                 alt={slide.text} 
//                 className="w-full h-full object-cover"
//                 onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1920&auto=format&fit=crop"; }}
//             />
//             {/* Glassmorphism Caption */}
//             <div className="absolute bottom-0 w-full bg-slate-900/70 backdrop-blur-sm p-6 text-white text-center">
//               <h3 className="text-lg md:text-2xl font-bold tracking-wide drop-shadow-md font-sans">{slide.text}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all z-10 border border-white/30">
//         <ChevronLeft size={24} />
//       </button>
//       <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all z-10 border border-white/30">
//         <ChevronRight size={24} />
//       </button>
//     </div>
//   );
// };

// // --- Delegate Card (Clean White Card Style) ---
// const DelegateCard = ({ name, role, img }: { name: string, role: string, img: string }) => (
//   <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-5 border border-gray-100 h-full">
//     <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-slate-50 mb-4 shadow-inner shrink-0">
//       <img 
//         src={img} 
//         alt={name} 
//         className="w-full h-full object-cover"
//         onError={(e) => { e.currentTarget.src = "https://randomuser.me/api/portraits/men/1.jpg"; }} 
//       />
//     </div>
//     <div className="text-center w-full flex flex-col justify-between flex-1">
//       <h4 className="text-slate-800 font-bold text-sm md:text-base mb-1">{name}</h4>
//       <p className="text-indigo-600 text-xs font-semibold tracking-wide uppercase">{role}</p>
//     </div>
//   </div>
// );

// // --- Info Box Component (Minimalist) ---
// const InfoBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
//   <div className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300 h-full border border-gray-100">
//     <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold py-3 px-4 text-center uppercase tracking-wider text-sm shadow-sm">
//       {title}
//     </div>
//     <div className="p-5 text-sm text-gray-600 flex-1 leading-relaxed">
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
//     // FIX: Main container with large padding-bottom (pb-32) to prevent Footer overlap
//     <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24">
      
//       {/* --- HERO BANNER --- */}
//       <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 pt-4 md:pt-6">
//         <div className="relative w-full h-auto overflow-hidden rounded-2xl shadow-sm bg-white border border-gray-100 p-2">
//           <img 
//             src="/assets/logo.jpg" 
//             alt="College Campus" 
//             className="w-full h-auto object-contain rounded-xl"
//             onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
//           />
//         </div>
//       </div>

//       {/* --- TOP SECTION (SLIDER + LOGIN) --- */}
//       <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6">
//         <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          
//           {/* LEFT: ORIENTATION SLIDER */}
//           <div className="md:col-span-3 h-[300px] sm:h-[400px] lg:h-[650px]">
//             <OrientationSlider />
//           </div>

//           {/* RIGHT: LOGIN & LINKS */}
//           <div className="md:col-span-1 flex flex-col gap-6">
            
//             {/* LOGIN BOX (Modern Slate/Navy Design) */}
//             <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden border border-slate-700/50">
//               {/* Subtle gradient glow effect */}
//               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
//               <h2 className="text-2xl font-bold text-center mb-6 tracking-widest text-blue-100">PLAGIARISM</h2>
              
//               <form onSubmit={handleLogin} className="space-y-5 relative z-10">
//                 <div>
//                   <label className="block text-xs uppercase text-blue-300 mb-1 font-bold tracking-wider">Select Role</label>
//                   <div className="relative">
//                     <select 
//                       value={role} 
//                       onChange={(e) => setRole(e.target.value as any)}
//                       className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm appearance-none cursor-pointer hover:bg-slate-800"
//                     >
//                       <option value="admin">STAFF LOGIN</option>
//                       <option value="student">STUDENT LOGIN</option>
//                     </select>
//                     <ChevronLeft className="absolute right-3 top-3.5 rotate-[-90deg] text-slate-400 pointer-events-none" size={16} />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs uppercase text-blue-300 mb-1 font-bold tracking-wider">User ID</label>
//                   <div className="relative group">
//                     <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
//                     <input
//                       type="text"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="Enter ID"
//                       className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm placeholder-slate-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs uppercase text-blue-300 mb-1 font-bold tracking-wider">Password</label>
//                   <div className="relative group">
//                     <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter Password"
//                       className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm placeholder-slate-500"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg text-center font-medium animate-pulse">
//                     {error}
//                   </div>
//                 )}

//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg uppercase tracking-wider transition-all shadow-lg shadow-blue-900/20 mt-2 text-sm"
//                 >
//                   {isSubmitting ? 'Verifying...' : 'LOGIN'}
//                 </button>
//               </form>
//             </div>

//             {/* QUICK LINKS */}
//             <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg">
//               <h3 className="text-slate-800 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
//                 Quick Access <ArrowRight size={14} className="text-blue-500" />
//               </h3>
//               <div className="space-y-3">
//                 <a 
//                   href="https://tkrec.in/" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-gray-200 hover:border-blue-200 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all group"
//                 >
//                   <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-500" /> MS PORTAL
//                 </a>
//                 <a 
//                   href="https://tkrecautonomous.org/Login.aspx" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-gray-200 hover:border-blue-200 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all group"
//                 >
//                   <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-500" /> BET PORTAL
//                 </a>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* --- NOTIFICATIONS MARQUEE --- */}
//       <div className="w-full pb-6">
//         <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
//           <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl flex relative overflow-hidden shadow-lg z-20 border border-slate-700">
//             <div className="bg-indigo-600 text-white px-4 md:px-6 h-12 flex items-center justify-center font-bold text-xs md:text-sm tracking-widest shadow-lg shrink-0 z-20 relative">
//               ALERTS
//               <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-slate-900/50 to-transparent"></div>
//             </div>
//             <div className="flex-1 flex items-center overflow-hidden h-12 relative">
//                <div className="animate-marquee whitespace-nowrap flex gap-12 items-center pl-4 text-sm font-medium text-slate-200">
//                  <span className="flex items-center gap-2"><span className="text-blue-400">●</span> R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
//                  <span className="flex items-center gap-2 text-yellow-300"><span className="text-yellow-500">●</span> CAMPUS PLACEMENT DRIVE: INFOSYS RECRUITMENT ON JAN 10</span>
//                  <span className="flex items-center gap-2"><span className="text-blue-400">●</span> MBA I SEMESTER REGISTRATIONS OPEN NOW</span>
//                  <span className="flex items-center gap-2 text-green-300"><span className="text-green-500">●</span> CONGRATULATIONS TO TOPPERS OF 2024 BATCH</span>
//                </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= COMBINED BOTTOM SECTION ================= */}
//       <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
//         <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          
//           {/* --- LEFT COLUMN: CONTENT --- */}
//           <div className="md:col-span-3 flex flex-col gap-10">
             
//              {/* 1. ABOUT / VISION / MISSION */}
//              <div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
//                     <InfoBox title="About Us">
//                         <h3 className="font-bold text-sm text-center text-slate-800 mb-2 border-b border-gray-100 pb-2">
//                           TKR Engineering College
//                         </h3>
//                         <p className="text-justify text-xs text-gray-500 leading-relaxed">
//                           A modern temple of learning, established in 2005 in a lush green 10 acre campus at Meerpet, Hyderabad.
//                         </p>
//                     </InfoBox>
//                     <InfoBox title="Institute Vision">
//                         <p className="text-center font-bold text-slate-800 mb-2 text-sm">
//                           Excellence in Education
//                         </p>
//                         <p className="text-justify text-xs text-gray-500 leading-relaxed">
//                           Imparting knowledge and instilling skills in Engineering, Technology, Science and Management.
//                         </p>
//                     </InfoBox>
//                     <InfoBox title="Institute Mission">
//                         <ul className="space-y-2 text-xs text-gray-500">
//                             <li className="flex gap-2">
//                                <span className="font-bold text-indigo-600">M1:</span> 
//                                <span>Encouraging scholarly activities.</span>
//                             </li>
//                             <li className="flex gap-2">
//                                <span className="font-bold text-indigo-600">M2:</span> 
//                                <span>Ensuring students are well trained.</span>
//                             </li>
//                             <li className="flex gap-2">
//                                <span className="font-bold text-indigo-600">M3:</span> 
//                                <span>Inculcating human values and ethics.</span>
//                             </li>
//                         </ul>
//                     </InfoBox>
//                     <InfoBox title="Quality Policy">
//                         <p className="text-center font-bold text-slate-800 mb-2 text-sm">
//                           Commitment to Quality
//                         </p>
//                         <p className="text-justify text-xs text-gray-500 leading-relaxed">
//                           TKREC is committed to providing quality technical education with dedicated faculty and infrastructure.
//                         </p>
//                     </InfoBox>
//                 </div>
//              </div>

//              {/* 2. DELEGATES SECTION */}
//              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
//                 <div className="flex items-center gap-4 mb-6">
//                     <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
//                     <h2 className="text-xl font-bold text-slate-800 tracking-wide uppercase">Our Management Delegates</h2>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
//                   <DelegateCard name="Sir T. Krishna Reddy" role="Chairman" img="/delegates/tkrcet-chairman.webp" />
//                   <DelegateCard name="Sri. T. Harinath Reddy" role="Secretary" img="/delegates/tkrcet-secretary.webp" />
//                   <DelegateCard name="Sri. T. Amaranath Reddy" role="Treasurer" img="/delegates/tkres-treasurer.webp" />
//                   <DelegateCard name="Dr. K Murali Mohan" role="Principal" img="/delegates/tkrec_principal.webp" />
//                   <DelegateCard name="Dr B. Srinivasa Rao" role="Dean Academics" img="/delegates/tkrec-dean.webp" />
//                 </div>
//              </div>

//           </div>
          
//           {/* --- RIGHT COLUMN: CONTACT INFO (Sidebar) --- */}
//           <div className="flex md:col-span-1 flex-col h-full">
//             <div className="bg-slate-900 rounded-2xl p-6 shadow-xl flex flex-col h-full text-white border border-slate-700">
//               <h3 className="text-blue-200 font-bold mb-6 border-b border-slate-700 pb-3 text-sm uppercase tracking-wider flex items-center gap-2">
//                   <MapPin size={16} /> Reach Us
//               </h3>
              
//               <div className="space-y-8 flex-1 flex flex-col">
                
//                 {/* Address */}
//                 <div className="flex gap-4 items-start shrink-0 group">
//                   <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
//                     <MapPin size={18} className="text-blue-400 group-hover:text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Campus Address</p>
//                     <p className="text-slate-200 text-sm leading-relaxed">
//                       Medbowli, Meerpet, Balapur(M), Hyderabad, Telangana - 500097
//                     </p>
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div className="flex gap-4 items-start shrink-0 group">
//                   <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
//                      <Phone size={18} className="text-blue-400 group-hover:text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Contact Support</p>
//                     <a href="tel:+919849477550" className="block text-white text-sm hover:text-blue-400 transition-colors cursor-pointer">+91 9849477550</a>
//                     <a href="tel:+918498085239" className="block text-white text-sm hover:text-blue-400 transition-colors cursor-pointer">+91 84980 85239 </a>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="flex gap-4 items-start shrink-0 group">
//                   <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
//                     <Mail size={18} className="text-blue-400 group-hover:text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Email Inquiry</p>
//                     <a href="mailto:info@tkrcet.ac.in" className="block text-white text-sm hover:text-blue-400 transition-colors cursor-pointer break-all">info@tkrcet.ac.in </a>
//                   </div>
//                 </div>

//                 {/* Map */}
//                 <a 
//                   href="https://maps.google.com/?q=TKREC+Hyderabad" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="mt-4 rounded-xl overflow-hidden flex-1 min-h-[200px] lg:min-h-[250px] relative group cursor-pointer block border border-slate-700 shadow-inner"
//                 >
//                   <img 
//                     src="/assets/Meerpet.webp" 
//                     alt="Map Location" 
//                     className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110"
//                     onError={(e) => { e.currentTarget.style.display='none'; }} 
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-all">
//                     <span className="bg-white/90 backdrop-blur text-slate-900 text-xs px-4 py-2 rounded-full font-bold shadow-lg group-hover:scale-105 transition-transform flex items-center gap-2">
//                         <MapPin size={12} /> View on Google Maps
//                     </span>
//                   </div>
//                 </a>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* --- FOOTER (FIXED) --- */}
//       <footer className="fixed bottom-0 left-0 w-full bg-slate-900 text-center py-4 px-4 text-xs border-t border-slate-800 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
//         <div className="flex flex-col gap-1 md:gap-1 max-w-[1440px] mx-auto">
//           <p className="font-medium text-slate-300 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
//           <p className="text-slate-500 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>

//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee {
//           animation: marquee 40s linear infinite;
//         }
//         .animate-marquee:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </div>
//   );
// }













































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Eye, EyeOff, User, Lock, ChevronLeft, ChevronRight, ExternalLink, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

// /* ========================================================================
//    1. INTERNAL UI COMPONENTS
//    ======================================================================== */

// // --- Orientation Slider (Modernized) ---
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
//       text: "Celebrating Excellence - Graduation Day"
//     },
//     {
//       id: 3,
//       image: "/orientation/orientation1-2025-1920.webp",
//       text: "A New Chapter Begins"
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
//     <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl group border border-gray-100 bg-white">
//       <div 
//         className="flex transition-transform duration-700 ease-in-out h-full" 
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className="min-w-full h-full relative">
//             <img 
//                 src={slide.image} 
//                 alt={slide.text} 
//                 className="w-full h-full object-cover"
//                 onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1920&auto=format&fit=crop"; }}
//             />
//             {/* Glassmorphism Caption */}
//             <div className="absolute bottom-0 w-full bg-slate-900/70 backdrop-blur-sm p-6 text-white text-center">
//               <h3 className="text-lg md:text-2xl font-bold tracking-wide drop-shadow-md font-sans">{slide.text}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all z-10 border border-white/30">
//         <ChevronLeft size={24} />
//       </button>
//       <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all z-10 border border-white/30">
//         <ChevronRight size={24} />
//       </button>
//     </div>
//   );
// };

// // --- Delegate Card (Clean White Card Style) ---
// const DelegateCard = ({ name, role, img }: { name: string, role: string, img: string }) => (
//   <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-5 border border-gray-100 h-full">
//     <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-slate-50 mb-4 shadow-inner shrink-0">
//       <img 
//         src={img} 
//         alt={name} 
//         className="w-full h-full object-cover"
//         onError={(e) => { e.currentTarget.src = "https://randomuser.me/api/portraits/men/1.jpg"; }} 
//       />
//     </div>
//     <div className="text-center w-full flex flex-col justify-between flex-1">
//       <h4 className="text-slate-800 font-bold text-sm md:text-base mb-1">{name}</h4>
//       <p className="text-indigo-600 text-xs font-semibold tracking-wide uppercase">{role}</p>
//     </div>
//   </div>
// );

// // --- Info Box Component (Minimalist) ---
// const InfoBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
//   <div className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300 h-full border border-gray-100">
//     <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold py-3 px-4 text-center uppercase tracking-wider text-sm shadow-sm">
//       {title}
//     </div>
//     <div className="p-5 text-sm text-gray-600 flex-1 leading-relaxed">
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
//     // FIX: Main container with large padding-bottom (pb-32) to prevent Footer overlap
//     <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24">
      
//       {/* --- HERO BANNER --- */}
//       <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 pt-4 md:pt-6">
//         <div className="relative w-full h-auto overflow-hidden rounded-2xl shadow-sm bg-white border border-gray-100 p-2">
//           <img 
//             src="/assets/logo.jpg" 
//             alt="College Campus" 
//             className="w-full h-auto object-contain rounded-xl"
//             onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
//           />
//         </div>
//       </div>

//       {/* --- TOP SECTION (SLIDER + LOGIN) --- */}
//       <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6">
//         <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          
//           {/* LEFT: ORIENTATION SLIDER */}
//           <div className="md:col-span-3 h-[300px] sm:h-[400px] lg:h-[650px]">
//             <OrientationSlider />
//           </div>

//           {/* RIGHT: LOGIN & LINKS */}
//           <div className="md:col-span-1 flex flex-col gap-6">
            
//             {/* LOGIN BOX (Modern Slate/Navy Design) */}
//             <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden border border-slate-700/50">
//               {/* Subtle gradient glow effect */}
//               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
//               <h2 className="text-2xl font-bold text-center mb-6 tracking-widest text-blue-100">PLAGIARISM</h2>
              
//               <form onSubmit={handleLogin} className="space-y-5 relative z-10">
//                 <div>
//                   <label className="block text-xs uppercase text-blue-300 mb-1 font-bold tracking-wider">Select Role</label>
//                   <div className="relative">
//                     <select 
//                       value={role} 
//                       onChange={(e) => setRole(e.target.value as any)}
//                       className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm appearance-none cursor-pointer hover:bg-slate-800"
//                     >
//                       <option value="admin">STAFF LOGIN</option>
//                       <option value="student">STUDENT LOGIN</option>
//                     </select>
//                     <ChevronLeft className="absolute right-3 top-3.5 rotate-[-90deg] text-slate-400 pointer-events-none" size={16} />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs uppercase text-blue-300 mb-1 font-bold tracking-wider">User ID</label>
//                   <div className="relative group">
//                     <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
//                     <input
//                       type="text"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="Enter ID"
//                       className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm placeholder-slate-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs uppercase text-blue-300 mb-1 font-bold tracking-wider">Password</label>
//                   <div className="relative group">
//                     <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter Password"
//                       className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm placeholder-slate-500"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg text-center font-medium animate-pulse">
//                     {error}
//                   </div>
//                 )}

//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg uppercase tracking-wider transition-all shadow-lg shadow-blue-900/20 mt-2 text-sm"
//                 >
//                   {isSubmitting ? 'Verifying...' : 'LOGIN'}
//                 </button>
//               </form>
//             </div>

//             {/* QUICK LINKS */}
//             <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl">
//               <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
//                 Quick Access <ArrowRight size={14} className="text-blue-400" />
//               </h3>
//               <div className="space-y-3">
//                 <a 
//                   href="https://tkrec.in/" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-800 border border-transparent py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all group shadow-md"
//                 >
//                   <ExternalLink size={16} className="text-blue-500" /> MS PORTAL
//                 </a>
//                 <a 
//                   href="https://tkrecautonomous.org/Login.aspx" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-800 border border-transparent py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all group shadow-md"
//                 >
//                   <ExternalLink size={16} className="text-blue-500" /> BET PORTAL
//                 </a>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* --- NOTIFICATIONS MARQUEE --- */}
//       <div className="w-full pb-6">
//         <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
//           <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl flex relative overflow-hidden shadow-lg z-20 border border-slate-700">
//             <div className="bg-indigo-600 text-white px-4 md:px-6 h-12 flex items-center justify-center font-bold text-xs md:text-sm tracking-widest shadow-lg shrink-0 z-20 relative">
//               ALERTS
//               <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-slate-900/50 to-transparent"></div>
//             </div>
//             <div className="flex-1 flex items-center overflow-hidden h-12 relative">
//                <div className="animate-marquee whitespace-nowrap flex gap-12 items-center pl-4 text-sm font-medium text-slate-200">
//                  <span className="flex items-center gap-2"><span className="text-blue-400">●</span> R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
//                  <span className="flex items-center gap-2 text-yellow-300"><span className="text-yellow-500">●</span> CAMPUS PLACEMENT DRIVE: INFOSYS RECRUITMENT ON JAN 10</span>
//                  <span className="flex items-center gap-2"><span className="text-blue-400">●</span> MBA I SEMESTER REGISTRATIONS OPEN NOW</span>
//                  <span className="flex items-center gap-2 text-green-300"><span className="text-green-500">●</span> CONGRATULATIONS TO TOPPERS OF 2024 BATCH</span>
//                </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= COMBINED BOTTOM SECTION ================= */}
//       <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
//         <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          
//           {/* --- LEFT COLUMN: CONTENT --- */}
//           <div className="md:col-span-3 flex flex-col gap-10">
             
//              {/* 1. ABOUT / VISION / MISSION */}
//              <div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
//                     <InfoBox title="About Us">
//                         <h3 className="font-bold text-sm text-center text-slate-800 mb-2 border-b border-gray-100 pb-2">
//                           TKR Engineering College
//                         </h3>
//                         <p className="text-justify text-xs text-gray-500 leading-relaxed">
//                           A modern temple of learning, established in 2005 in a lush green 10 acre campus at Meerpet, Hyderabad.
//                         </p>
//                     </InfoBox>
//                     <InfoBox title="Institute Vision">
//                         <p className="text-center font-bold text-slate-800 mb-2 text-sm">
//                           Excellence in Education
//                         </p>
//                         <p className="text-justify text-xs text-gray-500 leading-relaxed">
//                           Imparting knowledge and instilling skills in Engineering, Technology, Science and Management.
//                         </p>
//                     </InfoBox>
//                     <InfoBox title="Institute Mission">
//                         <ul className="space-y-2 text-xs text-gray-500">
//                             <li className="flex gap-2">
//                                <span className="font-bold text-indigo-600">M1:</span> 
//                                <span>Encouraging scholarly activities.</span>
//                             </li>
//                             <li className="flex gap-2">
//                                <span className="font-bold text-indigo-600">M2:</span> 
//                                <span>Ensuring students are well trained.</span>
//                             </li>
//                             <li className="flex gap-2">
//                                <span className="font-bold text-indigo-600">M3:</span> 
//                                <span>Inculcating human values and ethics.</span>
//                             </li>
//                         </ul>
//                     </InfoBox>
//                     <InfoBox title="Quality Policy">
//                         <p className="text-center font-bold text-slate-800 mb-2 text-sm">
//                           Commitment to Quality
//                         </p>
//                         <p className="text-justify text-xs text-gray-500 leading-relaxed">
//                           TKREC is committed to providing quality technical education with dedicated faculty and infrastructure.
//                         </p>
//                     </InfoBox>
//                 </div>
//              </div>

//              {/* 2. DELEGATES SECTION */}
//              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
//                 <div className="flex items-center gap-4 mb-6">
//                     <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
//                     <h2 className="text-xl font-bold text-slate-800 tracking-wide uppercase">Our Management Delegates</h2>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
//                   <DelegateCard name="Sir T. Krishna Reddy" role="Chairman" img="/delegates/tkrcet-chairman.webp" />
//                   <DelegateCard name="Sri. T. Harinath Reddy" role="Secretary" img="/delegates/tkrcet-secretary.webp" />
//                   <DelegateCard name="Sri. T. Amaranath Reddy" role="Treasurer" img="/delegates/tkres-treasurer.webp" />
//                   <DelegateCard name="Dr. K Murali Mohan" role="Principal" img="/delegates/tkrec_principal.webp" />
//                   <DelegateCard name="Dr B. Srinivasa Rao" role="Dean Academics" img="/delegates/tkrec-dean.webp" />
//                 </div>
//              </div>

//           </div>
          
//           {/* --- RIGHT COLUMN: CONTACT INFO (Sidebar) --- */}
//           <div className="flex md:col-span-1 flex-col h-full">
//             <div className="bg-slate-900 rounded-2xl p-6 shadow-xl flex flex-col h-full text-white border border-slate-700">
//               <h3 className="text-blue-200 font-bold mb-6 border-b border-slate-700 pb-3 text-sm uppercase tracking-wider flex items-center gap-2">
//                   <MapPin size={16} /> Reach Us
//               </h3>
              
//               <div className="space-y-8 flex-1 flex flex-col">
                
//                 {/* Address */}
//                 <div className="flex gap-4 items-start shrink-0 group">
//                   <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
//                     <MapPin size={18} className="text-blue-400 group-hover:text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Campus Address</p>
//                     <p className="text-slate-200 text-sm leading-relaxed">
//                       Medbowli, Meerpet, Balapur(M), Hyderabad, Telangana - 500097
//                     </p>
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div className="flex gap-4 items-start shrink-0 group">
//                   <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
//                      <Phone size={18} className="text-blue-400 group-hover:text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Contact Support</p>
//                     <a href="tel:+919849477550" className="block text-white text-sm hover:text-blue-400 transition-colors cursor-pointer">+91 9849477550</a>
//                     <a href="tel:+918498085239" className="block text-white text-sm hover:text-blue-400 transition-colors cursor-pointer">+91 84980 85239 </a>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="flex gap-4 items-start shrink-0 group">
//                   <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
//                     <Mail size={18} className="text-blue-400 group-hover:text-white" />
//                   </div>
//                   <div>
//                     <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Email Inquiry</p>
//                     <a href="mailto:info@tkrcet.ac.in" className="block text-white text-sm hover:text-blue-400 transition-colors cursor-pointer break-all">info@tkrcet.ac.in </a>
//                   </div>
//                 </div>

//                 {/* Map */}
//                 <a 
//                   href="https://maps.google.com/?q=TKREC+Hyderabad" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="mt-4 rounded-xl overflow-hidden flex-1 min-h-[200px] lg:min-h-[250px] relative group cursor-pointer block border border-slate-700 shadow-inner"
//                 >
//                   <img 
//                     src="/assets/Meerpet.webp" 
//                     alt="Map Location" 
//                     className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110"
//                     onError={(e) => { e.currentTarget.style.display='none'; }} 
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-all">
//                     <span className="bg-white/90 backdrop-blur text-slate-900 text-xs px-4 py-2 rounded-full font-bold shadow-lg group-hover:scale-105 transition-transform flex items-center gap-2">
//                         <MapPin size={12} /> View on Google Maps
//                     </span>
//                   </div>
//                 </a>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* --- FOOTER (FIXED) --- */}
//       <footer className="fixed bottom-0 left-0 w-full bg-slate-900 text-center py-4 px-4 text-xs border-t border-slate-800 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
//         <div className="flex flex-col gap-1 md:gap-1 max-w-[1440px] mx-auto">
//           <p className="font-medium text-slate-300 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
//           <p className="text-slate-500 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>

//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee {
//           animation: marquee 40s linear infinite;
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
import { Eye, EyeOff, User, Lock, ChevronLeft, ChevronRight, ExternalLink, MapPin, Phone, Mail, ArrowRight, Bell } from 'lucide-react';

/* ========================================================================
   1. INTERNAL UI COMPONENTS
   ======================================================================== */

// --- Orientation Slider (Updated to fill height) ---
const OrientationSlider = () => {
  const slides = [
    {
      id: 1,
      image: "/orientation/orientationday-2025-1920.webp",
      text: "Welcome to Orientation 2025"
    },
    {
      id: 2,
      image: "/orientation/graduation1-1920.webp",  
      text: "Celebrating Excellence - Graduation Day"
    },
    {
      id: 3,
      image: "/orientation/orientation1-2025-1920.webp",
      text: "A New Chapter Begins"
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
   // CHANGED: Removed fixed height (h-[700px]), added h-full to match right column height
   <div className="relative w-full h-full min-h-[600px] overflow-hidden rounded-3xl shadow-2xl group border border-white/10 bg-black/20 backdrop-blur-sm">

      <div 
        className="flex transition-transform duration-700 ease-in-out h-full" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img 
                src={slide.image} 
                alt={slide.text} 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1920&auto=format&fit=crop"; }}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-10 text-white text-center">
              <h3 className="text-xl md:text-3xl font-bold tracking-wide drop-shadow-lg font-sans">{slide.text}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 backdrop-blur-md p-3 rounded-full text-white transition-all z-10 border border-white/10 hover:scale-110">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 backdrop-blur-md p-3 rounded-full text-white transition-all z-10 border border-white/10 hover:scale-110">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

// --- Delegate Card (Clean White Style) ---
const DelegateCard = ({ name, role, img }: { name: string, role: string, img: string }) => (
  <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-5 border border-slate-100 h-full">
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 shrink-0">
      <img 
        src={img} 
        alt={name} 
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = "https://randomuser.me/api/portraits/men/1.jpg"; }} 
      />
    </div>
    <div className="text-center w-full flex flex-col justify-between flex-1">
      <h4 className="text-slate-800 font-bold text-sm md:text-base mb-1">{name}</h4>
      <p className="text-indigo-600 text-xs font-bold tracking-wide uppercase">{role}</p>
    </div>
  </div>
);

// --- Info Box Component (High Contrast) ---
const InfoBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-white/20">
    <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white font-bold py-3 px-4 text-center uppercase tracking-wider text-sm shadow-md">
      {title}
    </div>
    <div className="p-5 text-sm text-slate-600 flex-1 leading-relaxed font-medium">
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
    // MAIN BACKGROUND GRADIENT
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24 text-slate-100">
      
      {/* --- HERO HEADER (Glassmorphism) --- */}
      <div className="w-full bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg z-30 sticky top-0">
        <div className="w-full max-w-full mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {/* Logo */}
          <div className="bg-white/90 p-1 rounded-xl shadow-lg shadow-white/10">
            <img 
              src="/assets/icon.jpg" 
              alt="TKREC Logo" 
              className="w-12 h-12 md:w-14 md:h-14 object-contain shrink-0"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          {/* Text Content */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-wide uppercase leading-tight mb-0.5 drop-shadow-md">
              Teegala Krishna Reddy Engineering College
            </h1>
            <p className="text-[10px] md:text-xs text-indigo-100 font-medium max-w-4xl leading-relaxed tracking-wide opacity-90">
              <span className="font-bold text-white bg-indigo-600 px-2 py-0.5 rounded text-[10px] mr-2">UGC-AUTONOMOUS</span>
              (Sponsored by TKR Educational Society, Approved by AICTE, Affiliated to JNTUH, Accredited by NAAC & NBA)
            </p>
          </div>
        </div>
      </div>

      {/* --- TOP SECTION (SLIDER + LOGIN) --- */}
      {/* Reduced padding to bring content higher */}
      <div className="w-full p-4 md:px-8 md:py-4">
        {/* GRID: Items Stretch to ensure equal height */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          
          {/* LEFT: ORIENTATION SLIDER (Fills height of right column) */}
          <div className="md:col-span-3 h-full">
            <OrientationSlider />
          </div>

          {/* RIGHT: LOGIN & LINKS - Compact Spacing */}
          <div className="md:col-span-1 flex flex-col gap-3 h-full justify-between">

            {/* LOGIN BOX - Compacted Padding */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl h-[395] relative overflow-hidden flex flex-col justify-center border border-white/50  flex-shrink-0">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <h2 className="text-lg font-black text-center mb-4 tracking-wider text-slate-800 flex items-center justify-center gap-2">
                 <Lock className="text-indigo-600" size={18}/>
                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    PLAGIARISM LOGIN
                 </span>
              </h2>
              
              <form onSubmit={handleLogin} className="space-y-3 relative z-10">

                <div>
                  <label className="block text-[9px] uppercase text-slate-500 mb-1 font-bold tracking-widest">Select Role</label>
                  <div className="relative">
                    <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs appearance-none cursor-pointer hover:bg-slate-100 shadow-inner"
                    >
                      <option value="admin">STAFF / ADMIN</option>
                      <option value="student">STUDENT</option>
                    </select>
                    <ChevronLeft className="absolute right-3 top-3 rotate-[-90deg] text-slate-400 pointer-events-none" size={14} />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase text-slate-500 mb-1 font-bold tracking-widest">User ID</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter ID"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-9 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs placeholder-slate-400 shadow-inner"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase text-slate-500 mb-1 font-bold tracking-widest">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-9 pr-9 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs placeholder-slate-400 shadow-inner"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-[10px] p-2 rounded-lg text-center font-bold animate-pulse flex items-center justify-center gap-2">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-slate-900 to-indigo-900 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl uppercase tracking-wider transition-all shadow-lg hover:shadow-indigo-500/30 mt-1 text-xs"
                >
                  {isSubmitting ? 'Verifying...' : 'Access Dashboard'}
                </button>
              </form>
            </div>

            {/* QUICK LINKS - Compact */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 h-[145] shadow-xl border border-white/50 flex-shrink-0">
              <h3 className="text-slate-800 font-bold mb-2 text-[10px] uppercase tracking-wider flex items-center gap-2">
                Quick Access <ArrowRight size={12} className="text-indigo-500" />
              </h3>
              <div className="space-y-2">
                <a 
                  href="https://tkrec.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-slate-50 hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800 border border-slate-200 hover:border-indigo-200 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all group shadow-sm"
                >
                  <ExternalLink size={14} className="text-indigo-500" /> Management Portal
                </a>
                <a 
                  href="https://tkrecautonomous.org/Login.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-slate-50 hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800 border border-slate-200 hover:border-indigo-200 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all group shadow-sm"
                >
                  <ExternalLink size={14} className="text-indigo-500" /> BET Examination Portal
                </a>
              </div>
            </div>

            {/* ACCREDITATIONS - Compact */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-3 shadow-xl border h-[135] border-white/50 flex-shrink-0">
              <h3 className="text-slate-500 font-bold mb-2 text-[9px] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-1">
                <span className="text-yellow-500">★</span> Accredited & Recognized By
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['NAAC A+', 'NBA', 'UGC', 'JNTUH'].map((item) => (
                    <div key={item} className="bg-slate-50 border border-slate-100 rounded-lg p-1.5 text-center hover:bg-indigo-50 hover:border-indigo-100 transition-colors">
                      <p className="text-slate-800 text-[10px] font-black tracking-wide">{item}</p>
                    </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- NOTIFICATIONS MARQUEE (Dark Glass) --- */}
      <div className="w-full pb-6">
        <div className="w-full px-4 md:px-8">
          <div className="w-full bg-black/20 backdrop-blur-md rounded-2xl flex relative overflow-hidden shadow-xl z-20 border border-white/10">
            <div className="bg-indigo-600 text-white px-6 h-10 flex items-center justify-center font-bold text-xs md:text-sm tracking-widest shadow-lg shrink-0 z-20 relative">
              <Bell size={14} className="mr-2 animate-bounce" /> ALERTS
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-indigo-900/50 to-transparent"></div>
            </div>
            <div className="flex-1 flex items-center overflow-hidden h-10 relative text-white">
               <div className="animate-marquee whitespace-nowrap flex gap-12 items-center pl-4 text-sm font-medium text-indigo-100">
                 <span className="flex items-center gap-2"><span className="text-indigo-400">●</span> R25 BTECH II-I MID II EXAMS SCHEDULED FOR DEC 2025</span>
                 <span className="flex items-center gap-2 text-yellow-200"><span className="text-yellow-400">●</span> CAMPUS PLACEMENT DRIVE: INFOSYS RECRUITMENT ON JAN 10</span>
                 <span className="flex items-center gap-2"><span className="text-indigo-400">●</span> MBA I SEMESTER REGISTRATIONS OPEN NOW</span>
                 <span className="flex items-center gap-2 text-emerald-300"><span className="text-emerald-400">●</span> CONGRATULATIONS TO TOPPERS OF 2024 BATCH</span>
                 <span className="flex items-center gap-2"><span className="text-indigo-400">●</span> MBA I SEMESTER REGISTRATIONS OPEN NOW</span>
                 <span className="flex items-center gap-2 text-emerald-300"><span className="text-emerald-400">●</span> CONGRATULATIONS TO TOPPERS OF 2024 BATCH</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMBINED BOTTOM SECTION ================= */}
      <div className="w-full px-4 md:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* --- LEFT COLUMN: CONTENT (White Cards) --- */}
          <div className="md:col-span-3 flex flex-col gap-8">
             
             {/* 1. ABOUT / VISION / MISSION */}
             <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoBox title="About Us">
                        <h3 className="font-bold text-sm text-center text-indigo-900 mb-2 border-b border-indigo-50 pb-2">
                          TKR Engineering College
                        </h3>
                        <p className="text-justify text-xs text-slate-500 leading-relaxed">
                          A modern temple of learning, established in 2005 in a lush green 10 acre campus at Meerpet, Hyderabad.
                        </p>
                    </InfoBox>
                    <InfoBox title="Institute Vision">
                        <p className="text-center font-bold text-indigo-900 mb-2 text-sm">
                          Excellence in Education
                        </p>
                        <p className="text-justify text-xs text-slate-500 leading-relaxed">
                          Imparting knowledge and instilling skills in Engineering, Technology, Science and Management.
                        </p>
                    </InfoBox>
                    <InfoBox title="Institute Mission">
                        <ul className="space-y-2 text-xs text-slate-500">
                            <li className="flex gap-2">
                               <span className="font-bold text-indigo-600">M1:</span> 
                               <span>Encouraging scholarly activities.</span>
                            </li>
                            <li className="flex gap-2">
                               <span className="font-bold text-indigo-600">M2:</span> 
                               <span>Ensuring students are well trained.</span>
                            </li>
                            <li className="flex gap-2">
                               <span className="font-bold text-indigo-600">M3:</span> 
                               <span>Inculcating human values and ethics.</span>
                            </li>
                        </ul>
                    </InfoBox>
                    <InfoBox title="Quality Policy">
                        <p className="text-center font-bold text-indigo-900 mb-2 text-sm">
                          Commitment to Quality
                        </p>
                        <p className="text-justify text-xs text-slate-500 leading-relaxed">
                          TKREC is committed to providing quality technical education with dedicated faculty and infrastructure.
                        </p>
                    </InfoBox>
                </div>
             </div>

             {/* 2. DELEGATES SECTION (White Card) */}
             <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-8 w-1.5 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/50"></div>
                    <h2 className="text-xl font-black text-slate-800 tracking-wide uppercase">Our Management Delegates</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  <DelegateCard name="Sir T. Krishna Reddy" role="Chairman" img="/delegates/tkrcet-chairman.webp" />
                  <DelegateCard name="Sri. T. Harinath Reddy" role="Secretary" img="/delegates/tkrcet-secretary.webp" />
                  <DelegateCard name="Sri. T. Amaranath Reddy" role="Treasurer" img="/delegates/tkres-treasurer.webp" />
                  <DelegateCard name="Dr. K Murali Mohan" role="Principal" img="/delegates/tkrec_principal.webp" />
                  <DelegateCard name="Dr B. Srinivasa Rao" role="Dean Academics" img="/delegates/tkrec-dean.webp" />
                </div>
             </div>

          </div>
          
          {/* --- RIGHT COLUMN: CONTACT INFO (Dark Glass Sidebar) --- */}
          <div className="flex md:col-span-1 flex-col h-full">
            <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl flex flex-col h-full text-white border border-white/10">
              <h3 className="text-indigo-200 font-bold mb-6 border-b border-white/10 pb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={16} /> Reach Us
              </h3>
              
              <div className="space-y-8 flex-1 flex flex-col">
                
                {/* Address */}
                <div className="flex gap-4 items-start shrink-0 group">
                  <div className="mt-1 p-2.5 bg-white/10 rounded-xl group-hover:bg-indigo-600 transition-colors border border-white/5">
                    <MapPin size={18} className="text-indigo-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Campus Address</p>
                    <p className="text-indigo-100 text-sm leading-relaxed font-medium">
                      Medbowli, Meerpet, Balapur(M), Hyderabad, Telangana - 500097
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start shrink-0 group">
                  <div className="mt-1 p-2.5 bg-white/10 rounded-xl group-hover:bg-indigo-600 transition-colors border border-white/5">
                     <Phone size={18} className="text-indigo-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Contact Support</p>
                    <a href="tel:+919849477550" className="block text-white text-sm hover:text-indigo-300 transition-colors cursor-pointer font-medium">+91 9849477550</a>
                    <a href="tel:+918498085239" className="block text-white text-sm hover:text-indigo-300 transition-colors cursor-pointer font-medium">+91 84980 85239 </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start shrink-0 group">
                  <div className="mt-1 p-2.5 bg-white/10 rounded-xl group-hover:bg-indigo-600 transition-colors border border-white/5">
                    <Mail size={18} className="text-indigo-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Email Inquiry</p>
                    <a href="mailto:info@tkrcet.ac.in" className="block text-white text-sm hover:text-indigo-300 transition-colors cursor-pointer break-all font-medium">info@tkrcet.ac.in </a>
                  </div>
                </div>

                {/* Map */}
                <a 
                  href="https://maps.google.com/?q=TKREC+Hyderabad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 rounded-2xl overflow-hidden flex-1 h-[250] relative group cursor-pointer block border border-white/20 shadow-lg"
                >
                  <img 
                    src="/assets/Meerpet.webp" 
                    alt="Map Location" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    onError={(e) => { e.currentTarget.style.display='none'; }} 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-all">
                    <span className="bg-white/90 backdrop-blur text-slate-900 text-xs px-5 py-2.5 rounded-full font-bold shadow-xl group-hover:scale-105 transition-transform flex items-center gap-2">
                        <MapPin size={12} className="text-indigo-600" /> View on Google Maps
                    </span>
                  </div>
                </a>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FOOTER (FIXED) --- */}
      <footer className="fixed bottom-0 left-0 w-full bg-black/40 backdrop-blur-lg text-center py-4 px-4 text-xs border-t border-white/5 z-50">
        <div className="flex flex-col gap-1 w-full px-4 md:px-8">
          <p className="font-medium text-slate-200 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
          <p className="text-indigo-300/60 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}






