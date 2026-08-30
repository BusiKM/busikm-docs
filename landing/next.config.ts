import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next generuje AGENTS.md/CLAUDE.md w katalogu projektu — repo ma własne
  agentRules: false,
  // Wskaźnik dev Next.js zasłania lewy dolny róg makiet
  devIndicators: false,
};

export default nextConfig;
