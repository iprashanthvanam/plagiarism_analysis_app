














// import React, { useState, useRef, useEffect, useCallback } from "react";
// import {
//   Upload,
//   FileText,
//   Image,
//   BarChart3,
//   CheckCircle,
//   AlertCircle,
//   Clock,
//   Download,
//   X,
//   Info,
// } from "lucide-react";
// import jsPDF from "jspdf";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import api from "@/lib/api";


// import { AnalysisResult, AnalysisStatus } from "@/lib/types";
// import type { MatchedSource } from "@/lib/types";

// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* =======================
//    CONFIG (E2)
// ======================= */
// const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
// const POLLING_INITIAL_DELAY = 2000;
// const POLLING_MAX_DELAY = 10000;
// const POLLING_BACKOFF = 1.5;
// const POLLING_MAX_RETRIES = 30;
// const ANALYZE_STAGGER_DELAY = 300;



// // export type MatchedSource = {
// //   type: "web" | "local_db";
// //   source: string;
// // };





// const SUPPORTED_TYPES = {
//   "application/pdf": { icon: FileText, label: "PDF", color: "bg-red-100 text-red-800" },
//   "application/msword": { icon: FileText, label: "DOC", color: "bg-blue-100 text-blue-800" },
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
//     icon: FileText,
//     label: "DOCX",
//     color: "bg-blue-100 text-blue-800",
//   },
//   "application/vnd.ms-excel": { icon: BarChart3, label: "XLS", color: "bg-green-100 text-green-800" },
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
//     icon: BarChart3,
//     label: "XLSX",
//     color: "bg-green-100 text-green-800",
//   },
//   "application/vnd.ms-powerpoint": { icon: Image, label: "PPT", color: "bg-orange-100 text-orange-800" },
//   "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
//     icon: Image,
//     label: "PPTX",
//     color: "bg-orange-100 text-orange-800",
//   },
//   "text/plain": { icon: FileText, label: "TXT", color: "bg-gray-100 text-gray-800" },
//   "image/jpeg": { icon: Image, label: "JPEG", color: "bg-purple-100 text-purple-800" },
//   "image/png": { icon: Image, label: "PNG", color: "bg-purple-100 text-purple-800" },
// };

// interface UploadedFile {
//   file: File;
//   id: string;
//   status: "pending" | "uploading" | "analyzing" | "completed" | "error";
//   progress: number;
//   analysisId?: string;
//   result?: AnalysisResult;
//   error?: string;
// }

// interface Props {
//   userType: "admin" | "student";
//   userId: string;
//   onAnalysisComplete?: (r: AnalysisResult) => void;
// }


// export function FileUploadAnalysis({ userType, userId, onAnalysisComplete }: Props) {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [isDragOver, setIsDragOver] = useState(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const pollRefs = useRef<Map<string, boolean>>(new Map());

//   useEffect(() => {
//     return () => pollRefs.current.clear();
//   }, []);

//   const generateId = () => crypto.randomUUID();

//   const formatFileSize = (bytes: number) =>
//     bytes >= 1024 * 1024
//       ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
//       : `${(bytes / 1024).toFixed(1)} KB`;

//   const validateFile = (file: File): string | null => {
//     if (file.size > MAX_FILE_SIZE_BYTES) return "File exceeds 50MB limit";
//     if (!SUPPORTED_TYPES[file.type as keyof typeof SUPPORTED_TYPES]) return "Unsupported file type";
//     return null;
//   };

//   const handleFileSelect = (files: FileList | File[]) => {
//     const next: UploadedFile[] = [];
//     const errors: string[] = [];

//     Array.from(files).forEach((file) => {
//       const err = validateFile(file);
//       if (err) errors.push(`${file.name}: ${err}`);
//       else next.push({ file, id: generateId(), status: "pending", progress: 0 });
//     });

//     if (errors.length) alert(errors.join("\n"));
//     if (next.length) setUploadedFiles((p) => [...p, ...next]);
//   };

//   const removeFile = (id: string) => {
//     pollRefs.current.delete(id);
//     setUploadedFiles((p) => p.filter((f) => f.id !== id));
//   };

//   const pollWithBackoff = useCallback(
//     async (fileId: string, analysisId: string) => {
//       let delay = POLLING_INITIAL_DELAY;
//       let attempts = 0;
//       pollRefs.current.set(fileId, true);

//       while (pollRefs.current.get(fileId) && attempts < POLLING_MAX_RETRIES) {
//         const res = await api.get(`/analysis-status/${analysisId}`);
//         const status: AnalysisStatus = res.data;

//         if (status.status === "completed" && status.result) {
//           pollRefs.current.delete(fileId);
//           onAnalysisComplete?.(status.result);
//           setUploadedFiles((p) =>
//             p.map((f) =>
//               f.id === fileId ? { ...f, status: "completed", progress: 100, result: status.result } : f
//             )
//           );
//           return;
//         }

//         setUploadedFiles((p) =>
//           p.map((f) => (f.id === fileId ? { ...f, progress: status.progress_percentage || 0 } : f))
//         );

//         await new Promise((r) => setTimeout(r, delay));
//         delay = Math.min(delay * POLLING_BACKOFF, POLLING_MAX_DELAY);
//         attempts++;
//       }
//     },
//     [onAnalysisComplete]
//   );

//  const analyzeFile = async (f: UploadedFile) => {
//   try {
//     setUploadedFiles(p =>
//       p.map(x => (x.id === f.id ? { ...x, status: "uploading", progress: 10 } : x))
//     );

//     const formData = new FormData();
//     formData.append("file", f.file); // ✅ ONLY file

//     const uploadRes = await api.post("/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//       // onUploadProgress: e => {
//       onUploadProgress: (e: any) => {
//         const percent = Math.round((e.loaded * 100) / (e.total || 1));
//         setUploadedFiles(p =>
//           p.map(x => (x.id === f.id ? { ...x, progress: percent } : x))
//         );
//       },
//     });

//     const documentId = uploadRes.data.document_id;

//     setUploadedFiles(p =>
//       p.map(x =>
//         x.id === f.id
//           ? { ...x, analysisId: documentId, status: "analyzing", progress: 20 }
//           : x
//       )
//     );

//     await api.post(`/analyze/${documentId}`);

//     pollWithBackoff(f.id, documentId);
//   } catch (err: any) {
//     setUploadedFiles(p =>
//       p.map(x =>
//         x.id === f.id
//           ? { ...x, status: "error", error: err?.response?.data?.detail || err.message }
//           : x
//       )
//     );
//   }
// };





//   const decodeMatchedSources = (sources?: string[]): MatchedSource[] => {
//   if (!sources) return [];

//   return sources
//     .map((s) => {
//       if (!s.includes("::")) return null;
//       const [type, source] = s.split("::", 2);
//       if (type !== "web" && type !== "local_db") return null;
//       return { type, source };
//     })
//     .filter(Boolean) as MatchedSource[];
// };






// //   const downloadReport = (r: AnalysisResult) => {
// //   const pdf = new jsPDF();

// //   let y = 10;
// //   const pageHeight = pdf.internal.pageSize.height;

// //   const line = (text: string) => {
// //     if (y > pageHeight - 10) {
// //       pdf.addPage();
// //       y = 10;
// //     }
// //     pdf.text(text, 10, y);
// //     y += 8;
// //   };


// //   const reportText = generateAndDownloadReport({
// //   file_name: r.file_name,
// //   document_id: r.document_id,
// //   submitted_by: userId,
// //   analysis_date: new Date(r.analysis_date).toLocaleString(),
// //   ai_detected_percentage: r.ai_detected_percentage,
// //   web_source_percentage: r.web_source_percentage,
// //   human_written_percentage: r.human_written_percentage,
// //   matched_sources: r.matched_sources,
// // });



// //   const linkLine = (label: string, url: string) => {
// //     if (y > pageHeight - 10) {
// //       pdf.addPage();
// //       y = 10;
// //     }
// //     pdf.setTextColor(0, 0, 255); // blue
// //     pdf.textWithLink(label, 10, y, { url });
// //     pdf.setTextColor(0, 0, 0); // reset
// //     y += 8;
// //   };

// //   line("PLAGIARISM ANALYSIS REPORT");
// //   line("--------------------------------");
// //   line(`File Name      : ${r.file_name}`);
// //   line(`Document ID    : ${r.document_id}`);
// //   line(`Submitted By   : ${userId}`);
// //   line(`Date           : ${new Date(r.analysis_date).toLocaleString()}`);
// //   line("");

// //   line("RESULT SUMMARY");
// //   line("--------------------------------");
// //   line(`AI Generated Content        : ${r.ai_detected_percentage}%`);
// //   line(`Similarity to Web Sources  : ${r.web_source_percentage}%`);
// //   line(`Likely Original Content    : ${r.human_written_percentage}%`);
// //   line("");

// //   line("INTERPRETATION");
// //   line("--------------------------------");
// //   line("• AI Generated Content:");
// //   line("  Probability that the text matches AI writing patterns.");
// //   line("");
// //   line("• Similarity to Web Sources:");
// //   line("  Portion of text matching publicly available online content.");
// //   line("");
// //   line("• Likely Original Content:");
// //   line("  Content not strongly matched with AI or web sources.");
// //   line("");




// //   if (r.matched_sources?.length) {
// //   line("MATCHED SOURCES");
// //   line("--------------------------------");

// //   r.matched_sources.forEach((src, i) => {
// //     if (src.type === "web") {
// //       pdf.setTextColor(0, 0, 255);
// //       pdf.textWithLink(
// //         `${i + 1}. ${src.source}`,
// //         10,
// //         y,
// //         { url: src.source }
// //       );
// //       y += 8;
// //       pdf.setTextColor(0, 0, 0);
// //     } else {
// //       line(`${i + 1}. Internal Database Match (${src.source})`);
// //     }
// //   });

// //   line("");
// // }













// //   line("NOTE");
// //   line("--------------------------------");
// //   line("• Web links are clickable and shown in blue.");
// //   line("• Local database references indicate internal document matches.");
// //   line("• Percentages are similarity indicators, not accusations.");
// //   line("• AI and web detection may overlap.");
// //   line("");
// //   line("Generated by TKREC Plagiarism Analysis System");

// //   pdf.save(`${r.document_id}-analysis-report.pdf`);
// // };




// const downloadReport = (r: AnalysisResult) => {
//   generateAndDownloadReport(r, userId);
// };






  
//   return (
//     <div className="space-y-6">
//       <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="text-white flex items-center gap-2">
//             <Upload className="h-5 w-5 text-blue-400" />
//             Upload Files for Analysis
//           </CardTitle>
//           <p className="text-slate-400 text-sm">Supported: PDF, DOCX, XLSX, PPT, TXT, Images (Max 50MB)</p>
//         </CardHeader>
//         <CardContent>
//           <div
//             className={`border-2 border-dashed p-6 rounded-lg text-center transition ${
//               isDragOver ? 'border-blue-400 bg-blue-400/10' : 'border-slate-600 hover:border-slate-500'
//             }`}
//             onDrop={e => {
//               e.preventDefault();
//               setIsDragOver(false);
//               handleFileSelect(e.dataTransfer.files);
//             }}
//             onDragOver={e => {
//               e.preventDefault();
//               setIsDragOver(true);
//             }}
//             onDragLeave={e => {
//               e.preventDefault();
//               setIsDragOver(false);
//             }}
//           >
//             <Upload className="h-10 w-10 mx-auto text-slate-400 mb-2" />
//             <p className="text-slate-300 mb-2">Drag files here or click below</p>
//             <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
//               Select Files
//             </Button>
//             <input
//               type="file"
//               multiple
//               ref={fileInputRef}
//               onChange={e => {
//                 if (e.target.files) handleFileSelect(e.target.files);
//                 e.target.value = '';
//               }}
//               className="hidden"
//               accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {uploadedFiles.length > 0 && (
//         <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-white">Uploaded Files ({uploadedFiles.length})</CardTitle>
//               {uploadedFiles.some(f => f.status === 'pending') && (
//                 <Button
//                   onClick={async () => {
//                     setIsAnalyzing(true);
//                     for (const file of uploadedFiles.filter(f => f.status === 'pending')) {
//                       await analyzeFile(file);
//                       await new Promise(res => setTimeout(res, 300));
//                     }
//                     setIsAnalyzing(false);
//                   }}
//                   className="bg-purple-600 hover:bg-purple-700"
//                 >
//                   <BarChart3 className="h-4 w-4 mr-2" />
//                   {isAnalyzing ? 'Analyzing...' : 'Analyze All'}
//                 </Button>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {uploadedFiles.map(file => {
//               const type = SUPPORTED_TYPES[file.file.type as keyof typeof SUPPORTED_TYPES] || {
//                 icon: FileText, label: 'File', color: 'bg-gray-100 text-gray-800'
//               };

//               return (
//                 <div key={file.id} className="p-4 border border-slate-600 rounded-lg">
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center gap-3">
//                       {React.createElement(type.icon, { className: 'h-6 w-6 text-gray-400' })}
//                       <div>
//                         <p className="text-white font-medium">{file.file.name}</p>
//                         <div className="text-xs text-slate-400 flex items-center gap-2">
//                           <Badge className={type.color}>{type.label}</Badge>
//                           <span>{formatFileSize(file.file.size)}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {file.status === 'pending' ? <Clock className="text-yellow-400 h-4 w-4" />
//                         : file.status === 'uploading' ? <Upload className="text-blue-400 h-4 w-4 animate-pulse" />
//                         : file.status === 'analyzing' ? <BarChart3 className="text-purple-400 h-4 w-4 animate-pulse" />
//                         : file.status === 'completed' ? <CheckCircle className="text-green-400 h-4 w-4" />
//                         : <AlertCircle className="text-red-400 h-4 w-4" />}
//                       <Button size="sm" variant="outline" onClick={() => removeFile(file.id)}
//                         className="border-red-500 text-red-400 hover:bg-red-500/10">
//                         <X className="h-3 w-3" />
//                       </Button>
//                     </div>
//                   </div>

//                   {(file.status === 'uploading' || file.status === 'analyzing') && (
//                     <div>
//                       <Progress value={file.progress} className="h-2" />
//                       <p className="text-xs text-slate-400 mt-1">{file.progress}%</p>
//                     </div>
//                   )}

//                   {file.status === 'error' && file.error && (
//                     <Alert className="bg-red-500/10 border-red-500 mt-2">
//                       <AlertCircle className="h-4 w-4" />
//                       <AlertDescription className="text-red-300">{file.error}</AlertDescription>
//                     </Alert>
//                   )}

//                   {file.status === 'completed' && file.result && (
//                     <div className="mt-4 space-y-2">
//                       <div className="grid grid-cols-3 gap-4 text-center">
//                         <div className="p-2 rounded bg-slate-700/30">
//                           <p className="text-xl font-bold text-red-400">{file.result.ai_detected_percentage}%</p>
//                           <p className="text-xs text-slate-400">AI Detected</p>
//                         </div>
//                         <div className="p-2 rounded bg-slate-700/30">
//                           <p className="text-xl font-bold text-orange-400">{file.result.web_source_percentage}%</p>
//                           <p className="text-xs text-slate-400">Web Sources</p>
//                         </div>
//                         <div className="p-2 rounded bg-slate-700/30">
//                           <p className="text-xl font-bold text-green-400">{file.result.human_written_percentage}%</p>
//                           <p className="text-xs text-slate-400">Original</p>
//                         </div>
//                       </div>
//                       {file.result.analysis_summary && (
//                         <p className="text-slate-300 text-sm">{file.result.analysis_summary}</p>
//                       )}
//                       {file.result?.matched_sources && file.result.matched_sources.length > 0 && (
//   <div className="text-xs text-slate-400">
//     <p>Matched Sources:</p>
//     <ul className="list-disc ml-6">
//   {file.result.matched_sources.map((src, i) => (
//     <li key={i}>
//       {src.type === "web" ? (
//         <a
//           href={src.source}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-400 underline"
//         >
//           {src.source}
//         </a>
//       ) : (
//         <>Internal Database Match ({src.source})</>
//       )}
//     </li>
//   ))}
// </ul>

//   </div>
// )}

//                       <Button
//                         size="sm"
//                         onClick={() =>
//     generateAndDownloadReport(
//       file.result!,
//       userId,
//       file.file.name
//     )
//   }
//                         className="bg-green-600 hover:bg-green-700"
//                       >
//                         <Download className="h-4 w-4 mr-2" />
//                         Download Report
//                       </Button>
//                     </div>
//                   )}

//                   {file.status === 'pending' && (
//                     <div className="mt-2">
//                       <Button size="sm" onClick={() => analyzeFile(file)}
//                         className="bg-purple-600 hover:bg-purple-700">
//                         <BarChart3 className="h-4 w-4 mr-2" />
//                         Analyze Now
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

















































































// import React, { useState, useRef, useEffect, useCallback } from "react";
// import {
//   Upload,
//   FileText,
//   Image,
//   BarChart3,
//   CheckCircle,
//   AlertCircle,
//   Clock,
//   Download,
//   X,
//   File,
//   Loader2,
//   Globe,
//   Database
// } from "lucide-react";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import api from "@/lib/api";

// import { AnalysisResult, AnalysisStatus } from "@/lib/types";
// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* =======================
//    CONFIG
// ======================= */
// const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
// const POLLING_INITIAL_DELAY = 2000;
// const POLLING_MAX_DELAY = 10000;
// const POLLING_BACKOFF = 1.5;
// const POLLING_MAX_RETRIES = 30;

// // Updated colors for Light/Clean Theme
// const SUPPORTED_TYPES = {
//   "application/pdf": { icon: FileText, label: "PDF", color: "bg-red-50 text-red-600 border-red-200" },
//   "application/msword": { icon: FileText, label: "DOC", color: "bg-blue-50 text-blue-600 border-blue-200" },
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
//     icon: FileText,
//     label: "DOCX",
//     color: "bg-blue-50 text-blue-600 border-blue-200",
//   },
//   "application/vnd.ms-excel": { icon: BarChart3, label: "XLS", color: "bg-green-50 text-green-600 border-green-200" },
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
//     icon: BarChart3,
//     label: "XLSX",
//     color: "bg-green-50 text-green-600 border-green-200",
//   },
//   "application/vnd.ms-powerpoint": { icon: Image, label: "PPT", color: "bg-orange-50 text-orange-600 border-orange-200" },
//   "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
//     icon: Image,
//     label: "PPTX",
//     color: "bg-orange-50 text-orange-600 border-orange-200",
//   },
//   "text/plain": { icon: FileText, label: "TXT", color: "bg-slate-100 text-slate-600 border-slate-200" },
//   "image/jpeg": { icon: Image, label: "JPEG", color: "bg-purple-50 text-purple-600 border-purple-200" },
//   "image/png": { icon: Image, label: "PNG", color: "bg-purple-50 text-purple-600 border-purple-200" },
// };

// interface UploadedFile {
//   file: File;
//   id: string;
//   status: "pending" | "uploading" | "analyzing" | "completed" | "error";
//   progress: number;
//   analysisId?: string;
//   result?: AnalysisResult;
//   error?: string;
// }

// interface Props {
//   userType: "admin" | "student";
//   userId: string;
//   onAnalysisComplete?: (r: AnalysisResult) => void;
// }

// export function FileUploadAnalysis({ userType, userId, onAnalysisComplete }: Props) {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [isDragOver, setIsDragOver] = useState(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const pollRefs = useRef<Map<string, boolean>>(new Map());

//   useEffect(() => {
//     return () => pollRefs.current.clear();
//   }, []);

//   const generateId = () => crypto.randomUUID();

//   const formatFileSize = (bytes: number) =>
//     bytes >= 1024 * 1024
//       ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
//       : `${(bytes / 1024).toFixed(1)} KB`;

//   const validateFile = (file: File): string | null => {
//     if (file.size > MAX_FILE_SIZE_BYTES) return "File exceeds 50MB limit";
//     if (!SUPPORTED_TYPES[file.type as keyof typeof SUPPORTED_TYPES]) return "Unsupported file type";
//     return null;
//   };

//   const handleFileSelect = (files: FileList | File[]) => {
//     const next: UploadedFile[] = [];
//     const errors: string[] = [];

//     Array.from(files).forEach((file) => {
//       const err = validateFile(file);
//       if (err) errors.push(`${file.name}: ${err}`);
//       else next.push({ file, id: generateId(), status: "pending", progress: 0 });
//     });

//     if (errors.length) alert(errors.join("\n"));
//     if (next.length) setUploadedFiles((p) => [...p, ...next]);
//   };

//   const removeFile = (id: string) => {
//     pollRefs.current.delete(id);
//     setUploadedFiles((p) => p.filter((f) => f.id !== id));
//   };

//   const pollWithBackoff = useCallback(
//     async (fileId: string, analysisId: string) => {
//       let delay = POLLING_INITIAL_DELAY;
//       let attempts = 0;
//       pollRefs.current.set(fileId, true);

//       while (pollRefs.current.get(fileId) && attempts < POLLING_MAX_RETRIES) {
//         const res = await api.get(`/analysis-status/${analysisId}`);
//         const status: AnalysisStatus = res.data;

//         if (status.status === "completed" && status.result) {
//           pollRefs.current.delete(fileId);
//           onAnalysisComplete?.(status.result);
//           setUploadedFiles((p) =>
//             p.map((f) =>
//               f.id === fileId ? { ...f, status: "completed", progress: 100, result: status.result } : f
//             )
//           );
//           return;
//         }

//         setUploadedFiles((p) =>
//           p.map((f) => (f.id === fileId ? { ...f, progress: status.progress_percentage || 0 } : f))
//         );

//         await new Promise((r) => setTimeout(r, delay));
//         delay = Math.min(delay * POLLING_BACKOFF, POLLING_MAX_DELAY);
//         attempts++;
//       }
//     },
//     [onAnalysisComplete]
//   );

//   const analyzeFile = async (f: UploadedFile) => {
//     try {
//       setUploadedFiles(p =>
//         p.map(x => (x.id === f.id ? { ...x, status: "uploading", progress: 10 } : x))
//       );

//       const formData = new FormData();
//       formData.append("file", f.file);

//       const uploadRes = await api.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (e: any) => {
//           const percent = Math.round((e.loaded * 100) / (e.total || 1));
//           setUploadedFiles(p =>
//             p.map(x => (x.id === f.id ? { ...x, progress: percent } : x))
//           );
//         },
//       });

//       const documentId = uploadRes.data.document_id;

//       setUploadedFiles(p =>
//         p.map(x =>
//           x.id === f.id
//             ? { ...x, analysisId: documentId, status: "analyzing", progress: 20 }
//             : x
//         )
//       );

//       await api.post(`/analyze/${documentId}`);

//       pollWithBackoff(f.id, documentId);
//     } catch (err: any) {
//       setUploadedFiles(p =>
//         p.map(x =>
//           x.id === f.id
//             ? { ...x, status: "error", error: err?.response?.data?.detail || err.message }
//             : x
//         )
//       );
//     }
//   };

//   return (
//     <div className="space-y-6 font-sans">
      
//       {/* --- UPLOAD ZONE (Clean & Modern) --- */}
//       <div
//         className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 ${
//           isDragOver 
//             ? 'border-indigo-500 bg-indigo-50' 
//             : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-white'
//         }`}
//         onDrop={e => {
//           e.preventDefault();
//           setIsDragOver(false);
//           handleFileSelect(e.dataTransfer.files);
//         }}
//         onDragOver={e => {
//           e.preventDefault();
//           setIsDragOver(true);
//         }}
//         onDragLeave={e => {
//           e.preventDefault();
//           setIsDragOver(false);
//         }}
//         onClick={() => fileInputRef.current?.click()}
//       >
//         <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center">
//            <Upload className={`h-8 w-8 ${isDragOver ? 'text-indigo-600' : 'text-slate-400'}`} />
//         </div>
        
//         <div>
//           <p className="text-slate-800 font-bold text-lg">Click to upload or drag & drop</p>
//           <p className="text-slate-500 text-sm mt-1">PDF, DOCX, XLSX, Images (Max 50MB)</p>
//         </div>
        
//         <input
//           type="file"
//           multiple
//           ref={fileInputRef}
//           onChange={e => {
//             if (e.target.files) handleFileSelect(e.target.files);
//             e.target.value = '';
//           }}
//           className="hidden"
//           accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
//         />
//       </div>

//       {/* --- FILE QUEUE LIST --- */}
//       {uploadedFiles.length > 0 && (
//         <div className="space-y-4">
          
//           <div className="flex justify-between items-center px-2">
//             <h3 className="text-slate-700 font-bold text-sm uppercase tracking-wide">
//               Queue ({uploadedFiles.length})
//             </h3>
//             {uploadedFiles.some(f => f.status === 'pending') && (
//               <Button
//                 onClick={async () => {
//                   setIsAnalyzing(true);
//                   for (const file of uploadedFiles.filter(f => f.status === 'pending')) {
//                     await analyzeFile(file);
//                     await new Promise(res => setTimeout(res, 300));
//                   }
//                   setIsAnalyzing(false);
//                 }}
//                 className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase px-4 py-2 h-auto"
//               >
//                 {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BarChart3 className="w-4 h-4 mr-2" />}
//                 {isAnalyzing ? 'Processing...' : 'Analyze All'}
//               </Button>
//             )}
//           </div>

//           <div className="grid gap-4">
//             {uploadedFiles.map(file => {
//               const type = SUPPORTED_TYPES[file.file.type as keyof typeof SUPPORTED_TYPES] || {
//                 icon: File, label: 'FILE', color: 'bg-slate-100 text-slate-600 border-slate-200'
//               };

//               return (
//                 <div key={file.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                  
//                   {/* File Header */}
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center gap-4">
//                       <div className={`p-3 rounded-lg ${type.color} bg-opacity-20 border`}>
//                         {React.createElement(type.icon, { className: 'h-6 w-6' })}
//                       </div>
//                       <div>
//                         <p className="text-slate-800 font-bold text-sm md:text-base line-clamp-1">{file.file.name}</p>
//                         <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
//                           <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{type.label}</span>
//                           <span>{formatFileSize(file.file.size)}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Status & Actions */}
//                     <div className="flex items-center gap-3">
//                       {file.status === 'pending' && <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pending</Badge>}
//                       {file.status === 'uploading' && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Uploading</Badge>}
//                       {file.status === 'analyzing' && <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Analyzing</Badge>}
//                       {file.status === 'completed' && <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Completed</Badge>}
//                       {file.status === 'error' && <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Error</Badge>}
                      
//                       <button onClick={() => removeFile(file.id)} className="text-slate-400 hover:text-red-500 transition-colors">
//                         <X size={18} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Progress Bar */}
//                   {(file.status === 'uploading' || file.status === 'analyzing') && (
//                     <div className="mb-2">
//                       <div className="flex justify-between text-xs mb-1.5">
//                         <span className="text-indigo-600 font-semibold uppercase">{file.status}...</span>
//                         <span className="text-slate-500">{file.progress}%</span>
//                       </div>
//                       <Progress value={file.progress} className="h-1.5 bg-slate-100" />
//                     </div>
//                   )}

//                   {/* Error Message */}
//                   {file.status === 'error' && file.error && (
//                     <Alert className="bg-red-50 border-red-100 mt-2 p-3">
//                       <div className="flex gap-2 items-center">
//                         <AlertCircle className="h-4 w-4 text-red-500" />
//                         <span className="text-red-600 text-xs font-medium">{file.error}</span>
//                       </div>
//                     </Alert>
//                   )}

//                   {/* --- ANALYSIS RESULTS (Modern Card) --- */}
//                   {file.status === 'completed' && file.result && (
//                     <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      
//                       {/* Score Grid */}
//                       <div className="grid grid-cols-3 gap-3 mb-4">
//                         <div className="p-3 bg-white rounded-lg border border-slate-100 text-center shadow-sm">
//                           <p className="text-xl font-bold text-red-500">{file.result.ai_detected_percentage}%</p>
//                           <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">AI Content</p>
//                         </div>
//                         <div className="p-3 bg-white rounded-lg border border-slate-100 text-center shadow-sm">
//                           <p className="text-xl font-bold text-amber-500">{file.result.web_source_percentage}%</p>
//                           <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Plagiarism</p>
//                         </div>
//                         <div className="p-3 bg-white rounded-lg border border-slate-100 text-center shadow-sm">
//                           <p className="text-xl font-bold text-emerald-500">{file.result.human_written_percentage}%</p>
//                           <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Original</p>
//                         </div>
//                       </div>
                      
//                       {/* Summary */}
//                       {file.result.analysis_summary && (
//                         <div className="bg-white p-3 rounded-lg border border-slate-100 mb-4">
//                           <p className="text-slate-600 text-xs italic leading-relaxed">
//                             "{file.result.analysis_summary}"
//                           </p>
//                         </div>
//                       )}

//                       {/* --- NEW SECTION: MATCHED SOURCES LIST --- */}
//                       {file.result.matched_sources && file.result.matched_sources.length > 0 && (
//                         <div className="bg-white p-4 rounded-lg border border-slate-100 mb-4 shadow-sm">
//                           <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
//                             <Globe size={14} className="text-blue-500" /> Matched Sources
//                           </h4>
//                           <ul className="space-y-2">
//                             {file.result.matched_sources.map((source, index) => (
//                               <li key={index} className="text-xs flex items-start gap-2.5 p-2 rounded-md hover:bg-slate-50 transition-colors">
//                                 <div className={`mt-0.5 min-w-[6px] h-1.5 rounded-full ${source.type === 'web' ? 'bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]' : 'bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.5)]'}`}></div>
//                                 <div className="flex-1 min-w-0">
//                                   {source.type === 'web' ? (
//                                     <a 
//                                       href={source.source} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer" 
//                                       className="text-blue-600 hover:text-blue-800 font-medium hover:underline block truncate"
//                                       title={source.source}
//                                     >
//                                       {source.source}
//                                     </a>
//                                   ) : (
//                                     <div className="text-slate-600 font-medium flex items-center gap-1.5">
//                                       <Database size={12} className="text-orange-500" />
//                                       Internal Database Match: <span className="text-slate-800">{source.source}</span>
//                                     </div>
//                                   )}
//                                 </div>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* Download Button */}
//                       <Button
//                         size="sm"
//                         onClick={() => generateAndDownloadReport(file.result!, userId, file.file.name)}
//                         className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold uppercase tracking-wide text-xs h-9"
//                       >
//                         <Download className="h-3.5 w-3.5 mr-2" />
//                         Download Report
//                       </Button>
//                     </div>
//                   )}

//                   {/* Individual Analyze Action */}
//                   {file.status === 'pending' && (
//                     <div className="mt-4 pt-4 border-t border-slate-100">
//                       <Button 
//                         size="sm" 
//                         onClick={() => analyzeFile(file)}
//                         variant="outline"
//                         className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold uppercase text-xs"
//                       >
//                         Start Analysis
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






























// import React, { useState, useRef, useEffect, useCallback } from "react";
// import {
//   Upload,
//   FileText,
//   Image,
//   BarChart3,
//   CheckCircle,
//   AlertCircle,
//   Clock,
//   Download,
//   X,
//   File,
//   Loader2,
//   Globe,
//   Database
// } from "lucide-react";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import api from "@/lib/api";

// import { AnalysisResult, AnalysisStatus } from "@/lib/types";
// import { generateAndDownloadReport } from "@/lib/reportGenerator";

// /* =======================
//    CONFIG
// ======================= */
// const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
// const POLLING_INITIAL_DELAY = 2000;
// const POLLING_MAX_DELAY = 10000;
// const POLLING_BACKOFF = 1.5;
// const POLLING_MAX_RETRIES = 30;

// // Updated colors for Light/Clean Theme
// const SUPPORTED_TYPES = {
//   "application/pdf": { icon: FileText, label: "PDF", color: "bg-red-50 text-red-600 border-red-200" },
//   "application/msword": { icon: FileText, label: "DOC", color: "bg-blue-50 text-blue-600 border-blue-200" },
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
//     icon: FileText,
//     label: "DOCX",
//     color: "bg-blue-50 text-blue-600 border-blue-200",
//   },
//   "application/vnd.ms-excel": { icon: BarChart3, label: "XLS", color: "bg-green-50 text-green-600 border-green-200" },
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
//     icon: BarChart3,
//     label: "XLSX",
//     color: "bg-green-50 text-green-600 border-green-200",
//   },
//   "application/vnd.ms-powerpoint": { icon: Image, label: "PPT", color: "bg-orange-50 text-orange-600 border-orange-200" },
//   "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
//     icon: Image,
//     label: "PPTX",
//     color: "bg-orange-50 text-orange-600 border-orange-200",
//   },
//   "text/plain": { icon: FileText, label: "TXT", color: "bg-slate-100 text-slate-600 border-slate-200" },
//   "image/jpeg": { icon: Image, label: "JPEG", color: "bg-purple-50 text-purple-600 border-purple-200" },
//   "image/png": { icon: Image, label: "PNG", color: "bg-purple-50 text-purple-600 border-purple-200" },
// };

// interface UploadedFile {
//   file: File;
//   id: string;
//   status: "pending" | "uploading" | "analyzing" | "completed" | "error";
//   progress: number;
//   analysisId?: string;
//   result?: AnalysisResult;
//   error?: string;
// }

// interface Props {
//   userType: "admin" | "student";
//   userId: string;
//   onAnalysisComplete?: (r: AnalysisResult) => void;
// }

// export function FileUploadAnalysis({ userType, userId, onAnalysisComplete }: Props) {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [isDragOver, setIsDragOver] = useState(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const pollRefs = useRef<Map<string, boolean>>(new Map());

//   useEffect(() => {
//     return () => pollRefs.current.clear();
//   }, []);

//   const generateId = () => crypto.randomUUID();

//   const formatFileSize = (bytes: number) =>
//     bytes >= 1024 * 1024
//       ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
//       : `${(bytes / 1024).toFixed(1)} KB`;

//   const validateFile = (file: File): string | null => {
//     if (file.size > MAX_FILE_SIZE_BYTES) return "File exceeds 50MB limit";
//     if (!SUPPORTED_TYPES[file.type as keyof typeof SUPPORTED_TYPES]) return "Unsupported file type";
//     return null;
//   };

//   const handleFileSelect = (files: FileList | File[]) => {
//     const next: UploadedFile[] = [];
//     const errors: string[] = [];

//     Array.from(files).forEach((file) => {
//       const err = validateFile(file);
//       if (err) errors.push(`${file.name}: ${err}`);
//       else next.push({ file, id: generateId(), status: "pending", progress: 0 });
//     });

//     if (errors.length) alert(errors.join("\n"));
//     if (next.length) setUploadedFiles((p) => [...p, ...next]);
//   };

//   const removeFile = (id: string) => {
//     pollRefs.current.delete(id);
//     setUploadedFiles((p) => p.filter((f) => f.id !== id));
//   };

//   const pollWithBackoff = useCallback(
//     async (fileId: string, analysisId: string) => {
//       let delay = POLLING_INITIAL_DELAY;
//       let attempts = 0;
//       pollRefs.current.set(fileId, true);

//       while (pollRefs.current.get(fileId) && attempts < POLLING_MAX_RETRIES) {
//         const res = await api.get(`/analysis-status/${analysisId}`);
//         const status: AnalysisStatus = res.data;

//         if (status.status === "completed" && status.result) {
//           pollRefs.current.delete(fileId);
//           onAnalysisComplete?.(status.result);
//           setUploadedFiles((p) =>
//             p.map((f) =>
//               f.id === fileId ? { ...f, status: "completed", progress: 100, result: status.result } : f
//             )
//           );
//           return;
//         }

//         setUploadedFiles((p) =>
//           p.map((f) => (f.id === fileId ? { ...f, progress: status.progress_percentage || 0 } : f))
//         );

//         await new Promise((r) => setTimeout(r, delay));
//         delay = Math.min(delay * POLLING_BACKOFF, POLLING_MAX_DELAY);
//         attempts++;
//       }
//     },
//     [onAnalysisComplete]
//   );

//   const analyzeFile = async (f: UploadedFile) => {
//     try {
//       setUploadedFiles(p =>
//         p.map(x => (x.id === f.id ? { ...x, status: "uploading", progress: 10 } : x))
//       );

//       const formData = new FormData();
//       formData.append("file", f.file);

//       const uploadRes = await api.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (e: any) => {
//           const percent = Math.round((e.loaded * 100) / (e.total || 1));
//           setUploadedFiles(p =>
//             p.map(x => (x.id === f.id ? { ...x, progress: percent } : x))
//           );
//         },
//       });

//       const documentId = uploadRes.data.document_id;

//       setUploadedFiles(p =>
//         p.map(x =>
//           x.id === f.id
//             ? { ...x, analysisId: documentId, status: "analyzing", progress: 20 }
//             : x
//         )
//       );

//       await api.post(`/analyze/${documentId}`);

//       pollWithBackoff(f.id, documentId);
//     } catch (err: any) {
//       setUploadedFiles(p =>
//         p.map(x =>
//           x.id === f.id
//             ? { ...x, status: "error", error: err?.response?.data?.detail || err.message }
//             : x
//         )
//       );
//     }
//   };

//   return (
//     <div className="space-y-6 font-sans">
      
//       {/* --- UPLOAD ZONE (Clean & Modern) --- */}
//       <div
//         className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 ${
//           isDragOver 
//             ? 'border-indigo-500 bg-indigo-50' 
//             : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-white'
//         }`}
//         onDrop={e => {
//           e.preventDefault();
//           setIsDragOver(false);
//           handleFileSelect(e.dataTransfer.files);
//         }}
//         onDragOver={e => {
//           e.preventDefault();
//           setIsDragOver(true);
//         }}
//         onDragLeave={e => {
//           e.preventDefault();
//           setIsDragOver(false);
//         }}
//         onClick={() => fileInputRef.current?.click()}
//       >
//         <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center">
//            <Upload className={`h-8 w-8 ${isDragOver ? 'text-indigo-600' : 'text-slate-400'}`} />
//         </div>
        
//         <div>
//           <p className="text-slate-800 font-bold text-lg">Click to upload or drag & drop</p>
//           <p className="text-slate-500 text-sm mt-1">PDF, DOCX, XLSX, Images (Max 50MB)</p>
//         </div>
        
//         <input
//           type="file"
//           multiple
//           ref={fileInputRef}
//           onChange={e => {
//             if (e.target.files) handleFileSelect(e.target.files);
//             e.target.value = '';
//           }}
//           className="hidden"
//           accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
//         />
//       </div>

//       {/* --- FILE QUEUE LIST --- */}
//       {uploadedFiles.length > 0 && (
//         <div className="space-y-4">
          
//           <div className="flex justify-between items-center px-2">
//             <h3 className="text-slate-700 font-bold text-sm uppercase tracking-wide">
//               Queue ({uploadedFiles.length})
//             </h3>
//             {uploadedFiles.some(f => f.status === 'pending') && (
//               <Button
//                 onClick={async () => {
//                   setIsAnalyzing(true);
//                   for (const file of uploadedFiles.filter(f => f.status === 'pending')) {
//                     await analyzeFile(file);
//                     await new Promise(res => setTimeout(res, 300));
//                   }
//                   setIsAnalyzing(false);
//                 }}
//                 className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase px-4 py-2 h-auto"
//               >
//                 {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BarChart3 className="w-4 h-4 mr-2" />}
//                 {isAnalyzing ? 'Processing...' : 'Analyze All'}
//               </Button>
//             )}
//           </div>

//           <div className="grid gap-4">
//             {uploadedFiles.map(file => {
//               const type = SUPPORTED_TYPES[file.file.type as keyof typeof SUPPORTED_TYPES] || {
//                 icon: File, label: 'FILE', color: 'bg-slate-100 text-slate-600 border-slate-200'
//               };

//               return (
//                 <div key={file.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                  
//                   {/* File Header */}
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center gap-4">
//                       <div className={`p-3 rounded-lg ${type.color} bg-opacity-20 border`}>
//                         {React.createElement(type.icon, { className: 'h-6 w-6' })}
//                       </div>
//                       <div>
//                         <p className="text-slate-800 font-bold text-sm md:text-base line-clamp-1">{file.file.name}</p>
//                         <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
//                           <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{type.label}</span>
//                           <span>{formatFileSize(file.file.size)}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Status & Actions */}
//                     <div className="flex items-center gap-3">
//                       {file.status === 'pending' && <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pending</Badge>}
//                       {file.status === 'uploading' && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Uploading</Badge>}
//                       {file.status === 'analyzing' && <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Analyzing</Badge>}
//                       {file.status === 'completed' && <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Completed</Badge>}
//                       {file.status === 'error' && <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Error</Badge>}
                      
//                       <button onClick={() => removeFile(file.id)} className="text-slate-400 hover:text-red-500 transition-colors">
//                         <X size={18} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Progress Bar */}
//                   {(file.status === 'uploading' || file.status === 'analyzing') && (
//                     <div className="mb-2">
//                       <div className="flex justify-between text-xs mb-1.5">
//                         <span className="text-indigo-600 font-semibold uppercase">{file.status}...</span>
//                         <span className="text-slate-500">{file.progress}%</span>
//                       </div>
//                       <Progress value={file.progress} className="h-1.5 bg-slate-100" />
//                     </div>
//                   )}

//                   {/* Error Message */}
//                   {file.status === 'error' && file.error && (
//                     <Alert className="bg-red-50 border-red-100 mt-2 p-3">
//                       <div className="flex gap-2 items-center">
//                         <AlertCircle className="h-4 w-4 text-red-500" />
//                         <span className="text-red-600 text-xs font-medium">{file.error}</span>
//                       </div>
//                     </Alert>
//                   )}

//                   {/* --- ANALYSIS RESULTS (Modern Card) --- */}
//                   {file.status === 'completed' && file.result && (
//                     <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      
//                       {/* Score Grid */}
//                       <div className="grid grid-cols-3 gap-3 mb-4">
//                         <div className="p-3 bg-white rounded-lg border border-slate-100 text-center shadow-sm">
//                           <p className="text-xl font-bold text-red-500">{file.result.ai_detected_percentage}%</p>
//                           <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">AI Content</p>
//                         </div>
//                         <div className="p-3 bg-white rounded-lg border border-slate-100 text-center shadow-sm">
//                           <p className="text-xl font-bold text-amber-500">{file.result.web_source_percentage}%</p>
//                           <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Plagiarism</p>
//                         </div>
//                         <div className="p-3 bg-white rounded-lg border border-slate-100 text-center shadow-sm">
//                           <p className="text-xl font-bold text-emerald-500">{file.result.human_written_percentage}%</p>
//                           <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Original</p>
//                         </div>
//                       </div>
                      
//                       {/* Summary */}
//                       {file.result.analysis_summary && (
//                         <div className="bg-white p-3 rounded-lg border border-slate-100 mb-4">
//                           <p className="text-slate-600 text-xs italic leading-relaxed">
//                             "{file.result.analysis_summary}"
//                           </p>
//                         </div>
//                       )}

//                       {/* --- NEW SECTION: MATCHED SOURCES LIST --- */}
//                       {file.result.matched_sources && file.result.matched_sources.length > 0 && (
//                         <div className="bg-white p-4 rounded-lg border border-slate-100 mb-4 shadow-sm">
//                           <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
//                             <Globe size={14} className="text-blue-500" /> Matched Sources
//                           </h4>
//                           <ul className="space-y-2">
//                             {file.result.matched_sources.map((source, index) => (
//                               <li key={index} className="text-xs flex items-start gap-2.5 p-2 rounded-md hover:bg-slate-50 transition-colors">
//                                 <div className={`mt-0.5 min-w-[6px] h-1.5 rounded-full ${source.type === 'web' ? 'bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]' : 'bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.5)]'}`}></div>
//                                 <div className="flex-1 min-w-0">
//                                   {source.type === 'web' ? (
//                                     <a 
//                                       href={source.source} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer" 
//                                       className="text-blue-600 hover:text-blue-800 font-medium hover:underline block truncate"
//                                       title={source.source}
//                                     >
//                                       {source.source}
//                                     </a>
//                                   ) : (
//                                     <div className="text-slate-600 font-medium flex items-center gap-1.5">
//                                       <Database size={12} className="text-orange-500" />
//                                       Internal Database Match: <span className="text-slate-800">{source.source}</span>
//                                     </div>
//                                   )}
//                                 </div>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* Download Button */}
//                       <Button
//                         size="sm"
//                         onClick={() => generateAndDownloadReport(file.result!, userId, file.file.name)}
//                         className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold uppercase tracking-wide text-xs h-9"
//                       >
//                         <Download className="h-3.5 w-3.5 mr-2" />
//                         Download Report
//                       </Button>
//                     </div>
//                   )}

//                   {/* Individual Analyze Action */}
//                   {file.status === 'pending' && (
//                     <div className="mt-4 pt-4 border-t border-slate-100">
//                       <Button 
//                         size="sm" 
//                         onClick={() => analyzeFile(file)}
//                         variant="outline"
//                         className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold uppercase text-xs"
//                       >
//                         Start Analysis
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








































import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  FileText,
  Image,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  X,
  File,
  Loader2,
  Globe,
  Database,
  Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import api from "@/lib/api";

import { AnalysisResult, AnalysisStatus } from "@/lib/types";
import { generateAndDownloadReport } from "@/lib/reportGenerator";

/* =======================
   CONFIG
======================= */
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
const POLLING_INITIAL_DELAY = 2000;
const POLLING_MAX_DELAY = 10000;
const POLLING_BACKOFF = 1.5;
const POLLING_MAX_RETRIES = 30;

// Colors updated for high-contrast inside white cards
const SUPPORTED_TYPES = {
  "application/pdf": { icon: FileText, label: "PDF", color: "bg-red-50 text-red-600 border-red-100" },
  "application/msword": { icon: FileText, label: "DOC", color: "bg-blue-50 text-blue-600 border-blue-100" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    icon: FileText,
    label: "DOCX",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  "application/vnd.ms-excel": { icon: BarChart3, label: "XLS", color: "bg-green-50 text-green-600 border-green-100" },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    icon: BarChart3,
    label: "XLSX",
    color: "bg-green-50 text-green-600 border-green-100",
  },
  "application/vnd.ms-powerpoint": { icon: Image, label: "PPT", color: "bg-orange-50 text-orange-600 border-orange-100" },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    icon: Image,
    label: "PPTX",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
  "text/plain": { icon: FileText, label: "TXT", color: "bg-slate-100 text-slate-600 border-slate-200" },
  "image/jpeg": { icon: Image, label: "JPEG", color: "bg-purple-50 text-purple-600 border-purple-100" },
  "image/png": { icon: Image, label: "PNG", color: "bg-purple-50 text-purple-600 border-purple-100" },
};

interface UploadedFile {
  file: File;
  id: string;
  status: "pending" | "uploading" | "analyzing" | "completed" | "error";
  progress: number;
  analysisId?: string;
  result?: AnalysisResult;
  error?: string;
}

interface Props {
  userType: "admin" | "student";
  userId: string;
  onAnalysisComplete?: (r: AnalysisResult) => void;
}

export function FileUploadAnalysis({ userType, userId, onAnalysisComplete }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollRefs = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    return () => pollRefs.current.clear();
  }, []);

  const generateId = () => crypto.randomUUID();

  const formatFileSize = (bytes: number) =>
    bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${(bytes / 1024).toFixed(1)} KB`;

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE_BYTES) return "File exceeds 50MB limit";
    if (!SUPPORTED_TYPES[file.type as keyof typeof SUPPORTED_TYPES]) return "Unsupported file type";
    return null;
  };

  const handleFileSelect = (files: FileList | File[]) => {
    const next: UploadedFile[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const err = validateFile(file);
      if (err) errors.push(`${file.name}: ${err}`);
      else next.push({ file, id: generateId(), status: "pending", progress: 0 });
    });

    if (errors.length) alert(errors.join("\n"));
    if (next.length) setUploadedFiles((p) => [...p, ...next]);
  };

  const removeFile = (id: string) => {
    pollRefs.current.delete(id);
    setUploadedFiles((p) => p.filter((f) => f.id !== id));
  };

  const pollWithBackoff = useCallback(
    async (fileId: string, analysisId: string) => {
      let delay = POLLING_INITIAL_DELAY;
      let attempts = 0;
      pollRefs.current.set(fileId, true);

      while (pollRefs.current.get(fileId) && attempts < POLLING_MAX_RETRIES) {
        const res = await api.get(`/analysis-status/${analysisId}`);
        const status: AnalysisStatus = res.data;

        if (status.status === "completed" && status.result) {
          pollRefs.current.delete(fileId);
          onAnalysisComplete?.(status.result);
          setUploadedFiles((p) =>
            p.map((f) =>
              f.id === fileId ? { ...f, status: "completed", progress: 100, result: status.result } : f
            )
          );
          return;
        }

        setUploadedFiles((p) =>
          p.map((f) => (f.id === fileId ? { ...f, progress: status.progress_percentage || 0 } : f))
        );

        await new Promise((r) => setTimeout(r, delay));
        delay = Math.min(delay * POLLING_BACKOFF, POLLING_MAX_DELAY);
        attempts++;
      }
    },
    [onAnalysisComplete]
  );

  const analyzeFile = async (f: UploadedFile) => {
    try {
      setUploadedFiles(p =>
        p.map(x => (x.id === f.id ? { ...x, status: "uploading", progress: 10 } : x))
      );

      const formData = new FormData();
      formData.append("file", f.file);

      const uploadRes = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e: any) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setUploadedFiles(p =>
            p.map(x => (x.id === f.id ? { ...x, progress: percent } : x))
          );
        },
      });

      const documentId = uploadRes.data.document_id;

      setUploadedFiles(p =>
        p.map(x =>
          x.id === f.id
            ? { ...x, analysisId: documentId, status: "analyzing", progress: 20 }
            : x
        )
      );

      await api.post(`/analyze/${documentId}`);

      pollWithBackoff(f.id, documentId);
    } catch (err: any) {
      setUploadedFiles(p =>
        p.map(x =>
          x.id === f.id
            ? { ...x, status: "error", error: err?.response?.data?.detail || err.message }
            : x
        )
      );
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* --- UPLOAD ZONE (Glassmorphism) --- */}
      <div
        className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 group ${
          isDragOver 
            ? 'border-indigo-400 bg-white/20 scale-[1.02]' 
            : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40'
        }`}
        onDrop={e => {
          e.preventDefault();
          setIsDragOver(false);
          handleFileSelect(e.dataTransfer.files);
        }}
        onDragOver={e => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={e => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Animated Icon Container */}
        <div className={`w-20 h-10 text-black rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${
          isDragOver ? 'bg-indigo-500 text-white rotate-12' : 'bg-white/10 text-white group-hover:bg-black group-hover:text-white'
        }`}>
           <Upload className="h-10  w-10" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <p className="text-black font-bold text-xl tracking-tight">Click to upload or drag & drop</p>
          <p className="text-black text-sm font-medium">Supports PDF, DOCX, XLSX, Images (Max 50MB)</p>
        </div>
        
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={e => {
            if (e.target.files) handleFileSelect(e.target.files);
            e.target.value = '';
          }}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
        />
      </div>

      {/* --- FILE QUEUE LIST --- */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          
          <div className="flex justify-between items-center px-1">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Processing Queue ({uploadedFiles.length})
            </h3>
            {uploadedFiles.some(f => f.status === 'pending') && (
              <Button
                onClick={async () => {
                  setIsAnalyzing(true);
                  for (const file of uploadedFiles.filter(f => f.status === 'pending')) {
                    await analyzeFile(file);
                    await new Promise(res => setTimeout(res, 300));
                  }
                  setIsAnalyzing(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase px-5 py-2.5 h-auto shadow-lg shadow-indigo-500/30 rounded-xl transition-all hover:scale-105"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                {isAnalyzing ? 'Processing...' : 'Analyze All Files'}
              </Button>
            )}
          </div>

          <div className="grid gap-4">
            {uploadedFiles.map(file => {
              const type = SUPPORTED_TYPES[file.file.type as keyof typeof SUPPORTED_TYPES] || {
                icon: File, label: 'FILE', color: 'bg-slate-100 text-slate-600 border-slate-200'
              };

              return (
                // CARD STYLE: High Opacity White (matches dashboard cards)
                <div key={file.id} className="bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                  
                  {/* File Header */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${type.color} bg-opacity-30`}>
                        {React.createElement(type.icon, { className: 'h-6 w-6' })}
                      </div>
                      <div>
                        <p className="text-slate-800 font-extrabold text-base line-clamp-1 tracking-tight">{file.file.name}</p>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1 font-medium">
                          <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">{type.label}</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> {formatFileSize(file.file.size)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status & Actions */}
                    <div className="flex items-center gap-3">
                      {file.status === 'pending' && <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>}
                      {file.status === 'uploading' && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 animate-pulse">Uploading</Badge>}
                      {file.status === 'analyzing' && <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200 animate-pulse">Analyzing</Badge>}
                      {file.status === 'completed' && <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 flex gap-1 items-center"><CheckCircle size={10}/> Done</Badge>}
                      {file.status === 'error' && <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Failed</Badge>}
                      
                      <button onClick={() => removeFile(file.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-full">
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(file.status === 'uploading' || file.status === 'analyzing') && (
                    <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between text-xs mb-2 font-bold tracking-wide">
                        <span className="text-indigo-600 uppercase">{file.status}...</span>
                        <span className="text-slate-500">{file.progress}%</span>
                      </div>
                      <Progress value={file.progress} className="h-2 bg-slate-200" />
                    </div>
                  )}

                  {/* Error Message */}
                  {file.status === 'error' && file.error && (
                    <Alert className="bg-red-50 border-red-100 mt-2 p-3">
                      <div className="flex gap-2 items-center">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-red-600 text-xs font-bold">{file.error}</span>
                      </div>
                    </Alert>
                  )}

                  {/* --- ANALYSIS RESULTS --- */}
                  {file.status === 'completed' && file.result && (
                    <div className="mt-5 bg-slate-50 rounded-xl p-5 border border-slate-200/60 shadow-inner">
                      
                      {/* Score Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-5">
                        <div className="p-4 bg-white rounded-xl border border-slate-100 text-center shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-2xl font-black text-red-500">{file.result.ai_detected_percentage}%</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">AI Probability</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-slate-100 text-center shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-2xl font-black text-amber-500">{file.result.web_source_percentage}%</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Plagiarism</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-slate-100 text-center shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-2xl font-black text-emerald-500">{file.result.human_written_percentage}%</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Originality</p>
                        </div>
                      </div>
                      
                      {/* Summary */}
                      {file.result.analysis_summary && (
                        <div className="bg-white p-4 rounded-xl border border-slate-100 mb-5 shadow-sm">
                          <p className="text-slate-600 text-sm italic leading-relaxed font-medium">
                            "{file.result.analysis_summary}"
                          </p>
                        </div>
                      )}

                      {/* --- MATCHED SOURCES LIST --- */}
                      {file.result.matched_sources && file.result.matched_sources.length > 0 && (
                        <div className="bg-white p-4 rounded-xl border border-slate-100 mb-5 shadow-sm">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Globe size={14} className="text-blue-500" /> Matched Sources found
                          </h4>
                          <ul className="space-y-2">
                            {file.result.matched_sources.map((source, index) => (
                              <li key={index} className="text-xs flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${source.type === 'web' ? 'bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]' : 'bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]'}`}></div>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                  {source.type === 'web' ? (
                                    <a 
                                      href={source.source} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-blue-600 hover:text-blue-800 font-bold hover:underline block truncate"
                                      title={source.source}
                                    >
                                      {source.source}
                                    </a>
                                  ) : (
                                    <div className="text-slate-600 font-medium flex items-center gap-1.5">
                                      <Database size={12} className="text-orange-500" />
                                      Internal Match: <span className="text-slate-800 font-bold">{source.source}</span>
                                    </div>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Download Button */}
                      <Button
                        size="sm"
                        onClick={() => generateAndDownloadReport(file.result!, userId, file.file.name)}
                        className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold uppercase tracking-wide text-xs h-10 rounded-lg shadow-md transition-all"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Full Report
                      </Button>
                    </div>
                  )}

                  {/* Individual Analyze Action */}
                  {file.status === 'pending' && (
                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <Button 
                        size="sm" 
                        onClick={() => analyzeFile(file)}
                        variant="outline"
                        className="w-full border-2 border-indigo-100 text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 font-bold uppercase text-xs h-10 rounded-lg"
                      >
                        Start Analysis
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}