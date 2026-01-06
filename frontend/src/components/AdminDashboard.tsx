// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { FileText, LogOut } from 'lucide-react';
// import api from "@/lib/api";

// import { useAuth } from '@/contexts/AuthContext';
// import { FileUploadAnalysis } from './FileUploadAnalysis';
// import { generateAndDownloadReport } from "@/lib/reportGenerator";



// interface DocumentEntry {
//   id: number;
//   user_id: string;
//   file_name: string;
//   upload_date: string;
// }

// export function AdminDashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [documents, setDocuments] = useState<DocumentEntry[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get('/admin/dashboard');
//         setDocuments(res.data);
//       } catch (err) {
//         console.error('Failed to fetch documents:', err);
//         setDocuments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDocuments();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   if (!user || user.role !== 'admin') {
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



  
// const handleDownload = async (docId: number) => {
//   const res = await api.get(`/analysis-status/${docId}`);
//   generateAndDownloadReport(res.data.result, user.username);
// };



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
//       <Card className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="text-white text-2xl">Admin Dashboard</CardTitle>
//           <p className="text-slate-400 text-sm">Logged in as: {user.username} ({user.role})</p>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="home">
//             <TabsList className="mb-4 bg-slate-700">
//               <TabsTrigger value="home" className="text-slate-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                 <FileText className="h-4 w-4 mr-2" /> Home
//               </TabsTrigger>
//               <TabsTrigger value="analysis" className="text-slate-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                 Analysis
//               </TabsTrigger>
//               <TabsTrigger
//                 value="logout"
//                 className="text-slate-300 data-[state=active]:bg-red-600 data-[state=active]:text-white"
//                 onClick={handleLogout}
//               >
//                 <LogOut className="h-4 w-4 mr-2" /> Logout
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="home">
//               {loading ? (
//                 <p className="text-white text-center">Loading documents...</p>
//               ) : documents.length === 0 ? (
//                 <p className="text-slate-400 text-center">No documents uploaded yet.</p>
//               ) : (
//                 <div className="space-y-4">
//                   {documents.map((doc) => (
//                     <Card key={doc.id} className="bg-slate-700/40 border border-slate-600">
//                       <CardContent className="p-4">
//                         <p className="text-white font-medium">ID: {doc.user_id}</p>
//                         <p className="text-white">File: {doc.file_name}</p>
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
//                 userType="admin"
//                 userId={user.id}
//                 onAnalysisComplete={(result) => console.log('Analysis completed:', result)}
//               />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

















































































































































































import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, LogOut, BarChart, Download, Eye, User } from 'lucide-react';
import api from "@/lib/api";

import { useAuth } from '@/contexts/AuthContext';
import { FileUploadAnalysis } from './FileUploadAnalysis';
import { generateAndDownloadReport } from "@/lib/reportGenerator";

/* ========================================================================
   TYPES
   ======================================================================== */
interface DocumentEntry {
  id: number;
  user_id: string;
  file_name: string;
  upload_date: string;
}

/* ========================================================================
   ADMIN DASHBOARD COMPONENT
   ======================================================================== */
export function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [docsLoading, setDocsLoading] = useState(true);

  // --- FETCH DOCUMENTS ---
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setDocsLoading(true);
        const res = await api.get("/admin/dashboard");
        setDocuments(res.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setDocuments([]);
      } finally {
        setDocsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  // --- AUTH CHECK ---
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-white text-xl font-bold tracking-widest animate-pulse">CHECKING SESSION...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-black border-2 border-red-500 p-8 rounded text-white text-center">
          <h2 className="text-2xl font-bold mb-2">ACCESS DENIED</h2>
          <p>You are not authorized to view this page.</p>
          <button onClick={() => navigate('/')} className="mt-4 bg-red-600 px-4 py-2 rounded">Go Back</button>
        </div>
      </div>
    );
  }

  // --- HANDLERS ---
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // ✅ RESTORED EXACT WORKING LOGIC FROM YOUR ORIGINAL CODE
  const handleView = async (id: number, fileName: string) => {
    const res = await api.get(`/files/original/${id}`, {
      responseType: "blob",
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };

  // ✅ RESTORED EXACT WORKING LOGIC FROM YOUR ORIGINAL CODE
  const handleDownload = async (docId: number) => {
    const res = await api.get(`/analysis-status/${docId}`);
    generateAndDownloadReport(res.data.result, user.username);
  };

  return (
    <div className="min-h-screen bg-whiteflex flex-col font-sans">

      {/* --- HERO BANNER --- */}
      <div className="relative w-full h-[300px] md:h-[150px]">
        <img 
          src="/assets/logo3.png" 
          alt="College Campus" 
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"; }}
        />
      </div>

      {/* ================= MAIN DASHBOARD CONTENT ================= */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
        
        {/* --- HEADER BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="bg-black text-white px-8 py-3 rounded-r-full border-l-8 border-white shadow-lg w-full md:w-auto">
              <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" /> Admin Dashboard
              </h2>
            </div>
            <div className="text-white text-sm bg-blue-900/80 px-4 py-2 rounded border border-blue-500">
              Logged in as: <span className="font-bold text-blue-200 uppercase">{user.username}</span>
            </div>
        </div>

        {/* --- TABS CONTAINER --- */}
        <div className="bg-black border-2 border-blue-600 rounded-lg p-6 shadow-2xl min-h-[600px]">
          <Tabs defaultValue="home" className="w-full">
            
            {/* TABS LIST */}
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-gray-700 p-1 rounded-md mb-6">
              <TabsTrigger 
                value="home" 
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-gray-400 font-bold tracking-wide uppercase py-2 transition-all"
              >
                <FileText className="h-4 w-4 mr-2" /> Home
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-gray-400 font-bold tracking-wide uppercase py-2 transition-all"
              >
                <BarChart className="h-4 w-4 mr-2" /> Analysis
              </TabsTrigger>
              <TabsTrigger
                value="logout"
                onClick={handleLogout}
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-red-400 font-bold tracking-wide uppercase py-2 transition-all hover:bg-red-900/50"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </TabsTrigger>
            </TabsList>

            {/* TAB: HOME (DOCUMENT LIST) */}
            <TabsContent value="home" className="space-y-6">
              {docsLoading ? (
                <div className="text-center py-20">
                    <p className="text-blue-300 text-xl animate-pulse font-bold">LOADING RECORDS...</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-20 bg-gray-900/50 rounded border border-gray-700">
                  <p className="text-gray-400 text-lg">No documents found in the database.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {documents.map((doc) => (
                    <div 
                        key={doc.id} 
                        className="bg-gray-900/80 border border-blue-900/50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center hover:border-blue-500 transition-colors shadow-lg group"
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-900 text-blue-100 text-xs px-2 py-0.5 rounded uppercase font-bold">ID: {doc.user_id}</span>
                            <span className="text-gray-500 text-xs">{new Date(doc.upload_date).toLocaleString()}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors">{doc.file_name}</h3>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleView(doc.id, doc.file_name)}
                          className="flex items-center gap-2 bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-4 py-2 rounded text-sm font-bold transition-all uppercase"
                        >
                          <Eye size={16} /> View File
                        </button>
                        <button
                          onClick={() => handleDownload(doc.id)}
                          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold transition-all uppercase shadow-md"
                        >
                          <Download size={16} /> Get Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* TAB: ANALYSIS */}
            <TabsContent value="analysis">
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2 uppercase text-blue-400">
                  Upload New Analysis
                </h3>
                <div className="text-white">
                    <FileUploadAnalysis
                        userType="admin"
                        userId={user.id}
                        onAnalysisComplete={(result) => console.log('Analysis completed:', result)}
                    />
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-white text-center py-6 text-sm border-t-4 border-blue-800 mt-auto">
        <div className="flex flex-col gap-2">
          <p className="font-semibold tracking-wide">© 2026 Teegala Krishna Reddy Engineering College, All Rights Reserved.</p>
          <p className="text-gray-400">Designed, Developed & Maintenance under the Guidance of Dr. B. Srinivasa Rao (Dean Academics)</p>
        </div>
      </footer>

    </div>
  );
}