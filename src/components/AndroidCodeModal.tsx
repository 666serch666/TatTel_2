import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Smartphone, Layers, Terminal } from 'lucide-react';

interface FileItem {
  name: string;
  path: string;
  description: string;
  language: string;
  content: string;
}

const ANDROID_FILES: FileItem[] = [
  {
    name: 'MainActivity.kt',
    path: 'app/src/main/java/com/tattel/app/MainActivity.kt',
    description: 'Главная точка входа Android приложения. Управляет навигацией Material 3 и состояниями экранов.',
    language: 'kotlin',
    content: `package com.tattel.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.tattel.app.model.LessonResult
import com.tattel.app.ui.screens.*
import com.tattel.app.ui.theme.TatTelBackground
import com.tattel.app.ui.theme.TatTelGreenPrimary
import com.tattel.app.ui.theme.TatTelLightGreen
import com.tattel.app.ui.theme.TatTelTheme

enum class Screen {
    HOME,
    LESSONS,
    PROFILE,
    EXERCISE,
    COMPLETION
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TatTelTheme {
                TatTelApp()
            }
        }
    }
}

@Composable
fun TatTelApp() {
    var currentScreen by remember { mutableStateOf(Screen.HOME) }
    var isFirstLessonCompleted by remember { mutableStateOf(false) }
    var lastResult by remember { mutableStateOf<LessonResult?>(null) }

    val showBottomBar = currentScreen in listOf(Screen.HOME, Screen.LESSONS, Screen.PROFILE)

    Scaffold(
        containerColor = TatTelBackground,
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(
                    containerColor = Color.White,
                    contentColor = TatTelGreenPrimary
                ) {
                    NavigationBarItem(
                        selected = currentScreen == Screen.HOME,
                        onClick = { currentScreen = Screen.HOME },
                        icon = { Icon(Icons.Default.Home, contentDescription = "Главная") },
                        label = { Text("Главная") }
                    )
                    NavigationBarItem(
                        selected = currentScreen == Screen.LESSONS,
                        onClick = { currentScreen = Screen.LESSONS },
                        icon = { Icon(Icons.Default.Book, contentDescription = "Уроки") },
                        label = { Text("Уроки") }
                    )
                    NavigationBarItem(
                        selected = currentScreen == Screen.PROFILE,
                        onClick = { currentScreen = Screen.PROFILE },
                        icon = { Icon(Icons.Default.Person, contentDescription = "Профиль") },
                        label = { Text("Профиль") }
                    )
                }
            }
        }
    ) { innerPadding ->
        Surface(
            modifier = Modifier.fillMaxSize().padding(innerPadding),
            color = TatTelBackground
        ) {
            when (currentScreen) {
                Screen.HOME -> HomeScreen(
                    isLessonCompleted = isFirstLessonCompleted,
                    onStartLesson = { currentScreen = Screen.EXERCISE },
                    onNavigateToLessons = { currentScreen = Screen.LESSONS }
                )
                Screen.LESSONS -> LessonsScreen(
                    isFirstLessonCompleted = isFirstLessonCompleted,
                    onStartLesson = { currentScreen = Screen.EXERCISE }
                )
                Screen.PROFILE -> ProfileScreen(
                    isLessonCompleted = isFirstLessonCompleted,
                    onResetProgress = { isFirstLessonCompleted = false }
                )
                Screen.EXERCISE -> ExerciseScreen(
                    onClose = { currentScreen = Screen.HOME },
                    onFinished = { result ->
                        lastResult = result
                        isFirstLessonCompleted = true
                        currentScreen = Screen.COMPLETION
                    }
                )
                Screen.COMPLETION -> CompletionScreen(
                    result = lastResult ?: LessonResult(5, 0, 5),
                    onRetry = { currentScreen = Screen.EXERCISE },
                    onGoHome = { currentScreen = Screen.HOME }
                )
            }
        }
    }
}`
  },
  {
    name: 'HomeScreen.kt',
    path: 'app/src/main/java/com/tattel/app/ui/screens/HomeScreen.kt',
    description: 'Главный экран: приветствие, карточка прогресса уровня 1, кнопка продолжения и список доступных уроков.',
    language: 'kotlin',
    content: `// Фрагмент кода HomeScreen.kt
@Composable
fun HomeScreen(
    isLessonCompleted: Boolean,
    onStartLesson: () -> Unit,
    onNavigateToLessons: () -> Unit
) {
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text("TatTel", fontSize = 28.sp, fontWeight = FontWeight.Bold, color = TatTelGreenPrimary)
            Text("Хәерле көн! Добро пожаловать", fontSize = 16.sp, color = TatTelMutedText)
        }
        // Карточка уровня и прогресса с кнопкой "Продолжить обучение"
        item {
            Card(shape = RoundedCornerShape(20.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
                // ... Прогресс-бар и кнопка навигации к упражнению
            }
        }
    }
}`
  },
  {
    name: 'ExerciseScreen.kt',
    path: 'app/src/main/java/com/tattel/app/ui/screens/ExerciseScreen.kt',
    description: 'Экран интерактивного упражнения: 4 варианта ответа, проверка, подсчёт правильных ответов и ошибок.',
    language: 'kotlin',
    content: `// Фрагмент ExerciseScreen.kt
@Composable
fun ExerciseScreen(
    onClose: () -> Unit,
    onFinished: (LessonResult) -> Unit
) {
    val questions = remember { LessonRepository.greetingsQuestions }
    var currentIndex by remember { mutableIntStateOf(0) }
    var selectedOption by remember { mutableStateOf<String?>(null) }
    var isAnswerChecked by remember { mutableStateOf(false) }
    var correctCount by remember { mutableIntStateOf(0) }
    var wrongCount by remember { mutableIntStateOf(0) }
    // ... Проверка ответа, показ фидбека и переход к следующему вопросу
}`
  },
  {
    name: 'Color.kt & Theme.kt',
    path: 'app/src/main/java/com/tattel/app/ui/theme/Color.kt',
    description: 'Цветовая схема Material 3: #245B3A (тёмно-зелёный), #F7F6F0 (светлый фон), #E3EBDD (светло-зелёный), #20251F (текст).',
    language: 'kotlin',
    content: `package com.tattel.app.ui.theme

import androidx.compose.ui.graphics.Color

// Точные цвета по техническому заданию
val TatTelGreenPrimary = Color(0xFF245B3A)
val TatTelBackground = Color(0xFFF7F6F0)
val TatTelLightGreen = Color(0xFFE3EBDD)
val TatTelDarkText = Color(0xFF20251F)
val TatTelBorder = Color(0xFFD6DEC9)`
  },
  {
    name: 'build.gradle.kts',
    path: 'app/build.gradle.kts',
    description: 'Файл конфигурации сборки Gradle для Android Studio с поддержкой Jetpack Compose и Material 3.',
    language: 'kotlin',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.tattel.app"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.tattel.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }
    buildFeatures {
        compose = true
    }
}`
  }
];

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = ANDROID_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#D8DFD2]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8DFD2] bg-[#F7F6F0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#245B3A] text-white flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#20251F]">
                Нативный Android-код (Kotlin & Jetpack Compose)
              </h2>
              <p className="text-xs text-[#647062]">
                Файлы проекта TatTel для открытия в Android Studio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#647062] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 min-h-0 divide-x divide-[#D8DFD2]">
          {/* File Selector Sidebar */}
          <div className="w-64 p-3 bg-[#F7F6F0]/60 overflow-y-auto space-y-1">
            <div className="px-2 py-1 text-[11px] font-semibold text-[#647062] uppercase tracking-wider">
              Исходные файлы Android
            </div>
            {ANDROID_FILES.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => {
                  setSelectedFileIndex(idx);
                  setCopied(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 ${
                  selectedFileIndex === idx
                    ? 'bg-[#245B3A] text-white shadow-sm'
                    : 'text-[#20251F] hover:bg-white/80'
                }`}
              >
                <FileCode className="w-4 h-4 shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}

            <div className="mt-4 p-3 bg-[#E3EBDD] rounded-xl text-xs text-[#20251F] leading-relaxed">
              <span className="font-semibold block mb-1">💡 Как запустить в Android Studio:</span>
              1. Создайте проект <span className="font-mono text-[11px]">Empty Activity (Compose)</span>.
              <br />
              2. Скопируйте данные файлы в соответствующие папки.
              <br />
              3. Нажмите <span className="font-semibold">Run ▶</span>.
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#1E2320]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#171B19] border-b border-[#2C332E]">
              <div className="text-xs text-[#A0AEA3] font-mono truncate">
                {currentFile.path}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-[#245B3A] hover:bg-[#31724B] rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Скопировано!' : 'Копировать код'}
              </button>
            </div>

            <div className="p-4 bg-[#1B201D] border-b border-[#2C332E]">
              <p className="text-xs text-[#BDC9BF] leading-relaxed">
                {currentFile.description}
              </p>
            </div>

            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-[#E3EBDD] leading-relaxed select-text">
              <pre className="whitespace-pre">
                <code>{currentFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
