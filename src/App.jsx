import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  User, 
  FileText, 
  Printer, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Smartphone,
  AppWindow,
  RotateCcw
} from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    platform: 'Instagram',
    email: '',
    date: new Date().toISOString().split('T')[0],
    scores: {
      password: 'Medium',
      twoFactor: 'Enabled',
      biometrics: 'Setup',
      encryption: 'Active',
      updates: 'Pending',
      recovery: 'Verified'
    },
    findings: [
      { id: 1, issue: 'Weak Passwords', risk: 'Medium', fix: 'Set a 12+ character unique password.' },
      { id: 2, issue: 'Unused Third-Party Apps', risk: 'High', fix: 'Remove access for apps not used in 6 months.' }
    ],
    tasks: [
      { id: 1, text: 'Enabled App-Based 2FA', completed: true },
      { id: 2, text: 'Cleaned Login Activity', completed: true },
      { id: 3, text: 'Secured Recovery Email', completed: false }
    ]
  });

  const handleScoreChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      scores: { ...prev.scores, [key]: value }
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const updateFinding = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      findings: prev.findings.map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };

  const addFinding = () => {
    const newId = formData.findings.length > 0 ? Math.max(...formData.findings.map(f => f.id)) + 1 : 1;
    setFormData(prev => ({
      ...prev,
      findings: [...prev.findings, { id: newId, issue: '', risk: 'Low', fix: '' }]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      {/* Header - Hidden on Print */}
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <img src="/yukti-logo.png" className="w-16 h-16 object-contain bg-white rounded-xl shadow-sm border border-slate-100 p-2" alt="Yukti Logo" />
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 tracking-tight">Yukti Security Dashboard</h1>
            <p className="text-sm text-slate-500 font-medium">Influencer Security Audit & Compliance Report Generator</p>
          </div>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg"
        >
          <Printer className="w-5 h-5" /> Generate Report (PDF)
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Section - Hidden on Print */}
        <section className="space-y-6 print:hidden">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" /> Basic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Grahakache Naav (Client)</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md outline-indigo-500"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  placeholder="Ex: Sameer Patil"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
                <select 
                  className="w-full p-2 border rounded-md outline-indigo-500"
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                >
                  <option>Instagram</option>
                  <option>YouTube</option>
                  <option>Facebook</option>
                  <option>WhatsApp / Telegram</option>
                  <option>Email (Gmail/Outlook)</option>
                  <option>Android Device</option>
                  <option>iPhone (iOS)</option>
                  <option>Windows Laptop</option>
                  <option>MacBook (macOS)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-600" /> Security Scores
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Passcode/Pin</label>
                <select className="w-full p-2 border rounded-md" value={formData.scores.password} onChange={(e) => handleScoreChange('password', e.target.value)}>
                  <option>Strong / Alpha</option>
                  <option>Medium / Numeric</option>
                  <option>Weak / Simple</option>
                  <option>None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">2FA / Biometrics</label>
                <select className="w-full p-2 border rounded-md" value={formData.scores.twoFactor} onChange={(e) => handleScoreChange('twoFactor', e.target.value)}>
                  <option>Enabled / Bio</option>
                  <option>Hardware Key</option>
                  <option>SMS Only</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data Encryption</label>
                <select className="w-full p-2 border rounded-md" value={formData.scores.encryption} onChange={(e) => handleScoreChange('encryption', e.target.value)}>
                  <option>Active / Full</option>
                  <option>Partial</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">System Updates</label>
                <select className="w-full p-2 border rounded-md" value={formData.scores.updates} onChange={(e) => handleScoreChange('updates', e.target.value)}>
                  <option>Up to date</option>
                  <option>Pending</option>
                  <option>Outdated</option>
                  <option>Auto disabled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Find My / Recovery</label>
                <select className="w-full p-2 border rounded-md" value={formData.scores.recovery} onChange={(e) => handleScoreChange('recovery', e.target.value)}>
                  <option>Verified</option>
                  <option>Unverified</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-indigo-600" /> Findings & Fixes
              </h2>
              <button onClick={addFinding} className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center gap-1">
                <PlusCircle className="w-4 h-4" /> Add New
              </button>
            </div>
            {formData.findings.map((f) => (
              <div key={f.id} className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <input 
                  className="w-full font-bold bg-transparent border-b border-slate-300 mb-2 p-1" 
                  value={f.issue} 
                  onChange={(e) => updateFinding(f.id, 'issue', e.target.value)}
                  placeholder="Problem (e.g. Weak Password)"
                />
                <textarea 
                  className="w-full text-sm bg-transparent border-b border-slate-300 p-1" 
                  value={f.fix} 
                  onChange={(e) => updateFinding(f.id, 'fix', e.target.value)}
                  placeholder="Solution / Fix"
                />
                <select 
                  className="text-xs mt-2 border rounded p-1"
                  value={f.risk}
                  onChange={(e) => updateFinding(f.id, 'risk', e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        {/* Report Preview - Visible on Screen & Print */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 print:shadow-none print:border-none">
          <div className="bg-indigo-900 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Security Audit Report</h2>
                <p className="opacity-80">Yukti Software Solutions</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <img src="/yukti-logo.png" className="w-20 h-20 object-contain bg-white p-2 rounded-2xl shadow-inner" alt="Yukti Logo" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Certified Audit</span>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="opacity-60 uppercase text-[10px] font-bold tracking-widest">Client Name</p>
                <p className="text-lg font-semibold">{formData.clientName || '---'}</p>
              </div>
              <div>
                <p className="opacity-60 uppercase text-[10px] font-bold tracking-widest">Audit Date</p>
                <p className="text-lg font-semibold">{formData.date}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Score Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <ScoreCard icon={<Lock className="w-4 h-4"/>} title="Passcode" val={formData.scores.password} />
              <ScoreCard icon={<Smartphone className="w-4 h-4"/>} title="2FA/Bio" val={formData.scores.twoFactor} />
              <ScoreCard icon={<ShieldCheck className="w-4 h-4"/>} title="Encryption" val={formData.scores.encryption} />
              <ScoreCard icon={<RotateCcw className="w-4 h-4"/>} title="Updates" val={formData.scores.updates} />
              <ScoreCard icon={<AppWindow className="w-4 h-4"/>} title="Recovery" val={formData.scores.recovery} />
            </div>

            {/* Findings Section */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Major Findings & Solutions</h3>
              <div className="space-y-4">
                {formData.findings.map((f) => (
                  <div key={f.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className={`mt-1 p-2 rounded-lg ${f.risk === 'High' ? 'bg-red-100 text-red-600' : f.risk === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{f.issue || 'Unnamed Issue'}</h4>
                      <p className="text-sm text-slate-600 mt-1">{f.fix || 'No solution provided yet.'}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-white border border-slate-200">
                        Risk: {f.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Completed */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Work Done (Audit Tasks)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.tasks.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className={`w-4 h-4 ${t.completed ? 'text-green-500' : 'text-slate-300'}`} />
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-slate-100 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Report Generated By</p>
                <p className="font-bold text-indigo-700">Yukti Software Solutions</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Signature</p>
                <div className="h-8 w-32 border-b border-slate-300 mb-1"></div>
                <p className="text-[10px] text-slate-400 italic">Security Expert</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CSS for Print Optimization */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white; p: 0; }
          .min-h-screen { padding: 0 !important; }
          main { grid-template-cols: 1fr !important; }
          @page { margin: 1cm; }
        }
      `}} />
    </div>
  );
};

const ScoreCard = ({ icon, title, val }) => {
  const getStatusColor = (v) => {
    const low = v.toLowerCase();
    if (low.includes('strong') || low.includes('enabled') || low.includes('verified')) return 'text-green-600';
    if (low.includes('weak') || low.includes('disabled') || low.includes('high')) return 'text-red-600';
    return 'text-amber-600';
  };

  return (
    <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-center">
      <div className="flex justify-center text-slate-400 mb-1">{icon}</div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{title}</p>
      <p className={`text-xs font-bold truncate ${getStatusColor(val)}`}>{val}</p>
    </div>
  );
};

export default App;
