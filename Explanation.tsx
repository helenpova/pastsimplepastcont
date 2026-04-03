import { useState } from 'react';

export default function Explanation() {
  const [activeTab, setActiveTab] = useState<'simple' | 'continuous'>('simple');

  const pastSimpleExamples = [
    {
      title: 'Завершенное действие в прошлом',
      description: 'Действие произошло, началось и закончилось в определенный момент в прошлом',
      examples: [
        'I watched a movie yesterday.',
        'She finished her homework at 5 PM.',
        'They went to Paris last summer.',
      ],
      image: '⏹️',
    },
    {
      title: 'Серия завершенных действий',
      description: 'Несколько действий произошли одно за другим в прошлом',
      examples: [
        'He woke up, had breakfast, and left home.',
        'She arrived, sat down, and opened her book.',
        'They came home, changed clothes, and went out.',
      ],
      image: '📚',
    },
    {
      title: 'Привычные действия в прошлом',
      description: 'То, что регулярно происходило в прошлом, но уже не происходит',
      examples: [
        'I visited my grandmother every weekend.',
        'She played tennis three times a week.',
        'They often went to the beach in summer.',
      ],
      image: '🔄',
    },
  ];

  const pastContinuousExamples = [
    {
      title: 'Действие, которое длилось в момент времени',
      description: 'Процесс был в разгаре, когда произошло что-то еще',
      examples: [
        'I was watching a movie when she called.',
        'He was sleeping when the alarm rang.',
        'They were playing football when it started raining.',
      ],
      image: '⏳',
    },
    {
      title: 'Два одновременных действия в прошлом',
      description: 'Два процесса происходили одновременно в прошлом',
      examples: [
        'While he was reading, she was cooking.',
        'As they were walking, it was getting dark.',
        'The children were playing while the adults were talking.',
      ],
      image: '⚖️',
    },
    {
      title: 'Фон для другого события',
      description: 'Длительное действие, на фоне которого произошло другое событие',
      examples: [
        'The sun was setting when we arrived.',
        'It was raining while we were traveling.',
        'Birds were singing as we walked through the forest.',
      ],
      image: '🎬',
    },
  ];

  const comparison = [
    {
      aspect: 'Структура',
      pastSimple: 'did + V1 или V2 (for regular verbs)',
      pastContinuous: 'was/were + V-ing',
      example: 'watched vs was watching',
    },
    {
      aspect: 'Завершенность',
      pastSimple: 'Полностью завершенное действие',
      pastContinuous: 'Незавершенный процесс',
      example: 'I read the book vs I was reading the book',
    },
    {
      aspect: 'Использование',
      pastSimple: 'Простое прошедшее событие',
      pastContinuous: 'Действие, прерванное другим событием',
      example: 'I went home vs I was going home when...',
    },
    {
      aspect: 'Маркеры времени',
      pastSimple: 'yesterday, last week, in 2020, at 3 PM',
      pastContinuous: 'while, when, as, at 3 PM (момент времени)',
      example: 'Last week I went vs At 3 PM I was going',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Selection */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('simple')}
          className={`px-8 py-3 rounded-lg font-bold transition-all text-lg ${
            activeTab === 'simple'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Past Simple
        </button>
        <button
          onClick={() => setActiveTab('continuous')}
          className={`px-8 py-3 rounded-lg font-bold transition-all text-lg ${
            activeTab === 'continuous'
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Past Continuous
        </button>
      </div>

      {/* Main Explanation */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className={`p-8 rounded-xl border-2 shadow-lg ${
          activeTab === 'simple'
            ? 'bg-blue-50 border-blue-200'
            : 'bg-purple-50 border-purple-200'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            activeTab === 'simple' ? 'text-blue-700' : 'text-purple-700'
          }`}>
            {activeTab === 'simple' ? 'Past Simple' : 'Past Continuous'}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            {activeTab === 'simple'
              ? 'Используется для описания завершенных действий или событий в прошлом. Основное внимание уделяется самому факту события, а не его длительности.'
              : 'Используется для описания длительных или незавершенных действий в прошлом. Часто используется для описания фона, на котором произошло другое событие.'}
          </p>
          <div className="bg-white p-4 rounded-lg border-l-4" style={{
            borderColor: activeTab === 'simple' ? '#3b82f6' : '#a855f7'
          }}>
            <p className="font-semibold text-gray-800">
              {activeTab === 'simple'
                ? 'Формула: Subject + V2 (или did + V1)'
                : 'Формула: Subject + was/were + V-ing'}
            </p>
          </div>
        </div>

        <div className={`p-8 rounded-xl text-center flex flex-col justify-center ${
          activeTab === 'simple'
            ? 'bg-blue-100'
            : 'bg-purple-100'
        }`}>
          <div className="text-6xl mb-4">
            {activeTab === 'simple' ? '⏹️' : '⏳'}
          </div>
          <p className="text-xl font-semibold text-gray-800">
            {activeTab === 'simple' ? 'Завершенное действие' : 'Длительное действие'}
          </p>
        </div>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Примеры использования</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {(activeTab === 'simple' ? pastSimpleExamples : pastContinuousExamples).map((example, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4" style={{
              borderColor: activeTab === 'simple' ? '#3b82f6' : '#a855f7'
            }}>
              <div className="text-4xl mb-4">{example.image}</div>
              <h4 className="font-bold text-lg mb-2 text-gray-800">{example.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{example.description}</p>
              <div className="space-y-2">
                {example.examples.map((ex, i) => (
                  <p key={i} className="text-sm bg-gray-50 p-3 rounded text-gray-700 italic">
                    "{ex}"
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Сравнение Past Simple и Past Continuous</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="border border-indigo-700 p-4 text-left">Аспект</th>
                <th className="border border-indigo-700 p-4 text-left">Past Simple</th>
                <th className="border border-indigo-700 p-4 text-left">Past Continuous</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 p-4 font-semibold text-gray-800">{row.aspect}</td>
                  <td className="border border-gray-300 p-4 text-gray-700">{row.pastSimple}</td>
                  <td className="border border-gray-300 p-4 text-gray-700">{row.pastContinuous}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
        <h3 className="text-2xl font-bold mb-8 text-gray-800">Визуальное представление на временной шкале</h3>
        <div className="space-y-8">
          <div>
            <p className="font-bold text-lg mb-3 text-blue-700">Past Simple - Точечное событие:</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-2 bg-gray-300 rounded-full relative">
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
              </div>
            </div>
            <p className="text-gray-600">I watched a movie. (Действие произошло в определенный момент)</p>
          </div>

          <div>
            <p className="font-bold text-lg mb-3 text-purple-700">Past Continuous - Длительный процесс:</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-full relative">
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-red-500 rounded-full transform -translate-y-1/2"></div>
              </div>
            </div>
            <p className="text-gray-600">I was watching a movie when she called. (Процесс был прерван другим событием)</p>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-indigo-200">
            <p className="font-bold text-gray-800 mb-3">Когда они используются вместе:</p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Past Simple</span> описывает краткое событие, которое прервало 
              длительное действие, описанное в <span className="font-semibold">Past Continuous</span>. 
              Пример: "I was reading when the doorbell rang." (была читал - Past Continuous, позвонил - Past Simple)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
