import React from "react";
import { Card } from "@/components/ui/card";

interface AuthLayoutProrps {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProrps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent" />
      <Card className="relative grid w-full max-w-5xl overflow-hidden border-zinc-800 bg-zinc-900 shadow-2xl md:grid-cols-2">
        <div className="flex flex-col justify-center bg-zinc-900 p-8 md:p-12 lg:p-16">
          <div className="mx-auto w-full max-w-350px">
            {children}
          </div>
        </div>
        <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-black p-12 md:flex">
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"/>
          <div className="absolute h-80 w-80 rounded-full bg-green-500/20 blur-[120px]"/>
          
          <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-500/50 bg-green-500/10 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
               <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-white">
                DEEMEOW<span className="text-green-400 italic">.AI</span>
              </h1>
              <p className="text-sm font-medium uppercase tracking-widest text-green-500/80">
                Neural Voice App
              </p>
            </div>
            <p className="max-w-240px text-sm leading-relaxed text-zinc-500">
              Engage with autonomous agents through our low-latency <span className="text-zinc-200"> voice synthesis </span> engine.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
