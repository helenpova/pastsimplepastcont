import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  image: string;
}

export default function Training() {
  const questions: Question[] = [
    {
      id: 1,
      question: 'Выберите правильное предложение:\nУчитель входил в класс, когда я писал домашнее задание.',
      options: [
        'The teacher entered when I was writing my homework.',
        'The teacher was entering when I wrote my homework.',
        'The teacher enters when I write my homework.',
        'The teacher was entering when I was writing my homework.',
      ],
      correct: 0,
      explanation:
        'Past Simple (entered) для краткого события, Past Continuous (was writing) для длительного действия в момент события.',
      image: '📚',
    },
    {
      id: 2,
      question: 'Вчера я встретил старого друга на улице. Он покупал продукты.\nВыберите правильный вариант:',
      options: [
        'I met my old friend. He buys groceries.',
        'I was meeting my old friend. He was buying groceries.',
        'I met my old friend. He was buying groceries.',
        'I was meeting my old friend. He bought groceries.',
      ],
      correct: 2,
      explanation:
        'Met (Past Simple) - краткое, законченное событие встречи. Was buying (Past Continuous) - описывает, что он делал в момент встречи.',
      image: '👥',
    },
    {
      id: 3,
      question: 'Какое предложение описывает две одновременные действия в прошлом?',
      options: [
        'I watched TV and read a book.',
        'While I was watching TV, I was reading a book.',
        'I watched TV while I read a book.',
        'I was watching TV and I read a book.',
      ],
      correct: 1,
      explanation:
        'Past Continuous (was watching, was reading) подчеркивает одновременность и длительность обоих действий.',
      image: '⚖️',
    },
    {
      id: 4,
      question: 'Какой вариант правильно описывает фон для события?\nШел дождь, поэтому я остался дома.',
      options: [
        'It rained, so I stayed home.',
        'It was raining, so I stayed home.',
        'It was raining, so I was staying home.',
        'It rained, so I was staying home.',
      ],
      correct: 1,
      explanation:
        'Was raining (Past Continuous) создает фон. Stayed (Past Simple) - решение, принятое в результате этого фона.',
      image: '🌧️',
    },
    {
      id: 5,
      question: 'Выберите предложение о регулярном действии в прошлом:',
      options: [
        'He was playing football last week.',
        'He played football last week.',
        'He was playing football every week last year.',
        'He plays football last week.',
      ],
      correct: 1,
      explanation:
        'Past Simple используется для действий, которые регулярно происходили в прошлом. "Last week" указывает на период, когда это происходило.',
      image: '🔄',
    },
    {
      id: 6,
      question: 'Я работал над проектом весь день. Вечером мой друг пришел в гости.\nВыберите правильный вариант:',
      options: [
        'I was working on the project all day. In the evening my friend visited.',
        'I worked on the project all day. In the evening my friend came.',
        'I was working on the project all day. In the evening my friend came.',
        'I worked on the project all day. In the evening my friend was coming.',
      ],
      correct: 2,
      explanation:
        'Was working (Past Continuous) - длительный процесс. Came (Past Simple) - точечное событие в определенный момент.',
      image: '⏰',
    },
    {
      id: 7,
      question: 'Какое предложение грамматически неправильно?',
      options: [
        'While she was cooking, he was watching TV.',
        'I was sleeping when the phone rang.',
        'They was playing chess last night.',
        'The sun was setting as we arrived.',
      ],
      correct: 2,
      explanation:
        'Неправильно: "They was" - неправильное согласование. Должно быть "They were playing chess last night."',
      image: '❌',
    },
    {
      id: 8,
      question: 'Завтра я буду писать тест. Сейчас я готовлюсь.\nКакой вариант правильно описывает прошлое?',
      options: [
        'I wrote the test. I am preparing.',
        'I was writing the test. I prepared.',
        'I wrote the test. I was preparing.',
        'I was writing the test. I was preparing.',
      ],
      correct: 2,
      explanation:
        'Wrote (Past Simple) - завершенное событие. Was preparing (Past Continuous) - действие, которое происходило перед этим.',
      image: '📝',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetTraining = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full">
          <div className="text-center">
            <div className="text-6xl mb-6">
              {percentage === 100 ? '🌟' : percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Результаты!</h2>
            <p className="text-6xl font-bold text-indigo-600 mb-4">
              {score}/{questions.length}
            </p>
            <p className="text-2xl text-gray-600 mb-2">{percentage}%</p>
            <p className="text-lg text-gray-700 mb-8">
              {percentage === 100
                ? 'Отлично! Вы полностью овладели этой темой!'
                : percentage >= 80
                ? 'Хорошо! Закрепите оставшиеся моменты.'
                : percentage >= 60
                ? 'Неплохо! Повторите сложные случаи.'
                : 'Попробуйте еще раз, изучив объяснение!'}
            </p>
            <button
              onClick={resetTraining}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Начать заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow">
        <span className="text-lg font-semibold text-gray-700">
          Вопрос {currentQuestion + 1}/{questions.length}
        </span>
        <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-lg font-bold text-indigo-600">{score} очков</span>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="text-5xl">{question.image}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 whitespace-pre-line">{question.question}</h2>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !answered && setSelectedAnswer(idx)}
              className={`w-full p-4 text-left rounded-lg border-2 font-semibold transition-all ${
                selectedAnswer === idx
                  ? answered
                    ? isCorrect
                      ? 'bg-green-100 border-green-500 text-green-900'
                      : 'bg-red-100 border-red-500 text-red-900'
                    : 'bg-indigo-100 border-indigo-500 text-indigo-900'
                  : answered && idx === question.correct
                  ? 'bg-green-100 border-green-500 text-green-900'
                  : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-indigo-300'
              }`}
              disabled={answered}
            >
              <span className="font-bold mr-2">
                {String.fromCharCode(65 + idx)}.
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {answered && (
          <div className={`p-6 rounded-lg border-l-4 ${
            isCorrect
              ? 'bg-green-50 border-green-500 text-green-900'
              : 'bg-red-50 border-red-500 text-red-900'
          }`}>
            <p className="font-bold mb-2">{isCorrect ? '✓ Правильно!' : '✗ Неправильно!'}</p>
            <p>{question.explanation}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          {!answered ? (
            <button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 transition-all"
            >
              Проверить ответ
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              {currentQuestion === questions.length - 1 ? 'Завершить' : 'Следующий вопрос'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
