














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
//   Info,
// } from "lucide-react";

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
//    CONFIG
// ======================= */
// const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
// const POLLING_INITIAL_DELAY = 2000;
// const POLLING_MAX_DELAY = 10000;
// const POLLING_BACKOFF = 1.5;
// const POLLING_MAX_RETRIES = 30;

// const SUPPORTED_TYPES = {
//   "application/pdf": { icon: FileText, label: "PDF", color: "bg-red-900/50 text-red-200 border-red-700" },
//   "application/msword": { icon: FileText, label: "DOC", color: "bg-blue-900/50 text-blue-200 border-blue-700" },
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
//     icon: FileText,
//     label: "DOCX",
//     color: "bg-blue-900/50 text-blue-200 border-blue-700",
//   },
//   "application/vnd.ms-excel": { icon: BarChart3, label: "XLS", color: "bg-green-900/50 text-green-200 border-green-700" },
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
//     icon: BarChart3,
//     label: "XLSX",
//     color: "bg-green-900/50 text-green-200 border-green-700",
//   },
//   "application/vnd.ms-powerpoint": { icon: Image, label: "PPT", color: "bg-orange-900/50 text-orange-200 border-orange-700" },
//   "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
//     icon: Image,
//     label: "PPTX",
//     color: "bg-orange-900/50 text-orange-200 border-orange-700",
//   },
//   "text/plain": { icon: FileText, label: "TXT", color: "bg-gray-700 text-gray-200 border-gray-600" },
//   "image/jpeg": { icon: Image, label: "JPEG", color: "bg-purple-900/50 text-purple-200 border-purple-700" },
//   "image/png": { icon: Image, label: "PNG", color: "bg-purple-900/50 text-purple-200 border-purple-700" },
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
      
//       {/* --- UPLOAD CARD --- */}
//       <Card className="bg-black border-2 border-blue-600 shadow-xl">
//         <CardHeader className="border-b border-gray-800 pb-4">
//           <CardTitle className="text-white flex items-center gap-3 text-xl uppercase tracking-wider">
//             <Upload className="h-6 w-6 text-blue-500" />
//             Upload Files for Analysis
//           </CardTitle>
//           <p className="text-gray-400 text-sm mt-1">Supported: PDF, DOCX, XLSX, PPT, TXT, Images (Max 50MB)</p>
//         </CardHeader>
//         <CardContent className="pt-6">
//           <div
//             className={`border-2 border-dashed p-10 rounded-lg text-center transition-all duration-300 ${
//               isDragOver 
//                 ? 'border-blue-400 bg-blue-900/20' 
//                 : 'border-gray-700 hover:border-blue-500 hover:bg-gray-900/50'
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
//             <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600">
//                <Upload className="h-8 w-8 text-blue-400" />
//             </div>
//             <p className="text-white text-lg font-bold mb-2">Drag files here or click below</p>
//             <p className="text-gray-500 text-sm mb-6">Secure analysis powered by TKREC AI</p>
            
//             <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-2 text-md uppercase font-bold tracking-wide">
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

//       {/* --- FILE LIST --- */}
//       {uploadedFiles.length > 0 && (
//         <Card className="bg-black border-2 border-blue-600 shadow-xl">
//           <CardHeader className="border-b border-gray-800 pb-4">
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-white text-lg uppercase tracking-wide">
//                 Queue ({uploadedFiles.length})
//               </CardTitle>
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
//                   className="bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider"
//                 >
//                   <BarChart3 className="h-4 w-4 mr-2" />
//                   {isAnalyzing ? 'Processing...' : 'Analyze All'}
//                 </Button>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4 pt-6">
//             {uploadedFiles.map(file => {
//               const type = SUPPORTED_TYPES[file.file.type as keyof typeof SUPPORTED_TYPES] || {
//                 icon: FileText, label: 'FILE', color: 'bg-gray-700 text-gray-200 border-gray-600'
//               };

//               return (
//                 <div key={file.id} className="p-4 border border-gray-700 rounded-lg bg-gray-900/50 hover:border-blue-500 transition-colors">
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center gap-4">
//                       <div className="p-2 bg-black rounded border border-gray-700">
//                         {React.createElement(type.icon, { className: 'h-6 w-6 text-blue-400' })}
//                       </div>
//                       <div>
//                         <p className="text-white font-bold text-lg">{file.file.name}</p>
//                         <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
//                           <Badge className={`border ${type.color} font-mono`}>{type.label}</Badge>
//                           <span>{formatFileSize(file.file.size)}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Status Icons */}
//                     <div className="flex items-center gap-3">
//                       {file.status === 'pending' ? <Clock className="text-yellow-500 h-5 w-5" />
//                         : file.status === 'uploading' ? <Upload className="text-blue-500 h-5 w-5 animate-bounce" />
//                         : file.status === 'analyzing' ? <BarChart3 className="text-purple-500 h-5 w-5 animate-pulse" />
//                         : file.status === 'completed' ? <CheckCircle className="text-green-500 h-6 w-6" />
//                         : <AlertCircle className="text-red-500 h-5 w-5" />}
                      
//                       <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)}
//                         className="text-gray-500 hover:text-red-400 hover:bg-red-900/20">
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>

//                   {/* Progress Bar */}
//                   {(file.status === 'uploading' || file.status === 'analyzing') && (
//                     <div className="mb-2">
//                       <Progress value={file.progress} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
//                       <div className="flex justify-between text-xs mt-1">
//                         <span className="text-blue-400 uppercase font-bold">{file.status}...</span>
//                         <span className="text-white">{file.progress}%</span>
//                       </div>
//                     </div>
//                   )}

//                   {/* Error State */}
//                   {file.status === 'error' && file.error && (
//                     <Alert className="bg-red-900/20 border-red-500 mt-2">
//                       <AlertCircle className="h-4 w-4 text-red-500" />
//                       <AlertDescription className="text-red-200">{file.error}</AlertDescription>
//                     </Alert>
//                   )}

//                   {/* Result State */}
//                   {file.status === 'completed' && file.result && (
//                     <div className="mt-4 bg-black/40 p-4 rounded border border-gray-700">
//                       <div className="grid grid-cols-3 gap-4 text-center mb-4">
//                         <div className="p-3 rounded bg-gray-800 border border-gray-700">
//                           <p className="text-2xl font-bold text-red-500">{file.result.ai_detected_percentage}%</p>
//                           <p className="text-xs text-gray-400 uppercase tracking-wide">AI Content</p>
//                         </div>
//                         <div className="p-3 rounded bg-gray-800 border border-gray-700">
//                           <p className="text-2xl font-bold text-orange-500">{file.result.web_source_percentage}%</p>
//                           <p className="text-xs text-gray-400 uppercase tracking-wide">Web Match</p>
//                         </div>
//                         <div className="p-3 rounded bg-gray-800 border border-gray-700">
//                           <p className="text-2xl font-bold text-green-500">{file.result.human_written_percentage}%</p>
//                           <p className="text-xs text-gray-400 uppercase tracking-wide">Original</p>
//                         </div>
//                       </div>
                      
//                       {file.result.analysis_summary && (
//                         <p className="text-gray-300 text-sm mb-3 italic">"{file.result.analysis_summary}"</p>
//                       )}

//                       {file.result?.matched_sources && file.result.matched_sources.length > 0 && (
//                         <div className="text-xs text-gray-400 mb-4 bg-gray-800 p-2 rounded">
//                           <p className="font-bold text-gray-300 mb-1">TOP SOURCES FOUND:</p>
//                           <ul className="list-disc ml-4 space-y-1">
//                             {file.result.matched_sources.slice(0, 3).map((src, i) => (
//                               <li key={i} className="truncate">
//                                 {src.type === "web" ? (
//                                   <a href={src.source} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//                                     {src.source}
//                                   </a>
//                                 ) : (
//                                   <span className="text-gray-300">Internal Database Match ({src.source})</span>
//                                 )}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       <Button
//                         size="sm"
//                         onClick={() => generateAndDownloadReport(file.result!, userId, file.file.name)}
//                         className="w-full bg-green-700 hover:bg-green-600 text-white font-bold uppercase tracking-wide"
//                       >
//                         <Download className="h-4 w-4 mr-2" />
//                         Download Full Report
//                       </Button>
//                     </div>
//                   )}

//                   {/* Analyze Action (Individual) */}
//                   {file.status === 'pending' && (
//                     <div className="mt-3">
//                       <Button size="sm" onClick={() => analyzeFile(file)}
//                         className="bg-blue-700 hover:bg-blue-600 text-white uppercase font-bold text-xs tracking-wide w-full">
//                         <BarChart3 className="h-4 w-4 mr-2" />
//                         Analyze This File
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
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

const SUPPORTED_TYPES = {
  "application/pdf": { icon: FileText, label: "PDF", color: "bg-red-900/50 text-red-200 border-red-700" },
  "application/msword": { icon: FileText, label: "DOC", color: "bg-blue-900/50 text-blue-200 border-blue-700" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    icon: FileText,
    label: "DOCX",
    color: "bg-blue-900/50 text-blue-200 border-blue-700",
  },
  "application/vnd.ms-excel": { icon: BarChart3, label: "XLS", color: "bg-green-900/50 text-green-200 border-green-700" },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    icon: BarChart3,
    label: "XLSX",
    color: "bg-green-900/50 text-green-200 border-green-700",
  },
  "application/vnd.ms-powerpoint": { icon: Image, label: "PPT", color: "bg-orange-900/50 text-orange-200 border-orange-700" },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    icon: Image,
    label: "PPTX",
    color: "bg-orange-900/50 text-orange-200 border-orange-700",
  },
  "text/plain": { icon: FileText, label: "TXT", color: "bg-gray-700 text-gray-200 border-gray-600" },
  "image/jpeg": { icon: Image, label: "JPEG", color: "bg-purple-900/50 text-purple-200 border-purple-700" },
  "image/png": { icon: Image, label: "PNG", color: "bg-purple-900/50 text-purple-200 border-purple-700" },
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
    <div className="space-y-6 font-sans">
      
      {/* --- UPLOAD CARD --- */}
      <Card className="bg-black border-2 border-blue-600 shadow-xl">
        <CardHeader className="border-b border-gray-800 pb-4">
          <CardTitle className="text-white flex items-center gap-3 text-xl uppercase tracking-wider">
            <Upload className="h-6 w-6 text-blue-500" />
            Upload Files for Analysis
          </CardTitle>
          <p className="text-gray-400 text-sm mt-1">Supported: PDF, DOCX, XLSX, PPT, TXT, Images (Max 50MB)</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div
            className={`border-2 border-dashed p-10 rounded-lg text-center transition-all duration-300 ${
              isDragOver 
                ? 'border-blue-400 bg-blue-900/20' 
                : 'border-gray-700 hover:border-blue-500 hover:bg-gray-900/50'
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
          >
            {/* <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600">
               <Upload className="h-8 w-8 text-blue-400" />
            </div> */}
            <p className="text-white text-lg font-bold mb-2">Drag files here or click below</p>
            <p className="text-gray-500 text-sm mb-6">Secure analysis powered by TKREC AI</p>
            
            <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-2 text-md uppercase font-bold tracking-wide">
              Select Files
            </Button>
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
        </CardContent>
      </Card>

      {/* --- FILE LIST --- */}
      {uploadedFiles.length > 0 && (
        <Card className="bg-black border-2 border-blue-600 shadow-xl">
          <CardHeader className="border-b border-gray-800 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-lg uppercase tracking-wide">
                Queue ({uploadedFiles.length})
              </CardTitle>
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
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {isAnalyzing ? 'Processing...' : 'Analyze All'}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {uploadedFiles.map(file => {
              const type = SUPPORTED_TYPES[file.file.type as keyof typeof SUPPORTED_TYPES] || {
                icon: FileText, label: 'FILE', color: 'bg-gray-700 text-gray-200 border-gray-600'
              };

              return (
                <div key={file.id} className="p-4 border border-gray-700 rounded-lg bg-gray-900/50 hover:border-blue-500 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-black rounded border border-gray-700">
                        {React.createElement(type.icon, { className: 'h-6 w-6 text-blue-400' })}
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{file.file.name}</p>
                        <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                          <Badge className={`border ${type.color} font-mono`}>{type.label}</Badge>
                          <span>{formatFileSize(file.file.size)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Icons */}
                    <div className="flex items-center gap-3">
                      {file.status === 'pending' ? <Clock className="text-yellow-500 h-5 w-5" />
                        : file.status === 'uploading' ? <Upload className="text-blue-500 h-5 w-5 animate-bounce" />
                        : file.status === 'analyzing' ? <BarChart3 className="text-purple-500 h-5 w-5 animate-pulse" />
                        : file.status === 'completed' ? <CheckCircle className="text-green-500 h-6 w-6" />
                        : <AlertCircle className="text-red-500 h-5 w-5" />}
                      
                      <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)}
                        className="text-gray-500 hover:text-red-400 hover:bg-red-900/20">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar - FIXED: Using standard className only */}
                  {(file.status === 'uploading' || file.status === 'analyzing') && (
                    <div className="mb-2">
                      <Progress 
                        value={file.progress} 
                        className="h-2 bg-gray-700 [&>*]:bg-blue-500" 
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-blue-400 uppercase font-bold">{file.status}...</span>
                        <span className="text-white">{file.progress}%</span>
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {file.status === 'error' && file.error && (
                    <Alert className="bg-red-900/20 border-red-500 mt-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-200">{file.error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Result State */}
                  {file.status === 'completed' && file.result && (
                    <div className="mt-4 bg-black/40 p-4 rounded border border-gray-700">
                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div className="p-3 rounded bg-gray-800 border border-gray-700">
                          <p className="text-2xl font-bold text-red-500">{file.result.ai_detected_percentage}%</p>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">AI Content</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800 border border-gray-700">
                          <p className="text-2xl font-bold text-orange-500">{file.result.web_source_percentage}%</p>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Web Match</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800 border border-gray-700">
                          <p className="text-2xl font-bold text-green-500">{file.result.human_written_percentage}%</p>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Original</p>
                        </div>
                      </div>
                      
                      {file.result.analysis_summary && (
                        <p className="text-gray-300 text-sm mb-3 italic">"{file.result.analysis_summary}"</p>
                      )}

                      {file.result?.matched_sources && file.result.matched_sources.length > 0 && (
                        <div className="text-xs text-gray-400 mb-4 bg-gray-800 p-2 rounded">
                          <p className="font-bold text-gray-300 mb-1">TOP SOURCES FOUND:</p>
                          <ul className="list-disc ml-4 space-y-1">
                            {file.result.matched_sources.slice(0, 3).map((src, i) => (
                              <li key={i} className="truncate">
                                {src.type === "web" ? (
                                  <a href={src.source} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    {src.source}
                                  </a>
                                ) : (
                                  <span className="text-gray-300">Internal Database Match ({src.source})</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button
                        size="sm"
                        onClick={() => generateAndDownloadReport(file.result!, userId, file.file.name)}
                        className="w-full bg-green-700 hover:bg-green-600 text-white font-bold uppercase tracking-wide"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Full Report
                      </Button>
                    </div>
                  )}

                  {/* Analyze Action (Individual) */}
                  {file.status === 'pending' && (
                    <div className="mt-3">
                      <Button size="sm" onClick={() => analyzeFile(file)}
                        className="bg-blue-700 hover:bg-blue-600 text-white uppercase font-bold text-xs tracking-wide w-full">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analyze This File
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}