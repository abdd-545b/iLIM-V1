"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Flame,
  Heart,
  Home,
  Lock,
  LogIn,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  User,
  X
} from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  level: number;
  xp: number;
  minutes: string;
  summary: string;
  points: string[];
  quiz: {
    question: string;
    answers: QuizAnswer[];
  }[];
};

type QuizAnswer = {
  text: string;
  explanation: string;
  correct: boolean;
};

type Progress = {
  name: string;
  email: string;
  xp: number;
  completed: number[];
  streak: number;
};

type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  progress: Progress;
  createdAt: string;
  updatedAt: string;
};

const USERS_KEY = "ilim-users";
const CURRENT_USER_KEY = "ilim-current-user";

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Ислам деген не?",
    level: 1,
    xp: 30,
    minutes: "5 мин",
    summary:
      "Ислам - Аллаға бойсұну, жүректі жақсылыққа бұру және өмірді мейіріммен, әділдікпен өткізу жолы.",
    points: [
      "Ислам сөзі тыныштық пен мойынсұнуды білдіреді.",
      "Мұсылман Аллаға сеніп, жақсылық жасауға ұмтылады.",
      "Білім, ниет және көркем мінез исламда жоғары бағаланады."
    ],
    quiz: [
      {
        question: "Ислам сөзінің мағынасына ең жақын жауап қайсы?",
        answers: [
          {
            text: "Аллаға бойсұну арқылы тыныштыққа ұмтылу",
            explanation: "Дұрыс. Ислам сөзінің түбірі тыныштық, амандық және Аллаға мойынсұну мағыналарымен байланысты.",
            correct: true
          },
          {
            text: "Тек мәдени дәстүрлерді сақтау",
            explanation: "Бұл толық емес. Дәстүр маңызды болуы мүмкін, бірақ исламның негізі - сенім, құлшылық және көркем мінез.",
            correct: false
          },
          {
            text: "Адамның тек жеке дамуына көңіл бөлу",
            explanation: "Жеке даму пайдалы, бірақ ислам Алламен байланыс, қоғамға қамқорлық және жауапкершілікті де қамтиды.",
            correct: false
          },
          {
            text: "Білімді тек кітап оқу арқылы алу",
            explanation: "Білім исламда жоғары бағаланады, бірақ исламның мағынасы тек оқу тәсілімен шектелмейді.",
            correct: false
          }
        ]
      },
      {
        question: "Мұсылманның негізгі ұмтылысы қандай?",
        answers: [
          {
            text: "Алла разылығы үшін жақсы амал жасау",
            explanation: "Дұрыс. Мұсылман ниетін түзеп, пайдалы іс пен көркем мінезге ұмтылады.",
            correct: true
          },
          {
            text: "Қоғамда тек бедел жинау",
            explanation: "Бедел мақсат емес. Исламда амалдың құндылығы ықылас пен пайдасына байланысты.",
            correct: false
          },
          {
            text: "Күнделікті міндеттерден алыстау",
            explanation: "Бұл дұрыс емес. Ислам жауапкершілікті, еңбекқорлықты және адал өмірді қолдайды.",
            correct: false
          },
          {
            text: "Тек білім алып, амал жасамау",
            explanation: "Білім маңызды, бірақ исламда білім амалмен және мінезбен көрінуі керек.",
            correct: false
          }
        ]
      },
      {
        question: "Исламда не жоғары бағаланады?",
        answers: [
          {
            text: "Көркем мінез бен шынайы ниет",
            explanation: "Дұрыс. Көркем мінез, ықылас және мейірім исламдағы маңызды құндылықтар.",
            correct: true
          },
          {
            text: "Өзін басқадан жоғары санау",
            explanation: "Бұл дұрыс емес. Тәкаппарлық исламда құпталмайды, кішіпейілділік жоғары бағаланады.",
            correct: false
          },
          {
            text: "Жақсылықты тек көрсету үшін жасау",
            explanation: "Жақсылық мақтан үшін емес, шынайы ниетпен жасалғанда құнды болады.",
            correct: false
          },
          {
            text: "Асығыстықпен шешім қабылдау",
            explanation: "Ислам сабырды, ақылмен әрекет етуді және әділ шешімді қолдайды.",
            correct: false
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Иманның 6 шарты",
    level: 2,
    xp: 45,
    minutes: "7 мин",
    summary:
      "Иманның алты шарты мұсылман сенімінің негізін құрайды: Аллаға, періштелерге, кітаптарға, пайғамбарларға, ақырет күніне және тағдырға сену.",
    points: [
      "Иман жүрекпен бекітіліп, тілмен айтылады.",
      "Пайғамбарлар адамдарды тура жолға шақырды.",
      "Ақыретке сену жауапкершілік сезімін күшейтеді."
    ],
    quiz: [
      {
        question: "Иманның неше шарты бар?",
        answers: [
          {
            text: "Алты шарт",
            explanation: "Дұрыс. Иманның алты шарты мұсылман сенімінің негізгі бағыттарын қамтиды.",
            correct: true
          },
          {
            text: "Бес шарт",
            explanation: "Бес саны ислам тіректеріне қатысты. Иман шарттары алтау.",
            correct: false
          },
          {
            text: "Жеті шарт",
            explanation: "Бұл кең тараған шатасу болуы мүмкін, бірақ негізгі иман шарттары алтау.",
            correct: false
          },
          {
            text: "Төрт шарт",
            explanation: "Бұл толық емес. Иман шарттары бұдан көбірек және нақты алтау.",
            correct: false
          }
        ]
      },
      {
        question: "Иман шарттарының бірі қайсы?",
        answers: [
          {
            text: "Періштелерге сену",
            explanation: "Дұрыс. Періштелерге сену иманның алты шартының бірі.",
            correct: true
          },
          {
            text: "Тек жақсы әдет қалыптастыру",
            explanation: "Жақсы әдет пайдалы, бірақ ол иманның жеке шарты ретінде аталмайды.",
            correct: false
          },
          {
            text: "Күн сайын көп сөйлеу",
            explanation: "Бұл иман шарты емес. Исламда сөздің пайдалы әрі жауапты болуы маңызды.",
            correct: false
          },
          {
            text: "Барлық уақытта жалғыз болу",
            explanation: "Бұл иман шарты емес. Мұсылман қоғаммен де, отбасымен де жауапты байланыста болады.",
            correct: false
          }
        ]
      },
      {
        question: "Ақыретке сену адамға не береді?",
        answers: [
          {
            text: "Жауапкершілік пен әділдік сезімі",
            explanation: "Дұрыс. Ақыретке сену адамның сөзі мен амалы үшін жауапты екенін еске салады.",
            correct: true
          },
          {
            text: "Өмірге немқұрайлы қарау",
            explanation: "Керісінше, ақыретке сену өмірді мағыналы өткізуге шақырады.",
            correct: false
          },
          {
            text: "Басқалардан өзін жоғары көру",
            explanation: "Бұл дұрыс емес. Сенім кішіпейілділік пен өзін есепке тартуға жетелейді.",
            correct: false
          },
          {
            text: "Амалдардың маңызын азайту",
            explanation: "Ақыретке сену амалдардың маңызын күшейтеді, азайтпайды.",
            correct: false
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Исламның 5 тірегі",
    level: 3,
    xp: 60,
    minutes: "8 мин",
    summary:
      "Исламның бес тірегі - кәлима, намаз, зекет, ораза және қажылық. Олар мұсылман өмірінің берік бағытын қалыптастырады.",
    points: [
      "Кәлима - сенімнің ашық куәлігі.",
      "Намаз күнделікті рухани тәртіп береді.",
      "Зекет қоғамдағы қамқорлықты күшейтеді."
    ],
    quiz: [
      {
        question: "Исламның неше тірегі бар?",
        answers: [
          {
            text: "Бес тірек",
            explanation: "Дұрыс. Исламның бес тірегі: кәлима, намаз, зекет, ораза және қажылық.",
            correct: true
          },
          {
            text: "Алты тірек",
            explanation: "Алты саны иман шарттарына қатысты. Ислам тіректері бесеу.",
            correct: false
          },
          {
            text: "Төрт тірек",
            explanation: "Бұл толық емес. Негізгі ислам тіректері бес тармақтан тұрады.",
            correct: false
          },
          {
            text: "Жеті тірек",
            explanation: "Бұл дұрыс емес. Негізгі діни білімде ислам тіректері бес деп беріледі.",
            correct: false
          }
        ]
      },
      {
        question: "Қайсысы ислам тірегіне жатады?",
        answers: [
          {
            text: "Намаз оқу",
            explanation: "Дұрыс. Намаз - исламның бес тірегінің бірі және күнделікті құлшылық.",
            correct: true
          },
          {
            text: "Пайдалы кітап оқу",
            explanation: "Пайдалы кітап оқу жақсы іс, бірақ исламның бес тірегінің бірі емес.",
            correct: false
          },
          {
            text: "Үлкендерге құрмет көрсету",
            explanation: "Бұл көркем мінезге жатады, бірақ бес тірек қатарында аталмайды.",
            correct: false
          },
          {
            text: "Достармен жақсы қарым-қатынас",
            explanation: "Бұл маңызды әдеп, бірақ ислам тіректерінің нақты бірі емес.",
            correct: false
          }
        ]
      },
      {
        question: "Зекет нені күшейтеді?",
        answers: [
          {
            text: "Қоғамдағы қамқорлық пен бөлісуді",
            explanation: "Дұрыс. Зекет мұқтаждарға көмектесіп, қоғамдағы мейірім мен жауапкершілікті арттырады.",
            correct: true
          },
          {
            text: "Тек жеке байлықты көбейтуді",
            explanation: "Зекеттің мақсаты тек байлық жинау емес, мал-мүлікті тазартып, қоғамға пайда беру.",
            correct: false
          },
          {
            text: "Адамдар арасындағы ренішті",
            explanation: "Керісінше, зекет ренішті азайтып, өзара қолдауды күшейтеді.",
            correct: false
          },
          {
            text: "Мұқтаж адамдарды ұмытуды",
            explanation: "Бұл дұрыс емес. Зекет мұқтаждарды ескеруге және қолдауға үйретеді.",
            correct: false
          }
        ]
      }
    ]
  }
];

const defaultProgress: Progress = {
  name: "Айша",
  email: "aisha@ilim.kz",
  xp: 0,
  completed: [],
  streak: 1
};

const navItems = [
  { id: "home", label: "Басты", icon: Home },
  { id: "lessons", label: "Сабақтар", icon: BookOpen },
  { id: "profile", label: "Профиль", icon: User }
];

function createProgress(name: string, email: string): Progress {
  return {
    name,
    email,
    xp: 0,
    completed: [],
    streak: 1
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function readStoredUsers() {
  try {
    const saved = window.localStorage.getItem(USERS_KEY);
    return saved ? (JSON.parse(saved) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function shuffleAnswers(answers: QuizAnswer[]) {
  const shuffled = [...answers];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[nextIndex]] = [shuffled[nextIndex], shuffled[index]];
  }
  return shuffled;
}

async function hashPassword(email: string, password: string) {
  const payload = new TextEncoder().encode(`ilim:${email}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", payload);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function Page() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Lesson["quiz"]>([]);
  const [lessonWasCompleted, setLessonWasCompleted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [mode, setMode] = useState<"read" | "quiz" | "done">("read");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const savedUsers = readStoredUsers();
    const savedEmail = window.localStorage.getItem(CURRENT_USER_KEY);
    const currentUser = savedUsers.find((user) => user.email === savedEmail);
    const legacyProgress = window.localStorage.getItem("ilim-progress");

    setUsers(savedUsers);
    if (currentUser) {
      setCurrentUserEmail(currentUser.email);
      setProgress(currentUser.progress);
    } else if (legacyProgress) {
      setProgress(JSON.parse(legacyProgress) as Progress);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("ilim-progress", JSON.stringify(progress));
    if (!currentUserEmail) return;
    setUsers((current) =>
      current.map((user) =>
        user.email === currentUserEmail
          ? {
              ...user,
              name: progress.name,
              progress,
              updatedAt: new Date().toISOString()
            }
          : user
      )
    );
  }, [currentUserEmail, hydrated, progress]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [hydrated, users]);

  const level = Math.floor(progress.xp / 100) + 1;
  const nextLevelXp = level * 100;
  const levelPercent = Math.min(100, Math.round((progress.xp / nextLevelXp) * 100));
  const completedCount = progress.completed.length;

  const currentQuestion = activeQuiz[quizIndex];
  const selectedChoice = selectedAnswer !== null ? currentQuestion?.answers[selectedAnswer] : undefined;
  const answerIsCorrect = Boolean(selectedChoice?.correct);

  const nextLesson = useMemo(
    () => lessons.find((lesson) => !progress.completed.includes(lesson.id)) ?? lessons[lessons.length - 1],
    [progress.completed]
  );

  function openLesson(lesson: Lesson) {
    setActiveLesson(lesson);
    setActiveQuiz(lesson.quiz.map((question) => ({ ...question, answers: shuffleAnswers(question.answers) })));
    setLessonWasCompleted(progress.completed.includes(lesson.id));
    setMode("read");
    setQuizIndex(0);
    setSelectedAnswer(null);
  }

  function continueQuiz() {
    if (!activeLesson || selectedAnswer === null) return;

    if (quizIndex < activeLesson.quiz.length - 1) {
      setQuizIndex((value) => value + 1);
      setSelectedAnswer(null);
      return;
    }

    setMode("done");
    setBurst(true);
    setTimeout(() => setBurst(false), 1000);
    setProgress((current) => {
      if (current.completed.includes(activeLesson.id)) return current;
      return {
        ...current,
        xp: current.xp + activeLesson.xp,
        completed: [...current.completed, activeLesson.id],
        streak: current.streak + 1
      };
    });
  }

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setAuthBusy(true);

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = normalizeEmail(String(data.get("email") || ""));
    const password = String(data.get("password") || "");

    if (!email || !password || (authMode === "register" && !name)) {
      setAuthError("Барлық өрісті толтыр.");
      setAuthBusy(false);
      return;
    }

    if (password.length < 6) {
      setAuthError("Құпиясөз кемінде 6 таңбадан тұрсын.");
      setAuthBusy(false);
      return;
    }

    if (authMode === "register") {
      if (users.some((user) => user.email === email)) {
        setAuthError("Бұл пошта тіркелген. Кіруді таңда.");
        setAuthBusy(false);
        return;
      }

      const newProgress = createProgress(name, email);
      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash: await hashPassword(email, password),
        progress: newProgress,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setUsers((current) => [...current, newUser]);
      setCurrentUserEmail(email);
      window.localStorage.setItem(CURRENT_USER_KEY, email);
      setProgress(newProgress);
      setActiveView("profile");
      setAuthSuccess(true);
      setAuthBusy(false);
      return;
    }

    const user = users.find((item) => item.email === email);
    const passwordHash = await hashPassword(email, password);
    if (!user || user.passwordHash !== passwordHash) {
      setAuthError("Пошта немесе құпиясөз қате.");
      setAuthBusy(false);
      return;
    }

    setCurrentUserEmail(user.email);
    window.localStorage.setItem(CURRENT_USER_KEY, user.email);
    setProgress(user.progress);
    setActiveView("profile");
    setAuthBusy(false);
    setAuthOpen(false);
  }

  function openAuth(mode: "register" | "login") {
    setAuthMode(mode);
    setAuthError("");
    setAuthSuccess(false);
    setAuthOpen(true);
  }

  function logout() {
    setCurrentUserEmail(null);
    window.localStorage.removeItem(CURRENT_USER_KEY);
    setProgress(defaultProgress);
    setActiveView("home");
  }

  return (
    <main className="min-h-screen overflow-hidden pb-24">
      <header className="sticky top-0 z-40 border-b border-honey-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 xl:px-8">
          <button className="flex items-center gap-2" onClick={() => setActiveView("home")} aria-label="iLIM">
            <NurMascot size="sm" />
            <span className="text-2xl font-black tracking-normal text-ink">iLIM</span>
          </button>

          <div className="hidden items-center gap-2 rounded-full bg-honey-100 p-1 sm:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition ${
                    activeView === item.id ? "bg-white text-ink shadow-sm" : "text-slate-600 hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => (currentUserEmail ? setActiveView("profile") : openAuth("register"))}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5"
          >
            <LogIn className="h-4 w-4" />
            {currentUserEmail ? "Профиль" : "Кіру"}
          </button>
        </div>
      </header>

      <section className={`${activeView === "home" ? "block" : "hidden"} mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:pt-16 xl:px-8`}>
        <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] xl:gap-16">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-honey-200 bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-honey-600" />
              Қазақ тіліндегі ислам білімі
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-normal text-ink sm:text-7xl">
              iLIM
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-slate-700 sm:text-xl xl:text-2xl xl:leading-9">
              Исламды қысқа сабақтар, көңілді сұрақтар және XP арқылы үйрен. Нұр саған әр деңгейде жол көрсетеді.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => openLesson(nextLesson)}
                className="group flex items-center justify-center gap-2 rounded-full bg-honey-400 px-6 py-4 text-base font-black text-ink shadow-glow transition hover:-translate-y-1"
              >
                <Play className="h-5 w-5 fill-ink" />
                Бастау
                <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setActiveView("lessons")}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-honey-300 bg-white px-6 py-4 text-base font-black text-ink transition hover:-translate-y-1"
              >
                <BookOpen className="h-5 w-5" />
                Сабақтарды көру
              </button>
            </div>
          </div>

          <div className="relative min-h-[430px] xl:min-h-[500px]">
            <div className="absolute inset-x-4 top-8 h-80 rounded-[3rem] bg-honey-200/75 blur-3xl" />
            <div className="relative mx-auto flex max-w-md flex-col items-center rounded-[2rem] border border-honey-200 bg-white/90 p-6 shadow-soft backdrop-blur xl:max-w-lg xl:p-8">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-honey-300 animate-pulseRing" />
                <NurMascot size="lg" />
              </div>
              <h2 className="mt-4 text-center text-3xl font-black text-ink">Нұр</h2>
              <p className="mt-2 text-center text-base font-bold leading-7 text-slate-600">
                Жұлдыз досың күн сайын жаңа білімге шақырады.
              </p>

              <div className="mt-6 grid w-full grid-cols-3 gap-3">
                <StatCard icon={<Flame className="h-5 w-5" />} value={`${progress.streak}`} label="күн" />
                <StatCard icon={<Trophy className="h-5 w-5" />} value={`${progress.xp}`} label="XP" />
                <StatCard icon={<Award className="h-5 w-5" />} value={`${level}`} label="деңгей" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3 xl:gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} completed={progress.completed.includes(lesson.id)} onOpen={() => openLesson(lesson)} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <InfoTile
            icon={<Home className="h-6 w-6" />}
            title="Веб-сайт"
            text="iLIM браузер арқылы ашылады. Сілтемені отбасыңа және достарыңа жібере аласың."
          />
          <InfoTile
            icon={<Sparkles className="h-6 w-6" />}
            title="PWA"
            text="Қолдайтын браузерлерде iLIM негізгі экранға орнатылып, қосымша сияқты ашылады."
          />
          <InfoTile
            icon={<Lock className="h-6 w-6" />}
            title="Мобильді қосымша емес"
            text="Бұл App Store немесе Google Play қолданбасы емес. Қазір ол веб және PWA форматында дайын."
          />
        </div>
      </section>

      <section className={`${activeView === "lessons" ? "block" : "hidden"} mx-auto max-w-7xl px-4 py-10 sm:px-6 xl:px-8`}>
        <SectionTitle title="Сабақтар" subtitle="Әр сабақ қысқа, түсінікті және 3 сұрақтық тексеріспен аяқталады." />
        <div className="grid gap-5 md:grid-cols-3 xl:gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} completed={progress.completed.includes(lesson.id)} onOpen={() => openLesson(lesson)} />
          ))}
        </div>
      </section>

      <section className={`${activeView === "profile" ? "block" : "hidden"} mx-auto max-w-5xl px-4 py-10 sm:px-6 xl:px-8`}>
        <SectionTitle title="Профиль" subtitle="Жетістігіңді бақыла, деңгейіңді өсір және сабақты жалғастыр." />
        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] xl:gap-6">
          <div className="rounded-[2rem] border border-honey-200 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <NurMascot size="md" />
              <div>
                <h2 className="text-2xl font-black text-ink">{progress.name}</h2>
                <p className="font-bold text-slate-500">{progress.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (currentUserEmail) {
                  logout();
                  return;
                }
                openAuth("login");
              }}
              className="mt-5 w-full rounded-2xl bg-ink px-4 py-3 font-black text-white transition hover:-translate-y-0.5"
            >
              {currentUserEmail ? "Шығу" : "Кіру"}
            </button>
          </div>

          <div className="rounded-[2rem] border border-honey-200 bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-black text-slate-500">Жалпы XP</p>
                <h3 className="text-4xl font-black text-ink">{progress.xp}</h3>
              </div>
              <div className="rounded-2xl bg-honey-100 p-4 text-honey-600">
                <Trophy className="h-8 w-8" />
              </div>
            </div>
            <ProgressBar value={levelPercent} />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <StatCard icon={<Award className="h-5 w-5" />} value={`${level}`} label="деңгей" />
              <StatCard icon={<Check className="h-5 w-5" />} value={`${completedCount}`} label="сабақ" />
              <StatCard icon={<Flame className="h-5 w-5" />} value={`${progress.streak}`} label="күн" />
            </div>
          </div>
        </div>
      </section>

      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          quiz={activeQuiz}
          mode={mode}
          setMode={setMode}
          quizIndex={quizIndex}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          answerIsCorrect={answerIsCorrect}
          onContinue={continueQuiz}
          onClose={() => setActiveLesson(null)}
          alreadyCompleted={lessonWasCompleted}
          burst={burst}
        />
      )}

      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/35 p-3 backdrop-blur-sm sm:items-center sm:justify-center">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-ink">
                {authSuccess ? "Дайын" : authMode === "register" ? "Тіркелу" : "Кіру"}
              </h2>
              <button onClick={() => setAuthOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            {authSuccess ? (
              <div className="relative mt-5 overflow-hidden rounded-[1.5rem] bg-honey-50 p-6 text-center">
                <div className="success-burst" />
                <div className="success-spark success-spark-one" />
                <div className="success-spark success-spark-two" />
                <div className="success-spark success-spark-three" />
                <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-glow">
                  <NurMascot size="md" />
                </div>
                <h3 className="relative mt-5 text-2xl font-black leading-tight text-ink">
                  Құттықтаймыз! Аккаунт сәтті құрылды!
                </h3>
                <p className="relative mt-2 font-bold leading-7 text-slate-600">
                  Енді XP жинап, деңгейіңді көтере аласың.
                </p>
                <button
                  onClick={() => setAuthOpen(false)}
                  className="relative mt-5 w-full rounded-2xl bg-honey-400 px-5 py-4 font-black text-ink shadow-glow transition hover:-translate-y-0.5"
                >
                  Жалғастыру
                </button>
              </div>
            ) : (
              <>
                <div className="mt-4 grid grid-cols-2 rounded-2xl bg-honey-100 p-1">
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError("");
                    }}
                    className={`rounded-xl py-2 font-black ${authMode === "register" ? "bg-white shadow-sm" : "text-slate-600"}`}
                  >
                    Тіркелу
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                    }}
                    className={`rounded-xl py-2 font-black ${authMode === "login" ? "bg-white shadow-sm" : "text-slate-600"}`}
                  >
                    Кіру
                  </button>
                </div>
                <form className="mt-5 space-y-3" onSubmit={submitAuth}>
                  {authMode === "register" && (
                    <label className="block">
                      <span className="text-sm font-black text-slate-600">Атың</span>
                      <input
                        name="name"
                        defaultValue={currentUserEmail ? progress.name : ""}
                        className="mt-1 w-full rounded-2xl border-2 border-honey-200 px-4 py-3 font-bold outline-none focus:border-honey-400"
                      />
                    </label>
                  )}
                  <label className="block">
                    <span className="text-sm font-black text-slate-600">Электронды пошта</span>
                    <input
                      name="email"
                      type="email"
                      defaultValue={currentUserEmail ? progress.email : ""}
                      className="mt-1 w-full rounded-2xl border-2 border-honey-200 px-4 py-3 font-bold outline-none focus:border-honey-400"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-black text-slate-600">Құпиясөз</span>
                    <div className="relative mt-1">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        name="password"
                        type="password"
                        className="w-full rounded-2xl border-2 border-honey-200 py-3 pl-12 pr-4 font-bold outline-none focus:border-honey-400"
                      />
                    </div>
                  </label>
                  {authError && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-black text-coral">
                      {authError}
                    </div>
                  )}
                  <button
                    disabled={authBusy}
                    className="w-full rounded-2xl bg-honey-400 px-5 py-4 font-black text-ink shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                  >
                    {authBusy ? "Күте тұр" : authMode === "register" ? "Аккаунт ашу" : "Кіру"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-honey-200 bg-white/92 px-3 py-2 backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-3 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex flex-col items-center rounded-2xl px-2 py-2 text-xs font-black transition ${
                  activeView === item.id ? "bg-honey-200 text-ink" : "text-slate-500"
                }`}
              >
                <Icon className="mb-1 h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}

function NurMascot({ size }: { size: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-10 w-10",
    md: "h-20 w-20",
    lg: "h-44 w-44"
  };

  return (
    <div className={`${sizes[size]} relative animate-float`}>
      <div className="star-shape absolute inset-0 bg-honey-400 shadow-glow" />
      <div className="absolute left-[29%] top-[34%] h-[10%] w-[10%] rounded-full bg-ink" />
      <div className="absolute right-[29%] top-[34%] h-[10%] w-[10%] rounded-full bg-ink" />
      <div className="absolute left-[36%] top-[50%] h-[8%] w-[28%] rounded-b-full border-b-4 border-ink" />
      <div className="absolute left-[17%] top-[43%] h-[9%] w-[10%] rounded-full bg-coral/70" />
      <div className="absolute right-[17%] top-[43%] h-[9%] w-[10%] rounded-full bg-coral/70" />
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-honey-50 p-3 text-center">
      <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-honey-600 shadow-sm">
        {icon}
      </div>
      <div className="text-xl font-black text-ink">{value}</div>
      <div className="text-xs font-black text-slate-500">{label}</div>
    </div>
  );
}

function InfoTile({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-honey-200 bg-white/90 p-5 shadow-soft">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-honey-100 text-honey-600">
        {icon}
      </div>
      <h2 className="text-xl font-black text-ink">{title}</h2>
      <p className="mt-2 font-bold leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-black text-ink sm:text-5xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-base font-bold leading-7 text-slate-600">{subtitle}</p>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-5 overflow-hidden rounded-full bg-honey-100">
      <div
        className="progress-stripes h-full rounded-full bg-honey-400 transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function LessonCard({ lesson, completed, onOpen }: { lesson: Lesson; completed: boolean; onOpen: () => void }) {
  return (
    <article className="group rounded-[2rem] border border-honey-200 bg-white p-5 shadow-soft transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-honey-100 text-honey-600">
          {completed ? <Check className="h-7 w-7" /> : <BookOpen className="h-7 w-7" />}
        </div>
        <span className="rounded-full bg-skysoft px-3 py-1 text-xs font-black text-slate-700">{lesson.minutes}</span>
      </div>
      <h2 className="mt-4 text-2xl font-black leading-tight text-ink">{lesson.title}</h2>
      <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm font-bold leading-6 text-slate-600">{lesson.summary}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-slate-600">
          <Star className="h-5 w-5 fill-honey-400 text-honey-400" />
          {lesson.xp} XP
        </div>
        <button
          onClick={onOpen}
          className="flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-black text-white transition group-hover:bg-honey-500 group-hover:text-ink"
        >
          Ашу
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function LessonModal({
  lesson,
  quiz,
  mode,
  setMode,
  quizIndex,
  selectedAnswer,
  setSelectedAnswer,
  answerIsCorrect,
  onContinue,
  onClose,
  alreadyCompleted,
  burst
}: {
  lesson: Lesson;
  quiz: Lesson["quiz"];
  mode: "read" | "quiz" | "done";
  setMode: (mode: "read" | "quiz" | "done") => void;
  quizIndex: number;
  selectedAnswer: number | null;
  setSelectedAnswer: (index: number) => void;
  answerIsCorrect: boolean;
  onContinue: () => void;
  onClose: () => void;
  alreadyCompleted: boolean;
  burst: boolean;
}) {
  const question = quiz[quizIndex];
  const selectedChoice = selectedAnswer !== null ? question?.answers[selectedAnswer] : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/35 p-3 backdrop-blur-sm sm:items-center sm:justify-center">
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-soft sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-black text-honey-600">{lesson.xp} XP</p>
            <h2 className="text-3xl font-black leading-tight text-ink">{lesson.title}</h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {mode === "read" && (
          <div className="mt-5">
            <div className="rounded-[1.5rem] bg-honey-50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <NurMascot size="sm" />
                <p className="text-lg font-black text-ink">Нұрдан қысқа түсіндірме</p>
              </div>
              <p className="text-base font-bold leading-8 text-slate-700">{lesson.summary}</p>
            </div>
            <div className="mt-4 space-y-3">
              {lesson.points.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-honey-100 bg-white p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                  <p className="font-bold leading-7 text-slate-700">{point}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setMode("quiz")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-honey-400 px-5 py-4 font-black text-ink shadow-glow"
            >
              Тексерісті бастау
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {mode === "quiz" && (
          <div className="mt-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-honey-100 px-3 py-1 text-sm font-black text-slate-700">
                {quizIndex + 1} / {quiz.length}
              </span>
              <Heart className="h-6 w-6 fill-coral text-coral" />
            </div>
            <h3 className="text-2xl font-black leading-tight text-ink">{question?.question}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {question?.answers.map((answer, index) => {
                const chosen = selectedAnswer === index;
                const showResult = selectedAnswer !== null;
                return (
                  <button
                    key={answer.text}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full rounded-2xl border-2 p-4 text-left font-black transition ${
                      chosen && answer.correct
                        ? "border-leaf bg-green-50 text-leaf"
                        : chosen && showResult
                          ? "border-coral bg-red-50 text-coral"
                          : "border-honey-100 bg-white text-slate-700 hover:border-honey-300"
                    }`}
                  >
                    {answer.text}
                  </button>
                );
              })}
            </div>
            {selectedChoice && (
              <div
                className={`mt-4 rounded-2xl border p-4 ${
                  selectedChoice.correct ? "border-green-100 bg-green-50" : "border-honey-200 bg-honey-50"
                }`}
              >
                <p className={`text-sm font-black ${selectedChoice.correct ? "text-leaf" : "text-honey-600"}`}>
                  {selectedChoice.correct ? "Дұрыс жауап" : "Түсіндірме"}
                </p>
                <p className="mt-1 font-bold leading-7 text-slate-700">{selectedChoice.explanation}</p>
              </div>
            )}
            <button
              disabled={selectedAnswer === null}
              onClick={onContinue}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-5 py-4 font-black text-white transition disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
            >
              Жалғастыру
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {mode === "done" && (
          <div className="relative mt-5 overflow-hidden rounded-[1.5rem] bg-honey-50 p-6 text-center">
            {burst && <div className="absolute inset-x-0 top-5 mx-auto h-24 w-24 rounded-full bg-honey-300 animate-pulseRing" />}
            <div className="relative mx-auto w-fit">
              <NurMascot size="md" />
            </div>
            <h3 className="mt-3 text-3xl font-black text-ink">Жарайсың!</h3>
            <p className="mt-2 font-bold leading-7 text-slate-600">
              Сабақ аяқталды. Қоржыныңа {alreadyCompleted ? "XP бұрын қосылған" : `${lesson.xp} XP қосылды`}.
            </p>
            <button onClick={onClose} className="mt-5 rounded-2xl bg-honey-400 px-6 py-4 font-black text-ink shadow-glow">
              Дайын
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
