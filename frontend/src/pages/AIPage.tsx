import { MainLayout } from '../layouts/MainLayout';
import { AI_INSIGHT } from '../data/mockData';
import { RiskBadge } from '../components/ui/Badge';
import { clsx, riskColor } from '../utils/helpers';
import { Brain, Shield, Lightbulb, BarChart2 } from 'lucide-react';

export function AIPage() {
  const insight = AI_INSIGHT;

  const riskLevelBg: Record<string, string> = {
    LOW: 'bg-green-900/30 border-green-700/40',
    MODERATE: 'bg-yellow-900/30 border-yellow-700/40',
    HIGH: 'bg-orange-900/30 border-orange-700/40',
    CRITICAL: 'bg-red-900/30 border-red-700/40',
  };

  return (
    <MainLayout title="AI Insights" subtitle="Flood Risk Indicator Engine — Decision Support Analysis">
      <div className="space-y-5">

        {/* Disclaimer */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-950/40 border border-violet-800/40">
          <Shield className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <p className="text-xs text-violet-300">
            <strong>AI Risk Indicator:</strong> This analysis uses a transparent rule-based scoring algorithm — not a trained ML model — for demonstration purposes.
            Risk scores are indicative and should not be treated as guaranteed predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Risk Score Panel */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Brain className="w-5 h-5 text-violet-400" />
              <h2 className="text-base font-bold text-white">AI Flood Risk Score</h2>
            </div>

            {/* Score gauge */}
            <div className="relative flex items-center justify-center mb-6">
              <svg width="160" height="100" viewBox="0 0 160 100">
                {/* Background arc */}
                <path d="M 15 95 A 65 65 0 0 1 145 95" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
                {/* Colored arc */}
                <path
                  d="M 15 95 A 65 65 0 0 1 145 95"
                  fill="none"
                  stroke="url(#riskGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${insight.risk_score * 2.04} 204`}
                />
                <defs>
                  <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="40%" stopColor="#eab308" />
                    <stop offset="70%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <text x="80" y="80" textAnchor="middle" fill="#f97316" fontSize="28" fontWeight="bold" fontFamily="monospace">
                  {insight.risk_score}
                </text>
                <text x="80" y="95" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="sans-serif">
                  / 100
                </text>
              </svg>
            </div>

            <div className="text-center mb-5">
              <RiskBadge level={insight.risk_level} size="md" />
            </div>

            {/* Data Confidence */}
            <div className="px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Data Confidence Indicator</span>
                <span className="text-xs font-bold text-sky-400">{insight.data_confidence}%</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: `${insight.data_confidence}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-600 mt-2">
                Based on availability, recency and consistency of data sources.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 className="w-5 h-5 text-orange-400" />
              <h2 className="text-base font-bold text-white">Key Risk Factors</h2>
            </div>
            <div className="space-y-4">
              {insight.key_factors.map(f => (
                <div key={f.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300 font-medium">{f.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={clsx('text-xs font-bold', riskColor(f.level))}>{f.level}</span>
                      <RiskBadge level={f.level} />
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${f.weight * 3.5}%`,
                        background: f.level === 'CRITICAL' ? '#ef4444' : f.level === 'HIGH' ? '#f97316' : f.level === 'MODERATE' ? '#eab308' : '#22c55e',
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500">{f.value}</div>
                </div>
              ))}
            </div>

            {/* Scoring methodology */}
            <div className="mt-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Risk Score Formula</div>
              <div className="text-[10px] text-slate-600 space-y-0.5">
                <div>River Level Score × 30%</div>
                <div>+ Rainfall Score × 25%</div>
                <div>+ Rise Rate Score × 20%</div>
                <div>+ Forecast Score × 15%</div>
                <div>+ Historical Pattern × 10%</div>
                <div className="text-slate-500 mt-1">= Normalized 0–100 Risk Score</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h2 className="text-base font-bold text-white">AI Recommendations</h2>
            </div>
            <div className="space-y-3">
              {insight.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/40">
                  <span className="w-5 h-5 rounded-full bg-blue-900 border border-blue-700 text-blue-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-violet-400" />
            <h2 className="text-sm font-bold text-white">AI Situation Summary</h2>
            <span className="ml-auto text-[10px] text-slate-600">Generated: {new Date(insight.generated_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-800/30">
            <p className="text-sm text-slate-300 leading-relaxed italic">"{insight.summary}"</p>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { label: 'Risk Classification', value: insight.risk_level, color: 'text-orange-400' },
              { label: 'Risk Score', value: `${insight.risk_score} / 100`, color: 'text-orange-300' },
              { label: 'Confidence Indicator', value: `${insight.data_confidence}%`, color: 'text-sky-400' },
            ].map(item => (
              <div key={item.label} className="flex justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/40">
                <span className="text-slate-500">{item.label}</span>
                <span className={`font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-600 mt-3">
            Prototype · Decision Support Only · Not an official emergency warning system.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
