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





























import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  UploadCloud, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Clock 
} from 'lucide-react';

/* ========================================================================
   1. INTERNAL UI COMPONENTS
   ======================================================================== */

// --- Stat Card (Modern White with Soft Shadow) ---
const StatCard = ({ title, value, icon: Icon, colorClass }: { title: string, value: string, icon: any, colorClass: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex items-center gap-4">
    <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
  </div>
);

// --- Status Badge ---
const StatusBadge = ({ status, score }: { status: 'Safe' | 'Warning' | 'Copied' | 'Pending', score: number }) => {
  let styles = "";
  let icon = null;

  if (status === 'Safe') {
    styles = "bg-emerald-100 text-emerald-700 border-emerald-200";
    icon = <CheckCircle size={14} />;
  } else if (status === 'Warning') {
    styles = "bg-amber-100 text-amber-700 border-amber-200";
    icon = <AlertTriangle size={14} />;
  } else if (status === 'Copied') {
    styles = "bg-red-100 text-red-700 border-red-200";
    icon = <AlertTriangle size={14} />;
  } else {
    styles = "bg-slate-100 text-slate-600 border-slate-200";
    icon = <Clock size={14} />;
  }

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles}`}>
      {icon} {status} ({score}%)
    </span>
  );
};

/* ========================================================================
   2. MAIN DASHBOARD COMPONENT
   ======================================================================== */
export default function StudentDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock Data for Recent Activity
  const recentUploads = [
    { id: 1, name: "Thesis_Final_Draft.pdf", date: "Jan 06, 2026", score: 12, status: "Safe" },
    { id: 2, name: "Data_Structures_Lab.docx", date: "Jan 05, 2026", score: 45, status: "Warning" },
    { id: 3, name: "History_Assignment_V1.pdf", date: "Jan 02, 2026", score: 8, status: "Safe" },
    { id: 4, name: "Project_Proposal.pdf", date: "Dec 28, 2025", score: 88, status: "Copied" },
  ];

  return (
    // MAIN CONTAINER: Slate-50 background for that clean "App" feel
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">

      {/* ================= SIDEBAR (Responsive) ================= */}
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-50 sticky top-0">
        <div className="font-bold text-lg tracking-wider flex items-center gap-2">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">P</div>
           PLAGIARISM
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Content (Hidden on mobile unless toggled, Fixed on Desktop) */}
      <aside className={`
        fixed inset-0 z-40 bg-slate-900 text-slate-300 w-64 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:block
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:h-screen sticky top-0
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-3 mb-10 text-white">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center font-bold text-xl">
              P
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide leading-none">TKREC</h1>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Student Portal</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-600/10 text-indigo-400 border-r-2 border-indigo-500 rounded-r-sm font-medium transition-all">
              <LayoutDashboard size={20} /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 hover:text-white rounded-lg transition-all">
              <UploadCloud size={20} /> Upload Document
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 hover:text-white rounded-lg transition-all">
              <FileText size={20} /> My Reports
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 hover:text-white rounded-lg transition-all">
              <Settings size={20} /> Settings
            </a>
          </nav>

          {/* User Profile Snippet */}
          <div className="mt-auto pt-6 border-t border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                VP
              </div>
              <div>
                <p className="text-white text-sm font-semibold">V. Prashanth</p>
                <p className="text-xs text-slate-500">Student ID: 21R91A05K8</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 py-2 rounded-lg transition-colors text-sm font-medium">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Welcome back, Prashanth 👋</h1>
            <p className="text-slate-500 text-sm mt-1">Here is what's happening with your documents today.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search reports..." className="ml-2 outline-none text-sm text-slate-600 w-48" />
            </div>
            {/* Notifications */}
            <button className="relative p-2.5 bg-white rounded-lg border border-gray-200 text-slate-600 hover:text-indigo-600 shadow-sm transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        {/* Responsive: 1 col on mobile, 3 cols on desktop (md) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Scans" value="24" icon={FileText} colorClass="bg-blue-500 text-blue-500" />
          <StatCard title="Credits Left" value="8" icon={LayoutDashboard} colorClass="bg-indigo-500 text-indigo-500" />
          <StatCard title="Avg. Uniqueness" value="88%" icon={CheckCircle} colorClass="bg-emerald-500 text-emerald-500" />
        </div>

        {/* Content Layout: Upload (Left) & Recent (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- UPLOAD SECTION (Takes 2 columns on large screens) --- */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-800">New Scan</h3>
                <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-600 rounded">Supports PDF, DOCX</span>
              </div>

              {/* Drag & Drop Zone */}
              <div className="border-2 border-dashed border-indigo-100 rounded-2xl bg-slate-50 hover:bg-indigo-50/30 transition-colors cursor-pointer group flex flex-col items-center justify-center py-12 px-4">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UploadCloud size={32} className="text-indigo-500" />
                </div>
                <p className="text-slate-700 font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-slate-400 text-sm">Maximum file size 10MB</p>
                <button className="mt-6 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-slate-200 transition-all">
                  Browse Files
                </button>
              </div>
            </div>
          </div>

          {/* --- RECENT ACTIVITY (Takes 1 column) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-full">
              <h3 className="font-bold text-lg text-slate-800 mb-6">Recent Reports</h3>
              
              <div className="space-y-4">
                {recentUploads.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-slate-100 p-2.5 rounded-lg text-slate-500">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                        <p className="text-xs text-slate-400">{file.date}</p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={file.status as any} score={file.score} />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors">
                View All Reports
              </button>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}





























