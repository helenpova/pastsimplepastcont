import { useState } from 'react';

interface Exercise {
  id: number;
  instruction: string;
  image: string;
  description: string;
  tasks: Task[];
}

interface Task {
  id: number;
  scenario: string;
  blanks: Blank[];
  answer: string[];
}

interface Blank {
  id: number;
  sentence: string;
  options: string[];
  correct: string;
}

export default function Consolidation() {
  const exercises: Exercise[] = [
    {
      id: 1,
      instruction: 'Дополните предложения подходящей формой глагола',
      image: '📖',
      description: 'Выберите Past Simple или Past Continuous',
      tasks: [
        {
          id: 1,
          scenario: 'Вчера в парке',
          blanks: [
            {
              id: 1,
              sentence: 'I _______ (walk) in the park when I _______ (see) my friend.',
              options: ['walked, saw', 'was walking, saw', 'walked, was seeing', 'was walking, was seeing'],
              correct: 'was walking, saw',
            },
            {
              id: 2,
              sentence: 'He _______ (play) football every weekend last year.',
              options: ['was playing', 'played', 'plays', 'is playing'],
              correct: 'played',
            },
            {
              id: 3,
              sentence: 'They _______ (sit) at home when the earthquake _______ (happen).',
              options: ['were sitting, happened', 'sat, was happening', 'were sitting, was happening', 'sat, happened'],
              correct: 'were sitting, happened',
            },
          ],
          answer: ['was walking, saw', 'played', 'were sitting, happened'],
        },
        {
          id: 2,
          scenario: 'Школьные дни',
          blanks: [
            {
              id: 1,
              sentence: 'The teacher _______ (enter) the classroom while we _______ (copy) the homework.',
              options: ['entered, were copying', 'was entering, were copying', 'entered, copied', 'was entering, copied'],
              correct: 'entered, were copying',
            },
            {
              id: 2,
              sentence: 'She _______ (finish) her homework at 7 PM yesterday.',
              options: ['was finishing', 'finished', 'is finishing', 'finishes'],
              correct: 'finished',
            },
            {
              id: 3,
              sentence: 'While he _______ (study), his sister _______ (watch) TV.',
              options: ['studied, watched', 'was studying, was watching', 'studied, was watching', 'was studying, watched'],
              correct: 'was studying, was watching',
            },
          ],
          answer: ['entered, were copying', 'finished', 'was studying, was watching'],
        },
      ],
    },
    {
      id: 2,
      instruction: 'Определите, какую форму использовать',
      image: '🎯',
      description: 'Анализируйте каждое предложение и выбирайте нужную форму',
      tasks: [
        {
          id: 1,
          scenario: 'Путешествия',
          blanks: [
            {
              id: 1,
              sentence: 'When we _______ (arrive) in Paris, it _______ (rain).',
              options: ['arrived, was raining', 'was arriving, was raining', 'arrived, rained', 'were arriving, rained'],
              correct: 'arrived, was raining',
            },
            {
              id: 2,
              sentence: 'I _______ (travel) across Europe last summer.',
              options: ['was traveling', 'traveled', 'am traveling', 'travels'],
              correct: 'traveled',
            },
            {
              id: 3,
              sentence: 'The sun _______ (set) as we _______ (drive) home.',
              options: ['was setting, were driving', 'set, were driving', 'was setting, drove', 'set, drove'],
              correct: 'was setting, were driving',
            },
          ],
          answer: ['arrived, was raining', 'traveled', 'was setting, were driving'],
        },
        {
          id: 2,
          scenario: 'На работе',
          blanks: [
            {
              id: 1,
              sentence: 'He _______ (work) on the project when the power _______ (go) off.',
              options: ['was working, went', 'worked, was going', 'was working, was going', 'worked, went'],
              correct: 'was working, went',
            },
            {
              id: 2,
              sentence: 'They _______ (attend) meetings every Monday last year.',
              options: ['were attending', 'attended', 'are attending', 'attends'],
              correct: 'attended',
            },
            {
              id: 3,
              sentence: 'While she _______ (write) the report, I _______ (prepare) the presentation.',
              options: ['was writing, was preparing', 'wrote, prepared', 'wrote, was preparing', 'was writing, prepared'],
              correct: 'was writing, was preparing',
            },
          ],
          answer: ['was working, went', 'attended', 'was writing, was preparing'],
        },
      ],
    },
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const exercise = exercises[currentExercise];
  const task = exercise.tasks[currentTask];

  const handleAnswer = (blankId: number, answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [`${currentExercise}-${currentTask}-${blankId}`]: answer,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNextTask = () => {
    if (currentTask < exercise.tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSubmitted(false);
    } else {
      const newCompleted = [...completedExercises, currentExercise];
      setCompletedExercises(newCompleted);

      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setCurrentTask(0);
        setSubmitted(false);
      } else {
        setShowCompletion(true);
      }
    }
  };

  const checkAnswer = (blankId: number, correct: string) => {
    const userAnswer = userAnswers[`${currentExercise}-${currentTask}-${blankId}`];
    return userAnswer === correct;
  };

  const isTaskComplete = task.blanks.every((blank) =>
    checkAnswer(blank.id, blank.correct)
  );

  if (showCompletion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Поздравляем!</h2>
          <p className="text-xl text-gray-700 mb-8">
            Вы завершили все упражнения на закрепление Past Simple и Past Continuous!
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {exercises.map((ex, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${
                  completedExercises.includes(idx)
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-gray-100 border-2 border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{ex.image}</div>
                <p className="font-semibold text-sm">{ex.instruction}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-indigo-600 font-bold mb-8">
            Вы успешно прошли полный курс обучения!
          </p>
          <a
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all inline-block"
          >
            Вернуться на главную
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Exercise Info */}
      <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{exercise.image}</div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">Упражнение {currentExercise + 1}</h3>
            <p className="text-gray-600">{exercise.instruction}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Задание {currentTask + 1}/{exercise.tasks.length}</p>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
              style={{ width: `${((currentTask + 1) / exercise.tasks.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scenario */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-indigo-500">
        <p className="font-bold text-lg text-indigo-900 mb-2">📝 Сценарий: {task.scenario}</p>
        <p className="text-indigo-800">{exercise.description}</p>
      </div>

      {/* Blanks */}
      <div className="space-y-6">
        {task.blanks.map((blank) => (
          <div
            key={blank.id}
            className={`bg-white rounded-xl p-6 border-2 transition-colors ${
              submitted && checkAnswer(blank.id, blank.correct)
                ? 'border-green-500 bg-green-50'
                : submitted
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200'
            }`}
          >
            <p className="text-lg mb-4 font-semibold text-gray-800">{blank.sentence}</p>

            <div className="space-y-2 mb-4">
              {blank.options.map((option, idx) => {
                const isSelected =
                  userAnswers[`${currentExercise}-${currentTask}-${blank.id}`] === option;
                const isCorrectOption = option === blank.correct;
                const showAsCorrect = submitted && isCorrectOption;
                const showAsIncorrect = submitted && isSelected && !isCorrectOption;

                return (
                  <button
                    key={idx}
                    onClick={() => !submitted && handleAnswer(blank.id, option)}
                    className={`w-full p-4 text-left rounded-lg border-2 font-semibold transition-all ${
                      isSelected && !submitted
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-900'
                        : showAsCorrect
                        ? 'bg-green-100 border-green-500 text-green-900'
                        : showAsIncorrect
                        ? 'bg-red-100 border-red-500 text-red-900'
                        : submitted && showAsCorrect
                        ? 'bg-green-100 border-green-500 text-green-900'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-indigo-300'
                    }`}
                    disabled={submitted}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div
                className={`p-4 rounded-lg text-sm font-semibold ${
                  checkAnswer(blank.id, blank.correct)
                    ? 'bg-green-100 text-green-900'
                    : 'bg-red-100 text-red-900'
                }`}
              >
                {checkAnswer(blank.id, blank.correct)
                  ? '✓ Правильно! Отличная работа!'
                  : `✗ Неправильно. Правильный ответ: ${blank.correct}`}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all text-lg"
        >
          Проверить ответы
        </button>
      ) : (
        <div className="space-y-4">
          <div
            className={`p-6 rounded-lg text-center font-bold text-lg ${
              isTaskComplete
                ? 'bg-green-100 text-green-900'
                : 'bg-yellow-100 text-yellow-900'
            }`}
          >
            {isTaskComplete ? '✓ Все ответы правильны!' : '⚠️ Проверьте ошибки и попробуйте еще раз'}
          </div>
          {isTaskComplete && (
            <button
              onClick={handleNextTask}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all text-lg"
            >
              {currentTask === exercise.tasks.length - 1 && currentExercise === exercises.length - 1
                ? 'Завершить'
                : 'Следующее задание'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
