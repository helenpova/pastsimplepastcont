import { useState } from 'react';
import Explanation from './components/Explanation';
import Training from './components/Training';
import Consolidation from './components/Consolidation';

export default function App() {
  const [currentSection, setCurrentSection] = useState<'explanation' | 'training' | 'consolidation'>('explanation');
  const [progress, setProgress] = useState(0);

  const sections = [
    { id: 'explanation', label: 'Объяснение', icon: '📚' },
    { id: 'training', label: 'Тренировка', icon: '✏️' },
    { id: 'consolidation', label: 'Закрепление', icon: '✅' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Past Simple vs Past Continuous
          </h1>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between gap-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex-1 cursor-pointer"
                onClick={() => {
                  setCurrentSection(section.id as any);
                  setProgress(index);
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{section.icon}</span>
                  <span className={`font-semibold transition-colors ${
                    currentSection === section.id ? 'text-indigo-600' : 'text-gray-600'
                  }`}>
                    {section.label}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      currentSection === section.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 w-full'
                        : progress > index
                        ? 'bg-green-500 w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentSection === 'explanation' && <Explanation />}
        {currentSection === 'training' && <Training />}
        {currentSection === 'consolidation' && <Consolidation />}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 right-8 flex gap-4">
        {currentSection !== 'explanation' && (
          <button
            onClick={() => {
              if (currentSection === 'training') setCurrentSection('explanation');
              if (currentSection === 'consolidation') setCurrentSection('training');
            }}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            ← Назад
          </button>
        )}
        {currentSection !== 'consolidation' && (
          <button
            onClick={() => {
              if (currentSection === 'explanation') {
                setCurrentSection('training');
                setProgress(1);
              }
              if (currentSection === 'training') {
                setCurrentSection('consolidation');
                setProgress(2);
              }
            }}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-semibold"
          >
            Далее →
          </button>
        )}
      </div>
    </div>
  );
}
