import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = 'gatley-dashboard-v2';

const INITIAL_LEADS = [
  { id: 1, name: 'Heather', date: '2026-01-06', source: 'Unknown', status: 'lost', value: 2900, prequalified: 'No', lostReason: '', notes: "Tricky job - don't really want it." },
  { id: 2, name: 'Blunt', date: '2026-01-07', source: 'Unknown', status: 'lost', value: 8800, prequalified: 'No', lostReason: 'Roof first', notes: 'Pretty much dead for now.' },
  { id: 3, name: 'Morris', date: '2026-01-07', source: 'Google', status: 'won', value: 8000, prequalified: 'No', lostReason: '', notes: '' },
  { id: 4, name: 'Jason', date: '2026-01-13', source: 'Unknown', status: 'lost', value: 4800, prequalified: 'No', lostReason: 'Unknown - likely price', notes: '' },
  { id: 5, name: 'Donna Early', date: '2026-01-14', source: 'Local', status: 'lost', value: 4700, prequalified: 'No', lostReason: 'Too expensive', notes: '' },
  { id: 6, name: 'Alexandra Patteson', date: '2026-01-05', source: 'Referral', status: 'pending', value: 3200, prequalified: 'No', lostReason: '', notes: "Don't chase - said will come back." },
  { id: 7, name: 'Evans', date: '2026-01-16', source: 'Previous customer', status: 'lost', value: 4200, prequalified: 'No', lostReason: '', notes: "Don't chase - think too pricey now." },
  { id: 8, name: 'George', date: '2026-01-13', source: 'Google', status: 'lost', value: 2200, prequalified: 'No', lostReason: 'Unknown - likely price', notes: '' },
  { id: 9, name: 'Platt', date: '2026-11-20', source: 'Facebook', status: 'lost', value: 9600, prequalified: 'No', lostReason: '', notes: 'On hold - pipe work. Reminder in a couple months.' },
  { id: 10, name: 'Grimes', date: '2026-01-27', source: 'Our fitter', status: 'lost', value: 7000, prequalified: 'No', lostReason: 'Unknown - likely price', notes: '' },
  { id: 11, name: 'Tague', date: '2026-02-05', source: 'Local', status: 'pending', value: 2000, prequalified: 'No', lostReason: '', notes: 'Lives across street. Said yes then put on hold.' },
  { id: 12, name: 'Caroline', date: '2026-02-06', source: 'Local', status: 'lost', value: 7000, prequalified: 'Yes', lostReason: 'Unknown - likely price', notes: '' },
  { id: 13, name: 'Weiner', date: '2026-02-11', source: 'Unknown', status: 'lost', value: 11000, prequalified: 'No', lostReason: '', notes: 'Bought new car - on hold. Likely dead.' },
  { id: 14, name: 'Edge', date: '2026-02-06', source: 'Unknown', status: 'won', value: 7300, prequalified: 'Yes', lostReason: '', notes: '' },
  { id: 15, name: 'Howard', date: '2026-01-12', source: 'Unknown', status: 'pending', value: 3100, prequalified: 'Yes', lostReason: '', notes: "Not quick decision makers. Don't chase." },
  { id: 16, name: 'Alton', date: '2026-01-19', source: 'Unknown', status: 'pending', value: 6500, prequalified: 'Yes', lostReason: '', notes: 'Showroom visit booked.' },
  { id: 17, name: 'Martha', date: '2026-02-23', source: 'Unknown', status: 'lost', value: 5500, prequalified: 'Yes', lostReason: 'Unknown - likely price', notes: '' },
  { id: 18, name: 'Crompton', date: '2026-02-24', source: 'Unknown', status: 'won', value: 1600, prequalified: 'Yes', lostReason: '', notes: '' },
  { id: 19, name: 'Lloyd', date: '2026-02-26', source: 'Unknown', status: 'won', value: 3500, prequalified: 'No', lostReason: '', notes: '' },
  { id: 20, name: 'Sharron', date: '2026-02-27', source: 'Unknown', status: 'pending', value: 3600, prequalified: 'No', lostReason: '', notes: "Liked quote, said will be in touch. Don't chase." },
  { id: 21, name: 'Hancock', date: '2026-03-02', source: 'Referral', status: 'won', value: 2900, prequalified: 'No', lostReason: '', notes: '' },
  { id: 22, name: 'Manisha Natha', date: '2026-03-05', source: 'Unknown', status: 'lost', value: 9300, prequalified: 'Yes', lostReason: 'Unknown - likely price', notes: '' },
  { id: 23, name: 'Zoe', date: '2026-03-09', source: 'Unknown', status: 'pending', value: 8800, prequalified: 'Yes', lostReason: '', notes: "Didn't know what she wanted. Unlikely." },
  { id: 24, name: 'Hughes', date: '2026-03-11', source: 'Unknown', status: 'won', value: 3300, prequalified: 'No', lostReason: '', notes: '' },
  { id: 25, name: 'Newby', date: '2026-03-16', source: 'Unknown', status: 'pending', value: 6700, prequalified: 'No', lostReason: '', notes: 'Showroom visit booked.' },
  { id: 26, name: 'Godfrey', date: '2026-03-16', source: 'Referral', status: 'lost', value: 1000, prequalified: 'No', lostReason: 'Unknown - likely price', notes: '' },
  { id: 27, name: 'Jackie', date: '2026-03-18', source: 'Referral', status: 'pending', value: 1650, prequalified: 'Yes', lostReason: '', notes: 'Remeasure booked to finalise.' },
  { id: 28, name: 'Steve Laiker', date: '2026-03-22', source: 'Website', status: 'lost', value: 0, prequalified: 'Yes', lostReason: 'No reply', notes: '' },
  { id: 29, name: 'Grace', date: '2026-03-23', source: 'Facebook', status: 'pending', value: 9000, prequalified: 'No', lostReason: '', notes: 'Price sensitive. Showroom visit booked.' },
  { id: 30, name: 'Anne-Marie Bentley', date: '2026-03-23', source: 'Website', status: 'pending', value: 0, prequalified: 'Yes', lostReason: '', notes: 'Appointment booked.' },
  { id: 31, name: 'Louise', date: '2026-03-23', source: 'Google', status: 'pending', value: 0, prequalified: 'Yes', lostReason: '', notes: 'Clueless husband on visit.' },
  { id: 32, name: 'Alan Bates', date: '2026-03-23', source: 'Referral', status: 'pending', value: 0, prequalified: 'Yes', lostReason: '', notes: '£25k budget. Considering Ikea.' },
  { id: 33, name: 'Ann', date: '2026-03-24', source: 'Local', status: 'not_started', value: 7000, prequalified: 'Yes', lostReason: '', notes: '£6-8k all in. Appointment booked.' },
  { id: 34, name: 'Paul Johnson', date: '2026-03-24', source: 'Previous customer', status: 'pending', value: 0, prequalified: 'No', lostReason: '', notes: 'Appointment booked.' },
  { id: 35, name: 'Slater', date: '2026-03-27', source: 'Local', status: 'pending', value: 9300, prequalified: 'Yes', lostReason: '', notes: 'Been going on for years.' },
];

const SOURCES = ['Unknown','Google','Referral','Facebook','Local','Website','Previous customer','Our fitter','Estate agent','Other'];
const PIPELINE_STATUSES = ['pending','not_started','won','lost'];
const STATUS_LABELS  = { pending:'Pending', not_started:'Not Started', won:'Won', lost:'Lost' };
const STATUS_COLORS  = { pending:'#e8b96a', not_started:'#7ab8e8', won:'#6ec87a', lost:'#e07070' };
const STATUS_BG      = { pending:'#2d2418', not_started:'#1a2230', won:'#1a2d1e', lost:'#2d1a1a' };
const STATUS_BORDER  = { pending:'#8b6a2e', not_started:'#2e5a8b', won:'#2e7a3a', lost:'#8b2e2e' };

const JOB_COLS   = ['quotes','orders','snagging','invoices'];
const JOB_LABELS = { quotes:'Quotes to Do', orders:'Orders to Do', snagging:'Snagging', invoices:'Invoices' };
const JOB_COLORS = { quotes:'#e8b96a', orders:'#7ab8e8', snagging:'#e07070', invoices:'#6ec87a' };
const JOB_BG     = { quotes:'#2d2418', orders:'#1a2230', snagging:'#2d1a1a', invoices:'#1a2d1e' };
const JOB_BORDER = { quotes:'#8b6a2e', orders:'#2e5a8b', snagging:'#8b2e2e', invoices:'#2e7a3a' };

const fmt = v => v ? '£' + Number(v).toLocaleString() : '—';
const fmtDate = d => { try { return new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short'}); } catch { return d; }};
const EMPTY_LEAD = { name:'', date:new Date().toISOString().split('T')[0], source:'Unknown', status:'pending', value:'', prequalified:'No', lostReason:'', notes:'' };
const EMPTY_JOB  = { name:'', column:'snagging', priority:'Normal', dueDate:'', value:'', notes:'' };

export default function App() {
  const [tab, setTab] = useState('pipeline');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState('');
  const [nextLeadId, setNextLeadId] = useState(36);
  const [nextJobId, setNextJobId]   = useState(1);
  const [leadFilter, setLeadFilter] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');
  const [expandedLead, setExpandedLead] = useState(null);
  const [expandedJob,  setExpandedJob]  = useState(null);
  const [leadModal, setLeadModal] = useState(null);
  const [jobModal,  setJobModal]  = useState(null);
  const [leadForm, setLeadForm] = useState(EMPTY_LEAD);
  const [jobForm,  setJobForm]  = useState(EMPTY_JOB);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r?.value) {
          const d = JSON.parse(r.value);
          setData(d);
          setNextLeadId(d.nextLeadId || 36);
          setNextJobId(d.nextJobId   || 1);
        } else {
          setData({ leads: INITIAL_LEADS, manualJobs: [], nextLeadId:36, nextJobId:1 });
        }
      } catch {
        setData({ leads: INITIAL_LEADS, manualJobs: [], nextLeadId:36, nextJobId:1 });
      }
      setLoading(false);
    })();
  }, []);

  const saveCloud = useCallback(async (d) => {
    setSyncStatus('saving...');
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(d)); setSyncStatus('saved ✓'); setTimeout(()=>setSyncStatus(''),2000); }
    catch { setSyncStatus('sync error'); }
  }, []);

  const update = useCallback((d) => { setData(d); saveCloud(d); }, [saveCloud]);

  if (loading || !data) return <div style={{ background:'#1a1714', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Georgia,serif', color:'#c8922a', fontSize:18 }}>Loading...</div>;

  const { leads, manualJobs } = data;

  // IDs of leads already pinned to snagging/invoices via a manual job entry
  const pinnedLeadIds = new Set(manualJobs.filter(j=>j.leadId).map(j=>j.leadId));

  // Auto-derive quotes and orders from pipeline
  const autoQuotes = leads.filter(l => l.status==='not_started' && !pinnedLeadIds.has(l.id));
  const autoOrders = leads.filter(l => l.status==='won'         && !pinnedLeadIds.has(l.id));

  const itemsFor = col => {
    const manual = manualJobs.filter(j=>j.column===col);
    if (col==='quotes') return [...autoQuotes.map(l=>({...l,_auto:true,_col:'quotes'})), ...manual];
    if (col==='orders') return [...autoOrders.map(l=>({...l,_auto:true,_col:'orders'})), ...manual];
    return manual;
  };

  // Move lead card to snagging or invoices (creates a manual job entry)
  const pinLeadTo = (lead, col, e) => {
    e?.stopPropagation();
    const nid = nextJobId;
    const newJob = { id:nid, leadId:lead.id, name:lead.name, column:col, priority:'Normal', dueDate:'', value:lead.value||0, notes:lead.notes||'' };
    setNextJobId(nid+1);
    update({...data, manualJobs:[...manualJobs,newJob], nextJobId:nid+1});
    setExpandedJob(null);
  };

  const moveManual = (id, col, e) => {
    e?.stopPropagation();
    update({...data, manualJobs:manualJobs.map(j=>j.id===id?{...j,column:col}:j)});
  };

  // Pipeline stats
  const pStats = { pending:0, not_started:0, won:0, lost:0, activeVal:0 };
  leads.forEach(l => {
    pStats[l.status] = (pStats[l.status]||0)+1;
    if (l.status==='pending'||l.status==='not_started') pStats.activeVal += (Number(l.value)||0);
  });

  const filtered = leads.filter(l => {
    if (leadFilter!=='all' && l.status!==leadFilter) return false;
    if (leadSearch && !l.name.toLowerCase().includes(leadSearch.toLowerCase())) return false;
    return true;
  });

  // Lead modal
  const openAddLead = (s='pending') => { setLeadForm({...EMPTY_LEAD,status:s}); setLeadModal({mode:'add'}); };
  const openEditLead = (l,e) => { e?.stopPropagation(); setLeadForm({...l,value:l.value||''}); setLeadModal({mode:'edit',lead:l}); };
  const closeLeadModal = () => setLeadModal(null);
  const saveLead = () => {
    const d = {...leadForm, value:parseFloat(leadForm.value)||0};
    let newLeads, nid=nextLeadId;
    if (leadModal.mode==='edit') { newLeads=leads.map(l=>l.id===leadModal.lead.id?{...l,...d}:l); }
    else { newLeads=[...leads,{...d,id:nextLeadId}]; nid=nextLeadId+1; setNextLeadId(nid); }
    update({...data,leads:newLeads,nextLeadId:nid});
    closeLeadModal();
  };
  const deleteLead = () => { if(!confirm('Delete?')) return; update({...data,leads:leads.filter(l=>l.id!==leadModal.lead.id)}); closeLeadModal(); };
  const quickStatus = (id,status,e) => { e?.stopPropagation(); update({...data,leads:leads.map(l=>l.id===id?{...l,status}:l)}); setExpandedLead(null); };

  // Job modal
  const openAddJob = (col='snagging') => { setJobForm({...EMPTY_JOB,column:col}); setJobModal({mode:'add'}); };
  const openEditJob = (j,e) => { e?.stopPropagation(); setJobForm({...j,value:j.value||''}); setJobModal({mode:'edit',job:j}); };
  const closeJobModal = () => setJobModal(null);
  const saveJob = () => {
    const d={...jobForm,value:parseFloat(jobForm.value)||0};
    let newJobs,nid=nextJobId;
    if (jobModal.mode==='edit') { newJobs=manualJobs.map(j=>j.id===jobModal.job.id?{...j,...d}:j); }
    else { newJobs=[...manualJobs,{...d,id:nextJobId}]; nid=nextJobId+1; setNextJobId(nid); }
    update({...data,manualJobs:newJobs,nextJobId:nid});
    closeJobModal();
  };
  const deleteJob = () => { if(!confirm('Delete?')) return; update({...data,manualJobs:manualJobs.filter(j=>j.id!==jobModal.job.id)}); closeJobModal(); };

  const lf = (k,v) => setLeadForm(p=>({...p,[k]:v}));
  const jf = (k,v) => setJobForm(p=>({...p,[k]:v}));

  return (
    <div style={{ background:'#1a1714', minHeight:'100vh', fontFamily:"'Jost',sans-serif", color:'#faf6f0' }}>

      {/* TOPBAR */}
      <div style={{ background:'#221f1b', borderBottom:'1px solid #3a3430', padding:'12px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
        <div>
          <span style={{ fontFamily:'Georgia,serif', fontSize:20, color:'#faf6f0' }}>Gatley <span style={{ color:'#e8b96a', fontStyle:'italic' }}>Kitchens</span></span>
          <span style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#8a7d72', marginLeft:12 }}>Dashboard</span>
          {syncStatus && <span style={{ marginLeft:12, fontSize:10, color:syncStatus.includes('error')?'#e07070':'#6ec87a' }}>{syncStatus}</span>}
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {[['pipeline','Lead Pipeline'],['jobs','Active Jobs']].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:500, letterSpacing:'0.13em', textTransform:'uppercase', padding:'6px 14px', border:'1px solid', cursor:'pointer', borderColor:tab===t?'#c8922a':'#3a3430', background:tab===t?'#c8922a':'transparent', color:tab===t?'#1a1714':'#8a7d72' }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ══ PIPELINE ══ */}
      {tab==='pipeline' && (
        <div style={{ padding:'18px 14px' }}>
          {/* Stats row */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:18 }}>
            {[['Pending',pStats.pending,'#e8b96a'],['Not Started',pStats.not_started,'#7ab8e8'],['Won',pStats.won,'#6ec87a'],['Lost',pStats.lost,'#e07070'],['Active £','£'+pStats.activeVal.toLocaleString(),'#e8b96a']].map(([l,v,c])=>(
              <div key={l} style={{ background:'#221f1b', border:'1px solid #3a3430', padding:'7px 13px', textAlign:'center', minWidth:66 }}>
                <div style={{ fontFamily:'Georgia,serif', fontSize:typeof v==='string'?15:20, color:c, lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:9, letterSpacing:'0.11em', textTransform:'uppercase', color:'#8a7d72', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
          {/* Filters */}
          <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:16, alignItems:'center' }}>
            {[['all','All'],['pending','Pending'],['not_started','Not Started'],['won','Won'],['lost','Lost']].map(([f,l])=>(
              <button key={f} onClick={()=>setLeadFilter(f)} style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', padding:'4px 11px', border:'1px solid', cursor:'pointer', borderColor:leadFilter===f?(STATUS_BORDER[f]||'#c8922a'):'#3a3430', background:leadFilter===f?(STATUS_BORDER[f]||'#c8922a'):'transparent', color:leadFilter===f?'#faf6f0':'#8a7d72' }}>{l}</button>
            ))}
            <input value={leadSearch} onChange={e=>setLeadSearch(e.target.value)} placeholder="Search..." style={{ marginLeft:'auto', fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:300, padding:'4px 11px', border:'1px solid #3a3430', background:'#221f1b', color:'#faf6f0', outline:'none', width:130 }} />
          </div>
          {/* 4 cols */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:11, alignItems:'start' }}>
            {PIPELINE_STATUSES.map(col=>{
              const tc=STATUS_COLORS[col], bc=STATUS_BORDER[col], bg=STATUS_BG[col];
              const colLeads=filtered.filter(l=>l.status===col);
              return (
                <div key={col}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:`2px solid ${bc}`, paddingBottom:7, marginBottom:11 }}>
                    <span style={{ fontSize:10, fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:tc }}>{STATUS_LABELS[col]}</span>
                    <span style={{ fontFamily:'Georgia,serif', fontSize:17, color:tc }}>{colLeads.length}</span>
                  </div>
                  {colLeads.length===0 && <div style={{ fontSize:11, color:'#8a7d72', fontStyle:'italic', textAlign:'center', padding:'13px 0' }}>None</div>}
                  {colLeads.map(l=>{
                    const isExp=expandedLead===l.id;
                    return (
                      <div key={l.id} onClick={()=>setExpandedLead(isExp?null:l.id)} style={{ background:bg, border:`1px solid ${bc}`, padding:10, marginBottom:8, cursor:'pointer' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', gap:5, marginBottom:5 }}>
                          <div style={{ fontFamily:'Georgia,serif', fontSize:14, color:'#faf6f0', lineHeight:1.2 }}>{l.name}</div>
                          <div style={{ textAlign:'right', flexShrink:0 }}>
                            <div style={{ fontSize:12, fontWeight:600, color:tc }}>{fmt(l.value)}</div>
                            {l.value>0&&<div style={{ fontSize:9, color:'#8a7d72' }}>~{fmt(Math.round(l.value*0.5))}</div>}
                          </div>
                        </div>
                        <div style={{ display:'flex', gap:4, marginBottom:4 }}>
                          <span style={S.tagA}>{l.source}</span>
                          <span style={S.tagM}>PQ:{l.prequalified}</span>
                        </div>
                        <div style={{ fontSize:10, color:'#8a7d72' }}>{fmtDate(l.date)}</div>
                        {l.lostReason&&<div style={{ fontSize:10, color:tc, opacity:0.8, marginTop:3 }}>↳ {l.lostReason}</div>}
                        {isExp&&l.notes&&<div style={{ fontSize:11, color:'#8a7d72', lineHeight:1.5, fontStyle:'italic', borderLeft:'2px solid #3a3430', paddingLeft:7, margin:'6px 0' }}>{l.notes}</div>}
                        {isExp&&(
                          <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:7 }}>
                            <button onClick={e=>openEditLead(l,e)} style={S.ab('#c8922a')}>Edit</button>
                            {PIPELINE_STATUSES.filter(s=>s!==col).map(s=>(
                              <button key={s} onClick={e=>quickStatus(l.id,s,e)} style={S.ab(STATUS_BORDER[s],STATUS_COLORS[s])}>→{STATUS_LABELS[s]}</button>
                            ))}
                          </div>
                        )}
                        {!isExp&&<div style={{ fontSize:9, color:'#8a7d72', opacity:0.4, marginTop:3, letterSpacing:'0.1em', textTransform:'uppercase' }}>tap</div>}
                      </div>
                    );
                  })}
                  <button onClick={()=>openAddLead(col)} style={S.addBtn}>+ Add</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ JOBS ══ */}
      {tab==='jobs' && (
        <div style={{ padding:'18px 14px' }}>
          <div style={{ background:'#221f1b', border:'1px solid #3a3430', padding:'9px 14px', marginBottom:18, fontSize:11, color:'#8a7d72', lineHeight:1.7 }}>
            <span style={{ color:'#7ab8e8' }}>Not Started</span> leads auto-appear in <span style={{ color:JOB_COLORS.quotes }}>Quotes to Do</span> &nbsp;·&nbsp; <span style={{ color:'#6ec87a' }}>Won</span> leads auto-appear in <span style={{ color:JOB_COLORS.orders }}>Orders to Do</span> &nbsp;·&nbsp; Tap any card to move it to <span style={{ color:JOB_COLORS.snagging }}>Snagging</span> or <span style={{ color:JOB_COLORS.invoices }}>Invoices</span>
          </div>
          {/* Stats */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:18 }}>
            {JOB_COLS.map(col=>(
              <div key={col} style={{ background:'#221f1b', border:`1px solid ${JOB_BORDER[col]}`, padding:'7px 14px', minWidth:86, textAlign:'center' }}>
                <div style={{ fontFamily:'Georgia,serif', fontSize:20, color:JOB_COLORS[col], lineHeight:1 }}>{itemsFor(col).length}</div>
                <div style={{ fontSize:9, letterSpacing:'0.11em', textTransform:'uppercase', color:'#8a7d72', marginTop:3 }}>{JOB_LABELS[col]}</div>
              </div>
            ))}
          </div>
          {/* 4 cols */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:11, alignItems:'start' }}>
            {JOB_COLS.map(col=>{
              const items=itemsFor(col);
              return (
                <div key={col}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:`2px solid ${JOB_BORDER[col]}`, paddingBottom:7, marginBottom:11 }}>
                    <span style={{ fontSize:10, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:JOB_COLORS[col] }}>{JOB_LABELS[col]}</span>
                    <span style={{ fontFamily:'Georgia,serif', fontSize:17, color:JOB_COLORS[col] }}>{items.length}</span>
                  </div>
                  {items.length===0&&<div style={{ fontSize:11, color:'#8a7d72', fontStyle:'italic', textAlign:'center', padding:'13px 0' }}>Nothing here</div>}
                  {items.map(item=>{
                    const isAuto=item._auto;
                    const cid=isAuto?`a${item.id}`:`j${item.id}`;
                    const isExp=expandedJob===cid;
                    const overdue=item.dueDate&&new Date(item.dueDate)<new Date();
                    return (
                      <div key={cid} onClick={()=>setExpandedJob(isExp?null:cid)} style={{ background:JOB_BG[col], border:`1px solid ${JOB_BORDER[col]}`, padding:10, marginBottom:8, cursor:'pointer' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', gap:5, marginBottom:4 }}>
                          <div style={{ fontFamily:'Georgia,serif', fontSize:14, color:'#faf6f0', lineHeight:1.2 }}>{item.name}</div>
                          {isAuto&&<span style={{ fontSize:8, letterSpacing:'0.1em', textTransform:'uppercase', color:JOB_COLORS[col], opacity:0.6, flexShrink:0, marginTop:2 }}>auto</span>}
                        </div>
                        {item.value>0&&<div style={{ fontSize:12, color:JOB_COLORS[col], fontWeight:500, marginBottom:3 }}>{fmt(item.value)}</div>}
                        {!isAuto&&item.priority&&<span style={{ fontSize:9, padding:'2px 5px', border:`1px solid ${item.priority==='High'?'#e07070':item.priority==='Low'?'#3a3430':'#8b6a2e'}`, color:item.priority==='High'?'#e07070':item.priority==='Low'?'#8a7d72':'#e8b96a', display:'inline-block', marginBottom:3 }}>{item.priority}</span>}
                        {item.dueDate&&<div style={{ fontSize:10, color:overdue?'#e07070':'#8a7d72', marginTop:2 }}>Due:{fmtDate(item.dueDate)}{overdue?' ⚠':''}</div>}
                        {isExp&&item.notes&&<div style={{ fontSize:11, color:'#8a7d72', lineHeight:1.5, fontStyle:'italic', borderLeft:'2px solid #3a3430', paddingLeft:7, margin:'6px 0' }}>{item.notes}</div>}
                        {isExp&&(
                          <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:7 }}>
                            {isAuto ? (
                              <>
                                <button onClick={e=>pinLeadTo(item,'snagging',e)} style={S.ab(JOB_BORDER.snagging,JOB_COLORS.snagging)}>→ Snagging</button>
                                <button onClick={e=>pinLeadTo(item,'invoices',e)} style={S.ab(JOB_BORDER.invoices,JOB_COLORS.invoices)}>→ Invoice</button>
                              </>
                            ) : (
                              <>
                                <button onClick={e=>openEditJob(item,e)} style={S.ab('#c8922a')}>Edit</button>
                                {JOB_COLS.filter(c=>c!==col).map(c=>(
                                  <button key={c} onClick={e=>moveManual(item.id,c,e)} style={S.ab(JOB_BORDER[c],JOB_COLORS[c])}>→{JOB_LABELS[c].split(' ')[0]}</button>
                                ))}
                              </>
                            )}
                          </div>
                        )}
                        {!isExp&&<div style={{ fontSize:9, color:'#8a7d72', opacity:0.4, marginTop:3, letterSpacing:'0.1em', textTransform:'uppercase' }}>tap</div>}
                      </div>
                    );
                  })}
                  {(col==='snagging'||col==='invoices')&&<button onClick={()=>openAddJob(col)} style={S.addBtn}>+ Add</button>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LEAD MODAL */}
      {leadModal&&(
        <Modal title={leadModal.mode==='edit'?`Edit — ${leadModal.lead.name}`:'Add Lead'} onClose={closeLeadModal}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <Fld label="Name"><input value={leadForm.name} onChange={e=>lf('name',e.target.value)} style={S.inp}/></Fld>
            <Fld label="Date"><input type="date" value={leadForm.date} onChange={e=>lf('date',e.target.value)} style={S.inp}/></Fld>
            <Fld label="Source"><select value={leadForm.source} onChange={e=>lf('source',e.target.value)} style={S.inp}>{SOURCES.map(s=><option key={s}>{s}</option>)}</select></Fld>
            <Fld label="Status"><select value={leadForm.status} onChange={e=>lf('status',e.target.value)} style={S.inp}>{PIPELINE_STATUSES.map(s=><option key={s} value={s}>{STATUS_LABELS[s]}</option>)}</select></Fld>
            <Fld label="Value £"><input type="number" value={leadForm.value} onChange={e=>lf('value',e.target.value)} style={S.inp}/></Fld>
            <Fld label="Pre-qual?"><select value={leadForm.prequalified} onChange={e=>lf('prequalified',e.target.value)} style={S.inp}><option>No</option><option>Yes</option><option>Partial</option></select></Fld>
          </div>
          <Fld label="Lost Reason" mt={10}><input value={leadForm.lostReason} onChange={e=>lf('lostReason',e.target.value)} style={{...S.inp,width:'100%'}}/></Fld>
          <Fld label="Notes" mt={10}><textarea value={leadForm.notes} onChange={e=>lf('notes',e.target.value)} rows={3} style={{...S.inp,width:'100%',resize:'vertical'}}/></Fld>
          <div style={{ display:'flex', gap:8, marginTop:16, justifyContent:'flex-end' }}>
            {leadModal.mode==='edit'&&<button onClick={deleteLead} style={S.ab('#8b2e2e','#e07070')}>Delete</button>}
            <button onClick={closeLeadModal} style={S.ab('#3a3430','#8a7d72')}>Cancel</button>
            <button onClick={saveLead} style={{...S.ab('#c8922a'),background:'#c8922a',color:'#1a1714',padding:'6px 16px'}}>Save</button>
          </div>
        </Modal>
      )}

      {/* JOB MODAL */}
      {jobModal&&(
        <Modal title={jobModal.mode==='edit'?`Edit — ${jobModal.job.name}`:'Add Task'} onClose={closeJobModal}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <Fld label="Customer / Job"><input value={jobForm.name} onChange={e=>jf('name',e.target.value)} style={S.inp}/></Fld>
            <Fld label="Column"><select value={jobForm.column} onChange={e=>jf('column',e.target.value)} style={S.inp}>{JOB_COLS.map(c=><option key={c} value={c}>{JOB_LABELS[c]}</option>)}</select></Fld>
            <Fld label="Priority"><select value={jobForm.priority} onChange={e=>jf('priority',e.target.value)} style={S.inp}><option>High</option><option>Normal</option><option>Low</option></select></Fld>
            <Fld label="Due Date"><input type="date" value={jobForm.dueDate} onChange={e=>jf('dueDate',e.target.value)} style={S.inp}/></Fld>
            <Fld label="Value £"><input type="number" value={jobForm.value} onChange={e=>jf('value',e.target.value)} style={S.inp}/></Fld>
          </div>
          <Fld label="Notes" mt={10}><textarea value={jobForm.notes} onChange={e=>jf('notes',e.target.value)} rows={3} style={{...S.inp,width:'100%',resize:'vertical'}}/></Fld>
          <div style={{ display:'flex', gap:8, marginTop:16, justifyContent:'flex-end' }}>
            {jobModal.mode==='edit'&&<button onClick={deleteJob} style={S.ab('#8b2e2e','#e07070')}>Delete</button>}
            <button onClick={closeJobModal} style={S.ab('#3a3430','#8a7d72')}>Cancel</button>
            <button onClick={saveJob} style={{...S.ab('#c8922a'),background:'#c8922a',color:'#1a1714',padding:'6px 16px'}}>Save</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({title,onClose,children}) {
  return (
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:16 }}>
      <div style={{ background:'#2a2520',border:'1px solid #3a3430',width:'100%',maxWidth:460,maxHeight:'90vh',overflowY:'auto',padding:22 }}>
        <div style={{ fontFamily:'Georgia,serif',fontSize:19,color:'#faf6f0',marginBottom:16 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

function Fld({label,children,mt}) {
  return (
    <div style={{ marginTop:mt||0 }}>
      <div style={{ fontSize:9,fontWeight:500,letterSpacing:'0.17em',textTransform:'uppercase',color:'#8a7d72',marginBottom:4 }}>{label}</div>
      {children}
    </div>
  );
}

const S = {
  tagA: { fontSize:9,fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',padding:'2px 5px',border:'1px solid #c8922a',color:'#e8b96a' },
  tagM: { fontSize:9,fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',padding:'2px 5px',border:'1px solid #3a3430',color:'#8a7d72' },
  addBtn: { width:'100%',padding:'7px',border:'1px dashed #3a3430',background:'transparent',color:'#8a7d72',fontFamily:"'Jost',sans-serif",fontSize:11,letterSpacing:'0.14em',textTransform:'uppercase',cursor:'pointer',marginTop:4 },
  inp: { width:'100%',fontFamily:"'Jost',sans-serif",fontSize:12,fontWeight:300,padding:'6px 9px',border:'1px solid #3a3430',background:'#1a1714',color:'#faf6f0',outline:'none' },
  ab: (bc,tc) => ({ fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:500,letterSpacing:'0.11em',textTransform:'uppercase',padding:'3px 9px',border:`1px solid ${bc}`,background:'transparent',color:tc||bc,cursor:'pointer' }),
};
