// app/page.js
'use client'; // Required for Spline in Next.js

import Spline from '@splinetool/react-spline/next';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="portfolio-container">
      {/* 3D Scene Layer */}
      <div className="canvas-wrapper">
        <Suspense fallback={<div className="loading">Initializing R4X_BOT...</div>}>
          <Spline
            scene="https://prod.spline.design/P1UAd1Rk8mDU9YsP/scene.splinecode" 
          />
        </Suspense>
      </div>

      {/* UI Overlay Layer */}
      <header className="hero">
        <h1>R4X_BOT System</h1>
        <p>Interactive 3D Portfolio Experience</p>
        <button className="cta-btn">View Intelligence</button>
      </header>

      <section id="work" className="content">
        <h2>Neural Projects</h2>
        <div className="grid">
          <div className="card"><h3>Sub-Routine A</h3><p>Next.js Integration</p></div>
          <div className="card"><h3>Sub-Routine B</h3><p>3D Interaction</p></div>
        </div>
      </section>
    </main>
  );
}
