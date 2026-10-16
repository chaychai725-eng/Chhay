export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export type ActiveTab = 'preview' | 'code' | 'files';

export type CodeSubTab = 'html' | 'css' | 'js';

export interface ProjectFile {
  name: string;
  type: 'html' | 'css' | 'js' | 'json' | 'md';
  content: string;
  path: string;
}

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  category: 'business' | 'portfolio' | 'ecommerce' | 'blog' | 'landing' | 'dashboard' | 'custom';
  html: string;
  css: string;
  js: string;
  createdAt: number;
  updatedAt: number;
  version: number;
  deployedUrl?: string;
  isFavorite?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: number;
  type?: 'chat' | 'build';
  isConversational?: boolean;
  friendlyReply?: string;
  summaryKhmer?: string;
  khmerHighlights?: string[];
  summaryBullets?: string[];
  suggestedActions?: Array<{
    label: string;
    action: 'preview' | 'code' | 'refine' | 'template';
    param?: string;
  }>;
  relatedProjectId?: string;
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
  project: Project;
  category: string;
}

export interface TemplateDefinition {
  id: string;
  category: 'business' | 'portfolio' | 'ecommerce' | 'blog' | 'landing' | 'dashboard';
  title: string;
  description: string;
  badge: string;
  defaultPrompt: string;
  defaultPromptKhmer: string;
  previewImage?: string;
  project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'version'>;
}

export interface ApiStatus {
  configured: boolean;
  model: string;
  supportedModels: Array<{ id: string; name: string; description: string }>;
}

export type UserStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
export type UserRole = 'admin' | 'user';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  status: UserStatus;
  role: UserRole;
  registeredAt: number;
  approvedAt?: number;
  notes?: string;
}
