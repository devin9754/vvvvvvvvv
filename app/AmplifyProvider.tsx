// app/AmplifyProvider.tsx
"use client";

import { Amplify } from "aws-amplify";
import awsConfig from "./aws-exports"; // Adjust path if needed

// Configure Amplify once at the top-level client provider
Amplify.configure(awsConfig);

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
