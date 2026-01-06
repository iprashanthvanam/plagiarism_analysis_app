


export type MatchedSource = {
  type: "web" | "local_db";
  source: string;
};



export interface AnalysisStatus {
  status: "pending" | "analyzing" | "completed" | "failed";
  progress_percentage?: number;
  result?: AnalysisResult;
  error?: string;
}






export interface AnalysisResult {
  document_id: number;
  file_name: string;
  ai_detected_percentage: number;
  web_source_percentage: number;
  human_written_percentage: number;
  analysis_summary?: string;
  analysis_date: string;
  matched_sources?: MatchedSource[];
}






export interface AuthUser {
  userId: string;
  role: "admin" | "student";
}


