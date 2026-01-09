// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { FileText, LogOut } from 'lucide-react';
// import { FileUploadAnalysis } from './FileUploadAnalysis';
// import { useAuth } from '@/contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import api from '@/lib/api';
// import { Button } from '@/components/ui/button';
// import { generateAndDownloadReport } from "@/lib/reportGenerator";



// interface DocumentEntry {
//   id: number;
//   file_name: string;
//   upload_date: string;
// }

// export function StudentDashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [documents, setDocuments] = useState<DocumentEntry[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudentDocs = async () => {
//       try {
//         const res = await api.get('/student/dashboard');
//         setDocuments(res.data);
//       } catch (err) {
//         console.error('Error fetching student documents:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentDocs();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   if (!user || user.role !== 'student') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
//         <p>You are not authorized to view this page.</p>
//       </div>
//     );
//   }



//   const handleView = async (id: number, fileName: string) => {
//   const res = await api.get(`/files/original/${id}`, {
//     responseType: "blob",
//   });

//   const blob = new Blob([res.data]);
//   const url = window.URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = fileName;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);

//   window.URL.revokeObjectURL(url);
// };


//   const handleDownload = async (docId: number) => {
//     const res = await api.get(`/analysis-status/${docId}`);
//     generateAndDownloadReport(res.data.result, user.username);
//   };


// //   const handleDownload = async (id: number) => {
// //   const res = await api.get(`/files/report/${id}`, {
// //     responseType: "blob",
// //   });

// //   const blob = new Blob([res.data], { type: "application/pdf" });
// //   const url = window.URL.createObjectURL(blob);

// //   const a = document.createElement("a");
// //   a.href = url;
// //   a.download = `${id}-analysis-report.pdf`;
// //   document.body.appendChild(a);
// //   a.click();
// //   document.body.removeChild(a);

// //   window.URL.revokeObjectURL(url);
// // };



// //   const downloadBlob = (blob: Blob, filename: string) => {
// //   const url = window.URL.createObjectURL(blob);
// //   const a = document.createElement("a");
// //   a.href = url;
// //   a.download = filename;
// //   document.body.appendChild(a);
// //   a.click();
// //   document.body.removeChild(a);
// //   window.URL.revokeObjectURL(url);
// // };














  

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-4">
//       <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="text-white text-2xl">Student Dashboard</CardTitle>
//           {user && <p className="text-slate-400 text-sm">Logged in as: {user.username} ({user.role})</p>}
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="your-data">
//             <TabsList className="bg-slate-700 mb-4">
//               <TabsTrigger value="your-data" className="text-slate-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                 <FileText className="h-4 w-4 mr-2" /> Home
//               </TabsTrigger>
//               <TabsTrigger value="analysis" className="text-slate-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                 Analysis
//               </TabsTrigger>
//               <TabsTrigger value="logout" className="text-slate-300 data-[state=active]:bg-red-600 data-[state=active]:text-white" onClick={handleLogout}>
//                 <LogOut className="h-4 w-4 mr-2" /> Logout
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="your-data">
//               {loading ? (
//                 <p className="text-white text-center">Loading your documents...</p>
//               ) : documents.length === 0 ? (
//                 <p className="text-slate-400 text-center">You have not uploaded any documents.</p>
//               ) : (
//                 <div className="space-y-4">
//                   {documents.map((doc) => (
//                     <Card key={doc.id} className="bg-slate-700/40 border border-slate-600">
//                       <CardContent className="p-4">
//                         <p className="text-white font-medium">File: {doc.file_name}</p>
//                         <p className="text-slate-400 text-sm">Uploaded: {new Date(doc.upload_date).toLocaleString()}</p>
//                         <div className="mt-3 space-x-2">
//                           <Button
//                             variant="outline"
//                             className="border-slate-500 text-white"
//                             onClick={() => handleView(doc.id, doc.file_name)}>View
//                           </Button>
//                           <Button
//                             variant="outline"
//                             className="border-slate-500 text-white"
//                             onClick={() => handleDownload(doc.id)}>Download
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </TabsContent>

//             <TabsContent value="analysis">
//               <FileUploadAnalysis
//                 userType="student"
//                 userId={user?.id || ''}
//                 onAnalysisComplete={(result) => console.log('Analysis Complete:', result)}
//               />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



































// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Ensure you have these components or replace with standard divs
// import { FileText, LogOut, Download, Eye, User, BarChart } from 'lucide-react';
// import api from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { FileUploadAnalysis } from './FileUploadAnalysis';
// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* ========================================================================
//    TYPES
//    ======================================================================== */
// interface DocumentEntry {
//   id: number;
//   file_name: string;
//   upload_date: string;
// }

// /* ========================================================================
//    STUDENT DASHBOARD COMPONENT
//    ======================================================================== */
// export function StudentDashboard() {
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();

//   const [documents, setDocuments] = useState<DocumentEntry[]>([]);
//   const [docsLoading, setDocsLoading] = useState(true);

//   // --- FETCH DOCUMENTS ---
//   useEffect(() => {
//     const fetchStudentDocs = async () => {
//       try {
//         setDocsLoading(true);
//         const res = await api.get("/student/dashboard");
//         setDocuments(res.data);
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setDocsLoading(false);
//       }
//     };
//     fetchStudentDocs();
//   }, []);

//   // --- AUTH CHECK ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <p className="text-white text-xl font-bold tracking-widest animate-pulse">CHECKING SESSION...</p>
//       </div>
//     );
//   }

//   if (!user || user.role !== "student") {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="bg-black border-2 border-red-500 p-8 rounded text-white text-center">
//           <h2 className="text-2xl font-bold mb-2">ACCESS DENIED</h2>
//           <p>You are not authorized to view this page.</p>
//           <button onClick={() => navigate('/')} className="mt-4 bg-red-600 px-4 py-2 rounded">Go Back</button>
//         </div>
//       </div>
//     );
//   }

//   // --- HANDLERS ---
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleView = async (id: number, fileName: string) => {
//     try {
//       const res = await api.get(`/files/original/${id}`, { responseType: "blob" });
//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       alert("Failed to download file.");
//     }
//   };

//   const handleDownload = async (docId: number, fileName?: string) => {
//     try {
//       const res = await api.get(`/analysis-status/${docId}`);
//       generateAndDownloadReport(res.data.result, user.username, fileName);
//     } catch (error) {
//       console.error("Report generation failed", error);
//       alert("Failed to generate report.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col font-sans">
      
//       {/* --- HERO BANNER --- */}
//       <div className="relative w-full h-[300px] md:h-[150px]">
//         <img 
//           src="/assets/logo3.png" 
//           alt="College Campus" 
//           className="w-full h-full object-cover"
//           onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
//         />
//         {/* <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-4">
//           <h1 className="text-3xl md:text-5xl font-bold text-center drop-shadow-2xl uppercase tracking-wider">
//             Teegala Krishna Reddy Engineering College
//           </h1>
//           <p className="mt-3 text-lg md:text-xl font-light tracking-widest text-blue-200">
//             Where Knowledge Meets Innovation
//           </p>
//         </div> */}
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//           <div className="bg-black text-white px-8 py-3 rounded-r-full border-l-8 border-white shadow-lg w-full md:w-auto">
//             <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
//               <User className="h-5 w-5 text-blue-500" /> Student Dashboard
//             </h2>
//           </div>
//           <div className="text-white text-sm bg-blue-900/80 px-4 py-2 rounded border border-blue-500">
//             Logged in as: <span className="font-bold text-blue-200 uppercase">{user.username}</span>
//           </div>
//         </div>

//         {/* --- TABS CONTAINER --- */}
//         <div className="bg-black border-2 border-blue-600 rounded-lg p-6 shadow-2xl min-h-[600px]">
//           <Tabs defaultValue="your-data" className="w-full">
            
//             {/* TABS LIST */}
//             <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-gray-700 p-1 rounded-md mb-6">
//               <TabsTrigger 
//                 value="your-data" 
//                 className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-gray-400 font-bold tracking-wide uppercase py-2 transition-all"
//               >
//                 <FileText className="h-4 w-4 mr-2" /> My Documents
//               </TabsTrigger>
//               <TabsTrigger 
//                 value="analysis" 
//                 className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-gray-400 font-bold tracking-wide uppercase py-2 transition-all"
//               >
//                 <BarChart className="h-4 w-4 mr-2" /> Analysis
//               </TabsTrigger>
//               <TabsTrigger
//                 value="logout"
//                 onClick={handleLogout}
//                 className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-red-400 font-bold tracking-wide uppercase py-2 transition-all hover:bg-red-900/50"
//               >
//                 <LogOut className="h-4 w-4 mr-2" /> Logout
//               </TabsTrigger>
//             </TabsList>

//             {/* TAB: YOUR DATA */}
//             <TabsContent value="your-data" className="space-y-6">
//               {docsLoading ? (
//                 <div className="text-center py-20">
//                   <p className="text-blue-300 text-xl animate-pulse font-bold">LOADING DOCUMENTS...</p>
//                 </div>
//               ) : documents.length === 0 ? (
//                 <div className="text-center py-20 bg-gray-900/50 rounded border border-gray-700">
//                   <p className="text-gray-400 text-lg">You have not uploaded any documents yet.</p>
//                 </div>
//               ) : (
//                 <div className="grid gap-4">
//                   {documents.map((doc) => (
//                     <div 
//                       key={doc.id} 
//                       className="bg-gray-900/80 border border-blue-900/50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center hover:border-blue-500 transition-colors shadow-lg group"
//                     >
//                       <div className="mb-4 md:mb-0">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="text-gray-500 text-xs font-semibold">UPLOADED: {new Date(doc.upload_date).toLocaleString()}</span>
//                         </div>
//                         <h3 className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors">{doc.file_name}</h3>
//                       </div>
                      
//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handleView(doc.id, doc.file_name)}
//                           className="flex items-center gap-2 bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-4 py-2 rounded text-sm font-bold transition-all uppercase"
//                         >
//                           <Eye size={16} /> View File
//                         </button>
//                         <button
//                           onClick={() => handleDownload(doc.id, doc.file_name)}
//                           className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold transition-all uppercase shadow-md"
//                         >
//                           <Download size={16} /> Get Report
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </TabsContent>

//             {/* TAB: ANALYSIS */}
//             <TabsContent value="analysis">
//               <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
//                 <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2 uppercase text-blue-400">
//                   New Analysis Request
//                 </h3>
//                 <div className="text-white">
//                   <FileUploadAnalysis
//                     userType="student"
//                     userId={user?.id || ''}
//                     onAnalysisComplete={(result) => console.log('Analysis Complete:', result)}
//                   />
//                 </div>
//               </div>
//             </TabsContent>

//           </Tabs>
//         </div>
//       </div>

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-black text-white text-center py-6 text-sm border-t-4 border-blue-800 mt-auto">
//         <div className="flex flex-col gap-2">
//           <p className="font-semibold tracking-wide">© 2026 Teegala Krishna Reddy Engineering College, All Rights Reserved.</p>
//           <p className="text-gray-400">Designed, Developed & Maintenance  under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>

//     </div>
//   );
// }
































// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 
// import { FileText, LogOut, Download, Eye, User, BarChart, UploadCloud, Clock, CheckCircle } from 'lucide-react';
// import api from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { FileUploadAnalysis } from './FileUploadAnalysis';
// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* ========================================================================
//    TYPES
//    ======================================================================== */
// interface DocumentEntry {
//   id: number;
//   file_name: string;
//   upload_date: string;
// }

// /* ========================================================================
//    STUDENT DASHBOARD COMPONENT
//    ======================================================================== */
// export function StudentDashboard() {
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();

//   const [documents, setDocuments] = useState<DocumentEntry[]>([]);
//   const [docsLoading, setDocsLoading] = useState(true);

//   // --- FETCH DOCUMENTS ---
//   useEffect(() => {
//     const fetchStudentDocs = async () => {
//       try {
//         setDocsLoading(true);
//         const res = await api.get("/student/dashboard");
//         setDocuments(res.data);
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setDocsLoading(false);
//       }
//     };
//     fetchStudentDocs();
//   }, []);

//   // --- AUTH CHECK ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <p className="text-slate-400 text-sm font-bold tracking-widest animate-pulse">VERIFYING SESSION...</p>
//       </div>
//     );
//   }

//   if (!user || user.role !== "student") {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white border border-red-100 p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//             <LogOut className="text-red-500" size={32} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
//           <p className="text-slate-500 text-sm mb-6">You do not have permission to view this dashboard.</p>
//           <button 
//             onClick={() => navigate('/')} 
//             className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all w-full"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- HANDLERS ---
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleView = async (id: number, fileName: string) => {
//     try {
//       const res = await api.get(`/files/original/${id}`, { responseType: "blob" });
//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       alert("Failed to download file.");
//     }
//   };

//   const handleDownload = async (docId: number, fileName?: string) => {
//     try {
//       const res = await api.get(`/analysis-status/${docId}`);
//       generateAndDownloadReport(res.data.result, user.username, fileName);
//     } catch (error) {
//       console.error("Report generation failed", error);
//       alert("Failed to generate report.");
//     }
//   };

//   return (
//     // FIX: Added pb-32 so content isn't hidden behind the fixed footer
//     <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24">
      
//       {/* --- HERO BANNER --- */}
//       {/* <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 pt-4 md:pt-6">
//         <div className="relative w-full h-auto overflow-hidden rounded-2xl shadow-sm bg-white border border-gray-100 p-2">
//           <img 
//             src="/assets/logo3.png" 
//             alt="College Campus" 
//             className="w-full h-full object-contain rounded-xl"
//             onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
//           />
//         </div>
//       </div> */}

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-6">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <div>
//             <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
//               <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
//                 <User size={24} />
//               </div>
//               Student Dashboard
//             </h2>
//             <p className="text-slate-500 text-sm mt-1 ml-12">Manage your documents and view plagiarism reports</p>
//           </div>
          
//           <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
//             <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
//               {user.username.charAt(0).toUpperCase()}
//             </div>
//             <div className="text-sm">
//               <span className="text-slate-400 text-xs font-bold uppercase block">Logged in as</span>
//               <span className="font-semibold text-slate-800">{user.username}</span>
//             </div>
//           </div>
//         </div>

//         {/* --- TABS CONTAINER --- */}
//         <div className="bg-white border border-gray-200 rounded-3xl p-1 shadow-xl">
//           <Tabs defaultValue="your-data" className="w-full">
            
//             {/* TABS LIST (Modern Segmented Control) */}
//             <div className="px-6 pt-6 pb-2">
//               <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-xl">
//                 <TabsTrigger 
//                   value="your-data" 
//                   className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm text-slate-500 font-bold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
//                 >
//                   <FileText size={16} /> <span className="hidden sm:inline">My Documents</span>
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="analysis" 
//                   className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm text-slate-500 font-bold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
//                 >
//                   <BarChart size={16} /> <span className="hidden sm:inline">New Analysis</span>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="logout"
//                   onClick={handleLogout}
//                   className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600 text-slate-500 font-bold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 hover:text-red-500 hover:bg-red-50/50"
//                 >
//                   <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <div className="p-6">
//               {/* TAB: YOUR DATA */}
//               <TabsContent value="your-data" className="mt-0">
//                 {docsLoading ? (
//                   <div className="text-center py-20 flex flex-col items-center justify-center">
//                     <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
//                     <p className="text-slate-400 text-sm font-bold tracking-wide">FETCHING DOCUMENTS...</p>
//                   </div>
//                 ) : documents.length === 0 ? (
//                   <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
//                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4">
//                       <UploadCloud className="text-slate-300" size={32} />
//                     </div>
//                     <h3 className="text-slate-800 font-bold mb-1">No Documents Found</h3>
//                     <p className="text-slate-500 text-sm">Upload a document in the Analysis tab to get started.</p>
//                   </div>
//                 ) : (
//                   <div className="grid gap-4">
//                     {documents.map((doc) => (
//                       <div 
//                         key={doc.id} 
//                         className="group bg-white border border-slate-100 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center hover:shadow-md hover:border-indigo-100 transition-all duration-300"
//                       >
//                         <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
//                           <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
//                             <FileText size={24} />
//                           </div>
//                           <div>
//                             <h3 className="text-slate-800 font-bold text-base md:text-lg">{doc.file_name}</h3>
//                             <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
//                               <Clock size={12} />
//                               <span>{new Date(doc.upload_date).toLocaleString()}</span>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex gap-3 w-full md:w-auto">
//                           <button
//                             onClick={() => handleView(doc.id, doc.file_name)}
//                             className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 px-4 py-2.5 rounded-lg text-xs font-bold transition-all uppercase"
//                           >
//                             <Eye size={14} /> View
//                           </button>
//                           <button
//                             onClick={() => handleDownload(doc.id, doc.file_name)}
//                             className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all uppercase shadow-lg shadow-slate-200"
//                           >
//                             <Download size={14} /> Report
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </TabsContent>

//               {/* TAB: ANALYSIS */}
//               <TabsContent value="analysis" className="mt-0">
//                 <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
//                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-200 pb-4">
//                     <div>
//                       <h3 className="text-slate-800 font-bold text-lg">New Analysis Request</h3>
//                       <p className="text-slate-500 text-xs mt-1">Upload a document to check for plagiarism.</p>
//                     </div>
//                     <span className="mt-2 md:mt-0 text-[10px] font-bold bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-400 uppercase tracking-wide">
//                       Supports PDF & DOCX
//                     </span>
//                   </div>
                  
//                   {/* File Upload Component Wrapper */}
//                   <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//                     <FileUploadAnalysis
//                       userType="student"
//                       userId={user?.id || ''}
//                       onAnalysisComplete={(result) => console.log('Analysis Complete:', result)}
//                     />
//                   </div>
//                 </div>
//               </TabsContent>
//             </div>

//           </Tabs>
//         </div>
//       </div>

//       {/* ================= FOOTER ================= */}
//       <footer className="fixed bottom-0 left-0 w-full bg-slate-900 text-center py-4 px-4 text-xs border-t border-slate-800 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
//         <div className="flex flex-col gap-1 md:gap-1 max-w-[1440px] mx-auto">
//           <p className="font-medium text-slate-300 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
//           <p className="text-slate-500 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>

//     </div>
//   );
// }

































// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 
// import { 
//   FileText, 
//   LogOut, 
//   Download, 
//   Eye, 
//   User, 
//   BarChart, 
//   UploadCloud, 
//   Clock, 
//   Image as ImageIcon, 
//   FileSpreadsheet, 
//   Presentation 
// } from 'lucide-react';
// import api from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { FileUploadAnalysis } from './FileUploadAnalysis';
// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* ========================================================================
//    TYPES & HELPERS
//    ======================================================================== */
// interface DocumentEntry {
//   id: number;
//   file_name: string;
//   upload_date: string;
// }

// // Helper to determine icon and color based on file extension
// const getFileStyle = (fileName: string) => {
//   const ext = fileName.split('.').pop()?.toLowerCase();
//   switch (ext) {
//     case 'pdf': return { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' };
//     case 'doc':
//     case 'docx': return { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' };
//     case 'xls':
//     case 'xlsx': return { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-50' };
//     case 'ppt':
//     case 'pptx': return { icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50' };
//     case 'png':
//     case 'jpg':
//     case 'jpeg': return { icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-50' };
//     default: return { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-100' };
//   }
// };

// /* ========================================================================
//    STUDENT DASHBOARD COMPONENT
//    ======================================================================== */
// export function StudentDashboard() {
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();

//   const [documents, setDocuments] = useState<DocumentEntry[]>([]);
//   const [docsLoading, setDocsLoading] = useState(true);

//   // --- FETCH DOCUMENTS ---
//   useEffect(() => {
//     const fetchStudentDocs = async () => {
//       try {
//         setDocsLoading(true);
//         const res = await api.get("/student/dashboard");
//         setDocuments(res.data);
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setDocsLoading(false);
//       }
//     };
//     fetchStudentDocs();
//   }, []);

//   // --- AUTH CHECK ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <p className="text-slate-400 text-sm font-bold tracking-widest animate-pulse">VERIFYING SESSION...</p>
//       </div>
//     );
//   }

//   if (!user || user.role !== "student") {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white border border-red-100 p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//             <LogOut className="text-red-500" size={32} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
//           <p className="text-slate-500 text-sm mb-6">You do not have permission to view this dashboard.</p>
//           <button 
//             onClick={() => navigate('/')} 
//             className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all w-full"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- HANDLERS ---
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleView = async (id: number, fileName: string) => {
//     try {
//       const res = await api.get(`/files/original/${id}`, { responseType: "blob" });
//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       alert("Failed to download file.");
//     }
//   };

//   const handleDownload = async (docId: number, fileName?: string) => {
//     try {
//       const res = await api.get(`/analysis-status/${docId}`);
//       generateAndDownloadReport(res.data.result, user.username, fileName);
//     } catch (error) {
//       console.error("Report generation failed", error);
//       alert("Failed to generate report.");
//     }
//   };

//   return (
//     // MAIN CONTAINER: Padding bottom to clear Fixed Footer
//     <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24">
      
//       {/* --- HERO BANNER --- */}
//       {/* <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 pt-4 md:pt-6">
//         <div className="relative w-full h-[120px] md:h-[180px] overflow-hidden rounded-2xl shadow-sm bg-white border border-gray-100 p-2">
//           <img 
//             src="/assets/logo3.png" 
//             alt="College Campus" 
//             className="w-full h-full object-contain rounded-xl"
//             onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
//           />
//         </div>
//       </div> */}

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-6">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <div>
//             <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
//               <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
//                 <User size={24} />
//               </div>
//               Student Dashboard
//             </h2>
//             <p className="text-slate-500 text-sm mt-1 ml-12">Manage your documents and view plagiarism reports</p>
//           </div>
          
//           <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
//             <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
//               {user.username.charAt(0).toUpperCase()}
//             </div>
//             <div className="text-sm">
//               <span className="text-slate-400 text-xs font-bold uppercase block">Logged in as</span>
//               <span className="font-semibold text-slate-800">{user.username}</span>
//             </div>
//           </div>
//         </div>

//         {/* --- TABS CONTAINER --- */}
//         <div className="bg-white border border-gray-200 rounded-3xl p-1 shadow-xl">
//           <Tabs defaultValue="your-data" className="w-full">
            
//             {/* TABS LIST (Segmented Control) */}
//             <div className="px-6 pt-6 pb-2">
//               <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-xl">
//                 <TabsTrigger 
//                   value="your-data" 
//                   className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm text-slate-500 font-bold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
//                 >
//                   <FileText size={16} /> <span className="hidden sm:inline">My Documents</span>
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="analysis" 
//                   className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm text-slate-500 font-bold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
//                 >
//                   <BarChart size={16} /> <span className="hidden sm:inline">New Analysis</span>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="logout"
//                   onClick={handleLogout}
//                   className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600 text-slate-500 font-bold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 hover:text-red-500 hover:bg-red-50/50"
//                 >
//                   <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <div className="p-6">
//               {/* TAB: YOUR DATA */}
//               <TabsContent value="your-data" className="mt-0">
//                 {docsLoading ? (
//                   <div className="text-center py-20 flex flex-col items-center justify-center">
//                     <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
//                     <p className="text-slate-400 text-sm font-bold tracking-wide">FETCHING DOCUMENTS...</p>
//                   </div>
//                 ) : documents.length === 0 ? (
//                   <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
//                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4">
//                       <UploadCloud className="text-slate-300" size={32} />
//                     </div>
//                     <h3 className="text-slate-800 font-bold mb-1">No Documents Found</h3>
//                     <p className="text-slate-500 text-sm">Upload a document in the Analysis tab to get started.</p>
//                   </div>
//                 ) : (
//                   <div className="grid gap-4">
//                     {documents.map((doc) => {
//                       const style = getFileStyle(doc.file_name);
//                       const Icon = style.icon;

//                       return (
//                         <div 
//                           key={doc.id} 
//                           className="group bg-white border border-slate-100 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center hover:shadow-md hover:border-indigo-100 transition-all duration-300"
//                         >
//                           {/* File Info */}
//                           <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
//                             <div className={`w-12 h-12 ${style.bg} ${style.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
//                               <Icon size={24} />
//                             </div>
//                             <div className="min-w-0">
//                               <h3 className="text-slate-800 font-bold text-base md:text-lg truncate">{doc.file_name}</h3>
//                               <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
//                                 <Clock size={12} />
//                                 <span>{new Date(doc.upload_date).toLocaleString()}</span>
//                               </div>
//                             </div>
//                           </div>
                          
//                           {/* Action Buttons */}
//                           {/* Mobile: Buttons stack vertically (flex-col). Desktop: Side-by-side (md:flex-row) */}
//                           <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//                             <button
//                               onClick={() => handleView(doc.id, doc.file_name)}
//                               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 px-4 py-2.5 rounded-lg text-xs font-bold transition-all uppercase"
//                             >
//                               <Eye size={14} /> View
//                             </button>
//                             <button
//                               onClick={() => handleDownload(doc.id, doc.file_name)}
//                               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all uppercase shadow-lg shadow-slate-200"
//                             >
//                               <Download size={14} /> Report
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </TabsContent>

//               {/* TAB: ANALYSIS */}
//               <TabsContent value="analysis" className="mt-0">
//                 <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
//                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-200 pb-4">
//                     <div>
//                       <h3 className="text-slate-800 font-bold text-lg">New Analysis Request</h3>
//                       <p className="text-slate-500 text-xs mt-1">Upload a document to check for plagiarism.</p>
//                     </div>
//                     <span className="mt-2 md:mt-0 text-[10px] font-bold bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-400 uppercase tracking-wide">
//                       Supports PDF, DOCX, PPT, Images
//                     </span>
//                   </div>
                  
//                   {/* File Upload Component Wrapper */}
//                   <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//                     <FileUploadAnalysis
//                       userType="student"
//                       userId={user?.id || ''}
//                       onAnalysisComplete={(result) => console.log('Analysis Complete:', result)}
//                     />
//                   </div>
//                 </div>
//               </TabsContent>
//             </div>

//           </Tabs>
//         </div>
//       </div>

//       {/* ================= FOOTER (FIXED) ================= */}
//       <footer className="fixed bottom-0 left-0 w-full bg-slate-900 text-center py-4 px-4 text-xs border-t border-slate-800 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
//         <div className="flex flex-col gap-1 md:gap-1 max-w-[1440px] mx-auto">
//           <p className="font-medium text-slate-300 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
//           <p className="text-slate-500 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>

//     </div>
//   );
// }






























































// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 
// import { 
//   FileText, 
//   LogOut, 
//   Download, 
//   Eye, 
//   User, 
//   BarChart, 
//   UploadCloud, 
//   Clock, 
//   Image as ImageIcon, 
//   FileSpreadsheet, 
//   Presentation 
// } from 'lucide-react';
// import api from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { FileUploadAnalysis } from './FileUploadAnalysis';
// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* ========================================================================
//    TYPES & HELPERS
//    ======================================================================== */
// interface DocumentEntry {
//   id: number;
//   file_name: string;
//   upload_date: string;
// }

// // Helper to determine icon and color based on file extension
// const getFileStyle = (fileName: string) => {
//   const ext = fileName.split('.').pop()?.toLowerCase();
//   switch (ext) {
//     case 'pdf': return { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' };
//     case 'doc':
//     case 'docx': return { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' };
//     case 'xls':
//     case 'xlsx': return { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-50' };
//     case 'ppt':
//     case 'pptx': return { icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50' };
//     case 'png':
//     case 'jpg':
//     case 'jpeg': return { icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-50' };
//     default: return { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-100' };
//   }
// };

// /* ========================================================================
//    STUDENT DASHBOARD COMPONENT
//    ======================================================================== */
// export function StudentDashboard() {
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();

//   const [documents, setDocuments] = useState<DocumentEntry[]>([]);
//   const [docsLoading, setDocsLoading] = useState(true);

//   // --- FETCH DOCUMENTS ---
//   useEffect(() => {
//     const fetchStudentDocs = async () => {
//       try {
//         setDocsLoading(true);
//         const res = await api.get("/student/dashboard");
//         setDocuments(res.data);
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setDocsLoading(false);
//       }
//     };
//     fetchStudentDocs();
//   }, []);

//   // --- AUTH CHECK ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center">
//         <p className="text-indigo-400 text-sm font-bold tracking-widest animate-pulse">VERIFYING SESSION...</p>
//       </div>
//     );
//   }

//   if (!user || user.role !== "student") {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
//         <div className="bg-white/90 backdrop-blur-md border-none p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <LogOut className="text-red-600" size={32} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
//           <p className="text-slate-600 text-sm mb-6">You do not have permission to view this dashboard.</p>
//           <button 
//             onClick={() => navigate('/')} 
//             className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all w-full"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- HANDLERS ---
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleView = async (id: number, fileName: string) => {
//     try {
//       const res = await api.get(`/files/original/${id}`, { responseType: "blob" });
//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       alert("Failed to download file.");
//     }
//   };

//   const handleDownload = async (docId: number, fileName?: string) => {
//     try {
//       const res = await api.get(`/analysis-status/${docId}`);
//       generateAndDownloadReport(res.data.result, user.username, fileName);
//     } catch (error) {
//       console.error("Report generation failed", error);
//       alert("Failed to generate report.");
//     }
//   };

//   return (
//     // MAIN CONTAINER - DARK GRADIENT BACKGROUND
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24 text-slate-100">

//       {/* ================= MAIN CONTENT ================= */}
//       {/* Expanded width to utilize full screen */}
//       <div className="flex-1 w-full px-4 md:px-8 pt-6 pb-6">
        
//         {/* --- HEADER (Glassmorphism) --- */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/10">
//           <div>
//             <h2 className="text-3xl font-bold text-white flex items-center gap-3">
//               <div className="bg-white/20 p-2 rounded-xl text-white backdrop-blur-sm shadow-inner">
//                 <User size={28} />
//               </div>
//               Student Dashboard
//             </h2>
//             <p className="text-indigo-200 text-sm mt-2 ml-14 font-medium tracking-wide">Manage your documents and view plagiarism reports</p>
//           </div>
          
//           <div className="flex items-center gap-4 bg-black/20 px-5 py-3 rounded-2xl border border-white/5 backdrop-blur-sm">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/20">
//               {user.username.charAt(0).toUpperCase()}
//             </div>
//             <div className="text-sm">
//               <span className="text-indigo-200 text-xs font-bold uppercase block tracking-wider">Logged in as</span>
//               <span className="font-bold text-white text-base">{user.username}</span>
//             </div>
//           </div>
//         </div>

//         {/* --- TABS CONTAINER (Transparent Wrapper) --- */}
//         <div className="w-full">
//           <Tabs defaultValue="your-data" className="w-full">
            
//             {/* TABS LIST (Dark Glass Style) */}
//             <div className="mb-6">
//               <TabsList className="grid w-full md:w-[600px] md:h-[60px] grid-cols-3 bg-black/20 backdrop-blur-md p-1 rounded-2xl border border-white/10">
//                 <TabsTrigger 
//                   value="your-data" 
//                   className="data-[state=active]:bg-white data-[state=active]:text-purple-900 data-[state=active]:shadow-lg text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2"
//                 >
//                   <FileText size={18} /> <span className="hidden sm:inline">My Documents</span>
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="analysis" 
//                   className="data-[state=active]:bg-white data-[state=active]:text-purple-900 data-[state=active]:shadow-lg text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2"
//                 >
//                   <BarChart size={18} /> <span className="hidden sm:inline">New Analysis</span>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="logout"
//                   onClick={handleLogout}
//                   className="data-[state=active]:bg-rose-500 data-[state=active]:text-white text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:text-rose-300"
//                 >
//                   <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <div className="space-y-6">
//               {/* TAB: YOUR DATA */}
//               <TabsContent value="your-data" className="mt-0 w-full">
//                 {docsLoading ? (
//                   <div className="text-center py-20 flex flex-col items-center justify-center bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
//                     <div className="w-12 h-12 border-4 border-indigo-200 border-t-white rounded-full animate-spin mb-4"></div>
//                     <p className="text-indigo-200 text-sm font-bold tracking-wide">FETCHING DOCUMENTS...</p>
//                   </div>
//                 ) : documents.length === 0 ? (
//                   <div className="text-center py-24 bg-white/5 rounded-3xl backdrop-blur-sm border border-dashed border-white/20">
//                     <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shadow-inner mx-auto mb-4 backdrop-blur-md">
//                       <UploadCloud className="text-white" size={36} />
//                     </div>
//                     <h3 className="text-white font-bold text-lg mb-1">No Documents Found</h3>
//                     <p className="text-indigo-200 text-sm">Upload a document in the Analysis tab to get started.</p>
//                   </div>
//                 ) : (
//                   <div className="grid gap-4 w-full">
//                     {documents.map((doc) => {
//                       const style = getFileStyle(doc.file_name);
//                       const Icon = style.icon;

//                       return (
//                         <div 
//                           key={doc.id} 
//                           // CARD STYLE: High Opacity White, No Border, Deep Shadow
//                           className="group bg-white/95 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-1 w-full"
//                         >
//                           {/* File Info */}
//                           <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0">
//                             <div className={`w-14 h-14 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform`}>
//                               <Icon size={24} />
//                             </div>
//                             <div className="min-w-0">
//                               <h3 className="text-slate-800 font-extrabold text-lg truncate tracking-tight">{doc.file_name}</h3>
//                               <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5">
//                                 <Clock size={12} />
//                                 <span className="font-medium">{new Date(doc.upload_date).toLocaleString()}</span>
//                               </div>
//                             </div>
//                           </div>
                          
//                           {/* Action Buttons */}
//                           <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//                             <button
//                               onClick={() => handleView(doc.id, doc.file_name)}
//                               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 px-6 py-3 rounded-xl text-sm font-bold transition-all"
//                             >
//                               <Eye size={16} /> View
//                             </button>
//                             <button
//                               onClick={() => handleDownload(doc.id, doc.file_name)}
//                               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-indigo-500/30"
//                             >
//                               <Download size={16} /> Report
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </TabsContent>

//               {/* TAB: ANALYSIS */}
//               <TabsContent value="analysis" className="mt-0 w-full">
//                 <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl w-full">
//                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-100 pb-6">
//                     <div>
//                       <h3 className="text-slate-900 font-bold text-xl">New Analysis Request</h3>
//                       <p className="text-slate-500 text-sm mt-1">Upload a document to check for plagiarism.</p>
//                     </div>
//                     <span className="mt-2 md:mt-0 text-[10px] font-bold bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full text-slate-500 uppercase tracking-wide">
//                       Supports PDF, DOCX, PPT, Images
//                     </span>
//                   </div>
                  
//                   {/* File Upload Component Wrapper */}
//                   <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden p-2">
//                     <FileUploadAnalysis
//                       userType="student"
//                       userId={user?.id || ''}
//                       onAnalysisComplete={(result) => console.log('Analysis Complete:', result)}
//                     />
//                   </div>
//                 </div>
//               </TabsContent>
//             </div>

//           </Tabs>
//         </div>
//       </div>

//       {/* ================= FOOTER (FIXED) ================= */}
//       <footer className="fixed bottom-0 left-0 w-full bg-black/40 backdrop-blur-lg text-center py-4 px-4 text-xs border-t border-white/5 z-50">
//         <div className="flex flex-col gap-1 md:gap-1 w-full mx-auto">
//           <p className="font-medium text-slate-200 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
//           <p className="text-indigo-300/60 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>

//     </div>
//   );
// }




















// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 
// import { 
//   FileText, 
//   LogOut, 
//   Download, 
//   Eye, 
//   User, 
//   BarChart, 
//   UploadCloud, 
//   Clock, 
//   Image as ImageIcon, 
//   FileSpreadsheet, 
//   Presentation 
// } from 'lucide-react';
// import api from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { FileUploadAnalysis } from './FileUploadAnalysis';
// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* ========================================================================
//    TYPES & HELPERS
//    ======================================================================== */
// interface DocumentEntry {
//   id: number;
//   file_name: string;
//   upload_date: string;
// }

// // Helper to determine icon and color based on file extension
// const getFileStyle = (fileName: string) => {
//   const ext = fileName.split('.').pop()?.toLowerCase();
//   switch (ext) {
//     case 'pdf': return { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' };
//     case 'doc':
//     case 'docx': return { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' };
//     case 'xls':
//     case 'xlsx': return { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-50' };
//     case 'ppt':
//     case 'pptx': return { icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50' };
//     case 'png':
//     case 'jpg':
//     case 'jpeg': return { icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-50' };
//     default: return { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-100' };
//   }
// };

// /* ========================================================================
//    STUDENT DASHBOARD COMPONENT
//    ======================================================================== */
// export function StudentDashboard() {
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();

//   const [documents, setDocuments] = useState<DocumentEntry[]>([]);
//   const [docsLoading, setDocsLoading] = useState(true);

//   // --- FETCH DOCUMENTS ---
//   useEffect(() => {
//     const fetchStudentDocs = async () => {
//       try {
//         setDocsLoading(true);
//         const res = await api.get("/student/dashboard");
//         setDocuments(res.data);
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setDocsLoading(false);
//       }
//     };
//     fetchStudentDocs();
//   }, []);

//   // --- AUTH CHECK ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center">
//         <p className="text-indigo-400 text-sm font-bold tracking-widest animate-pulse">VERIFYING SESSION...</p>
//       </div>
//     );
//   }

//   if (!user || user.role !== "student") {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
//         <div className="bg-white/90 backdrop-blur-md border-none p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <LogOut className="text-red-600" size={32} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
//           <p className="text-slate-600 text-sm mb-6">You do not have permission to view this dashboard.</p>
//           <button 
//             onClick={() => navigate('/')} 
//             className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all w-full"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- HANDLERS ---
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleView = async (id: number, fileName: string) => {
//     try {
//       const res = await api.get(`/files/original/${id}`, { responseType: "blob" });
//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       alert("Failed to download file.");
//     }
//   };

//   const handleDownload = async (docId: number, fileName?: string) => {
//     try {
//       const res = await api.get(`/analysis-status/${docId}`);
//       generateAndDownloadReport(res.data.result, user.username, fileName);
//     } catch (error) {
//       console.error("Report generation failed", error);
//       alert("Failed to generate report.");
//     }
//   };

//   return (
//     // MAIN CONTAINER - DARK GRADIENT BACKGROUND
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24 text-slate-100">

//       {/* ================= MAIN CONTENT ================= */}
//       {/* Expanded width to utilize full screen */}
//       <div className="flex-1 w-full px-4 md:px-8 pt-6 pb-6">
        
//         {/* --- HEADER (Glassmorphism) --- */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/10">
//           <div>
//             <h2 className="text-3xl font-bold text-white flex items-center gap-3">
//               <div className="bg-white/20 p-2 rounded-xl text-white backdrop-blur-sm shadow-inner">
//                 <User size={28} />
//               </div>
//               Student Dashboard
//             </h2>
//             <p className="text-indigo-200 text-sm mt-2 ml-14 font-medium tracking-wide">Manage your documents and view plagiarism reports</p>
//           </div>
          
//           <div className="flex items-center gap-4 bg-black/20 px-5 py-3 rounded-2xl border border-white/5 backdrop-blur-sm">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/20">
//               {user.username.charAt(0).toUpperCase()}
//             </div>
//             <div className="text-sm">
//               <span className="text-indigo-200 text-xs font-bold uppercase block tracking-wider">Logged in as</span>
//               <span className="font-bold text-white text-base">{user.username}</span>
//             </div>
//           </div>
//         </div>

//         {/* --- TABS CONTAINER (Transparent Wrapper) --- */}
//         <div className="w-full">
//           <Tabs defaultValue="your-data" className="w-full">
            
//             {/* TABS LIST (Dark Glass Style) */}
//             <div className="mb-6">
//               <TabsList className="grid w-full md:w-[600px] md:h-[60px] grid-cols-3 bg-black/20 backdrop-blur-md p-1 rounded-2xl border border-white/10">
//                 <TabsTrigger 
//                   value="your-data" 
//                   className="data-[state=active]:bg-white data-[state=active]:text-purple-900 data-[state=active]:shadow-lg text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2"
//                 >
//                   <FileText size={18} /> <span className="hidden sm:inline">My Documents</span>
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="analysis" 
//                   className="data-[state=active]:bg-white data-[state=active]:text-purple-900 data-[state=active]:shadow-lg text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2"
//                 >
//                   <BarChart size={18} /> <span className="hidden sm:inline">New Analysis</span>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="logout"
//                   onClick={handleLogout}
//                   className="data-[state=active]:bg-rose-500 data-[state=active]:text-white text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:text-rose-300"
//                 >
//                   <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <div className="space-y-6">
//               {/* TAB: YOUR DATA */}
//               <TabsContent value="your-data" className="mt-0 w-full">
//                 {docsLoading ? (
//                   <div className="text-center py-20 flex flex-col items-center justify-center bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
//                     <div className="w-12 h-12 border-4 border-indigo-200 border-t-white rounded-full animate-spin mb-4"></div>
//                     <p className="text-indigo-200 text-sm font-bold tracking-wide">FETCHING DOCUMENTS...</p>
//                   </div>
//                 ) : documents.length === 0 ? (
//                   <div className="text-center py-24 bg-white/5 rounded-3xl backdrop-blur-sm border border-dashed border-white/20">
//                     <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shadow-inner mx-auto mb-4 backdrop-blur-md">
//                       <UploadCloud className="text-white" size={36} />
//                     </div>
//                     <h3 className="text-white font-bold text-lg mb-1">No Documents Found</h3>
//                     <p className="text-indigo-200 text-sm">Upload a document in the Analysis tab to get started.</p>
//                   </div>
//                 ) : (
//                   <div className="grid gap-4 w-full">
//                     {documents.map((doc) => {
//                       const style = getFileStyle(doc.file_name);
//                       const Icon = style.icon;

//                       return (
//                         <div 
//                           key={doc.id} 
//                           // CARD STYLE: High Opacity White, No Border, Deep Shadow
//                           className="group bg-white/95 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-1 w-full"
//                         >
//                           {/* File Info */}
//                           <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0">
//                             <div className={`w-14 h-14 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform`}>
//                               <Icon size={24} />
//                             </div>
//                             <div className="min-w-0">
//                               <h3 className="text-slate-800 font-extrabold text-lg truncate tracking-tight">{doc.file_name}</h3>
//                               <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5">
//                                 <Clock size={12} />
//                                 <span className="font-medium">{new Date(doc.upload_date).toLocaleString()}</span>
//                               </div>
//                             </div>
//                           </div>
                          
//                           {/* Action Buttons */}
//                           <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//                             <button
//                               onClick={() => handleView(doc.id, doc.file_name)}
//                               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 px-6 py-3 rounded-xl text-sm font-bold transition-all"
//                             >
//                               <Eye size={16} /> View
//                             </button>
//                             <button
//                               onClick={() => handleDownload(doc.id, doc.file_name)}
//                               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-indigo-500/30"
//                             >
//                               <Download size={16} /> Report
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </TabsContent>

//               {/* TAB: ANALYSIS - Updated to remove background wrappers */}
//               <TabsContent value="analysis" className="mt-0 w-full space-y-6">
                
//                 {/* Header as a Standalone Glass Card */}
//                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col md:flex-row justify-between items-center">
//                   <div className="mb-4 md:mb-0">
//                     <h3 className="text-white font-bold text-xl">New Analysis Request</h3>
//                     <p className="text-indigo-200 text-sm mt-1">Upload a document to check for plagiarism.</p>
//                   </div>
//                   <span className="text-[10px] font-bold bg-white/20 border border-white/10 px-4 py-1.5 rounded-full text-white uppercase tracking-wide">
//                     Supports PDF, DOCX, PPT, Images
//                   </span>
//                 </div>
                
//                 {/* File Upload Component directly on the background */}
//                 <FileUploadAnalysis
//                   userType="student"
//                   userId={user?.id || ''}
//                   onAnalysisComplete={(result) => console.log('Analysis Complete:', result)}
//                 />
//               </TabsContent>
//             </div>

//           </Tabs>
//         </div>
//       </div>

//       {/* ================= FOOTER (FIXED) ================= */}
//       <footer className="fixed bottom-0 left-0 w-full bg-black/40 backdrop-blur-lg text-center py-4 px-4 text-xs border-t border-white/5 z-50">
//         <div className="flex flex-col gap-1 md:gap-1 w-full mx-auto">
//           <p className="font-medium text-slate-200 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
//           <p className="text-indigo-300/60 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>

//     </div>
//   );
// }













































// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 
// import { 
//   FileText, 
//   LogOut, 
//   Download, 
//   Eye, 
//   User, 
//   BarChart, 
//   UploadCloud, 
//   Clock, 
//   Image as ImageIcon, 
//   FileSpreadsheet, 
//   Presentation 
// } from 'lucide-react';
// import api from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { FileUploadAnalysis } from './FileUploadAnalysis';
// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* ========================================================================
//    TYPES & HELPERS
//    ======================================================================== */
// interface DocumentEntry {
//   id: number;
//   file_name: string;
//   upload_date: string;
// }

// const getFileStyle = (fileName: string) => {
//   const ext = fileName.split('.').pop()?.toLowerCase();
//   switch (ext) {
//     case 'pdf': return { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' };
//     case 'doc':
//     case 'docx': return { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' };
//     case 'xls':
//     case 'xlsx': return { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-50' };
//     case 'ppt':
//     case 'pptx': return { icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50' };
//     case 'png':
//     case 'jpg':
//     case 'jpeg': return { icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-50' };
//     default: return { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-100' };
//   }
// };

// /* ========================================================================
//    STUDENT DASHBOARD COMPONENT
//    ======================================================================== */
// export function StudentDashboard() {
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();

//   const [documents, setDocuments] = useState<DocumentEntry[]>([]);
//   const [docsLoading, setDocsLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudentDocs = async () => {
//       try {
//         setDocsLoading(true);
//         const res = await api.get("/student/dashboard");
//         setDocuments(res.data);
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setDocsLoading(false);
//       }
//     };
//     fetchStudentDocs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center">
//         <p className="text-indigo-400 text-sm font-bold tracking-widest animate-pulse">VERIFYING SESSION...</p>
//       </div>
//     );
//   }

//   if (!user || user.role !== "student") {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
//         <div className="bg-white/90 backdrop-blur-md border-none p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <LogOut className="text-red-600" size={32} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
//           <p className="text-slate-600 text-sm mb-6">You do not have permission to view this dashboard.</p>
//           <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all w-full">
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleLogout = () => { logout(); navigate('/'); };

//   const handleView = async (id: number, fileName: string) => {
//     try {
//       const res = await api.get(`/files/original/${id}`, { responseType: "blob" });
//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a"); a.href = url; a.download = fileName;
//       document.body.appendChild(a); a.click(); document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) { console.error("Download failed", error); alert("Failed to download file."); }
//   };

//   const handleDownload = async (docId: number, fileName?: string) => {
//     try {
//       const res = await api.get(`/analysis-status/${docId}`);
//       generateAndDownloadReport(res.data.result, user.username, fileName);
//     } catch (error) { console.error("Report generation failed", error); alert("Failed to generate report."); }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24 text-slate-100">
//       {/* HEADER */}
//       <div className="flex-1 w-full px-4 md:px-8 pt-6 pb-6">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/10">
//           <div>
//             <h2 className="text-3xl font-bold text-white flex items-center gap-3">
//               <div className="bg-white/20 p-2 rounded-xl text-white backdrop-blur-sm shadow-inner"><User size={28} /></div>
//               Student Dashboard
//             </h2>
//             <p className="text-indigo-200 text-sm mt-2 ml-14 font-medium tracking-wide">Manage your documents and view plagiarism reports</p>
//           </div>
//           <div className="flex items-center gap-4 bg-black/20 px-5 py-3 rounded-2xl border border-white/5 backdrop-blur-sm">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/20">
//               {user.username.charAt(0).toUpperCase()}
//             </div>
//             <div className="text-sm">
//               <span className="text-indigo-200 text-xs font-bold uppercase block tracking-wider">Logged in as</span>
//               <span className="font-bold text-white text-base">{user.username}</span>
//             </div>
//           </div>
//         </div>

//         {/* TABS */}
//         <div className="w-full">
//           <Tabs defaultValue="your-data" className="w-full">
//             <div className="mb-6">
//               <TabsList className="grid w-full md:w-[600px] md:h-[60px] grid-cols-3 bg-black/20 backdrop-blur-md p-1 rounded-2xl border border-white/10">
//                 <TabsTrigger value="your-data" className="data-[state=active]:bg-white data-[state=active]:text-purple-900 data-[state=active]:shadow-lg text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2">
//                   <FileText size={18} /> <span className="hidden sm:inline">My Documents</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="analysis" className="data-[state=active]:bg-white data-[state=active]:text-purple-900 data-[state=active]:shadow-lg text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2">
//                   <BarChart size={18} /> <span className="hidden sm:inline">Analysis</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="logout" onClick={handleLogout} className="data-[state=active]:bg-rose-500 data-[state=active]:text-white text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:text-rose-300">
//                   <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <div className="space-y-6">
//               <TabsContent value="your-data" className="mt-0 w-full">
//                 {docsLoading ? (
//                   <div className="text-center py-20 flex flex-col items-center justify-center bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
//                     <div className="w-12 h-12 border-4 border-indigo-200 border-t-white rounded-full animate-spin mb-4"></div>
//                     <p className="text-indigo-200 text-sm font-bold tracking-wide">FETCHING DOCUMENTS...</p>
//                   </div>
//                 ) : documents.length === 0 ? (
//                   <div className="text-center py-24 bg-white/5 rounded-3xl backdrop-blur-sm border border-dashed border-white/20">
//                     <UploadCloud className="text-white mx-auto mb-4" size={36} />
//                     <h3 className="text-white font-bold text-lg mb-1">No Documents Found</h3>
//                     <p className="text-indigo-200 text-sm">Upload a document in the Analysis tab.</p>
//                   </div>
//                 ) : (
//                   <div className="grid gap-4 w-full">
//                     {documents.map((doc) => {
//                       const style = getFileStyle(doc.file_name);
//                       const Icon = style.icon;
//                       return (
//                         <div key={doc.id} className="group bg-white/95 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 w-full">
//                           <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0">
//                             <div className={`w-14 h-14 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center shrink-0 shadow-inner`}><Icon size={24} /></div>
//                             <div>
//                               <h3 className="text-slate-800 font-extrabold text-lg truncate">{doc.file_name}</h3>
//                               <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5"><Clock size={12} /><span className="font-medium">{new Date(doc.upload_date).toLocaleString()}</span></div>
//                             </div>
//                           </div>
//                           <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//                             <button onClick={() => handleView(doc.id, doc.file_name)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 px-6 py-3 rounded-xl text-sm font-bold transition-all"><Eye size={16} /> View</button>
//                             <button onClick={() => handleDownload(doc.id, doc.file_name)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg"><Download size={16} /> Report</button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </TabsContent>

//               <TabsContent value="analysis" className="mt-0 w-full space-y-6">
//                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col md:flex-row justify-between items-center">
//                   <div className="mb-4 md:mb-0">
//                     <h3 className="text-white font-bold text-xl">New Analysis Request</h3>
//                     <p className="text-indigo-200 text-sm mt-1">Upload a document to check for plagiarism.</p>
//                   </div>
//                   <span className="text-[10px] font-bold bg-white/20 border border-white/10 px-4 py-1.5 rounded-full text-white uppercase tracking-wide">Supports PDF, DOCX, PPT, Images</span>
//                 </div>
//                 <FileUploadAnalysis userType="student" userId={user?.id || ''} onAnalysisComplete={(result) => console.log('Analysis Complete:', result)} />
//               </TabsContent>
//             </div>
//           </Tabs>
//         </div>
//       </div>
//       <footer className="fixed bottom-0 left-0 w-full bg-black/40 backdrop-blur-lg text-center py-4 px-4 text-xs border-t border-white/5 z-50">
//         <div className="flex flex-col gap-1 md:gap-1 w-full mx-auto">
//           <p className="font-medium text-slate-200 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
//           <p className="text-indigo-300/60 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
//         </div>
//       </footer>
//     </div>
//   );
// }












































import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 
import { 
  FileText, 
  LogOut, 
  Download, 
  Eye, 
  User, 
  BarChart, 
  UploadCloud, 
  Clock, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  Presentation 
} from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { FileUploadAnalysis } from './FileUploadAnalysis';
import { generateAndDownloadReport } from "@/lib/reportGenerator";

/* ========================================================================
   TYPES & HELPERS
   ======================================================================== */
interface DocumentEntry {
  id: number;
  file_name: string;
  upload_date: string;
}

const getFileStyle = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' };
    case 'doc':
    case 'docx': return { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' };
    case 'xls':
    case 'xlsx': return { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-50' };
    case 'ppt':
    case 'pptx': return { icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50' };
    case 'png':
    case 'jpg':
    case 'jpeg': return { icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-50' };
    default: return { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-100' };
  }
};

/* ========================================================================
   STUDENT DASHBOARD COMPONENT
   ======================================================================== */
export function StudentDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [docsLoading, setDocsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDocs = async () => {
      try {
        setDocsLoading(true);
        const res = await api.get("/student/dashboard");
        setDocuments(res.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setDocsLoading(false);
      }
    };
    fetchStudentDocs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-indigo-400 text-sm font-bold tracking-widest animate-pulse">VERIFYING SESSION...</p>
      </div>
    );
  }

  if (!user || user.role !== "student") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md border-none p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="text-red-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-600 text-sm mb-6">You do not have permission to view this dashboard.</p>
          <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all w-full">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate('/'); };

  const handleView = async (id: number, fileName: string) => {
    try {
      const res = await api.get(`/files/original/${id}`, { responseType: "blob" });
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = fileName;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) { console.error("Download failed", error); alert("Failed to download file."); }
  };

  const handleDownload = async (docId: number, fileName?: string) => {
    try {
      const res = await api.get(`/analysis-status/${docId}`);
      generateAndDownloadReport(res.data.result, user.username, fileName);
    } catch (error) { console.error("Report generation failed", error); alert("Failed to generate report."); }
  };

  return (
    // MAIN CONTAINER - DARK GRADIENT BACKGROUND
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 flex flex-col font-sans overflow-x-hidden pb-32 md:pb-24 text-slate-100">
      
      {/* ================= MAIN CONTENT ================= */}
      {/* CHANGED: Added max-w-7xl and mx-auto to create equal side margins */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/10">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl text-white backdrop-blur-sm shadow-inner"><User size={28} /></div>
              Student Dashboard
            </h2>
            <p className="text-indigo-200 text-sm mt-2 ml-14 font-medium tracking-wide">Manage your documents and view plagiarism reports</p>
          </div>
          <div className="flex items-center gap-4 bg-black/20 px-5 py-3 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/20">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <span className="text-indigo-200 text-xs font-bold uppercase block tracking-wider">Logged in as</span>
              <span className="font-bold text-white text-base">{user.username}</span>
            </div>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="w-full">
          <Tabs defaultValue="your-data" className="w-full">
            <div className="mb-6">
              <TabsList className="grid w-full md:w-[600px] md:h-[60px] grid-cols-3 bg-black/20 backdrop-blur-md p-1 rounded-2xl border border-white/10">
                <TabsTrigger value="your-data" className="data-[state=active]:bg-white data-[state=active]:text-purple-900 data-[state=active]:shadow-lg text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <FileText size={18} /> <span className="hidden sm:inline">My Documents</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="data-[state=active]:bg-white data-[state=active]:text-purple-900 data-[state=active]:shadow-lg text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <BarChart size={18} /> <span className="hidden sm:inline">New Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="logout" onClick={handleLogout} className="data-[state=active]:bg-rose-500 data-[state=active]:text-white text-indigo-200 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:text-rose-300">
                  <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="space-y-6">
              {/* TAB: MY DOCUMENTS */}
              <TabsContent value="your-data" className="mt-0 w-full">
                {docsLoading ? (
                  <div className="text-center py-20 flex flex-col items-center justify-center bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-white rounded-full animate-spin mb-4"></div>
                    <p className="text-indigo-200 text-sm font-bold tracking-wide">FETCHING DOCUMENTS...</p>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-24 bg-white/5 rounded-3xl backdrop-blur-sm border border-dashed border-white/20">
                    <UploadCloud className="text-white mx-auto mb-4" size={36} />
                    <h3 className="text-white font-bold text-lg mb-1">No Documents Found</h3>
                    <p className="text-indigo-200 text-sm">Upload a document in the Analysis tab.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 w-full">
                    {documents.map((doc) => {
                      const style = getFileStyle(doc.file_name);
                      const Icon = style.icon;
                      return (
                        <div key={doc.id} className="group bg-white/95 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 w-full">
                          <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0">
                            <div className={`w-14 h-14 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center shrink-0 shadow-inner`}><Icon size={24} /></div>
                            <div>
                              <h3 className="text-slate-800 font-extrabold text-lg truncate">{doc.file_name}</h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5"><Clock size={12} /><span className="font-medium">{new Date(doc.upload_date).toLocaleString()}</span></div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button onClick={() => handleView(doc.id, doc.file_name)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 px-6 py-3 rounded-xl text-sm font-bold transition-all"><Eye size={16} /> View</button>
                            <button onClick={() => handleDownload(doc.id, doc.file_name)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg"><Download size={16} /> Report</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              {/* TAB: ANALYSIS */}
              <TabsContent value="analysis" className="mt-0 w-full space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-white font-bold text-xl">New Analysis Request</h3>
                    <p className="text-indigo-200 text-sm mt-1">Upload a document to check for plagiarism.</p>
                  </div>
                  <span className="text-[10px] font-bold bg-white/20 border border-white/10 px-4 py-1.5 rounded-full text-white uppercase tracking-wide">Supports PDF, DOCX, PPT, Images</span>
                </div>
                <FileUploadAnalysis userType="student" userId={user?.id || ''} onAnalysisComplete={(result) => console.log('Analysis Complete:', result)} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* ================= FOOTER (FIXED) ================= */}
      <footer className="fixed bottom-0 left-0 w-full bg-black/40 backdrop-blur-lg text-center py-4 px-4 text-xs border-t border-white/5 z-50">
        {/* CHANGED: Added max-w-7xl and mx-auto to center content matching the body */}
        <div className="flex flex-col gap-1 md:gap-1 w-full max-w-7xl mx-auto">
          <p className="font-medium text-slate-200 tracking-wide">© 2026 Teegala Krishna Reddy Engineering College. All Rights Reserved.</p>
          <p className="text-indigo-300/60 text-[10px]">Designed & Developed under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
        </div>
      </footer>

    </div>
  );
}