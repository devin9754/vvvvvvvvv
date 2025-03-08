"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsConfig from "./aws-exports";

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Configure Amplify on the client after mount
    Amplify.configure(awsConfig);
  }, []);

  return <>{children}</>;
}
