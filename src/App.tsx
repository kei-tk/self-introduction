import React from 'react';
import { SiteShell } from './conponent/SiteShell';

// イントロ・ヘッダー・各ページの切替はすべて SiteShell に集約(状態は jotai)
function App() {
  return <SiteShell />;
}

export default App;
