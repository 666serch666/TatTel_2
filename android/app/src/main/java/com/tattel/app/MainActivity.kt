package com.tattel.app

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
                        label = { Text("Главная") },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = TatTelGreenPrimary,
                            selectedTextColor = TatTelGreenPrimary,
                            indicatorColor = TatTelLightGreen
                        )
                    )
                    NavigationBarItem(
                        selected = currentScreen == Screen.LESSONS,
                        onClick = { currentScreen = Screen.LESSONS },
                        icon = { Icon(Icons.Default.Book, contentDescription = "Уроки") },
                        label = { Text("Уроки") },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = TatTelGreenPrimary,
                            selectedTextColor = TatTelGreenPrimary,
                            indicatorColor = TatTelLightGreen
                        )
                    )
                    NavigationBarItem(
                        selected = currentScreen == Screen.PROFILE,
                        onClick = { currentScreen = Screen.PROFILE },
                        icon = { Icon(Icons.Default.Person, contentDescription = "Профиль") },
                        label = { Text("Профиль") },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = TatTelGreenPrimary,
                            selectedTextColor = TatTelGreenPrimary,
                            indicatorColor = TatTelLightGreen
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Surface(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
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
}
