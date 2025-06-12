import React, { useState, useRef, useEffect } from 'react';
import { improveWriting } from '../services/openai/improve-writing';
import { summaryGenerator } from '../services/openai/summary-generator';
import { useResumeStore } from '../stores/resume';
import { Editor } from '@tiptap/react';
import AiAnimation from '../assets/ai-animation.gif'
import StarAiWhite from '../assets/star-ai-white.svg'

const preWrittenPhrases = [
  'Experienced software developer with a passion for building scalable applications.',
  'Proven track record in project management and team leadership.',
  'Skilled in React, Node.js, and cloud technologies.',
];

type AiModalProps = {
  hasWorkExperience?: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement>; // Optional: for positioning
  editorRef?: React.RefObject<Editor | null>;
};

const AiModal = ({ hasWorkExperience = false, onClose, anchorRef, editorRef }: AiModalProps) => {
  const experience = useResumeStore((state) => state.resume.data.sections.experience);
  const setValue = useResumeStore((state) => state.setValue);
  const [aiSummary, setAiSummary] = useState<string[]>([]);
  const [showAiWriter, setShowAiWriter] = useState(false);
  const [showPreWritten, setShowPreWritten] = useState(false);
  const [aiGenerated, setAiGenerated] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 100, left: 100 });

  console.log(experience, "experience");

  const scrollIntoView = (selector: string) => {
    const section = document.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Position the popover near the anchor element if provided
    if (anchorRef && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height + 10,
        left: rect.left - (380 / 2),
      });
    }
  }, [anchorRef]);

  useEffect(() => {
    // Close popover when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleGenerate = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiGenerated('AI-generated profile summary: Innovative developer with 5+ years of experience in web technologies.');
      setAiLoading(false);
    }, 1200);
  };

  const aiAction = async () => {
    setAiLoading(true);
    const position = experience?.items[0]?.position;
    const result = await summaryGenerator(position);
    setShowAiWriter(true); setShowPreWritten(false);
    setAiSummary(result);
    setAiLoading(false);
  }

  const passtoSummary = (summary: string) => {
    if (editorRef?.current) {
      editorRef.current.commands.setContent(summary, true);
      setValue("sections.summary.content", summary);
    }
    onClose();
  }




  return (
    <div
      ref={popoverRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: 380,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        border: '1.5px solid #e5e7eb',
        zIndex: 2000,
        padding: '0 0 24px 0',
        animation: 'fadeInPopover 0.18s',
      }}
    >
      <style>{`
        @keyframes fadeInPopover {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .ai-btn {
          background: #4f46e5;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px 28px;
          margin-right: 16px;
          font-size: 1.08rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(79,70,229,0.08);
        }
        .ai-btn:last-child { margin-right: 0; }
        .ai-btn:hover { background: #3730a3; box-shadow: 0 4px 16px rgba(55,48,163,0.13); }
        .ai-section {
          background: #f5f6ff;
          border-radius: 12px;
          padding: 22px;
          margin-bottom: 22px;
          box-shadow: 0 2px 8px rgba(79,70,229,0.06);
        }
        .ai-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.18rem;
          font-weight: 700;
          color: #3730a3;
          margin-bottom: 10px;
        }
        .ai-close-btn {
          background: none;
          border: none;
          font-size: 1.7rem;
          color: #6b7280;
          cursor: pointer;
          position: absolute;
          top: 12px;
          right: 20px;
          transition: color 0.15s;
          z-index: 3;
        }
        .ai-close-btn:hover { color: #ef4444; }
        .ai-phrase-item {
          margin-bottom: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.01rem;
          transition: background 0.15s;
        }
        .ai-phrase-item:hover {
          background: #e0e7ff;
        }
        .ai-arrow {
          position: absolute;
          top: -10px;
          right: 40px;
          width: 20px;
          height: 10px;
          overflow: visible;
        }
      `}</style>
      {/* Arrow */}
      <svg className="ai-arrow" viewBox="0 0 20 10">
        <polygon points="10,0 20,10 0,10" fill="#fff" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))' }} />
      </svg>
      <button className="ai-close-btn" onClick={onClose} title="Close">&times;</button>
      <div style={{ padding: '24px 24px 0 24px' }}>
        <div className='flex flex-col gap-y-2 bg-blue-50 p-3 relative'>
          <div>
            <img src={AiAnimation} className='absolute top-[-50px] left-[-50px] w-[90px]' />
            <img src={AiAnimation} className='absolute bottom-[-50px] right-[-50px] w-[90px]' />
          </div>
          <div className="ai-header">
            <span role="img" aria-label="AI">🤖</span> AI Writer
          </div>
          <div className='text-red-500 '>
            {!aiSummary.length && <p className='text-[15px]'>Add at least one piece of work experience to generate a profile summary.</p>}
          </div>
          <div className="text-center text-base font-normal leading-[1.4] bg-gradient-to-r from-[#ff8383] to-[#7463ff] mt-3 cursor-pointer text-white p-2 rounded-md relative z-3 flex justify-center gap-2" onClick={() => {
            if (experience?.items[0]?.position) {
              setShowPreWritten(false);
              setAiLoading(true);
              aiAction();
            } else {
              onClose();
              scrollIntoView("#profiles");
            }
          }}>
            {aiLoading ? 'Generating...' : 'Generate'} <img src={StarAiWhite} className='w-5 h-5 object-contain' />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 16, margin: '18px 0 14px 0', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'flex-start' }}>
          {/* <button className="ai-btn" style={{ minWidth: 150 }} onClick={() => { setShowAiWriter(true); setShowPreWritten(false); aiAction() }}>AI Writer</button> */}
          <button className='text-black border border-blue-700 text-blue-700 text-base font-normal w-full text-center p-2 rounded-md text-[20px] bg-white relative z-3' onClick={() => { setShowPreWritten(true); setShowAiWriter(false); }}>Add pre-written phrases</button>
        </div>
        {showAiWriter && (
          <div className="ai-section">
            <div style={{ marginBottom: 12, color: '#4a4a8a', fontWeight: 500 }} >
              <b>AI WRITER</b> <span style={{ background: '#e0e7ff', borderRadius: 8, padding: '2px 8px', fontSize: 12, marginLeft: 8 }}>3 left</span>
            </div>
            {!hasWorkExperience ? (
              <div style={{ color: '#6b6b8a', marginBottom: 12 }}>
                <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {aiSummary.map((summary, index) => (
                    <div className='text-black hover:bg-blue-300 hover:text-white p-2 rounded-md text-[14px] cursor-pointer' key={index} style={{ marginBottom: 8 }} onClick={() => passtoSummary(summary)}>
                      {summary}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div style={{ color: '#6b6b8a', marginBottom: 12 }}>
                  Click generate to get an AI-powered profile summary suggestion.
                </div>
                <button className="ai-btn" onClick={handleGenerate} disabled={aiLoading} style={{ marginBottom: 12, minWidth: 120 }}>
                   {aiLoading ? 'Generating...' : 'Generate'}
                </button>
                {aiGenerated && <div style={{ background: '#eef2ff', borderRadius: 6, padding: 10, marginTop: 8 }}>{aiGenerated}</div>}
              </>
            )}
          </div>
        )}
        {showPreWritten && (
          <div className="ai-section">
            <div style={{ marginBottom: 12, color: '#4a4a8a', fontWeight: 500 }}>
              <b>Add pre-written phrases</b>
            </div>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {preWrittenPhrases.map((phrase, idx) => (
                <li key={idx} className="ai-phrase-item" onClick={() => alert(`Selected: ${phrase}`)}>{phrase}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiModal;
